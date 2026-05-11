import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import authBg from "../assets/bg.png";
import logo from "../assets/LOGO.png";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-white font-sans selection:bg-green-100 selection:text-green-900">
      
      {/* LEFT SIDE: Branding & Visuals */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex relative w-1/2 items-center justify-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
          style={{ backgroundImage: `url(${authBg})` }}
        />
        {/* Dynamic Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-transparent" />

        {/* Floating Content */}
        <div className="relative z-10 text-center px-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <img 
              src={logo} 
              alt="Stocklytics Logo" 
              className="w-full max-w-[400px] mx-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
            />
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-2"
          >
           
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Dynamic Form Area */}
      <main className="flex w-full lg:w-1/2 items-center justify-center p-6 md:p-12 lg:p-20 bg-slate-50 relative">
        
        {/* Subtle Decorative Element for the Form side */}
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

          {/* This renders Login or Signup components */}
          <Outlet />
        </motion.div>

        {/* Global Footer info for Auth pages */}
        <div className="absolute bottom-6 text-slate-400 text-[10px] font-bold uppercase tracking-widest hidden md:block">
          &copy; 2026 Stocklytics Global Inc. &bull; Privacy &bull; Terms
        </div>
      </main>

    </div>
  );
};

export default AuthLayout;