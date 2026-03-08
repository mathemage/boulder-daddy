'use client';

import { motion } from 'framer-motion';
import { services } from '@/content/services';
import { CTAButton } from './CTAButton';

export function ServiceCards() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
            What I Offer
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            From first-time climbers to experienced boulderers — targeted coaching to help you
            progress faster and enjoy the process.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-3 text-3xl">{service.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">{service.title}</h3>
              <p className="mb-4 text-sm text-slate-600">{service.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">{service.duration}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{service.whoFor}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <CTAButton href="/pricing">View Pricing</CTAButton>
        </div>
      </div>
    </section>
  );
}
