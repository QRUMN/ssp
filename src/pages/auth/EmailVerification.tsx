import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export function EmailVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyEmail, resendVerificationEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState<
    'verifying' | 'success' | 'error'
  >('verifying');

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (token) {
      verifyEmail(token)
        .then(() => {
          setVerificationStatus('success');
        })
        .catch(() => {
          setVerificationStatus('error');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [token, verifyEmail]);

  const handleResendEmail = async () => {
    if (!email || resendCooldown > 0) return;

    try {
      await resendVerificationEmail(email);
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError('Failed to resend verification email');
    }
  };

  if (isLoading) {
    return (
      <AuthLayout
        title="Verifying your email"
        description="Please wait while we verify your email address"
      >
        <div className="flex justify-center">
          <RefreshCw className="h-8 w-8 animate-spin text-teal" />
        </div>
      </AuthLayout>
    );
  }

  if (verificationStatus === 'success') {
    return (
      <AuthLayout
        title="Email verified"
        description="Your email has been successfully verified"
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
            Thank you for verifying your email address. You can now access all features
            of your account.
          </p>
          <Link to="/login">
            <Button className="w-full justify-center">
              Sign in to your account
            </Button>
          </Link>
        </motion.div>
      </AuthLayout>
    );
  }

  if (verificationStatus === 'error' || !token) {
    return (
      <AuthLayout
        title="Verification required"
        description="Please verify your email address to continue"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-500">
                  Email verification required
                </h3>
                <p className="mt-1 text-sm text-yellow-500/80">
                  {email ? (
                    <>
                      We sent a verification email to <strong>{email}</strong>.
                      Please check your inbox and click the verification link.
                    </>
                  ) : (
                    'Please check your inbox for the verification email.'
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleResendEmail}
              disabled={resendCooldown > 0}
              className="w-full justify-center"
            >
              {resendCooldown > 0 ? (
                `Resend email (${resendCooldown}s)`
              ) : (
                <>
                  <Mail className="h-5 w-5 mr-2" />
                  Resend verification email
                </>
              )}
            </Button>

            <Link to="/login">
              <Button variant="outline" className="w-full justify-center">
                Back to sign in
              </Button>
            </Link>
          </div>

          <div className="text-center text-sm text-ink/60">
            <p>
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={handleResendEmail}
                disabled={resendCooldown > 0}
                className="text-teal hover:text-teal/80"
              >
                request a new one
              </button>
              .
            </p>
          </div>
        </motion.div>
      </AuthLayout>
    );
  }

  return null;
}
