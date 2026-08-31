import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";

export default function FinalDecision() {
  const { pilots, challenges, makeFinalDecision } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pilotId = searchParams.get("pilotId") || pilots[0]?.id || "pilot_1";
  const pilot = pilots.find((p) => p.id === pilotId) || pilots[0];
  const challenge = challenges.find((c) => c.id === pilot?.challengeId) || challenges[0];

  const [decision, setDecision] = useState("SCALED");
  const [comments, setComments] = useState(
    "Pilot successfully achieved 63% reduction in Non-Revenue Water loss across Ward 42 within 90 days. Recommended for state-level scale-up procurement across 14 additional municipal wards under GFR Rule 194 innovation guidelines."
  );
  const [scaledDepts, setScaledDepts] = useState("BWSSB Ward 43-56, Mysuru Urban Water Supply Board, Hubballi-Dharwad Municipal Corporation");

  const verifiedMilestonesCount = (pilot?.milestones || []).filter((m) => m.status === "VERIFIED").length;
  const totalMilestonesCount = (pilot?.milestones || []).length;

  const handleSubmitDecision = (e) => {
    e.preventDefault();
    makeFinalDecision(
      pilot.id,
      decision,
      comments,
      scaledDepts.split(",").map((s) => s.trim())
    );
    navigate("/government/dashboard");
  };

  return (
    <DashboardLayout role="government">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <Link to="/government/dashboard" className="text-xs font-semibold text-blue-600 hover:underline">
              ← Back to Government Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Final Procurement Go / No-Go Decision
            </h1>
            <p className="text-xs text-slate-500">
              Review verified pilot outcomes, budget utilization, and authorize scale-up expansion or rejection.
            </p>
          </div>

          <StatusBadge status={pilot?.status || "IN_PROGRESS"} />
        </div>

        {/* Audit Outcome Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Target vs Achieved */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Promised vs Achieved Targets</h3>
            
            <div>
              <span className="text-[11px] text-slate-400 font-semibold block">Promised Outcome Target:</span>
              <p className="text-xs font-bold text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-200 mt-0.5">
                🎯 {challenge?.measurableOutcomeTarget || "Reduce NRW loss from 38% to under 15% within 90 days."}
              </p>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-semibold block">Achieved Outcome in Pilot:</span>
              <p className="text-xs font-bold text-emerald-900 bg-emerald-50 p-2.5 rounded border border-emerald-200 mt-0.5">
                ✅ Reduced NRW loss from 38.2% to 14.1% in Ward 42. Pinpointed 22 pipe ruptures with zero downtime.
              </p>
            </div>
          </div>

          {/* Milestone & Budget Summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Milestone Audit & Budget Spent</h3>
            
            <div className="flex items-center justify-between border-b pb-2 text-xs">
              <span className="text-slate-600">Startup Partner:</span>
              <span className="font-bold text-slate-900">{pilot?.startupName}</span>
            </div>

            <div className="flex items-center justify-between border-b pb-2 text-xs">
              <span className="text-slate-600">Milestones Verified:</span>
              <span className="font-bold text-emerald-700">{verifiedMilestonesCount} of {totalMilestonesCount} Milestones Verified</span>
            </div>

            <div className="flex items-center justify-between border-b pb-2 text-xs">
              <span className="text-slate-600">Approved Pilot Budget:</span>
              <span className="font-bold text-slate-900">₹{pilot?.totalBudget}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Evaluator Recommendation:</span>
              <span className="font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                RECOMMEND SCALE-UP
              </span>
            </div>
          </div>
        </div>

        {/* Verified Milestones Breakdown Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm">Pilot Milestone Execution Log</h3>
          </div>
          
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b">
              <tr>
                <th className="p-3">Milestone Deliverable</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Evidence Document</th>
                <th className="p-3">Verification Status</th>
                <th className="p-3">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {(pilot?.milestones || []).map((ms) => (
                <tr key={ms.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">{ms.title}</td>
                  <td className="p-3 font-bold text-slate-800">₹{ms.amount}</td>
                  <td className="p-3 text-blue-600 hover:underline">{ms.evidenceUrl || "No Evidence Uploaded"}</td>
                  <td className="p-3">
                    <StatusBadge status={ms.status} />
                  </td>
                  <td className="p-3">
                    <StatusBadge status={ms.paymentStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Decision Submission Form */}
        <form onSubmit={handleSubmitDecision} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2">
            Execute Final Procurement Determination
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setDecision("SCALED")}
              className={`p-4 rounded-xl border text-left transition flex items-start space-x-3 ${
                decision === "SCALED"
                  ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/30"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-bold text-emerald-900 text-sm">APPROVE & SCALE-UP</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Authorize direct scale-up procurement expansion across additional wards/departments without re-tendering.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDecision("REJECTED")}
              className={`p-4 rounded-xl border text-left transition flex items-start space-x-3 ${
                decision === "REJECTED"
                  ? "bg-rose-50 border-rose-500 ring-2 ring-rose-500/30"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <span className="text-2xl">❌</span>
              <div>
                <h4 className="font-bold text-rose-900 text-sm">REJECT PILOT</h4>
                <p className="text-xs text-rose-700 mt-0.5">
                  Reject solution due to unfulfilled targets or insufficient evidence. Conclude procurement lifecycle.
                </p>
              </div>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Government Officer Justification & Order Comments *
            </label>
            <textarea
              rows={4}
              required
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {decision === "SCALED" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Authorized Scale-Up Departments / Municipal Zones
              </label>
              <input
                type="text"
                value={scaledDepts}
                onChange={(e) => setScaledDepts(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg text-sm font-bold text-white shadow-md transition ${
                decision === "SCALED" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
              }`}
            >
              Submit Final Officer Order: {decision}
            </button>
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
}