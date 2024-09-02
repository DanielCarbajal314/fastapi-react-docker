from typing import List
from src.database.entities import Task
from .CreateTaskRequest import CreateTaskRequest
from .CreateTaskResponse import CreateTaskResponse
from ...shared import BaseHandler


class CreateTaskHandler(BaseHandler[CreateTaskRequest, CreateTaskResponse]):
    async def execute(self, request: CreateTaskRequest) -> CreateTaskResponse:
        order = await self.unit_of_work.task_repository.get_order_for(request.project_id, request.task_state_id)
        users = await self.unit_of_work.user_repository.get_by_ids(request.user_ids)
        new_task = Task(
            project_id=request.project_id,
            name=request.name,
            description=request.description,
            order=order,
            task_state_id=request.task_state_id,
        )
        new_task.users = users
        await self.unit_of_work.task_repository.create(new_task)
        task_state = await self.unit_of_work.task_state_repository.get(request.task_state_id)
        return CreateTaskResponse(
            id=new_task.id,
            name=new_task.name,
            order=new_task.order,
            description=new_task.description,
            users=[user.name for user in users],
            task_state=task_state.name,
        )
