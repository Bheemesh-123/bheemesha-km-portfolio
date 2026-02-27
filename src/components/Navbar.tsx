"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Extras", href: "#extras" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* Track scroll for backdrop */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Intersection observer — highlight active nav link */
  const observeSections = useCallback(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = observeSections();
    return cleanup;
  }, [observeSections]);

  /* Close mobile menu on resize */
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-border/60 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group relative text-xl font-extrabold text-foreground transition-colors"
        >
          <span className="text-gradient">{profile.name.split(" ")[0]}</span>
          <span className="text-primary">.</span>
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-gradient-from to-gradient-to transition-all duration-300 group-hover:w-full rounded-full" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-accent/60"
                      style={{ zIndex: -1 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-4 py-2 text-sm font-medium text-white shadow hover:shadow-md hover:shadow-primary/20 transition-all hover:scale-[1.03] active:scale-[0.97]"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden rounded-lg p-2 text-foreground hover:bg-muted transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t border-border/60 glass overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      activeSection === link.href.replace("#", "")
                        ? "text-primary bg-accent/60"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.04 }}
              >
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-4 py-2.5 text-sm font-medium text-white justify-center transition-all hover:shadow-md"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
