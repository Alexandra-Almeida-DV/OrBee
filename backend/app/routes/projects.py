from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy.orm.attributes import flag_modified
from app.database import get_db
from app import schemas, models

router = APIRouter(
    prefix="/projects",
    tags=["Projetos"]
)

TYPE_MAPPER = {
    "projeto": "PROJECT", "project": "PROJECT",
    "leitura": "READING", "reading": "READING",
    "estudo": "STUDY", "study": "STUDY",
    "habito": "HABIT", "habit": "HABIT",
    "meta": "GOAL", "goal": "GOAL"
}

@router.get("/", response_model=List[schemas.ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    return db.query(models.kanban.ProjectModel).all()

@router.post("/", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    raw_type = project.type.lower() if project.type else "projeto"
    db_type = TYPE_MAPPER.get(raw_type, "PROJECT")
    
    new_project = models.kanban.ProjectModel(
        name=project.name,
        type=db_type,
        description=project.description or "",
        meta_data=project.meta_data or {},
        progress=0.0
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.put("/{project_id}", response_model=schemas.ProjectResponse)
def update_project(project_id: int, project_data: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = db.query(models.kanban.ProjectModel).filter(models.kanban.ProjectModel.id == project_id).first()
    
    if not db_project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    
    db_project.name = project_data.name
    db_project.description = project_data.description
    db_project.meta_data = project_data.meta_data
    flag_modified(db_project, "meta_data")
    
    db.commit()
    db.refresh(db_project)
    return db_project