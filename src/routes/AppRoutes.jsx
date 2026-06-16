import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import DashboardLayout from "../layouts/DashboardLayout"
import AuthLayout from "../layouts/AuthLayout"

/* ---------------- AUTH PAGES ---------------- */
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"
import ForgotPassword from "../pages/auth/ForgotPassword"

/* ---------------- PRODUCTION CORE PAGES ---------------- */
import Dashboard from "../pages/dashboard/Dashboard" 
import Settings from "../pages/Setting/Settings"

/* ---------------- INVENTORY MANAGEMENT PAGES ---------------- */
import Inventory from "../pages/inventory/Inventory" 
import Categories from "../pages/inventory/Categories"
import Products from "../pages/inventory/Products"
import AddProduct from "../features/products/pages/AddProduct"
// import EditProduct from "../features/products/pages/EditProduct"
import ProductDetail from "../features/products/pages/ProductDetail"
import StockAdjustment from "../pages/inventory/StockAdjustment"

/* ---------------- REPORTS PAGES ---------------- */
import Reports from "../pages/reports/Reports"

/* ---------------- SALES PAGES ---------------- */
import Sales from "../pages/sales/Sales"

/* ------------- Purchases PAGE ----------------*/
import Purchases from "../pages/Purchases/Purchases"

/* ------------- Alert PAGE ---------------*/
import Alerts from "../pages/alerts/Alerts"

/* ---------------- ROUTE GUARDS ---------------- */
import ProtectedRoute from "./utils/ProtectedRoute"
import AuthRoute from "./utils/AuthRoute"


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================================
            AUTH ROUTES
        ========================================= */}
        <Route element={<AuthRoute />}>
          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Signup */}
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* =========================================
            PROTECTED DASHBOARD SYSTEM
        ========================================= */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            
            {/* Core Home / Dashboard view matches "/" */}
            <Route path="/" element={<Dashboard />} />

            {/* Inventory Section Tree */}
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/products" element={<Products />} />
            <Route path="/inventory/products/add" element={<AddProduct />} />
            <Route path="/inventory/products/:id" element={<ProductDetail />} />
            <Route path="/inventory/categories" element={<Categories />} />
            <Route path="/inventory/adjustments" element={<StockAdjustment />} />

            {/* Sales Section */}
            <Route path="/sales" element={<Sales />} />

            {/* Purchases Section */}
            <Route path="/Purchases" element={<Purchases/>} />

            {/* Reports Section */}
            <Route path="/reports" element={<Reports />} />

            {/* Alert Section */}
            <Route path="/Alerts" element={<Alerts />} />

            {/* Setting section */}
            <Route path="/settings" element={<Settings/>} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;