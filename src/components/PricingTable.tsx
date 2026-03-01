'use client';

import { motion } from 'framer-motion';
import { pricingTiers } from '@/content/pricing';
import { cn } from '@/lib/cn';
import { CTAButton } from './CTAButton';

export function PricingTable() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
            Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Flexible options to fit your goals and budget. All sessions include personalised
            feedback and actionable takeaways.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                'relative rounded-xl border p-8',
                tier.highlighted
                  ? 'border-slate-900 bg-slate-900 text-white shadow-xl'
                  : 'border-slate-200 bg-white',
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-bold text-slate-900">
                  Most Popular
                </div>
              )}
              <h3 className="mb-2 text-xl font-bold">{tier.name}</h3>
              <div className="mb-1">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span
                  className={cn(
                    'ml-1 text-sm',
                    tier.highlighted ? 'text-slate-300' : 'text-slate-500',
                  )}
                >
                  {tier.period}
                </span>
              </div>
              <p
                className={cn(
                  'mb-6 text-sm',
                  tier.highlighted ? 'text-slate-300' : 'text-slate-600',
                )}
              >
                {tier.description}
              </p>
              <ul className="mb-8 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      'flex items-start gap-2 text-sm',
                      tier.highlighted ? 'text-slate-200' : 'text-slate-600',
                    )}
                  >
                    <span className="mt-0.5 text-green-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <CTAButton
                href="/contact"
                variant={tier.highlighted ? 'secondary' : 'primary'}
                className={cn(
                  'w-full text-center',
                  tier.highlighted &&
                    'border-white text-white hover:bg-white hover:text-slate-900',
                )}
              >
                {tier.cta}
              </CTAButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
