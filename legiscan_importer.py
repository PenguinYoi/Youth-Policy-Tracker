import json
import os
from pathlib import Path
from bills import BillList, Bill
import re

"""
LegiScan JSON Dataset Importer
Imports bills from LegiScan's JSON dataset format
Generates high school-friendly titles and summaries using text processing
"""

# Path to the NV dataset folder
NV_DATASET_PATH = "NV"
SESSION_FOLDER = "2025-2025_83rd_Legislature"
BILLS_FOLDER = os.path.join(NV_DATASET_PATH, SESSION_FOLDER, "bill")


def generate_high_school_title(bill_number, original_title, bill_description):
    """
    Generate a high school-friendly title by simplifying legal language
    """
    # Remove common legal prefixes and suffixes
    title = original_title
    
    # Remove "(BDR ...)" pattern
    title = re.sub(r'\s*\(BDR\s+[\d\-]+\)', '', title)
    
    # Remove "An act relating to" or "Revises provisions relating to"
    title = re.sub(r'^An act relating to\s+', '', title, flags=re.IGNORECASE)
    title = re.sub(r'^Revises provisions relating to\s+', 'Changes to ', title, flags=re.IGNORECASE)
    
    # Capitalize first letter
    title = title[0].upper() + title[1:] if title else title
    
    # Add a friendly question format if it's too generic
    if len(title) < 10 or title.startswith("AN"):
        topic = extract_main_topic(bill_description)
        if topic:
            title = f"What's Changing: {topic.capitalize()}?"
    
    return title.strip()


def extract_main_topic(text):
    """
    Extract the main topic from a bill description
    """
    if not text:
        return None
    
    # Look for key topics
    topics = {
        'education': ['school', 'student', 'teacher', 'pupil', 'classroom', 'educational'],
        'healthcare': ['health', 'medical', 'doctor', 'patient', 'hospital', 'insurance'],
        'environment': ['environment', 'water', 'pollution', 'air', 'climate', 'conservation'],
        'tax': ['tax', 'revenue', 'income', 'property'],
        'transportation': ['vehicle', 'driver', 'license', 'road', 'traffic', 'bus'],
        'housing': ['house', 'home', 'property', 'real estate', 'landlord', 'tenant'],
        'business': ['business', 'small business', 'commerce', 'trade'],
        'employment': ['employment', 'employee', 'employer', 'wage', 'work'],
        'crime': ['crime', 'criminal', 'offense', 'penalty', 'law enforcement'],
        'government': ['government', 'agency', 'budget', 'state', 'county']
    }
    
    text_lower = text.lower()
    
    for topic, keywords in topics.items():
        for keyword in keywords:
            if keyword in text_lower:
                return topic
    
    return None


def generate_high_school_summary(bill_title, bill_description):
    """
    Generate a high school-friendly summary by simplifying legal language
    """
    if not bill_description:
        return "No description available"
    
    # Remove excessive legal jargon
    summary = bill_description
    
    # Replace complex phrases with simple ones
    replacements = {
        r'An act relating to': 'This bill is about',
        r'Revises provisions relating to': 'Changes rules about',
        r'Authorizes': 'Allows',
        r'Requires': 'Requires',
        r'Prohibits': 'Prevents',
        r'establishes': 'creates',
        r'shall': 'will',
        r'thereof': 'of it',
        r'; and': '. And',
        r'providing other matters properly relating thereto': '',
    }
    
    for pattern, replacement in replacements.items():
        summary = re.sub(pattern, replacement, summary, flags=re.IGNORECASE)
    
    # Split into sentences and take first 2-3
    sentences = re.split(r'[.!?]+', summary)
    sentences = [s.strip() for s in sentences if s.strip()]
    
    # Use first 2-3 sentences, max 300 characters
    summary = '. '.join(sentences[:3])
    if summary.endswith('.'):
        summary = summary
    else:
        summary = summary + '.'
    
    # Truncate if too long
    if len(summary) > 400:
        summary = summary[:397] + "..."
    
    return summary


def load_bills_from_json_dataset():
    """
    Load all bills from the LegiScan JSON dataset
    Returns list of bill data
    """
    bills = []
    
    if not os.path.exists(BILLS_FOLDER):
        print(f"Error: {BILLS_FOLDER} not found")
        print("Make sure you have downloaded the NV dataset from LegiScan")
        return bills
    
    try:
        # Get all JSON files in the bill directory
        bill_files = sorted([f for f in os.listdir(BILLS_FOLDER) if f.endswith('.json')])
        print(f"Found {len(bill_files)} bill JSON files")
        print()
        
        for i, filename in enumerate(bill_files):
            try:
                filepath = os.path.join(BILLS_FOLDER, filename)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    bill_data = json.load(f)
                
                # Extract bill information from LegiScan format
                if 'bill' in bill_data:
                    bill = bill_data['bill']
                    
                    # Extract info
                    bill_number = bill.get("bill_number", "")
                    original_title = bill.get("title", "")
                    description = bill.get("description", "")
                    
                    # Generate high school-friendly versions
                    print(f"{bill_number}:")
                    hs_title = generate_high_school_title(bill_number, original_title, description)
                    print(f"  Title: {hs_title}")
                    hs_summary = generate_high_school_summary(hs_title, description)
                    print(f"  Summary: {hs_summary[:100]}...")
                    print()
                    
                    # Map LegiScan data to our Bill format
                    processed_bill = {
                        "bill_id": bill_number,
                        "name": hs_title,
                        "status": get_bill_status(bill),
                        "date_introduced": format_date(bill.get("status_date", "")),
                        "link": generate_nevada_legislature_link(bill, bill_number),
                        "summary": hs_summary
                    }
                    
                    bills.append(processed_bill)
                    
                    if (i + 1) % 50 == 0:
                        print(f"✓ Processed {i + 1} bills...")
                
            except Exception as e:
                print(f"Error processing {filename}: {e}")
                continue
        
        print(f"\n✓ Successfully loaded {len(bills)} bills")
        return bills
        
    except Exception as e:
        print(f"Error reading bills folder: {e}")
        return bills


def get_bill_status(bill):
    """
    Extract and format bill status from the bill's history
    """
    # Check the bill history for the most recent status
    history = bill.get("history", [])
    
    if history:
        # Look through history from most recent backward
        for action_item in reversed(history):
            action = action_item.get("action", "").lower()
            
            # Check for signed/approved by governor
            if "approved by the governor" in action or "signed" in action:
                return "Signed into Law"
            
            # Check for enacted/became law
            if "enacted" in action or "becomes law" in action or "chapter" in action:
                return "Signed into Law"
            
            # Check for failed/rejected
            if "failed" in action or "rejected" in action or "dead" in action or "defeated" in action:
                return "No Longer Moving Forward"
            
            # Check for passed (both chambers)
            if "passed" in action and "final passage" in action:
                return "Passed"
    
    # Fallback to status code if history doesn't help
    status_code = bill.get("status", 0)
    
    # LegiScan status codes: 1=introduced, 2=enacted, 3=dead, 4=other
    if status_code == 2:
        return "Signed into Law"
    elif status_code == 3:
        return "No Longer Moving Forward"
    elif status_code in [1, 4]:
        return "In Progress"
    
    return "In Progress"


def generate_nevada_legislature_link(bill, bill_number):
    """
    Generate link to Nevada Legislature official page
    Uses the state_link from the bill if available
    """
    # Try to get the official state link from LegiScan data
    state_link = bill.get("state_link")
    
    if state_link:
        return state_link
    
    # Fallback: construct a link based on bill number
    # This won't be perfect but better than nothing
    return f"https://www.leg.state.nv.us/App/NELIS/REL/83rd2025/Bills/List"


def format_date(date_str):
    """
    Format date string to readable format
    """
    if not date_str:
        return "Unknown"
    
    # LegiScan usually provides dates in YYYY-MM-DD format
    try:
        from datetime import datetime
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        return date_obj.strftime("%B %d, %Y")
    except:
        return date_str


def import_bills_to_system(bills_data):
    """
    Import bills into the BillList system
    """
    bill_list = BillList()
    
    if not bills_data:
        print("No bills to import")
        return bill_list
    
    added = bill_list.add_bills_bulk(bills_data)
    print(f"Total bills in system: {len(bill_list.bills)}")
    
    return bill_list


def main():
    """
    Main execution
    """
    print("LegiScan Nevada Bill Importer")
    print("=" * 50)
    print()
    
    # Step 1: Load bills from JSON dataset
    print("Step 1: Loading bills from LegiScan JSON dataset...")
    print("-" * 50)
    bills_data = load_bills_from_json_dataset()
    
    if not bills_data:
        print("Failed to load bills. Exiting.")
        return
    
    print()
    
    # Step 2: Import into system
    print("Step 2: Importing bills into system...")
    bill_list = import_bills_to_system(bills_data)
    
    print()
    print("✓ Import complete!")
    print(f"Total bills imported: {len(bill_list.bills)}")
    print(f"Bills saved to: nevada_bills.json")
    print()
    print("Sample bills:")
    for bill in bill_list.bills[:3]:
        print(f"  • {bill.id}: {bill.name}")


if __name__ == "__main__":
    main()