from typing import List
from src.shared.serializers import BaseSchema


class CreateProjectRequest(BaseSchema):
    name: str
    users_ids: List[int]
    task_states: List[str]
