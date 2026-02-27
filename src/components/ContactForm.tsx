"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Send,
  CheckCircle,
  ArrowRight,
  Phone,
} from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = "Please enter your name.";
    if (!formData.email.trim()) {
      e.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      e.message = "Please enter a message.";
    } else if (formData.message.trim().length < 10) {
      e.message = "Message must be at least 10 characters.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* Opens the user's mail client as a fallback */
  const mailtoFallback = () => {
    const subject = encodeURIComponent(
      `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.open(
      `mailto:${profile.email}?subject=${subject}&body=${body}`,
      "_self"
    );
    setSubmitted(true);
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.ok) {
        setSubmitted(true);
      } else if (data.error === "MAILTO_FALLBACK") {
        // No Web3Forms key configured — use mailto
        mailtoFallback();
      } else {
        // API returned an error, fall back to mailto
        mailtoFallback();
      }
    } catch {
      // Network error — fall back to mailto
      mailtoFallback();
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Form */}
      <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all hover:shadow-lg hover:shadow-primary/5">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-card-foreground">
              Message Sent!
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Your email client should have opened. If not, feel free to email me
              directly at{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-primary underline"
              >
                {profile.email}
              </a>
              .
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", message: "" });
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-5 py-2 text-sm font-medium text-white hover:shadow-md transition-all"
            >
              Send another message
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-card-foreground mb-1.5"
                >
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={cn(
                    "w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all",
                    errors.name ? "border-red-500" : "border-border"
                  )}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-card-foreground mb-1.5"
                >
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={cn(
                    "w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all",
                    errors.email ? "border-red-500" : "border-border"
                  )}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-card-foreground mb-1.5"
              >
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={cn(
                  "w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-y",
                  errors.message ? "border-red-500" : "border-border"
                )}
                placeholder="Hi Bheemesha, I'd like to…"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-7 py-3 text-sm font-semibold text-white shadow hover:shadow-lg hover:shadow-primary/20 transition-all w-full justify-center sm:w-auto hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {sending ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="opacity-75"
                    />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Direct contact cards */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <ContactCard
          icon={<Mail className="h-5 w-5 text-primary" />}
          label="Email"
          value={profile.email}
          href={`mailto:${profile.email}`}
        />
        <ContactCard
          icon={<Phone className="h-5 w-5 text-primary" />}
          label="Phone"
          value={profile.phone}
          href={`tel:${profile.phone}`}
        />
        <ContactCard
          icon={<Linkedin className="h-5 w-5 text-primary" />}
          label="LinkedIn"
          value="Bheemesha K M"
          href={profile.linkedin}
        />
        <ContactCard
          icon={<Github className="h-5 w-5 text-primary" />}
          label="GitHub"
          value="Bheemesh-123"
          href={profile.github}
        />
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent group-hover:bg-gradient-to-br group-hover:from-gradient-from/20 group-hover:to-gradient-to/20 transition-colors">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-semibold text-card-foreground truncate">
          {value}
        </p>
      </div>
      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
    </motion.a>
  );
}
