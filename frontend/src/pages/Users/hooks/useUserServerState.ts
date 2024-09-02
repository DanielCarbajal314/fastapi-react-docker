import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listUsers, deleteUser, createUser, updateUser } from "../api";
import { useState } from "react";
import {
  DeleteUserResponse,
  UserListResponseItem,
  UserCreateRequest,
  UserCreateResponse,
  UserUpdateRequest,
  UserUpdateResponse,
} from "../api/types";
import { USERS_OPTIONS_QUERY_KEY } from "../../../shared/hooks/useUserOptions";

const LIST_USER_KEY = "LIST_USERS";

export function useUserServerState() {
  const queryClient = useQueryClient();
  const [filterName, setFilterNameState] = useState<string | undefined>();
  const { data: users, isLoading: usersAreLoading } = useQuery({
    queryKey: [LIST_USER_KEY, filterName],
    queryFn: () => listUsers({ name: filterName ?? "" }),
  });
  const setUserFilterName = (name: string) => setFilterNameState(name);
  const { mutate: deleteUserMutation, isPending: deleteUserIsLoading } =
    useMutation<DeleteUserResponse, undefined, number>({
      mutationFn: deleteUser,
      onSuccess: (response) => {
        queryClient.setQueryData(
          [LIST_USER_KEY, filterName],
          (oldData: UserListResponseItem[]) =>
            oldData.filter((x) => x.id !== response.id),
        );
        queryClient.invalidateQueries({ queryKey: USERS_OPTIONS_QUERY_KEY });
      },
    });
  const deleteUserFun = (id: number) => deleteUserMutation(id);
  const { mutate: createUserMutation, isPending: createUserIsLoading } =
    useMutation<UserCreateResponse, undefined, UserCreateRequest>({
      mutationFn: createUser,
      onSuccess: (response) => {
        queryClient.setQueryData(
          [LIST_USER_KEY, filterName],
          (oldData: UserListResponseItem[]) => [...oldData, response],
        );
        queryClient.invalidateQueries({ queryKey: USERS_OPTIONS_QUERY_KEY });
      },
    });
  const createUserFun = (request: UserCreateRequest) =>
    createUserMutation(request);
  const { mutate: updateUserMutation, isPending: updateUserIsLoading } =
    useMutation<UserUpdateResponse, undefined, UserUpdateRequest>({
      mutationFn: updateUser,
      onSuccess: (response) => {
        queryClient.setQueryData(
          [LIST_USER_KEY, filterName],
          (oldData: UserListResponseItem[]) => {
            const index = oldData.findIndex((x) => x.id === response.id);
            oldData[index] = response;
            return [...oldData];
          },
        );
        queryClient.invalidateQueries({ queryKey: USERS_OPTIONS_QUERY_KEY });
      },
    });
  const updateUserFun = (
    request: UserUpdateRequest,
    onUpdateComplete?: () => void,
  ) => updateUserMutation(request, { onSuccess: onUpdateComplete });

  return {
    setUserFilterName,
    deleteUser: deleteUserFun,
    createUser: createUserFun,
    updateUser: updateUserFun,
    users,
    usersAreLoading,
    deleteUserIsLoading,
    createUserIsLoading,
    updateUserIsLoading,
  };
}
