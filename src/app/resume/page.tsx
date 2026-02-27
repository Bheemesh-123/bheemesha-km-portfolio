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
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
        </div>

        {/* Resume Card */}
        <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] px-6 sm:px-10 py-10 text-white">
            <h1 className="text-3xl sm:text-4xl font-extrabold">{profile.name}</h1>
            <p className="mt-1 text-lg font-medium text-white/90">{profile.role}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </span>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
              <a href={`tel:${profile.phone}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                {profile.phone}
              </a>
            </div>
            <div className="mt-3 flex gap-3">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="px-6 sm:px-10 py-8 space-y-8">
            {/* About */}
            <Section icon={BookOpen} title="Summary">
              {profile.about.paragraphs.map((p, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </Section>

            {/* Experience */}
            <Section icon={Briefcase} title="Experience">
              {profile.experience.map((exp) => (
                <div key={exp.company} className="mb-4 last:mb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-card-foreground">{exp.role}</h3>
                    <span className="text-xs text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-sm text-primary font-medium">{exp.company}</p>
                  <ul className="mt-2 space-y-1">
                    {exp.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>

            {/* Education */}
            <Section icon={GraduationCap} title="Education">
              {profile.education.map((edu) => (
                <div key={edu.institution}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-card-foreground">{edu.degree}</h3>
                    <span className="text-xs text-muted-foreground">{edu.period}</span>
                  </div>
                  <p className="text-sm text-primary font-medium">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">CGPA: {edu.cgpa}</p>
                </div>
              ))}
            </Section>

            {/* Skills */}
            <Section icon={Code2} title="Skills">
              <div className="space-y-3">
                {profile.skills.map((group) => (
                  <div key={group.category}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      {group.category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
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
                <div key={project.title} className="mb-4 last:mb-0">
                  <h3 className="font-bold text-card-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs text-primary font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </Section>

            {/* Certifications */}
            <Section icon={Award} title="Certifications">
              <ul className="space-y-1.5">
                {profile.certifications.map((cert) => (
                  <li key={cert.title} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    {cert.title}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Extras */}
            <Section icon={Trophy} title="Extracurricular & Coursework">
              <div className="space-y-2">
                {profile.extras.extracurricular.map((item) => (
                  <p key={item} className="text-sm text-muted-foreground">• {item}</p>
                ))}
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-3 mb-1">
                  Relevant Coursework
                </p>
                <p className="text-sm text-muted-foreground">
                  {profile.extras.coursework.join(" • ")}
                </p>
              </div>
            </Section>
          </div>

          {/* Footer CTA */}
          <div className="border-t border-border px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/30">
            <p className="text-sm text-muted-foreground">
              Want a PDF copy? Drop your resume.pdf into the{" "}
              <code className="rounded bg-accent px-1.5 py-0.5 text-xs font-mono">public/</code>{" "}
              folder.
            </p>
            <a
              href={`mailto:${profile.email}?subject=Resume Request`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] px-5 py-2.5 text-sm font-semibold text-white shadow hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
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
      <div className="flex items-center gap-2.5 mb-4">
        <Icon className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-card-foreground">{title}</h2>
      </div>
      <div className="space-y-2 pl-7">{children}</div>
    </div>
  );
}
