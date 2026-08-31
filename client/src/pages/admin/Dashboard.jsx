import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { users, startups, challenges, pilots, activities } = useApp();

  const totalBudget = challenges.reduce((acc, c) => acc + (parseFloat(c.budget.replace(/,/g, "")) || 0), 0);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-slate-900">System Admin Control Center</h1>
              <span className="bg-blue-100 text-blue-900 border border-blue-300 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                Lightweight Admin
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Provision platform users, assign roles, monitor procurement challenge registries, and view global audit logs.
            </p>
          </div>

          <Link
            to="/admin/users"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-xs flex items-center justify-center space-x-2 transition"
          >
            <span>➕ Provision New User</span>
          </Link>
        </div>

        {/* Analytics Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">System Users</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">{users.length}</h2>
              <span className="text-[10px] text-blue-600 font-semibold">Across 4 Roles</span>
            </div>
            <div className="h-11 w-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
              👥
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Registered Startups</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">{startups.length}</h2>
              <span className="text-[10px] text-emerald-600 font-semibold">DPIIT Verified</span>
            </div>
            <div className="h-11 w-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
              🏢
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Procurement Challenges</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">{challenges.length}</h2>
              <span className="text-[10px] text-purple-600 font-semibold">{pilots.length} Pilots Running</span>
            </div>
            <div className="h-11 w-11 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">
              📋
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Committed Innovation Budget</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">₹{(totalBudget / 100000).toFixed(1)} L</h2>
              <span className="text-[10px] text-amber-600 font-semibold">Public GFR Allocation</span>
            </div>
            <div className="h-11 w-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">
              💰
            </div>
          </div>
        </div>

        {/* Global System Audit Trail Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Global System Activity & Audit Trail</h3>
            <span className="text-xs text-slate-500">{activities.length} Recorded Audit Logs</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Actor & Role</th>
                  <th className="p-3">Action Type</th>
                  <th className="p-3">Event Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {activities.map((act) => (
                  <tr key={act.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-semibold text-slate-600 whitespace-nowrap">{act.timestamp}</td>
                    <td className="p-3 font-bold text-slate-900">
                      {act.actor}
                      <span className="block text-[10px] text-slate-500 uppercase">{act.role}</span>
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px] border border-slate-200">
                        {act.action}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">{act.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}