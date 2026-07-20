import axios from "axios";

const baseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});
