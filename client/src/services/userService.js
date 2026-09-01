import { apiRequest } from "./api";

export const userService = {
  async getUsers() {
    return apiRequest("/api/users");
  },

  async addUser(userData) {
    return apiRequest("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
};