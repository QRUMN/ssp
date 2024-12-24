import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg overflow-hidden border transition-all duration-200',
        'bg-white dark:bg-paper border-ink/10 dark:border-paper/10',
        {
          'hover:translate-y-[-2px] hover:shadow-md': hover,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('p-6 border-b border-ink/10 dark:border-paper/10', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('p-6', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('p-6 border-t border-ink/10 dark:border-paper/10', className)}>
      {children}
    </div>
  );
}