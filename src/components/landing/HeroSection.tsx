import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        className="absolute inset-0"
      >
        <img
          src="https://github.com/OpalBridgeAi/Uploads/blob/main/Image%2012%20(17).jpg?raw=true"
          alt="Sondae Service Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/50 to-ink" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold text-paper mb-4 sm:mb-6"
        >
          Enjoy the Human Experience
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-paper/80 mb-6 sm:mb-8 px-4 sm:px-0"
        >
          Join our community of cultural enthusiasts and discover unique events
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-4 sm:px-0"
        >
          <Button size="lg" onClick={() => navigate('/join')} className="w-full sm:w-auto">
            Join Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}