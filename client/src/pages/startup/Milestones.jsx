import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import { useSearchParams } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";

export default function Milestones() {
  const { pilots, currentUser, startups, submitMilestoneEvidence } = useApp();
  const [searchParams] = useSearchParams();

  const startup = startups.find((s) => s.userId === currentUser.id) || startups[0];
  const myPilots = pilots.filter((p) => p.startupId === startup.id);

  const pilotId = searchParams.get("pilotId") || myPilots[0]?.id || pilots[0]?.id;
  const activePilot = pilots.find((p) => p.id === pilotId) || pilots[0];

  const [selectedMs, setSelectedMs] = useState(activePilot?.milestones[0]);
  const [evidenceNotes, setEvidenceNotes] = useState(
    "Installed 50 clamp-on acoustic sensor nodes across Ward 42 feeder line. Transmitting telemetry over 4G mesh network. Baseline NRW loss confirmed at 38.2%."
  );
  const [fileName, setFileName] = useState("BWSSB_Ward42_Sensor_Telemetry_Audit.pdf");

  const handleSubmitEvidence = (e) => {
    e.preventDefault();
    if (!selectedMs) return;
    submitMilestoneEvidence(activePilot.id, selectedMs.id, evidenceNotes, fileName);
    alert("Milestone evidence submitted to Technical Evaluator!");
  };

  return (
    <DashboardLayout role="startup">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Pilot Milestone Evidence Submission</h1>
            <p className="text-xs text-slate-500">
              Submit proof of completion, telemetry logs, and documentation for evaluator verification and payment release.
            </p>
          </div>
          <StatusBadge status={activePilot?.status} />
        </div>

        {/* Pilot Overview */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
              Contract Pilot
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-1">{activePilot?.challengeTitle}</h2>
            <p className="text-xs text-slate-500">Department: {activePilot?.department}</p>
          </div>
          <div className="text-right text-xs">
            <span className="text-slate-500 block">Total Pilot Value:</span>
            <span className="font-extrabold text-emerald-700 text-sm">₹{activePilot?.totalBudget}</span>
          </div>
        </div>

        {/* Milestones & Evidence Modal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Milestones Select Sidebar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b pb-2">
              Deliverable Schedule
            </h3>

            <div className="space-y-2">
              {(activePilot?.milestones || []).map((ms, idx) => {
                const isSelected = selectedMs?.id === ms.id;
                return (
                  <button
                    key={ms.id}
                    onClick={() => {
                      setSelectedMs(ms);
                      setEvidenceNotes(ms.evidenceNotes || "Completed deployment deliverables.");
                      setFileName(ms.evidenceUrl || "Milestone_Evidence_Doc.pdf");
                    }}
                    className={`w-full p-3 rounded-lg border text-left transition ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/30"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>M{idx + 1}: ₹{ms.amount}</span>
                      <StatusBadge status={ms.status} />
                    </div>
                    <p className="text-xs text-slate-700 mt-1 truncate">{ms.title}</p>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Due: {ms.dueDate}</span>
                      <StatusBadge status={ms.paymentStatus} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evidence Submission Form Panel */}
          {selectedMs && (
            <form onSubmit={handleSubmitEvidence} className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="border-b pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedMs.title}</h3>
                  <p className="text-xs text-slate-500">{selectedMs.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 block">Value: ₹{selectedMs.amount}</span>
                  <StatusBadge status={selectedMs.status} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Deliverable Summary & Execution Notes *
                </label>
                <textarea
                  rows={4}
                  required
                  value={evidenceNotes}
                  onChange={(e) => setEvidenceNotes(e.target.value)}
                  placeholder="Summarize installation, field test metrics, or telemetry confirmation..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Evidence File Attachment (PDF / Audit Log) *
                </label>
                <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-lg border border-slate-300 text-xs">
                  <span className="text-lg">📁</span>
                  <input
                    type="text"
                    required
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded px-2 py-1 text-xs"
                  />
                  <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-1 rounded text-[10px]">
                    Attached
                  </span>
                </div>
              </div>

              {/* Status Display */}
              <div className="p-3 bg-slate-50 rounded-lg border flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block">Verification Status:</span>
                  <StatusBadge status={selectedMs.status} />
                </div>

                <div>
                  <span className="text-slate-500 block">Payment Release Status:</span>
                  <StatusBadge status={selectedMs.paymentStatus} />
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow-md transition"
                >
                  🚀 Submit Evidence to Evaluator
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}