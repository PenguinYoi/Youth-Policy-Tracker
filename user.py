import json
with open("NV/2025-2025_83rd_Legislature/bill/AB1.json") as f:
    bill_data = json.load(f)
    print(json.dumps(bill_data, indent=2))