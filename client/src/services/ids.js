export function isMongoId(value) {
  return /^[a-fA-F0-9]{24}$/.test(String(value || ""));
}

export function toId(value) {
  if (!value) {
    return "";
  }

  if (typeof value === "object") {
    return String(value._id || value.id || "");
  }

  return String(value);
}
