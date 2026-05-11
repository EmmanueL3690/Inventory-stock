import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN (MATCHES BACKEND)
  const login = (data) => {
    const { user, accessToken, refreshToken } = data;

    setToken(accessToken);
    setUser(user);

    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("refreshToken", refreshToken);
  };

  // ✅ LOGOUT
  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 CUSTOM HOOK
export const useAuth = () => useContext(AuthContext);