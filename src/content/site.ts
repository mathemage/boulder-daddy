export interface SiteConfig {
  brandName: string;
  coachName: string;
  coachCity: string;
  coachEmail: string;
  siteUrl: string;
  coachIgUsername: string;
  bookingUrl: string;
}

export const siteConfig = {
  brandName: 'mathemage',
  coachName: 'Mgr. Karel Ha',
  coachCity: 'Prague/Pilsen, Czech Republic',
  coachEmail: 'bouldertatka@gmail.com',
  siteUrl: 'https://boulder-daddy.vercel.app',
  coachIgUsername: 'mathemage',
  bookingUrl: 'https://calendar.app.google/CUTBE7hcFyrJPbU17',
} satisfies SiteConfig;

export function normalizeSiteUrl(siteUrl: string): string {
  return siteUrl.replace(/\/$/, '');
}

export const normalizedSiteUrl = normalizeSiteUrl(siteConfig.siteUrl);
