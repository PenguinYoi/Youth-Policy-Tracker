class Bill:
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
        if option == "support":
            self.support_num += 1
        elif option == "oppose":
            self.oppose_num += 1
        elif option == "not_sure":
            self.not_sure_num += 1
        else:
            raise ValueError("Invalid vote option")

    def get_poll_results(self):
        return {
            "support": self.support_num,
            "oppose": self.oppose_num,
            "not_sure": self.not_sure_num
        }


class BillList:
    def __init__(self):
        self.bills = [
            Bill(
                "AB1",
                "Land Development in Fort Mohave Valley: What’s Changing?",
                "Signed into Law (Chapter 60)",
                "September 27, 2024",
                "https://www.leg.state.nv.us/App/NELIS/REL/83rd2025/Bill/11742/Overview",
                "Assembly Bill 1 proposes to remove certain regulations related to land development and disposal in the Fort Mohave Valley area. This change could impact how land is used and developed in that region. While the bill doesn't directly affect students statewide, it's important to stay informed about local legislation that might influence community planning and development."
            ),
            Bill(
                "AB2",
                "Public Support for Educational Institutions for Profoundly Gifted Pupils",
                "No Longer Moving Forward",
                "Sep 27, 2024",
                "https://www.leg.state.nv.us/App/NELIS/REL/83rd2025/Bill/11745/Overview",
                "Assembly Bill 2 proposes adjustments to the total public support allocated to school districts, charter schools, and university schools for profoundly gifted pupils for the Fiscal Year 2025-2026. This bill aims to enhance funding for specialized educational programs catering to profoundly gifted students, ensuring they receive appropriate resources and support during the specified fiscal year."
            ),
            Bill(
                "AB3",
                "School Bus Safety Camera Program",
                "Signed into Law (Chapter 215)",
                "Oct 9, 2024",
                "https://www.leg.state.nv.us/App/NELIS/REL/83rd2025/Bill/11748/Overview",
                "Assembly Bill 13 authorizes the establishment of a school bus safety camera program to detect and enforce violations of laws prohibiting passing a stopped school bus. The bill allows school districts to contract with vendors to install and operate cameras, with penalties collected being distributed to support school safety initiatives."
            ),
        ]

    def get_all_bills(self):
        return [bill.to_dict() for bill in self.bills]

    def get_bill(self, bill_id):
        for bill in self.bills:
            if bill.id == bill_id:
                return bill
        return None
