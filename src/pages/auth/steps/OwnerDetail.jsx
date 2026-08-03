// import React from "react";
// import { User, Phone, Mail, IdCard } from "lucide-react";

// const OwnerDetails = ({ formData, setFormData, next, back }) => {

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const isValid =
//     formData.fullName &&
//     formData.email &&
//     formData.phone;

//   return (
//     <div className="animate-in fade-in slide-in-from-right-4 duration-500">

//       {/* Header */}
//       <header className="mb-6">
//         <h2 className="text-[28px] font-bold text-[#1E293B]">
//           Owner Details
//         </h2>
//         <p className="text-slate-400 text-sm mt-1">
//           Tell us about the business owner
//         </p>
//       </header>

//       <div className="space-y-4">

//         {/* Full Name */}
//         <div className="space-y-1.5">
//           <label className="text-[13px] font-bold text-slate-700 ml-1">
//             Full Name
//           </label>
//           <div className="relative group">
//             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName || ""}
//               onChange={handleChange}
//               placeholder="Enter owner's full name"
//               className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div className="space-y-1.5">
//           <label className="text-[13px] font-bold text-slate-700 ml-1">
//             Email Address
//           </label>
//           <div className="relative group">
//             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
//             <input
//               type="email"
//               name="email"
//               value={formData.email || ""}
//               onChange={handleChange}
//               placeholder="Enter email"
//               className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
//             />
//           </div>
//         </div>

//         {/* Phone */}
//         <div className="space-y-1.5">
//           <label className="text-[13px] font-bold text-slate-700 ml-1">
//             Phone Number
//           </label>
//           <div className="relative group">
//             <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone || ""}
//               onChange={handleChange}
//               placeholder="Enter phone number"
//               className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
//             />
//           </div>
//         </div>

//         {/* ID / Role */}
//         <div className="space-y-1.5">
//           <label className="text-[13px] font-bold text-slate-700 ml-1">
//             Role
//           </label>
//           <div className="relative group">
//             <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             <input
//               type="text"
//               value="Business Owner"
//               readOnly
//               className="w-full rounded-xl border border-slate-200 bg-slate-100 py-3 pl-11 pr-4 text-sm text-slate-500 cursor-not-allowed"
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-3 pt-4">
//           <button
//             onClick={back}
//             className="w-1/2 border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all"
//           >
//             Back
//           </button>

//           <button
//             onClick={next}
//             disabled={!isValid}
//             className={`w-1/2 font-bold py-3 rounded-xl transition-all ${
//               isValid
//                 ? "bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-lg shadow-emerald-200/50"
//                 : "bg-slate-200 text-slate-400 cursor-not-allowed"
//             }`}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerDetails;