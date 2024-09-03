from itertools import groupby
from typing import List

from ...shared import BaseHandler
from .ListProjectRequest import ListProjectRequest
from .ListProjectResponseItem import (ListProjectResponseItem, TaskStateSchema,
                                      UserSchema)


class ListProjectHandler(BaseHandler[ListProjectRequest, ListProjectResponseItem]):
    async def execute(self, request: ListProjectRequest) -> List[ListProjectResponseItem]:
        projects = await self.unit_of_work.project_repository.list_with_dependencies()
        all_task_states = await self.unit_of_work.task_state_repository.get_all()
        sorted_task_states = sorted(all_task_states, key=lambda x: x.project_id)
        task_states_group_by_project_id = groupby(sorted_task_states, key=lambda x: x.project_id)
        task_states_group_by_project_id_map = {
            key: sorted([a for a in values], key=lambda x: x.name) for key, values in task_states_group_by_project_id
        }
        return [
            ListProjectResponseItem(
                id=project.id,
                name=project.name,
                users=[UserSchema(id=user.id, name=user.name) for user in sorted(project.users, key=lambda x: x.name)],
                task_states=[
                    TaskStateSchema(id=state.id, name=state.name)
                    for state in task_states_group_by_project_id_map.get(project.id, [])
                ],
            )
            for project in projects
        ]
