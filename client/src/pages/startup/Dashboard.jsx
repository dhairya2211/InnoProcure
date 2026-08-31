import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";

export default function StartupDashboard() {
  const { currentUser, startups, applications, pilots, challenges } = useApp();

  const startup = startups.find((s) => s.userId === currentUser.id) || startups[0];
  const myApps = applications.filter((a) => a.startupId === startup.id);
  const myPilots = pilots.filter((p) => p.startupId === startup.id);

  return (
    <DashboardLayout role="startup">
      <div className="space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Startup Founder Portal</h1>
              <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs px-3 py-1 rounded-full uppercase">
                DPIIT Reg: {startup.dpiitNumber}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Discover public sector procurement challenges, track proposal lifecycles, submit milestone evidence, and view payment releases.
            </p>
          </div>

          <Link
            to="/startup/challenges"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center justify-center space-x-2 transition cursor-pointer shrink-0"
          >
            <span>🔍 Browse Open Challenges ({challenges.filter((c) => c.status === "OPEN").length})</span>
          </Link>
        </div>

        {/* Startup Overview Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-start sm:items-center space-x-5">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shrink-0">
              {startup.companyName.charAt(0)}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">{startup.companyName}</h2>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-800">
                  {startup.headquarters}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">{startup.shortDescription}</p>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(startup.capabilities || []).map((cap, i) => (
                  <span key={i} className="bg-slate-800 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-700">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/startup/profile"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 shrink-0 transition"
          >
            ✏️ Edit Startup Profile
          </Link>
        </div>

        {/* Application Status Lifecycle Tracker */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Submitted Proposal Lifecycles ({myApps.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Track real-time evaluation, shortlisting, and contract progression</p>
            </div>
          </div>

          <div className="space-y-6">
            {myApps.map((app) => {
              const stages = ["SUBMITTED", "UNDER EVALUATION", "SHORTLISTED", "PILOT EXECUTION", "COMPLETED"];
              const currentStageIndex =
                app.status === "SHORTLISTED"
                  ? 2
                  : app.status === "UNDER_EVALUATION"
                  ? 1
                  : app.status === "SUBMITTED"
                  ? 0
                  : app.status === "PILOT"
                  ? 3
                  : 4;

              return (
                <div key={app.id} className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-extrabold text-slate-900 text-base sm:text-lg block">{app.startupName}</span>
                      <span className="text-xs text-slate-500 font-medium block mt-0.5">
                        Submitted: {app.submissionDate} &nbsp;|&nbsp; Requested Budget: <strong className="text-slate-800">₹{app.requestedBudget}</strong>
                      </span>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>

                  {/* Lifecycle Progress Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                    {stages.map((stg, idx) => {
                      const isDone = idx <= currentStageIndex;
                      const isCurrent = idx === currentStageIndex;
                      return (
                        <div
                          key={stg}
                          className={`p-3 rounded-xl border text-center transition ${
                            isCurrent
                              ? "bg-emerald-600 text-white border-emerald-600 font-black shadow-md ring-2 ring-emerald-400/40"
                              : isDone
                              ? "bg-emerald-100 text-emerald-950 border-emerald-300 font-bold"
                              : "bg-white text-slate-400 border-slate-200 font-medium"
                          }`}
                        >
                          <span className="text-[11px] uppercase tracking-wider block">{stg}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Pilots & Milestone Deliverables */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Active Pilot Projects & Milestone Deliverables</h3>
              <p className="text-xs text-slate-500 mt-0.5">Submit evidence documents for evaluator verification and payment release</p>
            </div>

            <Link
              to="/startup/milestones"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl transition"
            >
              Submit Milestone Evidence →
            </Link>
          </div>

          <div className="p-6 space-y-6">
            {myPilots.map((pilot) => (
              <div key={pilot.id} className="border border-slate-200 rounded-2xl p-6 space-y-5 bg-white shadow-xs">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">{pilot.challengeTitle}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Contracting Dept: {pilot.department}</p>
                  </div>
                  <StatusBadge status={pilot.status} />
                </div>

                {/* Milestones Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(pilot.milestones || []).map((ms, i) => (
                    <div key={ms.id || i} className="p-4 bg-slate-50/90 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="font-bold text-slate-900 text-xs block leading-snug">{ms.title}</span>
                        <span className="font-extrabold text-emerald-700 text-sm block mt-1">Value: ₹{ms.amount}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                        <StatusBadge status={ms.status} />
                        <StatusBadge status={ms.paymentStatus} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <Link
                    to={`/startup/milestones?pilotId=${pilot.id}`}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-md"
                  >
                    Submit Milestone Evidence Document →
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}