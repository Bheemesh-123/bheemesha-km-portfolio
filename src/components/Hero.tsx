"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Sparkles } from "lucide-react";
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
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/30"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            x: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ── Hero Component ──────────────────────────────────────────── */
export default function Hero() {
  const roles = [
    "Apprentice Data Scientist",
    "ML / DL Enthusiast",
    "Computer Vision Explorer",
    "AI Solutions Builder",
  ];
  const typed = useTypewriter(roles, 60, 2200);
  const lines = profile.hero.subtitle.split("\n");

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-gradient-from/20 to-gradient-to/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-gradient-to/15 to-gradient-from/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 dark:opacity-20" />

      {/* Floating particles */}
      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Available for opportunities
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-foreground">{profile.hero.headline}</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div {...fadeUp(0.2)} className="mt-4 h-8 sm:h-10">
          <p className="text-xl sm:text-2xl font-semibold text-gradient">
            {typed}
            <span className="animate-pulse text-primary">|</span>
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.div {...fadeUp(0.3)} className="mt-6 space-y-1">
          {lines.map((line, i) => (
            <p
              key={i}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {line}
            </p>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.45)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            View Projects
            <ArrowDown className="h-4 w-4 transition-transform group-hover/btn:translate-y-0.5" />
          </a>
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-foreground shadow hover:bg-card hover:border-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="rounded-full border border-border bg-card/80 backdrop-blur-sm p-3.5 text-foreground shadow hover:bg-card hover:border-primary/40 hover:text-primary transition-all hover:scale-[1.05] active:scale-[0.95]"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="rounded-full border border-border bg-card/80 backdrop-blur-sm p-3.5 text-foreground shadow hover:bg-card hover:border-primary/40 hover:text-primary transition-all hover:scale-[1.05] active:scale-[0.95]"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1.5"
          >
            <motion.div className="h-2 w-1 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
