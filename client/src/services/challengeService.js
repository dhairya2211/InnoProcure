import { apiRequest } from "./api";

function mapChallenge(challenge) {
  const id = challenge._id || challenge.id;

  return {
    ...challenge,
    id: id ? String(id) : challenge.id,
    budget:
      typeof challenge.budget === "number"
        ? String(challenge.budget)
        : challenge.budget,
    createdDate:
      challenge.createdDate ||
      (challenge.createdAt ? String(challenge.createdAt).slice(0, 10) : undefined),
    applicationsCount: challenge.applicationsCount ?? 0,
  };
}

export const challengeService = {
  async getChallenges() {
    const data = await apiRequest("/api/challenges");
    return Array.isArray(data) ? data.map(mapChallenge) : [];
  },
};
