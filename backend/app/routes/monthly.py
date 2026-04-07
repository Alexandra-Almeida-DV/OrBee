from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db # Corrigido aqui
from app.services.analytics_services import AnalyticsService

router = APIRouter()

@router.get("/dashboard")
def get_monthly_analytics(db: Session = Depends(get_db)):
    service = AnalyticsService(db)
    return service.get_monthly_dashboard()