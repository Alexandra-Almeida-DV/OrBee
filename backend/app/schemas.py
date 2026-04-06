from pydantic import BaseModel, ConfigDict
from datetime import date
from typing import Optional, List

# --- BASE CONFIG ---
# Criamos uma base para não precisar repetir o model_config em tudo
class TunedBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

# --- SCHEMAS DE NOTAS ---
class NoteBase(BaseModel):
    title: str
    content: str
    color: Optional[str] = "#FFFFFF"

class NoteCreate(NoteBase):
    pass

class NoteResponse(NoteBase, TunedBase):
    id: int
    date: str  # Se no banco for string, mantém str. Se for date, use date.

# --- SCHEMAS DO KANBAN ---
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: Optional[str] = "medium"
    date: Optional[str] = None

class TaskCreate(TaskBase):
    column_id: int

class Task(TaskBase, TunedBase):
    id: int
    column_id: int

class ColumnBase(BaseModel):
    title: str

class ColumnCreate(ColumnBase):
    pass

class ColumnResponse(ColumnBase, TunedBase):
    id: int
    tasks: List[Task] = []

# --- SCHEMAS DE PROJETOS ---
class ProjectBase(BaseModel):
    name: str
    type: str  
    description: Optional[str] = ""
    meta_data: Optional[dict] = {} 

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase, TunedBase):
    id: int
    progress: float

# --- SCHEMAS DE RECEITAS ---
class RecipeBase(BaseModel):
    title: str
    ingredients: str
    instructions: str
    prepTime: Optional[str] = None
    ovenTime: Optional[str] = None
    category: Optional[str] = "Geral"
    image: Optional[str] = None 

class RecipeCreate(RecipeBase):
    pass

# MUDAMOS DE RecipeResponse PARA Recipe
class Recipe(RecipeBase, TunedBase):
    id: int