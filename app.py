from flask import Flask, jsonify, request
from flask_cors import CORS
from bills import BillList, Bill
import os
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import TextLoader

app = Flask(__name__)
CORS(app)

# -----------------------
# Initialize Bills
# -----------------------
bill_list = BillList()

# -----------------------
# Initialize Chatbot
# -----------------------
api_key = "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"
model_name = "llama-3.3-70b-versatile"

# Initialize model
deepseek = ChatGroq(api_key=api_key, model_name=model_name)
parser = StrOutputParser()
deepseek_chain = deepseek | parser

# Load context file (all bill text / reference info)
try:
    loader = TextLoader("C:/Users/jsjh4/OneDrive/Desktop/YouthPolicyTracker/data.txt", encoding='utf-8')
    document = loader.load()
    context_content = document[0].page_content if document else ""
except Exception as e:
    print(f"Warning: Could not load context file: {e}")
    context_content = ""


def find_relevant_bills(question, max_bills=5):
    """
    Filter bills relevant to the user's question
    Returns up to max_bills that match keywords
    """
    question_lower = question.lower()
    
    # Define keyword groups for different topics
    topic_keywords = {
        'education': ['school', 'student', 'teacher', 'pupil', 'classroom', 'educational', 'education'],
        'healthcare': ['health', 'medical', 'doctor', 'patient', 'hospital', 'insurance', 'care'],
        'environment': ['environment', 'water', 'pollution', 'air', 'climate', 'conservation'],
        'tax': ['tax', 'revenue', 'income', 'property'],
        'transportation': ['vehicle', 'driver', 'license', 'road', 'traffic', 'bus', 'transport'],
        'housing': ['house', 'home', 'property', 'real estate', 'landlord', 'tenant'],
        'business': ['business', 'small business', 'commerce', 'trade'],
        'employment': ['employment', 'employee', 'employer', 'wage', 'work', 'job'],
        'crime': ['crime', 'criminal', 'offense', 'penalty', 'law enforcement', 'police'],
        'government': ['government', 'agency', 'budget', 'state', 'county']
    }
    
    # Score each bill
    scored_bills = []
    
    for bill in bill_list.bills:
        score = 0
        bill_text = (bill.name + " " + bill.summary).lower()
        
        # Check for keyword matches
        for topic, keywords in topic_keywords.items():
            if any(keyword in question_lower for keyword in keywords):
                # If question mentions a topic, check if bill covers it
                if any(keyword in bill_text for keyword in keywords):
                    score += 3
        
        # Check for exact bill number match
        if bill.id.lower() in question_lower:
            score += 10
        
        # Check for partial name matches
        question_words = question_lower.split()
        for word in question_words:
            if len(word) > 3 and word in bill_text:
                score += 1
        
        if score > 0:
            scored_bills.append((bill, score))
    
    # Sort by score and return top results
    scored_bills.sort(key=lambda x: x[1], reverse=True)
    return [bill for bill, score in scored_bills[:max_bills]]


def get_ai_response(question):
    """
    Generate AI response using LLM with filtered bill context
    """
    # Find only relevant bills instead of using all
    relevant_bills = find_relevant_bills(question, max_bills=10)
    
    # Build context from relevant bills only
    if relevant_bills:
        bills_context = "\n".join([
            f"Bill {bill.id}: {bill.name}\nStatus: {bill.status}\nSummary: {bill.summary}\n"
            for bill in relevant_bills
        ])
        bills_header = f"Relevant Bills ({len(relevant_bills)} found):"
    else:
        bills_context = "No directly relevant bills found in the system."
        bills_header = "Available Bills:"
    
    template = """
    You are the AI chatbot for the Youth Policy Tracker app.
    You are designed to provide assistance to high school students who have questions about Nevada legislative bills, representatives, or the website.
    Do not invent facts or make assumptions.
    If you don't know an answer, respond with: "I'm not sure about that."
    
    {bills_header}
    {bills_context}
    
    Additional Context:
    {context}
    
    Question: {question}
    Answer:
    """
    
    prompt = template.format(
        bills_header=bills_header,
        bills_context=bills_context,
        context=context_content,
        question=question
    )
    
    answer = deepseek_chain.invoke(prompt)
    return answer.strip().split('\n')[-1] if answer else "I'm not sure about that."


# -----------------------
# Bill Routes
# -----------------------

@app.route("/bills", methods=["GET"])
def get_bills():
    """Get all bills"""
    return jsonify(bill_list.get_all_bills())


@app.route("/bills/grouped", methods=["GET"])
def get_bills_grouped():
    """Get bills organized by type (AB, SB, HB, etc.)"""
    return jsonify(bill_list.get_bills_grouped())


@app.route("/bills/<bill_id>", methods=["GET"])
def get_bill(bill_id):
    """Get a specific bill by ID"""
    bill = bill_list.get_bill(bill_id)
    if bill:
        return jsonify(bill.to_dict())
    return jsonify({"error": "Bill not found"}), 404


@app.route("/bills/<bill_id>/vote", methods=["POST"])
def vote_bill(bill_id):
    """Record a vote on a bill (support, oppose, not_sure)"""
    data = request.json
    option = data.get("option")
    
    if not option:
        return jsonify({"error": "Vote option required"}), 400
    
    bill = bill_list.get_bill(bill_id)
    if not bill:
        return jsonify({"error": "Bill not found"}), 404
    
    try:
        bill.vote(option)
        return jsonify({
            "message": "Vote recorded",
            "poll": bill.get_poll_results()
        })
    except ValueError as e:
        return jsonify({"error": str(e)}), 400


@app.route("/bills/<bill_id>/polls", methods=["GET"])
def get_bill_polls(bill_id):
    """Get poll results for a specific bill"""
    bill = bill_list.get_bill(bill_id)
    if not bill:
        return jsonify({"error": "Bill not found"}), 404
    
    return jsonify(bill.get_poll_results())


# -----------------------
# Chatbot Route
# -----------------------

@app.route("/chat", methods=["POST"])
def chat():
    """
    Handle chatbot conversations
    Supports discussion about bills and general questions
    """
    data = request.json
    question = data.get("question")
    chat_log = data.get("chatLog", [])
    
    if not question:
        return jsonify({"error": "Question required"}), 400
    
    # Build context from chat history (limited to avoid token overflow)
    context_text = "\n".join([
        f"{msg.get('sender', 'User')}: {msg.get('text', '')}"
        for msg in chat_log[-5:] if msg  # Only use last 5 messages
    ])
    
    # Create full prompt with conversation context
    full_prompt = f"""
    Previous conversation:
    {context_text}
    
    Current question: {question}
    """
    
    answer = get_ai_response(full_prompt)
    
    return jsonify({
        "answer": answer,
        "success": True
    })


# -----------------------
# Health Check Route
# -----------------------

@app.route("/health", methods=["GET"])
def health_check():
    """Simple health check endpoint"""
    return jsonify({
        "status": "healthy",
        "bills_loaded": len(bill_list.bills)
    })


# -----------------------
# Run App
# -----------------------

if __name__ == "__main__":
    app.run(debug=True)