import API from "../../../routes/services/authService";

/**
 * ==========================================
 * ONBOARDING SERVICE
 * Handles all onboarding-related API requests.
 * ==========================================
 */

/**
 * Get all available industries.
 */
export const getIndustries = async () => {
  try {
    const response = await API.get("/industries");

    return Array.isArray(response.data)
      ? response.data
      : response.data?.data || [];
  } catch (error) {
    console.error("Error fetching industries:", error);
    throw error;
  }
};

/**
 * Complete onboarding by selecting an industry.
 */
export const selectIndustry = async (industryId) => {
  try {
    const response = await API.post(
      "/onboarding/select-industry",
      {
        industryId,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error completing onboarding:",
      error
    );
    throw error;
  }
};