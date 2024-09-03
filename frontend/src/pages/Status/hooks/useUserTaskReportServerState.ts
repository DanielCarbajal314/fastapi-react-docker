import { useQuery } from "@tanstack/react-query";
import { getUserTaskReport } from "../api";
import { UserTaskReportResponseItem } from "../api/types";

export function useUserTaskReportServerState() {
  const { data, isLoading } = useQuery<UserTaskReportResponseItem[]>({
    queryKey: ["userTaskReportServerState"],
    queryFn: getUserTaskReport,
  });
  return {
    userTaskReport: data,
    userTaskReportIsLoading: isLoading,
  };
}
