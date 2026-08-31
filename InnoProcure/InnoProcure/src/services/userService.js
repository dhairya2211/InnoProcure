/**
 * User Service - Service abstraction layer for User & Startup profile management.
 */

export const mockUserService = {
  async getUsers(context) {
    return context.users;
  },

  async getStartups(context) {
    return context.startups;
  },

  async addUser(context, userData) {
    return context.addUser(userData);
  },

  async updateStartupProfile(context, startupId, profileData) {
    return context.updateStartupProfile(startupId, profileData);
  },
};
