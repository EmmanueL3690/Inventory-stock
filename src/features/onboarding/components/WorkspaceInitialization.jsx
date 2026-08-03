import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import WorkspaceTaskItem from "./WorkspaceTaskItem";
import AnimatedProgressBar from "./AnimatedProgressBar";
import StatusMessage from "./StatusMessage";
import logo from "../../../assets/LOGO.png"; 
import { useAuth } from "../../../Contexts/AuthContext";

// Define the sequenced tasks
const TASKS = [
  { id: 1, label: "Creating Categories", weight: 15 },
  { id: 2, label: "Creating Measurement Units", weight: 15 },
  { id: 3, label: "Creating Warehouse", weight: 20 },
  { id: 4, label: "Configuring Inventory Settings", weight: 15 },
  { id: 5, label: "Preparing Product Workspace", weight: 20 },
  { id: 6, label: "Finalizing Business Setup", weight: 15 },
];

const STATUS_MESSAGES = [
  "Initializing workspace...",
  "Preparing business records...",
  "Creating inventory structure...",
  "Almost ready...",
  "Finishing setup...",
];

export default function WorkspaceInitialization({ payload, onCancel }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [currentStep, setCurrentStep] = useState(0); // Index of task currently animating
  const [completedSteps, setCompletedSteps] = useState([]); // List of completed task IDs
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(STATUS_MESSAGES[0]);
  
  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const apiCalled = useRef(false);

  // Trigger the API request immediately on mount or manual retry
  const runInitialization = async () => {
    if (apiCalled.current) return;
    apiCalled.current = true;
    setError(null);

    try {
      // Direct POST request to your onboarding endpoint
      const response = await fetch("/api/onboarding/select-industry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken") || ""}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to initialize your workspace setup.");
      }

      const data = await response.json();
      setApiData(data);
      setApiSuccess(true);
    } catch (err) {
      setError(err.message || "An unexpected network error occurred.");
      apiCalled.current = false; // Reset for potential retries
    }
  };

  useEffect(() => {
    runInitialization();
  }, []);

  // Control step increments, progress accumulation, and status transitions
  useEffect(() => {
    if (error) return;

    const interval = setInterval(() => {
      // Calculate dynamic speed based on whether the API has already responded successfully
      const stepDuration = apiSuccess ? 150 : 800; 

      setProgress((prevProgress) => {
        const currentTask = TASKS[currentStep];
        if (!currentTask) return prevProgress;

        const targetProgressForStep = TASKS.slice(0, currentStep + 1).reduce(
          (acc, t) => acc + t.weight,
          0
        );

        if (prevProgress < targetProgressForStep) {
          // Increment progress smoothly up to the limit of the current incomplete step
          const stepSize = apiSuccess ? 8 : 1.5;
          return Math.min(prevProgress + stepSize, targetProgressForStep);
        } else {
          // Complete current step, transition to next
          setCompletedSteps((prev) => [...prev, currentTask.id]);
          
          if (currentStep < TASKS.length - 1) {
            setCurrentStep((prev) => prev + 1);
            // Update status string based on relative completed step milestones
            const msgIndex = Math.min(
              Math.floor(((currentStep + 1) / TASKS.length) * STATUS_MESSAGES.length),
              STATUS_MESSAGES.length - 1
            );
            setStatusText(STATUS_MESSAGES[msgIndex]);
          } else if (apiSuccess && apiData) {
            // Once all tasks complete and API data is safely buffered, commit Auth context and route
            clearInterval(interval);
            
            // Sync context state
            login(apiData);
            
            // Navigate based on onboarding status payload
            const onboardingCompleted = apiData?.business?.onboardingCompleted === true;
            if (onboardingCompleted) {
              navigate("/");
            } else {
              navigate("/onboarding");
            }
          }
          return prevProgress;
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentStep, apiSuccess, apiData, error]);

  const handleRetry = () => {
    setIsRetrying(true);
    setProgress(0);
    setCurrentStep(0);
    setCompletedSteps([]);
    setStatusText(STATUS_MESSAGES[0]);
    
    setTimeout(() => {
      setIsRetrying(false);
      runInitialization();
    }, 400);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50/50 px-4 dark:bg-slate-950">
      {/* Background Layer: Elegant Glowing Ambient Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-16 -top-16 h-96 w-96 rounded-full bg-emerald-400/10 blur-[80px] dark:bg-emerald-500/5"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute -right-20 bottom-10 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[100px] dark:bg-blue-500/5"
        />
      </div>

      <AnimatePresence mode="wait">
        {!error ? (
          <motion.div
            key="loading-card"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="z-10 w-full max-w-md border border-slate-200/60 bg-white/70 p-8 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/70 dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.5)] md:p-10 rounded-[2.5rem]"
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                src={logo}
                alt="Stocklytics"
                className="h-9 object-contain dark:invert"
              />
            </div>

            {/* Header Text */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                Preparing Your Workspace
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                We're creating your personalized inventory workspace. This usually takes only a few seconds.
              </p>
            </div>

            {/* Checklist items */}
            <div className="mt-8 space-y-3.5">
              {TASKS.map((task, index) => (
                <WorkspaceTaskItem
                  key={task.id}
                  label={task.label}
                  isCompleted={completedSteps.includes(task.id)}
                  isActive={currentStep === index}
                />
              ))}
            </div>

            {/* Dynamic Status and Progress */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <StatusMessage text={statusText} />
                <span className="text-xs font-semibold tabular-nums text-emerald-500 dark:text-emerald-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <AnimatedProgressBar progress={progress} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="error-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            className="z-10 w-full max-w-md border border-red-100 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-red-900/30 dark:bg-slate-900/90 rounded-[2.5rem]"
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                <AlertCircle size={28} />
              </div>
              
              <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-slate-50">
                Initialization Failed
              </h3>
              <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {error}
              </p>

              <div className="mt-8 w-full space-y-3">
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/20 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  <RefreshCw size={16} className={isRetrying ? "animate-spin" : ""} />
                  {isRetrying ? "Connecting..." : "Retry Workspace Setup"}
                </button>
                
                {onCancel && (
                  <button
                    onClick={onCancel}
                    className="w-full rounded-2xl border border-slate-200/80 bg-transparent px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50"
                  >
                    Go Back
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}