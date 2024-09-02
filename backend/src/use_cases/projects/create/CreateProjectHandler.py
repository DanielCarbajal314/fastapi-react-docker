from .CreateProjectRequest import CreateProjectRequest
from .CreateProjectResponse import CreateProjectResponse, TaskStateSchema, UserSchema
from ...shared import BaseHandler
from src.database.entities import Project


class CreateProjectHandler(BaseHandler[CreateProjectRequest, CreateProjectResponse]):
    async def execute(self, request: CreateProjectRequest) -> CreateProjectResponse:
        project = Project(name=request.name)
        users = await self.unit_of_work.user_repository.get_by_ids(request.users_ids)
        project.users = users
        await self.unit_of_work.project_repository.create(project)
        task_states = await self.unit_of_work.project_repository.create_task_states(project.id, request.task_states)
        task_states_schema = [TaskStateSchema(id=state.id, name=state.name) for state in task_states]
        users_names_schema = [UserSchema(id=user.id, name=user.name) for user in users]
        return CreateProjectResponse(
            id=project.id, name=project.name, users=users_names_schema, task_states=task_states_schema
        )
