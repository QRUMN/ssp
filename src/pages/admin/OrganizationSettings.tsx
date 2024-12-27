import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Image as ImageIcon,
  Upload,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Shield,
  Bell,
  Link as LinkIcon,
  Save,
  Settings,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/Button';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ElementType;
}

const settingsSections: SettingsSection[] = [
  { id: 'general', title: 'General', icon: Settings },
  { id: 'branding', title: 'Branding', icon: ImageIcon },
  { id: 'privacy', title: 'Privacy', icon: Lock },
  { id: 'notifications', title: 'Notifications', icon: Bell },
  { id: 'integrations', title: 'Integrations', icon: LinkIcon }
];

const privacyOptions = [
  {
    id: 'public',
    title: 'Public',
    description: 'Anyone can view your organization profile and events',
    icon: Eye
  },
  {
    id: 'private',
    title: 'Private',
    description: 'Only approved members can view your organization',
    icon: EyeOff
  },
  {
    id: 'restricted',
    title: 'Restricted',
    description: 'Limited visibility with custom access controls',
    icon: Shield
  }
];

export function OrganizationSettings() {
  const [activeSection, setActiveSection] = useState('general');
  const [formData, setFormData] = useState({
    name: 'Cultural Arts Center',
    email: 'contact@culturalarts.com',
    phone: '+1 (555) 123-4567',
    website: 'https://culturalarts.com',
    address: '123 Culture Street, Art City, AC 12345',
    description: 'A center dedicated to promoting cultural arts and heritage.',
    privacyLevel: 'public',
    socialMedia: {
      facebook: 'https://facebook.com/culturalarts',
      twitter: 'https://twitter.com/culturalarts',
      instagram: 'https://instagram.com/culturalarts',
      youtube: ''
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-ink/80">
                  Organization Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-ink/40" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-ink/80">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-ink/40" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-ink/80">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-ink/40" />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-ink/80">
                  Website
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-ink/40" />
                  </div>
                  <input
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-ink/80">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-ink/40" />
                </div>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-ink/80">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="block w-full p-3 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
              />
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Logo</h3>
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-xl bg-paper/10 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-ink/40" />
                </div>
                <div className="space-y-2">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                  <p className="text-sm text-ink/60">
                    Recommended size: 200x200px
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Cover Image</h3>
              <div className="aspect-video rounded-xl bg-paper/10 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="w-8 h-8 text-ink/40 mx-auto mb-2" />
                  <Button variant="outline">Upload Cover Image</Button>
                  <p className="text-sm text-ink/60 mt-2">
                    Recommended size: 1920x1080px
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Facebook className="h-5 w-5 text-ink/40" />
                  </div>
                  <input
                    name="socialMedia.facebook"
                    type="url"
                    value={formData.socialMedia.facebook}
                    onChange={handleChange}
                    placeholder="Facebook URL"
                    className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Twitter className="h-5 w-5 text-ink/40" />
                  </div>
                  <input
                    name="socialMedia.twitter"
                    type="url"
                    value={formData.socialMedia.twitter}
                    onChange={handleChange}
                    placeholder="Twitter URL"
                    className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Instagram className="h-5 w-5 text-ink/40" />
                  </div>
                  <input
                    name="socialMedia.instagram"
                    type="url"
                    value={formData.socialMedia.instagram}
                    onChange={handleChange}
                    placeholder="Instagram URL"
                    className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Youtube className="h-5 w-5 text-ink/40" />
                  </div>
                  <input
                    name="socialMedia.youtube"
                    type="url"
                    value={formData.socialMedia.youtube}
                    onChange={handleChange}
                    placeholder="YouTube URL"
                    className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-teal bg-paper/5"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Visibility Settings</h3>
              <div className="space-y-4">
                {privacyOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`w-full p-4 rounded-lg border text-left transition-colors ${
                      formData.privacyLevel === option.id
                        ? 'border-teal bg-teal/5'
                        : 'border-ink/10 hover:border-ink/20'
                    }`}
                    onClick={() =>
                      setFormData(prev => ({ ...prev, privacyLevel: option.id }))
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-paper/10">
                        <option.icon className="w-5 h-5 text-teal" />
                      </div>
                      <div>
                        <h4 className="font-medium">{option.title}</h4>
                        <p className="text-sm text-ink/60 mt-1">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-500">
                    Important Privacy Notice
                  </h4>
                  <p className="text-sm text-yellow-500/80 mt-1">
                    Changes to privacy settings may affect your organization's
                    visibility and member access. Please review carefully before
                    saving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                {
                  title: 'Email Notifications',
                  description: 'Receive updates via email',
                  options: [
                    'New member requests',
                    'Event updates',
                    'Member activity',
                    'Security alerts'
                  ]
                },
                {
                  title: 'Push Notifications',
                  description: 'Receive updates on your device',
                  options: [
                    'Real-time alerts',
                    'Event reminders',
                    'Member messages',
                    'System notifications'
                  ]
                }
              ].map((section, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h3 className="font-medium">{section.title}</h3>
                    <p className="text-sm text-ink/60">{section.description}</p>
                  </div>
                  <div className="space-y-2">
                    {section.options.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-ink/5"
                      >
                        <span>{option}</span>
                        <input
                          type="checkbox"
                          className="h-4 w-4 border-ink/10 rounded text-teal focus:ring-teal"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            {[
              {
                title: 'Payment Integration',
                description: 'Connect payment processors for event tickets',
                connected: true,
                icon: LinkIcon
              },
              {
                title: 'Calendar Integration',
                description: 'Sync events with external calendars',
                connected: false,
                icon: Calendar
              },
              {
                title: 'Social Media Integration',
                description: 'Auto-post events to social media',
                connected: true,
                icon: Share
              }
            ].map((integration, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-ink/10 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-paper/10">
                      <integration.icon className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium">{integration.title}</h3>
                      <p className="text-sm text-ink/60">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <Button variant={integration.connected ? 'outline' : 'default'}>
                    {integration.connected ? 'Manage' : 'Connect'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Organization Settings</h1>
          <p className="text-ink/60">
            Manage your organization's profile and preferences
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Navigation */}
          <nav className="md:w-64 flex-shrink-0 space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
                  ${
                    activeSection === section.id
                      ? 'bg-teal text-paper'
                      : 'text-ink/60 hover:bg-ink/5 hover:text-ink'
                  }
                `}
              >
                <section.icon className="w-5 h-5" />
                <span>{section.title}</span>
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-paper/5 border border-ink/10 rounded-xl p-6">
              {renderSection()}
            </div>

            {/* Save Changes */}
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
