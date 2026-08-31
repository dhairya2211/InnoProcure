import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import { useSearchParams } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";

export default function VerifyMilestones() {
  const { pilots, verifyMilestone, releasePayment } = useApp();
  const [searchParams] = useSearchParams();

  const pilotId = searchParams.get("pilotId") || pilots[0]?.id || "pilot_1";
  const pilot = pilots.find((p) => p.id === pilotId) || pilots[0];

  const [selectedMilestone, setSelectedMilestone] = useState(pilot?.milestones[0]);
  const [comments, setComments] = useState("Physical inspection verified on site. Acoustic data sensors accurately transmitting telemetry.");

  const handleVerify = (isApproved) => {
    if (!selectedMilestone) return;
    verifyMilestone(pilot.id, selectedMilestone.id, isApproved, comments);
    alert(`Milestone marked as ${isApproved ? "VERIFIED" : "INCOMPLETE"}`);
  };

  const handleReleasePayment = (msId) => {
    releasePayment(pilot.id, msId);
    alert("Payment status updated to RELEASED!");
  };

  return (
    <DashboardLayout role="evaluator">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Milestone Verification & Audit</h1>
            <p className="text-xs text-slate-500">
              Audit submitted startup evidence, approve deliverables, and authorize milestone payment release.
            </p>
          </div>
          <StatusBadge status={pilot?.status} />
        </div>

        {/* Pilot Banner */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Active Pilot Audit
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-1">{pilot?.challengeTitle}</h2>
            <p className="text-xs text-slate-500">
              Startup: <strong className="text-slate-800">{pilot?.startupName}</strong> | Department: {pilot?.department}
            </p>
          </div>
          <div className="text-right text-xs">
            <span className="text-slate-500 block">Total Contract Budget:</span>
            <span className="font-extrabold text-emerald-700 text-sm">₹{pilot?.totalBudget}</span>
          </div>
        </div>

        {/* Milestones List & Inspector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Milestones Navigation List */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b pb-2">
              Contract Milestones
            </h3>
            
            <div className="space-y-2">
              {(pilot?.milestones || []).map((ms, idx) => {
                const isSelected = selectedMilestone?.id === ms.id;
                return (
                  <button
                    key={ms.id}
                    onClick={() => {
                      setSelectedMilestone(ms);
                      setComments(ms.verificationComments || "Physical inspection verified on site.");
                    }}
                    className={`w-full p-3 rounded-lg border text-left transition ${
                      isSelected
                        ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/30"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>M{idx + 1}: ₹{ms.amount}</span>
                      <StatusBadge status={ms.status} />
                    </div>
                    <p className="text-xs text-slate-700 mt-1 truncate">{ms.title}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">Due: {ms.dueDate}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Milestone Inspector Panel */}
          {selectedMilestone && (
            <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              
              <div className="border-b pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedMilestone.title}</h3>
                  <p className="text-xs text-slate-500">{selectedMilestone.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 block">Value: ₹{selectedMilestone.amount}</span>
                  <StatusBadge status={selectedMilestone.status} />
                </div>
              </div>

              {/* Evidence Section */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-indigo-700">
                  📁 Submitted Startup Evidence & Telemetry
                </h4>

                {selectedMilestone.evidenceUrl ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white p-2.5 rounded border border-slate-200">
                      <span className="font-semibold text-slate-800">📄 {selectedMilestone.evidenceUrl}</span>
                      <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-200">
                        Uploaded {selectedMilestone.submittedDate}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block font-semibold">Startup Evidence Notes:</span>
                      <p className="text-slate-800 italic bg-white p-2.5 rounded border border-slate-200 mt-1">
                        "{selectedMilestone.evidenceNotes}"
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-slate-400 italic bg-white rounded border">
                    No milestone evidence submitted yet by startup.
                  </div>
                )}
              </div>

              {/* Evaluator Verification Action Form */}
              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Evaluator Verification Decision & Remarks
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Audit Notes & Inspection Comments *
                  </label>
                  <textarea
                    rows={3}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleVerify(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition shadow-xs"
                    >
                      ✅ Mark VERIFIED (Complete)
                    </button>

                    <button
                      type="button"
                      onClick={() => handleVerify(false)}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition shadow-xs"
                    >
                      ❌ Mark INCOMPLETE
                    </button>
                  </div>

                  {/* Payment Release Button */}
                  {selectedMilestone.status === "VERIFIED" && (
                    <div>
                      {selectedMilestone.paymentStatus === "RELEASED" ? (
                        <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs px-3 py-2 rounded-lg inline-block">
                          💰 Payment RELEASED (₹{selectedMilestone.amount})
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleReleasePayment(selectedMilestone.id)}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-lg text-xs shadow-xs transition animate-pulse"
                        >
                          💳 Release Milestone Payment (₹{selectedMilestone.amount})
                        </button>
                      )}
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}