from typing import List
from src.shared.serializers import BaseSchema
from datetime import datetime


class Option(BaseSchema):
    value: int
    label: str


class TaskSchema(BaseSchema):
    id: int
    name: str
    order: int
    description: str
    users: List[str]
    task_state: str
    timestamp: datetime


class GetProjectResponse(BaseSchema):
    id: int
    name: str
    user_options: List[Option]
    task_states_options: List[Option]
    tasks: List[TaskSchema]
