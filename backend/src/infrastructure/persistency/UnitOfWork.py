from sqlalchemy.ext.asyncio import AsyncSession

from .repositories import (ProjectRepository, TaskRepository,
                           TaskStateRepository, UserRepository)


class UnitOfWork:
    __session: AsyncSession
    user_repository: UserRepository
    project_repository: ProjectRepository
    task_state_repository: TaskStateRepository
    task_repository: TaskRepository

    def __init__(self, session: AsyncSession):
        self.__session = session
        self.user_repository = UserRepository(session)
        self.project_repository = ProjectRepository(session)
        self.task_state_repository = TaskStateRepository(session)
        self.task_repository = TaskRepository(session)
