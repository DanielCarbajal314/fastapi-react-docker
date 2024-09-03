import { useState } from "react";
import { UserOption } from "../api/types";

interface UseModalState {
  name: string;
  description: string;
  taskStateId: number;
  userIds: number[];
}

export const useCreateTaskModalState = (userOptions?: UserOption[]) => {
  const initialState: UseModalState = {
    name: "",
    description: "",
    userIds: [],
    taskStateId: userOptions?.[0].value ?? 0,
  };
  const [stateModal, setModalState] = useState<UseModalState>(initialState);
  const setName = (name: string) =>
    setModalState((state) => ({ ...state, name }));
  const setDescription = (description: string) =>
    setModalState((state) => ({ ...state, description }));
  const setUserIds = (userIds: number[]) =>
    setModalState((state) => ({ ...state, userIds }));
  const setTaskStateId = (taskStateId: number) =>
    setModalState((state) => ({ ...state, taskStateId }));
  const clearForm = () => setModalState(initialState);

  const canSave = [
    stateModal.description?.length,
    stateModal.name?.length,
    stateModal.userIds?.length,
    stateModal.taskStateId,
  ].every((x) => x);

  return {
    ...stateModal,
    canSave,
    setName,
    setDescription,
    setUserIds,
    clearForm,
    setTaskStateId,
  };
};
