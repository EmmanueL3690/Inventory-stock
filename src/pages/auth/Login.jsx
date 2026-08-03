import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser } from "../../routes/services/authService";
import { useAuth } from "../../Contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [error, setError] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [showGooglePopup, setShowGooglePopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setStatus("loading");

      // Submit Credentials
      const response = await loginUser(form);
      
      // Support both prospective API response layouts
      const authPayload = response?.data?.data ?? response?.data;

      // Deep payload structural compliance checks
      if (
        !authPayload ||
        !authPayload.accessToken ||
        !authPayload.user ||
        !authPayload.business
      ) {
        throw new Error("Authentication succeeded but returned an incomplete session.");
      }

      // Safe normalization of critical properties without structural mutation
      const business = {
        ...authPayload.business,
        onboardingCompleted: authPayload.business?.onboardingCompleted ?? false,
      };

      const normalizedPayload = {
        ...authPayload,
        business,
      };

      // Entrust state persistence processing cleanly to Context Architecture 
      login(normalizedPayload);

      setStatus("success");

      // Align animation timelines cleanly before making the workspace redirect
      setTimeout(() => {
        setIsExiting(true);

        setTimeout(() => {
          // Route exclusively driven by data object boolean state normalization
          if (normalizedPayload.business.onboardingCompleted === true) {
            navigate("/", { replace: true });
          } else {
            navigate("/onboarding", { replace: true });
          }
        }, 600);
      }, 1000);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to login."
      );
      setStatus("idle");
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.5 }}
          className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white w-full max-w-[450px] rounded-3xl shadow-2xl shadow-slate-200/50 p-8 md:p-10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                Stocklytics
              </h2>
              <p className="text-slate-500 text-sm mt-1">Welcome back, please login.</p>
            </div>

            {error && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="mb-6 text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-green-600 transition-colors" size={18} />
                  <input
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none"
                    placeholder="admin@stocklytics.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-green-600 transition-colors" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* MORPHING BUTTON */}
              <button
                disabled={status !== "idle"}
                className="relative w-full h-[56px] flex items-center justify-center overflow-hidden rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-green-200/50 disabled:cursor-default"
              >
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: status === "success" ? "#10b981" : status === "loading" ? "#059669" : "#16a34a",
                    width: "100%",
                  }}
                  className="absolute inset-0"
                />
                
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="relative z-10 text-white flex items-center gap-2"
                    >
                      Login to Dashboard
                    </motion.span>
                  )}
                  {status === "loading" && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.5 }}
                      className="relative z-10"
                    >
                      <Loader2 className="animate-spin text-white" size={24} />
                    </motion.div>
                  )}
                  {status === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="relative z-10 flex items-center gap-2 text-white"
                    >
                      <Check size={24} strokeWidth={3} />
                      Success
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>

            {/* Social Login Section */}
            <div className="mt-3">
              <div className="relative mb-4 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
                <span className="relative px-4 bg-white text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Or Secure Login With</span>
              </div>

              <button
                type="button"
                onClick={() => setShowGooglePopup(true)}
                className="w-full h-[58px] border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-200 transition-all font-bold text-slate-700"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-6 h-6"
                />
                Google Account
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col items-center gap-4">
              <button onClick={() => navigate('/forgot-password')} 
                className="text-slate-400 text-xs hover:text-slate-600 font-semibold transition-colors">
                Forgot password?
              </button>
              <p className="text-slate-500 text-sm">
                Don't have an account? <span className="text-green-600 font-bold cursor-pointer hover:underline" onClick={() => navigate("/signup")}>Sign up</span>
              </p>
            </div>
          </motion.div>

          <AnimatePresence>
            {showGooglePopup && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowGooglePopup(false)}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                />

                {/* Popup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                  <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-blue-50 flex items-center justify-center">
                      <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-8 h-8"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      Google Login Coming Soon
                    </h3>

                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                      Google authentication has not been implemented yet.
                      Please use your email and password to log in for now.
                    </p>

                    <button
                      type="button"
                      onClick={() => setShowGooglePopup(false)}
                      className="w-full py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
                    >
                      Okay
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;