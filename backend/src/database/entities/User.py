from sqlalchemy import Column, ForeignKey, Integer, JSON, String
from .shared.IntegerIdEntity import IntegerIdEntity
from sqlalchemy.orm import relationship
from .shared.base import Base
from .Project import project_user_table
from .Task import task_user_table


class User(Base, IntegerIdEntity):
    __tablename__ = "user"
    name = Column(String)
    projects = relationship("Project", back_populates="users", secondary=project_user_table)
    tasks = relationship("Task", backref="users", secondary=task_user_table)
