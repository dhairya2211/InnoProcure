import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

export default function Login() {
  const { users, setCurrentUser } = useApp();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [email, setEmail] = useState(users[0].email);
  const [password, setPassword] = useState("password123");

  const handleSelectUser = (u) => {
    setSelectedUser(u);
    setEmail(u.email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentUser(selectedUser);
    navigate(`/${selectedUser.role}/dashboard`);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 text-slate-100 font-sans relative overflow-hidden">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-blue-600 to-emerald-500" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 z-10 my-auto">
        
        {/* Portal Branding Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-slate-800/80 border border-slate-700/80 mb-1">
            <Logo />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Innovation Procurement Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Government-to-Startup Piloting & Public Sector Procurement Platform
          </p>
        </div>

        {/* Demo Role Selector Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Select Demo Account Role:
            </span>
            <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 font-medium">
              4 Roles Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {users.map((u) => {
              const isSelected = selectedUser.id === u.id;
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleSelectUser(u)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center space-x-3.5 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-br from-slate-800 to-slate-850 border-amber-500 ring-2 ring-amber-500/40 shadow-lg"
                      : "bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{u.name}</span>
                      {isSelected && <span className="text-amber-400 text-xs">✓</span>}
                    </div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      {u.role}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {u.companyName || u.department}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 pt-2 border-t border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Authorized Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Enter Portal as {selectedUser.name}</span>
            <span>→</span>
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>Rule 194 GFR 2017 Innovation Compliant</span>
          <span>National Informatics Centre (NIC) Mock Portal</span>
        </div>

      </div>
    </div>
  );
}