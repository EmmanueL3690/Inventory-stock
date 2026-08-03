import React from "react";
import {
  Building2,
  UserCircle2,
} from "lucide-react";

const BusinessAccount = ({
  formData,
  setFormData,
  next,
  back,
  loading,
}) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (!formData.businessName.trim()) {
      alert("Please enter your business name.");
      return;
    }

    next();
  };

  const plans = [
    {
      id: "basic",
      title: "Basic",
      desc: "Perfect for small businesses",
    },
    {
      id: "pro",
      title: "Pro",
      desc: "For growing businesses",
    },
    {
      id: "enterprise",
      title: "Enterprise",
      desc: "Large organizations",
    },
  ];

  return (
    <div className="animate-in fade-in duration-500">

      {/* Header */}
      <header className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800">
          Business Information
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          Tell us a little about your business.
          You'll choose your industry after creating your account.
        </p>
      </header>

      <div className="space-y-6">

        {/* Business Name */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">
            Business Name
          </label>

          <div className="relative">
            <Building2
              className="input-icon"
              size={18}
            />

            <input
              type="text"
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={(e) =>
                handleChange(
                  "businessName",
                  e.target.value
                )
              }
              className="input"
            />
          </div>
        </div>

        {/* Subscription */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Subscription Plan
          </label>

          <div className="grid grid-cols-3 gap-3">

            {plans.map((plan) => (

              <div
                key={plan.id}
                onClick={() =>
                  !loading &&
                  handleChange("plan", plan.id)
                }
                className={`plan-card ${
                  formData.plan === plan.id
                    ? "plan-card-active"
                    : ""
                }`}
              >

                <div className="plan-radio">
                  {formData.plan === plan.id && (
                    <div className="plan-dot" />
                  )}
                </div>

                <h4 className="plan-title">
                  {plan.title}
                </h4>

                <p className="plan-desc">
                  {plan.desc}
                </p>

              </div>

            ))}

          </div>
        </div>

        {/* Role */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">
            Your Role
          </label>

          <div className="relative">

            <UserCircle2
              className="input-icon"
              size={18}
            />

            <input
              type="text"
              readOnly
              value="Owner"
              className="input bg-slate-100 cursor-not-allowed text-slate-500"
            />

          </div>
        </div>

        {/* Information Card */}
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

          <h4 className="font-semibold text-blue-900 mb-1">
            What's Next?
          </h4>

          <p className="text-sm text-blue-700 leading-relaxed">
            After your account is created, you'll be asked to choose your
            business industry. Stocklytics will automatically create your
            inventory categories, units, warehouse, and workspace based on
            your selection.
          </p>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">

          <button
            type="button"
            onClick={back}
            disabled={loading}
            className="w-1/2 border border-slate-200 py-3 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition disabled:opacity-50"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={loading}
            className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition active:scale-[0.98] disabled:opacity-70"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default BusinessAccount;