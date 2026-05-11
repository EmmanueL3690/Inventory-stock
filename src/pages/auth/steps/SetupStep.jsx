import React from "react";
import { Boxes, UploadCloud, Wand2 } from "lucide-react";

const SetupInventory = ({ formData, setFormData, back, finish }) => {

  const options = [
    {
      id: "manual",
      title: "Manual Setup",
      desc: "Add products and inventory manually",
      icon: Boxes
    },
    {
      id: "import",
      title: "Import Data",
      desc: "Upload CSV or existing inventory data",
      icon: UploadCloud
    },
    {
      id: "auto",
      title: "Auto Generate",
      desc: "Let system create a starter inventory",
      icon: Wand2
    }
  ];

  const handleSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      setupPreference: value
    }));
  };

  const isSelected = !!formData.setupPreference;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">

      {/* Header */}
      <header className="mb-8 text-center">
        <h2 className="text-[28px] font-bold text-[#1E293B]">
          Setup Your Inventory
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Choose how you want to get started
        </p>
      </header>

      {/* Options */}
      <div className="grid gap-4">
        {options.map((opt) => {
          const Icon = opt.icon;
          const active = formData.setupPreference === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`cursor-pointer rounded-2xl border-2 p-5 flex items-start gap-4 transition-all duration-300 ${
                active
                  ? "border-emerald-500 bg-emerald-50/40 shadow-md"
                  : "border-slate-100 bg-white hover:border-slate-200"
              }`}
            >
              {/* Icon */}
              <div
                className={`p-3 rounded-xl ${
                  active ? "bg-emerald-100" : "bg-slate-100"
                }`}
              >
                <Icon
                  size={22}
                  className={active ? "text-emerald-600" : "text-slate-500"}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className={`text-sm font-bold ${
                    active ? "text-emerald-700" : "text-slate-800"
                  }`}
                >
                  {opt.title}
                </h3>
                <p className="text-[12px] text-slate-500 mt-1">
                  {opt.desc}
                </p>
              </div>

              {/* Radio Indicator */}
              <div
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                  active
                    ? "border-emerald-500"
                    : "border-slate-300"
                }`}
              >
                {active && (
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-6">
        <button
          onClick={back}
          className="w-1/2 border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all"
        >
          Back
        </button>

        <button
          onClick={finish}
          disabled={!isSelected}
          className={`w-1/2 font-bold py-3 rounded-xl transition-all ${
            isSelected
              ? "bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-lg shadow-emerald-200/50"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >                                
          Finish Setup
        </button>
      </div>

      {/* Footer Note */}
      <p className="text-center text-[11px] text-slate-400 mt-6">
        You can always change this later in your dashboard settings
      </p>
    </div>
  );
};

export default SetupInventory;