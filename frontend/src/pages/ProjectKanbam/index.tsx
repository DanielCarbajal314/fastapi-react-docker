import { useParams } from "react-router-dom";

export function ProjectKanbam() {
  const { projectId } = useParams();

  return (
    <div>
      <h1>Project Kanbam {projectId}</h1>
    </div>
  );
}
