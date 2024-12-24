import React from 'react';
import { motion } from 'framer-motion';
import { MembershipTiers } from '../components/landing/MembershipTiers';
import { ParallaxBackground } from '../components/effects/ParallaxBackground';

export function Join() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ink/95 to-ink relative">
      <ParallaxBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-paper mb-4">
            Choose Your Journey
          </h1>
          <p className="text-xl text-paper/60 max-w-2xl mx-auto">
            Join our community of cultural enthusiasts and unlock exclusive experiences
          </p>
        </motion.div>

        <MembershipTiers />
      </div>
    </div>
  );
}