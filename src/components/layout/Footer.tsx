import React from 'react';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '../ui/Button';

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-paper/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3 items-center">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://github.com/OpalBridgeAi/Uploads/blob/main/android-chrome-512x512.png?raw=true"
                alt="Logo"
                className="w-8 h-8 rounded-xl"
              />
            </div>
            <p className="text-sm text-paper/60">
              The human experience is what brings us together
            </p>
          </div>

          {/* Join Tribe */}
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-paper">Join Our Tribe</h3>
            <p className="text-sm text-paper/60">
              Get exclusive access to cultural events
            </p>
            <Button variant="accent" size="sm">
              Become a Member
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/60 hover:text-sand transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/60 hover:text-sand transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/60 hover:text-sand transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-paper/10 text-center text-sm text-paper/40">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}