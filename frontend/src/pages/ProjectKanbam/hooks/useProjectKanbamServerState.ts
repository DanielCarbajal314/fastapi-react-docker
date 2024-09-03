import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectWithDetails, updateTask, createTask } from "../api";
import {
  ProjectDetailsResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
  TaskResponse,
  CreateTaskResquest,
} from "../api/types";

const PROJECT_DETAILS_KEY = ["projectDetails"];

export function useProjectKanbamServerState(projectId?: number) {
  const queryClient = useQueryClient();
  const { data: project, isLoading: projectIsLoading } =
    useQuery<ProjectDetailsResponse>({
      queryKey: PROJECT_DETAILS_KEY,
      queryFn: () => getProjectWithDetails(projectId ?? 0),
      enabled: !!projectId,
    });

  const { mutate: createTaskMutation, isPending: createTaskIsLoading } =
    useMutation<TaskResponse, unknown, CreateTaskResquest>({
      mutationFn: createTask,
      onSuccess: (response) => {
        queryClient.setQueryData(
          PROJECT_DETAILS_KEY,
          (oldData: ProjectDetailsResponse) => {
            oldData.tasks = [...oldData.tasks, response];
            return { ...oldData };
          },
        );
      },
    });
  const createTaskFn = (body: CreateTaskResquest, onSuccess?: () => void) =>
    createTaskMutation(body, { onSuccess });

  const { mutate: updateTaskMutation, isPending: updateTaskIsLoading } =
    useMutation<UpdateTaskResponse, unknown, UpdateTaskRequest>({
      mutationFn: updateTask,
      onSuccess: (response) => {
        queryClient.setQueryData(
          PROJECT_DETAILS_KEY,
          (oldData: ProjectDetailsResponse) => {
            const taskToUpdate = oldData.tasks.find(
              (x) => x.id === response.taskId,
            );
            if (taskToUpdate) {
              taskToUpdate.taskState = response.taskState;
              taskToUpdate.timestamp = response.timestamp;
            }
            return { ...oldData };
          },
        );
      },
    });
  const updateTaskFn = (body: UpdateTaskRequest) => updateTaskMutation(body);

  return {
    project,
    projectIsLoading,
    updateTaskIsLoading,
    createTaskIsLoading,
    updateTask: updateTaskFn,
    createTask: createTaskFn,
  };
}
