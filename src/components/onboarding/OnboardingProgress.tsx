import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="relative">
          <motion.div
            initial={false}
            animate={{
              backgroundColor: index <= currentStep ? 'rgb(var(--color-sand))' : 'rgba(247, 247, 247, 0.2)',
              scale: index === currentStep ? 1.2 : 1,
            }}
            className="w-3 h-3 rounded-full"
          >
            {index < currentStep && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center text-ink"
              >
                <Check className="w-2 h-2" />
              </motion.div>
            )}
          </motion.div>
          {index < totalSteps - 1 && (
            <div 
              className={`absolute top-1/2 left-full w-8 h-px -translate-y-1/2 ${
                index < currentStep ? 'bg-sand' : 'bg-paper/20'
              }`} 
            />
          )}
        </div>
      ))}
    </div>
  );
}