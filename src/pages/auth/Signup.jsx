import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ShieldCheck } from "lucide-react";

import authBg from "../../assets/bg.png";
import logo from "../../assets/logo.png";

import { useAuth } from "../../Contexts/AuthContext";

import AccountStep from "./steps/Accountstep";
import BusinessAccount from "./steps/BusinessStep";

import { registerBusiness } from "../../routes/services/authService";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    // Account
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Business
    businessName: "",
    plan: "basic",
  });

  // ======================
  // STEP NAVIGATION
  // ======================

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // ======================
  // REGISTER
  // ======================

  const handleFinalSubmit = async () => {
    setError("");

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,

        businessName: formData.businessName,
        plan: formData.plan,
      };

      const response = await registerBusiness(payload);

      console.log("REGISTER RESPONSE", response.data);

      const authPayload = response.data;

      if (!authPayload) {
        throw new Error("Registration completed, but no authentication payload was returned.");
      }

      // Save authentication session using the unwrapped response data object
      login(authPayload);

      // Every new account automatically navigates to the onboarding gateway
      navigate("/onboarding", {
        replace: true,
      });

    } catch (err) {
      if (err.response) {
        setError(
          err.response.data?.message ||
            "Registration failed."
        );
      } else if (err.request) {
        setError(
          "Unable to connect to the server."
        );
      } else {
        setError(
          err.message || "Something went wrong."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // STEPS
  // ======================

  const steps = [
    <AccountStep
      key="account"
      formData={formData}
      setFormData={setFormData}
      next={nextStep}
    />,

    <BusinessAccount
      key="business"
      formData={formData}
      setFormData={setFormData}
      next={handleFinalSubmit}
      back={prevStep}
      loading={loading}
    />,
  ];

  return (
    <div className="flex min-h-screen w-full font-sans bg-[#F8FAFC]">

      {/* Sidebar */}

      <div
        className="hidden lg:flex w-[40%] flex-col items-center justify-center p-12 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${authBg})`,
        }}
      >

        <div className="flex flex-col items-center max-w-md text-center">

          <img
            src={logo}
            alt="Stocklytics"
            className="w-64 mb-16 object-contain"
          />

          <div className="flex items-center gap-3">

            <StepIcon
              n={1}
              label="Account"
              active={step === 1}
              done={step > 1}
            />

            <Divider active={step > 1} />

            <StepIcon
              n={2}
              label="Business"
              active={step === 2}
              done={false}
            />

          </div>

        </div>

        <div className="absolute bottom-10 flex items-center gap-3 text-white/80">

          <ShieldCheck
            size={20}
            className="text-emerald-400"
          />

          <p className="text-xs">
            Your data is secure with us.
          </p>

        </div>

      </div>

      {/* FORM */}

      <div className="flex w-full lg:w-[60%] items-center justify-center p-6">

        <div className="w-full max-w-[580px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-10">

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {steps[step - 1]}

        </div>

      </div>

    </div>
  );
};

// ======================
// Divider
// ======================

const Divider = ({ active }) => (
  <div
    className={`h-[2px] w-8 -mt-5 transition-colors ${
      active
        ? "bg-emerald-500"
        : "bg-white/20"
    }`}
  />
);

// ======================
// Step Icon
// ======================

const StepIcon = ({
  n,
  label,
  active,
  done,
}) => (
  <div className="flex flex-col items-center gap-2">

    <div
      className={`h-9 w-9 rounded-full flex items-center justify-center border-2 transition-all ${
        done
          ? "bg-emerald-500 border-emerald-500"
          : active
          ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/40"
          : "border-white/30"
      }`}
    >

      {done ? (
        <Check
          size={18}
          className="text-white"
        />
      ) : (
        <span className="text-white text-xs font-bold">
          {n}
        </span>
      )}

    </div>

    <span
      className={`text-[9px] uppercase font-bold tracking-widest ${
        active || done
          ? "text-white"
          : "text-white/40"
      }`}
    >
      {label}
    </span>

  </div>
);

export default Signup;