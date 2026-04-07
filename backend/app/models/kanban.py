from sqlalchemy import Column, Integer, String, Float, ForeignKey, JSON, Date, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class ColumnModel(Base):
    __tablename__ = "columns"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    tasks = relationship("TaskModel", back_populates="column", cascade="all, delete-orphan")

class TaskModel(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    priority = Column(String, default="medium")
    date = Column(String, nullable=True)
    completed = Column(Boolean, default=False) 
    column_id = Column(Integer, ForeignKey("columns.id"))
    goal_id = Column(Integer, ForeignKey("goals.id"), nullable=True)
    column = relationship("ColumnModel", back_populates="tasks")

class Goal(Base):
    __tablename__ = "goals"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    current_value = Column(Float, default=0.0)
    target_value = Column(Float, default=100.0)
    color = Column(String)
    month_reference = Column(Date)

class NoteModel(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    color = Column(String, default="#FFFFFF")
    date = Column(String, nullable=False)

class ProjectModel(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False) 
    description = Column(String, default="")
    progress = Column(Float, default=0.0)
    meta_data = Column(JSON, default={}) 

class RecipeModel(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    ingredients = Column(String, nullable=False)
    instructions = Column(String, nullable=False)
    prepTime = Column(String, nullable=True)
    ovenTime = Column(String, nullable=True)
    category = Column(String, default="Geral")
    image = Column(String, nullable=True)