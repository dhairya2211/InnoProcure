/**
 * Challenge Service - Service abstraction layer for Challenge operations.
 * Future Backend Developer: Replace mock implementations here with `api.get('/challenges')` etc.
 */

export const mockChallengeService = {
  async getChallenges(context) {
    return context.challenges;
  },

  async getChallengeById(context, id) {
    return context.challenges.find((c) => c.id === id) || null;
  },

  async createChallenge(context, challengeData) {
    return context.createChallenge(challengeData);
  },
};
