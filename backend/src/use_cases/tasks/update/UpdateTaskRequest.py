from typing import List

from src.shared.serializers import BaseSchema


class UpdateTaskRequest(BaseSchema):
    task_id: int
    project_id: int
    task_state_id: int
