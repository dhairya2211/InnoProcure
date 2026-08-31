import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";

export default function EvaluatorDashboard() {
  const { challenges, applications, pilots } = useApp();

  const assignedChallenges = challenges;
  const pendingScoringApps = applications.filter((a) => a.score === null || a.status === "SUBMITTED" || a.status === "UNDER_EVALUATION");
  const pendingMilestones = pilots.flatMap((p) => p.milestones.filter((m) => m.status === "SUBMITTED"));

  return (
    <DashboardLayout role="evaluator">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-slate-900">Technical Evaluator Portal</h1>
              <span className="bg-purple-100 text-purple-900 border border-purple-300 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                Rubric Scoring & Pilot Audit
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Score startup proposals against fixed rubrics, shortlist top candidates, and verify submitted pilot milestone evidence.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Proposals Awaiting Scoring</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">{pendingScoringApps.length}</h2>
              <span className="text-[10px] text-purple-700 font-semibold">Requires 5-criteria rubric scoring</span>
            </div>
            <div className="h-11 w-11 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center text-xl font-bold">
              ⭐
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Milestones Awaiting Verification</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">{pendingMilestones.length}</h2>
              <span className="text-[10px] text-indigo-700 font-semibold">Evidence submitted by startups</span>
            </div>
            <div className="h-11 w-11 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center text-xl font-bold">
              ✔️
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Active Assigned Challenges</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">{assignedChallenges.length}</h2>
              <span className="text-[10px] text-blue-700 font-semibold">Domain: Water & Waste Management</span>
            </div>
            <div className="h-11 w-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-xl font-bold">
              📋
            </div>
          </div>
        </div>

        {/* Quick Action Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section 1: Proposals Awaiting Evaluation */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-purple-50/70 border-b border-purple-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-purple-950 text-sm">Startup Proposals Awaiting Scoring</h3>
                <p className="text-xs text-purple-700">Apply rubric scores (1-10) across 5 criteria</p>
              </div>
              <Link to="/evaluator/score" className="text-xs font-bold text-purple-800 hover:underline">
                View All →
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {applications.map((app) => (
                <div key={app.id} className="p-4 hover:bg-slate-50 transition flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">{app.startupName}</span>
                    <p className="text-xs text-slate-500 truncate max-w-xs">{app.proposedSolution}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">Requested: ₹{app.requestedBudget}</span>
                  </div>

                  <div className="text-right space-y-1">
                    {app.score !== null ? (
                      <span className="bg-purple-100 text-purple-900 font-extrabold text-xs px-2 py-0.5 rounded border border-purple-200 block">
                        ⭐ {app.score}/100
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-900 font-semibold text-[10px] px-2 py-0.5 rounded block">
                        Pending
                      </span>
                    )}

                    <Link
                      to={`/evaluator/score?appId=${app.id}`}
                      className="inline-block px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded text-xs transition"
                    >
                      {app.score !== null ? "Re-evaluate" : "Score Rubric"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Milestones Awaiting Verification */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-indigo-50/70 border-b border-indigo-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-indigo-950 text-sm">Milestone Evidence Audits</h3>
                <p className="text-xs text-indigo-700">Verify startup deliverables & release payment status</p>
              </div>
              <Link to="/evaluator/verify" className="text-xs font-bold text-indigo-800 hover:underline">
                View All →
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {pilots.flatMap((p) =>
                p.milestones.map((ms) => (
                  <div key={ms.id} className="p-4 hover:bg-slate-50 transition flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-xs block">{ms.title}</span>
                      <span className="text-[11px] text-slate-500 block">{p.startupName} (₹{ms.amount})</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <StatusBadge status={ms.status} />
                        <StatusBadge status={ms.paymentStatus} />
                      </div>
                    </div>

                    <Link
                      to={`/evaluator/verify?pilotId=${p.id}`}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded text-xs transition"
                    >
                      Verify Evidence
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}