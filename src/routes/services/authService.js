import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-inventory-auth-service.onrender.com/api",
});

// ✅ Attach token automatically (VERY IMPORTANT)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ================= AUTH =================

// LOGIN
export const loginUser = (data) => API.post("/auth/login", data);

// REGISTER
export const registerUser = (data) => API.post("/auth/register", data);

// FORGOT PASSWORD
export const forgotPassword = (data) =>
  API.post("/auth/forgot-password", data);

export default API;