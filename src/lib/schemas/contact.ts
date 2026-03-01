import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().or(z.literal('')),
  climbingLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert'], {
    errorMap: () => ({ message: 'Please select your climbing level' }),
  }),
  goals: z.string().min(10, 'Please describe your goals (at least 10 characters)'),
  preferredDays: z.array(z.string()).min(1, 'Please select at least one preferred day'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
