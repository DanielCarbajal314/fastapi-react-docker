from typing import List
from src.shared.serializers import BaseSchema


class TaskStateSchema(BaseSchema):
    id: int
    name: str


class UserSchema(BaseSchema):
    id: int
    name: str


class CreateProjectResponse(BaseSchema):
    id: int
    name: str
    users_names: List[UserSchema]
    task_states: List[TaskStateSchema]
