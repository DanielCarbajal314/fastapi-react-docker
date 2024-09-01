from src.shared.serializers import BaseSchema


class UpdateUserResponse(BaseSchema):
    id: int
    name: str
