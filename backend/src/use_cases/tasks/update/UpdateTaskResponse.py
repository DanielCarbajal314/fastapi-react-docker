from typing import List
from src.shared.serializers import BaseSchema


class UpdateTaskResponse(BaseSchema):
    task_id: int
    task_state: str
