export interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  whoFor: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: 'beginner',
    title: 'Intro to Bouldering',
    description:
      'Learn the fundamentals of movement, footwork, and body positioning. Perfect for anyone stepping on the wall for the first time or looking to build a solid foundation.',
    duration: '60 min',
    whoFor: 'Complete beginners',
    icon: '🧗',
  },
  {
    id: 'technique',
    title: 'Technique & Movement',
    description:
      'Refine your climbing technique with drills targeting balance, hip positioning, flagging, and efficient movement patterns. Move smarter, not harder.',
    duration: '90 min',
    whoFor: 'V2–V5 climbers',
    icon: '⚡',
  },
  {
    id: 'projecting',
    title: 'Project Coaching',
    description:
      'Dedicated sessions to break through your plateau. We analyse beta, work sequences, and build a plan to send your project — indoors or outdoors.',
    duration: '2 hours',
    whoFor: 'V4+ climbers',
    icon: '🎯',
  },
  {
    id: 'group',
    title: 'Group Sessions',
    description:
      'Small group coaching (2–4 people) focused on drills, games, and structured climbing. Great for friends or teams wanting to improve together.',
    duration: '90 min',
    whoFor: 'All levels',
    icon: '👥',
  },
  {
    id: 'training',
    title: 'Training Plans',
    description:
      'Custom training programmes tailored to your goals, schedule, and available equipment. Includes hangboard protocols, mobility work, and progress tracking.',
    duration: 'Ongoing',
    whoFor: 'V3+ climbers',
    icon: '📋',
  },
  {
    id: 'outdoor',
    title: 'Outdoor Trips',
    description:
      'Guided outdoor bouldering sessions at local crags. Learn how to read rock, spot safely, and transfer your indoor skills to real stone.',
    duration: 'Half day',
    whoFor: 'V2+ climbers',
    icon: '🏔️',
  },
];
