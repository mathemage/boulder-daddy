'use client';

import { motion } from 'framer-motion';
import { CTAButton } from './CTAButton';
import { env } from '@/lib/env';

export function Hero() {
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
          Climb Smarter.{' '}
          <span className="text-slate-400">Send Harder.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 md:text-xl"
        >
          Professional bouldering coaching in {env.coachCity}. Whether you are
          stepping on the wall for the first time or projecting your hardest
          grade, I will help you move with more efficiency, confidence, and joy.
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
      </div>
    </section>
  );
}
