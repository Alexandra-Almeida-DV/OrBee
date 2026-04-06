from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import datetime
from app.database import get_db
from app import schemas, models

router = APIRouter(
    prefix="/notes",
    tags=["Notas"]
)

@router.get("/", response_model=List[schemas.NoteResponse])
def get_notes(db: Session = Depends(get_db)):
    return db.query(models.kanban.NoteModel).all()

@router.post("/", response_model=schemas.NoteResponse, status_code=201)
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    new_note = models.kanban.NoteModel(
        title=note.title,
        content=note.content,
        color=note.color or "#FFFFFF",
        date=datetime.date.today().isoformat()
    )
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note

@router.delete("/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    db_note = db.query(models.kanban.NoteModel).filter(models.kanban.NoteModel.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Nota não encontrada")
    db.delete(db_note)
    db.commit()
    return {"status": "success", "message": "Nota excluída"}