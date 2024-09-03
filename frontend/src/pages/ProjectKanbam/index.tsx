import { useParams } from "react-router-dom";
import { useProjectKanbamServerState } from "./hooks/useProjectKanbamServerState";
import { LoadingPage } from "../../shared/components/LoadingContainer";
import { Button } from "../../shared/components";
import { TaskBoard } from "./components/TaskBoard";
import { useModalDisplay } from "../../shared/hooks/useModalDisplay";
import { CreateTaskModal } from "./components/CreateTaskModal";

export function ProjectKanbam() {
  const { projectId: projectIdAsString } = useParams();
  const { isModalOpen, closeModal, openModal } = useModalDisplay();
  const projectId = parseInt(projectIdAsString ?? "0");
  const {
    project,
    projectIsLoading,
    updateTask,
    createTask,
    createTaskIsLoading,
  } = useProjectKanbamServerState(projectId);
  const { taskStatesOptions, userOptions, tasks } = project ?? {};
  return (
    <LoadingPage loading={projectIsLoading}>
      <CreateTaskModal
        {...{
          isModalOpen,
          closeModal,
          userOptions,
          taskStatesOptions,
          createTask,
          createTaskIsLoading,
          projectId,
        }}
      />
      <p className="text-3xl">{project?.name}</p>
      <div className="flex flex-row mt-4">
        <Button label="Add Task" onClick={openModal} />
      </div>
      <TaskBoard {...{ taskStatesOptions, updateTask, tasks, projectId }} />
    </LoadingPage>
  );
}
