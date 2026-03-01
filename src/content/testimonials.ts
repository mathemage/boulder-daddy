export interface Testimonial {
  id: string;
  name: string;
  grade: string;
  text: string;
  beforeGrade?: string;
  afterGrade?: string;
  duration?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alex R.',
    grade: 'V5',
    text: 'I was stuck at V3 for months. After just six sessions, the footwork drills completely changed how I climb. Sent my first V5 outdoors within two months.',
    beforeGrade: 'V3',
    afterGrade: 'V5',
    duration: '2 months',
  },
  {
    id: '2',
    name: 'Maria K.',
    grade: 'V4',
    text: 'As a complete beginner, I was intimidated by bouldering. The intro sessions made everything approachable and fun. Now I am hooked and climbing three times a week.',
    beforeGrade: 'Never climbed',
    afterGrade: 'V4',
    duration: '6 months',
  },
  {
    id: '3',
    name: 'Tom S.',
    grade: 'V7',
    text: 'The project coaching helped me break down problems I had been struggling with for weeks. The beta reading skills alone were worth the investment.',
    beforeGrade: 'V5',
    afterGrade: 'V7',
    duration: '4 months',
  },
  {
    id: '4',
    name: 'Lena P.',
    grade: 'V3',
    text: 'The group sessions are brilliant — competitive but supportive. Our team of four all progressed at least a grade in three months.',
    beforeGrade: 'V1',
    afterGrade: 'V3',
    duration: '3 months',
  },
  {
    id: '5',
    name: 'Jake W.',
    grade: 'V6',
    text: 'The training plan was a game-changer. Having a structured approach to hangboarding and movement drills gave me consistent progress instead of random sessions.',
    beforeGrade: 'V4',
    afterGrade: 'V6',
    duration: '5 months',
  },
];
