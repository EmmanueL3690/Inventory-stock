import React from "react";
import { 
  PackagePlus, 
  FileUp, 
  Clock, 
  CheckCircle2, 
  ChevronLeft,
  ArrowRight 
} from "lucide-react";

const SetupInventory = ({ formData, setFormData, back, finish }) => {
  const options = [
    {
      id: "manual",
      title: "Add First Product",
      desc: "Manually add your first item.",
      icon: PackagePlus,
      btnText: "Add Product",
      color: "bg-green-600"
    },
    {
      id: "import",
      title: "Upload Product List",
      desc: "Import a list of products to get started quickly.",
      icon: FileUp,
      btnText: "Upload List",
      color: "bg-blue-600"
    },
    {
      id: "later",
      title: "Set Up Later",
      desc: "You can add products at any time.",
      icon: Clock,
      btnText: "Skip for Now",
      color: "bg-slate-100"
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
    <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      
      {/* Progress Header (Matching Image) */}
      <div className="flex items-center gap-3 mb-10">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">
          <CheckCircle2 size={14} strokeWidth={3} />
        </div>
        <div className="flex-1 h-[2px] bg-slate-100 relative">
          <div className="absolute left-0 top-0 h-full w-2/3 bg-green-500" />
          <span className="absolute -top-6 left-0 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Step 2 of 3
          </span>
        </div>
      </div>

      {/* Title Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">
          Setup Your Inventory
        </h2>
        <p className="text-slate-500 mt-2">
          Get started by populating your inventory with products.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {options.map((opt) => {
          const Icon = opt.icon;
          const active = formData.setupPreference === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`relative flex flex-col items-center text-center p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer group ${
                active 
                ? "border-green-500 bg-white shadow-xl shadow-green-100 scale-[1.02]" 
                : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"
              }`}
            >
              {/* Illustration Placeholder/Icon */}
              <div className={`mb-6 p-5 rounded-2xl transition-transform duration-500 group-hover:scale-110 ${
                active ? "bg-green-50 text-green-600" : "bg-slate-50 text-slate-400"
              }`}>
                <Icon size={40} strokeWidth={1.5} />
              </div>

              <h3 className="font-bold text-slate-800 text-sm mb-2">{opt.title}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-6 px-2">
                {opt.desc}
              </p>

              {/* Internal Card Button */}
              <div className={`mt-auto w-full py-2 rounded-lg text-[11px] font-bold transition-all ${
                active 
                ? `${opt.color} text-white shadow-md` 
                : "bg-slate-50 text-slate-500 group-hover:bg-slate-100"
              }`}>
                {opt.btnText}
              </div>

              {/* Selection Checkmark */}
              {active && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-lg animate-in zoom-in">
                  <CheckCircle2 size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Success Message (Appears when selected) */}
      <div className={`overflow-hidden transition-all duration-500 ${isSelected ? "max-h-20 opacity-100 mb-6" : "max-h-0 opacity-0"}`}>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3">
          <div className="bg-green-500 rounded-full p-1 text-white">
            <CheckCircle2 size={14} />
          </div>
          <p className="text-sm text-green-800 font-medium">
            Congrats, your account is all set up! <span className="text-green-600 font-bold underline cursor-pointer ml-1">Let's get started.</span>
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-4">
        <button
          onClick={finish}
          disabled={!isSelected}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
            isSelected 
            ? "bg-gradient-to-r from-green-600 to-green-500 shadow-lg shadow-green-200 hover:brightness-110 active:scale-[0.99]" 
            : "bg-slate-200 cursor-not-allowed"
          }`}
        >
          Finish
          {isSelected && <ArrowRight size={18} className="animate-pulse" />}
        </button>

        <button
          onClick={back}
          className="w-full py-3 flex items-center justify-center gap-2 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>
      </div>

      {/* Brand Footer */}
      <p className="text-center text-[11px] text-slate-400 mt-10">
        You're all set! Enjoy managing your inventory with <span className="font-bold text-slate-500">Stocklytics.</span>
      </p>
    </div>
  );
};

export default SetupInventory;