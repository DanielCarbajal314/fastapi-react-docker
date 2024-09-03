from itertools import groupby
from typing import List

from ...shared import BaseHandler
from .TaskReportRequest import TaskReportRequest
from .TaskReportResponseItem import TaskReportResponseItem, TaskScheme


class TaskReportHandler(BaseHandler[TaskReportRequest, List[TaskReportResponseItem]]):
    async def execute(self, request: TaskReportRequest) -> List[TaskReportResponseItem]:
        report = await self.unit_of_work.user_repository.get_task_report()
        report_grouped_by_username = groupby(report, lambda x: x.user_name)
        return [
            TaskReportResponseItem(
                user_name=user_name,
                tasks=[
                    TaskScheme(
                        id=task.task_id,
                        name=task.task_name,
                        description=task.task_description,
                        status=task.task_state,
                        project_name=task.project_name,
                    )
                    for task in tasks
                ],
            )
            for user_name, tasks in report_grouped_by_username
        ]
