from src.shared.serializers import BaseSchema


class UpdateUserRequest(BaseSchema):
    id: int
    name: str
