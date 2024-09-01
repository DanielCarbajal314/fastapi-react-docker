from .bootstrap import app
from src.routes import user_router

app.include_router(user_router)
