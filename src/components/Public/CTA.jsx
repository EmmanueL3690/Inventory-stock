import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';

/**
 * CTA Component
 * High-converting call-to-action banner with vibrant blue-to-emerald gradient background,
 * subtle geometric glow decorations, dual action buttons, and trust badges.
 */
const CTA = () => {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl shadow-blue-900/30 border border-blue-500/30"
        >
          {/* Background Decorative Mesh & Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[90px] pointer-events-none -ml-20 -mb-20" />
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

          {/* Content Wrapper */}
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Started in 2 Minutes</span>
            </div>

            {/* Large Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Ready to grow your business <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                with Stocklytics?
              </span>
            </h2>

            {/* Short Description */}
            <p className="text-base sm:text-xl text-blue-100 font-normal max-w-2xl mx-auto leading-relaxed">
              Join thousands of fast-growing brands automating inventory control, eliminating stockouts, and scaling operations seamlessly.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-blue-900 bg-white hover:bg-slate-100 shadow-xl shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </a>

              <a
                href="#"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                Contact Sales
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-blue-200/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>No Credit Card Required</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div>14-Day Free Trial</div>
              <span className="hidden sm:inline">•</span>
              <div>Cancel Anytime</div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTA;