import { 
  LayoutDashboard, 
  Boxes, 
  Users, 
  Settings, 
  ChevronRight, 
  X, 
  Zap, 
  LogOut,
  HelpCircle
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import LogoImg from "../../assets/logo.png" 

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Inventory", icon: Boxes, path: "/inventory" },
  { name: "Users", icon: Users, path: "/users" },
  { name: "Settings", icon: Settings, path: "/settings" },
]

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay - Darkens background when sidebar is open */}
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
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full shadow-none"
        }`}
      >
        {/* Brand Logo Section */}
        <div className="h-24 px-8 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={LogoImg} 
                alt="Stocklytics Logo" 
                className="w-10 h-10 object-contain transition-transform duration-500 group-hover:rotate-[10deg]"
              />
              {/* Subtle glow effect behind logo */}
              <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-black text-2xl tracking-tight text-[#1E293B]">
              Stock<span className="text-blue-600">lytics</span>
            </span>
          </NavLink>

          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-4 mb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px]">Main Menu</p>
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => { if(window.innerWidth < 1024) toggleSidebar() }}
                className={({ isActive }) => `
                  relative group flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300
                  ${isActive ? "text-blue-600" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
                `}
              >
                <div className="flex items-center gap-3 z-10">
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-transparent"}`}>
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className={`text-sm font-bold transition-all ${isActive ? "ml-1" : ""}`}>
                    {item.name}
                  </span>
                </div>

                {!isActive && (
                  <ChevronRight 
                    size={16} 
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-slate-300" 
                  />
                )}

                {isActive && (
                  <motion.div
                    layoutId="activeNavHighlight"
                    className="absolute inset-0 bg-blue-50/50 border border-blue-100/50 rounded-2xl"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </NavLink>
            )
          })}
        </nav>

        

        {/* User Profile Section */}
        <div className="p-4 mx-4 mb-6 border border-slate-100 rounded-2xl bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-inner">
                IJ
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">Ifeanyi Justice</p>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter">Verified Admin</p>
            </div>

            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar