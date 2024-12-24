import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { Alert } from '../../ui/Alert';
import { useOnboarding } from '../../../hooks/useOnboarding';

const interests = [
  'Tea Ceremony', 'Calligraphy', 'Traditional Arts',
  'Cultural Events', 'Language Exchange', 'Food & Cuisine',
  'History & Heritage', 'Music & Dance', 'Philosophy',
  'Martial Arts', 'Meditation', 'Cultural Exchange'
];

interface InterestsProps {
  onComplete?: () => void;
}

export function Interests({ onComplete }: InterestsProps) {
  const { formData, updateFormData, nextStep, prevStep, isSubmitting, error } = useOnboarding();

  const toggleInterest = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    updateFormData({ interests: newInterests });
  };

  const handleNext = () => {
    if (onComplete) {
      onComplete();
    } else {
      nextStep();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {interests.map((interest, index) => (
          <motion.button
            key={interest}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => toggleInterest(interest)}
            type="button"
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              formData.interests.includes(interest)
                ? 'bg-sand text-ink'
                : 'bg-paper/5 text-paper/80 hover:bg-paper/10'
            }`}
          >
            {interest}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button 
          variant="accent" 
          onClick={handleNext}
          isLoading={isSubmitting}
          disabled={formData.interests.length === 0}
        >
          {onComplete ? 'Complete Setup' : 'Continue'}
        </Button>
      </div>
    </motion.div>
  );
}