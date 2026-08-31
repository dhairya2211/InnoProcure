import React from "react";
import { useApp } from "../../context/AppContext";
import { useParams, Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";
import Logo from "../../components/Logo";

export default function PublicChallengeView() {
  const { challenges, pilots } = useApp();
  const { id } = useParams();

  const challengeId = id || "ch_1";
  const challenge = challenges.find((c) => c.id === challengeId) || challenges[0];
  const pilot = pilots.find((p) => p.challengeId === challenge.id);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      {/* Public Portal Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Logo />
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            🌐 Public Transparency Portal
          </span>
        </div>

        <Link
          to="/login"
          className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded transition shadow-xs"
        >
          Authorized User Login →
        </Link>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        
        {/* Banner */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-xl space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                {challenge.department}
              </span>
              <h1 className="text-2xl font-bold text-white mt-1">{challenge.title}</h1>
            </div>
            <StatusBadge status={challenge.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div>
              <span className="text-slate-500 block uppercase tracking-wider font-semibold text-[10px]">Category</span>
              <span className="font-bold text-slate-200">{challenge.category}</span>
            </div>

            <div>
              <span className="text-slate-500 block uppercase tracking-wider font-semibold text-[10px]">Public Pilot Budget Commitment</span>
              <span className="font-bold text-emerald-400 text-sm">₹{challenge.budget}</span>
            </div>
          </div>
        </div>

        {/* Public Objective & Outcome Target */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-md space-y-4 text-xs text-slate-200">
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-700 pb-2">
              1. Public Problem & Objectives
            </h3>
            <p className="mt-2 text-slate-300 leading-relaxed">{challenge.problemStatement}</p>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-700 pb-2">
              2. Target Deliverable Metric
            </h3>
            <p className="mt-2 bg-amber-500/10 text-amber-300 p-3 rounded-lg border border-amber-500/20 font-semibold text-sm">
              🎯 {challenge.measurableOutcomeTarget}
            </p>
          </div>
        </div>

        {/* Pilot Execution & Milestone Transparency Timeline */}
        {pilot && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                3. Pilot Execution & Milestone Progress Audit
              </h3>
              <span className="text-xs text-emerald-400 font-bold">Live Progress Status</span>
            </div>

            <div className="space-y-3">
              {(pilot.milestones || []).map((ms, idx) => (
                <div key={ms.id || idx} className="p-3 bg-slate-900/80 rounded-lg border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-white block">Milestone {idx + 1}: {ms.title}</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">{ms.description}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <StatusBadge status={ms.status} />
                    <StatusBadge status={ms.paymentStatus} />
                  </div>
                </div>
              ))}
            </div>

            {pilot.finalDecision && (
              <div className="p-4 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                  Final Procurement Determination
                </span>
                <h4 className="text-base font-extrabold text-emerald-200">
                  Decision: {pilot.finalDecision.decision}
                </h4>
                <p className="text-emerald-300 italic">"{pilot.finalDecision.comments}"</p>
                <span className="text-slate-400 text-[10px] block">Authorized on {pilot.finalDecision.date} by {pilot.finalDecision.officerName}</span>
              </div>
            )}
          </div>
        )}

        {/* Transparency Disclaimer Footer */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-500 text-center space-y-1">
          <p>🔒 <strong>Public Transparency Guarantee:</strong> Proprietary startup IP, detailed technical proposals, and corporate bid amounts remain confidential under GFR 2017 Innovation Procurement Guidelines.</p>
          <p>Published by National Public Procurement Innovation Portal (InnoProcure)</p>
        </div>

      </main>
    </div>
  );
}
