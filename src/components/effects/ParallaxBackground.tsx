import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal/20 via-sand/20 to-transparent" />
        <div className="absolute inset-0">
          <Grid />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
    </div>
  );
}

function Grid() {
  return (
    <div className="relative w-full h-full">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-sand/10 to-transparent"
          style={{ left: `${(i + 1) * 10}%` }}
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-sand/10 to-transparent"
          style={{ top: `${(i + 1) * 10}%` }}
        />
      ))}
    </div>
  );
}