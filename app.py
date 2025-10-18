from flask import Flask, jsonify, request
from flask_cors import CORS
from bills import BillList, Bill
import os
import json
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import TextLoader
import re

app = Flask(__name__)
CORS(app)

# -----------------------
# Initialize Bills
# -----------------------
bill_list = BillList()

# Initialize BillList (this will call load_bills, which tries to load the JSON)
bill_list = BillList()

# Optional: clear defaults if you want only JSON bills
bill_list.bills = []

# Get path to JSON file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BILLS_JSON_PATH = os.path.join(BASE_DIR, "nevada_bills.json")

# Load JSON bills
with open(BILLS_JSON_PATH, "r", encoding="utf-8") as f:
    bills_data = json.load(f)
    for bill_data in bills_data:
        bill = Bill(
            bill_data["id"],                 # bill_id
            bill_data["name"],               # name
            bill_data["status"],             # status
            bill_data["date_introduced"],    # date_introduced
            bill_data["link"],               # link
            bill_data.get("summary", "")     # summary (optional)
        )
        bill_list.add_bill(bill)

# -----------------------
# Initialize Chatbot
# -----------------------
api_key = "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"
model_name = "llama-3.3-70b-versatile"

# Initialize model
deepseek = ChatGroq(api_key=api_key, model_name=model_name)
parser = StrOutputParser()
deepseek_chain = deepseek | parser

def find_relevant_bills(question, max_bills=5):
    """
    Much better bill filtering with multiple matching strategies
    """
    question_lower = question.lower().strip()
    scored_bills = []
    
    # Extract potential bill numbers (AB123, SB456, etc.)
    bill_pattern = r'\b(AB|SB|HB|SCR|HCR|SR|HR|AR|ACR|AJR|SJR|IP)\s?(\d+)\b'
    mentioned_bills = re.findall(bill_pattern, question, re.IGNORECASE)
    mentioned_bill_ids = [f"{bill_type.upper()}{num}" for bill_type, num in mentioned_bills]
    
    for bill in bill_list.bills:
        score = 0
        bill_text = (bill.name + " " + bill.summary).lower()
        bill_id_lower = bill.id.lower()
        
        # Strategy 1: Exact bill ID match (highest priority)
        if bill.id in mentioned_bill_ids:
            score += 50
        if bill_id_lower in question_lower:
            score += 30
        if bill_id_lower.replace(' ', '') in question_lower.replace(' ', ''):
            score += 25
        
        # Strategy 2: Topic-based matching with better keywords
        topic_keywords = {
            'education': ['education', 'school', 'student', 'teacher', 'classroom', 'curriculum', 'university', 'college', 'campus', 'learning', 'academic'],
            'healthcare': ['health', 'medical', 'healthcare', 'hospital', 'doctor', 'patient', 'insurance', 'medicaid', 'medicare', 'clinic', 'treatment'],
            'environment': ['environment', 'climate', 'pollution', 'water', 'air', 'conservation', 'energy', 'renewable', 'solar', 'wind', 'clean', 'green'],
            'housing': ['housing', 'rent', 'landlord', 'tenant', 'affordable', 'homeless', 'property', 'apartment', 'lease', 'eviction'],
            'tax': ['tax', 'revenue', 'income', 'property tax', 'sales tax', 'taxation', 'fee', 'levy'],
            'criminal': ['crime', 'criminal', 'police', 'sentencing', 'prison', 'justice', 'law enforcement', 'offense', 'penalty'],
            'business': ['business', 'commerce', 'license', 'regulation', 'small business', 'enterprise', 'industry', 'economic'],
            'transportation': ['transportation', 'highway', 'road', 'vehicle', 'driver', 'transit', 'bus', 'train', 'infrastructure'],
            'voting': ['voting', 'election', 'ballot', 'vote', 'electoral', 'registration', 'polling'],
            'technology': ['technology', 'digital', 'internet', 'cyber', 'data', 'privacy', 'online', 'broadband'],
            'youth': ['youth', 'teen', 'student', 'young', 'child', 'children', 'minor', 'school']
        }
        
        for topic, keywords in topic_keywords.items():
            # Check if question mentions the topic
            question_has_topic = any(keyword in question_lower for keyword in keywords)
            # Check if bill is about the topic
            bill_has_topic = any(keyword in bill_text for keyword in keywords)
            
            if question_has_topic and bill_has_topic:
                score += 15  # Strong match: question asks about topic and bill addresses it
            elif bill_has_topic:
                score += 3   # Weak match: bill is about topic
        
        # Strategy 3: Word overlap with meaningful words
        question_words = set([word for word in question_lower.split() if len(word) > 3])
        bill_words = set(bill_text.split())
        common_words = question_words.intersection(bill_words)
        score += len(common_words) * 2
        
        # Strategy 4: Status relevance
        status_words = ['passed', 'introduced', 'approved', 'rejected', 'pending', 'committee']
        for status_word in status_words:
            if status_word in question_lower and status_word in bill.status.lower():
                score += 8
        
        if score > 0:
            scored_bills.append((bill, score))
    
    # Sort by score and return top results
    scored_bills.sort(key=lambda x: x[1], reverse=True)
    return [bill for bill, score in scored_bills[:max_bills]]

def get_ai_response(question):
    """
    Much better AI prompt with rich context and clear instructions
    """
    # Find relevant bills
    relevant_bills = find_relevant_bills(question, max_bills=6)
    
    # Build detailed bill context
    if relevant_bills:
        bills_context = "\n\n".join([
            f"BILL {bill.id}:\n"
            f"Title: {bill.name}\n"
            f"Status: {bill.status}\n"
            f"Introduced: {bill.date_introduced}\n"
            f"Summary: {bill.summary}\n"
            f"More info: {bill.link}"
            for bill in relevant_bills
        ])
        bills_header = f"RELEVANT BILLS ({len(relevant_bills)} found):"
    else:
        bills_context = "No bills directly match your query. Try asking about specific bill numbers or topics like education, healthcare, environment, etc."
        bills_header = "BILL SEARCH RESULTS:"

    
    # Rich website and Nevada context
    website_context = """
    CONTEXT - NEVADA YOUTH POLICY TRACKER:

    This website helps students understand Nevada legislation and engage with state government.

    AUDIENCE: High school students learning about civic engagement

    RESPONSE GUIDELINES:
    - Provide clear, factual information about Nevada bills
    - Explain legislative concepts in straightforward terms
    - Focus on accuracy and relevance
    - Keep responses concise and to the point
    - When appropriate, note how students can get involved
    - When asked a question, as long as it is relevant to Nevada legislation, include information about it even if you have to search it up
    - Link to official resources when possible
    - You don't have to mention bills or list links if they are not relevant to the question
    """
    
    template = """
    {website_context}

    {bills_header}
    {bills_context}

    QUESTION: {question}

    Respond with clear, factual information. Focus on the specific bills and topics mentioned.
    If you reference bills, include their numbers and current status.
    Keep your response direct and informative.

    RESPONSE:
    """
    
    prompt = template.format(
        website_context=website_context,
        bills_header=bills_header,
        bills_context=bills_context,
        question=question
    )
    
    try:
        answer = deepseek_chain.invoke(prompt)
        # Clean up the response
        cleaned_answer = answer.strip()
        # Remove any "Response:" or "Answer:" prefixes the model might add
        cleaned_answer = re.sub(r'^(Response|Answer):\s*', '', cleaned_answer, flags=re.IGNORECASE)
        return cleaned_answer
    except Exception as e:
        print(f"Error getting AI response: {e}")
        return "I'm having trouble processing your question right now. Please try again later."


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
@app.route("/chat", methods=["GET", "POST"])
def chat():
    """
    Handle chatbot conversations.
    """
    if request.method == "GET":
        return jsonify({
            "message": "Chat endpoint is running. Send a POST request with JSON data like:",
            "example": {
                "question": "What bills are about healthcare?",
                "chatLog": []
            }
        })

    # POST logic
    data = request.json
    question = data.get("question")
    chat_log = data.get("chatLog", [])

    if not question:
        return jsonify({"error": "Question required"}), 400

    # Build context from chat history
    context_text = "\n".join([
        f"{msg.get('sender', 'User')}: {msg.get('text', '')}"
        for msg in chat_log[-5:] if msg
    ])

    # Create full prompt with conversation context
    if context_text.strip():
        full_prompt = f"""
        Previous conversation:
        {context_text}

        Current question: {question}
        """
    else:
        full_prompt = question

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