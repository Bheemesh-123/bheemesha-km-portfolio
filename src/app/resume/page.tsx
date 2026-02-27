import { profile } from "@/data/profile";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  BookOpen,
  Trophy,
  ArrowLeft,
  Download,
  ArrowUpRight,
  Star,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name} — ${profile.role}`,
};

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        {/* Resume Card */}
        <div className="rounded-2xl border border-border bg-card shadow-xl shadow-primary/5 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] px-6 sm:px-10 py-12 text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold text-white/90 mb-4 backdrop-blur-sm">
                <Star className="h-3 w-3" />
                Apprentice Data Scientist
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{profile.name}</h1>
              <p className="mt-2 text-lg font-medium text-white/80">{profile.role}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/80">
                <span className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile.location}
                </span>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                  {profile.email}
                </a>
                <a href={`tel:${profile.phone}`} className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Phone className="h-3.5 w-3.5" />
                  {profile.phone}
                </a>
              </div>
              <div className="mt-3 flex gap-2">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm text-white/80 hover:bg-white/20 hover:text-white transition-all">
                  <Github className="h-3.5 w-3.5" /> GitHub
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm text-white/80 hover:bg-white/20 hover:text-white transition-all">
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-10 py-10 space-y-10">
            {/* About */}
            <Section icon={BookOpen} title="Summary">
              {profile.about.paragraphs.map((p, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </Section>

            {/* Target Roles */}
            <Section icon={Briefcase} title="Roles I'm Targeting">
              <div className="flex flex-wrap gap-2">
                {profile.targetRoles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full bg-gradient-to-r from-gradient-from/10 to-gradient-to/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </Section>

            {/* Experience */}
            <Section icon={Briefcase} title="Experience">
              {profile.experience.map((exp, idx) => (
                <div key={exp.company} className="mb-5 last:mb-0 relative pl-4 border-l-2 border-primary/20">
                  <div className="absolute left-0 top-1.5 w-2 h-2 -translate-x-[5px] rounded-full bg-gradient-to-br from-gradient-from to-gradient-to" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-card-foreground">{exp.role}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">{exp.period}</span>
                  </div>
                  <p className="text-sm text-primary font-medium mt-0.5">{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
                  <ul className="mt-3 space-y-1.5">
                    {exp.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {exp.status && (
                    <span className="inline-flex items-center gap-1 mt-2 rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 text-xs font-semibold text-green-600 dark:text-green-400">
                      ✓ {exp.status}
                    </span>
                  )}
                </div>
              ))}
            </Section>

            {/* Education */}
            <Section icon={GraduationCap} title="Education">
              {profile.education.map((edu) => (
                <div key={edu.institution} className="pl-4 border-l-2 border-primary/20 relative">
                  <div className="absolute left-0 top-1.5 w-2 h-2 -translate-x-[5px] rounded-full bg-gradient-to-br from-gradient-from to-gradient-to" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-card-foreground">{edu.degree}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">{edu.period}</span>
                  </div>
                  <p className="text-sm text-primary font-medium">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
                    <Star className="h-3 w-3 text-amber-500" />
                    CGPA: <span className="font-semibold text-card-foreground">{edu.cgpa}</span>
                  </p>
                </div>
              ))}
            </Section>

            {/* Skills */}
            <Section icon={Code2} title="Skills">
              <div className="space-y-4">
                {profile.skills.map((group) => (
                  <div key={group.category}>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                      {group.category}
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary/70">
                        {group.items.length}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Projects */}
            <Section icon={Code2} title="Projects">
              {profile.projects.map((project) => (
                <div key={project.title} className="mb-5 last:mb-0 rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-card-foreground">{project.title}</h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{project.description}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </Section>

            {/* Certifications */}
            <Section icon={Award} title="Certifications">
              <div className="space-y-2.5">
                {profile.certifications.map((cert, idx) => (
                  <div key={cert.title} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gradient-from to-gradient-to text-[10px] font-bold text-white mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{cert.title}</p>
                      {cert.link && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-0.5">
                          View credential <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Extras */}
            <Section icon={Trophy} title="Extracurricular & Coursework">
              <div className="space-y-3">
                {profile.extras.extracurricular.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to" />
                    {item}
                  </div>
                ))}
                <div className="pt-2 border-t border-border">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                    <BookOpen className="h-3 w-3" />
                    Relevant Coursework
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.extras.coursework.map((c) => (
                      <span key={c} className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>
          </div>

          {/* Footer CTA */}
          <div className="border-t border-border px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-muted/50 to-transparent">
            <p className="text-sm text-muted-foreground">
              Want a PDF copy? Drop your resume.pdf into the{" "}
              <code className="rounded-lg bg-accent px-2 py-0.5 text-xs font-mono font-bold">public/</code>{" "}
              folder.
            </p>
            <a
              href={`mailto:${profile.email}?subject=Resume Request`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="h-4 w-4" />
              Request Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable section ─────────────────────────────────────────── */
function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gradient-from/10 to-gradient-to/10 border border-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-lg font-bold text-card-foreground">{title}</h2>
      </div>
      <div className="space-y-2 pl-11">{children}</div>
    </div>
  );
}
