import React from "react";
import { Building2, Tag, UserCircle2, ChevronDown } from "lucide-react";

const BusinessAccount = ({ formData, setFormData, next, back }) => {

  // Handle input change (consistent with other steps)
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Basic validation before moving forward
  const handleNext = () => {
    if (!formData.businessName || !formData.industry) {
      alert("Please fill all required fields");
      return;
    }
    next();
  };

  const plans = [
    { id: "basic", title: "Basic", desc: "Get started" },
    { id: "pro", title: "Pro", desc: "Advanced features" },
    { id: "enterprise", title: "Enterprise", desc: "Custom solutions" },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      
      {/* Header */}
      <header className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800">
          Business Information
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Tell us about your business
        </p>
      </header>

      <div className="space-y-6">

        {/* Business Name */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">
            Business Name
          </label>
          <div className="relative group">
            <Building2 className="input-icon" size={18} />
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              placeholder="Enter your business name"
              className="input"
            />
          </div>
        </div>

        {/* Industry */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">
            Industry
          </label>
          <div className="relative group">
            <Tag className="input-icon" size={18} />
            <select
              value={formData.industry}
              onChange={(e) => handleChange("industry", e.target.value)}
              className="input appearance-none cursor-pointer"
            >
              <option value="">Select industry</option>
              <option value="retail">Retail & E-commerce</option>
              <option value="logistics">Logistics</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>

        {/* Subscription Plan */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Subscription Plan
          </label>

          <div className="grid grid-cols-3 gap-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handleChange("plan", plan.id)}
                className={`plan-card ${
                  formData.plan === plan.id ? "plan-card-active" : ""
                }`}
              >
                <div className="plan-radio">
                  {formData.plan === plan.id && (
                    <div className="plan-dot" />
                  )}
                </div>

                <h4 className="plan-title">{plan.title}</h4>
                <p className="plan-desc">{plan.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Role (Read-only default) */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">
            Your Role
          </label>
          <div className="relative">
            <UserCircle2 className="input-icon" size={18} />
            <input
              type="text"
              value={formData.role || "Owner"}
              readOnly
              className="input bg-slate-100 cursor-not-allowed text-slate-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={back}
            className="w-1/2 border border-slate-200 py-3 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition active:scale-[0.98]"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
};

export default BusinessAccount;