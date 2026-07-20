import { apiClient } from "./apiClient";

export async function getConversation(conversationId) {
  const { data } = await apiClient.get(`/conversation/${conversationId}`);
  return data;
}