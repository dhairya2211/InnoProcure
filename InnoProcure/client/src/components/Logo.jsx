import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center text-white shadow-md relative overflow-hidden shrink-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
        <span className="font-black text-lg text-amber-400 tracking-wider">IP</span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
            InnoProcure
          </h1>
          <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-1.5 py-0.5 rounded border border-slate-200 uppercase tracking-wider">
            GOI Platform
          </span>
        </div>

        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
          Public Sector Innovation & Procurement Portal
        </p>
      </div>
    </div>
  );
}