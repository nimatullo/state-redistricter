
# Candidate class
class Candidate:
    def __init__(self, name = "", party = ""):
        self.name = name
        self.party = party

    def __str__(self):
        return self.name + " " + self.party 

    def __repr__(self):
        return self.name + " " + self.party

    def __eq__(self, other):
        return self.name == other.name and self.party == other.party
    def __hash__(self):
        return hash((self.name, self.party))

    def get_name(self):
        return self.name

    def get_party(self):
        return self.party


    def set_name(self, name):
        self.name = name

    def set_party(self, party):
        self.party = party
