from typing import List
from fastapi import APIRouter, Depends
from src.use_cases.projects import (
    CreateProjectRequest,
    CreateProjectHandler,
    CreateProjectResponse,
    ListProjectResponseItem,
    ListProjectHandler,
    ListProjectRequest,
)

project_router = APIRouter(prefix="/projects", tags=["projects"])


@project_router.post("/", response_model=CreateProjectResponse)
async def create_project(
    request: CreateProjectRequest, handler: CreateProjectHandler = Depends(CreateProjectHandler)
) -> CreateProjectResponse:
    return await handler.execute(request)


@project_router.get("/", response_model=List[ListProjectResponseItem])
async def list_project(handler: ListProjectHandler = Depends(ListProjectHandler)) -> List[ListProjectResponseItem]:
    return await handler.execute(ListProjectRequest())
