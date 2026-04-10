from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.services.auth_services import AuthService
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Autenticação"])

@router.post("/register", response_model=schemas.UserResponse, status_code=201)
def register_user(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Este e-mail já está cadastrado.")

    hashed_pwd = AuthService.hash_password(user_data.password)

    new_user = models.user.User(
        email=user_data.email,
        hashed_password=hashed_pwd,
        full_name=user_data.full_name,
        display_name=user_data.display_name,
        phone=user_data.phone,
        bio=user_data.bio
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login(user_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user or not AuthService.verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos")

    access_token = AuthService.create_access_token(data={"sub": user.email})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {
             "id": user.id, 
             "email": user.email,
             "full_name": user.full_name,
             "display_name": user.display_name or user.full_name 
             }
    }