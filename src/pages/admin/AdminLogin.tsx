import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Shield, AlertTriangle } from 'lucide-react';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { Button } from '../../components/ui/Button';

export function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    code: '' // For 2FA
  });
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (step === 'credentials') {
        // Simulate API call to verify credentials
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If credentials are valid, move to 2FA step
        setStep('2fa');
      } else {
        // Simulate API call to verify 2FA
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If 2FA is valid, redirect to admin dashboard
        navigate('/admin');
      }
    } catch (err) {
      setError(step === 'credentials' ? 'Invalid credentials' : 'Invalid authentication code');
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

  return (
    <AuthLayout
      title="Admin Access"
      description="Secure login for administrators"
    >
      <div className="mb-6 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
        <div className="flex items-center text-yellow-500">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Secure Area</span>
        </div>
        <p className="mt-1 text-sm text-yellow-500/80">
          This area is restricted to authorized administrators only.
        </p>
      </div>

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

        {step === 'credentials' ? (
          <>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ink/80"
              >
                Admin Email
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
                  placeholder="Enter your admin email"
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
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                  placeholder="Enter your password"
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
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-ink/80"
            >
              Authentication Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-ink/40" />
              </div>
              <input
                id="code"
                name="code"
                type="text"
                required
                value={formData.code}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                placeholder="Enter your 2FA code"
                maxLength={6}
              />
            </div>
            <p className="text-sm text-ink/60 mt-2">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full justify-center space-x-2"
          disabled={isLoading}
        >
          <Shield className="h-5 w-5" />
          <span>
            {isLoading
              ? step === 'credentials'
                ? 'Verifying...'
                : 'Authenticating...'
              : step === 'credentials'
                ? 'Continue'
                : 'Sign In'}
          </span>
        </Button>

        {step === '2fa' && (
          <button
            type="button"
            onClick={() => setStep('credentials')}
            className="w-full text-sm text-ink/60 hover:text-ink mt-4"
          >
            ← Back to login
          </button>
        )}
      </motion.form>
    </AuthLayout>
  );
}
