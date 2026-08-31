import React from "react";
import { Routes, Route } from "react-router-dom";

/* Government Pages */
import GovernmentDashboard from "../pages/government/Dashboard";
import CreateChallenge from "../pages/government/CreateChallenge";
import ChallengeDetails from "../pages/government/ChallengeDetails";
import FinalDecision from "../pages/government/FinalDecision";

/* Startup Pages */
import StartupDashboard from "../pages/startup/Dashboard";
import BrowseChallenges from "../pages/startup/BrowseChallenges";
import ApplyChallenge from "../pages/startup/ApplyChallenge";
import StartupProfile from "../pages/startup/StartupProfile";
import Milestones from "../pages/startup/Milestones";

/* Evaluator Pages */
import EvaluatorDashboard from "../pages/evaluator/Dashboard";
import ScoreApplications from "../pages/evaluator/ScoreApplications";
import Shortlist from "../pages/evaluator/Shortlist";
import VerifyMilestones from "../pages/evaluator/VerifyMilestones";

/* Admin Pages */
import AdminDashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/UserManagement";
import ChallengeManagement from "../pages/admin/ChallengeManagement";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";

/* Public View Portal Page */
import PublicChallengeView from "../pages/public/PublicChallengeView";

// Auth & Fallback
import Login from "../pages/auth/Login";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Government Routes */}
      <Route path="/government/dashboard" element={<GovernmentDashboard />} />
      <Route path="/government/create-challenge" element={<CreateChallenge />} />
      <Route path="/government/challenge-details" element={<ChallengeDetails />} />
      <Route path="/government/final-decision" element={<FinalDecision />} />

      {/* Startup Routes */}
      <Route path="/startup/dashboard" element={<StartupDashboard />} />
      <Route path="/startup/challenges" element={<BrowseChallenges />} />
      <Route path="/startup/apply" element={<ApplyChallenge />} />
      <Route path="/startup/profile" element={<StartupProfile />} />
      <Route path="/startup/milestones" element={<Milestones />} />

      {/* Evaluator Routes */}
      <Route path="/evaluator/dashboard" element={<EvaluatorDashboard />} />
      <Route path="/evaluator/score" element={<ScoreApplications />} />
      <Route path="/evaluator/shortlist" element={<Shortlist />} />
      <Route path="/evaluator/verify" element={<VerifyMilestones />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/challenges" element={<ChallengeManagement />} />
      <Route path="/admin/reports" element={<Reports />} />
      <Route path="/admin/settings" element={<Settings />} />

      {/* Public View Portal Routes */}
      <Route path="/public/challenges" element={<PublicChallengeView />} />
      <Route path="/public/challenges/:id" element={<PublicChallengeView />} />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}