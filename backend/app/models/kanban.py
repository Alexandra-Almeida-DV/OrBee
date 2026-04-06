from sqlalchemy import Column, Integer, String, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class ColumnModel(Base):
    __tablename__ = "columns"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    
    # Relacionamento: Uma coluna tem muitas tarefas
    tasks = relationship("TaskModel", back_populates="column", cascade="all, delete-orphan")

class TaskModel(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    priority = Column(String, default="medium")
    date = Column(String, nullable=True)
    column_id = Column(Integer, ForeignKey("columns.id"))

    # Relacionamento: A tarefa pertence a uma coluna
    column = relationship("ColumnModel", back_populates="tasks")

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
    type = Column(String, nullable=False) # PROJECT, READING, etc.
    description = Column(String, default="")
    progress = Column(Float, default=0.0)
    meta_data = Column(JSON, default={}) # Armazena campos extras do React

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