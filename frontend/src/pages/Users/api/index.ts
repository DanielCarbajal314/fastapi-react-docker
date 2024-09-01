import {
  UserCreateRequest,
  UserListResponseItem,
  UserCreateResponse,
  UserUpdateRequest,
  UserUpdateResponse,
  DeleteUserResponse,
  UserListQueryParams,
} from "./types";
import {
  httPost,
  httpDelete,
  httpGetWithParams,
  httpPut,
} from "../../../shared/utils/http";

export const createUser = (body: UserCreateRequest) =>
  httPost<UserCreateRequest, UserCreateResponse>("users", body);
export const deleteUser = (id: number) =>
  httpDelete<DeleteUserResponse>(`users/${id}`);
export const listUsers = (params: UserListQueryParams) =>
  httpGetWithParams<UserListResponseItem[]>("users", params);
export const updateUser = (body: UserUpdateRequest) =>
  httpPut<UserUpdateRequest, UserUpdateResponse>("users", body);
