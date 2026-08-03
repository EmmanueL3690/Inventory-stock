import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Send,
  CheckCircle2,
} from "lucide-react";

import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";

/**
 * Footer Component
 * Professional SaaS footer featuring product links, company columns, 
 * social links, newsletter subscription form, and legal disclosures.
 */
const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const footerNavigation = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/#pricing' },
      { name: 'Integrations', href: '#' },
      { name: 'Changelog', href: '#' },
      { name: 'Roadmap', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Partners', href: '#' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Status', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Settings', href: '#' },
      { name: 'Security', href: '#' },
    ],
  };

  const socialLinks = [
  { name: "Twitter", icon: FaTwitter, href: "#" },
  { name: "LinkedIn", icon: FaLinkedin, href: "#" },
  { name: "GitHub", icon: FaGithub, href: "#" },
  { name: "YouTube", icon: FaYoutube, href: "#" },
];

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-500 flex items-center justify-center shadow-md shadow-blue-500/20">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Stocklytics
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
              Empowering fast-growing businesses with real-time inventory management, predictive forecasting, and automated workflows.
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-7 space-y-3 lg:pl-12">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-slate-400">
              Get product updates, inventory insights, and industry trends directly to your inbox.
            </p>

            {isSubscribed ? (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md">
                <label htmlFor="footer-email" className="sr-only">
                  Work email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 whitespace-nowrap"
                >
                  Subscribe
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Section: Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-slate-800">
          
          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5">
              {footerNavigation.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Stocklytics Inc. All rights reserved.</p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const SocialIcon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <SocialIcon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;