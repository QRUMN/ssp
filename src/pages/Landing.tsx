import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Calendar, Users, MapPin, Star, ArrowRight, Sparkles } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-paper dark:bg-paper-dark p-4 md:p-8">
      {/* Bento Grid Layout */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Hero Section - Spans 2 columns */}
          <div className="glass-card col-span-1 md:col-span-2 p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal to-sand bg-clip-text text-transparent">
                Enjoy the Human
              </span>
              <br />
              Experience
            </h1>
            <p className="text-xl text-ink text-opacity-80 dark:text-ink-dark dark:text-opacity-80 mb-8">
              Join our community of cultural enthusiasts and discover unique events
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                as={Link}
                to="/join"
                className="glass-card bg-gradient-to-r from-teal to-sand text-paper hover:scale-105 transition-transform px-8 py-3"
              >
                Join Now
              </Button>
              <Button
                as={Link}
                to="/events"
                className="glass-card hover:scale-105 transition-transform px-8 py-3"
              >
                Explore Events
              </Button>
            </div>
          </div>

          {/* Featured Event - Tall card */}
          <div className="glass-card row-span-2 overflow-hidden group">
            <img
              src="https://source.unsplash.com/random/800x1200?event"
              alt="Featured Event"
              className="w-full h-48 md:h-64 object-cover transition-transform group-hover:scale-105"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 text-teal dark:text-teal-dark mb-3">
                <Star className="w-5 h-5" />
                <span className="font-medium">Featured Event</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Cultural Festival 2024</h3>
              <p className="text-ink/70 dark:text-ink-dark/70 mb-4">
                Experience the vibrant celebration of diverse cultures...
              </p>
              <Link 
                to="/events/featured"
                className="flex items-center gap-2 text-teal dark:text-teal-dark font-medium hover:gap-3 transition-all"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stats Box */}
          <div className="glass-card p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal dark:text-teal-dark mb-1">500+</div>
                <div className="text-sm text-ink/70 dark:text-ink-dark/70">Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sand dark:text-sand-dark mb-1">10k+</div>
                <div className="text-sm text-ink/70 dark:text-ink-dark/70">Members</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/events/upcoming"
                className="glass-card p-4 hover:scale-105 transition-transform flex flex-col items-center gap-2"
              >
                <Calendar className="w-6 h-6 text-teal dark:text-teal-dark" />
                <span className="text-sm font-medium">Upcoming</span>
              </Link>
              <Link 
                to="/community"
                className="glass-card p-4 hover:scale-105 transition-transform flex flex-col items-center gap-2"
              >
                <Users className="w-6 h-6 text-sand dark:text-sand-dark" />
                <span className="text-sm font-medium">Community</span>
              </Link>
              <Link 
                to="/events/nearby"
                className="glass-card p-4 hover:scale-105 transition-transform flex flex-col items-center gap-2"
              >
                <MapPin className="w-6 h-6 text-teal dark:text-teal-dark" />
                <span className="text-sm font-medium">Nearby</span>
              </Link>
              <Link 
                to="/events/trending"
                className="glass-card p-4 hover:scale-105 transition-transform flex flex-col items-center gap-2"
              >
                <Sparkles className="w-6 h-6 text-sand dark:text-sand-dark" />
                <span className="text-sm font-medium">Trending</span>
              </Link>
            </div>
          </div>

          {/* Community Spotlight */}
          <div className="glass-card p-6 md:col-span-2">
            <h3 className="font-bold mb-6">Community Spotlight</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center space-y-2 group"
                >
                  <div className="relative">
                    <img
                      src={`https://source.unsplash.com/random/100x100?portrait&sig=${i}`}
                      alt={`Member ${i}`}
                      className="w-16 h-16 rounded-xl object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-gradient-to-br from-teal to-sand flex items-center justify-center text-paper text-xs font-bold">
                      {i}
                    </div>
                  </div>
                  <span className="text-sm font-medium">Member {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}