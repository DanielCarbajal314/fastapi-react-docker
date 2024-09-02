import { useState } from "react";
import {
  Button,
  CloseButton,
  MultiSelect,
  SecondaryButton,
} from "../../../shared/components";
import { Option } from "../../../shared/api/types";
import { ProjectCreateRequest } from "../api/types";

type CreateProjectModalProps = {
  showProjectModal: boolean;
  closeModal: () => void;
  userOptions: Option[];
  createProjectIsLoading: boolean;
  createProject: (body: ProjectCreateRequest, onSuccess?: () => void) => void;
};

interface UseModalState {
  projectName: string;
  selectedUserIds: number[];
  taskStates: string[];
  taskStateName: string;
}

const useModalState = () => {
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

export function CreateProjectModal({
  showProjectModal,
  closeModal,
  userOptions,
  createProjectIsLoading,
  createProject,
}: CreateProjectModalProps) {
  const {
    selectedUserIds,
    setProjectName,
    setSelectedUserIds,
    taskStates,
    addTaskState,
    setTaskStateName,
    removeTaskState,
    projectName,
    canSave,
    taskStateName,
  } = useModalState();
  const createClicked = () => {
    createProject(
      { name: projectName, taskStates, usersIds: selectedUserIds },
      () => closeModal(),
    );
  };
  return (
    showProjectModal && (
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`backdrop-blur-sm flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Project
              </h3>
              <div>
                <CloseButton onClick={closeModal} />
              </div>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <form className="flex-col">
                <div className="mb-5 w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-10 w-auto">
                    Project Name:
                  </label>
                  <input
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-5 flex-col justify-start w-full">
                  <MultiSelect
                    options={userOptions}
                    setSelectedOptions={setSelectedUserIds}
                  />
                </div>
                <div className="mb-5 flex justify-between w-full gap-4 items-end">
                  <div className="w-[45%]">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-10 w-auto">
                      Task Status Name:
                    </label>
                    <input
                      onChange={(e) => setTaskStateName(e.target.value)}
                      value={taskStateName}
                      type="text"
                      className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="w-[45%]">
                    <Button
                      label="Add Status"
                      onClick={addTaskState}
                      disabled={
                        !taskStateName?.length ||
                        taskStates.includes(taskStateName)
                      }
                    />
                  </div>
                </div>
                <h3> Project's Task Status </h3>
                <div className="flex gap-4 flex-wrap mt-10">
                  {taskStates?.map((state) => (
                    <span className="flex justify-center items-center gap-4 bg-blue-100 text-blue-800 text-ls font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      {state}
                      <CloseButton onClick={() => removeTaskState(state)} />
                    </span>
                  ))}
                </div>
              </form>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <Button
                label="Create"
                onClick={createClicked}
                disabled={!canSave || createProjectIsLoading}
                isLoading={createProjectIsLoading}
              />
              <SecondaryButton label="Cancel" onClick={closeModal} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
