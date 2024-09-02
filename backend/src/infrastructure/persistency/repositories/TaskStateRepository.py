from .BaseRepository import BaseRepository
from src.database.entities import TaskState


class TaskStateRepository(BaseRepository[TaskState]):
    _entity_class = TaskState
