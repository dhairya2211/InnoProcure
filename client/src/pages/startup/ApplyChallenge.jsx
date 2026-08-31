import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export default function ApplyChallenge() {
  const { challenges, submitApplication, currentUser, startups } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const challengeId = searchParams.get("challengeId") || challenges[0]?.id || "ch_1";
  const challenge = challenges.find((c) => c.id === challengeId) || challenges[0];
  const startup = startups.find((s) => s.userId === currentUser.id) || startups[0];

  const [formData, setFormData] = useState({
    challengeId: challenge.id,
    proposedSolution: "AquaGrid Guardian: Non-invasive clamp-on acoustic sensor mesh coupled with pressure transient machine learning analysis.",
    implementationApproach: "Phase 1: Deploy 50 clamp-on acoustic nodes across Ward feeder lines. Phase 2: Calibrate machine learning baseline model. Phase 3: Coordinate with municipal repair crews.",
    expectedOutcome: "Pinpoint subterranean pipe breaches within 5-meter resolution and reduce Non-Revenue Water loss from 38% to 14.5% within 90 days.",
    timelineDays: 90,
    requestedBudget: "42,50,000",
    relevantExperience: "Deployed acoustic mesh in Mysuru municipal distribution lines detecting 340+ leaks.",
    evidenceFileName: "AquaSensing_Technical_Proposal_BWSSB_v2.pdf",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    submitApplication(formData);
    alert("Proposal submitted successfully!");
    navigate("/startup/dashboard");
  };

  return (
    <DashboardLayout role="startup">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="border-b pb-4">
          <Link to="/startup/challenges" className="text-xs font-semibold text-emerald-700 hover:underline">
            ← Back to Challenge Registry
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Submit Innovation Proposal</h1>
          <p className="text-xs text-slate-500">
            Submit your solution approach, requested budget, and technical evidence for government evaluation.
          </p>
        </div>

        {/* Selected Challenge Context Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs space-y-1">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
            Target Procurement Challenge
          </span>
          <h3 className="font-bold text-emerald-950 text-sm">{challenge?.title}</h3>
          <p className="text-emerald-800">
            Department: <strong>{challenge?.department}</strong> | Budget Ceiling: <strong>₹{challenge?.budget}</strong>
          </p>
          <p className="text-emerald-900 font-semibold mt-1">
            Target Outcome: "{challenge?.measurableOutcomeTarget}"
          </p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmitProposal} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-sm font-bold text-slate-900">Applicant: {startup.companyName}</h3>
            <span className="text-xs text-slate-500">DPIIT Reg: {startup.dpiitNumber}</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Proposed Solution Overview *
            </label>
            <textarea
              name="proposedSolution"
              rows={3}
              required
              value={formData.proposedSolution}
              onChange={handleChange}
              placeholder="Describe your proprietary technology and core solution components..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Detailed Implementation & Deployment Approach *
            </label>
            <textarea
              name="implementationApproach"
              rows={4}
              required
              value={formData.implementationApproach}
              onChange={handleChange}
              placeholder="Detail phase 1, phase 2, hardware installation, and integration steps..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Expected Quantifiable Outcome & Metric Impact *
            </label>
            <textarea
              name="expectedOutcome"
              rows={2}
              required
              value={formData.expectedOutcome}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Requested Pilot Budget (₹) *
              </label>
              <input
                type="text"
                name="requestedBudget"
                required
                value={formData.requestedBudget}
                onChange={handleChange}
                placeholder="e.g. 42,50,000"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Implementation Timeline (Days) *
              </label>
              <input
                type="number"
                name="timelineDays"
                required
                value={formData.timelineDays}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Relevant Deployments & Past Experience *
            </label>
            <textarea
              name="relevantExperience"
              rows={2}
              required
              value={formData.relevantExperience}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Supporting Evidence Document Placeholder (PDF)
            </label>
            <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-lg border border-slate-300 text-xs">
              <span className="text-lg">📎</span>
              <input
                type="text"
                name="evidenceFileName"
                value={formData.evidenceFileName}
                onChange={handleChange}
                className="flex-1 bg-white border border-slate-200 rounded px-2 py-1 text-xs"
              />
              <span className="bg-slate-200 text-slate-700 font-bold px-2 py-1 rounded">Attached</span>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow-md transition"
            >
              🚀 Submit Formal Proposal for Evaluation
            </button>
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
}