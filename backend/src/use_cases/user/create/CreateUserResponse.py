from src.shared.serializers import BaseSchema


class CreateUserResponse(BaseSchema):
    id: int
    name: str
