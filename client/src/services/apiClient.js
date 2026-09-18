const API_BASE = import.meta.env.VITE_API_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const details = payload.details || (payload.missingFields && payload.missingFields.join(", "));
    const message = details ? `${payload.message || "Request failed"}: ${details}` : (payload.message || "Request failed");
    throw new Error(message);
  }

  return payload;
}

export const apiClient = {
  get(path) {
    return request(path);
  },
  post(path, body) {
    return request(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
};
