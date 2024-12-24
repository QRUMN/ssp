import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ParallaxBackground } from '../effects/ParallaxBackground';
import { useScroll } from '../../hooks/useScroll';

export function FuturisticLayout() {
  const { scrollY } = useScroll();

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink/95 to-ink relative overflow-hidden">
      <ParallaxBackground />
      <div className="relative z-10">
        <Navigation scrollY={scrollY} />
        <main className="pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}