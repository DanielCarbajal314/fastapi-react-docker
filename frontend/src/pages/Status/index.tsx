import { useState } from "react";
import { LoadingPage } from "../../shared/components/LoadingContainer";
import { UserTaskReportResponseItem } from "./api/types";
import { useUserTaskReportServerState } from "./hooks/useUserTaskReportServerState";
import { Badge } from "../../shared/components";

export function UserStatus({ userName, tasks }: UserTaskReportResponseItem) {
  const [showTasks, setShowTasks] = useState(false);
  const toggleShowTasks = () => setShowTasks((x) => !x);
  const icon = showTasks ? "-" : "+";
  return (
    <div className="border-b border-gray-400 p-2">
      <div className="flex gap-1">
        <button onClick={toggleShowTasks}>
          <Badge>{icon}</Badge>
        </button>
        {userName}
      </div>
      {showTasks && (
        <div className="flex flex-col gap-4 my-4">
          {tasks.map((task) => (
            <div key={task.id} className="pl-8 flex gap-16 justify-between">
              <div className="flex items-center w-[70%]">
                <Badge color="green">
                  <p className="text-lg">{task.name}</p>
                </Badge>
                <div className="py-2 px-6">
                  <p className="text-xs break-words font-normal">
                    {task.description}
                  </p>
                </div>
              </div>
              <div className="w-[20%] flex justify-end items-center">
                <Badge color="yellow">Status: {task.status}</Badge>
                <Badge color="indigo">Project: {task.projectName}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Status() {
  const { userTaskReportIsLoading, userTaskReport } =
    useUserTaskReportServerState();
  return (
    <LoadingPage loading={userTaskReportIsLoading}>
      <div>
        <p className="text-3xl mb-16">Tasks by User</p>
        {userTaskReport?.map((user) => <UserStatus {...user} />)}
      </div>
    </LoadingPage>
  );
}
