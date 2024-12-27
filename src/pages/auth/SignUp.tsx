import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

type MembershipType = 'nomad' | 'powwow' | 'tribe';

interface MembershipOption {
  type: MembershipType;
  title: string;
  description: string;
  price: string;
  features: string[];
}

const membershipOptions: MembershipOption[] = [
  {
    type: 'nomad',
    title: 'Nomad',
    description: 'Perfect for cultural enthusiasts',
    price: 'Free',
    features: [
      'Access to public events',
      'Basic community features',
      'Limited event creation'
    ]
  },
  {
    type: 'powwow',
    title: 'Pow Wow',
    description: 'Enhanced cultural experience',
    price: '$9.99/mo',
    features: [
      'All Nomad features',
      'Exclusive events access',
      'Premium networking',
      'Advanced features'
    ]
  },
  {
    type: 'tribe',
    title: 'Tribe',
    description: 'For organizations and institutions',
    price: '$49.99/mo',
    features: [
      'All Pow Wow features',
      'Organization management',
      'Event hosting',
      'Analytics dashboard',
      'Priority support'
    ]
  }
];

export function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'details' | 'membership'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    membershipType: '' as MembershipType | ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'details') {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      setStep('membership');
      return;
    }

    if (!formData.membershipType) {
      setError('Please select a membership type');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await signUp(formData);
      navigate('/verify-email');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const selectMembership = (type: MembershipType) => {
    setFormData(prev => ({
      ...prev,
      membershipType: type
    }));
  };

  return (
    <AuthLayout
      title={step === 'details' ? 'Create your account' : 'Choose your membership'}
      description={
        step === 'details'
          ? 'Join our community of cultural enthusiasts'
          : 'Select the plan that best fits your needs'
      }
    >
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
            {error}
          </div>
        )}

        {step === 'details' ? (
          <>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-ink/80"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-ink/40" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ink/80"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-ink/40" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-ink/80"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-ink/40" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-ink/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-ink/40" />
                  )}
                </button>
              </div>
              <p className="text-sm text-ink/60">
                Must be at least 8 characters long
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {membershipOptions.map((option) => (
              <div
                key={option.type}
                className={`
                  relative rounded-lg border p-4 cursor-pointer transition-colors
                  ${
                    formData.membershipType === option.type
                      ? 'border-teal bg-teal/5'
                      : 'border-ink/10 hover:border-ink/20'
                  }
                `}
                onClick={() => selectMembership(option.type)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{option.title}</h3>
                    <p className="text-sm text-ink/60 mt-1">
                      {option.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{option.price}</span>
                    {formData.membershipType === option.type && (
                      <CheckCircle className="h-5 w-5 text-teal absolute top-4 right-4" />
                    )}
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {option.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-sm text-ink/60 flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 text-teal mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <Button
          type="submit"
          className="w-full justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            'Creating account...'
          ) : step === 'details' ? (
            <>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            'Create Account'
          )}
        </Button>

        {step === 'membership' && (
          <button
            type="button"
            onClick={() => setStep('details')}
            className="w-full text-sm text-ink/60 hover:text-ink mt-4"
          >
            ← Back to details
          </button>
        )}

        <div className="text-center">
          <span className="text-sm text-ink/60">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-teal hover:text-teal/80"
            >
              Sign in
            </Link>
          </span>
        </div>
      </motion.form>
    </AuthLayout>
  );
}
