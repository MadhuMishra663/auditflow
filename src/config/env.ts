// config/env.ts

export const USE_MOCK =
  process.env.NODE_ENV !== "production" &&
  process.env.NEXT_PUBLIC_USE_MOCK_API === "false";
