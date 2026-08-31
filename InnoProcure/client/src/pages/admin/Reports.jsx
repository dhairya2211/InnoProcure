import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";

export default function Reports() {
  const { challenges } = useApp();

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-slate-900">Procurement & Innovation Analytics</h1>
          <p className="text-xs text-slate-500">
            Lightweight aggregate analytics for public sector innovation outcomes and budget disbursement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase">Avg Rubric Score</span>
            <h2 className="text-3xl font-extrabold text-purple-700 mt-1">92 / 100</h2>
            <p className="text-[11px] text-slate-400 mt-1">Across scored proposals</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase">Milestone Verification Rate</span>
            <h2 className="text-3xl font-extrabold text-emerald-700 mt-1">100%</h2>
            <p className="text-[11px] text-slate-400 mt-1">Physical audit compliance</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase">GFR Scale-Up Ratio</span>
            <h2 className="text-3xl font-extrabold text-blue-700 mt-1">100%</h2>
            <p className="text-[11px] text-slate-400 mt-1">Direct post-pilot expansion</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}