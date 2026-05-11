import { useState } from "react";
import Sidebar from "../components/navigation/Sidebar";
import Navbar from "../components/navigation/Navbar";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Mobile Overlay (Closes sidebar when clicking outside) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Pass the open state and toggle function */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        {/* Navbar - Pass toggleSidebar so the hamburger button works */}
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;