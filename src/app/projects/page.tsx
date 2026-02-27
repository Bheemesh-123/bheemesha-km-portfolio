"use client";

import { useState, useMemo } from "react";
import { Search, X, Layers, ArrowLeft } from "lucide-react";
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
        <div className="mb-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
            <Layers className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              All Projects
            </h1>
            <p className="mt-0.5 text-muted-foreground">
              Browse and filter all my projects.
            </p>
          </div>
        </div>
        <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)]" />

        {/* Search */}
        <div className="mt-8 relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title or tech…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-card pl-11 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            aria-label="Search projects"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {allTechs.map((tech) => {
            const active = activeTechs.includes(tech);
            return (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors border",
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                )}
              >
                {tech}
              </button>
            );
          })}
          {activeTechs.length > 0 && (
            <button
              onClick={() => setActiveTechs([])}
              className="rounded-full px-3 py-1 text-xs font-medium text-red-500 border border-red-500/30 hover:bg-red-500/10 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              No projects match your search. Try different keywords or clear
              filters.
            </p>
          </div>
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
