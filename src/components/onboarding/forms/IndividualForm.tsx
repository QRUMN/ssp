import React from 'react';
import { motion } from 'framer-motion';
import { LocationAutocomplete } from '../../form/LocationAutocomplete';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { ErrorMessage } from '../../ui/ErrorMessage';
import { Globe, Heart, Camera } from 'lucide-react';

interface IndividualFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  error?: string;
}

export function IndividualForm({ formData, updateFormData, onNext, onBack, error }: IndividualFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const interests = [
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'culture', label: 'Cultural Events', icon: Globe },
    { id: 'community', label: 'Community', icon: Heart },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
          />

          <LocationAutocomplete
            onSelect={(location) => updateFormData({ location })}
          />

          <Textarea
            label="Bio"
            value={formData.bio}
            onChange={(e) => updateFormData({ bio: e.target.value })}
            placeholder="Tell us about yourself..."
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-paper">
              Interests
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {interests.map((interest) => {
                const Icon = interest.icon;
                const isSelected = formData.interests.includes(interest.id);

                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => {
                      const newInterests = isSelected
                        ? formData.interests.filter((i: string) => i !== interest.id)
                        : [...formData.interests, interest.id];
                      updateFormData({ interests: newInterests });
                    }}
                    className={`
                      flex items-center space-x-2 p-3 rounded-lg border-2 transition-all
                      ${isSelected
                        ? 'border-teal bg-teal/10 text-teal'
                        : 'border-paper/10 hover:border-paper/20'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{interest.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">
            Next
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
