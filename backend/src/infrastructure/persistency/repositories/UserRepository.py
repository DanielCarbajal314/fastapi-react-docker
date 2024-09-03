from dataclasses import dataclass
from typing import List
from sqlalchemy import select
from .BaseRepository import BaseRepository
from src.database.entities import User, Task, TaskState, Project, task_user_table


@dataclass
class UserTaskReport:
    user_name: str
    task_id: int
    task_name: str
    task_description: str
    task_state: str
    project_name: str


class UserRepository(BaseRepository[User]):
    _entity_class = User

    async def filter(self, name: str = None) -> List[User]:
        if not name:
            return await self.get_all()
        query = select(User).where(User.name.icontains(name)).order_by(User.id)
        users = await self._session.execute(query)
        return users.scalars().all()

    async def get_by_ids(self, user_ids: List[int]) -> List[User]:
        query = select(User).where(User.id.in_(user_ids)).order_by(User.name)
        users = await self._session.execute(query)
        return users.scalars().all()

    async def get_task_report(self):
        query = (
            select(
                User.name.label("user_name"),
                Task.id.label("task_id"),
                Task.name.label("task_name"),
                Task.description.label("task_description"),
                TaskState.name.label("task_state"),
                Project.name.label("project_name"),
            )
            .join(task_user_table, User.id == task_user_table.c.user_id)
            .join(Task, Task.id == task_user_table.c.task_id)
            .join(TaskState, TaskState.id == Task.task_state_id)
            .join(Project, Project.id == Task.project_id)
            .order_by(User.name, Project.name, Task.name)
        )
        users = await self._session.execute(query)
        return [UserTaskReport(**data) for data in users.mappings().fetchall()]
