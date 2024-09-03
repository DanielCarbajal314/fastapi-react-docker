import { UserListResponseItem, UserUpdateRequest } from "../api/types";
import { UserTableRow } from "./UserTableRow";

interface UserTableProps {
  users: UserListResponseItem[] | undefined;
  updateUserIsLoading: boolean;
  deleteUserIsLoading: boolean;
  updateUser: (
    request: UserUpdateRequest,
    onUpdateComplete?: () => void,
  ) => void;
  deleteUser: (id: number) => void;
}

export function UserTable({
  users,
  deleteUser,
  deleteUserIsLoading,
  updateUser,
  updateUserIsLoading,
}: UserTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={user.id}
            >
              <UserTableRow
                {...{
                  user,
                  deleteUser,
                  deleteUserIsLoading,
                  updateUser,
                  updateUserIsLoading,
                }}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
