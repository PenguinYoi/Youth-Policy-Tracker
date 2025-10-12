from flask import Flask, jsonify, request
from flask_cors import CORS
from bills import BillList  # your Bill and BillList classes
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
# You can set your API key here directly (or use .env)
api_key = "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"
model_name = "llama-3.3-70b-versatile"

# Initialize model
deepseek = ChatGroq(api_key=api_key, model_name=model_name)
parser = StrOutputParser()
deepseek_chain = deepseek | parser

# Load context file (all bill text / reference info)
loader = TextLoader("C:/Users/jsjh4/OneDrive/Desktop/YouthPolicyTracker/data.txt", encoding='utf-8')
document = loader.load()

def get_ai_response(question):
    template = """
    You are the AI chatbot for the Youth Policy Tracker app.
    You are designed to provide assistance to users who have questions about legislative bills, representatives, or the website.
    Do not invent facts or make assumptions.
    If you don't know an answer, respond with: "I'm not sure about that."
    Context: {context}
    Question: {question}
    Answer:
    """
    prompt = template.format(context=document, question=question)
    answer = deepseek_chain.invoke(prompt)
    return answer.strip().split('\n')[-1]  # Last line as final answer

# -----------------------
# Bill Routes
# -----------------------
@app.route("/bills", methods=["GET"])
def get_bills():
    return jsonify(bill_list.get_all_bills())

@app.route("/bills/<bill_id>", methods=["GET"])
def get_bill(bill_id):
    bill = bill_list.get_bill(bill_id)
    if bill:
        return jsonify(bill.to_dict())
    return jsonify({"error": "Bill not found"}), 404

@app.route("/bills/<bill_id>/vote", methods=["POST"])
def vote_bill(bill_id):
    data = request.json
    option = data.get("option")
    if not option:
        return jsonify({"error": "Vote option required"}), 400
    bill = bill_list.get_bill(bill_id)
    if not bill:
        return jsonify({"error": "Bill not found"}), 404
    try:
        bill.vote(option)
        return jsonify({"message": "Vote recorded", "poll": bill.get_poll_results()})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

# -----------------------
# Chatbot Route
# -----------------------
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    question = data.get("question")
    chat_log = data.get("chatLog", [])

    # Combine chat log into context
    context_text = "\n".join([f"{msg['sender']}: {msg['text']}" for msg in chat_log])

    prompt = f"""
    You are a policy chatbot. Use the previous conversation to provide context.
    Conversation so far:
    {context_text}
    Question: {question}
    Answer:
    """

    answer = get_ai_response(prompt)  # your AI function
    return jsonify({"answer": answer})
# -----------------------
# Run App
# -----------------------
if __name__ == "__main__":
    app.run(debug=True)
