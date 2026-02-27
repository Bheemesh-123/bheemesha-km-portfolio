"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Sparkles, MapPin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

/* ── Typewriter hook ─────────────────────────────────────────── */
function useTypewriter(texts: string[], speed = 50, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, index, texts, speed, pause]);

  return display;
}

/* ── Floating particles ──────────────────────────────────────── */
function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x1: `${Math.random() * 100}%`,
        y1: `${Math.random() * 100}%`,
        x2: `${Math.random() * 100}%`,
        y2: `${Math.random() * 100}%`,
        x3: `${Math.random() * 100}%`,
        y3: `${Math.random() * 100}%`,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 20 + 15,
        size: Math.random() > 0.7 ? "h-1.5 w-1.5" : "h-1 w-1",
        opacity: Math.random() > 0.5 ? "bg-primary/30" : "bg-gradient-accent/20",
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.size} rounded-full ${p.opacity}`}
          initial={{ x: p.x1, y: p.y1, scale: p.scale }}
          animate={{ y: [p.y1, p.y2, p.y3], x: [p.x1, p.x2, p.x3] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ── Hero Component ──────────────────────────────────────────── */
export default function Hero() {
  const roles = [
    "Apprentice Data Scientist",
    "Junior Data Scientist",
    "Data Scientist",
    "AI / Machine Learning Engineer",
    "Data Analyst",
    "Data Engineer",
    "ML / DL Enthusiast",
    "Computer Vision Explorer",
    "AI Solutions Builder",
  ];
  const typed = useTypewriter(roles, 55, 1800);
  const lines = profile.hero.subtitle.split("\n");

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Mesh gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-mesh" />

      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-gradient-from/20 to-gradient-to/10 blur-[100px]"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-gradient-to/15 to-gradient-accent/10 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 h-[350px] w-[350px] rounded-full bg-gradient-accent/5 blur-[80px]"
          animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 dark:opacity-15" />

      {/* Floating particles */}
      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0)} className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-xs font-semibold text-primary backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Open to Data Scientist, ML Engineer &amp; Analyst roles
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-foreground">Hi, I&apos;m </span>
          <span className="text-gradient">{profile.name.split(" ")[0]}</span>
          <motion.span
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: [0, 20, -10, 20, 0] }}
            transition={{ delay: 0.8, duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block ml-2 origin-bottom-right"
          >
            👋
          </motion.span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div {...fadeUp(0.2)} className="mt-5 h-9 sm:h-12">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-accent">
            {typed}
            <span className="animate-pulse text-gradient-accent">|</span>
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.div {...fadeUp(0.3)} className="mt-6 space-y-1.5">
          {lines.map((line, i) => (
            <p
              key={i}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {line}
            </p>
          ))}
        </motion.div>

        {/* Location + Email mini badges */}
        <motion.div {...fadeUp(0.4)} className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {profile.location.split(",")[0]}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
            <Mail className="h-3.5 w-3.5 text-primary" />
            {profile.email}
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group/btn relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.03] active:scale-[0.97]"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to opacity-0 blur-lg transition-opacity group-hover/btn:opacity-50" />
            <span className="relative flex items-center gap-2">
              View Projects
              <ArrowDown className="h-4 w-4 transition-transform group-hover/btn:translate-y-0.5" />
            </span>
          </a>
          <a
            href={profile.resumePath}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-foreground shadow-sm hover:bg-card hover:border-primary/40 hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="rounded-full border border-border bg-card/80 backdrop-blur-sm p-3.5 text-foreground shadow-sm hover:bg-card hover:border-primary/40 hover:text-primary transition-all hover:scale-[1.08] active:scale-[0.95] hover:shadow-md"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-full border border-border bg-card/80 backdrop-blur-sm p-3.5 text-foreground shadow-sm hover:bg-card hover:border-primary/40 hover:text-primary transition-all hover:scale-[1.08] active:scale-[0.95] hover:shadow-md"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-20"
        >
          <a href="#about" className="inline-flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/20 p-1.5"
            >
              <motion.div className="h-2 w-1 rounded-full bg-primary" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
