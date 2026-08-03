import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Clock, 
  TrendingUp, 
  BrainCircuit, 
  Zap, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

/**
 * Benefits Component
 * Showcases quantifiable business advantages using high-impact metric cards,
 * brand color gradients, Lucide icons, and Framer Motion scroll animations.
 */
const Benefits = () => {
  const benefits = [
    {
      icon: ShieldAlert,
      title: 'Reduce Stock Errors',
      stat: '99.4%',
      statLabel: 'Accuracy Rate',
      description: 'Eliminate manual entry mistakes and stock discrepancies with real-time barcode syncing and automated inventory updates.',
      iconBg: 'bg-rose-50 text-rose-600',
      borderHover: 'hover:border-rose-500/40',
      badgeColor: 'bg-rose-100/80 text-rose-700',
    },
    {
      icon: Clock,
      title: 'Save Time',
      stat: '15+ hrs',
      statLabel: 'Saved Per Week',
      description: 'Automate tedious purchase orders, supplier follow-ups, and stock counts so your team can focus on core growth.',
      iconBg: 'bg-blue-50 text-blue-600',
      borderHover: 'hover:border-blue-500/40',
      badgeColor: 'bg-blue-100/80 text-blue-700',
    },
    {
      icon: TrendingUp,
      title: 'Increase Revenue',
      stat: '+28%',
      statLabel: 'Average Sales Lift',
      description: 'Capitalize on high-demand inventory, prevent stockouts during peak seasons, and maximize fulfillment velocity.',
      iconBg: 'bg-emerald-50 text-emerald-600',
      borderHover: 'hover:border-emerald-500/40',
      badgeColor: 'bg-emerald-100/80 text-emerald-700',
    },
    {
      icon: BrainCircuit,
      title: 'Better Decisions',
      stat: '3.5x',
      statLabel: 'Faster Reporting',
      description: 'Empower leadership with predictive forecasting and cost-analysis dashboards to make confident business moves.',
      iconBg: 'bg-indigo-50 text-indigo-600',
      borderHover: 'hover:border-indigo-500/40',
      badgeColor: 'bg-indigo-100/80 text-indigo-700',
    },
    {
      icon: Zap,
      title: 'Real-Time Insights',
      stat: '< 1 sec',
      statLabel: 'Data Sync Latency',
      description: 'Instant notification triggers for low stock thresholds, pending approvals, and multi-channel sales movements.',
      iconBg: 'bg-amber-50 text-amber-600',
      borderHover: 'hover:border-amber-500/40',
      badgeColor: 'bg-amber-100/80 text-amber-700',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50/60 relative overflow-hidden">
      {/* Background Decorator */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-semibold uppercase tracking-wide">
            Quantifiable Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Proven outcomes that drive <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              bottom-line growth
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            See how Stocklytics transforms operational efficiency, eliminates wasteful carrying costs, and powers high-margin scaling.
          </p>
        </div>

        {/* Layout: Featured Large Card + Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          
          {benefits.map((item, index) => {
            const Icon = item.icon;
            // Highlight the revenue increase card as prominent span on large viewports if desired
            const isFeatured = index === 2;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden ${item.borderHover} ${
                  isFeatured ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-b from-white via-white to-emerald-50/20' : ''
                }`}
              >
                <div className="space-y-6">
                  {/* Top Bar: Icon & Metric Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.badgeColor} flex items-center gap-1`}>
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Metric
                    </span>
                  </div>

                  {/* Highlight Stat Display */}
                  <div className="pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                        {item.stat}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {item.statLabel}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 flex items-center gap-1.5">
                      {item.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Hover Border Glow Accent */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-600 transition-colors">
                  <span>Stocklytics Platform Impact</span>
                  <span className="font-semibold text-blue-600">Explore Feature &rarr;</span>
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Benefits;