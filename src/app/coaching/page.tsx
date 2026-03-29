import type { Metadata } from 'next';
import { services } from '@/content/services';
import { siteConfig } from '@/content/site';
import { CTAButton } from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'Coaching',
  description: `Bouldering coaching services in ${siteConfig.coachCity}. From beginner fundamentals to advanced project coaching — find the right session for your level.`,
};

export default function CoachingPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-900 px-4 py-20 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Coaching</h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-300">
          Personalised bouldering coaching designed to meet you where you are and take you where you
          want to go.
        </p>
      </section>

      {/* Philosophy */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">My Coaching Philosophy</h2>
          <div className="space-y-4 text-slate-600">
            <p>
              Good climbing is efficient climbing. My approach focuses on building solid movement
              fundamentals — footwork, body positioning, balance, and reading sequences — before
              layering on strength and power.
            </p>
            <p>
              Every session is tailored to your current level and goals. I use video analysis,
              structured drills, and deliberate practice to help you progress consistently and
              sustainably.
            </p>
            <p>
              I believe in climbing with intention: quality over quantity, technique over force, and
              longevity over short-term gains.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-slate-900">
            Services in Detail
          </h2>
          <div className="space-y-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-xl border border-slate-200 bg-white p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{service.icon}</span>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-slate-900">{service.title}</h3>
                    <p className="mb-4 text-slate-600">{service.description}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                        Duration: {service.duration}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                        For: {service.whoFor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Not Sure Which Session?</h2>
        <p className="mx-auto mb-8 max-w-xl text-slate-600">
          Send me a message and I will recommend the best starting point based on your experience
          and goals.
        </p>
        <CTAButton href="/contact">Get in Touch</CTAButton>
      </section>
    </>
  );
}
