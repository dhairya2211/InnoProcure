/**
 * Pilot Service - Service abstraction layer for Pilot Projects & Milestone Verifications.
 * Future Backend Developer: Replace mock implementations here with `api.get('/pilots')` etc.
 */

export const mockPilotService = {
  async getPilots(context) {
    return context.pilots;
  },

  async getPilotById(context, pilotId) {
    return context.pilots.find((p) => p.id === pilotId) || null;
  },

  async submitMilestoneEvidence(context, pilotId, milestoneId, evidenceNotes, fileName) {
    return context.submitMilestoneEvidence(pilotId, milestoneId, evidenceNotes, fileName);
  },

  async verifyMilestone(context, pilotId, milestoneId, isApproved, comments) {
    return context.verifyMilestone(pilotId, milestoneId, isApproved, comments);
  },

  async releasePayment(context, pilotId, milestoneId) {
    return context.releasePayment(pilotId, milestoneId);
  },

  async makeFinalDecision(context, pilotId, decision, comments, scaledDepartments) {
    return context.makeFinalDecision(pilotId, decision, comments, scaledDepartments);
  },
};
