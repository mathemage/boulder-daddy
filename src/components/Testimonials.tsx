'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/content/testimonials';

export function Testimonials() {
  return (
    <section className="bg-slate-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
            What Climbers Say
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Real progress from real climbers. Here is what my clients have to say about their
            coaching experience.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <p className="mb-4 text-sm italic text-slate-600">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">Climbing {t.grade}</p>
                </div>
                {t.beforeGrade && t.afterGrade && (
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Progress</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {t.beforeGrade} → {t.afterGrade}
                    </div>
                    {t.duration && (
                      <div className="text-xs text-slate-500">in {t.duration}</div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
