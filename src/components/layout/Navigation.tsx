import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { NavLinks } from './NavLinks';
import { MembershipDialog } from '../auth/MembershipDialog';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Avatar } from '../ui/Avatar';
import { user } from '../auth/user';
import { Logo } from '../ui/Logo';

interface NavigationProps {
  scrollY: number;
}

export function Navigation({ scrollY }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMembershipDialog, setShowMembershipDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const threshold = 50;
    const currentScrollY = scrollY;
    
    if (Math.abs(currentScrollY - lastScrollY.current) > threshold) {
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < threshold);
      lastScrollY.current = currentScrollY;
    }
  }, [scrollY]);

  const handleJoinClick = () => {
    setShowMembershipDialog(true);
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              isScrolled ? 'glass-navbar' : ''
            }`}
          >
            <nav className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 hover-lift">
                  <Logo className="h-8 w-8" />
                  <span className="text-xl font-bold text-gradient">Sondae</span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                  <NavLinks onJoinClick={handleJoinClick} />
                </div>

                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  {user ? (
                    <Button
                      as={Link}
                      to="/profile"
                      className="glass-effect-strong hover-lift hover-glow rounded-full px-4 py-2"
                    >
                      <Avatar src={user.avatar_url} alt={user.name} />
                      <span className="ml-2 font-medium">{user.name}</span>
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      to="/join"
                      className="glass-effect-strong hover-lift hover-glow rounded-full px-6 py-2"
                    >
                      Join Now
                    </Button>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
              </div>
            </nav>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden border-t border-paper/10"
                >
                  <div className="bg-ink/95 backdrop-blur-lg p-4 space-y-4">
                    <NavLinks onJoinClick={handleJoinClick} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>

      <MembershipDialog 
        isOpen={showMembershipDialog} 
        onClose={() => setShowMembershipDialog(false)} 
      />
    </>
  );
}