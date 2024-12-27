import React from 'react';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../ui/ThemeToggle';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-paper flex">
      {/* Left Side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center justify-between">
            <div>
              <Logo className="h-8 w-auto" />
            </div>
            <ThemeToggle />
          </div>

          <div className="mt-8">
            <h2 className="mt-6 text-2xl font-bold">{title}</h2>
            {description && (
              <p className="mt-2 text-sm text-ink/60">{description}</p>
            )}
          </div>

          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden lg:block relative flex-1">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal to-sand opacity-90" />
          <img
            className="h-full w-full object-cover"
            src="https://github.com/OpalBridgeAi/Uploads/blob/main/Image%2012%20(17).jpg?raw=true"
            alt="Background"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-paper p-12">
          <h1 className="text-4xl font-bold text-center mb-4">
            Welcome to SS Platform
          </h1>
          <p className="text-lg text-center max-w-lg">
            Connect with cultural enthusiasts, join exclusive events, and be part of a vibrant community.
          </p>
        </div>
      </div>
    </div>
  );
}
