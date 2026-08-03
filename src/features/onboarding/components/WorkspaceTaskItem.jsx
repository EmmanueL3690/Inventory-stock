import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function WorkspaceTaskItem({ label, isCompleted, isActive }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3.5">
        <div className="relative flex h-5 w-5 items-center justify-center">
          <AnimatePresence mode="wait">
            {isCompleted ? (
              <motion.div
                key="completed"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white dark:bg-emerald-400"
              >
                <Check size={12} strokeWidth={3} />
              </motion.div>
            ) : isActive ? (
              <motion.div
                key="active"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative flex h-5 w-5 items-center justify-center"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/20 opacity-75 dark:bg-emerald-500/20" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              </motion.div>
            ) : (
              <motion.div
                key="inactive"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                className="h-4 w-4 rounded-full border-2 border-slate-200 dark:border-slate-800"
              />
            )}
          </AnimatePresence>
        </div>

        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            isCompleted
              ? "text-slate-400 line-through decoration-slate-300 dark:text-slate-600 dark:decoration-slate-800"
              : isActive
              ? "text-slate-900 dark:text-slate-100"
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}