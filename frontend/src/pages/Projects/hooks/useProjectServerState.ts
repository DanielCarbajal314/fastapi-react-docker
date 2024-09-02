import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserOptions } from "../../../shared/hooks/useUserOptions";
import { listProjects, createProjects } from "../api";
import { ProjectCreateRequest, ProjectItemResponse } from "../api/types";

const LIST_PROJECTS_KEY = ["LIST_PROJECTS"];

export function useProjectServerState() {
  const queryClient = useQueryClient();
  const { userOptions, userOptionsAreLoading } = useUserOptions();
  const { data: projects, isLoading: projectsAreLoading } = useQuery({
    queryKey: LIST_PROJECTS_KEY,
    queryFn: listProjects,
  });
  const { mutate, isPending: createProjectIsLoading } = useMutation<
    ProjectItemResponse,
    undefined,
    ProjectCreateRequest
  >({
    mutationFn: createProjects,
    onSuccess: (response) => {
      queryClient.setQueryData(
        LIST_PROJECTS_KEY,
        (oldData: ProjectItemResponse[]) => [...oldData, response],
      );
    },
  });
  const createProject = (body: ProjectCreateRequest, onSuccess?: () => void) =>
    mutate(body, { onSuccess });
  return {
    userOptions,
    projects,
    projectsAreLoading,
    userOptionsAreLoading,
    createProjectIsLoading,
    createProject,
  };
}
