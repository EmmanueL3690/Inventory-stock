import { LayoutDashboard, Boxes, Users, Settings, ChevronRight, X } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Inventory", icon: Boxes, path: "/inventory" },
  { name: "Users", icon: Users, path: "/users" },
  { name: "Settings", icon: Settings, path: "/settings" },
]

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <motion.aside
      // 1. Position: Fixed on mobile, static/relative on large screens
      // 2. Transform: Hidden (-100%) on mobile unless 'isOpen' is true
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Brand Logo & Mobile Close Button */}
      <div className="p-8 flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
             <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Stocklytics</span>
        </motion.div>

        {/* Close button only visible on mobile */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <NavLink
              key={item.name}
              to={item.path}
              // Close sidebar automatically on mobile when a link is clicked
              onClick={() => { if(window.innerWidth < 1024) toggleSidebar() }}
              className={({ isActive }) => `
                relative group flex items-center justify-between p-3 rounded-xl transition-all duration-200
                ${isActive ? "text-blue-600 font-semibold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
              `}
            >
              <div className="flex items-center gap-3 z-10">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm">{item.name}</span>
              </div>

              {!isActive && (
                <ChevronRight size={14} className="opacity-0 lg:group-hover:opacity-100 transition-opacity translate-x--2 group-hover:translate-x-0 transition-transform" />
              )}

              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-blue-50 border border-blue-100 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 w-full p-2 hover:bg-slate-50 rounded-lg transition-colors">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
            JD
          </div>
          <div className="flex flex-col text-left overflow-hidden">
            <span className="text-sm font-semibold text-slate-900 truncate">John Doe</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Admin Role</span>
          </div>
        </button>
      </div>
    </motion.aside>
  )
}

export default Sidebar