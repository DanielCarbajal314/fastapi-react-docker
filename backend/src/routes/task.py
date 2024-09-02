from typing import List
from fastapi import APIRouter, Depends
from src.use_cases.tasks import (
    CreateTaskHandler,
    CreateTaskRequest,
    CreateTaskResponse,
    UpdateTaskHandler,
    UpdateTaskRequest,
    UpdateTaskResponse,
)

task_router = APIRouter(prefix="/tasks", tags=["tasks"])


@task_router.post("/", response_model=CreateTaskResponse)
async def create_task(
    request: CreateTaskRequest, handler: CreateTaskHandler = Depends(CreateTaskHandler)
) -> CreateTaskResponse:
    return await handler.execute(request)


@task_router.put("/", response_model=UpdateTaskResponse)
async def create_task(
    request: UpdateTaskRequest, handler: UpdateTaskHandler = Depends(UpdateTaskHandler)
) -> UpdateTaskResponse:
    return await handler.execute(request)
