import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  PackagePlus, 
  LineChart, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';

/**
 * HowItWorks Component
 * Presents a 4-step process flow with connecting lines, step number badges,
 * Framer Motion scroll triggers, and responsive mobile/desktop timelines.
 */
const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: 'Create Account',
      description: 'Sign up in under 2 minutes. No credit card required to start your 14-day free trial.',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      accentColor: 'from-blue-600 to-blue-500',
    },
    {
      number: '02',
      icon: PackagePlus,
      title: 'Add Products',
      description: 'Import your stock items easily via CSV or connect directly to Shopify, Amazon, or QuickBooks.',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      accentColor: 'from-emerald-600 to-emerald-500',
    },
    {
      number: '03',
      icon: LineChart,
      title: 'Track Inventory',
      description: 'Monitor stock levels, orders, and sales in real-time with automated low-stock notifications.',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      accentColor: 'from-blue-600 to-blue-500',
    },
    {
      number: '04',
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Leverage AI demand forecasting and real-time analytics to minimize costs and maximize margins.',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      accentColor: 'from-emerald-600 to-emerald-500',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-semibold uppercase tracking-wide">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            How Stocklytics powers <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              your growth step-by-step
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Get up and running in minutes with an intuitive workflow designed for speed and accuracy.
          </p>
        </div>

        {/* Steps Container Grid */}
        <div className="relative">
          
          {/* Desktop Connecting Line (Spans across all 4 columns) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-200 -translate-y-12 -z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-500/40 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-xs font-bold shadow-md">
                    STEP {step.number}
                  </div>

                  {/* Mobile Connector Arrow */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden my-4 text-slate-300 group-hover:text-blue-500 transition-colors">
                      <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
                    </div>
                  )}

                  {/* Icon Container */}
                  <div className={`w-16 h-16 mt-2 rounded-2xl ${step.iconBg} border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {step.description}
                  </p>

                  {/* Hover Bottom Accent Bar */}
                  <div className={`absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r ${step.accentColor} rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;