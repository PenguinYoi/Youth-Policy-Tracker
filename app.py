from flask import Flask, jsonify, request
from flask_cors import CORS
from bills import BillList  # your Bill and BillList classes with all bill data

app = Flask(__name__)
CORS(app)

# Initialize your bill list (all bills already added in bills.py)
bill_list = BillList()

# -----------------------
# Routes
# -----------------------

# Get all bills
@app.route("/bills", methods=["GET"])
def get_bills():
    return jsonify(bill_list.get_all_bills())

# Get a single bill by ID
@app.route("/bills/<bill_id>", methods=["GET"])
def get_bill(bill_id):
    bill = bill_list.get_bill(bill_id)
    if bill:
        return jsonify(bill.to_dict())
    return jsonify({"error": "Bill not found"}), 404

# Vote on a bill (no user_id for now)
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
        bill.vote(option)  # simplified vote method, no user_id
        return jsonify({"message": "Vote recorded", "poll": bill.get_poll_results()})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

# -----------------------
# Run app
# -----------------------
if __name__ == "__main__":
    app.run(debug=True)
