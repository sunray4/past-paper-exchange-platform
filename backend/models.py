from config import db

# fields are subject, unit, year, teacher, school, description, and file. a key is generated

class Paper(db.Model):
    __tablename__ = "paper"
    id = db.Column("id", db.Integer, primary_key = True)
    key = db.Column(db.String(50))
    subject = db.Column(db.String(100))
    unit = db.Column(db.Integer)
    year = db.Column(db.Integer)
    teacher = db.Column(db.String(200))
    school = db.Column(db.String(200))
    description = db.Column(db.String(1000))
    filename = db.Column(db.String(100))
    data = db.Column(db.LargeBinary)
    ansdata = db.Column(db.LargeBinary)
    

    def __init__(self, key, subject, unit, year, teacher, school, description,filename,data,ansdata):
        self.key = key
        self.subject = subject
        self.unit = unit
        self.year = year
        self.teacher = teacher
        self.school = school
        self.description = description
        self.filename = filename
        self.data = data
        self.ansdata = ansdata
    
    def to_dict(self):
        return {
            "id": self.id,
            "key": self.key,
            "subject": self.subject,
            "unit": self.unit,
            "year": self.year,
            "teacher": self.teacher,
            "school": self.school,
            "description": self.description,
            "filename": self.filename
        }