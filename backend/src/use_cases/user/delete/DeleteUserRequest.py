from src.shared.serializers import BaseSchema


class DeleteUserRequest(BaseSchema):
    id: int
