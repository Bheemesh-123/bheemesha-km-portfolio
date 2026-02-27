"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Layers } from "lucide-react";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden",
        "transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5"
      )}
    >
      {/* Gradient top border accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gradient-from to-gradient-to opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent group-hover:bg-gradient-to-br group-hover:from-gradient-from/20 group-hover:to-gradient-to/20 transition-colors">
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
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Bullets */}
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Tech */}
        <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-accent-foreground group-hover:bg-accent"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        {(repoUrl || demoUrl) && (
          <div className="mt-4 flex gap-2 pt-3 border-t border-border">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted hover:border-primary/30 transition-colors"
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
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
