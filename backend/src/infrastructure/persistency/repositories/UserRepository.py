from typing import List
from sqlalchemy import select
from .BaseRepository import BaseRepository
from src.database.entities import User


class UserRepository(BaseRepository[User]):
    _entity_class = User

    async def filter(self, name: str = None) -> List[User]:
        if not name:
            return await self.get_all()
        query = select(User).where(User.name.icontains(name)).order_by(User.id)
        users = await self._session.execute(query)
        return users.scalars().all()
