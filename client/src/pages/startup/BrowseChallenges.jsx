import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";

export default function BrowseChallenges() {
  const { challenges } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const filteredChallenges = challenges.filter((ch) => {
    const matchesSearch =
      ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.problemStatement.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "ALL" || ch.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout role="startup">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Government Innovation Challenges</h1>
            <p className="text-xs text-slate-500">
              Browse public sector problem statements, outcome specifications, and financial pilot grants.
            </p>
          </div>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
            {filteredChallenges.length} Challenges Available
          </span>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by title, department, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium focus:bg-white focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Smart Water & Sanitation">Smart Water & Sanitation</option>
              <option value="Waste Management & CleanTech">Waste Management & CleanTech</option>
              <option value="Healthcare & MedTech">Healthcare & MedTech</option>
            </select>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredChallenges.map((ch) => (
            <div key={ch.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {ch.department}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">{ch.title}</h2>
                </div>
                <StatusBadge status={ch.status} />
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div>
                  <span className="font-bold text-slate-900 block">Problem Statement:</span>
                  <p className="text-slate-600 line-clamp-2 mt-0.5">{ch.problemStatement}</p>
                </div>

                <div>
                  <span className="font-bold text-slate-900 block">Measurable Metric Target:</span>
                  <p className="bg-amber-50 text-amber-900 font-semibold p-2.5 rounded border border-amber-200 mt-0.5">
                    🎯 {ch.measurableOutcomeTarget}
                  </p>
                </div>
              </div>

              {/* Tags & Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-400 font-medium">Capabilities:</span>
                  {(ch.requiredCapabilities || []).map((cap, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[11px]">
                      {cap}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Budget Ceiling</span>
                    <span className="font-bold text-emerald-700 text-sm">₹{ch.budget}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[11px] block">Deadline</span>
                    <span className="font-bold text-slate-800">{ch.applicationDeadline}</span>
                  </div>

                  <Link
                    to={`/startup/apply?challengeId=${ch.id}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition shadow-xs"
                  >
                    Submit Proposal →
                  </Link>
                </div>
              </div>

            </div>
          ))}

          {filteredChallenges.length === 0 && (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-400 italic">
              No government challenges matched your query.
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}