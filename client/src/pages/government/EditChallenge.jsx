import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useSearchParams, useNavigate } from "react-router-dom";
import { challengeService } from "../../services/challengeService";

export default function EditChallenge() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const challengeId = searchParams.get("id");

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    category: "",
    problemStatement: "",
    desiredOutcome: "",
    measurableOutcomeTarget: "",
    budget: "",
    timelineDays: "",
    applicationDeadline: "",
    dataSensitivity: "LOW",
    requiredCapabilities: "",
    status: "DRAFT",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing challenge
  useEffect(() => {
    const fetchChallenge = async () => {
      if (!challengeId) {
        setError("Challenge ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await challengeService.getChallengeById(
          challengeId
        );

        setFormData({
          title: data.title || "",
          department: data.department || "",
          category: data.category || "",
          problemStatement: data.problemStatement || "",
          desiredOutcome: data.desiredOutcome || "",
          measurableOutcomeTarget:
            data.measurableOutcomeTarget || "",
          budget: data.budget || "",
          timelineDays: data.timelineDays || "",
          applicationDeadline: data.applicationDeadline
            ? data.applicationDeadline.substring(0, 10)
            : "",
          dataSensitivity: data.dataSensitivity || "LOW",
          requiredCapabilities: (
            data.requiredCapabilities || []
          ).join(", "),
          status: data.status || "DRAFT",
        });
      } catch (err) {
        console.error("Failed to fetch challenge:", err);
        setError(err.message || "Failed to load challenge.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // API #7: PATCH /api/challenges/:id
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT HANDLER CALLED");
    if (!challengeId) {
      setError("Challenge ID is missing.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: formData.title,
        department: formData.department,
        category: formData.category,
        problemStatement: formData.problemStatement,
        desiredOutcome: formData.desiredOutcome,
        measurableOutcomeTarget:
          formData.measurableOutcomeTarget,
        budget: Number(
          String(formData.budget).replace(/,/g, "")
        ),
        timelineDays: Number(formData.timelineDays),
        applicationDeadline:
          formData.applicationDeadline,
        dataSensitivity: formData.dataSensitivity,
        requiredCapabilities:
          formData.requiredCapabilities
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        status: formData.status,
      };
      console.log("SENDING PATCH:", challengeId, payload);
      const updatedChallenge =
        await challengeService.updateChallenge(
          challengeId,
          payload
        );

      alert("Challenge updated successfully!");

      navigate(
        `/government/challenge-details?id=${
          updatedChallenge._id || challengeId
        }`
      );
    } catch (err) {
      console.error("Failed to update challenge:", err);
      setError(
        err.message || "Failed to update challenge."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="government">
        <div className="p-6 text-sm text-slate-500">
          Loading challenge...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="government">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-slate-900">
            Edit Procurement Challenge
          </h1>

          <p className="text-xs text-slate-500">
            Update challenge details and publish the changes
            to the ecosystem.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Challenge Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>

              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>

              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Problem Statement
            </label>

            <textarea
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Desired Outcome
            </label>

            <textarea
              name="desiredOutcome"
              value={formData.desiredOutcome}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Measurable Outcome Target
            </label>

            <textarea
              name="measurableOutcomeTarget"
              value={formData.measurableOutcomeTarget}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Budget (₹)
              </label>

              <input
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                type="text"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Timeline (Days)
              </label>

              <input
                name="timelineDays"
                value={formData.timelineDays}
                onChange={handleChange}
                required
                type="number"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Application Deadline
              </label>

              <input
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                type="date"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Data Sensitivity
              </label>

              <select
                name="dataSensitivity"
                value={formData.dataSensitivity}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
                <option value="IN_EVALUATION">
                  IN_EVALUATION
                </option>
                <option value="PILOT_IN_PROGRESS">
                  PILOT_IN_PROGRESS
                </option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="SCALED">SCALED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Required Capabilities
            </label>

            <input
              name="requiredCapabilities"
              value={formData.requiredCapabilities}
              onChange={handleChange}
              placeholder="IoT, AI, Cloud"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />

            <p className="text-[11px] text-slate-400 mt-1">
              Separate capabilities with commas.
            </p>
          </div>

          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/government/challenge-details?id=${challengeId}`
                )
              }
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white text-sm font-bold"
            >
              {saving
                ? "Saving..."
                : "Save Challenge Changes"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}