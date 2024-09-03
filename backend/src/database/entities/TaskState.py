from sqlalchemy import JSON, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .shared.base import Base
from .shared.IntegerIdEntity import IntegerIdEntity


class TaskState(Base, IntegerIdEntity):
    __tablename__ = "task_state"
    name = Column(String)
    project_id = Column(Integer, ForeignKey("project.id"))
    project = relationship("Project", backref="task_states")
