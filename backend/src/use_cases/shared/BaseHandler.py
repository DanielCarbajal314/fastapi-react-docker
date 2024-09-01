from typing import TypeVar, Generic
from abc import abstractmethod
from pydantic import BaseModel
from fastapi import Depends
from src.infrastructure.persistency import get_unit_of_work, UnitOfWork


class BaseRequest(BaseModel):
    pass


class BaseResponse(BaseModel):
    pass


TRequest = TypeVar("TRequest", bound=BaseRequest)
TResponse = TypeVar("TResponse", bound=BaseResponse)


class BaseHandler(Generic[TRequest, TResponse]):
    unit_of_work: UnitOfWork

    def __init__(self, unit_of_work: UnitOfWork = Depends(get_unit_of_work)):
        self.unit_of_work = unit_of_work

    @abstractmethod
    async def execute(self, request: TRequest) -> TResponse:
        pass
