import type { Metadata } from 'next';
import { CTAButton } from '@/components/CTAButton';
import { env } from '@/lib/env';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${env.coachName} — professional bouldering coach in ${env.coachCity}. Coaching philosophy, safety practices, and certifications.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-slate-900 px-4 py-20 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">About Me</h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-300">
          Coach, climber, and lifelong student of movement.
        </p>
      </section>

      {/* Bio */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">My Story</h2>
          <div className="space-y-4 text-slate-600">
            <p>
              I started climbing over a decade ago and fell in love with the problem-solving nature
              of bouldering. What began as a hobby quickly became a passion — and eventually a
              career.
            </p>
            <p>
              After years of competing, projecting hard outdoor lines, and studying movement
              science, I started coaching to share what I&apos;ve learned. My goal is simple: help
              climbers of every level move better, progress consistently, and enjoy the process.
            </p>
            <p>
              I&apos;m based in {env.coachCity} and coach at several local gyms as well as outdoor
              crags in the surrounding area.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Coaching Philosophy</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: 'Technique First',
                desc: 'Strength matters, but technique is the multiplier. We build from the feet up.',
              },
              {
                title: 'Sustainable Progress',
                desc: 'Consistency over intensity. Training smart means staying healthy and climbing for years to come.',
              },
              {
                title: 'Individualised Approach',
                desc: 'No two climbers are the same. Every session is adapted to your body, goals, and learning style.',
              },
              {
                title: 'Joy in Movement',
                desc: 'Climbing should be fun. Progress comes faster when you are engaged, curious, and enjoying yourself.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="mb-2 font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Certs */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Safety &amp; Certifications</h2>
          <div className="space-y-4 text-slate-600">
            <p>
              Safety is the foundation of every session. I hold current first-aid certification and
              ensure proper warm-up protocols, spotting techniques, and session structuring to
              minimise injury risk.
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Certified climbing instructor</li>
              <li>First Aid certified (updated annually)</li>
              <li>Movement analysis &amp; coaching methodology training</li>
              <li>Finger injury prevention specialist</li>
              <li>DBS/background check cleared</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Let&apos;s Work Together</h2>
        <p className="mx-auto mb-8 max-w-xl text-slate-600">
          Ready to take your climbing to the next level? I would love to hear about your goals.
        </p>
        <CTAButton href="/contact">Get in Touch</CTAButton>
      </section>
    </>
  );
}
