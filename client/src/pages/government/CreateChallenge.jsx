import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function CreateChallenge() {
  const { createChallenge, currentUser } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Form Fields
  const [formData, setFormData] = useState({
    title: "AI-Assisted Rural Health Cold Chain Telemetry Pilot",
    department: currentUser.department || "Ministry of Health & Family Welfare",
    category: "Healthcare & MedTech",
    problemStatement: "Remote Primary Health Centres (PHCs) frequently experience power disruptions resulting in unmonitored vaccine temperature drift and vaccine wastage.",
    desiredOutcome: "Continuous off-grid thermal logging with cellular/satellite failover alerts to ensure zero spoilage.",
    measurableOutcomeTarget: "Maintain vaccine temperatures strictly within 2°C to 8°C with breach notifications under 120 seconds.",
    budget: "35,00,000",
    timelineDays: 90,
    applicationDeadline: "2026-10-30",
    dataSensitivity: "MEDIUM",
    requiredCapabilities: "Medical Devices, IoT Telemetry, Offline-first Sync",
  });

  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggested, setAiSuggested] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAiAssist = () => {
    setAiLoading(true);
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        measurableOutcomeTarget: "Achieve 99.8% temperature uptime across 25 rural PHCs and reduce vaccine wastage to 0% over 90 days.",
        desiredOutcome: "Deploy IoT telemetry nodes on Ice-Lined Refrigerators with automated SMS/cloud alerts upon ±1.5°C thermal drift.",
      }));
      setAiLoading(false);
      setAiSuggested(true);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCh = createChallenge(formData);
    navigate(`/government/challenge-details?id=${newCh.id}`);
  };

  return (
    <DashboardLayout role="government">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="border-b pb-4">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-blue-800 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
              Step {step} of 3
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Create Procurement Challenge</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Frame public sector problems, specify outcome targets, set budget, and define required startup capabilities.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="flex items-center justify-between border bg-white p-3 rounded-xl shadow-xs text-xs">
          <div className={`flex items-center space-x-2 font-bold ${step >= 1 ? "text-blue-600" : "text-slate-400"}`}>
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"}`}>1</span>
            <span>Problem & Scope</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-200" />
          <div className={`flex items-center space-x-2 font-bold ${step >= 2 ? "text-blue-600" : "text-slate-400"}`}>
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"}`}>2</span>
            <span>Outcomes & Budget</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-200" />
          <div className={`flex items-center space-x-2 font-bold ${step >= 3 ? "text-blue-600" : "text-slate-400"}`}>
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"}`}>3</span>
            <span>Capabilities & Sensitivity</span>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          
          {/* STEP 1: Problem & Scope */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Section 1: Challenge Identity & Problem Framing</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. AI-Assisted Water Leakage Detection Pilot"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Government Department / Ministry *
                  </label>
                  <input
                    type="text"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Smart Water & Sanitation</option>
                    <option>Waste Management & CleanTech</option>
                    <option>Healthcare & MedTech</option>
                    <option>Urban Infrastructure & Mobility</option>
                    <option>AgriTech & Rural Development</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Public Problem Statement *
                </label>
                <textarea
                  name="problemStatement"
                  rows={4}
                  required
                  value={formData.problemStatement}
                  onChange={handleChange}
                  placeholder="Describe the real-world public sector bottleneck or failure point..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
                >
                  Continue to Outcomes & Budget →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Outcomes & Budget */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-sm font-bold text-slate-900">Section 2: Measurable Target & Financials</h3>
                
                {/* AI Problem Structuring Mock Button */}
                <button
                  type="button"
                  onClick={handleAiAssist}
                  disabled={aiLoading}
                  className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5"
                >
                  <span>✨</span>
                  <span>{aiLoading ? "AI Restructuring..." : "AI Auto-Structure Target"}</span>
                </button>
              </div>

              {aiSuggested && (
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs text-purple-900 flex items-center justify-between">
                  <span>✨ AI has automatically restructured your problem statement into a quantifiable outcome target!</span>
                  <span className="font-bold uppercase text-[10px] bg-purple-200 px-1.5 py-0.5 rounded">Mock AI Applied</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Desired Outcome Description *
                </label>
                <textarea
                  name="desiredOutcome"
                  rows={2}
                  required
                  value={formData.desiredOutcome}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Measurable Outcome Target (Metric Target) *
                </label>
                <input
                  type="text"
                  name="measurableOutcomeTarget"
                  required
                  value={formData.measurableOutcomeTarget}
                  onChange={handleChange}
                  placeholder="e.g. Reduce Non-Revenue Water loss from 38% to under 15% within 90 days"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Pilot Budget (₹) *
                  </label>
                  <input
                    type="text"
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g. 45,00,000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Pilot Duration (Days) *
                  </label>
                  <input
                    type="number"
                    name="timelineDays"
                    required
                    value={formData.timelineDays}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Application Deadline *
                  </label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    required
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
                >
                  Continue to Capabilities →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Capabilities & Sensitivity */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Section 3: Required Capabilities & Security Sensitivity</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Required Startup Capabilities (Comma Separated) *
                </label>
                <input
                  type="text"
                  name="requiredCapabilities"
                  required
                  value={formData.requiredCapabilities}
                  onChange={handleChange}
                  placeholder="e.g. IoT Sensors, Computer Vision, Telemedicine"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Data Sensitivity Level *
                </label>
                <select
                  name="dataSensitivity"
                  value={formData.dataSensitivity}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="LOW">LOW (Public open data)</option>
                  <option value="MEDIUM">MEDIUM (Municipal operational telemetry)</option>
                  <option value="HIGH">HIGH (Restricted citizen health/infrastructure data)</option>
                </select>
              </div>

              {formData.dataSensitivity === "HIGH" && (
                <div className="p-3 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-xs rounded-r">
                  ⚠️ <strong>Security Flag:</strong> High data sensitivity requires Evaluator to verify cybersecurity clause adherence prior to pilot execution.
                </div>
              )}

              <div className="p-4 bg-slate-50 rounded-lg border text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800">Review Summary:</span>
                <p>• Challenge Title: <strong>{formData.title}</strong></p>
                <p>• Budget: <strong>₹{formData.budget}</strong> | Duration: <strong>{formData.timelineDays} Days</strong></p>
                <p>• Department: <strong>{formData.department}</strong></p>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md transition"
                >
                  🚀 Publish Challenge to Ecosystem
                </button>
              </div>
            </div>
          )}

        </form>

      </div>
    </DashboardLayout>
  );
}