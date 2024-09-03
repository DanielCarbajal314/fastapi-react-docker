# tests/test_async.py
from unittest import mock
from unittest.mock import AsyncMock

import pytest

from src.infrastructure.persistency import UnitOfWork
from src.infrastructure.persistency.repositories import (UserRepository,
                                                         UserTaskReport)
from src.use_cases.user import (TaskReportHandler, TaskReportRequest,
                                TaskReportResponseItem)


@pytest.mark.asyncio
async def test_read_main():
    unit_of_work = mock.Mock(spec=UnitOfWork)
    user_repository = mock.Mock(spec=UserRepository)
    unit_of_work.user_repository = user_repository
    user_repository.get_task_report = AsyncMock(
        return_value=[
            UserTaskReport(
                user_name="User 1",
                task_id=1,
                task_name="First Task",
                task_description="First Task Description",
                task_state="Initial",
                project_name="Project 1",
            ),
            UserTaskReport(
                user_name="User 1",
                task_id=2,
                task_name="Second Task",
                task_description="Second Task Description",
                task_state="Second",
                project_name="Project 1",
            ),
            UserTaskReport(
                user_name="User 2",
                task_id=3,
                task_name="Third Task",
                task_description="Third Task Description",
                task_state="Third",
                project_name="Project 1",
            ),
        ]
    )

    handler = TaskReportHandler(unit_of_work)
    result = await handler.execute(TaskReportRequest())
    assert len(result) == 2
    assert [a.model_dump() for a in result] == (
        [
            {
                "user_name": "User 1",
                "tasks": [
                    {
                        "id": 1,
                        "name": "First Task",
                        "description": "First Task Description",
                        "status": "Initial",
                        "project_name": "Project 1",
                    },
                    {
                        "id": 2,
                        "name": "Second Task",
                        "description": "Second Task Description",
                        "status": "Second",
                        "project_name": "Project 1",
                    },
                ],
            },
            {
                "user_name": "User 2",
                "tasks": [
                    {
                        "id": 3,
                        "name": "Third Task",
                        "description": "Third Task Description",
                        "status": "Third",
                        "project_name": "Project 1",
                    }
                ],
            },
        ]
    )
