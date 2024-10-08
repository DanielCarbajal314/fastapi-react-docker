from src.database.entities import User

from ...shared import BaseHandler
from .CreateUserRequest import CreateUserRequest
from .CreateUserResponse import CreateUserResponse


class CreateUserHandler(BaseHandler[CreateUserRequest, CreateUserResponse]):
    async def execute(self, request: CreateUserRequest) -> CreateUserResponse:
        user = User(name=request.name)
        await self.unit_of_work.user_repository.create(user)
        return CreateUserResponse(id=user.id, name=user.name)
