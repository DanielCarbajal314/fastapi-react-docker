import base64
from functools import lru_cache
from typing import Annotated

from pydantic import Field
from pydantic_settings import BaseSettings


class Config(BaseSettings):
    database_url: Annotated[str, Field(alias="POSTGRES_URL")]


@lru_cache
def get_config() -> Config:
    config = Config()
    return config
