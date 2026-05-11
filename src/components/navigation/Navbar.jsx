import { Bell, Search, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const Navbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // ✅ Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // ✅ Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4 flex-1">
        
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl w-full max-w-[300px] focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-slate-500"
          />
        </div>

        <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full">
          <Search size={20} />
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

        {/* PROFILE DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 hover:bg-slate-50 p-1 pr-2 rounded-lg transition-colors"
          >
            {/* ✅ Avatar with initials */}
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
              {getInitials(user?.name)}
            </div>

            {/* ✅ User Info */}
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-sm font-semibold text-slate-800">
                {user?.name || "User"}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">
                {user?.roles?.[0] || "Role"}
              </span>
            </div>
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 border border-slate-100">
              
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;