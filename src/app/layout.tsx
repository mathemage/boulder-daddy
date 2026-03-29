import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { normalizedSiteUrl, siteConfig } from '@/content/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(normalizedSiteUrl),
  title: {
    default: `${siteConfig.brandName} — Bouldering Coach in ${siteConfig.coachCity}`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: `Professional bouldering and climbing coaching in ${siteConfig.coachCity}. Improve your technique, send harder grades, and stay injury-free with personalised coaching from ${siteConfig.coachName}.`,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.brandName,
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
    name: siteConfig.coachName,
    alternateName: siteConfig.brandName,
    description: `Professional bouldering coach in ${siteConfig.coachCity}`,
    url: normalizedSiteUrl,
    email: siteConfig.coachEmail,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.coachCity,
    },
    sameAs: [`https://instagram.com/${siteConfig.coachIgUsername}`],
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
