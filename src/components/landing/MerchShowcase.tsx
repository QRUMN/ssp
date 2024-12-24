import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ShoppingBag } from 'lucide-react';

export function MerchShowcase() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-ink dark:text-paper">Tribe Merch</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="bg-white dark:bg-paper/5 rounded-lg p-6 border border-ink/10 dark:border-paper/10 hover:border-teal/20 dark:hover:border-sand/20 transition-colors">
          <div className="aspect-square mb-4 overflow-hidden rounded-lg">
            <img
              src="https://github.com/OpalBridgeAi/Uploads/blob/main/ss-vintage-corduroy-cap-navy-front-66c8805ce4ec3.png?raw=true"
              alt="Vintage Corduroy Cap"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-ink dark:text-paper">Vintage Corduroy Cap</h3>
            <p className="text-ink/60 dark:text-paper/60">Navy Blue</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-teal dark:text-sand">$29.99</span>
              <Button variant="accent" size="sm">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}