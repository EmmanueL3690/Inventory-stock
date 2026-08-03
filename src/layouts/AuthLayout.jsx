import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Package, 
  BarChart3, 
  Bell, 
  Users, 
  TrendingUp, 
  ScanBarcode, 
  Boxes 
} from "lucide-react";
import authBg from "../assets/bg.png";
import logo from "../assets/LOGO.png";

const AuthLayout = () => {
  // Feature card items configuration
  const features = [
    {
      icon: Package,
      title: "Smart Inventory Tracking",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: BarChart3,
      title: "Sales Analytics",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      icon: Bell,
      title: "Low Stock Alerts",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      icon: Users,
      title: "Multi-user Access",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* LEFT SIDE: SaaS Modern Branding & Visuals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex relative w-1/2 flex-col justify-between p-12 overflow-hidden bg-slate-950 border-r border-slate-800/60"
      >
        {/* ABSTRACT BACKGROUND ELEMENTS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Custom Background Image Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity scale-105"
            style={{ backgroundImage: `url(${authBg})` }}
          />

          {/* Radial Gradient Glows */}
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.4, 0.25] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.35, 0.2] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-emerald-500/25 rounded-full blur-[120px]"
          />

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Floating Subtle Domain Graphics */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-10 text-slate-800/40"
          >
            <ScanBarcode className="w-32 h-32" />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 left-10 text-slate-800/30"
          >
            <Boxes className="w-40 h-40" />
          </motion.div>
        </div>

        {/* TOP BRANDING & HEADER SECTION */}
        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <img 
              src={logo} 
              alt="Stocklytics Logo" 
              className="h-4 md:h-42 w-auto object-contain drop-shadow-[0_10px_20px_rgba(37,99,235,0.25)]" 
            />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.15]"
          >
            Manage Your Inventory <br />
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              with Confidence.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-base xl:text-lg text-slate-400 font-normal leading-relaxed"
          >
            Track inventory, monitor stock levels, manage sales, and generate business insights from one intelligent dashboard.
          </motion.p>
        </div>

        {/* MIDDLE: ILLUSTRATION / MOCK DASHBOARD CARD */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative z-10 my-auto py-6"
        >
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl shadow-2xl shadow-blue-950/40">
            {/* Mock Header Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-500">stocklytics.app/dashboard</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <TrendingUp className="w-3.5 h-3.5" />
                Live Sync
              </div>
            </div>

            {/* Mock Dashboard Graphics */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/40">
                <p className="text-[11px] text-slate-400">Total Stock</p>
                <p className="text-lg font-bold text-white mt-1">128,430</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/40">
                <p className="text-[11px] text-slate-400">Monthly Revenue</p>
                <p className="text-lg font-bold text-emerald-400 mt-1">$94,210</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/40">
                <p className="text-[11px] text-slate-400">Active Orders</p>
                <p className="text-lg font-bold text-blue-400 mt-1">1,420</p>
              </div>
            </div>

            {/* Simulated Chart Visual */}
            <div className="h-20 w-full bg-slate-800/30 rounded-xl p-2 flex items-end gap-2 border border-slate-800/60 justify-between px-4">
              <div className="w-full bg-blue-500/20 h-[40%] rounded-t" />
              <div className="w-full bg-blue-500/40 h-[65%] rounded-t" />
              <div className="w-full bg-emerald-500/50 h-[85%] rounded-t" />
              <div className="w-full bg-blue-500/30 h-[50%] rounded-t" />
              <div className="w-full bg-emerald-500/80 h-[100%] rounded-t" />
              <div className="w-full bg-blue-500/60 h-[70%] rounded-t" />
            </div>
          </div>
        </motion.div>

        {/* BOTTOM: FEATURE CARDS */}
        <div className="relative z-10 grid grid-cols-2 gap-3.5">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className={`p-3.5 rounded-xl border ${feature.borderColor} bg-slate-900/40 backdrop-blur-md flex items-center gap-3 transition-all hover:bg-slate-900/70`}
              >
                <div className={`p-2 rounded-lg ${feature.bgColor} ${feature.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-200">
                  {feature.title}
                </span>
              </motion.div>
            );
          })}
        </div>

      </motion.div>

      {/* RIGHT SIDE: Dynamic Form Area (Unchanged Design & Structure) */}
      <main className="flex w-full lg:w-1/2 items-center justify-center p-6 md:p-12 lg:p-20 bg-slate-50 relative">
        
        {/* Decorative background glows for the form side */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md z-10"
        >
          {/* Logo appears only on mobile/tablet */}
          <div className="lg:hidden flex justify-center mb-10">
            <img src={logo} alt="logo" className="h-12 w-auto" />
          </div>

          {/* Renders Login or Signup components */}
          <Outlet />
        </motion.div>

        {/* Global Footer info */}
        <div className="absolute bottom-6 text-slate-400 text-[10px] font-bold uppercase tracking-widest hidden md:block">
          &copy; 2026 Stocklytics Global Inc. &bull; Privacy &bull; Terms
        </div>
      </main>

    </div>
  );
};

export default AuthLayout;