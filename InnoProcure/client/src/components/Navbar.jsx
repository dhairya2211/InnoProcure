import React, { useState } from "react";
import Logo from "./Logo";
import RoleBadge from "./RoleBadge";
import { useApp } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { currentUser, isPublicView, setIsPublicView, notifications } = useApp();
  const [showNotifs, setShowNotifs] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Logo Section */}
        <Link to={`/${currentUser.role}/dashboard`} className="flex items-center shrink-0">
          <Logo />
        </Link>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          
          {/* Public Transparency Badge Toggle */}
          <button
            onClick={() => {
              if (isPublicView) {
                setIsPublicView(false);
                navigate(`/${currentUser.role}/dashboard`);
              } else {
                setIsPublicView(true);
                navigate("/public/challenges/ch_1");
              }
            }}
            className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition cursor-pointer ${
              isPublicView
                ? "bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-400/30"
                : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isPublicView ? "Public Transparency Mode" : "View Public Portal"}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 relative transition cursor-pointer"
              title="Notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 h-2 w-2 bg-amber-500 rounded-full ring-2 ring-white" />
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">System Activity Alerts</h4>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">Live</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition">
                      <p className="text-slate-800 font-medium">{n.text}</p>
                      <span className="text-slate-400 text-[10px] mt-1 block font-semibold">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* User Info Container */}
          <div className="flex items-center space-x-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-slate-200 shadow-xs shrink-0"
            />
            <div className="hidden lg:flex flex-col text-left">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-900 leading-none">{currentUser.name}</span>
                <RoleBadge role={currentUser.role} />
              </div>
              <span className="text-[11px] text-slate-500 truncate max-w-[180px] font-medium mt-0.5">
                {currentUser.companyName || currentUser.department}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="text-xs text-slate-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg font-bold border border-slate-200 hover:border-rose-200 transition cursor-pointer shrink-0"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}