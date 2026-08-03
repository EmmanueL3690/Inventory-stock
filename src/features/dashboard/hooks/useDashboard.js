import { useEffect, useState } from "react";
import { getDashboard } from "../../../routes/services/dashboardService";

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboard();

      setDashboardData(response.data);
      setError("");

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboardData,
    loading,
    error,
    refetchDashboard: fetchDashboard,
  };
};

export default useDashboard;