from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from .shared.base import Base
from .shared.IntegerIdEntity import IntegerIdEntity

project_user_table = Table(
    "project_user_table",
    Base.metadata,
    Column("project_id", Integer, ForeignKey("project.id")),
    Column("user_id", Integer, ForeignKey("user.id")),
)


class Project(Base, IntegerIdEntity):
    __tablename__ = "project"
    name = Column(String, index=True)
    users = relationship("User", back_populates="projects", secondary=project_user_table)
