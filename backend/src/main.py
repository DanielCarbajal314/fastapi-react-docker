from .bootstrap import app
from src.routes import user_router, project_router, task_router

app.include_router(user_router)
app.include_router(project_router)
app.include_router(task_router)
