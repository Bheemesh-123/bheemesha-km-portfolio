import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Contact form API route — sends email via Gmail SMTP using Nodemailer.
 *
 * HOW TO SET UP:
 * 1. Go to https://myaccount.google.com/security
 * 2. Enable 2-Step Verification (required for App Passwords)
 * 3. Go to https://myaccount.google.com/apppasswords
 * 4. Create an App Password (select "Mail" and your device)
 * 5. Copy the 16-character password (e.g. "abcd efgh ijkl mnop")
 * 6. Set these environment variables:
 *    - SMTP_EMAIL=your-gmail@gmail.com
 *    - SMTP_PASSWORD=your-16-char-app-password
 *    - Locally: add to .env.local
 *    - On Vercel: Settings → Environment Variables
 */

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // ── Validate ──────────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { ok: false, error: "All fields are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }
    if (message.trim().length < 10) {
      return NextResponse.json(
        { ok: false, error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    // ── Check env vars ────────────────────────────────────────
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpEmail || !smtpPassword) {
      console.error("SMTP_EMAIL or SMTP_PASSWORD not set in environment variables.");
      return NextResponse.json(
        { ok: false, error: "Email service is not configured. Please contact me directly." },
        { status: 500 }
      );
    }

    // ── Create SMTP transporter (Gmail) ───────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });

    // ── Send the email ────────────────────────────────────────
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${smtpEmail}>`,
      to: smtpEmail, // you receive the message
      replyTo: `"${name}" <${email}>`, // reply goes to the sender
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">New Message from Portfolio</h2>
          <hr style="border: 1px solid #e5e7eb;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: 1px solid #e5e7eb;" />
          <h3>Message:</h3>
          <p style="white-space: pre-wrap; background: #f9fafb; padding: 16px; border-radius: 8px;">${message}</p>
          <hr style="border: 1px solid #e5e7eb;" />
          <p style="font-size: 12px; color: #9ca3af;">
            Sent from your portfolio contact form. Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
