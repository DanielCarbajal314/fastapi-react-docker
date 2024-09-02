import { CreateProjectModal } from "./components/CreateProjectModal";
import { useProjectServerState } from "./hooks/useProjectServerState";
import { LoadingPage } from "../../shared/components/LoadingContainer";
import { Button } from "../../shared/components";
import { ProjectCard } from "./components/ProjectCard";
import { useModalDisplay } from "../../shared/hooks/useModalDisplay";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const onProjectClicked = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };
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
          <ProjectCard
            key={project.id}
            project={project}
            onClick={onProjectClicked}
          />
        ))}
      </div>
    </LoadingPage>
  );
}
