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
          <div className="lg:col-span-3 space-y-4">
            {profile.about.paragraphs.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed text-[15px]">
                {p}
              </p>
            ))}

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <StatBadge icon={Code2} value="4+" label="Projects" />
              <StatBadge icon={Target} value="9.03" label="CGPA" />
              <StatBadge icon={Zap} value="2" label="Internships" />
              <StatBadge icon={Award} value="3" label="Certifications" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3">
              {profile.about.quickFacts.map((fact) => {
                const Icon = getFactIcon(fact.label);
                return (
                  <div
                    key={fact.label}
                    className="group rounded-2xl border border-border bg-card p-4 text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5"
                  >
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-accent group-hover:bg-gradient-to-br group-hover:from-gradient-from/20 group-hover:to-gradient-to/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {fact.label}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-card-foreground">
                      {fact.value}
                    </p>
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
        subtitle="Tools and technologies I work with"
        className="bg-muted/30"
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
        className="bg-muted/30"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>

        {/* All Projects CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ── Education ─────────────────────────────────────────── */}
      <SectionWrapper id="education" title="Education" subtitle="My academic background">
        <div className="flex flex-col gap-4">
          {profile.education.map((edu) => (
            <div
              key={edu.institution}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent group-hover:bg-gradient-to-br group-hover:from-gradient-from/20 group-hover:to-gradient-to/20 transition-colors">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-card-foreground">
                    {edu.institution}
                  </h3>
                  <p className="text-sm text-muted-foreground">{edu.degree}</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                      CGPA: {edu.cgpa}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
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
              className="group rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent group-hover:bg-gradient-to-br group-hover:from-gradient-from/20 group-hover:to-gradient-to/20 transition-colors">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Certificate #{i + 1}
                </span>
              </div>
              <h3 className="text-sm font-bold text-card-foreground flex-1">
                {cert.title}
              </h3>
              <div className="mt-4 pt-3 border-t border-border">
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    View Certificate
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground italic">
                    Certificate link not available
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Extras ────────────────────────────────────────────── */}
      <SectionWrapper id="extras" title="Extras" subtitle="Beyond the code">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Extracurricular */}
          <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent group-hover:bg-gradient-to-br group-hover:from-gradient-from/20 group-hover:to-gradient-to/20 transition-colors">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Extracurricular
              </h3>
            </div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {profile.extras.extracurricular.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Coursework */}
          <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent group-hover:bg-gradient-to-br group-hover:from-gradient-from/20 group-hover:to-gradient-to/20 transition-colors">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Relevant Coursework
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.extras.coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-accent-foreground hover:bg-accent transition-colors"
                >
                  {course}
                </span>
              ))}
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
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 transition-all hover:border-primary/20 hover:shadow-sm">
      <Icon className="h-4 w-4 text-primary shrink-0" />
      <div>
        <p className="text-sm font-bold text-card-foreground leading-none">
          {value}
        </p>
        <p className="text-[10px] text-muted-foreground">{label}</p>
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
