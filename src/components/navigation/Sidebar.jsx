import { useState } from "react";
import {
  LayoutDashboard,
  Boxes,
  DollarSign,
  ShoppingCart,
  BarChart3,
  BellRing,
  Settings,
  ChevronRight,
  ChevronDown,
  X,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LogoImg from "../../assets/logo.png";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },

  {
    name: "Inventory",
    icon: Boxes,
    children: [
      {
        name: "Products",
        path: "/inventory/products",
      },
      {
        name: "Categories",
        path: "/inventory/categories",
      },
      {
        name: "Units",
        path: "/inventory/units",
      },
      {
        name: "Adjustments",
        path: "/inventory/adjustments",
      },
      {
        name: "Stock Count",
        path: "/inventory/stock-count",
      },
    ],
  },

  {
    name: "Sales",
    icon: DollarSign,
    path: "/sales",
  },

  {
    name: "Purchases",
    icon: ShoppingCart,
    path: "/purchases",
  },

  {
    name: "Reports",
    icon: BarChart3,
    path: "/reports",
  },

  {
    name: "Alerts",
    icon: BellRing,
    path: "/alerts",
  },

  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState("Inventory");

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col transition-all duration-300 lg:static lg:translate-x-0 ${
          isOpen
            ? "translate-x-0 shadow-2xl"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-28 flex items-center justify-between border-b border-slate-100">
          <NavLink
            to="/"
            className="flex-1 flex justify-center items-center"
          >
            <img 
                src={LogoImg} 
                alt="Stocklytics Logo" 
                className="h-84 w-auto max-w-[85%] object-contain block drop-shadow-sm transition-transform duration-300 hover:scale-105"
              />
          </NavLink>

          <button
            onClick={toggleSidebar}
            className="lg:hidden absolute right-4 p-2 rounded-xl hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-1">
            <div className="px-4 mb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px]">Main Menu</p>
          </div>

            {menuItems.map((item) => {
              const Icon = item.icon;

              /* Inventory Dropdown */
              if (item.children) {
                return (
                  <div key={item.name}>
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === item.name
                            ? null
                            : item.name
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={20}
                          className="text-blue-600"
                        />

                        <span className="font-semibold text-slate-800">
                          {item.name}
                        </span>
                      </div>

                      {openMenu === item.name ? (
                        <ChevronDown
                          size={18}
                          className="text-slate-500"
                        />
                      ) : (
                        <ChevronRight
                          size={18}
                          className="text-slate-500"
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {openMenu === item.name && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="overflow-hidden ml-12 mt-1"
                        >
                          <div className="space-y-1 py-2">
                            {item.children.map((child) => (
                              <NavLink
                                key={child.name}
                                to={child.path}
                                onClick={() => {
                                  if (
                                    window.innerWidth < 1024
                                  ) {
                                    toggleSidebar();
                                  }
                                }}
                                className={({ isActive }) =>
                                  `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                    isActive
                                      ? "bg-blue-50 text-blue-600"
                                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                  }`
                                }
                              >
                                {child.name}
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              /* Normal Menu Items */
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  <Icon size={20} />

                  <span className="font-semibold">
                    {item.name}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                IJ
              </div>

              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">
                Ifeanyi Justice
              </p>

              <p className="text-xs text-blue-600 font-medium">
                Verified Admin
              </p>
            </div>

            <button className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 transition">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
