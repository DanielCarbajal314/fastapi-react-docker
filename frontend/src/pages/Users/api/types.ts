export interface UserCreateRequest {
  name: string;
}

export interface UserCreateResponse {
  id: number;
  name: string;
}

export interface UserListQueryParams {
  name: string;
}

export interface UserListResponseItem {
  id: number;
  name: string;
}

export interface UserUpdateRequest {
  id: number;
  name: string;
}

export interface UserUpdateResponse {
  id: number;
  name: string;
}

export interface DeleteUserResponse {
  id: number;
}
