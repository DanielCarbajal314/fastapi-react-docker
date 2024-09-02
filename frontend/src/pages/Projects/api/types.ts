export interface ProjectItemResponse {
  id: number;
  name: string;
  users: ProjectItemResponseUser[];
  taskStates: ProjectItemResponseTaskState[];
}

export interface ProjectItemResponseUser {
  id: number;
  name: string;
}

export interface ProjectItemResponseTaskState {
  id: number;
  name: string;
}

export interface ProjectCreateRequest {
  name: string;
  taskStates: string[];
  usersIds: number[];
}
