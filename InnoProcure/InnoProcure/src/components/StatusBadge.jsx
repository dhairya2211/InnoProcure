import React from "react";

export default function StatusBadge({ status }) {
  const getBadgeStyle = (st) => {
    switch (st) {
      case "OPEN":
        return "bg-blue-50 text-blue-700 border-blue-200 icon-dot bg-blue-500";
      case "DRAFT":
        return "bg-slate-100 text-slate-600 border-slate-200";
      case "IN_EVALUATION":
      case "UNDER_EVALUATION":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "SHORTLISTED":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "PILOT_IN_PROGRESS":
      case "IN_PROGRESS":
      case "PILOT":
        return "bg-cyan-50 text-cyan-800 border-cyan-200";
      case "SUBMITTED":
      case "UNDER_VERIFICATION":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "VERIFIED":
      case "RELEASED":
      case "SCALED":
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "REJECTED":
      case "INCOMPLETE":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const formatText = (st) => {
    if (!st) return "UNKNOWN";
    return st.replace(/_/g, " ");
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle(
        status
      )}`}
    >
      {formatText(status)}
    </span>
  );
}
