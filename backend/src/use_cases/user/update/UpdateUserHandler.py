from .UpdateUserRequest import UpdateUserRequest
from .UpdateUserResponse import UpdateUserResponse
from ...shared import BaseHandler


class UpdateUserHandler(BaseHandler[UpdateUserRequest, UpdateUserResponse]):
    async def execute(self, request: UpdateUserRequest) -> UpdateUserResponse:
        user = await self.unit_of_work.user_repository.update(request.id, name=request.name)
        return UpdateUserResponse(id=user.id, name=user.name)
