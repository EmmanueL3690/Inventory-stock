import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useIndustries } from "../hooks/useIndustries";
import { selectIndustry } from "../services/onboardingService";

import ProgressHeader from "../components/ProgressHeader";
import WelcomeSection from "../components/WelcomeSection";
import IndustryCard from "../components/IndustryCard";

import { useAuth } from "../../../Contexts/AuthContext";

export default function Onboarding() {
  const navigate = useNavigate();

  const { industries, loading, error: fetchError } = useIndustries();

  const { updateBusiness } = useAuth();

  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleContinue = async (e) => {
    e.preventDefault();

    if (!selectedIndustry || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      console.log("Selected Industry:", selectedIndustry);

      const response = await selectIndustry(selectedIndustry._id);

      console.log("Onboarding Response:", response);

      /**
       * Backend returns:
       * {
       *   success:true,
       *   message:"",
       *   business:{...}
       * }
       */
      const updatedBusiness = response?.business;

      if (!updatedBusiness) {
        throw new Error("Business profile missing from onboarding response.");
      }

      console.log("Business Before Update:");
      console.log(JSON.parse(localStorage.getItem("business")));

      updateBusiness(updatedBusiness);

      console.log("Business After Update:");
      console.log(JSON.parse(localStorage.getItem("business")));

      navigate("/", { replace: true });

    } catch (err) {
      console.error("Onboarding Error:", err);

      setSubmitError(
        err.response?.data?.message ||
        err.message ||
        "Failed to complete onboarding."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <ProgressHeader />

        <WelcomeSection />

        {(fetchError || submitError) && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
            {fetchError || submitError}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {industries.map((industry) => (
              <IndustryCard
                key={industry._id}
                industry={industry}
                isSelected={selectedIndustry?._id === industry._id}
                onSelect={() => setSelectedIndustry(industry)}
              />
            ))}
          </motion.div>
        )}

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={
              !selectedIndustry ||
              isSubmitting ||
              loading
            }
            className="rounded-xl bg-indigo-600 px-10 py-4 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Creating Workspace..."
              : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}