"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Layers, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  tagline: string;
  description: string;
  bullets: readonly string[];
  tech: readonly string[];
  repoUrl: string | null;
  demoUrl: string | null;
  index?: number;
}

export default function ProjectCard({
  title,
  tagline,
  description,
  bullets,
  tech,
  repoUrl,
  demoUrl,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden",
        "transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2",
        "gradient-border"
      )}
    >
      {/* Gradient top border accent — always visible subtle, brighter on hover */}
      <div className="h-1 bg-gradient-to-r from-gradient-from via-gradient-to to-gradient-accent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" />

      <div className="relative p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gradient-from/10 to-gradient-to/10 group-hover:from-gradient-from/20 group-hover:to-gradient-to/20 transition-colors ring-1 ring-primary/10 group-hover:ring-primary/30">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-card-foreground group-hover:text-gradient transition-colors leading-tight">
              {title}
            </h3>
            <p className="mt-0.5 text-xs italic text-muted-foreground">
              {tagline}
            </p>
          </div>
          <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground/0 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0" />
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Bullets */}
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to" />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>

        {/* Tech */}
        <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground transition-all duration-200 group-hover:border-primary/20 group-hover:text-accent-foreground group-hover:bg-accent/80"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        {(repoUrl || demoUrl) && (
          <div className="mt-4 flex gap-2 pt-4 border-t border-border">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted hover:border-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Github className="h-3.5 w-3.5" />
                Code
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-gradient-from/10 to-gradient-to/10 px-3.5 py-2 text-xs font-semibold text-primary hover:from-gradient-from/20 hover:to-gradient-to/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
