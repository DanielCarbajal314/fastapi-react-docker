export interface ProjectDetailsResponse {
  id: number;
  name: string;
  userOptions: UserOption[];
  taskStatesOptions: TaskStatesOption[];
  tasks: TaskResponse[];
}

export interface UserOption {
  value: number;
  label: string;
}

export interface TaskStatesOption {
  value: number;
  label: string;
}

export interface TaskResponse {
  id: number;
  name: string;
  order: number;
  description: string;
  users: string[];
  taskState: string;
  timestamp: string;
}

export interface CreateTaskResquest {
  projectId: number;
  name: string;
  description: string;
  taskStateId: number;
  userIds: number[];
}

export interface UpdateTaskRequest {
  taskId: number;
  projectId: number;
  taskStateId: number;
}

export interface UpdateTaskResponse {
  taskId: number;
  taskState: string;
  timestamp: string;
}
