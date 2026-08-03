import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Sparkles, Building2, ArrowRight } from 'lucide-react';

/**
 * Pricing Component
 * Features a Monthly/Yearly billing toggle with a discount badge,
 * three tiered pricing cards with a highlighted Professional plan,
 * feature checklists, modern shadows, and responsive layouts.
 */
const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: 'Starter',
      badge: 'For Small Businesses',
      description: 'Essential tools for small teams looking to digitize stock and sales workflows.',
      priceMonthly: 29,
      priceYearly: 24,
      icon: Zap,
      popular: false,
      buttonText: 'Start 14-Day Free Trial',
      buttonVariant: 'secondary',
      features: [
        'Up to 1,000 SKUs',
        '2 Team Members',
        'Single Warehouse Support',
        'Basic Inventory Tracking',
        'Purchase & Sales Orders',
        'Standard Email Support',
      ],
    },
    {
      name: 'Professional',
      badge: 'Most Popular',
      description: 'Advanced intelligence, forecasting, and multi-channel sync for growing brands.',
      priceMonthly: 89,
      priceYearly: 69,
      icon: Sparkles,
      popular: true,
      buttonText: 'Get Started Today',
      buttonVariant: 'primary',
      features: [
        'Up to 25,000 SKUs',
        '10 Team Members',
        'Multi-Warehouse (Up to 5)',
        'AI Demand Forecasting',
        'Real-time Channel Sync',
        'Low Stock Alerts & Automation',
        'Custom Analytics & Reports',
        'Priority 24/7 Support',
      ],
    },
    {
      name: 'Enterprise',
      badge: 'For Scale & Retailers',
      description: 'Custom infrastructure, dedicated account management, and tailored API access.',
      priceMonthly: 249,
      priceYearly: 199,
      icon: Building2,
      popular: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary',
      features: [
        'Unlimited SKUs',
        'Unlimited Team Members',
        'Unlimited Warehouses',
        'Custom API & Webhooks',
        'Dedicated Account Manager',
        'Custom ERP Integrations',
        'SLA & 99.99% Uptime Guarantee',
        'Onboarding & Training',
      ],
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-semibold uppercase tracking-wide">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Predictable plans for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              businesses of every size
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            No hidden fees. Upgrade, downgrade, or cancel your subscription at any time.
          </p>
        </div>

        {/* Billing Toggle (Monthly / Yearly) */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-semibold transition-colors ${!isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
            Monthly Billing
          </span>
          
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-8 bg-slate-200 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Toggle billing frequency"
          >
            <motion.div
              animate={{ x: isYearly ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-6 h-6 rounded-full bg-blue-600 shadow-md"
            />
          </button>

          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold transition-colors ${isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
              Annual Billing
            </span>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => {
            const PlanIcon = plan.icon;
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-slate-900 text-white shadow-2xl shadow-blue-900/20 border-2 border-blue-600 lg:-translate-y-2'
                    : 'bg-white text-slate-900 border border-slate-200/80 shadow-lg shadow-slate-100 hover:shadow-xl'
                }`}
              >
                {/* Popular Badge Overlay */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${plan.popular ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                        <PlanIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                    </div>
                  </div>

                  <p className={`text-xs sm:text-sm mb-6 ${plan.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>

                  {/* Pricing Display */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight">${price}</span>
                    <span className={`text-sm font-medium ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                      / month {isYearly && '(billed annually)'}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className={`h-px w-full mb-8 ${plan.popular ? 'bg-slate-800' : 'bg-slate-100'}`} />

                  {/* Feature Checklist */}
                  <div className="space-y-3.5 mb-8">
                    <p className={`text-xs font-bold uppercase tracking-wider ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                      Includes:
                    </p>
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <div className={`mt-0.5 p-0.5 rounded-full ${plan.popular ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className={`text-sm ${plan.popular ? 'text-slate-200' : 'text-slate-600'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call To Action Button */}
                <a
                  href="#"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5'
                      : 'bg-slate-900 hover:bg-slate-800 text-white hover:-translate-y-0.5'
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Pricing;