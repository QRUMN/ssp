import React from 'react';
import { clsx } from 'clsx';

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ src, alt, size = 'md', className }: AvatarProps) {
  const initials = alt
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center bg-gray-700',
        {
          'w-8 h-8 text-sm': size === 'sm',
          'w-12 h-12 text-base': size === 'md',
          'w-16 h-16 text-xl': size === 'lg',
        },
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="text-gray-300">{initials}</span>
      )}
    </div>
  );
}