// src/app/api/inquiries/route.ts

import { saveInquiry } from "@/db/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, carSlug, message } = (body ?? {}) as Record<
    string,
    unknown
  >;

  if (typeof name !== "string" || name.trim().length < 2 || name.length > 120) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (
    typeof email !== "string" ||
    !EMAIL_RE.test(email) ||
    email.length > 200
  ) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    await saveInquiry({
      name: name.trim(),
      email: email.trim(),
      carSlug:
        typeof carSlug === "string" && carSlug
          ? carSlug.slice(0, 80)
          : undefined,
      message:
        typeof message === "string" ? message.trim().slice(0, 2000) : undefined,
    });
    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[inquiries] failed to save:", (err as Error).message);
    return Response.json(
      {
        error:
          "We couldn't save your request right now. Please try again shortly.",
      },
      { status: 503 },
    );
  }
}
