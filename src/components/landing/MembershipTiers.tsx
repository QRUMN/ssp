import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Check } from 'lucide-react';
import { memberships } from '../../config/memberships';
import { useMembershipFlow } from '../../hooks/useMembershipFlow';

export function MembershipTiers() {
  const { handleMembershipSelect } = useMembershipFlow();

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-3">
        {memberships.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              relative rounded-xl p-6 backdrop-blur-sm
              ${tier.highlighted
                ? 'bg-sand/20 border-2 border-sand'
                : 'bg-paper/5 border border-paper/20 hover:border-paper/40'
              }
            `}
          >
            {tier.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sand text-ink px-6 py-1.5 rounded-full text-sm font-medium">
                Recommended
              </div>
            )}

            <div className="text-center mb-8 pt-2">
              <h3 className="text-xl font-semibold text-paper mb-2">
                {tier.name}
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-3xl font-bold ${tier.highlighted ? 'text-sand' : 'text-paper/80'}`}>
                  {tier.price}
                </span>
                <span className="text-paper/60">{tier.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center text-paper/80 text-sm">
                  <Check className={`w-5 h-5 mr-3 ${tier.highlighted ? 'text-sand' : 'text-paper/60'}`} />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={tier.highlighted ? 'accent' : 'outline'}
              className="w-full"
              onClick={() => handleMembershipSelect(tier.id)}
            >
              Get Started
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}