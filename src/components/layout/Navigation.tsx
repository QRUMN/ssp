import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { NavLinks } from './NavLinks';
import { MembershipDialog } from '../auth/MembershipDialog';
import { ThemeToggle } from '../ui/ThemeToggle'; // Assuming ThemeToggle is defined in this file
import { Avatar } from '../ui/Avatar'; // Assuming Avatar is defined in this file
import { user } from '../auth/user'; // Assuming user is defined in this file

interface NavigationProps {
  scrollY: number;
}

export function Navigation({ scrollY }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMembershipDialog, setShowMembershipDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
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
            className="fixed top-0 left-0 right-0 z-50"
            style={{
              backgroundColor: `rgba(30, 29, 22, ${Math.min(scrollY / 500, 0.98)})`,
              backdropFilter: `blur(${Math.min(scrollY / 100, 8)}px)`,
            }}
          >
            <nav className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                <img
                  src="https://github.com/OpalBridgeAi/Uploads/blob/main/android-chrome-512x512.png?raw=true"
                  alt="Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl transform group-hover:scale-105 transition-transform"
                />
              </Link>

              <div className="hidden md:flex items-center gap-8">
                <NavLinks onJoinClick={handleJoinClick} />
              </div>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                {user ? (
                  <Button
                    as={Link}
                    to="/profile"
                    variant="outline"
                    className="glass-card"
                  >
                    <Avatar src={user.avatar_url} alt={user.name} />
                    <span className="ml-2">{user.name}</span>
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    to="/join"
                    variant="primary"
                    className="glass-card"
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