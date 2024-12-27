import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export function ForgotPassword() {
  const { sendPasswordResetEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(email);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Check your email"
        description="We've sent you instructions to reset your password"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mb-6">
            <CheckCircle className="h-6 w-6 text-teal" />
          </div>
          <p className="text-ink/60 mb-6">
            If an account exists for {email}, you will receive an email with
            instructions on how to reset your password.
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => {
                setEmail('');
                setSuccess(false);
              }}
              variant="outline"
              className="w-full justify-center"
            >
              Try another email
            </Button>
            <Link to="/login">
              <Button className="w-full justify-center">
                Return to sign in
              </Button>
            </Link>
          </div>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your email and we'll send you instructions to reset your password"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            'Sending instructions...'
          ) : (
            <>
              Send instructions
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <div className="text-center">
          <span className="text-sm text-ink/60">
            Remember your password?{' '}
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
