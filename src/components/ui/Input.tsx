import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full rounded-lg px-4 py-2.5 transition-colors',
          'bg-paper border border-ink/10 text-ink',
          'focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'ring-2 ring-red-500 border-transparent',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}