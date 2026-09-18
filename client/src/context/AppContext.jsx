import React, { createContext, useContext, useState, useEffect } from "react";
import {
  initialUsers,
  initialStartups,
  initialChallenges,
  initialApplications,
  initialPilots,
  initialActivities,
} from "../data/mockData";
import { challengeService } from "../services/challengeService";
import { userService } from "../services/userService";
import { isMongoId } from "../services/ids";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Current user / role state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("innoprocure_user");
    return saved ? JSON.parse(saved) : initialUsers[0]; // default to Government Officer
  });

  const [isPublicView, setIsPublicView] = useState(false);

  // Entities state
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("innoprocure_users");
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [startups, setStartups] = useState(() => {
    const saved = localStorage.getItem("innoprocure_startups");
    return saved ? JSON.parse(saved) : initialStartups;
  });

  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem("innoprocure_challenges");
    return saved ? JSON.parse(saved) : initialChallenges;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("innoprocure_applications");
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [pilots, setPilots] = useState(() => {
    const saved = localStorage.getItem("innoprocure_pilots");
    return saved ? JSON.parse(saved) : initialPilots;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("innoprocure_activities");
    return saved ? JSON.parse(saved) : initialActivities;
  });

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: "n1", text: "New milestone evidence submitted for AquaSensing Pilot", time: "10 mins ago", read: false },
    { id: "n2", text: "New application received for Municipal Waste Challenge", time: "1 hour ago", read: false },
  ]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("innoprocure_user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("innoprocure_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("innoprocure_startups", JSON.stringify(startups));
  }, [startups]);

  useEffect(() => {
    localStorage.setItem("innoprocure_challenges", JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem("innoprocure_applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem("innoprocure_pilots", JSON.stringify(pilots));
  }, [pilots]);

  useEffect(() => {
    localStorage.setItem("innoprocure_activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    let cancelled = false;

    const loadChallenges = async () => {
      try {
        const apiChallenges = await challengeService.getChallenges();
        if (cancelled) {
          return;
        }

        const apiIds = new Set(apiChallenges.map((challenge) => challenge.id));
        setChallenges((prev) => {
          const localOnly = prev.filter((challenge) => !apiIds.has(challenge.id));
          return [...apiChallenges, ...localOnly];
        });
      } catch (error) {
        console.error("Failed to load challenges from database:", error);
      }
    };

    loadChallenges();

    const loadUsersAndStartups = async () => {
      try {
        const [apiUsers, apiStartups] = await Promise.all([
          userService.getUsers(),
          userService.getStartups(),
        ]);

        if (cancelled) {
          return;
        }

        setUsers((prev) => {
          const withCompany = apiUsers.map((user) => {
            const startup = apiStartups.find((item) => item.userId === user.id);
            return startup ? { ...user, companyName: startup.companyName } : user;
          });
          const emails = new Set(withCompany.map((user) => user.email));
          return [...withCompany, ...prev.filter((user) => !emails.has(user.email))];
        });

        setStartups((prev) => {
          const ids = new Set(apiStartups.map((startup) => startup.id));
          const userIds = new Set(apiStartups.map((startup) => startup.userId));
          const names = new Set(apiStartups.map((startup) => startup.companyName));
          return [
            ...apiStartups,
            ...prev.filter(
              (startup) =>
                !ids.has(startup.id) &&
                !userIds.has(startup.userId) &&
                !names.has(startup.companyName)
            ),
          ];
        });
      } catch (error) {
        console.error("Failed to load users and startups from database:", error);
      }
    };

    loadUsersAndStartups();

    return () => {
      cancelled = true;
    };
  }, []);

  // Role switching
  const switchRole = (roleName) => {
    const targetUser = users.find((u) => u.role === roleName);
    if (targetUser) {
      setCurrentUser(targetUser);
      setIsPublicView(false);
    }
  };

  // Activity Log helper
  const logActivity = (action, details) => {
    const newAct = {
      id: `act_${Date.now()}`,
      timestamp: new Date().toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      actor: currentUser?.name || "System User",
      role: currentUser?.role ? currentUser.role.toUpperCase() : "PUBLIC",
      action,
      details,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Create Challenge (Govt)
  const createChallenge = async (challengeData) => {
    const newChallenge = await challengeService.createChallenge(challengeData, currentUser);

    setChallenges((prev) => [newChallenge, ...prev.filter((challenge) => challenge.id !== newChallenge.id)]);
    logActivity("CHALLENGE_CREATED", `Created Challenge: "${newChallenge.title}" (${newChallenge.department})`);
    return newChallenge;
  };

  // Submit Application (Startup)
  const submitApplication = (appData) => {
    const newAppId = `app_${Date.now()}`;
    const startup = startups.find((s) => s.userId === currentUser.id) || startups[0];

    const newApp = {
      id: newAppId,
      challengeId: appData.challengeId,
      startupId: startup.id,
      startupName: startup.companyName,
      submissionDate: new Date().toISOString().split("T")[0],
      proposedSolution: appData.proposedSolution,
      implementationApproach: appData.implementationApproach,
      expectedOutcome: appData.expectedOutcome,
      timelineDays: parseInt(appData.timelineDays, 10) || 60,
      requestedBudget: appData.requestedBudget,
      relevantExperience: appData.relevantExperience || startup.pastExperience,
      status: "SUBMITTED",
      score: null,
      evaluationComments: "",
      scoredDate: null,
      scoredBy: null,
    };

    setApplications((prev) => [newApp, ...prev]);

    // Update challenge count & status
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === appData.challengeId) {
          return { ...c, applicationsCount: c.applicationsCount + 1 };
        }
        return c;
      })
    );

    logActivity("APPLICATION_SUBMITTED", `${startup.companyName} submitted proposal for challenge ID: ${appData.challengeId}`);
    return newApp;
  };

  // Score Application (Evaluator)
  const scoreApplication = (appId, score, comments) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            score: parseInt(score, 10),
            evaluationComments: comments,
            scoredDate: new Date().toISOString().split("T")[0],
            scoredBy: currentUser.name,
            status: "UNDER_EVALUATION",
          };
        }
        return app;
      })
    );

    const app = applications.find((a) => a.id === appId);
    if (app) {
      logActivity("PROPOSAL_SCORED", `Evaluator ${currentUser.name} scored proposal for ${app.startupName} (Score: ${score}/100)`);
    }
  };

  // Shortlist Startup & Create Pilot Agreement (Evaluator)
  const shortlistStartup = (appId) => {
    const targetApp = applications.find((a) => a.id === appId);
    if (!targetApp) return;

    // Update application status
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return { ...app, status: "SHORTLISTED" };
        }
        if (app.challengeId === targetApp.challengeId && app.id !== appId) {
          return { ...app, status: "REJECTED" };
        }
        return app;
      })
    );

    const targetChallenge = challenges.find((c) => c.id === targetApp.challengeId);

    // Update challenge status
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === targetApp.challengeId) {
          return {
            ...c,
            status: "PILOT_IN_PROGRESS",
            shortlistedStartupId: targetApp.startupId,
          };
        }
        return c;
      })
    );

    // Create Pilot record if not existing
    const existingPilot = pilots.find((p) => p.challengeId === targetApp.challengeId);
    if (!existingPilot) {
      const newPilot = {
        id: `pilot_${Date.now()}`,
        challengeId: targetApp.challengeId,
        applicationId: targetApp.id,
        startupId: targetApp.startupId,
        startupName: targetApp.startupName,
        department: targetChallenge?.department || "Government Dept",
        challengeTitle: targetChallenge?.title || "Pilot Challenge",
        startDate: new Date().toISOString().split("T")[0],
        expectedCompletionDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        totalBudget: targetApp.requestedBudget || targetChallenge?.budget || "40,00,000",
        status: "IN_PROGRESS",
        agreementSigned: true,
        agreementDate: new Date().toISOString().split("T")[0],
        milestones: [
          {
            id: `ms_${Date.now()}_1`,
            title: "Milestone 1: Pilot Architecture & Sensor Setup",
            description: "Initial deployment, integration tests, and baseline data collection.",
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            amount: "15,00,000",
            status: "PENDING",
            paymentStatus: "PENDING",
            evidenceUrl: "",
            evidenceNotes: "",
            submittedDate: null,
            verifiedDate: null,
            verifiedBy: null,
            verificationComments: "",
          },
          {
            id: `ms_${Date.now()}_2`,
            title: "Milestone 2: Real-time Deployment & Metric Tracking",
            description: "Full Ward implementation and metric performance logging.",
            dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            amount: "15,00,000",
            status: "PENDING",
            paymentStatus: "PENDING",
            evidenceUrl: "",
            evidenceNotes: "",
            submittedDate: null,
            verifiedDate: null,
            verifiedBy: null,
            verificationComments: "",
          },
          {
            id: `ms_${Date.now()}_3`,
            title: "Milestone 3: Outcome Verification & Scale Report",
            description: "Final outcome audit demonstrating target achievement.",
            dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            amount: "12,50,000",
            status: "PENDING",
            paymentStatus: "PENDING",
            evidenceUrl: "",
            evidenceNotes: "",
            submittedDate: null,
            verifiedDate: null,
            verifiedBy: null,
            verificationComments: "",
          },
        ],
        finalDecision: null,
      };

      setPilots((prev) => [newPilot, ...prev]);
    }

    logActivity("STARTUP_SHORTLISTED", `Shortlisted ${targetApp.startupName} for Pilot Execution on Challenge ID: ${targetApp.challengeId}`);
  };

  // Submit Milestone Evidence (Startup)
  const submitMilestoneEvidence = (pilotId, milestoneId, evidenceNotes, filePlaceholderName) => {
    setPilots((prev) =>
      prev.map((p) => {
        if (p.id === pilotId) {
          const updatedMilestones = p.milestones.map((ms) => {
            if (ms.id === milestoneId) {
              return {
                ...ms,
                status: "SUBMITTED",
                evidenceNotes,
                evidenceUrl: filePlaceholderName || "Evidence_Document_v1.pdf",
                submittedDate: new Date().toISOString().split("T")[0],
              };
            }
            return ms;
          });
          return { ...p, milestones: updatedMilestones };
        }
        return p;
      })
    );

    logActivity("MILESTONE_SUBMITTED", `Startup submitted milestone evidence for Pilot ID: ${pilotId}`);
  };

  // Verify Milestone (Evaluator)
  const verifyMilestone = (pilotId, milestoneId, isApproved, comments) => {
    setPilots((prev) =>
      prev.map((p) => {
        if (p.id === pilotId) {
          const updatedMilestones = p.milestones.map((ms) => {
            if (ms.id === milestoneId) {
              return {
                ...ms,
                status: isApproved ? "VERIFIED" : "INCOMPLETE",
                verifiedDate: new Date().toISOString().split("T")[0],
                verifiedBy: currentUser.name,
                verificationComments: comments,
              };
            }
            return ms;
          });
          return { ...p, milestones: updatedMilestones };
        }
        return p;
      })
    );

    logActivity("MILESTONE_VERIFIED", `Evaluator ${currentUser.name} marked milestone ${isApproved ? "VERIFIED" : "INCOMPLETE"} for Pilot ID: ${pilotId}`);
  };

  // Release Payment (Evaluator or Govt Officer)
  const releasePayment = (pilotId, milestoneId) => {
    let releasedAmount = "0";
    setPilots((prev) =>
      prev.map((p) => {
        if (p.id === pilotId) {
          const updatedMilestones = p.milestones.map((ms) => {
            if (ms.id === milestoneId) {
              releasedAmount = ms.amount;
              return { ...ms, paymentStatus: "RELEASED" };
            }
            return ms;
          });
          return { ...p, milestones: updatedMilestones };
        }
        return p;
      })
    );

    logActivity("PAYMENT_RELEASED", `Released payment of ₹${releasedAmount} for Milestone ID: ${milestoneId} on Pilot ID: ${pilotId}`);
  };

  // Make Final Decision (Govt Officer)
  const makeFinalDecision = (pilotId, decision, comments, scaledDepartments = []) => {
    let pilotObj = null;
    setPilots((prev) =>
      prev.map((p) => {
        if (p.id === pilotId) {
          pilotObj = p;
          return {
            ...p,
            status: decision === "SCALED" ? "SCALED" : "REJECTED",
            finalDecision: {
              decision, // "SCALED" | "REJECTED"
              date: new Date().toISOString().split("T")[0],
              officerName: currentUser.name,
              comments,
              scaledDepartments,
            },
          };
        }
        return p;
      })
    );

    if (pilotObj) {
      setChallenges((prev) =>
        prev.map((c) => {
          if (c.id === pilotObj.challengeId) {
            return {
              ...c,
              status: decision === "SCALED" ? "SCALED" : "REJECTED",
            };
          }
          return c;
        })
      );
    }

    logActivity("FINAL_DECISION_MADE", `Government Officer ${currentUser.name} marked Pilot ID: ${pilotId} as ${decision}`);
  };

  // Admin User Management
  const addUser = async (userData) => {
    const newUser = await userService.createUser(userData);
    const provisionedUser = {
      ...newUser,
      companyName: userData.role === "startup" ? (userData.department || `${newUser.name} Ventures`) : newUser.companyName,
    };

    setUsers((prev) => [...prev.filter((user) => user.email !== provisionedUser.email), provisionedUser]);

    if (userData.role === "startup") {
      const newStartup = await userService.createStartup(
        {
          userId: provisionedUser.id,
          companyName: provisionedUser.companyName,
          contactEmail: provisionedUser.email,
          shortDescription: "Newly provisioned startup organization.",
          capabilities: [],
          technologyAreas: [],
        },
        currentUser
      );

      setStartups((prev) => [
        newStartup,
        ...prev.filter((startup) => startup.id !== newStartup.id && startup.userId !== newStartup.userId),
      ]);
    }

    logActivity("USER_PROVISIONED", `Admin created user ${provisionedUser.name} with role ${provisionedUser.role}`);
    return provisionedUser;
  };

  // Startup profile update
  const updateStartupProfile = async (startupId, updatedFields) => {
    let savedStartup;

    if (isMongoId(startupId)) {
      savedStartup = await userService.updateStartupProfile(startupId, updatedFields, currentUser);
    } else {
      const apiUsers = await userService.getUsers();
      let owner = apiUsers.find((user) => user.email === currentUser.email);

      if (!owner) {
        owner = await userService.createUser({
          name: currentUser.name,
          email: currentUser.email,
          role: "startup",
          department: currentUser.companyName || currentUser.department,
          designation: currentUser.designation,
          avatar: currentUser.avatar,
        });
      }

      setUsers((prev) => [...prev.filter((user) => user.email !== owner.email), owner]);

      const apiStartups = await userService.getStartups();
      const existingStartup = apiStartups.find((startup) => startup.userId === owner.id);

      if (existingStartup) {
        savedStartup = await userService.updateStartupProfile(existingStartup.id, updatedFields, currentUser);
      } else {
        savedStartup = await userService.createStartup(
          {
            userId: owner.id,
            ...updatedFields,
          },
          currentUser
        );
      }
    }

    setStartups((prev) => [
      savedStartup,
      ...prev.filter(
        (startup) =>
          startup.id !== savedStartup.id &&
          startup.id !== startupId &&
          startup.userId !== savedStartup.userId
      ),
    ]);
    logActivity("PROFILE_UPDATED", `Startup profile updated by ${currentUser.name}`);
    return savedStartup;
  };

  // Reset to initial demo state
  const resetDemoState = () => {
    localStorage.removeItem("innoprocure_user");
    localStorage.removeItem("innoprocure_users");
    localStorage.removeItem("innoprocure_startups");
    localStorage.removeItem("innoprocure_challenges");
    localStorage.removeItem("innoprocure_applications");
    localStorage.removeItem("innoprocure_pilots");
    localStorage.removeItem("innoprocure_activities");

    setCurrentUser(initialUsers[0]);
    setUsers(initialUsers);
    setStartups(initialStartups);
    setChallenges(initialChallenges);
    setApplications(initialApplications);
    setPilots(initialPilots);
    setActivities(initialActivities);
    setIsPublicView(false);
  };

  const value = {
    currentUser,
    setCurrentUser,
    switchRole,
    isPublicView,
    setIsPublicView,
    users,
    startups,
    challenges,
    applications,
    pilots,
    activities,
    notifications,

    // Actions
    createChallenge,
    submitApplication,
    scoreApplication,
    shortlistStartup,
    submitMilestoneEvidence,
    verifyMilestone,
    releasePayment,
    makeFinalDecision,
    addUser,
    updateStartupProfile,
    resetDemoState,
    logActivity,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
