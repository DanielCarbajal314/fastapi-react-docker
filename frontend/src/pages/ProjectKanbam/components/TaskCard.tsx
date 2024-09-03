import { Badge } from "../../../shared/components";
import { TaskResponse } from "../api/types";

interface TaskCardProps {
  task: TaskResponse;
}

export function TaskCard({
  task: { id, name, description, timestamp, users },
}: TaskCardProps) {
  return (
    <div
      task-id={id}
      draggable={true}
      className="block m-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div className="border border-blue-800 border-t-0 border-l-0 border-r-0 border-b-2 flex justify-between pl-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white pt-1">
          {name}
        </h5>
      </div>
      <div className="py-4 px-6">
        <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
          {description}
        </p>
      </div>
      <div className="py-4 px-6 flex gap-4 flex-wrap">
        {users.map((user) => (
          <Badge key={user}>{user}</Badge>
        ))}
      </div>
      <div className="border border-blue-800 border-t-2 border-l-0 border-r-0 border-b-0 flex justify-end pl-5 p-2">
        <p className="font-normal text-gray-700 dark:text-gray-600 text-xs">
          {new Date(timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
