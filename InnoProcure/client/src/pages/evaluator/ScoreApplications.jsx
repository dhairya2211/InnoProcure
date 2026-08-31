import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";

export default function ScoreApplications() {
  const { applications, challenges, scoreApplication } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const appId = searchParams.get("appId") || applications[0]?.id || "app_1";
  const selectedApp = applications.find((a) => a.id === appId) || applications[0];
  const challenge = challenges.find((c) => c.id === selectedApp?.challengeId) || challenges[0];

  // Rubric Scores out of 20 each (Total 100)
  const [rubric, setRubric] = useState({
    problemUnderstanding: 18,
    techFeasibility: 19,
    expectedImpact: 19,
    capability: 18,
    valueForMoney: 18,
  });

  const [comments, setComments] = useState(
    "High acoustic precision and validated field trial in Mysuru. Clamp-on deployment avoids pipe cuts and downtime. Budget is reasonable."
  );

  const [noConflictCheck, setNoConflictCheck] = useState(true);

  const totalScore =
    Number(rubric.problemUnderstanding) +
    Number(rubric.techFeasibility) +
    Number(rubric.expectedImpact) +
    Number(rubric.capability) +
    Number(rubric.valueForMoney);

  const handleRubricChange = (field, val) => {
    setRubric((prev) => ({ ...prev, [field]: Math.min(20, Math.max(0, parseInt(val, 10) || 0)) }));
  };

  const handleSubmitScore = (e) => {
    e.preventDefault();
    if (!noConflictCheck) {
      alert("Please confirm the Conflict-of-Interest declaration before submitting score.");
      return;
    }
    scoreApplication(selectedApp.id, totalScore, comments);
    navigate(`/evaluator/shortlist?challengeId=${challenge.id}`);
  };

  return (
    <DashboardLayout role="evaluator">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Proposal Rubric Evaluation</h1>
            <p className="text-xs text-slate-500">
              Evaluate startup technical proposals against standardized public sector criteria.
            </p>
          </div>
          <StatusBadge status={selectedApp?.status} />
        </div>

        {/* Application Selector Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Proposal:</span>
          {applications.map((a) => {
            const isActive = a.id === selectedApp.id;
            return (
              <button
                key={a.id}
                onClick={() => navigate(`/evaluator/score?appId=${a.id}`)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{a.startupName}</span>
                {a.score !== null && <span className="bg-purple-900/40 text-purple-200 text-[10px] px-1.5 py-0.2 rounded">{a.score}</span>}
              </button>
            );
          })}
        </div>

        {/* Proposal Details Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Challenge: {challenge?.title}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">{selectedApp?.startupName}</h2>
            </div>
            <div className="text-right text-xs">
              <span className="text-slate-500 block">Requested Budget:</span>
              <span className="font-extrabold text-emerald-700 text-sm">₹{selectedApp?.requestedBudget}</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-800">
            <div>
              <h4 className="font-bold text-slate-900">Proposed Solution:</h4>
              <p className="bg-slate-50 p-2.5 rounded border border-slate-200 mt-0.5 text-slate-700">{selectedApp?.proposedSolution}</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900">Implementation Approach:</h4>
              <p className="bg-slate-50 p-2.5 rounded border border-slate-200 mt-0.5 text-slate-700">{selectedApp?.implementationApproach}</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900">Past Deployment & Relevant Experience:</h4>
              <p className="bg-slate-50 p-2.5 rounded border border-slate-200 mt-0.5 text-slate-700">{selectedApp?.relevantExperience}</p>
            </div>
          </div>
        </div>

        {/* Evaluation Scoring Form */}
        <form onSubmit={handleSubmitScore} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Standard 5-Criterion Evaluation Rubric</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500 font-medium">Total Evaluated Score:</span>
              <span className="text-xl font-extrabold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg border border-purple-200">
                {totalScore} / 100
              </span>
            </div>
          </div>

          {/* Rubric Criteria Grid */}
          <div className="space-y-4">
            
            {/* Criterion 1 */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="max-w-md">
                <h4 className="font-bold text-slate-900">1. Problem Understanding & Context Alignment (Max 20)</h4>
                <p className="text-slate-500 text-[11px]">Degree to which startup comprehends municipal operational constraints.</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={rubric.problemUnderstanding}
                  onChange={(e) => handleRubricChange("problemUnderstanding", e.target.value)}
                  className="w-16 bg-white border border-slate-300 rounded px-2 py-1 font-bold text-center text-sm focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-slate-400 font-semibold">/ 20</span>
              </div>
            </div>

            {/* Criterion 2 */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="max-w-md">
                <h4 className="font-bold text-slate-900">2. Technical Feasibility & Innovation Depth (Max 20)</h4>
                <p className="text-slate-500 text-[11px]">Rigor of technical architecture, sensor reliability, and algorithms.</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={rubric.techFeasibility}
                  onChange={(e) => handleRubricChange("techFeasibility", e.target.value)}
                  className="w-16 bg-white border border-slate-300 rounded px-2 py-1 font-bold text-center text-sm focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-slate-400 font-semibold">/ 20</span>
              </div>
            </div>

            {/* Criterion 3 */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="max-w-md">
                <h4 className="font-bold text-slate-900">3. Expected Public Impact & Target Deliverability (Max 20)</h4>
                <p className="text-slate-500 text-[11px]">Confidence in achieving the department's measurable metric target.</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={rubric.expectedImpact}
                  onChange={(e) => handleRubricChange("expectedImpact", e.target.value)}
                  className="w-16 bg-white border border-slate-300 rounded px-2 py-1 font-bold text-center text-sm focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-slate-400 font-semibold">/ 20</span>
              </div>
            </div>

            {/* Criterion 4 */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="max-w-md">
                <h4 className="font-bold text-slate-900">4. Implementation Capability & Track Record (Max 20)</h4>
                <p className="text-slate-500 text-[11px]">Past execution record in government or municipal environments.</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={rubric.capability}
                  onChange={(e) => handleRubricChange("capability", e.target.value)}
                  className="w-16 bg-white border border-slate-300 rounded px-2 py-1 font-bold text-center text-sm focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-slate-400 font-semibold">/ 20</span>
              </div>
            </div>

            {/* Criterion 5 */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="max-w-md">
                <h4 className="font-bold text-slate-900">5. Value for Money & Budget Efficiency (Max 20)</h4>
                <p className="text-slate-500 text-[11px]">Commercial cost justification relative to public budget ceiling.</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={rubric.valueForMoney}
                  onChange={(e) => handleRubricChange("valueForMoney", e.target.value)}
                  className="w-16 bg-white border border-slate-300 rounded px-2 py-1 font-bold text-center text-sm focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-slate-400 font-semibold">/ 20</span>
              </div>
            </div>

          </div>

          {/* Qualitative Comments */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Evaluator Technical Remarks & Recommendation *
            </label>
            <textarea
              rows={3}
              required
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Conflict of Interest Checkbox */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center space-x-3 text-xs text-amber-900">
            <input
              type="checkbox"
              id="coiCheck"
              checked={noConflictCheck}
              onChange={(e) => setNoConflictCheck(e.target.checked)}
              className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="coiCheck" className="font-semibold cursor-pointer">
              Integrity Sign-off: I declare that I have no financial interest, personal relationship, or conflict of interest with {selectedApp?.startupName}.
            </label>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow-md transition"
            >
              Submit Evaluation Score ({totalScore}/100) & Proceed to Shortlist →
            </button>
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
}