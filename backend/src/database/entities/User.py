from sqlalchemy import JSON, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .Project import project_user_table
from .shared.base import Base
from .shared.IntegerIdEntity import IntegerIdEntity
from .Task import task_user_table


class User(Base, IntegerIdEntity):
    __tablename__ = "user"
    name = Column(String)
    projects = relationship("Project", back_populates="users", secondary=project_user_table)
    tasks = relationship("Task", backref="users", secondary=task_user_table)
