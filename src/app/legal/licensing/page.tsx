import type { Metadata } from 'next';

const LAST_UPDATED = 'March 2026';

export const metadata: Metadata = {
  title: 'Licensing',
  description: 'License summary for the Boulder Daddy website code, branding, content, and media.',
};

export default function LicensingPage() {
  return (
    <>
      <section className="bg-slate-900 px-4 py-20 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Licensing</h1>
      </section>

      <section className="px-4 py-16">
        <div className="prose mx-auto max-w-3xl text-slate-600">
          <p className="mb-6 text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>

          <h2 id="code-license" className="mb-4 text-xl font-bold text-slate-900">
            Code license
          </h2>
          <p className="mb-6">
            The software source code for this project is licensed under the Apache License 2.0. You
            can review the full license text at{' '}
            <a
              href="https://choosealicense.com/licenses/apache-2.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-900 underline"
            >
              choosealicense.com/licenses/apache-2.0
            </a>
            .
          </p>

          <h2 id="content-license" className="mb-4 text-xl font-bold text-slate-900">
            Content, branding, and media
          </h2>
          <p className="mb-6">
            Project-specific branding, site copy, testimonials, pricing information, editorial
            content, and custom image or media assets are all rights reserved and are not licensed
            under Apache-2.0.
          </p>
          <p className="mb-6">
            This includes files in <code>src/content/</code> and custom project assets in{' '}
            <code>public/</code> unless a file states otherwise.
          </p>

          <h2 className="mb-4 text-xl font-bold text-slate-900">Trademarks</h2>
          <p>
            No trademark or branding rights are granted in the Boulder Daddy name, logos, or other
            brand assets. Third-party assets remain subject to their own terms.
          </p>
        </div>
      </section>
    </>
  );
}
