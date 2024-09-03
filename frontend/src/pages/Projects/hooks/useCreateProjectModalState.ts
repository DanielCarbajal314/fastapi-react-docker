import { useState } from "react";

export interface UseModalState {
  projectName: string;
  selectedUserIds: number[];
  taskStates: string[];
  taskStateName: string;
}

export const useCreateProjectModalState = () => {
  const [stateModal, setModalState] = useState<UseModalState>({
    projectName: "",
    selectedUserIds: [],
    taskStates: [],
    taskStateName: "",
  });
  const setProjectName = (name: string) =>
    setModalState((state) => ({ ...state, projectName: name }));
  const setSelectedUserIds = (selectedUserIds: number[]) =>
    setModalState((state) => ({ ...state, selectedUserIds }));
  const setTaskStateName = (taskStateName: string) =>
    setModalState((state) => ({ ...state, taskStateName }));
  const addTaskState = () => {
    setModalState((state) => ({
      ...state,
      taskStates: [...state.taskStates, state.taskStateName],
      taskStateName: "",
    }));
  };
  const removeTaskState = (name: string) =>
    setModalState((state) => ({
      ...state,
      taskStates: state.taskStates.filter((x) => x !== name),
    }));
  const canSave =
    stateModal.projectName?.length &&
    stateModal.selectedUserIds?.length &&
    stateModal.taskStates?.length;
  return {
    ...stateModal,
    canSave,
    setProjectName,
    setSelectedUserIds,
    removeTaskState,
    addTaskState,
    setTaskStateName,
  };
};
