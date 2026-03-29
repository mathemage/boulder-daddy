export interface SiteConfig {
  brandName: string;
  coachName: string;
  coachCity: string;
  coachEmail: string;
}

export const siteConfig = {
  brandName: 'mathemage',
  coachName: 'Mgr. Karel Ha',
  coachCity: 'Prague/Pilsen, Czech Republic',
  coachEmail: 'bouldertatka@gmail.com',
} satisfies SiteConfig;
