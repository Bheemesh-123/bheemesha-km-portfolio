import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form API route.
 * Uses Web3Forms (https://web3forms.com) — a free, no-backend form service.
 *
 * HOW TO SET UP:
 * 1. Go to https://web3forms.com
 * 2. Enter your email: bheemesh.k.m8497@gmail.com
 * 3. You'll receive an "access_key" via email
 * 4. Set it as the environment variable WEB3FORMS_KEY
 *    - Locally: add to .env.local  →  WEB3FORMS_KEY=your-key-here
 *    - On Vercel: Settings → Environment Variables → WEB3FORMS_KEY
 *
 * If WEB3FORMS_KEY is not set, the form falls back to mailto: on the client side.
 */

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Validate
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

    const accessKey = process.env.WEB3FORMS_KEY;

    if (!accessKey) {
      // Fallback: no API key configured, tell client to use mailto
      return NextResponse.json(
        { ok: false, error: "MAILTO_FALLBACK" },
        { status: 200 }
      );
    }

    // Submit to Web3Forms
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        from_name: "Portfolio Contact Form",
        subject: `Portfolio Contact from ${name}`,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ ok: true });
    } else {
      console.error("Web3Forms error:", data);
      return NextResponse.json(
        { ok: false, error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
