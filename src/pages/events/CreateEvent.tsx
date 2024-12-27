import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Image as ImageIcon,
  Upload,
  Users,
  Ticket,
  DollarSign,
  Info,
  Plus,
  Minus,
  Camera,
  Share,
  Link as LinkIcon,
  Save,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/Button';

interface TicketTier {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  perks: string[];
}

interface EventFormData {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: {
    name: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  capacity: number;
  ticketTiers: TicketTier[];
  images: string[];
  dresscode: string;
  ageRestriction: string;
  additionalInfo: string;
  visibility: 'public' | 'private' | 'invite-only';
}

const initialFormData: EventFormData = {
  title: '',
  description: '',
  date: '',
  startTime: '',
  endTime: '',
  location: {
    name: '',
    address: ''
  },
  capacity: 100,
  ticketTiers: [
    {
      id: '1',
      name: 'General Admission',
      price: 0,
      quantity: 50,
      description: 'Standard entry to the event',
      perks: ['Entry to main event']
    }
  ],
  images: [],
  dresscode: '',
  ageRestriction: '21+',
  additionalInfo: '',
  visibility: 'public'
};

export function CreateEvent() {
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTicketTier = () => {
    const newTier: TicketTier = {
      id: String(formData.ticketTiers.length + 1),
      name: '',
      price: 0,
      quantity: 0,
      description: '',
      perks: []
    };
    setFormData(prev => ({
      ...prev,
      ticketTiers: [...prev.ticketTiers, newTier]
    }));
  };

  const removeTicketTier = (id: string) => {
    setFormData(prev => ({
      ...prev,
      ticketTiers: prev.ticketTiers.filter(tier => tier.id !== id)
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold">Event Details</h2>
            
            {/* Event Cover Image */}
            <div className="space-y-4">
              <label className="block text-sm font-medium">Event Cover</label>
              <div className="aspect-video rounded-xl bg-paper/10 border-2 border-dashed border-ink/20 flex items-center justify-center">
                {formData.images.length === 0 ? (
                  <div className="text-center p-6">
                    <Camera className="w-8 h-8 text-ink/40 mx-auto mb-2" />
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Cover Image
                    </Button>
                    <p className="text-sm text-ink/60 mt-2">
                      Recommended size: 1920x1080px
                    </p>
                  </div>
                ) : (
                  <img
                    src={formData.images[0]}
                    alt="Event cover"
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., New Year's Eve Gala"
                  className="w-full px-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your event..."
                  className="w-full px-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Start Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">End Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <label className="block text-sm font-medium">Location</label>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                  <input
                    type="text"
                    name="location.name"
                    value={formData.location.name}
                    onChange={handleChange}
                    placeholder="Venue Name"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    placeholder="Full Address"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold">Tickets & Capacity</h2>

            {/* Event Capacity */}
            <div className="space-y-4">
              <label className="block text-sm font-medium">Total Capacity</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                />
              </div>
            </div>

            {/* Ticket Tiers */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium">Ticket Tiers</label>
                <Button onClick={addTicketTier} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tier
                </Button>
              </div>

              <div className="space-y-4">
                {formData.ticketTiers.map((tier, index) => (
                  <div
                    key={tier.id}
                    className="p-4 rounded-lg border border-ink/10 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Tier {index + 1}</h3>
                      {formData.ticketTiers.length > 1 && (
                        <Button
                          onClick={() => removeTicketTier(tier.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm">Tier Name</label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              ticketTiers: prev.ticketTiers.map(t =>
                                t.id === tier.id
                                  ? { ...t, name: e.target.value }
                                  : t
                              )
                            }))
                          }
                          placeholder="e.g., VIP, Early Bird"
                          className="w-full px-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm">Price</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                          <input
                            type="number"
                            value={tier.price}
                            onChange={(e) =>
                              setFormData(prev => ({
                                ...prev,
                                ticketTiers: prev.ticketTiers.map(t =>
                                  t.id === tier.id
                                    ? { ...t, price: Number(e.target.value) }
                                    : t
                                )
                              }))
                            }
                            min="0"
                            step="0.01"
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm">Quantity Available</label>
                        <input
                          type="number"
                          value={tier.quantity}
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              ticketTiers: prev.ticketTiers.map(t =>
                                t.id === tier.id
                                  ? { ...t, quantity: Number(e.target.value) }
                                  : t
                              )
                            }))
                          }
                          min="0"
                          className="w-full px-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm">Description</label>
                        <input
                          type="text"
                          value={tier.description}
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              ticketTiers: prev.ticketTiers.map(t =>
                                t.id === tier.id
                                  ? { ...t, description: e.target.value }
                                  : t
                              )
                            }))
                          }
                          placeholder="What's included in this tier?"
                          className="w-full px-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold">Additional Information</h2>

            {/* Dress Code */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Dress Code</label>
              <select
                name="dresscode"
                value={formData.dresscode}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
              >
                <option value="">Select Dress Code</option>
                <option value="black-tie">Black Tie</option>
                <option value="formal">Formal</option>
                <option value="cocktail">Cocktail</option>
                <option value="business">Business</option>
                <option value="smart-casual">Smart Casual</option>
                <option value="casual">Casual</option>
              </select>
            </div>

            {/* Age Restriction */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Age Restriction</label>
              <select
                name="ageRestriction"
                value={formData.ageRestriction}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
              >
                <option value="all-ages">All Ages</option>
                <option value="18+">18+</option>
                <option value="21+">21+</option>
              </select>
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Additional Information
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={4}
                placeholder="Any other important details..."
                className="w-full px-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
              />
            </div>

            {/* Visibility */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Event Visibility</label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="invite-only">Invite Only</option>
              </select>
            </div>
          </motion.div>
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
          <h1 className="text-2xl font-bold mb-2">Create New Event</h1>
          <p className="text-ink/60">
            Fill in the details below to create your event
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-ink/10 -z-10" />
            {[
              { step: 1, label: 'Event Details' },
              { step: 2, label: 'Tickets' },
              { step: 3, label: 'Additional Info' }
            ].map(({ step, label }) => (
              <button
                key={step}
                onClick={() => setCurrentStep(step)}
                className={`
                  flex flex-col items-center space-y-2
                  ${currentStep >= step ? 'text-teal' : 'text-ink/40'}
                `}
              >
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${
                      currentStep >= step
                        ? 'bg-teal text-paper'
                        : 'bg-ink/10 text-ink/40'
                    }
                  `}
                >
                  {step}
                </div>
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-paper/5 border border-ink/10 rounded-xl p-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={() => currentStep > 1 && setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
            {currentStep < 3 ? (
              <Button onClick={() => setCurrentStep(prev => prev + 1)}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
