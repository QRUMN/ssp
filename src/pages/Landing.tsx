import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { 
  Calendar, Users, MapPin, Star, ArrowRight, Sparkles, 
  Check, Crown, Zap, Globe, Heart, Coffee
} from 'lucide-react';

export function Landing() {
  const pricingTiers = [
    {
      name: 'Nomad',
      price: '0',
      description: 'Start your cultural journey',
      features: [
        'Join community events',
        'Create basic profile',
        'Browse public events',
        'Basic chat features'
      ],
      icon: Globe,
      color: 'text-teal'
    },
    {
      name: 'POW WOW',
      price: '9.99',
      description: 'Gather and celebrate together',
      features: [
        'All Nomad features',
        'Create & host events',
        'Priority support',
        'Advanced networking'
      ],
      icon: Crown,
      color: 'text-sand',
      popular: true
    },
    {
      name: 'TRIBE',
      price: '19.99',
      description: 'Unite and empower your community',
      features: [
        'All POW WOW features',
        'VIP event access',
        'Custom branding',
        'Analytics dashboard'
      ],
      icon: Zap,
      color: 'text-teal'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-paper dark:bg-paper-dark p-4 md:p-8">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="glass-card col-span-1 md:col-span-2 p-8 md:p-12 glass-card-hover">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-float">
              <span className="bg-gradient-to-r from-teal to-sand bg-clip-text text-transparent">
                Enjoy the Human
              </span>
              <br />
              Experience
            </h1>
            <p className="text-xl text-ink text-opacity-80 dark:text-ink-dark dark:text-opacity-80 mb-8 animate-pulse-subtle">
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

          {/* Featured Event */}
          <div className="glass-card row-span-2 overflow-hidden group glass-card-hover">
            <div className="relative">
              <img
                src="https://source.unsplash.com/random/800x1200?event"
                alt="Featured Event"
                className="w-full h-48 md:h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-paper">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-sand" />
                  <span className="font-medium">Featured Event</span>
                </div>
                <h3 className="text-xl font-bold">Cultural Festival 2024</h3>
              </div>
            </div>
            <div className="p-6">
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
          <div className="glass-card p-6 glass-card-hover">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal dark:text-teal-dark mb-1 animate-float">500+</div>
                <div className="text-sm text-ink/70 dark:text-ink-dark/70">Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sand dark:text-sand-dark mb-1 animate-float" style={{ animationDelay: '0.2s' }}>10k+</div>
                <div className="text-sm text-ink/70 dark:text-ink-dark/70">Members</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Calendar, label: 'Upcoming', path: '/events/upcoming', color: 'text-teal' },
                { icon: Users, label: 'Community', path: '/community', color: 'text-sand' },
                { icon: MapPin, label: 'Nearby', path: '/events/nearby', color: 'text-teal' },
                { icon: Sparkles, label: 'Trending', path: '/events/trending', color: 'text-sand' }
              ].map((item, i) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className="glass-card p-4 glass-card-hover flex flex-col items-center gap-2 group"
                >
                  <item.icon className={`w-6 h-6 ${item.color} transition-transform group-hover:scale-110`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Community Spotlight */}
          <div className="glass-card p-6 md:col-span-2 glass-card-hover">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Community Spotlight</h3>
              <Link 
                to="/community"
                className="flex items-center gap-2 text-teal dark:text-teal-dark hover:gap-3 transition-all text-sm"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
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

        {/* Pricing Section */}
        <div className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Choose Your Journey</h2>
          <p className="text-center text-ink/70 dark:text-ink-dark/70 mb-12 max-w-2xl mx-auto">
            Select the perfect plan that matches your cultural exploration needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.name}
                className={`glass-card p-6 glass-card-hover ${tier.popular ? 'pricing-popular' : ''}`}
              >
                <div className={`${tier.color} mb-4`}>
                  <tier.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold">${tier.price}</span>
                  <span className="text-ink/60 dark:text-ink-dark/60">/month</span>
                </div>
                <p className="text-ink/70 dark:text-ink-dark/70 mb-6">
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-teal dark:text-teal-dark" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  as={Link}
                  to="/join"
                  className={`w-full glass-card ${
                    tier.popular
                      ? 'bg-gradient-to-r from-teal to-sand text-paper'
                      : ''
                  } hover:scale-105 transition-transform py-3`}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Community Values */}
        <div className="glass-card p-8 glass-card-hover">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart className="w-8 h-8 text-teal dark:text-teal-dark mx-auto mb-4" />
              <h3 className="font-bold mb-2">Authentic Connections</h3>
              <p className="text-ink/70 dark:text-ink-dark/70">
                Build meaningful relationships with like-minded individuals
              </p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-sand dark:text-sand-dark mx-auto mb-4" />
              <h3 className="font-bold mb-2">Cultural Exchange</h3>
              <p className="text-ink/70 dark:text-ink-dark/70">
                Share and experience diverse perspectives and traditions
              </p>
            </div>
            <div className="text-center">
              <Coffee className="w-8 h-8 text-teal dark:text-teal-dark mx-auto mb-4" />
              <h3 className="font-bold mb-2">Enriching Events</h3>
              <p className="text-ink/70 dark:text-ink-dark/70">
                Participate in carefully curated cultural experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}