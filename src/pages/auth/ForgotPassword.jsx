import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { forgotPassword } from "../../routes/services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const res = await forgotPassword({ email });

      console.log(res.data);

      setIsSubmitted(true);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to send reset link. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-black border border-[#2a2a2a] p-8 md:p-10 rounded-3xl shadow-2xl z-10"
      >
        <AnimatePresence mode="wait">

          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* HEADER */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-yellow-400/10 border border-yellow-400/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="text-yellow-400" size={32} />
                </div>
                <h1 className="text-2xl font-bold text-white">
                  Forgot Password?
                </h1>
                <p className="text-gray-400 mt-2 text-sm">
                  Enter your email to receive a reset link
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div className="mb-4 text-sm text-red-400 bg-red-500/10 p-2 rounded">
                  {error}
                </div>
              )}

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <Mail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-yellow-400 transition" size={18} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="w-full bg-black border border-[#2a2a2a] py-3.5 pl-10 pr-4 rounded-xl focus:border-yellow-400 outline-none transition text-white"
                  />
                </div>

                <button
                  disabled={isLoading}
                  className="w-full py-4 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition flex justify-center items-center disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-green-500" size={40} />
              </div>

              <h2 className="text-xl font-bold text-white mb-3">
                Check your Inbox
              </h2>

              <p className="text-gray-400 mb-6 text-sm">
                Reset link sent to <br />
                <span className="text-white font-medium">{email}</span>
              </p>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                className="text-sm text-yellow-400 hover:text-yellow-300"
              >
                Try another email
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <div className="mt-8 pt-6 border-t border-[#1a1a1a] flex justify-center">
          <Link
            to="/login"
            className="flex items-center gap-2 text-gray-500 hover:text-white text-sm"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}