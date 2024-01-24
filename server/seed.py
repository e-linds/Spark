#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Session, Category, SessionCategory, User, Practitioner, UserSession



def create_users():
    for each in range(3):
        new_user = User(
            name = fake.name(),
            email = fake.email(),
            _password_hash = "password",
            job = fake.job()
        )
        db.session.add(new_user)
        db.session.commit()

def create_sessions():
    for each in range(10):
        new_sesh = Session(
            title = f"{fake.word()} {fake.word()} {fake.word()}",
            link = "https://www.youtube.com/watch?v=NNL2klXs3tc",
            practitioner_id = fake.random_int(min=1, max=10),
            text = fake.paragraph()
        )
        db.session.add(new_sesh)


def create_practitioners():
    for each in range(10):
        new_prac = Practitioner(
            name = fake.name()
    )
        db.session.add(new_prac)
        db.session.commit()



def create_categories():
    for each in range(5):
        new_cate = Category(
            name = fake.word()
        )
        db.session.add(new_cate)
        db.session.commit()
    
  


def create_sesh_cate():
    for each in range(25):
        new = SessionCategory(
            session_id = fake.random_int(min=1, max=10),
            category_id = fake.random_int(min=1, max=5)
        )
        db.session.add(new)
        db.session.commit()


def create_user_sesh():
    for each in range(20):
        new = UserSession(
            user_id = fake.random_int(min=1, max=3),
            session_id = fake.random_int(min=1, max=10)
        )
        db.session.add(new)
        db.session.commit()


        
        

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Clearing database...")

        User.query.delete()
        Session.query.delete()
        Category.query.delete()
        Practitioner.query.delete()
        SessionCategory.query.delete()
        UserSession.query.delete()

        print("Starting seed...")
        create_users()
        create_sessions()
        create_practitioners()
        create_categories()
        create_sesh_cate()
        create_user_sesh()




        



        

