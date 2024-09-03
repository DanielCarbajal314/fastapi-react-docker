export interface UserTaskReportResponseItem {
  userName: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  projectName: string;
}
