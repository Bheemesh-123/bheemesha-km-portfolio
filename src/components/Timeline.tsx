"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, ArrowUpRight } from "lucide-react";
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
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px overflow-hidden">
        <div className="h-full w-full bg-gradient-to-b from-primary via-gradient-to to-transparent" />
      </div>

      <div className="space-y-14">
        {items.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={cn(
                "relative flex flex-col md:flex-row md:items-start gap-4",
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 top-2 -translate-x-1/2 z-10">
                <div className="relative">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-gradient-from to-gradient-to ring-4 ring-background shadow-lg shadow-primary/20" />
                  <div className="absolute inset-0 h-5 w-5 rounded-full bg-primary/20 animate-ping" />
                </div>
              </div>

              {/* Card */}
              <div
                className={cn(
                  "ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] group relative rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 overflow-hidden",
                  isLeft ? "md:mr-auto" : "md:ml-auto"
                )}
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gradient-from/0 to-gradient-to/0 group-hover:from-gradient-from/3 group-hover:to-gradient-to/3 transition-all duration-500" />

                <div className="relative">
                  {/* Period badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-bold text-primary">
                        {item.period}
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>

                  <h3 className="text-lg font-bold text-card-foreground">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.company}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>

                  <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                    {item.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {item.status && (
                    <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-3.5 py-1.5 text-xs font-semibold text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {item.status}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
