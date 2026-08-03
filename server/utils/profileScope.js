export const PROFILE_TYPES = ["personal", "business"];
export const DEFAULT_PROFILE_TYPE = "personal";

export const normalizeProfileType = (value) => {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  return PROFILE_TYPES.includes(normalized) ? normalized : null;
};

export const resolveProfileType = (user, requestedProfileType) => {
  const fromRequest = normalizeProfileType(requestedProfileType);
  if (requestedProfileType !== undefined && fromRequest === null) {
    return null;
  }

  const fromUser = normalizeProfileType(user?.activeProfileType);
  return fromRequest || fromUser || DEFAULT_PROFILE_TYPE;
};
