#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db
# Add your model imports
from models import *

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


@app.route('/signup', methods = ["POST"])
def signup():
    if request.method == "POST":
        try:
            data = request.get_json()
            new_user = User(
                name = data.get("name"),
                email = data.get("email"),
                job = data.get("job"),
                image_url = data.get("image_url")
            )
            new_user.password_hash = data["password"]
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id
            return new_user.to_dict(), 201
        except Exception as e:
            print(e)
            return {"error": "failure to sign up"}, 422



@app.route('/check_session', methods = ["GET"])
def check_session():
    if request.method == "GET":
        if session["user_id"]:
            user = User.query.filter(User.id == session["user_id"]).first()
            return user.to_dict(), 200
        else:
            return {"Error": "unauthorized"}, 401


@app.route('/login', methods = ["POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        user = User.query.filter(User.email == data.get("email")).first()
        if user:
        
            password = data["password"]

            if user.authenticate(password):
                session["user_id"] = user.id
                return user.to_dict(), 200

        return {"error": "invalid email or password"}, 401
    


@app.route('/logout', methods = ["DELETE"])
def logout():
    if request.method == "DELETE":
        if session["user_id"]:
            session["user_id"] = None
            return {}, 204

        return {"error": "not logged in"}, 401
    

@app.route('/sessions', methods = ["GET"])
def sessions():
    sessions = Session.query.all()

    if request.method == "GET":
        all_sessions = []
        for each in sessions:
            all_sessions.append(each.to_dict(rules=('-users', '-categories',)))
        return all_sessions, 200
    
@app.route('/practitioners', methods = ["GET"])
def practitioners():
    practs = Practitioner.query.all()

    if request.method == "GET":
        all_practs = []
        for each in practs:
            all_practs.append(each.to_dict())
        return all_practs, 200
    


@app.route('/sessions/<int:id>', methods = ["GET"])
def session_by_id(id):
    session = Session.query.filter(Session.id == id).first()

    if request.method == "GET":
        return session.to_dict(rules=('-users', '-categories',)), 200



    











if __name__ == '__main__':
    app.run(port=5555, debug=True)

