from typing import List
from .TaskReportResponseItem import TaskReportResponseItem, TaskScheme
from .TaskReportRequest import TaskReportRequest
from ...shared import BaseHandler
from itertools import groupby


class TaskReportHandler(BaseHandler[TaskReportRequest, List[TaskReportResponseItem]]):
    async def execute(self, request: TaskReportRequest) -> List[TaskReportResponseItem]:
        report = await self.unit_of_work.user_repository.get_task_report()
        report_grouped_by_username = groupby(report, lambda x: x.user_name)
        return [
            TaskReportResponseItem(
                userName=user_name,
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
