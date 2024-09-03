import { httpGet, httPost, httpPut } from "../../../shared/utils/http";
import {
  ProjectDetailsResponse,
  TaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
  CreateTaskResquest,
} from "./types";

export const getProjectWithDetails = (projectId: number) =>
  httpGet<ProjectDetailsResponse>(`projects/${projectId}`);
export const createTask = (task: CreateTaskResquest) =>
  httPost<CreateTaskResquest, TaskResponse>("tasks", task);
export const updateTask = (task: UpdateTaskRequest) =>
  httpPut<UpdateTaskRequest, UpdateTaskResponse>("tasks", task);
