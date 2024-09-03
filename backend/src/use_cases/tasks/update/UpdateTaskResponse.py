from typing import List
from src.shared.serializers import BaseSchema
from datetime import datetime


class UpdateTaskResponse(BaseSchema):
    task_id: int
    task_state: str
    timestamp: datetime
