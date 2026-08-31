import React from "react";

export default function PilotAgreementModal({ isOpen, onClose, pilot, challenge, startup }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 border-b border-amber-500/30 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Official Tripartite Pilot Agreement
              </span>
              <span className="text-xs text-slate-400">Ref: INNO-AGR-2026-08</span>
            </div>
            <h2 className="text-xl font-bold mt-1 text-slate-100">
              Government Innovation Pilot & Procurement Agreement
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Contract Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-sm text-slate-800 font-serif">
          
          <div className="p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-xs font-sans rounded-r">
            <span className="font-bold">Legal Status:</span> Executed under Rule 194 of General Financial Rules (GFR 2017) for Small Batch Innovation Piloting.
          </div>

          <div className="space-y-2">
            <h3 className="font-sans font-bold text-slate-900 text-base border-b pb-1">1. Contracting Parties</h3>
            <p>
              This agreement is entered into on <strong>{pilot?.agreementDate || "August 08, 2026"}</strong> between:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-sans text-xs text-slate-700">
              <li>
                <strong>Government Contracting Entity:</strong> {pilot?.department || challenge?.department || "Bengaluru Water Supply Board"}
              </li>
              <li>
                <strong>Selected Innovation Startup:</strong> {startup?.companyName || pilot?.startupName || "AquaSensing Tech Pvt Ltd"} (DPIIT Reg: {startup?.dpiitNumber || "DPIIT-89241"})
              </li>
              <li>
                <strong>Designated Technical Evaluator:</strong> Dr. Ananya Sen (IIT Delhi / Department Domain Expert)
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-sans font-bold text-slate-900 text-base border-b pb-1">2. Pilot Objective & Scope</h3>
            <p className="font-sans text-xs text-slate-700 leading-relaxed">
              The Startup agrees to execute the pilot project titled <strong>"{pilot?.challengeTitle || challenge?.title}"</strong> aimed at achieving the following target:
              <br />
              <em className="font-semibold text-slate-900">"{challenge?.measurableOutcomeTarget || "Reduce Ward NRW loss from 38% to under 15% within 90 days of deployment."}"</em>
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-sans font-bold text-slate-900 text-base border-b pb-1">3. Financial Commitment & Milestones</h3>
            <p className="font-sans text-xs text-slate-700">
              Total Approved Budget Commitment: <strong className="text-slate-900 font-bold">₹{pilot?.totalBudget || challenge?.budget}</strong> disbursed upon milestone verification:
            </p>
            
            <div className="overflow-x-auto font-sans">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-700">
                    <th className="p-2 border border-slate-200">Milestone</th>
                    <th className="p-2 border border-slate-200">Deliverable / Target</th>
                    <th className="p-2 border border-slate-200">Amount (₹)</th>
                    <th className="p-2 border border-slate-200">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(pilot?.milestones || []).map((ms, idx) => (
                    <tr key={ms.id || idx} className="border-b border-slate-200">
                      <td className="p-2 border border-slate-200 font-medium">{ms.title}</td>
                      <td className="p-2 border border-slate-200 text-slate-600">{ms.description}</td>
                      <td className="p-2 border border-slate-200 font-semibold">₹{ms.amount}</td>
                      <td className="p-2 border border-slate-200 text-emerald-700 font-bold">{ms.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-sans font-bold text-slate-900 text-base border-b pb-1">4. Post-Pilot Scaling Commitment</h3>
            <p className="font-sans text-xs text-slate-700 leading-relaxed">
              Upon successful verification of Milestone 3 targets by the Evaluator, the Government Officer holds the authority to approve a direct scale-up procurement expansion without requiring a re-tendering process, subject to GFR innovation provisions.
            </p>
          </div>

          {/* Signatures */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-6 font-sans text-xs">
            <div className="p-3 bg-slate-50 border rounded text-center space-y-1">
              <div className="font-serif italic text-blue-900 text-sm font-bold">Rajesh V. Sharma</div>
              <p className="font-semibold text-slate-800">Joint Secretary (MoHUA)</p>
              <span className="text-[10px] text-slate-500 block">Digitally Signed via e-Sign</span>
            </div>

            <div className="p-3 bg-slate-50 border rounded text-center space-y-1">
              <div className="font-serif italic text-emerald-900 text-sm font-bold">Vikramaditya Kulkarni</div>
              <p className="font-semibold text-slate-800">CEO, AquaSensing Tech Pvt Ltd</p>
              <span className="text-[10px] text-slate-500 block">Digitally Signed via Corporate Seal</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500 font-sans">Verification Hash: 8f92a11b0c938d21e</span>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded font-semibold transition"
          >
            Close Agreement View
          </button>
        </div>

      </div>
    </div>
  );
}
