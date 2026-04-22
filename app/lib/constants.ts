// lib/constants.ts
export const AUTH_URL =
  process.env.NODE_ENV === "production"
    ? "https://auth.greenlight-quiz.vercel.app"
    : "http://auth.localhost:3000";
