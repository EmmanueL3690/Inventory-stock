import React from 'react';
import { motion } from 'framer-motion';

export default function WelcomeSection() {
  return (
    <div className="text-center mb-10">
      <motion.h1 
        className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        Welcome to Stocklytics
      </motion.h1>
      <motion.p 
        className="mt-3 text-lg text-gray-500 max-w-md mx-auto"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
      >
        Let's prepare your workspace. Choose your business industry to initialize customized records.
      </motion.p>
    </div>
  );
}