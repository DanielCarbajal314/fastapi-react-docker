from typing import List
from src.shared.serializers import BaseSchema


class CreateTaskResponse(BaseSchema):
    id: int
    name: str
    order: int
    description: str
    users: List[str]
    task_state: str
