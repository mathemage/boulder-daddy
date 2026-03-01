'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact';
import { cn } from '@/lib/cn';
import { useState } from 'react';

const climbingLevels = [
  { value: 'beginner', label: 'Beginner (never climbed / first few months)' },
  { value: 'intermediate', label: 'Intermediate (V2–V4 / climbing 6+ months)' },
  { value: 'advanced', label: 'Advanced (V5–V7 / climbing 2+ years)' },
  { value: 'expert', label: 'Expert (V8+ / competition level)' },
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      preferredDays: [],
      honeypot: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="mb-2 text-xl font-bold text-green-900">Message Sent!</h3>
        <p className="text-green-700">
          Thanks for reaching out. I will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="mt-4 text-sm font-medium text-green-900 underline hover:no-underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Honeypot field — hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="honeypot">Do not fill this</label>
        <input id="honeypot" type="text" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Name *
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={cn(
              'w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900',
              errors.name ? 'border-red-400' : 'border-slate-300',
            )}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={cn(
              'w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900',
              errors.email ? 'border-red-400' : 'border-slate-300',
            )}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
          Phone <span className="text-slate-400">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      {/* Climbing Level */}
      <div>
        <label htmlFor="climbingLevel" className="mb-1 block text-sm font-medium text-slate-700">
          Climbing Level *
        </label>
        <select
          id="climbingLevel"
          {...register('climbingLevel')}
          className={cn(
            'w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900',
            errors.climbingLevel ? 'border-red-400' : 'border-slate-300',
          )}
        >
          <option value="">Select your level</option>
          {climbingLevels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
        {errors.climbingLevel && (
          <p className="mt-1 text-xs text-red-600">{errors.climbingLevel.message}</p>
        )}
      </div>

      {/* Goals */}
      <div>
        <label htmlFor="goals" className="mb-1 block text-sm font-medium text-slate-700">
          Your Goals *
        </label>
        <input
          id="goals"
          type="text"
          placeholder="e.g., Send my first V5, improve footwork, prepare for competition"
          {...register('goals')}
          className={cn(
            'w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900',
            errors.goals ? 'border-red-400' : 'border-slate-300',
          )}
        />
        {errors.goals && <p className="mt-1 text-xs text-red-600">{errors.goals.message}</p>}
      </div>

      {/* Preferred Days */}
      <div>
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-700">Preferred Days *</legend>
          <div className="flex flex-wrap gap-3">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  value={day}
                  {...register('preferredDays')}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                {day}
              </label>
            ))}
          </div>
          {errors.preferredDays && (
            <p className="mt-1 text-xs text-red-600">{errors.preferredDays.message}</p>
          )}
        </fieldset>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
          Message *
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell me a bit about yourself and what you are looking for..."
          {...register('message')}
          className={cn(
            'w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900',
            errors.message ? 'border-red-400' : 'border-slate-300',
          )}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      {submitStatus === 'error' && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Something went wrong. Please try again or email me directly.
        </div>
      )}

      <button
        type="submit"
        disabled={submitStatus === 'submitting'}
        className="w-full rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-60"
      >
        {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
