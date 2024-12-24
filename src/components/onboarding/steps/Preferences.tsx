import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Alert } from '../../ui/Alert';
import { useOnboarding } from '../../../contexts/OnboardingContext';

interface PreferencesProps {
  onComplete: () => void;
}

export function Preferences({ onComplete }: PreferencesProps) {
  const { formData, updateFormData, prevStep, isSubmitting, error } = useOnboarding();

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

      <div className="space-y-4">
        <button
          type="button"
          onClick={() => updateFormData({ notifications: !formData.notifications })}
          className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors ${
            formData.notifications
              ? 'bg-sand/20 text-sand'
              : 'bg-paper/5 text-paper/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Push Notifications</div>
              <div className="text-sm opacity-80">Get updates about events and messages</div>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 ${
            formData.notifications
              ? 'border-sand bg-sand'
              : 'border-paper/20'
          }`}>
            {formData.notifications && (
              <div className="w-full h-full flex items-center justify-center">
                ✓
              </div>
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => updateFormData({ newsletter: !formData.newsletter })}
          className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors ${
            formData.newsletter
              ? 'bg-sand/20 text-sand'
              : 'bg-paper/5 text-paper/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Newsletter</div>
              <div className="text-sm opacity-80">Receive our weekly cultural digest</div>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 ${
            formData.newsletter
              ? 'border-sand bg-sand'
              : 'border-paper/20'
          }`}>
            {formData.newsletter && (
              <div className="w-full h-full flex items-center justify-center">
                ✓
              </div>
            )}
          </div>
        </button>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button 
          variant="accent" 
          onClick={onComplete}
          isLoading={isSubmitting}
        >
          Complete Setup
        </Button>
      </div>
    </motion.div>
  );
}