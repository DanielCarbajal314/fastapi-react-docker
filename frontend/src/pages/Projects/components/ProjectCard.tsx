import { ProjectItemResponse } from "../api/types";

export interface ProjectCardProps {
  project: ProjectItemResponse;
}

export function ProjectCard({
  project: { name, id, users, taskStates },
}: ProjectCardProps) {
  const onClick = () => {
    console.log(`Clicked on project ${id}`);
  };
  return (
    <div
      onClick={onClick}
      className="w-[20%] flex flex-col  gap-4 m-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white w-full text-center">
        {name}
      </h3>
      <div className="flex justify-center flex-col gap-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Users:
          </h4>
        </div>
        <div className="flex gap-2 flex-wrap">
          {users.map(({ id, name }) => (
            <span
              key={id}
              className="flex text-center bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-indigo-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-center flex-col gap-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Task State:
          </h4>
        </div>
        <div className="flex gap-2 flex-wrap">
          {taskStates.map(({ id, name }) => (
            <span
              key={id}
              className="flex text-center bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
