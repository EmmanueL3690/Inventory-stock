import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // Restore Session
  // ==========================
  useEffect(() => {
    try {
      const storedAccessToken = localStorage.getItem("accessToken") || localStorage.getItem("token");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      const storedUser = localStorage.getItem("user");
      const storedBusiness = localStorage.getItem("business");

      if (storedAccessToken) setAccessToken(storedAccessToken);
      if (storedRefreshToken) setRefreshToken(storedRefreshToken);
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedBusiness) setBusiness(JSON.parse(storedBusiness));
    } catch (error) {
      // Atomic clean up on parsing failures to prevent poison state loops
      localStorage.removeItem("accessToken");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("business");
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================
  // Login
  // ==========================
  const login = (data) => {
    const nextAccessToken = data?.accessToken || null;
    const nextRefreshToken = data?.refreshToken || null;
    const nextUser = data?.user || null;
    const nextBusiness = data?.business || null;

    // Synchronize React State Tree
    setAccessToken(nextAccessToken);
    setRefreshToken(nextRefreshToken);
    setUser(nextUser);
    setBusiness(nextBusiness);

    // Synchronize Local Storage Values
    if (nextAccessToken) {
      localStorage.setItem("accessToken", nextAccessToken);
      localStorage.setItem("token", nextAccessToken); // Backward compatibility fallback
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("token");
    }

    if (nextRefreshToken) {
      localStorage.setItem("refreshToken", nextRefreshToken);
    } else {
      localStorage.removeItem("refreshToken");
    }

    if (nextUser) {
      localStorage.setItem("user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("user");
    }

    if (nextBusiness) {
      localStorage.setItem("business", JSON.stringify(nextBusiness));
    } else {
      localStorage.removeItem("business");
    }
  };

  // ==========================
  // Update Business State
  // ==========================
  const updateBusiness = (updatedBusiness) => {
    // 1. Update primary business states
    setBusiness(updatedBusiness);
    if (updatedBusiness) {
      localStorage.setItem("business", JSON.stringify(updatedBusiness));
    } else {
      localStorage.removeItem("business");
    }

    // 2. Safely sync changes into nested user objects automatically
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = {
        ...prevUser,
        business: updatedBusiness,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // ==========================
  // Logout
  // ==========================
  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setBusiness(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("business");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        token: accessToken, // Retains API compatibility mapping for older hooks
        refreshToken,
        user,
        business,
        loading,
        login,
        logout,
        updateBusiness,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);