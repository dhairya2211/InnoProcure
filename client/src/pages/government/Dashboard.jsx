import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/StatusBadge";

export default function GovernmentDashboard() {
  const { challenges, pilots, applications, activities } = useApp();

  const totalChallenges = challenges.length;
  const openChallenges = challenges.filter((c) => c.status === "OPEN").length;
  const activePilotsCount = pilots.filter((p) => p.status === "IN_PROGRESS").length;
  const totalBudget = challenges.reduce((acc, curr) => acc + (parseFloat(curr.budget.replace(/,/g, "")) || 0), 0);

  return (
    <DashboardLayout role="government">
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-3 flex-wrap gap-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Government Officer Portal</h1>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs px-3 py-1 rounded-full uppercase">
                Demand & Procurement
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Identify public sector problems, define outcome metrics, launch procurement challenges, and manage pilot results.
            </p>
          </div>

          <Link
            to="/government/create-challenge"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center justify-center space-x-2 transition cursor-pointer shrink-0"
          >
            <span>➕ Create New Challenge</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Challenges</p>
              <h2 className="text-3xl font-black text-slate-900 mt-1">{totalChallenges}</h2>
              <span className="text-xs text-blue-600 font-bold block mt-1">{openChallenges} Open for Proposals</span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold shrink-0">
              📋
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Proposals Received</p>
              <h2 className="text-3xl font-black text-slate-900 mt-1">{applications.length}</h2>
              <span className="text-xs text-amber-600 font-bold block mt-1">Across active challenges</span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl font-bold shrink-0">
              📩
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Pilots</p>
              <h2 className="text-3xl font-black text-slate-900 mt-1">{activePilotsCount}</h2>
              <span className="text-xs text-cyan-600 font-bold block mt-1">Milestone tracking live</span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-2xl font-bold shrink-0">
              🎯
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Budget Allocation</p>
              <h2 className="text-3xl font-black text-slate-900 mt-1">₹{(totalBudget / 100000).toFixed(1)} L</h2>
              <span className="text-xs text-emerald-600 font-bold block mt-1">GFR 2017 Innovation Pool</span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl font-bold shrink-0">
              💰
            </div>
          </div>
        </div>

        {/* Active Challenges Registry Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Procurement Challenges Registry</h3>
              <p className="text-xs text-slate-500 mt-0.5">Manage challenges, applicant rankings, and final decisions</p>
            </div>
            <span className="text-xs font-bold bg-slate-200 text-slate-800 px-3 py-1 rounded-full">
              {challenges.length} Challenges
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/80 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4">Challenge & Department</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Budget (₹)</th>
                  <th className="p-4">Applicants</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {challenges.map((ch) => (
                  <tr key={ch.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 max-w-sm">
                      <Link to={`/government/challenge-details?id=${ch.id}`} className="font-bold text-blue-700 hover:underline block text-sm">
                        {ch.title}
                      </Link>
                      <span className="text-slate-500 text-xs font-medium block mt-0.5">{ch.department}</span>
                    </td>
                    <td className="p-4 text-slate-700 font-semibold text-xs">{ch.category}</td>
                    <td className="p-4 font-extrabold text-slate-900 text-sm">₹{ch.budget}</td>
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-lg border border-slate-200 text-xs">
                        {ch.applicationsCount} proposals
                      </span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={ch.status} />
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        to={`/government/challenge-details?id=${ch.id}`}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition inline-block text-xs"
                      >
                        Inspect Details
                      </Link>
                      {ch.status === "PILOT_IN_PROGRESS" && (
                        <Link
                          to={`/government/final-decision?pilotId=pilot_1`}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition inline-block text-xs"
                        >
                          Go/No-Go Decision
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-Time Audit Trail */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span>📜 Real-Time Audit & Transparency Stream</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-0.5 rounded-full font-bold">Public Audit</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Auto-logged system events</span>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-start space-x-3 text-xs border-b border-slate-100 pb-3 last:border-0">
                <span className="bg-slate-100 text-slate-700 font-mono font-bold px-2 py-1 rounded text-[10px] shrink-0 mt-0.5">
                  {act.timestamp}
                </span>
                <div className="flex-1">
                  <span className="font-bold text-slate-900">{act.actor} ({act.role})</span>
                  <p className="text-slate-600 font-medium mt-0.5">{act.details}</p>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0">
                  {act.action}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}