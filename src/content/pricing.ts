export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'single',
    name: 'Single Session',
    price: '€50',
    period: 'per session',
    description: 'Try a session and see if we are a good fit.',
    features: [
      '60-minute 1-on-1 coaching',
      'Video analysis included',
      'Personalised feedback notes',
      'Flexible scheduling',
    ],
    cta: 'Book a Session',
  },
  {
    id: 'pack5',
    name: '5-Session Pack',
    price: '€220',
    period: '5 sessions',
    description: 'Commit to real progress with a focused block of coaching.',
    features: [
      'Five 60-minute sessions',
      'Video analysis each session',
      'Written progress reports',
      'Priority scheduling',
      'WhatsApp support between sessions',
    ],
    highlighted: true,
    cta: 'Get Started',
  },
  {
    id: 'monthly',
    name: 'Monthly Programme',
    price: '€350',
    period: 'per month',
    description: 'Ongoing coaching with a custom training plan.',
    features: [
      'Four 90-minute sessions/month',
      'Custom training plan',
      'Weekly check-ins',
      'Video review & feedback',
      'Nutrition guidance',
      'Priority scheduling',
    ],
    cta: 'Apply Now',
  },
];
