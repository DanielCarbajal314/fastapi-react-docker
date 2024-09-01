from src.shared.serializers import BaseSchema


class ListUserResponseItem(BaseSchema):
    id: int
    name: str
