import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface BentoSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoSection({ children, className }: BentoSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={clsx(
        'rounded-xl transition-all duration-300 backdrop-blur-[2px]',
        'bg-white/80 dark:bg-paper/5',
        'border border-ink/5 dark:border-paper/10',
        'hover:border-teal/20 dark:hover:border-sand/20',
        'shadow-sm hover:shadow-md',
        'group relative overflow-hidden',
        className
      )}
    >
      {/* Light mode gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden" />
      
      {/* Dark mode gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block" />
      
      {/* Content wrapper */}
      <div className="relative z-10 h-full">
        <div className="p-6 h-full">
          {children}
        </div>
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-teal via-transparent to-transparent dark:from-sand transform rotate-45" />
      </div>
    </motion.div>
  );
}