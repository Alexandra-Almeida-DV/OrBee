from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import kanban, notes, projects, recipes

app = FastAPI(title="OrBee API - TaskFlow")

# --- CONFIGURAÇÃO DE CORS ---
# Isso permite que o seu Frontend (React) acesse o Backend sem ser bloqueado
origins = [
    "http://localhost:5173",    # Porta padrão do Vite
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria as tabelas no banco de dados automaticamente
Base.metadata.create_all(bind=engine)

# --- REGISTRO DAS ROTAS MODULARES ---
app.include_router(kanban.router)
app.include_router(notes.router)
app.include_router(projects.router)
app.include_router(recipes.router)

@app.get("/")
def home():
    return {"status": "ok", "message": "Backend OrBee operando com Clean Architecture!"}