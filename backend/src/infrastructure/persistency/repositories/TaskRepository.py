from typing import List
from sqlalchemy import func, select
from .BaseRepository import BaseRepository
from src.database.entities import Task
from sqlalchemy.orm import joinedload, with_polymorphic, selectinload


class TaskRepository(BaseRepository[Task]):
    _entity_class = Task

    async def get_with_dependencies_by_project_id(self, project_id: int) -> List[Task]:
        query = (
            select(Task)
            .options(selectinload(Task.users), selectinload(Task.task_state))
            .where(Task.project_id == project_id)
        )
        tasks = await self._session.execute(query)
        return tasks.scalars().all()

    async def get_order_for(self, project_id: int, task_state_id) -> int:
        query = select(func.max(Task.order)).where(Task.project_id == project_id, Task.task_state_id == task_state_id)
        tasks = await self._session.execute(query)
        maximum = tasks.scalars().one()
        return (maximum if maximum else 0) + 1
