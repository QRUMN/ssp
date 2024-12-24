import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { Alert } from '../../ui/Alert';
import { useOnboarding } from '../../../hooks/useOnboarding';

export function BasicInfo() {
  const { formData, updateFormData, nextStep, isSubmitting, error } = useOnboarding();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="Your name"
          required
        />

        <Input
          label="Location"
          value={formData.location}
          onChange={(e) => updateFormData({ location: e.target.value })}
          placeholder="City, Country"
          required
        />

        <Textarea
          label="Bio"
          value={formData.bio}
          onChange={(e) => updateFormData({ bio: e.target.value })}
          placeholder="Tell us about yourself..."
          rows={4}
          required
        />

        <Button
          type="submit"
          variant="accent"
          className="w-full"
          isLoading={isSubmitting}
        >
          Continue
        </Button>
      </form>
    </motion.div>
  );
}