from config import db

class Papers(db.Model):
    _id = db.Column("id", db.Integer, primary_key = True)
    name = db.Column(db.Text)
    data = db.Column(db.LargeBinary)
    filename = db.Column(db.Text)
    def __init__(self, data, filename):
        self.data = data
        self.filename = filename