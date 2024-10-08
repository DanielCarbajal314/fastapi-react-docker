from typing import List

from sqlalchemy import select

from src.database.entities import TaskState

from .BaseRepository import BaseRepository


class TaskStateRepository(BaseRepository[TaskState]):
    _entity_class = TaskState

    async def get_by_project_id(self, project_id: int) -> List[TaskState]:
        query = select(TaskState).where(TaskState.project_id == project_id)
        users = await self._session.execute(query)
        return users.scalars().all()
