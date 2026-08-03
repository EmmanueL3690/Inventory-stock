import API from "./authService";

// Dashboard Summary
export const getDashboard = async () => {
  const response = await API.get("/dashboard");
  return response.data;
};

// Refresh Dashboard
export const refreshDashboard = async () => {
  const response = await API.get("/dashboard");
  return response.data;
};