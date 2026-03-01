import type { Metadata } from 'next';
import { env } from '@/lib/env';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${env.coachName}'s coaching website.`,
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-slate-900 px-4 py-20 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
      </section>

      <section className="px-4 py-16">
        <div className="prose mx-auto max-w-3xl text-slate-600">
          <p className="mb-6 text-sm text-slate-500">Last updated: January 2025</p>

          <h2 className="mb-4 text-xl font-bold text-slate-900">1. Information We Collect</h2>
          <p className="mb-6">
            When you use our contact form, we collect the information you provide: your name, email
            address, phone number (optional), climbing level, goals, preferred coaching days, and
            your message. This information is used solely to respond to your inquiry and arrange
            coaching sessions.
          </p>

          <h2 className="mb-4 text-xl font-bold text-slate-900">2. How We Use Your Information</h2>
          <p className="mb-6">
            Your personal information is used to respond to coaching inquiries, schedule and manage
            sessions, and communicate about your coaching programme. We do not sell, rent, or share
            your personal information with third parties.
          </p>

          <h2 className="mb-4 text-xl font-bold text-slate-900">3. Data Storage</h2>
          <p className="mb-6">
            Contact form submissions are processed via secure server-side routes. We retain your
            information only as long as necessary to provide coaching services and respond to
            inquiries.
          </p>

          <h2 className="mb-4 text-xl font-bold text-slate-900">4. Cookies</h2>
          <p className="mb-6">
            This website uses only essential cookies required for the site to function. If
            analytics are enabled, they use privacy-friendly, cookieless tracking.
          </p>

          <h2 className="mb-4 text-xl font-bold text-slate-900">5. Third-Party Services</h2>
          <p className="mb-6">
            This site may display content from Instagram. When viewing embedded content, Instagram
            may collect data according to their own privacy policy. Our site is hosted on Vercel,
            which may collect basic server logs.
          </p>

          <h2 className="mb-4 text-xl font-bold text-slate-900">6. Your Rights</h2>
          <p className="mb-6">
            You have the right to request access to, correction of, or deletion of your personal
            data. To exercise these rights, please contact{' '}
            <a href={`mailto:${env.coachEmail}`} className="text-slate-900 underline">
              {env.coachEmail}
            </a>
            .
          </p>

          <h2 className="mb-4 text-xl font-bold text-slate-900">7. Contact</h2>
          <p>
            If you have questions about this privacy policy, please email{' '}
            <a href={`mailto:${env.coachEmail}`} className="text-slate-900 underline">
              {env.coachEmail}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
