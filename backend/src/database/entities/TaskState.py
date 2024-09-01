from sqlalchemy import Column, String, Integer, JSON, ForeignKey
from .shared.IntegerIdEntity import IntegerIdEntity
from .shared.base import Base
from sqlalchemy.orm import relationship


class TaskState(Base, IntegerIdEntity):
    __tablename__ = "task_state"
    name = Column(String)
    project_id = Column(Integer, ForeignKey("project.id"))
    project = relationship("Project", backref="task_states")
