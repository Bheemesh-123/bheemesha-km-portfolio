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

export default function SkillChips({ groups }: SkillChipsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group, gi) => {
        const Icon = categoryIcons[group.category] ?? Code2;
        return (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: gi * 0.1 }}
            className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent group-hover:bg-gradient-to-br group-hover:from-gradient-from/20 group-hover:to-gradient-to/20 transition-colors">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                {group.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, ii) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: gi * 0.1 + ii * 0.04 }}
                  className="rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-gradient-to-r hover:from-gradient-from hover:to-gradient-to hover:text-white hover:shadow-md hover:shadow-primary/10 cursor-default"
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
