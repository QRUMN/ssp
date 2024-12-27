import React from 'react';
import { motion } from 'framer-motion';
import { LocationAutocomplete } from '../../form/LocationAutocomplete';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { ErrorMessage } from '../../ui/ErrorMessage';
import { Building2, Users2, Calendar, Globe } from 'lucide-react';

interface OrganizationFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  error?: string;
}

export function OrganizationForm({ formData, updateFormData, onNext, onBack, error }: OrganizationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const organizationTypes = [
    { id: 'nonprofit', label: 'Non-Profit', icon: Users2 },
    { id: 'cultural-center', label: 'Cultural Center', icon: Building2 },
    { id: 'event-organizer', label: 'Event Organizer', icon: Calendar },
    { id: 'educational', label: 'Educational Institution', icon: Globe },
  ];

  const sizeOptions = [
    { value: '1-10', label: '1-10 members' },
    { value: '11-50', label: '11-50 members' },
    { value: '51-200', label: '51-200 members' },
    { value: '201+', label: '201+ members' },
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
            label="Organization Name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            required
          />

          <Input
            label="Contact Email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
          />

          <LocationAutocomplete
            onSelect={(location) => updateFormData({ location })}
          />

          <Input
            label="Website"
            type="url"
            value={formData.website}
            onChange={(e) => updateFormData({ website: e.target.value })}
            placeholder="https://"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-paper">
              Organization Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {organizationTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.organizationType === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => updateFormData({ organizationType: type.id })}
                    className={`
                      flex items-center space-x-2 p-3 rounded-lg border-2 transition-all
                      ${isSelected
                        ? 'border-teal bg-teal/10 text-teal'
                        : 'border-paper/10 hover:border-paper/20'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-paper mb-2">
                Founded Year
              </label>
              <Input
                type="number"
                value={formData.foundedYear}
                onChange={(e) => updateFormData({ foundedYear: parseInt(e.target.value) })}
                min={1800}
                max={new Date().getFullYear()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-paper mb-2">
                Organization Size
              </label>
              <select
                value={formData.size}
                onChange={(e) => updateFormData({ size: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-paper/10 bg-paper/5 focus:border-teal focus:ring-1 focus:ring-teal"
              >
                <option value="">Select size</option>
                {sizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Textarea
            label="Description"
            value={formData.bio}
            onChange={(e) => updateFormData({ bio: e.target.value })}
            placeholder="Tell us about your organization..."
            required
          />
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
