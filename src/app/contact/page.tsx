import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { env } from '@/lib/env';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${env.coachName} for bouldering coaching inquiries in ${env.coachCity}. Book a session or ask a question.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-slate-900 px-4 py-20 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Get in Touch</h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-300">
          Ready to start climbing smarter? Fill out the form below and I will get back to you
          within 24 hours.
        </p>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="mb-1 text-sm font-bold text-slate-900">Email</h3>
              <a
                href={`mailto:${env.coachEmail}`}
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                {env.coachEmail}
              </a>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="mb-1 text-sm font-bold text-slate-900">Instagram</h3>
              <a
                href={`https://instagram.com/${env.coachIgUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                @{env.coachIgUsername}
              </a>
            </div>
          </div>

          {env.bookingUrl && (
            <div className="mb-8 rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="mb-2 text-sm text-slate-600">
                Prefer to book directly? Use my scheduling link:
              </p>
              <a
                href={env.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Book a Session
              </a>
            </div>
          )}

          <ContactForm />
        </div>
      </section>
    </>
  );
}
