import {
  TaskResponse,
  TaskStatesOption,
  UpdateTaskRequest,
} from "../api/types";
import { useDragState } from "../hooks/useDragState";
import { TaskCard } from "./TaskCard";

interface TaskBoardProps {
  updateTask: (body: UpdateTaskRequest) => void;
  taskStatesOptions?: TaskStatesOption[];
  tasks?: TaskResponse[];
  projectId?: number;
}

export function TaskBoard({
  updateTask,
  taskStatesOptions,
  tasks,
  projectId,
}: TaskBoardProps) {
  const {
    isDragingOver,
    draggedTaskId,
    setDraggedTaskId,
    enteringDragArea,
    leavingingDragArea,
    clearActiveState,
  } = useDragState();
  return (
    <div className="flex justify-evenly gap-2 mt-5 h-[700px]">
      {taskStatesOptions?.map(({ value, label }, index) => (
        <div
          key={value}
          className={`w-1/${taskStatesOptions.length} ${isDragingOver(label) ? "bg-zinc-700" : ""}`}
          onDragEnter={enteringDragArea(label)}
          onDragLeave={leavingingDragArea(label)}
          onDrop={(e) => {
            e.preventDefault();
            clearActiveState();
            updateTask({
              taskId: draggedTaskId ?? 0,
              projectId: projectId ?? 0,
              taskStateId: value,
            });
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrag={(e) => {
            setDraggedTaskId(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              parseInt((e.target as any).getAttribute("task-id")),
            );
          }}
        >
          <h5
            className={`bg-purple-100 text-purple-400 text-xl font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-${index + 1}00 border border-purple-400 w-full`}
          >
            {label}
          </h5>
          <div className="flex-col">
            {tasks
              ?.filter((x) => x.taskState === label)
              .map((task) => <TaskCard key={task.id} {...{ task }} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
