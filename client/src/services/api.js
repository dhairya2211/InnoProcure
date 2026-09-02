const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export async function apiRequest(endpoint, options = {}) {
  console.log(
    "API REQUEST:",
    options.method || "GET",
    `${API_BASE_URL}${endpoint}`
  );

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  console.log("API RESPONSE:", response.status, endpoint);

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "API request failed");
  }

  return data;
}