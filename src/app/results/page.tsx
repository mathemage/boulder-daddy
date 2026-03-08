import type { Metadata } from 'next';
import { Testimonials } from '@/components/Testimonials';
import { CTAButton } from '@/components/CTAButton';
import { testimonials } from '@/content/testimonials';
import { env } from '@/lib/env';

export const metadata: Metadata = {
  title: 'Results',
  description: `See real results from ${env.coachName}'s bouldering coaching. Testimonials, progress stories, and client achievements.`,
};

export default function ResultsPage() {
  return (
    <>
      <section className="bg-slate-900 px-4 py-20 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Results</h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-300">
          Real progress from real climbers. Here is what targeted coaching can achieve.
        </p>
      </section>

      {/* Progress Metrics */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
            Client Progress Snapshots
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials
              .filter((t) => t.beforeGrade && t.afterGrade)
              .map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 text-center"
                >
                  <p className="mb-2 font-semibold text-slate-900">{t.name}</p>
                  <div className="mb-2 flex items-center justify-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                      {t.beforeGrade}
                    </span>
                    <span className="text-slate-400">→</span>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-sm text-white">
                      {t.afterGrade}
                    </span>
                  </div>
                  {t.duration && (
                    <p className="text-xs text-slate-500">in {t.duration}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="px-4 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Your Story Could Be Next</h2>
        <p className="mx-auto mb-8 max-w-xl text-slate-600">
          Ready to start your own progress journey? Let&apos;s talk about your goals and build a
          plan.
        </p>
        <CTAButton href="/contact">Start Your Journey</CTAButton>
      </section>
    </>
  );
}
