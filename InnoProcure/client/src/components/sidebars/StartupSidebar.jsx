import React from "react";
import { NavLink } from "react-router-dom";

export default function StartupSidebar() {
  const menuItems = [
    { title: "Startup Dashboard", icon: "📊", path: "/startup/dashboard" },
    { title: "Browse Challenges", icon: "🔍", path: "/startup/challenges" },
    { title: "Apply to Challenge", icon: "📝", path: "/startup/apply" },
    { title: "Pilot & Milestones", icon: "🎯", path: "/startup/milestones" },
    { title: "Startup Profile", icon: "🏢", path: "/startup/profile" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 min-h-screen border-r border-slate-800">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Startup Founder</h2>
          <p className="text-[11px] text-slate-400">Innovation Beneficiary</p>
        </div>
        <span className="text-xs bg-slate-800 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-slate-700">Role 3</span>
      </div>

      <nav className="p-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2.5 rounded-md text-xs font-medium transition ${
                isActive
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}