'use client';

import Link from 'next/link';
import { useState } from 'react';
import { siteConfig } from '@/content/site';
import { cn } from '@/lib/cn';
import { CTAButton } from './CTAButton';

const navLinks = [
  { href: '/coaching', label: 'Coaching' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/results', label: 'Results' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
          {siteConfig.brandName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
          <CTAButton href="/contact" size="sm">
            Get in Touch
          </CTAButton>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={cn(
              'h-0.5 w-6 bg-slate-700 transition-transform',
              menuOpen && 'translate-y-1.5 rotate-45',
            )}
          />
          <span
            className={cn('h-0.5 w-6 bg-slate-700 transition-opacity', menuOpen && 'opacity-0')}
          />
          <span
            className={cn(
              'h-0.5 w-6 bg-slate-700 transition-transform',
              menuOpen && '-translate-y-1.5 -rotate-45',
            )}
          />
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
            <CTAButton href="/contact" size="sm" className="mt-2 w-full text-center">
              Get in Touch
            </CTAButton>
          </div>
        </nav>
      )}
    </header>
  );
}
