from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import engine, Base, get_db
from app.models import kanban
from pydantic import BaseModel
from typing import List, Optional

# Cria as tabelas no kanban.db
Base.metadata.create_all(bind=engine)

app = FastAPI(title="TaskFlow Kanban")

# --- SCHEMAS (Validação de Dados) ---

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    column_id: int

    class Config:
        from_attributes = True

class ColumnResponse(BaseModel):
    id: int
    title: str
    tasks: List[TaskResponse] = []

    class Config:
        from_attributes = True

class ColumnCreate(BaseModel):
    title: str

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    column_id: int

# --- ROTAS (Endpoints) ---

@app.get("/")
def home():
    return {"status": "ok", "message": "Backend rodando!"}

# Listar todas as colunas e suas tarefas
@app.get("/columns/", response_model=List[ColumnResponse])
def get_columns(db: Session = Depends(get_db)):
    return db.query(kanban.ColumnModel).all()

# Criar uma nova coluna
@app.post("/columns/", response_model=ColumnResponse)
def create_column(column: ColumnCreate, db: Session = Depends(get_db)):
    new_col = kanban.ColumnModel(title=column.title)
    db.add(new_col)
    db.commit()
    db.refresh(new_col)
    return new_col

# Criar uma nova tarefa
@app.post("/tasks/", response_model=TaskResponse, status_code=201)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    # Verifica se a coluna destino existe
    db_column = db.query(kanban.ColumnModel).filter(kanban.ColumnModel.id == task.column_id).first()
    if not db_column:
        raise HTTPException(status_code=404, detail="Coluna não encontrada")

    new_task = kanban.TaskModel(
        title=task.title,
        description=task.description,
        column_id=task.column_id
    )
    
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task