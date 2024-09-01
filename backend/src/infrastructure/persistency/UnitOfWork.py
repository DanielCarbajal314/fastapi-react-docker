from sqlalchemy.ext.asyncio import AsyncSession
from .repositories import UserRepository


class UnitOfWork:
    __session: AsyncSession
    user_repository: UserRepository

    def __init__(self, session: AsyncSession):
        self.__session = session
        self.user_repository = UserRepository(session)
