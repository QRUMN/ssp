export type MembershipTier = 'nomad' | 'pow-wow' | 'tribe';

export interface Membership {
  id: MembershipTier;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

export const memberships: Membership[] = [
  {
    id: 'nomad',
    name: 'Nomad',
    price: '$0',
    period: '/month',
    features: [
      'View upcoming events',
      'Basic profile',
      'Limited community access',
      'No early access',
      'No discounts',
    ],
  },
  {
    id: 'tribe',
    name: 'Tribe',
    price: '$22.44',
    period: '/month',
    features: [
      'Host & create events',
      'Premium profile badge',
      '30% off all tickets',
      'Early access (48h)',
      'Dedicated support',
    ],
    highlighted: true,
  },
  {
    id: 'pow-wow',
    name: 'Pow Wow',
    price: '$11.88',
    period: '/month',
    features: [
      'Full community access',
      'Enhanced profile',
      '15% off all tickets',
      'Early access (24h)',
      'Priority support',
    ],
  },
];

export const membershipTierLabels: Record<MembershipTier, string> = {
  'nomad': 'Nomad',
  'pow-wow': 'Pow Wow',
  'tribe': 'Tribe',
};