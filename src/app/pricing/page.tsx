import type { Metadata } from 'next';
import { PricingTable } from '@/components/PricingTable';
import { FAQ } from '@/components/FAQ';
import { env } from '@/lib/env';

export const metadata: Metadata = {
  title: 'Pricing',
  description: `Bouldering coaching pricing in ${env.coachCity}. Flexible single sessions, multi-session packs, and monthly programmes.`,
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-slate-900 px-4 py-20 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Pricing</h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-300">
          Transparent pricing with flexible options. Every session is an investment in climbing
          smarter and sending harder.
        </p>
      </section>

      <PricingTable />
      <FAQ />
    </>
  );
}
