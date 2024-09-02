import { ProjectItemResponse, ProjectCreateRequest } from "./types";
import { httPost, httpGet } from "../../../shared/utils/http";

export const createProjects = (body: ProjectCreateRequest) =>
  httPost<ProjectCreateRequest, ProjectItemResponse>("projects", body);
export const listProjects = () => httpGet<ProjectItemResponse[]>("projects");
