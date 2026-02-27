"use client";

import { Github, Linkedin, Mail, Heart, Phone, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: profile.github, label: "GitHub" },
  { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card overflow-hidden">
      {/* Gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Subtle mesh background */}
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-2xl font-extrabold">
              <span className="text-gradient">{profile.name.split(" ")[0]}</span>
              <span className="text-primary">.</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs leading-relaxed">
              {profile.role} based in {profile.location.split(",")[0]}. Passionate about building AI-driven solutions and practical data systems.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground bg-muted/50 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                  </div>
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone}`}
                  className="inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                  </div>
                  {profile.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            © {currentYear} {profile.name}. Built with
            <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
            using Next.js &amp; Tailwind CSS.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Designed & Developed by Bheemesha K M
          </p>
        </div>
      </div>
    </footer>
  );
}
