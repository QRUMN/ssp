import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Database } from '../../lib/database.types';
import { useUser } from '../../hooks/useUser';

type Event = Database['public']['Tables']['events']['Row'];

interface TicketDialogProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TicketDialog({ event, isOpen, onClose }: TicketDialogProps) {
  const { user } = useUser();
  const isTribe = user?.membership_tier === 'tribe';
  const isPowWow = user?.membership_tier === 'pow-wow';

  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] md:inset-auto md:left-1/2 md:-translate-x-1/2 
                     max-w-lg w-full bg-paper p-6 rounded-xl shadow-xl z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-ink">Get Tickets</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-ink/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-lg bg-ink/5">
                <h3 className="font-medium text-ink mb-1">{event.title}</h3>
                <p className="text-sm text-ink/60">{event.venue_name}</p>
              </div>

              {isTribe && (
                <div className="p-3 rounded-lg bg-teal/10 text-teal text-sm">
                  Your Tribe membership includes a 30% discount on all tickets!
                </div>
              )}
              {isPowWow && (
                <div className="p-3 rounded-lg bg-sand/10 text-sand text-sm">
                  Your Pow Wow membership includes a 15% discount on all tickets!
                </div>
              )}
            </div>

            <Button variant="accent" className="w-full">
              Continue to Checkout
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}