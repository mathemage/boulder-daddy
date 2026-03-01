'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/content/faqs';
import { cn } from '@/lib/cn';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="bg-slate-50 px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-lg border border-slate-200 bg-white">
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-900"
                aria-expanded={openId === faq.id}
              >
                {faq.question}
                <span
                  className={cn(
                    'ml-4 text-slate-400 transition-transform',
                    openId === faq.id && 'rotate-180',
                  )}
                >
                  ▾
                </span>
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-sm text-slate-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
