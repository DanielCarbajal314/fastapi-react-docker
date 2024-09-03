import {
  Button,
  CloseButton,
  MultiSelect,
  SecondaryButton,
} from "../../../shared/components";
import { CreateTaskResquest, TaskStatesOption, UserOption } from "../api/types";
import { useCreateTaskModalState } from "../hooks/useCreateTaskModalState";

type CreateTaskModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  userOptions?: UserOption[];
  taskStatesOptions?: TaskStatesOption[];
  createTaskIsLoading: boolean;
  projectId: number;
  createTask: (body: CreateTaskResquest, onSuccess?: () => void) => void;
};

export function CreateTaskModal({
  isModalOpen,
  closeModal,
  userOptions,
  createTaskIsLoading,
  createTask,
  projectId,
  taskStatesOptions,
}: CreateTaskModalProps) {
  const {
    name,
    description,
    userIds,
    taskStateId,
    canSave,
    setName,
    setDescription,
    setUserIds,
    setTaskStateId,
    clearForm,
  } = useCreateTaskModalState(userOptions);
  const createClicked = () => {
    createTask({ name, userIds, description, taskStateId, projectId }, () => {
      clearForm();
      closeModal();
    });
  };
  return (
    isModalOpen && (
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`backdrop-blur-sm flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Task
              </h3>
              <div>
                <CloseButton onClick={closeModal} />
              </div>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <form className="flex-col">
                <div className="mb-5 w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-auto">
                    Name:
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <div className="mb-5 w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-auto">
                      Description:
                    </label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-5 flex-col justify-start w-full">
                  <MultiSelect
                    options={userOptions ?? []}
                    setSelectedOptions={setUserIds}
                  />
                </div>
                <div className="max-w-sm mb-5 flex-col justify-start">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-2">
                    State
                  </label>
                  <select
                    onChange={(e) => setTaskStateId(parseInt(e.target.value))}
                    defaultValue={taskStateId}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {taskStatesOptions?.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <Button
                label="Create"
                onClick={createClicked}
                disabled={!canSave || createTaskIsLoading}
                isLoading={createTaskIsLoading}
              />
              <SecondaryButton label="Cancel" onClick={closeModal} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
