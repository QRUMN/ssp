import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export function UpgradePrompt() {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    localStorage.setItem('selectedMembership', 'tribe');
    navigate('/onboarding');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-paper/5 rounded-lg p-8 text-center border border-ink/10"
    >
      <Lock className="w-8 h-8 text-sand mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-ink mb-2">
        Unlock Full Community Access
      </h3>
      <p className="text-ink/60 mb-6 max-w-md mx-auto">
        Upgrade to our Tribe membership to view all community posts and connect with more members.
      </p>
      <Button variant="accent" onClick={handleUpgrade}>
        Become a Tribe Member
      </Button>
    </motion.div>
  );
}