"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  company: string;
  location: string;
  role: string;
  period: string;
  status: string;
  bullets: readonly string[];
}

interface TimelineProps {
  items: readonly TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-border md:-translate-x-px" />

      <div className="space-y-12">
        {items.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={cn(
                "relative flex flex-col md:flex-row md:items-start gap-4",
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 top-2 -translate-x-1/2 z-10">
                <div className="relative">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-gradient-from to-gradient-to ring-4 ring-background" />
                  <div className="absolute inset-0 h-4 w-4 rounded-full bg-primary/30 animate-ping" />
                </div>
              </div>

              {/* Card */}
              <div
                className={cn(
                  "ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
                  isLeft ? "md:mr-auto" : "md:ml-auto"
                )}
              >
                {/* Period badge */}
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {item.period}
                  </span>
                </div>

                <h3 className="text-base font-bold text-card-foreground">
                  {item.role}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.company}
                  {item.location ? `, ${item.location}` : ""}
                </p>

                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {item.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {item.status && (
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {item.status}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
