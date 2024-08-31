from flask import request, jsonify
from config import app, db
from models import Papers


@app.route("/")
def home():
    return "Main Flask page here!"

@app.route('/submit', methods=['POST'])
def submit_data():
    
    key = request.form.get('key')
    subject = request.form.get('subject')
    unit = request.form.get('unit')
    year = request.form.get('year')
    teacher = request.form.get('teacher')
    school = request.form.get('school')
    description = request.form.get('description')
    file = request.files['file']

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


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)








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

