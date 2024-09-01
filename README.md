Our project is developed for Recess Hacks 4.0 according to its theme education-technology. We developed a full stack web application that facilitates sharing past papers across the web to help students prepare for tests and exams.

Run the following terminal commands to run the project:

1. % cd frontend
2. % npm install
3. % cd ../backend
4. % pip install flask Flask-SQLAlchemy flask-cors
5. % flask shell
6. from config import app, db
7. with app.app_context():
8. db.drop_all()
9. db.create_all()
10. exit()
11. % cd ../frontend
12. % npm run
