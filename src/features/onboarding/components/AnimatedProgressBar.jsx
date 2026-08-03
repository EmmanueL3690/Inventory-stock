import React from "react";
import { motion } from "framer-motion";

export default function AnimatedProgressBar({ progress }) {
  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800/80">
      {/* Dynamic Animated Core Track */}
      <motion.div
        className="relative h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"
        animate={{ width: `${progress}%` }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        {/* Sleek reflection trace overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
      </motion.div>
    </div>
  );
}