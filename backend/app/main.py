from fastapi import FastAPI, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session 
from app.database import engine, Base, get_db 
from app.services.analytics_services import AnalyticsService 
from app.routes import (
    kanban_router, 
    notes_router, 
    projects_router, 
    recipes_router, 
    monthly_router
)

app = FastAPI(title="OrBee API - TaskFlow")

# --- CORS ---
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.include_router(kanban_router)
analytics_router = APIRouter(prefix="/analytics", tags=["Analytics"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@analytics_router.get("/month")
def get_monthly_data(db: Session = Depends(get_db)):
    service = AnalyticsService(db)
    return service.get_monthly_dashboard()

app.include_router(kanban_router)
app.include_router(notes_router)
app.include_router(projects_router)
app.include_router(recipes_router)
app.include_router(monthly_router, prefix="/monthly", tags=["Monthly Analytics"])

app.include_router(analytics_router)

@app.get("/")
def home():
    return {"status": "ok", "message": "Backend OrBee operando com Clean Architecture!"}