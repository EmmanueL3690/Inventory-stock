import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-inventory-auth-service.onrender.com/api",
});

// Attach access token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ================= AUTH =================

// LOGIN
export const loginUser = (data) =>
  API.post("/auth/login", data);

// REGISTER BUSINESS
export const registerBusiness = (data) =>
  API.post("/auth/register-business", data);

// FORGOT PASSWORD
export const forgotPassword = (data) =>
  API.post("/auth/forgot-password", data);

export default API;