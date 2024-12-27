import React from 'react';
import { motion } from 'framer-motion';
import { LocationAutocomplete } from '../../form/LocationAutocomplete';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { ErrorMessage } from '../../ui/ErrorMessage';
import { 
  GraduationCap, Languages, Certificate, Clock, 
  DollarSign, Users2, Book, Video
} from 'lucide-react';

interface TeacherFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  error?: string;
}

export function TeacherForm({ formData, updateFormData, onNext, onBack, error }: TeacherFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const teachingStyles = [
    { id: 'in-person', label: 'In-Person', icon: Users2 },
    { id: 'virtual', label: 'Virtual', icon: Video },
    { id: 'workshop', label: 'Workshop', icon: Book },
  ];

  const availabilityOptions = [
    { id: 'weekdays', label: 'Weekdays' },
    { id: 'weekends', label: 'Weekends' },
    { id: 'evenings', label: 'Evenings' },
    { id: 'mornings', label: 'Mornings' },
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
            label="Full Name"
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
            placeholder="Tell us about your teaching experience..."
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-paper mb-2">
                Years of Experience
              </label>
              <Input
                type="number"
                value={formData.experience.years}
                onChange={(e) => updateFormData({ 
                  experience: { 
                    ...formData.experience, 
                    years: parseInt(e.target.value) 
                  } 
                })}
                min={0}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-paper mb-2">
                Languages Taught
              </label>
              <Input
                value={formData.experience.languages.join(', ')}
                onChange={(e) => updateFormData({ 
                  experience: { 
                    ...formData.experience, 
                    languages: e.target.value.split(',').map(lang => lang.trim()) 
                  } 
                })}
                placeholder="e.g., English, Spanish"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-paper">
              Teaching Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {teachingStyles.map((style) => {
                const Icon = style.icon;
                const isSelected = formData.teachingStyle.includes(style.id);

                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => {
                      const newStyles = isSelected
                        ? formData.teachingStyle.filter((s: string) => s !== style.id)
                        : [...formData.teachingStyle, style.id];
                      updateFormData({ teachingStyle: newStyles });
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
                    <span>{style.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-paper">
              Availability
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availabilityOptions.map((option) => {
                const isSelected = formData.availability[option.id];

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => updateFormData({
                      availability: {
                        ...formData.availability,
                        [option.id]: !isSelected,
                      },
                    })}
                    className={`
                      flex items-center justify-center p-2 rounded-lg border-2 transition-all
                      ${isSelected
                        ? 'border-teal bg-teal/10 text-teal'
                        : 'border-paper/10 hover:border-paper/20'
                      }
                    `}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-paper mb-2">
                Hourly Rate (USD)
              </label>
              <Input
                type="number"
                value={formData.pricing.hourlyRate}
                onChange={(e) => updateFormData({
                  pricing: {
                    ...formData.pricing,
                    hourlyRate: parseInt(e.target.value),
                  },
                })}
                min={0}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-paper mb-2">
                Group Rate (USD)
              </label>
              <Input
                type="number"
                value={formData.pricing.groupRate}
                onChange={(e) => updateFormData({
                  pricing: {
                    ...formData.pricing,
                    groupRate: parseInt(e.target.value),
                  },
                })}
                min={0}
                required
              />
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
