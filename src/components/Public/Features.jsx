import React from 'react';
import { motion } from 'framer-motion';
import { 
  Boxes, 
  ShoppingBag, 
  TrendingUp, 
  BarChart3, 
  BellRing, 
  Users 
} from 'lucide-react';

/**
 * Features Component
 * Displays six core SaaS feature cards with subtle glassmorphism, 
 * brand color gradients, and hover animations.
 */
const Features = () => {
  const features = [
    {
      icon: Boxes,
      title: 'Inventory Tracking',
      description: 'Real-time visibility across all warehouses and channels. Monitor stock movements, locations, and batch tracking effortlessly.',
      iconBg: 'bg-blue-50 text-blue-600',
      borderHover: 'hover:border-blue-500/40',
      gradient: 'from-blue-500/10 to-transparent',
    },
    {
      icon: ShoppingBag,
      title: 'Purchase Management',
      description: 'Automate purchase orders, track reorder points, and streamline incoming shipments with intelligent workflow integrations.',
      iconBg: 'bg-emerald-50 text-emerald-600',
      borderHover: 'hover:border-emerald-500/40',
      gradient: 'from-emerald-500/10 to-transparent',
    },
    {
      icon: TrendingUp,
      title: 'Sales Management',
      description: 'Sync order fulfillment with active inventory. Track sales velocity, customer histories, and multi-channel revenue channels.',
      iconBg: 'bg-blue-50 text-blue-600',
      borderHover: 'hover:border-blue-500/40',
      gradient: 'from-blue-500/10 to-transparent',
    },
    {
      icon: BarChart3,
      title: 'Reports & Analytics',
      description: 'Gain actionable insights with automated reporting, demand forecasting, profit margin analysis, and custom KPI dashboards.',
      iconBg: 'bg-emerald-50 text-emerald-600',
      borderHover: 'hover:border-emerald-500/40',
      gradient: 'from-emerald-500/10 to-transparent',
    },
    {
      icon: BellRing,
      title: 'Low Stock Alerts',
      description: 'Never run out of high-demand items. Receive automated real-time notifications when inventory drops below safety thresholds.',
      iconBg: 'bg-amber-50 text-amber-600',
      borderHover: 'hover:border-amber-500/40',
      gradient: 'from-amber-500/10 to-transparent',
    },
    {
      icon: Users,
      title: 'Supplier Management',
      description: 'Maintain complete records of supplier contacts, pricing agreements, lead times, and vendor performance history.',
      iconBg: 'bg-indigo-50 text-indigo-600',
      borderHover: 'hover:border-indigo-500/40',
      gradient: 'from-indigo-500/10 to-transparent',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50/50 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/60 text-blue-700 text-xs font-semibold tracking-wide uppercase">
            Powerful Capability
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything you need to <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              scale your operations
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Eliminate inventory errors and simplify complex supply chain operations with modern, intelligent automation tools.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden ${feature.borderHover}`}
              >
                {/* Subtle Hover Gradient Accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10 space-y-5">
                  {/* Icon Container */}
                  <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;