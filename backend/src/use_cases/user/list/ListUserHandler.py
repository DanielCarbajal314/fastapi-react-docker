from .ListUserRequest import ListUserRequest
from .ListUserResponseItem import ListUserResponseItem
from ...shared import BaseHandler


class ListUserHandler(BaseHandler[ListUserRequest, ListUserResponseItem]):
    async def execute(self, request: ListUserRequest) -> ListUserResponseItem:
        users = await self.unit_of_work.user_repository.filter(request.name)
        return [ListUserResponseItem(id=user.id, name=user.name) for user in users]
