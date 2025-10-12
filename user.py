# user.py

class User:
    def __init__(self, email, verified=False):
        self.email = email
        self.verified = verified
        self.voted_bills = set()  # track which bills this user has voted on

    def verify(self):
        self.verified = True

    def can_vote(self, bill_id):
        return self.verified and bill_id not in self.voted_bills

    def vote(self, bill_id):
        if not self.can_vote(bill_id):
            raise ValueError("User cannot vote on this bill")
        self.voted_bills.add(bill_id)
