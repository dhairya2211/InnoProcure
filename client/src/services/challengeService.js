import { apiRequest } from "./api";

export const challengeService = {
  async getChallenges() {
    return apiRequest("/api/challenges");
  },

  async getChallengeById(id) {
    return apiRequest(`/api/challenges/${id}`);
  },

  async createChallenge(challengeData) {
    return apiRequest("/api/challenges", {
      method: "POST",
      body: JSON.stringify(challengeData),
    });
  },

  async updateChallenge(id, challengeData) {
    return apiRequest(`/api/challenges/${id}`, {
      method: "PATCH",
      body: JSON.stringify(challengeData),
    });
  },
};