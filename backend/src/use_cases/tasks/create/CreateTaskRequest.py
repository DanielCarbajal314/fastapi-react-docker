from typing import List
from src.shared.serializers import BaseSchema


class CreateTaskRequest(BaseSchema):
    project_id: int
    name: str
    description: str
    task_state_id: int
    user_ids: List[int]
