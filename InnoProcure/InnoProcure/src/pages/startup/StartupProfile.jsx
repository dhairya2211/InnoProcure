import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useApp } from "../../context/AppContext";

export default function StartupProfile() {
  const { currentUser, startups, updateStartupProfile } = useApp();
  const startup = startups.find((s) => s.userId === currentUser.id) || startups[0];

  const [profile, setProfile] = useState({
    companyName: startup.companyName,
    dpiitNumber: startup.dpiitNumber,
    foundingYear: startup.foundingYear,
    headquarters: startup.headquarters,
    shortDescription: startup.shortDescription,
    capabilities: (startup.capabilities || []).join(", "),
    pastExperience: startup.pastExperience,
    teamSize: startup.teamSize,
    contactEmail: startup.contactEmail,
    contactPhone: startup.contactPhone,
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateStartupProfile(startup.id, {
      ...profile,
      capabilities: profile.capabilities.split(",").map((s) => s.trim()).filter(Boolean),
    });
    alert("Startup profile updated successfully!");
  };

  return (
    <DashboardLayout role="startup">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-slate-900">Startup Organization Profile</h1>
          <p className="text-xs text-slate-500">
            Maintain verified DPIIT registration details, core technology capabilities, and past municipal deployments.
          </p>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-bold text-slate-900 text-sm">Entity Details</h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-300">
              DPIIT Verified Entity
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Company Legal Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={profile.companyName}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                DPIIT Recognition Number *
              </label>
              <input
                type="text"
                name="dpiitNumber"
                value={profile.dpiitNumber}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Headquarters Location
              </label>
              <input
                type="text"
                name="headquarters"
                value={profile.headquarters}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Team Size
              </label>
              <input
                type="number"
                name="teamSize"
                value={profile.teamSize}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Short Description / Value Proposition *
            </label>
            <textarea
              name="shortDescription"
              rows={3}
              value={profile.shortDescription}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Core Capabilities (Comma Separated) *
            </label>
            <input
              type="text"
              name="capabilities"
              value={profile.capabilities}
              onChange={handleChange}
              placeholder="e.g. IoT Sensors, Computer Vision, Predictive Analytics"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Past Public Sector & Enterprise Deployments *
            </label>
            <textarea
              name="pastExperience"
              rows={3}
              value={profile.pastExperience}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow-md transition"
            >
              Save Profile Changes
            </button>
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
}