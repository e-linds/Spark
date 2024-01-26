#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Session, Category, SessionCategory, User, Practitioner, UserSession



def create_fake_users():
    for each in range(3):
        new_user = User(
            name = fake.name(),
            email = fake.email(),
            _password_hash = "password",
            job = fake.job()
        )
        db.session.add(new_user)
        db.session.commit()

def create_fake_sessions():
    for each in range(10):
        new_sesh = Session(
            title = f"{fake.word()} {fake.word()} {fake.word()}",
            link = "https://www.youtube.com/watch?v=NNL2klXs3tc",
            practitioner_id = fake.random_int(min=1, max=10),
            text = fake.paragraph()
        )
        db.session.add(new_sesh)


def create_fake_practitioners():
    for each in range(10):
        new_prac = Practitioner(
            name = fake.name()
    )
        db.session.add(new_prac)
        db.session.commit()



def create_fake_categories():
    for each in range(5):
        new_cate = Category(
            name = fake.word()
        )
        db.session.add(new_cate)
        db.session.commit()
    
  


def create_sesh_cate():
    for each in range(25):
        new = SessionCategory(
            session_id = fake.random_int(min=1, max=8),
            category_id = fake.random_int(min=1, max=5)
        )
        db.session.add(new)
        db.session.commit()


def create_user_sesh():
    for each in range(20):
        new = UserSession(
            user_id = fake.random_int(min=1, max=3),
            session_id = fake.random_int(min=1, max=8)
        )
        db.session.add(new)
        db.session.commit()


def create_real_sessions():
    new_sesh1 = Session(
            title = "5 Senses Meditation for Musicians",
            link = "https://www.youtube.com/watch?v=v0cHm7WnLbo",
            practitioner_id = 1,
            text = "This 6 minute meditation is crafted specifically for musicians in the middle of a practice session, and incorporates both physical and mental relaxation techniques. "
        )
    
    new_sesh2 = Session(
            title = "Quick Guided Meditation for Anxiety",
            link = "https://www.youtube.com/watch?v=wuO6nZhD5bo",
            practitioner_id = 2,
            text = "Discover the harmony within: Join us as we explore essential wellness practices for musicians, fostering physical and mental resilience in the pursuit of musical excellence. "
        )
    
    new_sesh3 = Session(
            title = "Reset Breathing for Musicians",
            link = "https://www.youtube.com/watch?v=CVW_IE1nsKE",
            practitioner_id = 3,
            text = "Unlock your potential: Dive into a world of holistic well-being designed for musicians. From mindful breathing to performance psychology, learn how to cultivate a healthy mind and body in this transformative journey. "
        )
    new_sesh4 = Session(
            title = "Stretch & Play: Essential Exercises for Musicians in 10 Minutes",
            link = "https://www.youtube.com/watch?v=v0cHm7WnLbo",
            practitioner_id = 1,
            text = "Tune in to self-care: Explore the secrets of musician wellness in this enlightening video. From nurturing routines to stress-relief techniques, empower yourself to thrive both on and off the stage. "
        )
    new_sesh5 = Session(
            title = "10 Senses Meditation for Musicians",
            link = "https://www.youtube.com/watch?v=CeT_ZAp6juw&t=4s",
            practitioner_id = 2,
            text = "Behind the scenes of musical balance: Discover the rituals and habits that keep musicians in top shape physically and mentally. Join us on this wellness journey, where passion meets purpose. "
        )
    new_sesh6 = Session(
            title = "Music Therapy Techniques for Wellness: The Iso Principle",
            link = "https://www.youtube.com/watch?v=gpjUu2g8fOY",
            practitioner_id = 3,
            text = "Resonate with well-being: Elevate your musical journey by embracing wellness practices tailored for musicians. From exercise routines to mental resilience strategies, find your rhythm in a harmonious life."
        )
    new_sesh7 = Session(
            title = "Quick Fixes for Musician Fatigue: Revitalize Your Passion!",
            link = "https://www.youtube.com/watch?v=Z6W89mJh5yQ",
            practitioner_id = 1,
            text = "Serenade to self-love: Learn how musicians prioritize mental health and self-love in this soulful exploration. Join us as we delve into the practices that resonate with musical hearts."
        )

    new_sesh8 = Session(
            title = "15 Senses Meditation for Musicians",
            link = "https://www.youtube.com/watch?v=66VRriMsP2w",
            practitioner_id = 2,
            text = "The art of well-played breaks: Uncover the importance of rest and rejuvenation in a musician's life. Explore how strategic breaks contribute to enhanced creativity, focus, and overall well-being."
        )
    
    db.session.add(new_sesh1)
    db.session.commit()
    db.session.add(new_sesh2)
    db.session.commit()
    db.session.add(new_sesh3)
    db.session.commit()
    db.session.add(new_sesh4)
    db.session.commit()
    db.session.add(new_sesh5)
    db.session.commit()
    db.session.add(new_sesh6)
    db.session.commit()
    db.session.add(new_sesh7)
    db.session.commit()
    db.session.add(new_sesh8)
    db.session.commit()


def create_real_categories():
    new_cate1 = Category(
            name = "Performance Anxiety"
        )
    new_cate2 = Category(
            name = "Practice Break"
        )
    new_cate3 = Category(
            name = "Competition Prep"
        )
    new_cate4 = Category(
            name = "Physical Release"
        )
    new_cate5 = Category(
            name = "Ground & Center"
        )
    
    db.session.add(new_cate1)
    db.session.commit()
    db.session.add(new_cate2)
    db.session.commit()
    db.session.add(new_cate3)
    db.session.commit()
    db.session.add(new_cate4)
    db.session.commit()
    db.session.add(new_cate5)
    db.session.commit()
    

def create_real_practitioners():
    new_prac1 = Practitioner(
            name = "Jenna Smith"
    )
    new_prac2 = Practitioner(
            name = "James Brody"
    )
    new_prac3 = Practitioner(
            name = "Laura Dwyer"
    )

    db.session.add(new_prac1)
    db.session.commit()
    db.session.add(new_prac2)
    db.session.commit()
    db.session.add(new_prac3)
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
        create_fake_users()
        # create_fake_sessions()
        # create_fake_practitioners()
        # create_fake_categories()
        create_sesh_cate()
        create_user_sesh()

        create_real_sessions()
        create_real_categories()
        create_real_practitioners()




        



        

