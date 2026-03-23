'use client';

import { motion } from 'framer-motion';
import { CTAButton } from './CTAButton';

interface HeroProps {
  coachCity: string;
}

const projectBadges = [
  {
    alt: 'GitHub Actions CI status badge',
    external: true,
    href: 'https://github.com/mathemage/boulder-daddy/actions/workflows/ci.yml',
    src: 'https://github.com/mathemage/boulder-daddy/actions/workflows/ci.yml/badge.svg?branch=main',
  },
  {
    alt: 'Apache 2.0 code license badge',
    external: true,
    href: 'https://choosealicense.com/licenses/apache-2.0/',
    src: 'https://img.shields.io/badge/Code-Apache%202.0-blue.svg',
  },
  {
    alt: 'All rights reserved content notice badge',
    external: false,
    href: '/legal/licensing#content-license',
    src: 'https://img.shields.io/badge/Content-All%20rights%20reserved-lightgrey.svg',
  },
] as const;

export function Hero({ coachCity }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-900 px-4 py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-4xl font-bold tracking-tight md:text-6xl"
        >
          Climb Smarter. <span className="text-slate-400">Send Harder.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 md:text-xl"
        >
          Professional bouldering coaching in {coachCity}. Whether you are stepping on the wall for
          the first time or projecting your hardest grade, I will help you move with more
          efficiency, confidence, and joy.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <CTAButton href="/contact" size="lg">
            Start Coaching
          </CTAButton>
          <CTAButton href="/coaching" size="lg" variant="secondary">
            Learn More
          </CTAButton>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          {projectBadges.map((badge) => (
            <a
              key={badge.href}
              href={badge.href}
              target={badge.external ? '_blank' : undefined}
              rel={badge.external ? 'noopener noreferrer' : undefined}
              className="rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {/* Remote SVG badges are displayed directly to avoid extra Next.js image config. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={badge.src} alt={badge.alt} className="block h-5 w-auto" loading="lazy" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
