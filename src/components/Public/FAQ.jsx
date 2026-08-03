import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

/**
 * FAQ Component
 * Interactive accordion covering key topics (Pricing, Inventory, Security, Support, Accounts).
 * Features smooth Framer Motion height transitions and subtle brand styling.
 */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: 'Pricing',
      question: 'Can I change my plan or cancel my subscription anytime?',
      answer: 'Yes, absolutely. You can upgrade, downgrade, or cancel your subscription at any time directly from your billing dashboard. If you cancel, your access remains active until the end of your current billing period.',
    },
    {
      category: 'Inventory',
      question: 'How does Stocklytics sync real-time stock across multiple sales channels?',
      answer: 'Stocklytics connects directly via APIs to platforms like Shopify, Amazon, WooCommerce, and QuickBooks. Whenever an item is sold on any channel or updated in a warehouse, stock levels automatically recalculate and sync across all connected endpoints in under a second.',
    },
    {
      category: 'Security',
      question: 'How secure is my business data on Stocklytics?',
      answer: 'Security is our highest priority. We utilize SOC 2 Type II compliant cloud infrastructure, end-to-end 256-bit AES data encryption at rest and in transit, automatic daily backups, and strict role-based access control (RBAC) options for your team.',
    },
    {
      category: 'Support',
      question: 'What kind of customer support is included with my subscription?',
      answer: 'All plans include 24/7 access to our comprehensive documentation and email support. Professional and Enterprise plans feature priority response times, live chat support, and dedicated onboarding specialists.',
    },
    {
      category: 'Accounts',
      question: 'How many team members can I add to my workspace?',
      answer: 'The Starter plan includes up to 2 team members, the Professional plan supports up to 10 team members, and the Enterprise plan offers unlimited team member seats with customizable permission controls.',
    },
    {
      category: 'Inventory',
      question: 'Can I import my existing product data from CSV or Excel files?',
      answer: 'Yes. Stocklytics features an intelligent CSV and Excel importer with field mapping assistance, allowing you to migrate thousands of SKUs, supplier records, and historical data in just a few clicks.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50/50 relative overflow-hidden">
      {/* Background Radial Blur Accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-semibold uppercase tracking-wide">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything you need to know about <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Stocklytics
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Have questions about features, pricing, or migration? We’ve got answers.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-blue-500/40 shadow-lg shadow-blue-500/5'
                    : 'bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wide">
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  
                  <div className={`p-1.5 rounded-full bg-slate-50 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-slate-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Animated Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Support Help Box */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Still have questions?</h4>
              <p className="text-sm text-slate-600">Can't find the answer you're looking for? Talk to our support team.</p>
            </div>
          </div>
          <a
            href="#"
            className="whitespace-nowrap px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
          >
            Get in Touch
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQ;