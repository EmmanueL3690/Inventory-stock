import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

/* ---------------- PUBLIC PAGES ---------------- */
import Home from "../components/Public/Pages/Home";

/* ---------------- AUTH PAGES ---------------- */
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";

/* ---------------- ONBOARDING FEATURE ---------------- */
import Onboarding from "../features/onboarding/pages/Onboarding";

/* ---------------- PRODUCTION CORE PAGES ---------------- */
import Dashboard from "../pages/dashboard/Dashboard";
import Settings from "../pages/Setting/Settings";

/* ---------------- INVENTORY MANAGEMENT PAGES ---------------- */
import Inventory from "../features/inventory/Pages/InventoryDashboard";
import StockIn from "../features/inventory/Pages/StockIn";
import StockOut from "../features/inventory/Pages/StockOut";
import Products from "../pages/inventory/Products";
import AddProduct from "../features/products/pages/AddProduct";
import ProductDetail from "../features/products/pages/ProductDetail";
import EditProduct from "../features/products/pages/EditProduct";
import Adjustment from "../pages/inventory/StockAdjustment";

/* ---------------- PURCHASES PAGES ---------------- */
import Purchases from "../pages/Purchases/Purchases";
import PurchaseReturns from "../features/purchases/purchaseReturns/PurchaseReturnModal";
import ReceiveItems from "../features/purchases/receiveItems/pages/ReceiveItems";

/* ---------------- REPORTS PAGES ---------------- */
import Reports from "../pages/reports/Reports";

/* ---------------- SALES PAGES ---------------- */
import Sales from "../pages/sales/Sales";

/* ---------------- SUPPLIER PAGES ---------------- */
import Suppliers from "../features/suppliers/Pages/SuppliersPage";

/* ---------------- ALERTS PAGE ---------------- */
import Alerts from "../pages/alerts/Alerts";

/* ---------------- ROUTE GUARDS ---------------- */
import ProtectedRoute from "./utils/ProtectedRoute";
import AuthRoute from "./utils/AuthRoute";
import OnboardingGuard from "../guards/OnboardingGuard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================================
            PUBLIC LANDING PAGE
        ========================================= */}
        <Route path="/Home" element={<Home />} />

        {/* =========================================
            AUTH ROUTES (GUEST ONLY)
        ========================================= */}
        <Route element={<AuthRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* =========================================
            PROTECTED ROUTE SYSTEM (AUTHENTICATED ONLY)
        ========================================= */}
        <Route element={<ProtectedRoute />}>
          
          {/* 1. STANDALONE ONBOARDING ROUTE */}
          <Route element={<OnboardingGuard />}>
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>

          {/* 2. CORE SYSTEM WORKSPACE */}
          <Route element={<OnboardingGuard />}>
            <Route element={<DashboardLayout />}>
              
              {/* Authenticated Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* Inventory Tree */}
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/stock-in" element={<StockIn />} />
              <Route path="/inventory/stock-out" element={<StockOut />} />
              <Route path="/inventory/products" element={<Products />} />
              <Route path="/inventory/products/add" element={<AddProduct />} />
              <Route path="/inventory/products/:id" element={<ProductDetail />} />
              <Route path="/products/:id/edit" element={<EditProduct />} />
              <Route path="/inventory/adjustment" element={<Adjustment />} />

              {/* Purchases Section */}
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/purchases/receive" element={<ReceiveItems />} />
              <Route path="/purchases/returns" element={<PurchaseReturns />} />

              {/* Sales Section */}
              <Route path="/sales" element={<Sales />} />

              {/* Reports Section */}
              <Route path="/reports" element={<Reports />} />

              {/* Supplier Section */}
              <Route path="/suppliers" element={<Suppliers />} />

              {/* Alert Section */}
              <Route path="/alerts" element={<Alerts />} />

              {/* Settings Section */}
              <Route path="/settings" element={<Settings />} />

            </Route>
          </Route>

        </Route>

        {/* Fallback redirect for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;