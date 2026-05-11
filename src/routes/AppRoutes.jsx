import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Inventory from "../pages/inventory/Categories";
import Users from "../pages/users/Users";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";

import ProtectedRoute from "./utils/ProtectedRoute";
import AuthRoute from "./utils/AuthRoute"; // ✅ NEW

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 AUTH ROUTES (BLOCK when logged in) */}
        <Route element={<AuthRoute />}>
          
          {/* Auth layout wrapper */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Signup (outside layout if you want custom UI) */}
          <Route path="/signup" element={<Signup />} />
        </Route>


        {/* 🔐 PROTECTED DASHBOARD */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;