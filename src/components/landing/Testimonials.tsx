import React from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Being part of the Tribe has transformed how I experience cultural events. The exclusive access and community are incredible.",
    author: "Sarah K.",
    role: "Tribe Member",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    quote: "As a Tribe member, I've not only attended amazing events but also hosted my own cultural workshops. It's been transformative.",
    author: "David M.",
    role: "Tribe Member",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
  {
    quote: "The Tribe community has become my cultural family. We share experiences, learn from each other, and grow together.",
    author: "Elena R.",
    role: "Tribe Member",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  }
];

export function Testimonials() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-6 h-6 text-teal" />
        <h2 className="text-2xl font-semibold text-paper">Meet Our Tribe</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-paper/5 rounded-lg p-4 border border-paper/10 hover:border-teal/20 transition-colors"
          >
            <div className="space-y-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-teal/20"
              />
              <div className="text-center">
                <p className="text-paper/80 mb-4">{testimonial.quote}</p>
                <p className="text-paper font-medium">{testimonial.author}</p>
                <p className="text-teal text-sm">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}