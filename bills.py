import json
import os


class Bill:
    """Represents a single legislative bill"""
    def __init__(self, bill_id, name, status, date_introduced, link, summary=""):
        self.id = bill_id
        self.name = name
        self.status = status
        self.date_introduced = date_introduced
        self.link = link
        self.summary = summary
        self.support_num = 0
        self.oppose_num = 0
        self.not_sure_num = 0
        self.voted_users = set()

    def to_dict(self):
        """Convert bill to dictionary format for JSON responses"""
        return {
            "id": self.id,
            "name": self.name,
            "status": self.status,
            "date_introduced": self.date_introduced,
            "link": self.link,
            "summary": self.summary,
            "support_num": self.support_num,
            "oppose_num": self.oppose_num,
            "not_sure_num": self.not_sure_num
        }

    def vote(self, option):
        """Record a user's vote on the bill"""
        if option == "support":
            self.support_num += 1
        elif option == "oppose":
            self.oppose_num += 1
        elif option == "not_sure":
            self.not_sure_num += 1
        else:
            raise ValueError("Invalid vote option. Must be 'support', 'oppose', or 'not_sure'")

    def get_poll_results(self):
        """Get current poll results for the bill"""
        return {
            "support": self.support_num,
            "oppose": self.oppose_num,
            "not_sure": self.not_sure_num
        }


class BillList:
    """Manages a collection of bills"""
    
    DEFAULT_BILLS = [
        {
            "id": "AB1",
            "name": "Land Development in Fort Mohave Valley: What's Changing?",
            "status": "Signed into Law (Chapter 60)",
            "date_introduced": "September 27, 2024",
            "link": "https://www.leg.state.nv.us/App/NELIS/REL/83rd2025/Bill/11742/Overview",
            "summary": "Assembly Bill 1 proposes to remove certain regulations related to land development and disposal in the Fort Mohave Valley area. This change could impact how land is used and developed in that region. While the bill doesn't directly affect students statewide, it's important to stay informed about local legislation that might influence community planning and development."
        },
        {
            "id": "AB2",
            "name": "Public Support for Educational Institutions for Profoundly Gifted Pupils",
            "status": "No Longer Moving Forward",
            "date_introduced": "Sep 27, 2024",
            "link": "https://www.leg.state.nv.us/App/NELIS/REL/83rd2025/Bill/11745/Overview",
            "summary": "Assembly Bill 2 proposes adjustments to the total public support allocated to school districts, charter schools, and university schools for profoundly gifted pupils for the Fiscal Year 2025-2026. This bill aims to enhance funding for specialized educational programs catering to profoundly gifted students, ensuring they receive appropriate resources and support during the specified fiscal year."
        },
        {
            "id": "AB3",
            "name": "School Bus Safety Camera Program",
            "status": "Signed into Law (Chapter 215)",
            "date_introduced": "Oct 9, 2024",
            "link": "https://www.leg.state.nv.us/App/NELIS/REL/83rd2025/Bill/11748/Overview",
            "summary": "Assembly Bill 13 authorizes the establishment of a school bus safety camera program to detect and enforce violations of laws prohibiting passing a stopped school bus. The bill allows school districts to contract with vendors to install and operate cameras, with penalties collected being distributed to support school safety initiatives."
        },
    ]
    
    BILLS_FILE = "nevada_bills.json"
    
    def __init__(self):
        self.bills = []
        self.load_bills()
    
    def load_bills(self):
        """Load bills from JSON file, or use default bills if file doesn't exist"""
        if os.path.exists(self.BILLS_FILE):
            try:
                with open(self.BILLS_FILE, 'r') as f:
                    bills_data = json.load(f)
                    for bill_data in bills_data:
                        bill = Bill(
                            bill_data["id"],
                            bill_data["name"],
                            bill_data["status"],
                            bill_data["date_introduced"],
                            bill_data["link"],
                            bill_data["summary"]
                        )
                        self.bills.append(bill)
                print(f"Loaded {len(self.bills)} bills from {self.BILLS_FILE}")
            except Exception as e:
                print(f"Error loading bills from file: {e}. Using default bills.")
                self._load_default_bills()
        else:
            self._load_default_bills()
    
    def _load_default_bills(self):
        """Load the default hardcoded bills"""
        for bill_data in self.DEFAULT_BILLS:
            bill = Bill(
                bill_data["id"],
                bill_data["name"],
                bill_data["status"],
                bill_data["date_introduced"],
                bill_data["link"],
                bill_data["summary"]
            )
            self.bills.append(bill)
        print(f"Loaded {len(self.bills)} default bills")
    
    def save_bills(self):
        """Save current bills to JSON file"""
        bills_data = [bill.to_dict() for bill in self.bills]
        try:
            with open(self.BILLS_FILE, 'w') as f:
                json.dump(bills_data, f, indent=2)
            print(f"Saved {len(bills_data)} bills to {self.BILLS_FILE}")
        except Exception as e:
            print(f"Error saving bills: {e}")

    def get_all_bills(self):
        """Get all bills as dictionaries"""
        return [bill.to_dict() for bill in self.bills]

    def get_bill(self, bill_id):
        """Get a specific bill by ID"""
        for bill in self.bills:
            if bill.id == bill_id:
                return bill
        return None
    
    def add_bill(self, bill):
        """Add a new bill to the list"""
        if not self.get_bill(bill.id):
            self.bills.append(bill)
            self.save_bills()
            return True
        return False
    
    def add_bills_bulk(self, bills_data):
        """Add multiple bills at once (for importing)"""
        added = 0
        for bill_data in bills_data:
            bill = Bill(
                bill_data["bill_id"],
                bill_data["name"],
                bill_data["status"],
                bill_data["date_introduced"],
                bill_data["link"],
                bill_data["summary"]
            )
            if self.add_bill(bill):
                added += 1
        print(f"Added {added} new bills")
        return added
    
    def remove_bill(self, bill_id):
        """Remove a bill from the list"""
        self.bills = [bill for bill in self.bills if bill.id != bill_id]
        self.save_bills()