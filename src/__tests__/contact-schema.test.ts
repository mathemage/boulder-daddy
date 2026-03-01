import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/lib/schemas/contact';

describe('contactSchema', () => {
  const validData = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+1234567890',
    climbingLevel: 'intermediate' as const,
    goals: 'Improve my footwork and send V5',
    preferredDays: ['Monday', 'Wednesday'],
    message: 'I would love to start coaching sessions.',
    honeypot: '',
  };

  it('validates correct data', () => {
    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = contactSchema.safeParse({ ...validData, name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({ ...validData, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid climbing level', () => {
    const result = contactSchema.safeParse({ ...validData, climbingLevel: 'pro' });
    expect(result.success).toBe(false);
  });

  it('rejects empty goals', () => {
    const result = contactSchema.safeParse({ ...validData, goals: 'hi' });
    expect(result.success).toBe(false);
  });

  it('rejects empty preferred days', () => {
    const result = contactSchema.safeParse({ ...validData, preferredDays: [] });
    expect(result.success).toBe(false);
  });

  it('rejects short message', () => {
    const result = contactSchema.safeParse({ ...validData, message: 'hi' });
    expect(result.success).toBe(false);
  });

  it('rejects filled honeypot', () => {
    const result = contactSchema.safeParse({ ...validData, honeypot: 'spam' });
    expect(result.success).toBe(false);
  });

  it('allows optional phone', () => {
    const result = contactSchema.safeParse({ ...validData, phone: '' });
    expect(result.success).toBe(true);
  });

  it('allows missing phone', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { phone: _phone, ...dataWithoutPhone } = validData;
    const result = contactSchema.safeParse(dataWithoutPhone);
    expect(result.success).toBe(true);
  });
});
