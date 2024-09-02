import { CreateProjectModal } from "./components/CreateProjectModal";
import { useProjectServerState } from "./hooks/useProjectServerState";
import { LoadingPage } from "../../shared/components/LoadingContainer";
import { Button } from "../../shared/components";
import { ProjectCard } from "./components/ProjectCard";
import { useModalDisplay } from "../../shared/hooks/useModalDisplay";

export function Projects() {
  const {
    projects,
    userOptions,
    userOptionsAreLoading,
    createProjectIsLoading,
    createProject,
  } = useProjectServerState();
  const {
    isModalOpen: showProjectModal,
    openModal,
    closeModal,
  } = useModalDisplay();
  return (
    <LoadingPage loading={userOptionsAreLoading || createProjectIsLoading}>
      <CreateProjectModal
        {...{
          closeModal,
          showProjectModal,
          createProject,
          createProjectIsLoading,
        }}
        userOptions={userOptions ?? []}
      />
      <Button label="Create Project" onClick={openModal} />
      <div className="flex gap-10 flex-wrap mt-10">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </LoadingPage>
  );
}
