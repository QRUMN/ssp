import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingProgress } from './OnboardingProgress';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  currentStep: number;
  totalSteps: number;
}

export function OnboardingLayout({
  children,
  title,
  subtitle,
  currentStep,
  totalSteps,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ink/95 to-ink relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/50 to-ink" />
      </div>
      
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-paper mb-2">{title}</h1>
          <p className="text-paper/60">{subtitle}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {children}
          </motion.div>
        </AnimatePresence>

        <OnboardingProgress 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />
      </div>
    </div>
  );
}