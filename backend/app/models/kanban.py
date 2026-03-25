from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class ColumnModel(Base):
    __tablename__ = "columns"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50), nullable=False)
    order = Column(Integer, default=0)
    
    tasks = relationship("TaskModel", back_populates="column", cascade="all, delete-orphan")

class TaskModel(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    priority = Column(String(20), default="medium")
    position = Column(Integer, default=0)
    
    column_id = Column(Integer, ForeignKey("columns.id"))
    column = relationship("ColumnModel", back_populates="tasks")