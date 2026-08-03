import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StatusMessage({ text }) {
  return (
    <div className="h-5 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={text}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="text-xs font-medium text-slate-500 dark:text-slate-400"
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}