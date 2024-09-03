import { Button } from "../../../shared/components";
import {
  UserTableRowProps,
  useUserTableRowState,
} from "../hooks/useUserTableRowState";

export function UserTableRow({
  user,
  deleteUser,
  deleteUserIsLoading,
  updateUser,
  updateUserIsLoading,
}: UserTableRowProps) {
  const { id, name } = user;
  const {
    disableWhileDeleting,
    isOnUpdateMode,
    updateText,
    disableWhileUpdating,
    onDelete,
    setToRegularMode,
    setToUpdateMode,
    inputChanges,
    onUpdate,
  } = useUserTableRowState({
    user,
    deleteUserIsLoading,
    updateUserIsLoading,
    updateUser,
    deleteUser,
  });

  return (
    <>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {id}
      </th>
      <td className="px-6 py-4">
        {isOnUpdateMode ? (
          <div className="flex justify-start items-center">
            <input
              value={updateText}
              onChange={inputChanges}
              className="bg-gray-50 w-[50%] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name"
              required
            />
          </div>
        ) : (
          name
        )}
      </td>
      <td className="px-6 py-4">
        {isOnUpdateMode ? (
          <div className="flex justify-center items-center gap-10 max-w-20">
            <Button
              label="Confirm"
              onClick={onUpdate}
              disabled={disableWhileUpdating}
              isLoading={disableWhileUpdating}
            />
            <Button
              label="Calcel"
              onClick={setToRegularMode}
              disabled={disableWhileUpdating}
              isLoading={disableWhileUpdating}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center gap-10 max-w-20">
            <Button
              data-ui="update_button"
              label="Update"
              onClick={setToUpdateMode}
              disabled={disableWhileDeleting}
              isLoading={disableWhileDeleting}
            />
            <Button
              data-ui="update_delete"
              label="Delete"
              onClick={onDelete}
              disabled={disableWhileDeleting}
              isLoading={disableWhileDeleting}
            />
          </div>
        )}
      </td>
    </>
  );
}
