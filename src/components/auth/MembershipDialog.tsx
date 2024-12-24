import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { memberships } from '../../data/memberships';

interface MembershipDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MembershipDialog({ isOpen, onClose }: MembershipDialogProps) {
  const navigate = useNavigate();

  const handleSelect = (membershipId: string) => {
    localStorage.setItem('selectedMembership', membershipId);
    navigate('/onboarding');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[5%] md:top-[10%] md:inset-auto md:left-1/2 md:-translate-x-1/2 
                     max-w-4xl w-full bg-ink p-4 sm:p-6 rounded-xl shadow-xl z-50 max-h-[90vh] overflow-y-auto
                     scrollbar-thin scrollbar-thumb-paper/10 scrollbar-track-transparent"
          >
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-ink z-10 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-paper">Choose Your Journey</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-paper/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-paper" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {memberships.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-xl p-6 ${
                    tier.highlighted
                      ? 'bg-sand/20 border-2 border-sand'
                      : 'bg-paper/5 border border-paper/20 hover:border-paper/40'
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sand text-ink px-4 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-paper mb-2">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-2xl font-bold ${tier.highlighted ? 'text-sand' : 'text-paper/80'}`}>
                        {tier.price}
                      </span>
                      <span className="text-paper/60">{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-paper/80">
                        <Check className={`w-4 h-4 mr-2 ${tier.highlighted ? 'text-sand' : 'text-paper/60'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.highlighted ? 'accent' : 'outline'}
                    className="w-full"
                    onClick={() => handleSelect(tier.id)}
                  >
                    Select {tier.name}
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}