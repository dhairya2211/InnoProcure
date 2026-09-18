import { apiClient } from "./apiClient";

export function parseBudgetAmount(value) {
  if (typeof value === "number") {
    return value;
  }

  const parsed = Number(String(value ?? "").replace(/,/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function formatBudgetAmount(value) {
  return parseBudgetAmount(value).toLocaleString("en-IN");
}

export function mapChallengeFromApi(challenge) {
  if (!challenge) {
    return null;
  }

  const createdAt = challenge.createdAt || challenge.createdDate;

  return {
    ...challenge,
    id: challenge.id || challenge._id,
    budget: formatBudgetAmount(challenge.budget),
    createdDate: typeof createdAt === "string" ? createdAt.split("T")[0] : new Date().toISOString().split("T")[0],
    applicationsCount: challenge.applicationsCount ?? 0,
    createdBy: challenge.createdBy?.name || challenge.createdBy || "",
    requiredCapabilities: Array.isArray(challenge.requiredCapabilities) ? challenge.requiredCapabilities : [],
  };
}

function toCreatePayload(challengeData, currentUser) {
  const requiredCapabilities = Array.isArray(challengeData.requiredCapabilities)
    ? challengeData.requiredCapabilities
    : String(challengeData.requiredCapabilities || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  return {
    title: challengeData.title,
    department: challengeData.department || currentUser?.department || "",
    category: challengeData.category,
    problemStatement: challengeData.problemStatement,
    desiredOutcome: challengeData.desiredOutcome,
    measurableOutcomeTarget: challengeData.measurableOutcomeTarget,
    budget: parseBudgetAmount(challengeData.budget),
    timelineDays: parseInt(challengeData.timelineDays, 10) || 90,
    applicationDeadline: challengeData.applicationDeadline || undefined,
    dataSensitivity: challengeData.dataSensitivity || "LOW",
    requiredCapabilities,
  };
}

export const challengeService = {
  async getChallenges() {
    const challenges = await apiClient.get("/api/challenges");
    return Array.isArray(challenges) ? challenges.map(mapChallengeFromApi) : [];
  },

  async createChallenge(challengeData, currentUser) {
    const created = await apiClient.post("/api/challenges", toCreatePayload(challengeData, currentUser));
    return mapChallengeFromApi(created);
  },
};
