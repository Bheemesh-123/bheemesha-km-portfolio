"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Brain,
  Wrench,
  Globe,
} from "lucide-react";

interface SkillGroup {
  category: string;
  items: readonly string[];
}

interface SkillChipsProps {
  groups: readonly SkillGroup[];
}

const categoryIcons: Record<string, React.ElementType> = {
  Programming: Code2,
  Databases: Database,
  "Data / AI": Brain,
  Tools: Wrench,
  Web: Globe,
};

const categoryColors: Record<string, string> = {
  Programming: "from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30",
  Databases: "from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30",
  "Data / AI": "from-violet-500/20 to-purple-500/20 hover:from-violet-500/30 hover:to-purple-500/30",
  Tools: "from-orange-500/20 to-amber-500/20 hover:from-orange-500/30 hover:to-amber-500/30",
  Web: "from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30",
};

export default function SkillChips({ groups }: SkillChipsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group, gi) => {
        const Icon = categoryIcons[group.category] ?? Code2;
        const colorClass = categoryColors[group.category] ?? "from-primary/20 to-primary/10";
        return (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} transition-colors ring-1 ring-primary/10`}>
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {group.category}
                </h3>
                <p className="text-[10px] text-muted-foreground">{group.items.length} skills</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, ii) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: gi * 0.1 + ii * 0.04 }}
                  className="rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-gradient-to-r hover:from-gradient-from hover:to-gradient-to hover:text-white hover:shadow-lg hover:shadow-primary/15 hover:scale-105 cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
