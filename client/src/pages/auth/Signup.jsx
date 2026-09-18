import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../components/Logo";
import { apiClient } from "../../services/apiClient";
import { mapUserFromApi } from "../../services/userService";

export default function Signup() {
  const { setCurrentUser, addUser } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("startup");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !role) {
      setError("Please fill in all required fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      };

      if (department.trim()) {
        payload.department = department.trim();
      }

      let result;
      try {
        result = await apiClient.post("/api/auth/register", payload);
      } catch {
        const fallbackUser = await addUser({
          ...payload,
          designation: role === "startup" ? "Founder" : undefined,
        });
        setCurrentUser(fallbackUser);
        navigate(`/${role}/dashboard`);
        return;
      }

      if (result?.user) {
        const mappedUser = mapUserFromApi(result.user);
        setCurrentUser(mappedUser);
        if (result.token) {
          localStorage.setItem("innoprocure_token", result.token);
        }
        if (role === "startup") {
          try {
            await addUser({
              ...payload,
              name: mappedUser.name,
              email: mappedUser.email,
            });
          } catch {}
        }
        navigate(`/${role}/dashboard`);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      setError(err.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Join the Innovation Procurement Portal — Government-to-Startup Piloting Platform
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4 pt-2 border-t border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rajesh Kumar"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition autofill:bg-slate-950 autofill:text-white [&:-webkit-autofill]:bg-slate-950 [&:-webkit-autofill]:text-white [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#020617_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.gov.in / startup@company.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition autofill:bg-slate-950 autofill:text-white [&:-webkit-autofill]:bg-slate-950 [&:-webkit-autofill]:text-white [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#020617_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition autofill:bg-slate-950 autofill:text-white [&:-webkit-autofill]:bg-slate-950 [&:-webkit-autofill]:text-white [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#020617_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition autofill:bg-slate-950 autofill:text-white [&:-webkit-autofill]:bg-slate-950 [&:-webkit-autofill]:text-white [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#020617_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Role <span className="text-red-400">*</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            >
              <option value="startup">Startup / Solution Provider</option>
              <option value="government">Government Officer</option>
              <option value="evaluator">Technical Evaluator</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Department / Organization <span className="text-slate-500">(Optional)</span>
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder={
                role === "startup"
                  ? "e.g. AquaTech Innovations Pvt Ltd"
                  : "e.g. Municipal Corporation / NIC"
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition autofill:bg-slate-950 autofill:text-white [&:-webkit-autofill]:bg-slate-950 [&:-webkit-autofill]:text-white [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#020617_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{loading ? "Creating Account..." : "Create Account & Enter Portal"}</span>
            {!loading && <span>→</span>}
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-center text-xs text-slate-400">
            <span>Already have an account?</span>
            <Link
              to="/login"
              className="ml-2 font-semibold text-blue-400 hover:text-blue-300 transition"
            >
              Sign in instead →
            </Link>
          </div>
          <div className="pt-4 flex items-center justify-between text-[11px] text-slate-500 font-medium mt-2">
            <span>Rule 194 GFR 2017 Innovation Compliant</span>
            <span>National Informatics Centre (NIC) Mock Portal</span>
          </div>
        </div>

      </div>
    </div>
  );
}
