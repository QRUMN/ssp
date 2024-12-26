import * as z from 'zod';

export const userSchema = {
  individual: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    location: z.object({
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      country: z.string().min(1, 'Country is required'),
    }),
    bio: z.string().min(50, 'Bio must be at least 50 characters'),
    interests: z.array(z.string()).min(2, 'Select at least 2 interests'),
    languages: z.array(z.string()).optional(),
    socialLinks: z.object({
      instagram: z.string().url().optional().or(z.literal('')),
      twitter: z.string().url().optional().or(z.literal('')),
      linkedin: z.string().url().optional().or(z.literal('')),
    }).optional(),
    preferences: z.object({
      eventNotifications: z.boolean(),
      newsletterSubscription: z.boolean(),
      privateProfile: z.boolean(),
    }),
  }),

  organization: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    location: z.object({
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      country: z.string().min(1, 'Country is required'),
    }),
    organization: z.string().min(2, 'Organization name is required'),
    website: z.string().url('Invalid website URL'),
    description: z.string().min(100, 'Description must be at least 100 characters'),
    organizationType: z.enum(['nonprofit', 'education', 'business', 'community']),
    foundedYear: z.number().min(1800).max(new Date().getFullYear()),
    size: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
    socialLinks: z.object({
      facebook: z.string().url().optional().or(z.literal('')),
      instagram: z.string().url().optional().or(z.literal('')),
      linkedin: z.string().url().optional().or(z.literal('')),
    }),
    taxId: z.string().optional(),
    interests: z.array(z.string()).min(2, 'Select at least 2 interests'),
  }),

  teacher: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    location: z.object({
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      country: z.string().min(1, 'Country is required'),
    }),
    expertise: z.array(z.string()).min(1, 'Select at least one area of expertise'),
    bio: z.string().min(100, 'Bio must be at least 100 characters'),
    experience: z.object({
      years: z.number().min(0, 'Invalid years of experience'),
      certifications: z.array(z.object({
        name: z.string(),
        issuer: z.string(),
        year: z.number(),
      })).optional(),
      languages: z.array(z.string()).min(1, 'Select at least one language'),
    }),
    teachingStyle: z.array(z.string()).min(1, 'Select at least one teaching style'),
    availability: z.object({
      weekdays: z.boolean(),
      weekends: z.boolean(),
      evenings: z.boolean(),
      mornings: z.boolean(),
    }),
    pricing: z.object({
      hourlyRate: z.number().min(0, 'Invalid hourly rate'),
      groupRate: z.number().min(0, 'Invalid group rate'),
      currency: z.string(),
    }),
    interests: z.array(z.string()).min(2, 'Select at least 2 interests'),
  }),
};

export type UserFormData = {
  individual: z.infer<typeof userSchema.individual>;
  organization: z.infer<typeof userSchema.organization>;
  teacher: z.infer<typeof userSchema.teacher>;
};
