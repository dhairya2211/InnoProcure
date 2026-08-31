/**
 * Activity Service - Audit trail logging service abstraction.
 */

export const mockActivityService = {
  async getActivities(context) {
    return context.activities;
  },

  async logActivity(context, action, details) {
    return context.logActivity(action, details);
  },
};
