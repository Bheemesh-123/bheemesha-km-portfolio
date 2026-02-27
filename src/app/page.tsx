import Hero from "@/components/Hero";
import SectionWrapper from "@/components/SectionWrapper";
import SkillChips from "@/components/SkillChips";
import Timeline from "@/components/Timeline";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import { profile } from "@/data/profile";
import {
  GraduationCap,
  Award,
  Trophy,
  BookOpen,
  ArrowRight,
  ExternalLink,
  MapPin,
  Briefcase,
  Star,
  User,
  Calendar,
  Code2,
  Target,
  Zap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const featuredProjects = profile.projects.filter((p) => p.featured);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <Hero />

      {/* ── About ─────────────────────────────────────────────── */}
      <SectionWrapper id="about" title="About Me" subtitle="Get to know me a little better">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-5">
            {profile.about.paragraphs.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-[1.8] text-[15px]">
                {p}
              </p>
            ))}

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <StatBadge icon={Code2} value="4+" label="Projects" color="from-blue-500/15 to-cyan-500/15" />
              <StatBadge icon={Target} value="9.03" label="CGPA" color="from-emerald-500/15 to-teal-500/15" />
              <StatBadge icon={Zap} value="2" label="Internships" color="from-amber-500/15 to-orange-500/15" />
              <StatBadge icon={Award} value="3" label="Certifications" color="from-violet-500/15 to-purple-500/15" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3">
              {profile.about.quickFacts.map((fact) => {
                const Icon = getFactIcon(fact.label);
                return (
                  <div
                    key={fact.label}
                    className="group relative rounded-2xl border border-border bg-card p-5 text-center transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Subtle background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gradient-from/0 to-gradient-to/0 group-hover:from-gradient-from/5 group-hover:to-gradient-to/5 transition-all duration-500" />
                    <div className="relative">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-from/10 to-gradient-to/10 group-hover:from-gradient-from/20 group-hover:to-gradient-to/20 transition-colors ring-1 ring-primary/10 group-hover:ring-primary/25">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        {fact.label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-card-foreground">
                        {fact.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Skills ────────────────────────────────────────────── */}
      <SectionWrapper
        id="skills"
        title="Skills & Technologies"
        subtitle="Tools and technologies I work with every day"
        className="relative bg-muted/30"
      >
        <SkillChips groups={profile.skills} />
      </SectionWrapper>

      {/* ── Experience ────────────────────────────────────────── */}
      <SectionWrapper
        id="experience"
        title="Experience"
        subtitle="My professional journey so far"
      >
        <Timeline items={profile.experience} />
      </SectionWrapper>

      {/* ── Featured Projects ─────────────────────────────────── */}
      <SectionWrapper
        id="projects"
        title="Featured Projects"
        subtitle="Some of the things I've built"
        className="relative bg-muted/30"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>

        {/* All Projects CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-sm font-semibold text-foreground shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all hover:scale-[1.03] active:scale-[0.97] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gradient-from/0 to-gradient-to/0 group-hover:from-gradient-from/5 group-hover:to-gradient-to/5 transition-all duration-500" />
            <span className="relative flex items-center gap-2">
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </SectionWrapper>

      {/* ── Education ─────────────────────────────────────────── */}
      <SectionWrapper id="education" title="Education" subtitle="My academic background">
        <div className="flex flex-col gap-4">
          {profile.education.map((edu) => (
            <div
              key={edu.institution}
              className="group relative rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gradient-from/0 to-gradient-to/0 group-hover:from-gradient-from/3 group-hover:to-gradient-to/3 transition-all duration-500" />
              <div className="relative flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-from/10 to-gradient-to/10 ring-1 ring-primary/10 group-hover:ring-primary/25 transition-all animate-float-slow">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-card-foreground">
                    {edu.institution}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{edu.degree}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      CGPA: {edu.cgpa}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-xs font-semibold text-primary">
                      <Calendar className="h-3.5 w-3.5" />
                      {edu.period}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Certifications ────────────────────────────────────── */}
      <SectionWrapper
        id="certifications"
        title="Certifications"
        subtitle="Professional credentials and achievements"
        className="bg-muted/30"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.certifications.map((cert, i) => (
            <div
              key={cert.title}
              className="group relative rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1.5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gradient-from/0 to-gradient-to/0 group-hover:from-gradient-from/3 group-hover:to-gradient-to/3 transition-all duration-500" />
              <div className="relative flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gradient-from/10 to-gradient-to/10 ring-1 ring-primary/10 group-hover:ring-primary/25 transition-all">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em]">
                    Certificate #{i + 1}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-card-foreground flex-1 leading-relaxed">
                  {cert.title}
                </h3>
                <div className="mt-4 pt-4 border-t border-border">
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline group/link"
                    >
                      View Certificate
                      <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      Certificate link not available
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Extras ────────────────────────────────────────────── */}
      <SectionWrapper id="extras" title="Extras" subtitle="Beyond the code">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Extracurricular */}
          <div className="group relative rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gradient-from/0 to-gradient-to/0 group-hover:from-gradient-from/3 group-hover:to-gradient-to/3 transition-all duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 ring-1 ring-amber-500/20">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Extracurricular
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {profile.extras.extracurricular.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coursework */}
          <div className="group relative rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gradient-from/0 to-gradient-to/0 group-hover:from-gradient-from/3 group-hover:to-gradient-to/3 transition-all duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 ring-1 ring-emerald-500/20">
                  <BookOpen className="h-5 w-5 text-emerald-500" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Relevant Coursework
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.extras.coursework.map((course) => (
                  <span
                    key={course}
                    className="rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-accent-foreground hover:bg-accent transition-all duration-300 hover:scale-105 cursor-default"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Contact ───────────────────────────────────────────── */}
      <SectionWrapper
        id="contact"
        title="Get in Touch"
        subtitle="Have a question or want to work together? Drop me a message!"
        className="bg-muted/30"
      >
        <ContactForm />
      </SectionWrapper>
    </>
  );
}

/* ── Helper Components ───────────────────────────────────────── */

function StatBadge({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${color}`}>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-lg font-extrabold text-card-foreground leading-none tracking-tight">
          {value}
        </p>
        <p className="text-[10px] font-medium text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function getFactIcon(label: string) {
  switch (label) {
    case "Location":
      return MapPin;
    case "Degree":
      return GraduationCap;
    case "Focus":
      return Briefcase;
    case "Status":
      return User;
    default:
      return Star;
  }
}
