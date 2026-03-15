import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { env } from '@/lib/env';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${env.coachName} — Bouldering Coach in ${env.coachCity}`,
    template: `%s | ${env.coachName}`,
  },
  description: `Professional bouldering and climbing coaching in ${env.coachCity}. Improve your technique, send harder grades, and stay injury-free with personalised coaching from ${env.coachName}.`,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: env.coachName,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Person'],
    name: env.coachName,
    description: `Professional bouldering coach in ${env.coachCity}`,
    url: env.siteUrl,
    email: env.coachEmail,
    address: {
      '@type': 'PostalAddress',
      addressLocality: env.coachCity,
    },
    sameAs: [`https://instagram.com/${env.coachIgUsername}`],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
