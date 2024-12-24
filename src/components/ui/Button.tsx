import React from 'react';
import { clsx } from 'clsx';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        {
          'bg-teal text-paper hover:bg-teal-600 focus:ring-teal': variant === 'primary',
          'bg-ink/10 text-ink hover:bg-ink/20 dark:bg-paper/10 dark:text-paper dark:hover:bg-paper/20 focus:ring-ink': variant === 'secondary',
          'bg-teal text-paper hover:bg-teal-600 dark:bg-sand dark:text-ink dark:hover:bg-sand-400 focus:ring-teal dark:focus:ring-sand': variant === 'accent',
          'border border-ink/10 text-ink hover:bg-ink/5 dark:border-paper/10 dark:text-paper dark:hover:bg-paper/5 focus:ring-ink dark:focus:ring-paper': variant === 'outline',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <Spinner className="mr-2" size="sm" />
      ) : null}
      {children}
    </button>
  );
}