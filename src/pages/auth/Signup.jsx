import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ShieldCheck } from "lucide-react";
import authBg from "../../assets/bg.png";
import logo from "../../assets/LOGO.png";

// Step Imports
import AccountStep from "./steps/Accountstep";
import BusinessAccount from "./steps/BusinessStep";
import OwnerDetails from "./steps/OwnerDetail";
import SetupInventory from "./steps/SetupStep";

const Signup = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // ✅ FIXED: Complete and consistent state
  const [formData, setFormData] = useState({
    // Step 1: Account
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Step 2: Business
    businessName: "",
    industry: "",
    plan: "basic",

    // Step 3: Owner
    phone: "",
    role: "Business Owner",

    // Step 4: Inventory
    setupPreference: ""
  });

  // ✅ Prevent overflow
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // ✅ Cleaner step rendering
  const steps = [
    <AccountStep formData={formData} setFormData={setFormData} next={nextStep} />,
    <BusinessAccount formData={formData} setFormData={setFormData} next={nextStep} back={prevStep} />,
    <OwnerDetails formData={formData} setFormData={setFormData} next={nextStep} back={prevStep} />,
    <SetupInventory formData={formData} back={prevStep} finish={() => navigate("/dashboard")} />
  ];

  return (
    <div className="flex min-h-screen w-full font-sans bg-[#F8FAFC]">
      
      {/* SIDEBAR */}
      <div 
        className="hidden lg:flex w-[40%] flex-col items-center justify-center p-12 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${authBg})` }}
      >
        <div className="flex flex-col items-center max-w-md text-center">
          <img src={logo} alt="Stocklytics" className="w-64 mb-16 object-contain" />
          
          <div className="flex items-center gap-3">
            <StepIcon n={1} label="Account" active={step === 1} done={step > 1} />
            <Divider active={step > 1} />

            <StepIcon n={2} label="Business" active={step === 2} done={step > 2} />
            <Divider active={step > 2} />

            <StepIcon n={3} label="Owner" active={step === 3} done={step > 3} />
            <Divider active={step > 3} />

            <StepIcon n={4} label="Setup" active={step === 4} done={step > 4} />
          </div>
        </div>

        <div className="absolute bottom-10 flex items-center gap-3 text-white/80">
          <ShieldCheck size={20} className="text-emerald-400" />
          <p className="text-xs">Your data is secure with us.</p>
        </div>
      </div>

      {/* FORM AREA */}
      <div className="flex w-full lg:w-[60%] items-center justify-center p-6">
        <div className="w-full max-w-[580px] bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
          {steps[step - 1]}
        </div>
      </div>
    </div>
  );
};

// ✅ Divider component (cleaner)
const Divider = ({ active }) => (
  <div className={`h-[2px] w-8 -mt-5 ${active ? 'bg-emerald-500' : 'bg-white/20'}`} />
);

// ✅ Step icon
const StepIcon = ({ n, label, active, done }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className={`h-9 w-9 rounded-full flex items-center justify-center border-2 transition-all ${
        done
          ? "bg-emerald-500 border-emerald-500"
          : active
          ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/50"
          : "border-white/30"
      }`}
    >
      {done ? (
        <Check size={18} className="text-white" />
      ) : (
        <span className="text-white font-bold text-xs">{n}</span>
      )}
    </div>

    <span
      className={`text-[9px] font-bold uppercase tracking-tighter ${
        active || done ? "text-white" : "text-white/40"
      }`}
    >
      {label}
    </span>
  </div>
);

export default Signup;