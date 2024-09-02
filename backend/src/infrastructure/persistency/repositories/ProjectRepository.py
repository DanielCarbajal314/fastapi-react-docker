from typing import List
from sqlalchemy import select
from .BaseRepository import BaseRepository
from src.database.entities import Project, TaskState
from sqlalchemy.orm import joinedload, with_polymorphic, selectinload


class ProjectRepository(BaseRepository[Project]):
    _entity_class = Project

    async def create_task_states(self, project_id: int, name: List[str]) -> None:
        task_states = [TaskState(name=state, project_id=project_id) for state in name]
        self._session.add_all(task_states)
        await self._session.commit()
        created_task_states = await self._session.execute(select(TaskState).filter(TaskState.project_id == project_id))
        return created_task_states.scalars().all()

    async def list_with_dependencies(self) -> List[Project]:
        query = select(Project).options(selectinload(Project.users)).order_by(Project.name)
        users = await self._session.execute(query)
        return users.scalars().all()

    async def get_project_with_dependencies_by_id(self, project_id: int) -> Project:
        query = (
            select(Project).options(selectinload(Project.users)).where(Project.id == project_id).order_by(Project.name)
        )
        users = await self._session.execute(query)
        return users.scalars().one()
