import {
  User,
  Building2,
  Users,
  Bell,
  SlidersHorizontal,
  Shield,
  Database,
  Plug,
  Clock3,
} from "lucide-react";

// Categorized navigation architecture for a clean hierarchy
const navigationGroups = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile" },
      { icon: Building2, label: "Company" },
      { icon: Users, label: "Users & Roles" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications" },
      { icon: SlidersHorizontal, label: "Preferences" },
      { icon: Shield, label: "Security" },
    ],
  },
  {
    title: "System",
    items: [
      { icon: Database, label: "Backup & Restore" },
      { icon: Plug, label: "Integrations" },
      { icon: Clock3, label: "Activity Log" },
    ],
  },
];

const SettingsSidebar = () => {
  // Hardcoded current active tab indicator matching your original code logic.
  // Tip: Replace this with state tracking or a hook like `useLocation()` if using React Router!
  const currentActive = "Profile"; 

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
      <div className="space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.title} className="space-y-1.5">
            
            {/* Group Label Title */}
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400/80 px-3">
              {group.title}
            </h3>

            {/* Group Items Container */}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = item.label === currentActive;
                
                return (
                  <button
                    key={item.label}
                    className={`
                      w-full flex items-center gap-3 px-3.5 h-10 rounded-lg text-left transition-all duration-150 group outline-none
                      ${
                        isActive
                          ? "bg-blue-50/70 text-blue-600 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100/70"
                      }
                    `}
                  >
                    {/* Icon with scaling micro-interactions */}
                    <item.icon 
                      size={18} 
                      className={`
                        transition-transform duration-150 shrink-0
                        ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600 group-hover:scale-105"}
                      `}
                    />
                    
                    {/* Label Text */}
                    <span className="text-sm tracking-tight">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsSidebar;