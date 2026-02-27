"use client";

import { Github, Linkedin, Mail, Heart, Phone } from "lucide-react";
import { profile } from "@/data/profile";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card overflow-hidden">
      {/* Gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-gradient">
              {profile.name.split(" ")[0]}.
            </p>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs">
              {profile.role} based in {profile.location.split(",")[0]}. Passionate about building AI-driven solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {profile.phone}
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full p-2 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full p-2 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="rounded-full p-2 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            © {currentYear} {profile.name}. Built with
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            using Next.js &amp; Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
