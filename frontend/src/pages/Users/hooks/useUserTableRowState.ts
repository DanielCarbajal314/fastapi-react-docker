import { useState } from "react";
import { UserListResponseItem, UserUpdateRequest } from "../api/types";

export interface UserTableRowProps {
  user: UserListResponseItem;
  deleteUserIsLoading: boolean;
  updateUserIsLoading: boolean;
  deleteUser: (id: number) => void;
  updateUser: (
    request: UserUpdateRequest,
    onUpdateComplete?: () => void,
  ) => void;
}

export function useUserTableRowState({
  deleteUserIsLoading,
  deleteUser,
  user,
  updateUser,
  updateUserIsLoading,
}: UserTableRowProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOnUpdateMode, setIsOnUpdateMode] = useState(false);
  const [updateText, setUpdateText] = useState(user.name);
  const [isUpdating, setIsUpdating] = useState(false);
  const onDelete = () => {
    setIsDeleting(true);
    deleteUser(user.id);
  };
  const setToRegularMode = () => {
    setUpdateText(user.name);
    setIsOnUpdateMode(false);
  };
  const onUpdate = () => {
    updateUser({ id: user.id, name: updateText }, () => {
      setIsUpdating(false);
      setIsOnUpdateMode(false);
    });
    setIsUpdating(true);
  };
  const setToUpdateMode = () => setIsOnUpdateMode(true);
  const inputChanges = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUpdateText(e.target.value);
  const disableWhileDeleting = isDeleting && deleteUserIsLoading;
  const disableWhileUpdating = isUpdating && updateUserIsLoading;
  return {
    disableWhileDeleting,
    isOnUpdateMode,
    updateText,
    disableWhileUpdating,
    setToUpdateMode,
    setToRegularMode,
    inputChanges,
    onUpdate,
    onDelete,
  };
}
