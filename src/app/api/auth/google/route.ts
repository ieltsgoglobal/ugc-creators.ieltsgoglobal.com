import { OAuth2Client } from "google-auth-library";
import { NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/auth";
import { database } from "@/lib/database";

export async function POST(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site" ||
      !request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ error: "Invalid sign-in request." }, { status: 403 });
  }
  const body = await request.json().catch(() => null);
  if (typeof body?.credential !== "string" || !body.credential) {
    return NextResponse.json({ error: "Google credential is required." }, { status: 400 });
  }
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "Google sign-in is not configured." }, { status: 503 });
  }
  const client = new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({ idToken: body.credential, audience: clientId }).catch(() => null);
  const account = ticket?.getPayload();
  if (!account?.sub || !account.email || !account.email_verified) {
    return NextResponse.json({ error: "Google sign-in could not be verified." }, { status: 401 });
  }
  const email = account.email.trim().toLowerCase();
  const name = account.name?.trim() || email.split("@")[0];
  const user = await database.user.upsert({
    where: { googleSub: account.sub },
    create: { googleSub: account.sub, email, name },
    update: { email, name },
  });
  await setAuthCookie(user.id);
  return NextResponse.json({ success: true });
}
