"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, Layers, ArrowLeft, Sparkles, SlidersHorizontal } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [activeTechs, setActiveTechs] = useState<string[]>([]);

  // Gather all unique tech tags
  const allTechs = useMemo(() => {
    const set = new Set<string>();
    profile.projects.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const toggleTech = (tech: string) => {
    setActiveTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const filtered = useMemo(() => {
    return profile.projects.filter((p) => {
      const q = search.toLowerCase();
      const techArr = p.tech as readonly string[];
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        techArr.some((t) => t.toLowerCase().includes(q));
      const matchesTech =
        activeTechs.length === 0 ||
        activeTechs.some((at) => techArr.includes(at));
      return matchesSearch && matchesTech;
    });
  }, [search, activeTechs]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-4 mb-2"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-from/10 to-gradient-to/10 border border-primary/10">
            <Layers className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              All Projects
            </h1>
            <p className="mt-0.5 text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Browse and filter my work — {profile.projects.length} projects
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-4 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)]"
        />

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 relative group"
        >
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search by title or tech…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-border bg-card pl-11 pr-10 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm focus:shadow-lg focus:shadow-primary/5"
            aria-label="Search projects"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Filter by technology
            </span>
            {activeTechs.length > 0 && (
              <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs font-bold text-primary">
                {activeTechs.length} active
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTechs.map((tech) => {
              const active = activeTechs.includes(tech);
              return (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 border",
                    active
                      ? "bg-gradient-to-r from-gradient-from to-gradient-to text-white border-transparent shadow-md shadow-primary/20"
                      : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground hover:shadow-sm"
                  )}
                >
                  {tech}
                </button>
              );
            })}
            {activeTechs.length > 0 && (
              <button
                onClick={() => setActiveTechs([])}
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-red-500 border border-red-500/30 hover:bg-red-500/10 transition-all"
              >
                Clear all
              </button>
            )}
          </div>
        </motion.div>

        {/* Results */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-4">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">
              No projects match your search.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Try different keywords or clear filters.
            </p>
          </motion.div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} {...project} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
