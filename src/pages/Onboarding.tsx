import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IndividualForm } from '../components/onboarding/forms/IndividualForm';
import { OrganizationForm } from '../components/onboarding/forms/OrganizationForm';
import { TeacherForm } from '../components/onboarding/forms/TeacherForm';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Button } from '../components/ui/Button';
import { UserCircle, Building2, GraduationCap } from 'lucide-react';

type UserType = 'individual' | 'organization' | 'teacher';
type OnboardingStep = 'type' | 'form' | 'complete';

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
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>('type');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);
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

  const handleNext = () => {
    if (step === 'type' && userType) {
      setStep('form');
    } else if (step === 'form') {
      setStep('complete');
      // Here you would typically submit the form data to your backend
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (step === 'form') {
      setStep('type');
    }
  };

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const renderUserTypeSelection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {userTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = userType === type.type;

          return (
            <button
              key={type.type}
              onClick={() => setUserType(type.type)}
              className={`
                p-6 rounded-xl text-left transition-all
                ${isSelected
                  ? 'bg-teal/10 border-2 border-teal'
                  : 'bg-paper/5 border-2 border-paper/10 hover:border-paper/20'
                }
              `}
            >
              <Icon className={`w-8 h-8 mb-4 ${isSelected ? 'text-teal' : ''}`} />
              <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
              <p className="text-sm text-paper/60">{type.description}</p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!userType}
        >
          Next
        </Button>
      </div>
    </motion.div>
  );

  const renderForm = () => {
    switch (userType) {
      case 'individual':
        return (
          <IndividualForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
            error={error}
          />
        );
      case 'organization':
        return (
          <OrganizationForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
            error={error}
          />
        );
      case 'teacher':
        return (
          <TeacherForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-paper to-paper/95">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-paper/60">Tell us about yourself to get started</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'type' && renderUserTypeSelection()}
          {step === 'form' && renderForm()}
        </AnimatePresence>
      </div>
    </div>
  );
}
