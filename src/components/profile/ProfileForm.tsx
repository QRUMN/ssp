import React from 'react';
import { useUser } from '../../hooks/useUser';
import { Card, CardContent, CardHeader, CardFooter } from '../ui/Card';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function ProfileForm() {
  const { user, isLoading } = useUser();
  const { signOut } = useAuth();

  if (isLoading) return null;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar
            src={user?.avatar_url}
            alt={user?.name || ''}
            size="lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Membership Status
          </h3>
          <Badge variant="success" className="capitalize">
            {user?.membership_tier} Member
          </Badge>
        </div>

        <Textarea
          label="Bio"
          placeholder="Tell us about yourself..."
          defaultValue={user?.bio || ''}
          rows={4}
        />

        <Input
          label="Location"
          placeholder="Your location"
          defaultValue={user?.location || ''}
        />
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="primary">Save Changes</Button>
        <Button variant="secondary" onClick={signOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
}