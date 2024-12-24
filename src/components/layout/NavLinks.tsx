import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { AuthDialog } from '../auth/AuthDialog';

interface NavLinksProps {
  onClose?: () => void;
}

export function NavLinks({ onClose }: NavLinksProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  const handleJoinClick = () => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    if (onClose) onClose();
    navigate('/join');
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    if (onClose) onClose();
    navigate('/join');
  };

  return (
    <>
      <Link 
        to="/events" 
        className="text-ink/80 hover:text-ink dark:text-paper/80 dark:hover:text-paper transition-colors relative group"
      >
        <span>Events</span>
        <span className="absolute inset-x-0 -bottom-1 h-px bg-teal dark:bg-sand scale-x-0 group-hover:scale-x-100 transition-transform" />
      </Link>
      <Link 
        to="/community" 
        className="text-ink/80 hover:text-ink dark:text-paper/80 dark:hover:text-paper transition-colors relative group"
      >
        <span>Community</span>
        <span className="absolute inset-x-0 -bottom-1 h-px bg-teal dark:bg-sand scale-x-0 group-hover:scale-x-100 transition-transform" />
      </Link>
      <Button variant="accent" size="sm" onClick={handleJoinClick}>
        Join Now
      </Button>

      <AuthDialog
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}