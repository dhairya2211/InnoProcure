import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function Settings() {
  return (
    <DashboardLayout role="admin">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-slate-900">Platform Configuration</h1>
          <p className="text-xs text-slate-500">
            System settings, GFR 2017 innovation compliance rules, and mock integration toggles.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h4 className="font-bold text-slate-900">GFR Rule 194 Innovation Exemption</h4>
              <p className="text-slate-500">Allows direct scale-up procurement post successful pilot target verification.</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">ACTIVE</span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h4 className="font-bold text-slate-900">Mock GeM & PFMS Badge Sync</h4>
              <p className="text-slate-500">Displays mock integration badges for GeM e-Marketplace and PFMS treasury.</p>
            </div>
            <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">ENABLED</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}