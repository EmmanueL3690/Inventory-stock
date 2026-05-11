import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginUser } from "../../routes/services/authService";
import { useAuth } from "../../Contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ FIXED: move here

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // HANDLE INPUT
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
    setLoading(true);

    const res = await loginUser(form);

    // ✅ Get full backend response
    const data = res.data;

    // ✅ Let AuthContext handle everything
    login(data);

    // ✅ Redirect
    navigate("/");

  } catch (err) {
    console.error(err);

    setError(
      err.response?.data?.message || "Invalid email or password"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white w-[500px] rounded-2xl shadow-xl p-8">

      <h2 className="text-xl font-semibold text-center mb-1">
        Welcome to Stocklytics
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Login to your account
      </p>

      {error && (
        <div className="mb-4 text-sm text-red-500 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* EMAIL */}
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 cursor-pointer text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* OPTIONS */}
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" />
            Remember me
          </label>

          <span
            onClick={() => navigate("/forgot-password")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Forgot password?
          </span>
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-gray-400 text-sm">OR</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <button className="w-full border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5"
        />
        Login with Google
      </button>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-green-600 cursor-pointer hover:underline"
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;