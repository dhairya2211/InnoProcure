/**
 * Application Service - Service abstraction layer for Startup Proposal Applications.
 * Future Backend Developer: Replace mock implementations here with `api.post('/applications')` etc.
 */

export const mockApplicationService = {
  async getApplications(context) {
    return context.applications;
  },

  async getApplicationsByChallenge(context, challengeId) {
    return context.applications.filter((a) => a.challengeId === challengeId);
  },

  async getApplicationsByStartup(context, startupId) {
    return context.applications.filter((a) => a.startupId === startupId);
  },

  async submitApplication(context, appData) {
    return context.submitApplication(appData);
  },

  async scoreApplication(context, appId, score, comments) {
    return context.scoreApplication(appId, score, comments);
  },

  async shortlistStartup(context, appId) {
    return context.shortlistStartup(appId);
  },
};
