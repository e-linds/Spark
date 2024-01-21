from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Column, String, Integer, ForeignKey, MetaData
from sqlalchemy.orm import validates, relationship
from flask_sqlalchemy import SQLAlchemy

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True)
    name = Column(String, nullable = False)
    _password_hash = Column(String)
    email = Column(String, nullable = False, unique = True)
    job = Column(String)

    sessions = relationship("UserSession", back_populates = "user", cascade = "all, delete")

    serialize_rules = ('-sessions.user',)



class Category(db.Model, SerializerMixin):
    __tablename__ = "categories"

    id = Column(Integer, primary_key = True)
    name = Column(String)

    sessions = relationship("SessionCategory", back_populates = "category", cascade = "all, delete")

    serialize_rules = ('-sessions.category',)


class Session(db.Model, SerializerMixin):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key = True)
    title = Column(String)
    link = Column(String)
    practitioner_id = Column(Integer, ForeignKey("practitioners.id"))

    categories = relationship("SessionCategory", back_populates = "session", cascade = "all, delete")
    users = relationship("UserSession", back_populates = "session", cascade = "all, delete")

    serialize_rules = ('-categories.session', '-users.session',)



class SessionCategory(db.Model, SerializerMixin):
    __tablename__ = "sessioncategories"

    id = Column(Integer, primary_key = True)

    category_id = Column(Integer, ForeignKey("categories.id"))
    session_id = Column(Integer, ForeignKey("sessions.id"))

    session = relationship("Session", back_populates = "categories")
    category = relationship("Category", back_populates = "sessions")

    serialize_rules = ('-session.categories', 'category.sessions',)


class UserSession(db.Model, SerializerMixin):
    __tablename__ = "usersessions"

    id = Column(Integer, primary_key = True)
    user_id = Column(Integer, ForeignKey("users.id"))
    session_id = Column(Integer, ForeignKey("sessions.id"))

    user = relationship("User", back_populates = "sessions")
    session = relationship("Session", back_populates = "users")



class Practitioner(db.Model, SerializerMixin):
    __tablename__ = "practitioners"

    id = Column(Integer, primary_key = True)
    name = Column(String)










    



    



# Models go here!
