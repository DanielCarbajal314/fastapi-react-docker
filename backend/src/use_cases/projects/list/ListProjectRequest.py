from typing import Optional

from src.shared.serializers import BaseSchema


class ListProjectRequest(BaseSchema):
    name: Optional[str] = None
