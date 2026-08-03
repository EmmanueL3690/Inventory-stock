import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  PackageCheck, 
  DollarSign, 
  BarChart3,
  Layers
} from 'lucide-react';

/**
 * Hero Component
 * Features conversion-focused copy, floating metric badges, animated dashboard mockup,
 * subtle background gradients, and trust signals.
 */
const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-white">
      {/* Background Radial & Gradient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[10%] right-[15%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-700 to-emerald-600 bg-clip-text text-transparent">
                AI-Powered Inventory & Business Intelligence
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Smarter Inventory. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                Better Decisions.
              </span> <br className="hidden sm:inline" />
              Stronger Business.
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Stocklytics helps businesses manage inventory, purchases, suppliers, customers, and sales from one intelligent platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-slate-300 transition-all duration-200"
              >
                <Play className="w-4 h-4 fill-slate-700 text-slate-700" />
                Book a Demo
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>14-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Secure Cloud</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Dashboard Mockup & Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-6 relative mt-8 lg:mt-0"
          >
            {/* Main Mockup Container */}
            <div className="relative rounded-2xl p-3 bg-gradient-to-b from-slate-200/60 via-slate-100/40 to-white/20 border border-slate-200/80 shadow-2xl backdrop-blur-sm">
              
              {/* Internal Mockup Shell */}
              <div className="bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-800 text-white">
                
                {/* Mockup Top Window Header */}
                <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  </div>
                  <div className="px-3 py-1 bg-slate-900/60 rounded-md text-xs text-slate-400 font-mono">
                    app.stocklytics.com
                  </div>
                  <div className="w-12" />
                </div>

                {/* Mockup Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Bar */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                      <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Stock Items</span>
                      <p className="text-base sm:text-lg font-bold text-white">14,280</p>
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                      <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Active Orders</span>
                      <p className="text-base sm:text-lg font-bold text-emerald-400">342</p>
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                      <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Monthly Rev</span>
                      <p className="text-base sm:text-lg font-bold text-blue-400">$128.4k</p>
                    </div>
                  </div>

                  {/* Simulated Chart */}
                  <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/40 space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">Sales vs Stock Velocity</span>
                      <span className="text-emerald-400 font-medium">+24.8% YoY</span>
                    </div>
                    <div className="h-28 flex items-end gap-2 pt-2 border-b border-slate-700/50 pb-1">
                      {[35, 48, 62, 55, 80, 72, 95, 88, 100].map((height, i) => (
                        <div key={i} className="flex-1 bg-slate-700/50 rounded-t-sm h-full flex items-end overflow-hidden">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 1, delay: 0.4 + i * 0.05 }}
                            className="w-full bg-gradient-to-t from-blue-600 to-emerald-400 rounded-t-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 1: Revenue (Top Right) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-2 sm:top-4 sm:-right-4 bg-white p-3.5 rounded-xl shadow-xl border border-slate-200/80 flex items-center gap-3"
            >
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Revenue Growth</p>
                <p className="text-sm font-bold text-slate-900">$48,290 <span className="text-xs text-emerald-500 font-semibold">+18%</span></p>
              </div>
            </motion.div>

            {/* Floating Card 2: Inventory Status (Bottom Left) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-6 -left-2 sm:bottom-6 sm:-left-6 bg-white p-3.5 rounded-xl shadow-xl border border-slate-200/80 flex items-center gap-3"
            >
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Stock Sync</p>
                <p className="text-sm font-bold text-slate-900">99.9% Accurate</p>
              </div>
            </motion.div>

            {/* Floating Card 3: Analytics (Top Left) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="hidden sm:flex absolute top-1/3 -left-8 bg-white p-3.5 rounded-xl shadow-xl border border-slate-200/80 items-center gap-3"
            >
              <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Real-Time Insights</p>
                <p className="text-sm font-bold text-slate-900">AI Enabled</p>
              </div>
            </motion.div>

            {/* Floating Card 4: Sales Velocity (Bottom Right) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="hidden sm:flex absolute -bottom-2 right-8 bg-white p-3.5 rounded-xl shadow-xl border border-slate-200/80 items-center gap-3"
            >
              <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Sales Velocity</p>
                <p className="text-sm font-bold text-slate-900">High Demand</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;