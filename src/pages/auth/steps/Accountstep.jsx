import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const AccountStep = ({ formData, setFormData, next }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    next();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-[28px] font-bold text-slate-800">
          Create Account
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Start by creating your account.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-[13px] font-semibold text-slate-700 mb-1.5"
            >
              Full Name
            </label>

            <div className="relative group">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition
                  ${
                    errors.name
                      ? "border-red-500"
                      : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  }`}
              />
            </div>

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-[13px] font-semibold text-slate-700 mb-1.5"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition
                  ${
                    errors.email
                      ? "border-red-500"
                      : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  }`}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-[13px] font-semibold text-slate-700 mb-1.5"
          >
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Create a password"
              className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-12 text-sm outline-none transition
                ${
                  errors.password
                    ? "border-red-500"
                    : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password}
            </p>
          )}

          <p className="text-xs text-slate-400 mt-1">
            Password must contain at least 8 characters.
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-[13px] font-semibold text-slate-700 mb-1.5"
          >
            Confirm Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="confirmPassword"
              type={
                showConfirmPassword ? "text" : "password"
              }
              name="confirmPassword"
              value={formData.confirmPassword || ""}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-12 text-sm outline-none transition
                ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98]"
        >
          Continue
        </button>

        {/* Login */}
        <p className="text-sm text-slate-500 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default AccountStep;