from typing import List

from ...shared import BaseHandler
from .GetProjectRequest import GetProjectRequest
from .GetProjectResponse import GetProjectResponse, Option, TaskSchema


class GetProjectHandler(BaseHandler[GetProjectRequest, GetProjectResponse]):
    async def execute(self, request: GetProjectRequest) -> GetProjectResponse:
        project = await self.unit_of_work.project_repository.get_project_with_dependencies_by_id(request.project_id)
        project_tasks_state = await self.unit_of_work.task_state_repository.get_by_project_id(request.project_id)
        tasks = await self.unit_of_work.task_repository.get_with_dependencies_by_project_id(request.project_id)
        return GetProjectResponse(
            id=project.id,
            name=project.name,
            user_options=[
                Option(value=user.id, label=user.name) for user in sorted(project.users, key=lambda x: x.name)
            ],
            task_states_options=[
                Option(value=state.id, label=state.name) for state in sorted(project_tasks_state, key=lambda x: x.id)
            ],
            tasks=[
                TaskSchema(
                    id=task.id,
                    name=task.name,
                    order=task.order,
                    description=task.description,
                    users=[user.name for user in task.users],
                    task_state=task.task_state.name,
                    timestamp=task.updated_at or task.created_at,
                )
                for task in tasks
            ],
        )
