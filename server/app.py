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
            all_sessions.append(each.to_dict())
        return all_sessions, 200
    
@app.route('/practitioners', methods = ["GET"])
def practitioners():
    practs = Practitioner.query.all()

    if request.method == "GET":
        all_practs = []
        for each in practs:
            all_practs.append(each.to_dict())
        return all_practs, 200
    
@app.route('/categories', methods = ["GET"])
def categories():
    categs = Category.query.all()

    if request.method == "GET":
        all_categs = []
        for each in categs:
            all_categs.append(each.to_dict())
        return all_categs, 200
    

@app.route('/sessions/<int:id>', methods = ["GET"])
def session_by_id(id):
    session = Session.query.filter(Session.id == id).first()

    if request.method == "GET":
        return session.to_dict(), 200
    

@app.route('/users/<int:id>', methods = ["GET", "PATCH", "DELETE"])
def user_by_id(id):
    user = User.query.filter(User.id == id).first()

    if request.method == "GET":
        return user.to_dict(), 200
    
    if request.method == "PATCH":
        try:
            json_dict = request.get_json()
            for attr in json_dict:
                setattr(user, attr, json_dict.get(attr))
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 200
        except:
            return {"error": "unable to edit"}, 304
        
    if request.method == "DELETE":
        db.session.delete(user)
        db.session.commit()
        return {}, 204
        
@app.route('/sessions/<int:id>/categories', methods = ["GET"])
def get_session_categories(id):
    # session = Session.query.filter(Session.id == id).first()
    sesh_categ_list = SessionCategory.query.filter(SessionCategory.session_id == id).all()
    

    if request.method == "GET":
        categories = []
        for each in sesh_categ_list:
            categories.append(each.category_id)
        categ_id_list = set(categories)
        categ_obj_list = []
        for each in categ_id_list:
            category = Category.query.filter(Category.id == each).first()
            categ_obj_list.append(category)
        final_list = []
        for each in categ_obj_list:
            final_list.append(each.to_dict())
        return final_list, 200


@app.route('/us', methods = ["GET", "POST"])
def usersessions():
    # print("hello")
    usersessions = UserSession.query.all()

    if request.method == "GET":
            all_usersesh = []
            for each in usersessions:
                all_usersesh.append(each.to_dict())
            return all_usersesh, 200
       
        
    
    if request.method == "POST":
        try:
            data = request.get_json()
            new_usersesh = UserSession(
                session_id = data.get("session_id"),
                user_id = data.get("user_id")
            )
            db.session.add(new_usersesh)
            db.session.commit()
            #specifically want to return the whole array, not just the one object
            all = []
            usersessions_new = UserSession.query.all()
            for each in usersessions_new:
                all.append(each.to_dict())
            return all, 201
        except:
            return {"error": "unable to add"}, 409

@app.route('/test')
def test():
    return {}


@app.route('/usersessions/<int:id>', methods = ["GET", "PATCH", "DELETE"])
def usersessions_by_id(id):
    usersession = UserSession.query.filter(UserSession.id == id).first()

    if request.method == "DELETE":
        try:
            db.session.delete(usersession)
            db.session.commit()
            usersessions = UserSession.query.all()
            all = []
            for each in usersessions:
                all.append(each.to_dict())
            return all, 204
        except:
            return {"error": "unable to delete"}, 400
        

@app.route('/practitioners/<int:id>/sessions', methods = ["GET"])
def practioner_sessions(id):
    sessions = Session.query.filter(Session.practitioner_id == id).all()

    if request.method == "GET":
        practs_sessions = []
        for each in sessions:
            practs_sessions.append(each.to_dict(rules=('-users', '-categories',)))
        return practs_sessions, 200
        





    



    





    



if __name__ == '__main__':
    app.run(port=5555, debug=True)

