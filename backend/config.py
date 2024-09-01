from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import timedelta




app = Flask(__name__)
CORS(app)
app.secret_key = "hello"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///paper.db'
app.config['SQLALCHEMY_TRACK_NOTIFICATIONS'] = False




db = SQLAlchemy(app)