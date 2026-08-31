import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import { useSearchParams } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";
import PilotAgreementModal from "../../components/PilotAgreementModal";

export default function Shortlist() {
  const { challenges, applications, shortlistStartup, pilots, startups } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const challengeId = searchParams.get("challengeId") || challenges[0]?.id || "ch_1";
  const challenge = challenges.find((c) => c.id === challengeId) || challenges[0];

  const challengeApps = applications
    .filter((a) => a.challengeId === challenge.id)
    .sort((a, b) => (b.score || 0) - (a.score || 0)); // Sort highest score first

  const activePilot = pilots.find((p) => p.challengeId === challenge.id);
  const [agreementModalOpen, setAgreementModalOpen] = useState(false);

  const handleShortlist = (appId) => {
    shortlistStartup(appId);
    setAgreementModalOpen(true);
  };

  return (
    <DashboardLayout role="evaluator">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Ranked Proposal Shortlist</h1>
            <p className="text-xs text-slate-500">
              Review evaluator-scored proposals ranked by merit and authorize pilot contract execution.
            </p>
          </div>
          <StatusBadge status={challenge?.status} />
        </div>

        {/* Challenge Selection Banner */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Target Challenge
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-1">{challenge?.title}</h2>
            <p className="text-xs text-slate-500">{challenge?.department} | Budget: ₹{challenge?.budget}</p>
          </div>

          {activePilot && (
            <button
              onClick={() => setAgreementModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-xs"
            >
              📜 View Generated Pilot Agreement
            </button>
          )}
        </div>

        {/* Ranked Applicants Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Ranked Applicants by Rubric Score</h3>
            <span className="text-xs text-slate-500 font-medium">Sorted by Total Merit</span>
          </div>

          <div className="divide-y divide-slate-200">
            {challengeApps.map((app, index) => {
              const isShortlisted = app.status === "SHORTLISTED" || app.status === "PILOT";
              return (
                <div key={app.id} className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${isShortlisted ? "bg-purple-50/50" : "hover:bg-slate-50"}`}>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`h-9 w-9 rounded-full font-extrabold text-sm flex items-center justify-center border ${
                      index === 0 ? "bg-amber-400 text-slate-950 border-amber-500 shadow-xs" : "bg-slate-100 text-slate-700 border-slate-300"
                    }`}>
                      #{index + 1}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-base">{app.startupName}</span>
                        <StatusBadge status={app.status} />
                      </div>
                      <p className="text-xs text-slate-600 max-w-lg leading-snug">{app.proposedSolution}</p>
                      <span className="text-[11px] text-slate-400 block">Requested Budget: ₹{app.requestedBudget} | Timeline: {app.timelineDays} Days</span>
                      {app.evaluationComments && (
                        <p className="text-[11px] italic text-purple-900 bg-purple-50 p-2 rounded border border-purple-200 mt-2">
                          "Remarks: {app.evaluationComments}" — {app.scoredBy || "Evaluator"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className="bg-purple-100 text-purple-900 font-extrabold px-3 py-1.5 rounded-lg border border-purple-200 text-sm">
                      ⭐ {app.score || 0} / 100
                    </div>

                    {isShortlisted ? (
                      <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1">
                        <span>✅ Shortlisted & Contracted</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleShortlist(app.id)}
                        className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-xs"
                      >
                        Shortlist & Initiate Pilot →
                      </button>
                    )}
                  </div>

                </div>
              );
            })}

            {challengeApps.length === 0 && (
              <div className="p-8 text-center text-slate-400 italic">
                No applications submitted yet for this challenge.
              </div>
            )}
          </div>
        </div>

        {/* Modal for Pilot Agreement */}
        <PilotAgreementModal
          isOpen={agreementModalOpen}
          onClose={() => setAgreementModalOpen(false)}
          pilot={activePilot}
          challenge={challenge}
          startup={startups[0]}
        />

      </div>
    </DashboardLayout>
  );
}