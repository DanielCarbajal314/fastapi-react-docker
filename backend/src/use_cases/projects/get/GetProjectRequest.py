from src.shared.serializers import BaseSchema


class GetProjectRequest(BaseSchema):
    project_id: int
