from sqlalchemy import JSON, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from .shared.base import Base
from .shared.IntegerIdEntity import IntegerIdEntity

task_user_table = Table(
    "task_user_table",
    Base.metadata,
    Column("task_id", Integer, ForeignKey("task.id")),
    Column("user_id", Integer, ForeignKey("user.id")),
)


class Task(Base, IntegerIdEntity):
    __tablename__ = "task"
    name = Column(String)
    description = Column(String)
    order = Column(Integer)
    project_id = Column(Integer, ForeignKey("project.id"))
    project = relationship("Project", backref="tasks", foreign_keys=[project_id])
    task_state_id = Column(Integer, ForeignKey("task_state.id"))
    task_state = relationship("TaskState", backref="tasks", foreign_keys=[task_state_id])
