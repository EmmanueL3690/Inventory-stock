import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressHeader() {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      {/* Step Info */}
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-xs font-semibold tracking-wider text-indigo-500 uppercase">
          Step 1 of 1
        </span>
        <span className="text-xs font-medium text-gray-400">
          Workspace Setup
        </span>
      </div>
      
      {/* Progress Track */}
      <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}