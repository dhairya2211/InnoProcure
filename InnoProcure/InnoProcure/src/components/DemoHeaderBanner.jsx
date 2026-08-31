import React from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function DemoHeaderBanner() {
  const { currentUser, switchRole, isPublicView, setIsPublicView, resetDemoState } = useApp();
  const navigate = useNavigate();

  const roles = [
    { id: "government", label: "Govt Officer", route: "/government/dashboard" },
    { id: "evaluator", label: "Evaluator", route: "/evaluator/dashboard" },
    { id: "startup", label: "Startup", route: "/startup/dashboard" },
    { id: "admin", label: "Admin", route: "/admin/dashboard" },
  ];

  const handleRoleClick = (roleId, route) => {
    switchRole(roleId);
    navigate(route);
  };

  const handlePublicToggle = () => {
    if (!isPublicView) {
      setIsPublicView(true);
      navigate("/public/challenges/ch_1");
    } else {
      setIsPublicView(false);
      navigate(`/${currentUser.role}/dashboard`);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-300 text-xs px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between border-b border-slate-800/80 shadow-inner z-50 gap-2">
      <div className="flex items-center space-x-2.5">
        <span className="bg-amber-500 text-slate-950 font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
          Demo Role Switcher
        </span>
        <span className="hidden lg:inline text-slate-400 text-xs">
          Click any role below to test the end-to-end procurement lifecycle:
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {roles.map((r) => {
          const isActive = !isPublicView && currentUser.role === r.id;
          return (
            <button
              key={r.id}
              onClick={() => handleRoleClick(r.id, r.route)}
              className={`px-3 py-1 rounded-lg transition font-semibold text-xs flex items-center space-x-1 cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/40"
                  : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
              }`}
            >
              <span>{r.label}</span>
            </button>
          );
        })}

        <div className="h-4 w-px bg-slate-800 hidden sm:block mx-1" />

        <button
          onClick={handlePublicToggle}
          className={`px-3 py-1 rounded-lg transition font-semibold text-xs flex items-center space-x-1 cursor-pointer ${
            isPublicView
              ? "bg-emerald-600 text-white ring-2 ring-emerald-400/40"
              : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
          }`}
        >
          <span>🌐 Public View</span>
        </button>

        <button
          onClick={resetDemoState}
          title="Reset all demo data to initial state"
          className="px-2.5 py-1 bg-slate-900 hover:bg-rose-950 hover:text-rose-300 hover:border-rose-800 text-slate-400 rounded-lg text-xs transition border border-slate-800 cursor-pointer ml-1"
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}
