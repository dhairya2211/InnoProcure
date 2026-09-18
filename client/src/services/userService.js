import { apiClient } from "./apiClient";
import { isMongoId, toId } from "./ids";

const DEFAULT_PASSWORD = "InnoProcure@123";
const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

function toStringArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function mapUserFromApi(user) {
  if (!user) {
    return null;
  }

  return {
    ...user,
    id: toId(user._id || user.id),
    avatar: user.avatar || DEFAULT_AVATAR,
  };
}

export function mapStartupFromApi(startup) {
  if (!startup) {
    return null;
  }

  const owner = typeof startup.userId === "object" && startup.userId ? startup.userId : null;

  return {
    ...startup,
    id: toId(startup._id || startup.id),
    userId: toId(startup.userId),
    companyName: startup.companyName || "",
    capabilities: Array.isArray(startup.capabilities) ? startup.capabilities : [],
    technologyAreas: Array.isArray(startup.technologyAreas) ? startup.technologyAreas : [],
    contactEmail: startup.contactEmail || owner?.email || "",
  };
}

function toStartupPayload(profileData, currentUser) {
  const payload = {
    companyName: profileData.companyName,
    dpiitNumber: profileData.dpiitNumber,
    foundingYear: profileData.foundingYear,
    headquarters: profileData.headquarters,
    shortDescription: profileData.shortDescription,
    pastExperience: profileData.pastExperience,
    website: profileData.website,
    contactEmail: profileData.contactEmail || currentUser?.email,
    contactPhone: profileData.contactPhone,
  };

  if (profileData.capabilities !== undefined) {
    payload.capabilities = toStringArray(profileData.capabilities);
  }

  if (profileData.technologyAreas !== undefined) {
    payload.technologyAreas = toStringArray(profileData.technologyAreas);
  }

  if (profileData.teamSize !== undefined && profileData.teamSize !== "") {
    payload.teamSize = Number(profileData.teamSize);
  }

  return payload;
}

export const userService = {
  async getUsers() {
    const users = await apiClient.get("/api/users");
    return Array.isArray(users) ? users.map(mapUserFromApi) : [];
  },

  async createUser(userData) {
    const created = await apiClient.post("/api/users", {
      name: userData.name,
      email: userData.email,
      password: userData.password || DEFAULT_PASSWORD,
      role: userData.role,
      department: userData.department,
      designation: userData.designation,
      avatar: userData.avatar || DEFAULT_AVATAR,
    });

    return mapUserFromApi(created);
  },

  async getStartups() {
    const startups = await apiClient.get("/api/startups");
    return Array.isArray(startups) ? startups.map(mapStartupFromApi) : [];
  },

  async createStartup(startupData, currentUser) {
    const created = await apiClient.post("/api/startups", {
      userId: startupData.userId,
      ...toStartupPayload(startupData, currentUser),
    });

    return mapStartupFromApi(created);
  },

  async updateStartupProfile(startupId, profileData, currentUser) {
    if (!isMongoId(startupId)) {
      throw new Error("Invalid startup ID");
    }

    const updated = await apiClient.patch(
      `/api/startups/profile?startupId=${encodeURIComponent(startupId)}`,
      toStartupPayload(profileData, currentUser)
    );

    return mapStartupFromApi(updated);
  },
};
