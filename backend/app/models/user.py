from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    display_name = Column(String, nullable=True) 
    phone = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    photo_url = Column(String, nullable=True) 