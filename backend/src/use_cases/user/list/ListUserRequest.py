from typing import Optional
from src.shared.serializers import BaseSchema


class ListUserRequest(BaseSchema):
    name: Optional[str] = None
