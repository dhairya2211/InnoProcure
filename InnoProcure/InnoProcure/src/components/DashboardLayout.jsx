import React from "react";
import Navbar from "./Navbar";
import DemoHeaderBanner from "./DemoHeaderBanner";

import StartupSidebar from "./sidebars/StartupSidebar";
import GovernmentSidebar from "./sidebars/GovernmentSidebar";
import EvaluatorSidebar from "./sidebars/EvaluatorSidebar";
import AdminSidebar from "./sidebars/AdminSidebar";
import { useApp } from "../context/AppContext";

export default function DashboardLayout({ children, role }) {
  const { currentUser, isPublicView } = useApp();

  const activeRole = role || currentUser?.role || "government";

  const renderSidebar = () => {
    if (isPublicView) return null;

    switch (activeRole) {
      case "startup":
        return <StartupSidebar />;
      case "government":
        return <GovernmentSidebar />;
      case "evaluator":
        return <EvaluatorSidebar />;
      case "admin":
        return <AdminSidebar />;
      default:
        return <GovernmentSidebar />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased">
      <DemoHeaderBanner />
      <Navbar />

      <div className="flex flex-1 w-full max-w-full">
        {renderSidebar()}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full min-w-0">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}