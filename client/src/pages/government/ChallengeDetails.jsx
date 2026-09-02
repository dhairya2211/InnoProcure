import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import { useSearchParams, Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";
import PilotAgreementModal from "../../components/PilotAgreementModal";
import { challengeService } from "../../services/challengeService";

export default function ChallengeDetails() {
  const {
    applications,
    pilots,
    startups,
  } = useApp();

  const [searchParams] = useSearchParams();

  const challengeId = searchParams.get("id");

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [agreementModalOpen, setAgreementModalOpen] =
    useState(false);

  // =========================================================
  // Fetch selected challenge from backend
  // API #5: GET /api/challenges/:id
  // =========================================================

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!challengeId) {
        setError("Challenge ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data =
          await challengeService.getChallengeById(
            challengeId
          );

        setChallenge(data);
      } catch (err) {
        console.error(
          "Failed to fetch challenge:",
          err
        );

        setError(
          err.message ||
            "Failed to load challenge."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  // =========================================================
  // Loading state
  // =========================================================

  if (loading) {
    return (
      <DashboardLayout role="government">
        <div className="p-6 text-sm text-slate-500">
          Loading challenge...
        </div>
      </DashboardLayout>
    );
  }

  // =========================================================
  // Error state
  // =========================================================

  if (error || !challenge) {
    return (
      <DashboardLayout role="government">
        <div className="p-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error || "Challenge not found."}
          </div>

          <Link
            to="/admin/challenges"
            className="inline-block mt-4 text-xs font-semibold text-blue-600 hover:underline"
          >
            ← Back to Challenge Registry
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // =========================================================
  // Challenge-related applications
  // =========================================================

  const challengeApps = applications.filter(
    (app) =>
      String(app.challengeId) ===
      String(challenge._id || challenge.id)
  );

  // =========================================================
  // Active pilot
  // =========================================================

  const activePilot = pilots.find(
    (pilot) =>
      String(pilot.challengeId) ===
      String(challenge._id || challenge.id)
  );

  // =========================================================
  // Render
  // =========================================================

  return (
    <DashboardLayout role="government">
      <div className="space-y-6">

        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <Link
              to="/government/dashboard"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              ← Back to Government Dashboard
            </Link>

            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              {challenge.title}
            </h1>

            <p className="text-xs text-slate-500">
              {challenge.department} | Category:{" "}
              {challenge.category}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <StatusBadge
              status={challenge.status}
            />

            {activePilot && (
              <button
                onClick={() =>
                  setAgreementModalOpen(true)
                }
                className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-semibold shadow-xs"
              >
                📜 View Executed Pilot Contract
              </button>
            )}
          </div>
        </div>

        {/* Challenge Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Main Info */}
          <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Public Problem Statement
              </h3>

              <p className="text-sm text-slate-800 mt-1 leading-relaxed">
                {challenge.problemStatement}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Measurable Outcome Target
              </h3>

              <p className="text-sm font-semibold text-slate-900 mt-1 bg-amber-50 p-3 rounded-lg border border-amber-200">
                🎯 {challenge.measurableOutcomeTarget}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t text-xs">

              <div>
                <span className="text-slate-500 block">
                  Required Capabilities
                </span>

                <div className="flex flex-wrap gap-1 mt-1">
                  {(
                    challenge.requiredCapabilities ||
                    []
                  ).map((capability, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[11px]"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-500 block">
                  Security & Data Sensitivity
                </span>

                <span className="font-bold text-slate-900 mt-1 inline-block bg-slate-100 px-2 py-0.5 rounded">
                  {challenge.dataSensitivity ||
                    "LOW"}{" "}
                  SENSITIVITY
                </span>
              </div>

            </div>
          </div>

          {/* Financial & Timeline Metadata */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">

            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">
              Procurement Parameters
            </h3>

            <div className="space-y-3 text-xs">

              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">
                  Approved Pilot Budget:
                </span>

                <span className="font-bold text-emerald-700 text-sm">
                  ₹
                  {Number(
                    challenge.budget || 0
                  ).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">
                  Pilot Duration:
                </span>

                <span className="font-bold text-slate-800">
                  {challenge.timelineDays} Days
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">
                  Application Deadline:
                </span>

                <span className="font-bold text-slate-800">
                  {challenge.applicationDeadline
                    ? new Date(
                        challenge.applicationDeadline
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : "Not specified"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Proposals Received:
                </span>

                <span className="font-bold text-blue-700">
                  {challengeApps.length} Submitted
                </span>
              </div>

            </div>

            {challenge.status ===
              "PILOT_IN_PROGRESS" && (
              <div className="pt-2 border-t">
                <Link
                  to={`/government/final-decision?pilotId=${
                    activePilot?.id ||
                    "pilot_1"
                  }`}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-3 rounded text-xs flex items-center justify-center space-x-1 transition shadow-xs"
                >
                  <span>
                    ⚖️ Make Final Go/No-Go Decision
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Startup Applicants & Evaluations Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">

          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">

            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Submitted Startup Proposals
              </h3>

              <p className="text-xs text-slate-500">
                Review evaluator scores, proposal details,
                and pilot shortlist
              </p>
            </div>

            <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
              {challengeApps.length} Applicants
            </span>

          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">

              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b">
                <tr>
                  <th className="p-3">
                    Startup Name
                  </th>

                  <th className="p-3">
                    Proposed Solution
                  </th>

                  <th className="p-3">
                    Requested Budget
                  </th>

                  <th className="p-3">
                    Evaluator Score
                  </th>

                  <th className="p-3">
                    Application Status
                  </th>

                  <th className="p-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">

                {challengeApps.map((app) => (
                  <tr
                    key={app._id || app.id}
                    className="hover:bg-slate-50 transition"
                  >

                    <td className="p-3 font-bold text-slate-900">
                      {app.startupName ||
                        app.startup?.companyName ||
                        "Startup"}

                      <span className="block text-[10px] text-slate-400 font-normal">
                        Submitted:{" "}
                        {app.submissionDate ||
                          app.createdAt ||
                          "N/A"}
                      </span>
                    </td>

                    <td className="p-3 max-w-xs text-slate-700">
                      <p className="truncate font-medium">
                        {app.proposedSolution}
                      </p>
                    </td>

                    <td className="p-3 font-semibold text-slate-900">
                      ₹
                      {Number(
                        String(
                          app.requestedBudget || 0
                        ).replace(/,/g, "")
                      ).toLocaleString("en-IN")}
                    </td>

                    <td className="p-3">
                      {app.score !== null &&
                      app.score !== undefined ? (
                        <span className="bg-purple-100 text-purple-900 font-extrabold px-2.5 py-1 rounded border border-purple-200 text-xs">
                          ⭐ {app.score} / 100
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">
                          Pending Score
                        </span>
                      )}
                    </td>

                    <td className="p-3">
                      <StatusBadge
                        status={app.status}
                      />
                    </td>

                    <td className="p-3 text-right space-x-2">
                      <Link
                        to="/evaluator/score"
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded"
                      >
                        Inspect Proposal
                      </Link>
                    </td>

                  </tr>
                ))}

                {challengeApps.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-6 text-center text-slate-400 italic"
                    >
                      No startup proposals submitted
                      yet for this challenge.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Pilot Agreement */}
        <PilotAgreementModal
          isOpen={agreementModalOpen}
          onClose={() =>
            setAgreementModalOpen(false)
          }
          pilot={activePilot}
          challenge={challenge}
          startup={startups[0]}
        />

      </div>
    </DashboardLayout>
  );
}