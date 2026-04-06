from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas

router = APIRouter(
    prefix="/recipes",
    tags=["Recipes"]
)

@router.get("/", response_model=List[schemas.Recipe])
def get_recipes(db: Session = Depends(get_db)):
    return db.query(models.kanban.RecipeModel).all()

@router.post("/", response_model=schemas.Recipe)
def create_recipe(recipe: schemas.RecipeCreate, db: Session = Depends(get_db)):
    # Criamos a instância do modelo com os dados que vieram do React
    db_recipe = models.kanban.RecipeModel(
        title=recipe.title,
        ingredients=recipe.ingredients,
        instructions=recipe.instructions,
        prepTime=recipe.prepTime,
        ovenTime=recipe.ovenTime,
        category=recipe.category,
        image=recipe.image
    )
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

@router.delete("/{recipe_id}")
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = db.query(models.kanban.RecipeModel).filter(models.kanban.RecipeModel.id == recipe_id).first()
    if not db_recipe:
        raise HTTPException(status_code=404, detail="Receita não encontrada")
    db.delete(db_recipe)
    db.commit()
    return {"message": "Receita deletada com sucesso"}