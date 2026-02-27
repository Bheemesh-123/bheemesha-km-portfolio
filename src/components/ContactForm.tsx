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
  ArrowUpRight,
  Phone,
  MessageSquare,
  Sparkles,
  User,
  AtSign,
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
  const [focused, setFocused] = useState<string | null>(null);

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
        mailtoFallback();
      } else {
        mailtoFallback();
      }
    } catch {
      mailtoFallback();
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Form */}
      <div className="lg:col-span-3 group/form relative rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 overflow-hidden">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-from/0 to-gradient-to/0 group-hover/form:from-gradient-from/[0.02] group-hover/form:to-gradient-to/[0.02] transition-all duration-500" />

        <div className="relative">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="relative mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gradient-from to-gradient-to"
                >
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">
                Message Sent!
              </h3>
              <p className="mt-3 text-sm text-muted-foreground max-w-sm leading-relaxed">
                Your email client should have opened. If not, feel free to email me
                directly at{" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="text-primary font-medium hover:underline"
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
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Send another message
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Form header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gradient-from/10 to-gradient-to/10 border border-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-card-foreground">Send me a message</h3>
                  <p className="text-xs text-muted-foreground">I&apos;ll get back to you within 24 hours</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="flex items-center gap-1.5 text-sm font-medium text-card-foreground mb-2"
                  >
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={cn(
                      "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300",
                      errors.name ? "border-red-500" : "border-border",
                      focused === "name" && !errors.name && "shadow-lg shadow-primary/5"
                    )}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="flex items-center gap-1.5 text-sm font-medium text-card-foreground mb-2"
                  >
                    <AtSign className="h-3.5 w-3.5 text-muted-foreground" />
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={cn(
                      "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300",
                      errors.email ? "border-red-500" : "border-border",
                      focused === "email" && !errors.email && "shadow-lg shadow-primary/5"
                    )}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="flex items-center justify-between text-sm font-medium text-card-foreground mb-2"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                    Message <span className="text-red-400">*</span>
                  </span>
                  <span className={cn(
                    "text-xs transition-colors",
                    formData.message.length >= 10 ? "text-green-500" : "text-muted-foreground"
                  )}>
                    {formData.message.length}/500
                  </span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  maxLength={500}
                  value={formData.message}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={cn(
                    "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-y",
                    errors.message ? "border-red-500" : "border-border",
                    focused === "message" && !errors.message && "shadow-lg shadow-primary/5"
                  )}
                  placeholder="Hi Bheemesha, I'd like to…"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all w-full justify-center sm:w-auto hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
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
      whileHover={{ y: -3 }}
      className="group relative flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 overflow-hidden"
    >
      {/* Hover gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-r from-gradient-from/0 to-gradient-to/0 group-hover:from-gradient-from/[0.03] group-hover:to-gradient-to/[0.03] transition-all duration-500" />

      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent group-hover:bg-gradient-to-br group-hover:from-gradient-from/20 group-hover:to-gradient-to/20 transition-all duration-300">
        {icon}
      </div>
      <div className="relative min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-semibold text-card-foreground truncate mt-0.5">
          {value}
        </p>
      </div>
      <ArrowUpRight className="relative ml-auto h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0" />
    </motion.a>
  );
}
