export const env = {
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',
  coachName: process.env.COACH_NAME || 'Boulder Daddy',
  coachCity: process.env.COACH_CITY || 'Your City',
  coachEmail: process.env.COACH_EMAIL || 'coach@example.com',
  coachIgUsername: process.env.COACH_IG_USERNAME || 'boulder_daddy',
  bookingUrl: process.env.BOOKING_URL || '',
  instagram: {
    mode: (process.env.INSTAGRAM_MODE || 'manual') as 'manual' | 'proxy' | 'graph',
    manualJsonPath: process.env.INSTAGRAM_MANUAL_JSON_PATH || 'src/content/instagram.json',
    proxyUrl: process.env.INSTAGRAM_PROXY_URL || '',
    graphAccessToken: process.env.INSTAGRAM_GRAPH_ACCESS_TOKEN || '',
    graphUserId: process.env.INSTAGRAM_GRAPH_USER_ID || '',
  },
  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY || '',
    secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
  },
  analytics: process.env.NEXT_PUBLIC_ANALYTICS || '',
};
