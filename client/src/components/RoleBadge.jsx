import React from "react";

export default function RoleBadge({ role }) {
  const getBadgeStyle = (r) => {
    switch (r?.toLowerCase()) {
      case "government":
        return "bg-slate-900 text-amber-400 border-slate-800 font-bold";
      case "evaluator":
        return "bg-purple-100 text-purple-800 border-purple-300 font-semibold";
      case "startup":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold";
      case "admin":
        return "bg-blue-100 text-blue-800 border-blue-300 font-semibold";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300 font-medium";
    }
  };

  const getLabel = (r) => {
    switch (r?.toLowerCase()) {
      case "government":
        return "Govt Officer";
      case "evaluator":
        return "Technical Evaluator";
      case "startup":
        return "Startup Founder";
      case "admin":
        return "System Admin";
      default:
        return r || "User";
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] border ${getBadgeStyle(role)} uppercase tracking-wider`}>
      {getLabel(role)}
    </span>
  );
}