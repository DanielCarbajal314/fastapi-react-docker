from .UpdateTaskResponse import UpdateTaskResponse
from .UpdateTaskRequest import UpdateTaskRequest
from ...shared import BaseHandler
from datetime import datetime


class UpdateTaskHandler(BaseHandler[UpdateTaskRequest, UpdateTaskResponse]):
    async def execute(self, request: UpdateTaskRequest) -> UpdateTaskResponse:
        order = await self.unit_of_work.task_repository.get_order_for(request.project_id, request.task_state_id)
        await self.unit_of_work.task_repository.update(
            request.task_id, order=order, task_state_id=request.task_state_id
        )
        task_state = await self.unit_of_work.task_state_repository.get(request.task_state_id)
        return UpdateTaskResponse(task_id=request.task_id, task_state=task_state.name, timestamp=datetime.now())
