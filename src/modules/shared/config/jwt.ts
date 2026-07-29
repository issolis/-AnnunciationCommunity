const secret = process.env.JWT_SECRET_KEY;

if (!secret) throw new Error("JWT_SECRET_KEY is not configured");

export const jwtSecret = secret;