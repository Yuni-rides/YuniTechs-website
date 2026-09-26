import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ContactPayload = {
  services?: unknown;
  budget?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  message?: unknown;
};

const MAX_LEN = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_LEN) : "";
}

function asLine(value: unknown): string {
  return asText(value)
    .replace(/\p{Cc}+/gu, " ")
    .trim()
    .slice(0, 200);
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("SMTP timed out")), ms),
    ),
  ]);
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = asLine(body.name);
  const email = asLine(body.email);
  const message = asText(body.message);
  const phone = asLine(body.phone);
  const company = asLine(body.company);
  const budget = asLine(body.budget);
  const services = Array.isArray(body.services)
    ? body.services.map(asLine).filter(Boolean).slice(0, 20)
    : [];

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "Name, email and message are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const host = requiredEnv("SMTP_HOST");
    const port = Number(process.env.SMTP_PORT ?? 465);
    const user = requiredEnv("SMTP_USER");
    const pass = requiredEnv("SMTP_PASS");
    const to = process.env.CONTACT_TO_EMAIL ?? user;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 15000,
    });

    const row = (label: string, value: string) =>
      value
        ? `<tr><td style="padding:6px 0;font-weight:bold;width:35%;color:#4A4A6A;">${label}</td><td style="color:#091D40;">${esc(value)}</td></tr>`
        : "";

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #E6ECFA;border-radius:12px;background-color:#ffffff;">
        <h2 style="color:#091D40;border-bottom:2px solid #2979FF;padding-bottom:10px;">New Contact Form Submission</h2>

        <h3 style="color:#2979FF;margin-top:20px;">Sender Details</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${row("Name", name)}
          ${row("Email", email)}
          ${row("Phone", phone)}
          ${row("Company", company)}
          ${row("Estimated Budget", budget)}
          ${row("Services", services.join(", "))}
        </table>

        <h3 style="color:#2979FF;margin-top:20px;">Message</h3>
        <div style="background-color:#F5F8FF;padding:15px;border-radius:8px;border:1px solid #DDE6FA;color:#091D40;font-size:13px;line-height:1.6;white-space:pre-line;">${esc(message)}</div>
      </div>
    `;

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      company && `Company: ${company}`,
      budget && `Estimated Budget: ${budget}`,
      services.length > 0 && `Services: ${services.join(", ")}`,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    await withTimeout(
      transporter.sendMail({
        from: `"${siteConfig.name} Website" <${user}>`,
        to,
        replyTo: `"${name}" <${email}>`,
        subject: `New contact form submission from ${name}`,
        text,
        html,
      }),
      20000,
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form dispatch failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send your message." },
      { status: 500 },
    );
  }
}
