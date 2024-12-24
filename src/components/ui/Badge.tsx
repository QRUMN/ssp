import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-ink/10 text-ink': variant === 'default',
          'bg-teal/20 text-teal': variant === 'success',
          'bg-sand/20 text-sand': variant === 'warning',
          'bg-red-500/20 text-red-500': variant === 'error',
        },
        className
      )}
    >
      {children}
    </span>
  );
}