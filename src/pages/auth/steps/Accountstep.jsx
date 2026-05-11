import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const AccountStep = ({ formData, setFormData, next }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validation before moving to next step
  const handleNext = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    next();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-[28px] font-bold text-[#1E293B]">Create Account</h2>
        <p className="text-slate-400 text-sm mt-1">
          Start by creating your account
        </p>
      </header>

      <div className="space-y-4">
        
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-slate-700">Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-3 pl-11 pr-12 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-slate-700">Confirm Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" size={18} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-3 pl-11 pr-12 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <button 
          onClick={handleNext}
          className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] mt-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AccountStep;