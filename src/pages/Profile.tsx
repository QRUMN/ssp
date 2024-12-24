import React from 'react';
import { ProfileForm } from '../components/profile/ProfileForm';

export function Profile() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <ProfileForm />
    </div>
  );
}