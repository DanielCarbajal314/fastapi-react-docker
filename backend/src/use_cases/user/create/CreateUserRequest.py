from src.shared.serializers import BaseSchema


class CreateUserRequest(BaseSchema):
    name: str
