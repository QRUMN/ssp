import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { clsx } from 'clsx';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'error';
  className?: string;
}

export function Alert({ children, variant = 'info', className }: AlertProps) {
  const Icon = {
    info: Info,
    success: CheckCircle,
    error: AlertCircle,
  }[variant];

  return (
    <div
      className={clsx(
        'rounded-lg p-4 flex items-start gap-3',
        {
          'bg-teal/10 text-teal': variant === 'info',
          'bg-green-500/10 text-green-500': variant === 'success',
          'bg-red-500/10 text-red-500': variant === 'error',
        },
        className
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="text-sm">{children}</div>
    </div>
  );
}