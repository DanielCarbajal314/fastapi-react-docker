import { httpGet } from "../../../shared/utils/http";
import { UserTaskReportResponseItem } from "./types";

export const getUserTaskReport = () =>
  httpGet<UserTaskReportResponseItem[]>("users/tasks/report");
