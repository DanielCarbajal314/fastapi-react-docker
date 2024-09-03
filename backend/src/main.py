from src.routes import project_router, task_router, user_router

from .bootstrap import app

app.include_router(user_router)
app.include_router(project_router)
app.include_router(task_router)
