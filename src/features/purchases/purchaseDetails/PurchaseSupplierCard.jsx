import React from 'react';
import { 
  Building2, 
  UserCheck, 
  Phone, 
  Mail, 
  Briefcase 
} from 'lucide-react';

const PurchaseSupplierCard = ({ supplier = {} }) => {
  // Extract values with fallbacks
  const name = supplier.name || 'N/A';
  const type = supplier.type || 'Standard';
  const phone = supplier.phone || 'N/A';
  const email = supplier.email || 'N/A';
  const company = supplier.company || supplier.companyName || 'N/A';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      {/* Card Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 rounded-md text-indigo-600 dark:text-indigo-400">
          <Building2 className="w-4 h-4" />
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Supplier Information
        </h3>
      </div>

      {/* Info Grid */}
      <div className="space-y-3 text-xs">
        {/* Supplier Name */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Supplier Name</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {name}
          </span>
        </div>

        {/* Supplier Type */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Supplier Type</span>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {type}
          </span>
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Phone className="w-3.5 h-3.5" />
            <span>Phone</span>
          </div>
          <a 
            href={phone !== 'N/A' ? `tel:${phone}` : undefined}
            className={`font-medium ${phone !== 'N/A' ? 'text-indigo-600 dark:text-indigo-400 hover:underline' : 'text-slate-800 dark:text-slate-200'}`}
          >
            {phone}
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </div>
          <a 
            href={email !== 'N/A' ? `mailto:${email}` : undefined}
            className={`font-medium truncate max-w-[180px] sm:max-w-[220px] ${email !== 'N/A' ? 'text-indigo-600 dark:text-indigo-400 hover:underline' : 'text-slate-800 dark:text-slate-200'}`}
            title={email}
          >
            {email}
          </a>
        </div>

        {/* Company */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Building2 className="w-3.5 h-3.5" />
            <span>Company</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[180px] sm:max-w-[220px]">
            {company}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSupplierCard;