export interface SiteConfig {
  coachName: string;
  coachCity: string;
  coachEmail: string;
}

export const siteConfig = {
  coachName: 'Mgr. Karel Ha',
  coachCity: 'Prague/Pilsen, Czech Republic',
  coachEmail: 'bouldertatka@gmail.com',
} satisfies SiteConfig;
