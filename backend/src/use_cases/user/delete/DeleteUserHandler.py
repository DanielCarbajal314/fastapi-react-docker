from .DeleteUserRequest import DeleteUserRequest
from .DeleteUserResponse import DeleteUserResponse
from ...shared import BaseHandler


class DeleteUserHandler(BaseHandler[DeleteUserRequest, DeleteUserResponse]):
    async def execute(self, request: DeleteUserRequest) -> DeleteUserResponse:
        await self.unit_of_work.user_repository.delete(request.id)
        return DeleteUserResponse(id=request.id)
