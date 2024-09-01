from time import sleep
from typing import List
from fastapi import APIRouter, Depends
from src.use_cases.user import (
    CreateUserHandler,
    CreateUserRequest,
    CreateUserResponse,
    ListUserResponseItem,
    ListUserHandler,
    ListUserRequest,
    UpdateUserHandler,
    UpdateUserRequest,
    UpdateUserResponse,
    DeleteUserHandler,
    DeleteUserRequest,
    DeleteUserResponse,
)

user_router = APIRouter(prefix="/users", tags=["users"])


@user_router.post("/", response_model=CreateUserResponse)
async def create_user(
    request: CreateUserRequest, handler: CreateUserHandler = Depends(CreateUserHandler)
) -> CreateUserResponse:
    return await handler.execute(request)


@user_router.get("/", response_model=List[ListUserResponseItem])
async def create_user(
    request: ListUserRequest = Depends(), handler: ListUserHandler = Depends(ListUserHandler)
) -> List[ListUserResponseItem]:
    return await handler.execute(request)


@user_router.put("/", response_model=ListUserResponseItem)
async def create_user(
    request: UpdateUserRequest, handler: UpdateUserHandler = Depends(UpdateUserHandler)
) -> UpdateUserResponse:
    return await handler.execute(request)


@user_router.delete("/{user_id}", response_model=DeleteUserResponse)
async def create_user(user_id: int, handler: DeleteUserHandler = Depends(DeleteUserHandler)) -> DeleteUserResponse:
    sleep(1)  # TODO: Just For Loading animation for Demo - Must be removed after
    return await handler.execute(DeleteUserRequest(id=user_id))
