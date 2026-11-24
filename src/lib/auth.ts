import jwt, { type JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { database } from "./database";

const COOKIE_NAME = "token";
const AUTH_MAX_AGE = 30 * 24 * 60 * 60;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error("JWT_SECRET must have at least 32 characters.");
  return secret;
}

export async function setAuthCookie(userId: string) {
  const token = jwt.sign({}, getJwtSecret(), {
    algorithm: "HS256", subject: userId, expiresIn: AUTH_MAX_AGE,
  });
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", path: "/", maxAge: AUTH_MAX_AGE,
  });
}

export async function getAuthenticatedUser() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const secret = getJwtSecret();
  let claims: string | JwtPayload;
  try {
    claims = jwt.verify(token, secret, { algorithms: ["HS256"] });
  } catch {
    return null;
  }
  if (typeof claims === "string" || !claims.sub) return null;
  return database.user.findUnique({ where: { id: claims.sub } });
}
