import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { 
  Calendar, Users, MapPin, Star, ArrowRight, Sparkles, 
  Check, Crown, Zap, Globe, Heart, Coffee, Compass,
  Music, Camera, Ticket, Trophy, ChevronRight
} from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-paper dark:bg-paper-dark p-4 md:p-8">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Hero Bento Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Main Hero - Spans 2 columns and rows */}
          <div className="md:col-span-2 md:row-span-2 glass-card p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-paper/50 to-paper/30 backdrop-blur-xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-float">
              <span className="bg-gradient-to-r from-teal to-sand bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              Your Next Event
            </h1>
            <p className="text-xl text-ink/80 dark:text-ink-dark/80 mb-8 max-w-md">
              Join our vibrant community and experience unforgettable moments
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                as={Link}
                to="/join"
                className="bg-gradient-to-r from-teal to-sand text-paper hover:scale-105 transition-all duration-300 px-8 py-3 rounded-2xl"
              >
                Get Started
              </Button>
              <Button
                as={Link}
                to="/events"
                className="bg-paper/10 hover:bg-paper/20 hover:scale-105 transition-all duration-300 px-8 py-3 rounded-2xl"
              >
                Browse Events
              </Button>
            </div>
          </div>

          {/* Featured Event Box */}
          <div className="md:col-span-1 lg:col-span-2 glass-card rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="relative h-48 md:h-full">
              <img
                src="https://source.unsplash.com/random/800x600?concert"
                alt="Featured Event"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-paper">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium">Featured</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Summer Music Festival</h3>
                <p className="text-paper/80 text-sm mb-4">Experience the magic of live music under the stars</p>
                <Button
                  as={Link}
                  to="/events/featured"
                  className="bg-paper/20 hover:bg-paper/30 px-4 py-2 rounded-xl text-sm inline-flex items-center gap-2 transition-all duration-300 hover:gap-3"
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Boxes */}
          <div className="glass-card rounded-3xl p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-xs text-ink/60">Last 30 days</span>
            </div>
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-sm text-ink/70">Events Hosted</div>
          </div>

          <div className="glass-card rounded-3xl p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-6 h-6 text-teal" />
              <span className="text-xs text-ink/60">Growing Fast</span>
            </div>
            <div className="text-3xl font-bold mb-2">10k+</div>
            <div className="text-sm text-ink/70">Community Members</div>
          </div>
        </div>

        {/* Features Bento Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Category Boxes */}
          {[
            { icon: Music, label: 'Music & Concerts', color: 'text-purple-500', count: '120+' },
            { icon: Camera, label: 'Arts & Culture', color: 'text-teal', count: '85+' },
            { icon: Coffee, label: 'Social Meetups', color: 'text-amber-500', count: '200+' },
            { icon: Compass, label: 'Adventures', color: 'text-rose-500', count: '95+' }
          ].map((category) => (
            <div key={category.label} className="glass-card rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 group">
              <category.icon className={`w-8 h-8 ${category.color} mb-4 transition-transform duration-300 group-hover:scale-110`} />
              <h3 className="text-lg font-semibold mb-2">{category.label}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink/70">{category.count} events</span>
                <ArrowRight className="w-4 h-4 text-ink/40 group-hover:text-ink/70 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Community Spotlight */}
        <div className="glass-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Community Spotlight</h2>
            <Button
              as={Link}
              to="/community"
              className="text-sm text-ink/70 hover:text-ink flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group">
                <div className="relative mb-3">
                  <img
                    src={`https://source.unsplash.com/random/200x200?portrait&sig=${i}`}
                    alt={`Community Member ${i}`}
                    className="w-full aspect-square rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 w-8 h-8 rounded-xl bg-gradient-to-br from-teal to-sand flex items-center justify-center text-paper font-medium">
                    {i}
                  </div>
                </div>
                <h3 className="font-medium text-center">Member {i}</h3>
                <p className="text-sm text-ink/70 text-center">Event Host</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="glass-card rounded-3xl p-8 md:p-12 text-center bg-gradient-to-br from-teal/10 to-sand/10 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-ink/70 mb-8 max-w-2xl mx-auto">
            Start your journey today and become part of our growing community of event enthusiasts
          </p>
          <Button
            as={Link}
            to="/join"
            className="bg-gradient-to-r from-teal to-sand text-paper hover:scale-105 transition-all duration-300 px-8 py-3 rounded-2xl inline-flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}