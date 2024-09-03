from typing import List
from src.shared.serializers import BaseSchema


class TaskScheme(BaseSchema):
    id: int
    name: str
    description: str
    status: str
    project_name: str


class TaskReportResponseItem(BaseSchema):
    userName: str
    tasks: List[TaskScheme]
