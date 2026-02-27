"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 400);
      setScrollPercent(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // SVG circle progress
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - scrollPercent);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Back to top"
        >
          <div className="relative flex h-12 w-12 items-center justify-center">
            {/* Progress ring */}
            <svg className="absolute inset-0 -rotate-90 h-12 w-12" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-border"
              />
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="url(#backToTopGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-150"
              />
              <defs>
                <linearGradient id="backToTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--gradient-from)" />
                  <stop offset="100%" stopColor="var(--gradient-to)" />
                </linearGradient>
              </defs>
            </svg>
            {/* Button bg */}
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gradient-from to-gradient-to shadow-lg shadow-primary/25 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-primary/30 transition-all group-hover:scale-110 group-active:scale-95">
              <ArrowUp className="h-4 w-4 text-white transition-transform group-hover:-translate-y-0.5" />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
