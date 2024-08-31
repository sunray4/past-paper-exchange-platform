from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = "hello"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///papers.sqlite3'
app.config['SQLALCHEMY_TRACK_NOTIFICATIONS'] = False

db = SQLAlchemy(app)

class papers(db.Model):
    _id = db.Column("id", db.Integer, primary_key = True)
    name = db.Column(db.Text)
    data = db.Column(db.LargeBinary)
    filename = db.Column(db.Text)
    def __init__(self, data, filename):
        self.data = data
        self.filename = filename
        

@app.route("/")
def home():
    return "Main Flask page here!"

@app.route('/submit', methods=['POST', 'GET'])
def submit_data():
    
    # Get JSON data from the request
    data = request.json

    # Extract fields from JSON data
    key = data.get('key')
    subject = data.get('subject')
    unit = data.get('unit')
    year = data.get('year')
    teacher = data.get('teacher')
    school = data.get('school')
    description = data.get('description')

    # Log the data for debugging
    print(f"Key: {key}")
    print(f"Subject: {subject}")
    print(f"Unit: {unit}")
    print(f"Year: {year}")
    print(f"Teacher: {teacher}")
    print(f"School: {school}")
    print(f"Description: {description}")

    # Respond with success
    return jsonify({'message': 'Form data received successfully'})

    
# @app.route("/submit" , methods=['POST'])
# def submit():
#     if request.method == 'POST':
#         data = request.json  # Get the JSON data from the request
#         print(f"Received data: {data}")
#         # You can process the data here and save it as needed.

#         file = data.file
#         paper = papers(file.read(), file.filename())
#         db.session.add(paper)
#         db.session.commit
#         return jsonify({"message": "Data received successfully"}), 200


# message = "Hello from Flask API!!!!"
# @app.route('/api/data', methods=['GET', 'POST'])
# def handle_data():
#     if request.method == 'POST':
#         data = request.json
#         print(f"Received data: {data}")
#         response = {"status": "success", "received": data}
#         message = data
#         return jsonify(response)
#     else:
#         data = {"message": message}
#         return jsonify(data)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        app.run(debug=True)