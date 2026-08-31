import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";

export default function ChallengeManagement() {
  const { challenges } = useApp();

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-slate-900">National Challenge Registry Oversight</h1>
          <p className="text-xs text-slate-500">
            Admin oversight view of all government procurement challenges across ministries and municipal bodies.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm">All Registered Procurement Challenges</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b">
                <tr>
                  <th className="p-3">Title & Ministry</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {challenges.map((ch) => (
                  <tr key={ch.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block text-sm">{ch.title}</span>
                      <span className="text-slate-500 text-[11px]">{ch.department}</span>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{ch.category}</td>
                    <td className="p-3 font-bold text-emerald-700">₹{ch.budget}</td>
                    <td className="p-3">
                      <StatusBadge status={ch.status} />
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        to={`/government/challenge-details?id=${ch.id}`}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}