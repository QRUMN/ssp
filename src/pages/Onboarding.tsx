import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LocationAutocomplete } from '../components/form/LocationAutocomplete';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { useFormValidation } from '../hooks/useFormValidation';
import { 
  User, UserCircle, Building2, Briefcase, ChevronRight, 
  GraduationCap, Camera, Palette, Globe, Heart, Coffee,
  Check, X, AlertCircle, DollarSign, Clock, Languages,
  Certificate, Users2, MapPin, Calendar, Instagram,
  Linkedin, Twitter, Facebook, Mail, Phone
} from 'lucide-react';
import { Button } from '../components/ui/Button';

type UserType = 'individual' | 'organization' | 'teacher';
type OnboardingStep = 'type' | 'basic' | 'details' | 'interests' | 'complete';

interface UserTypeOption {
  type: UserType;
  title: string;
  description: string;
  icon: React.ElementType;
}

const userTypes: UserTypeOption[] = [
  {
    type: 'individual',
    title: 'Cultural Enthusiast',
    description: 'Join events and connect with like-minded individuals',
    icon: UserCircle
  },
  {
    type: 'organization',
    title: 'Cultural Organization',
    description: 'Host events and share your cultural heritage',
    icon: Building2
  },
  {
    type: 'teacher',
    title: 'Cultural Teacher',
    description: 'Share your knowledge and teach others',
    icon: GraduationCap
  }
];

const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function Onboarding() {
  const [step, setStep] = useState<OnboardingStep>('type');
  const [userType, setUserType] = useState<UserType | null>(null);
  const { validate, getFieldError, isSubmitting } = useFormValidation(userType || 'individual');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: { city: '', state: '', country: '' },
    bio: '',
    expertise: [],
    organization: '',
    title: '',
    website: '',
    interests: [],
    experience: {
      years: 0,
      certifications: [],
      languages: [],
    },
    teachingStyle: [],
    availability: {
      weekdays: false,
      weekends: false,
      evenings: false,
      mornings: false,
    },
    pricing: {
      hourlyRate: 0,
      groupRate: 0,
      currency: 'USD',
    },
    socialLinks: {
      instagram: '',
      twitter: '',
      linkedin: '',
      facebook: '',
    },
    preferences: {
      eventNotifications: true,
      newsletterSubscription: true,
      privateProfile: false,
    },
    organizationType: '',
    foundedYear: new Date().getFullYear(),
    size: '',
    taxId: '',
  });

  const handleNext = async () => {
    if (await validate(formData)) {
      const nextSteps: { [key in OnboardingStep]: OnboardingStep } = {
        type: 'basic',
        basic: 'details',
        details: 'interests',
        interests: 'complete',
        complete: 'complete',
      };
      setStep(nextSteps[step]);
    }
  };

  const handleLocationSelect = (location: { city: string; state: string; country: string }) => {
    setFormData(prev => ({ ...prev, location }));
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-8">Choose your path</h2>
      <div className="grid gap-4">
        {userTypes.map((type) => (
          <button
            key={type.type}
            onClick={() => {
              setUserType(type.type);
              setStep('basic');
            }}
            className={`glass-card p-6 text-left flex items-center gap-4 glass-card-hover
                       ${userType === type.type ? 'ring-2 ring-teal' : ''}`}
          >
            <type.icon className="w-8 h-8 text-teal" />
            <div className="flex-1">
              <h3 className="font-bold">{type.title}</h3>
              <p className="text-ink/70 dark:text-ink-dark/70 text-sm">
                {type.description}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-ink/50 dark:text-ink-dark/50" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderBasicInfo = () => (
    <motion.div
      {...pageTransition}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-8">Basic Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className={`w-full px-4 py-3 rounded-xl glass-card ${
              getFieldError('name') ? 'ring-2 ring-red-500' : ''
            }`}
            placeholder="Your name"
          />
          <ErrorMessage message={getFieldError('name')} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`w-full px-4 py-3 rounded-xl glass-card ${
              getFieldError('email') ? 'ring-2 ring-red-500' : ''
            }`}
            placeholder="your@email.com"
          />
          <ErrorMessage message={getFieldError('email')} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <LocationAutocomplete onSelect={handleLocationSelect} />
          <ErrorMessage message={getFieldError('location')} />
        </div>
        
        {/* Social Links */}
        <div className="space-y-4 pt-4">
          <h3 className="font-medium">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Instagram, name: 'instagram', placeholder: 'Instagram profile' },
              { icon: Twitter, name: 'twitter', placeholder: 'Twitter profile' },
              { icon: Linkedin, name: 'linkedin', placeholder: 'LinkedIn profile' },
              { icon: Facebook, name: 'facebook', placeholder: 'Facebook profile' }
            ].map((social) => (
              <div key={social.name} className="relative">
                <social.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/50" />
                <input
                  type="url"
                  value={formData.socialLinks[social.name]}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, [social.name]: e.target.value }
                  }))}
                  className="w-full pl-12 pr-4 py-3 rounded-xl glass-card"
                  placeholder={social.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-4 pt-4">
          <h3 className="font-medium">Preferences</h3>
          <div className="space-y-3">
            {[
              { key: 'eventNotifications', label: 'Receive event notifications' },
              { key: 'newsletterSubscription', label: 'Subscribe to newsletter' },
              { key: 'privateProfile', label: 'Private profile' }
            ].map((pref) => (
              <label key={pref.key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.preferences[pref.key]}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, [pref.key]: e.target.checked }
                  }))}
                  className="w-5 h-5 rounded-md text-teal"
                />
                <span>{pref.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button onClick={() => setStep('type')}>Back</Button>
        <Button 
          onClick={handleNext}
          disabled={isSubmitting}
          className="relative"
        >
          {isSubmitting ? (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-5 h-5 border-2 border-paper border-t-transparent rounded-full animate-spin" />
            </motion.div>
          ) : 'Continue'}
        </Button>
      </div>
    </motion.div>
  );

  const renderTeacherDetails = () => (
    <motion.div {...pageTransition} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Teaching Experience (Years)</label>
        <input
          type="number"
          value={formData.experience.years}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            experience: { ...prev.experience, years: parseInt(e.target.value) }
          }))}
          className="w-full px-4 py-3 rounded-xl glass-card"
          min="0"
        />
      </div>

      {/* Certifications */}
      <div>
        <label className="block text-sm font-medium mb-2">Certifications</label>
        <div className="space-y-3">
          {formData.experience.certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={cert.name}
                onChange={(e) => {
                  const newCerts = [...formData.experience.certifications];
                  newCerts[index] = { ...cert, name: e.target.value };
                  setFormData(prev => ({
                    ...prev,
                    experience: { ...prev.experience, certifications: newCerts }
                  }));
                }}
                className="flex-1 px-4 py-3 rounded-xl glass-card"
                placeholder="Certification name"
              />
              <button
                onClick={() => {
                  const newCerts = formData.experience.certifications.filter((_, i) => i !== index);
                  setFormData(prev => ({
                    ...prev,
                    experience: { ...prev.experience, certifications: newCerts }
                  }));
                }}
                className="p-2 rounded-lg hover:bg-red-500/10"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </motion.div>
          ))}
          <Button
            onClick={() => setFormData(prev => ({
              ...prev,
              experience: {
                ...prev.experience,
                certifications: [
                  ...prev.experience.certifications,
                  { name: '', issuer: '', year: new Date().getFullYear() }
                ]
              }
            }))}
            className="w-full"
          >
            Add Certification
          </Button>
        </div>
      </div>

      {/* Teaching Styles */}
      <div>
        <label className="block text-sm font-medium mb-2">Teaching Style</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            'One-on-one',
            'Group Classes',
            'Workshop Style',
            'Online',
            'Hands-on',
            'Theory-based'
          ].map((style) => (
            <button
              key={style}
              onClick={() => {
                const styles = formData.teachingStyle.includes(style)
                  ? formData.teachingStyle.filter(s => s !== style)
                  : [...formData.teachingStyle, style];
                setFormData(prev => ({ ...prev, teachingStyle: styles }));
              }}
              className={`glass-card p-3 text-center ${
                formData.teachingStyle.includes(style) ? 'ring-2 ring-teal' : ''
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium mb-2">Availability</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(formData.availability).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setFormData(prev => ({
                ...prev,
                availability: {
                  ...prev.availability,
                  [key]: !value
                }
              }))}
              className={`glass-card p-3 text-center ${
                value ? 'ring-2 ring-teal' : ''
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Hourly Rate</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/50" />
            <input
              type="number"
              value={formData.pricing.hourlyRate}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                pricing: { ...prev.pricing, hourlyRate: parseInt(e.target.value) }
              }))}
              className="w-full pl-12 pr-4 py-3 rounded-xl glass-card"
              min="0"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Group Rate</label>
          <div className="relative">
            <Users2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/50" />
            <input
              type="number"
              value={formData.pricing.groupRate}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                pricing: { ...prev.pricing, groupRate: parseInt(e.target.value) }
              }))}
              className="w-full pl-12 pr-4 py-3 rounded-xl glass-card"
              min="0"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderOrganizationDetails = () => (
    <motion.div {...pageTransition} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Organization Type</label>
        <select
          value={formData.organizationType}
          onChange={(e) => setFormData(prev => ({ ...prev, organizationType: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl glass-card"
        >
          <option value="">Select type...</option>
          <option value="nonprofit">Nonprofit</option>
          <option value="education">Educational Institution</option>
          <option value="business">Business</option>
          <option value="community">Community Organization</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Founded Year</label>
        <input
          type="number"
          value={formData.foundedYear}
          onChange={(e) => setFormData(prev => ({ ...prev, foundedYear: parseInt(e.target.value) }))}
          className="w-full px-4 py-3 rounded-xl glass-card"
          min="1800"
          max={new Date().getFullYear()}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Organization Size</label>
        <select
          value={formData.size}
          onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl glass-card"
        >
          <option value="">Select size...</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="500+">500+ employees</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tax ID (Optional)</label>
        <input
          type="text"
          value={formData.taxId}
          onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl glass-card"
          placeholder="Tax ID number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl glass-card min-h-[150px]"
          placeholder="Tell us about your organization..."
        />
      </div>
    </motion.div>
  );

  const renderUserDetails = () => {
    const fields = {
      individual: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl glass-card min-h-[120px]"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      ),
      organization: renderOrganizationDetails,
      teacher: renderTeacherDetails
    };

    return (
      <motion.div {...pageTransition} className="space-y-6">
        <h2 className="text-2xl font-bold mb-8">Additional Details</h2>
        {userType && fields[userType]}
        <div className="flex justify-between mt-8">
          <Button onClick={() => setStep('basic')}>Back</Button>
          <Button onClick={() => setStep('interests')}>Continue</Button>
        </div>
      </motion.div>
    );
  };

  const renderInterests = () => (
    <motion.div {...pageTransition} className="space-y-6">
      <h2 className="text-2xl font-bold mb-8">Select Your Interests</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { name: 'Photography', icon: Camera },
          { name: 'Art', icon: Palette },
          { name: 'Culture', icon: Building2 },
          { name: 'Education', icon: GraduationCap },
          { name: 'Business', icon: Briefcase },
          { name: 'Community', icon: User }
        ].map((interest) => (
          <button
            key={interest.name}
            onClick={() => {
              const interests = formData.interests.includes(interest.name)
                ? formData.interests.filter(i => i !== interest.name)
                : [...formData.interests, interest.name];
              setFormData(prev => ({ ...prev, interests }));
            }}
            className={`glass-card p-6 flex flex-col items-center gap-2 glass-card-hover
                       ${formData.interests.includes(interest.name) ? 'ring-2 ring-teal' : ''}`}
          >
            <interest.icon className="w-6 h-6 text-teal" />
            <span className="text-sm font-medium">{interest.name}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={() => setStep('details')}>Back</Button>
        <Button onClick={() => setStep('complete')}>Complete</Button>
      </div>
    </motion.div>
  );

  const renderComplete = () => (
    <motion.div {...pageTransition} className="text-center space-y-6">
      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-teal to-sand rounded-full flex items-center justify-center">
        <Check className="w-10 h-10 text-paper" />
      </div>
      <h2 className="text-2xl font-bold">Welcome to the Community!</h2>
      <p className="text-ink/70 dark:text-ink-dark/70">
        Your profile has been created successfully.
      </p>
      <Button as={Link} to="/dashboard" className="mt-8">
        Go to Dashboard
      </Button>
    </motion.div>
  );

  const steps = {
    type: renderUserTypeSelection,
    basic: renderBasicInfo,
    details: renderUserDetails,
    interests: renderInterests,
    complete: renderComplete
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-paper-dark p-4 md:p-8">
      <div className="container max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to Free Jawn</h1>
          <p className="text-ink/70 dark:text-ink-dark/70">
            Let's get you started with the basics
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {steps[step]()}
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="mt-12 flex justify-center gap-2">
          {['type', 'basic', 'details', 'interests'].map((s) => (
            <motion.div
              key={s}
              className={`w-2 h-2 rounded-full ${
                step === s ? 'bg-teal' : 'bg-ink/20 dark:bg-ink-dark/20'
              }`}
              animate={{
                scale: step === s ? 1.2 : 1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
