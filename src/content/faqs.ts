export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Do I need any experience to start coaching?',
    answer:
      'Not at all. Many of my clients start as complete beginners. I will adapt every session to your current level and goals.',
  },
  {
    id: '2',
    question: 'What should I bring to a session?',
    answer:
      'Comfortable athletic clothing, climbing shoes if you have them (rentals are available at most gyms), a water bottle, and an open mind.',
  },
  {
    id: '3',
    question: 'How often should I train with a coach?',
    answer:
      'For most climbers, once or twice a week is ideal. Between sessions, I provide drills and exercises you can do on your own.',
  },
  {
    id: '4',
    question: 'Do you offer online coaching?',
    answer:
      'Yes — I offer video review and remote training plans. You film your sessions and I provide detailed feedback and programming adjustments.',
  },
  {
    id: '5',
    question: 'Where do sessions take place?',
    answer:
      'Sessions are held at local climbing gyms in the area. For outdoor sessions, I will arrange a meeting point at the crag.',
  },
  {
    id: '6',
    question: 'What is your cancellation policy?',
    answer:
      'Please give at least 24 hours notice. Late cancellations may be charged at 50% of the session fee.',
  },
  {
    id: '7',
    question: 'Can I buy coaching as a gift?',
    answer:
      'Absolutely! Gift vouchers are available for single sessions or packages. Just reach out via the contact form.',
  },
];
