import React from 'react';
import { motion } from 'framer-motion';

// Maps industry names to specific icons dynamically to avoid hardcoding static images
const getIndustryIcon = (name) => {
  const normalized = name.toLowerCase();
  if (normalized.includes('retail') || normalized.includes('shop')) {
    return (
      <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    );
  }
  if (normalized.includes('pharmacy') || normalized.includes('health') || normalized.includes('medical')) {
    return (
      <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    );
  }
  if (normalized.includes('food') || normalized.includes('restaurant') || normalized.includes('bakery')) {
    return (
      <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  // Default elegant abstract icon
  return (
    <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
};

export default function IndustryCard({ industry, isSelected, onSelect }) {
  const { name, description } = industry;

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative cursor-pointer rounded-2xl p-5 border text-left transition-shadow duration-300 ${
        isSelected
          ? 'bg-indigo-50/40 border-indigo-500 shadow-lg shadow-indigo-100/50 ring-1 ring-indigo-500/30'
          : 'bg-white/80 backdrop-blur-md border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      {/* Icon Container */}
      <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-4 ${
        isSelected ? 'bg-indigo-100/70' : 'bg-gray-100/80'
      }`}>
        {getIndustryIcon(name)}
      </div>

      {/* Title & Description */}
      <h3 className="text-md font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">
        {description || `Tailor your Stocklytics workspace for ${name.toLowerCase()} operational workflows.`}
      </p>

      {/* Selected Indicator Dot */}
      {isSelected && (
        <motion.div 
          layoutId="selectedIndicator"
          className="absolute top-4 right-4 w-2.5 h-2.5 bg-indigo-600 rounded-full"
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      )}
    </motion.div>
  );
}