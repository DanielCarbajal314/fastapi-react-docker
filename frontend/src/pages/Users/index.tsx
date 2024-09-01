import { LoadingPage } from "../../shared/components/LoadingContainer";
import { UserCreateForm } from "./components/UserCreateForm";
import { UserFilter } from "./components/UserFilter";
import { UserTable } from "./components/UserTable";
import { useUserServerState } from "./hooks/useUserServerState";

export function Users() {
  const {
    users,
    usersAreLoading,
    deleteUser,
    deleteUserIsLoading,
    updateUser,
    updateUserIsLoading,
    setUserFilterName,
    createUser,
    createUserIsLoading,
  } = useUserServerState();
  return (
    <>
      <div className="flex justify-around">
        <UserCreateForm {...{ createUser, createUserIsLoading }} />
        <UserFilter {...{ setUserFilterName }} />
      </div>
      <LoadingPage loading={usersAreLoading}>
        <UserTable
          {...{
            users,
            deleteUser,
            deleteUserIsLoading,
            updateUser,
            updateUserIsLoading,
          }}
        />
      </LoadingPage>
    </>
  );
}
