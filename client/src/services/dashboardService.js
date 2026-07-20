import { apiClient } from "./apiClient";

export async function getDashboardOverview() {
  const { data } = await apiClient.get("/dashboard/overview");
  return data;
}