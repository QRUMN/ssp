import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-sand/20 dark:from-teal-dark/20 dark:to-sand-dark/20" />
      
      {/* Hero section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold animate-float">
              <span className="text-gradient">Enjoy the Human</span>
              <br />
              Experience
            </h1>
            
            <p className="text-xl md:text-2xl text-ink/80 dark:text-ink-dark/80 max-w-2xl mx-auto animate-pulse-subtle">
              Join our community of cultural enthusiasts and discover unique events
            </p>
            
            <div className="flex justify-center gap-4 pt-8">
              <Button
                as={Link}
                to="/join"
                className="glass-effect-strong hover-lift hover-glow rounded-full px-8 py-3 text-lg"
              >
                Join Now
              </Button>
              <Button
                as={Link}
                to="/events"
                className="glass-effect hover-lift rounded-full px-8 py-3 text-lg"
              >
                Explore Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Event cards */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-card rounded-2xl overflow-hidden hover-lift"
              >
                <img
                  src={`https://source.unsplash.com/random/400x300?event&sig=${i}`}
                  alt="Event"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Event Title {i}</h3>
                  <p className="text-ink/70 dark:text-ink-dark/70 mb-4">
                    Join us for an amazing experience...
                  </p>
                  <Button
                    as={Link}
                    to={`/events/${i}`}
                    className="glass-effect w-full rounded-full"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Tribe section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Our Tribe</h2>
          <div className="glass-card rounded-2xl p-8">
            <div className="flex flex-wrap justify-center gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center space-y-2"
                >
                  <img
                    src={`https://source.unsplash.com/random/100x100?portrait&sig=${i}`}
                    alt={`Member ${i}`}
                    className="w-16 h-16 rounded-full object-cover hover-lift"
                  />
                  <span className="text-sm font-medium">Member {i}</span>
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-ink/70 dark:text-ink-dark/70">
              Join our growing tribe of cultural enthusiasts
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}