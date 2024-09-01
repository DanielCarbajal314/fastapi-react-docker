from sqlalchemy import Column, DateTime, Integer, func


class IntegerIdEntity:
    id = Column(Integer, primary_key=True, autoincrement="auto")
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
