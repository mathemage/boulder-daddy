import Link from 'next/link';
import { env } from '@/lib/env';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
              Boulder Daddy
            </h3>
            <p className="text-sm text-slate-600">
              Professional bouldering coaching in {env.coachCity}. Helping climbers of all levels
              move better, climb harder, and stay injury-free.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
              Pages
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/coaching" className="hover:text-slate-900">
                  Coaching
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-slate-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-slate-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-slate-900">
                  Results
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
              Connect
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/contact" className="hover:text-slate-900">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${env.coachIgUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href={`mailto:${env.coachEmail}`} className="hover:text-slate-900">
                  {env.coachEmail}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/legal/privacy" className="hover:text-slate-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          © {year} {env.coachName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
