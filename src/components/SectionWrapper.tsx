"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  className,
  children,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id={id}
      className={cn("relative py-20 md:py-28 px-4 sm:px-6 lg:px-8", className)}
      aria-label={title ?? id}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="mx-auto max-w-6xl"
      >
        {title && (
          <div className="mb-14 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground"
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-3 text-muted-foreground max-w-2xl mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-gradient-from to-gradient-to origin-center"
            />
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
