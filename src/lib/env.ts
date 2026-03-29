// Keep environment-specific settings and secrets here.
// Public site and coach values live in src/content/site.ts so they can be versioned.
export const env = {
  instagram: {
    mode: (process.env.INSTAGRAM_MODE || 'manual') as 'manual' | 'proxy' | 'graph',
    manualJsonPath: process.env.INSTAGRAM_MANUAL_JSON_PATH || 'src/content/instagram.json',
    proxyUrl: process.env.INSTAGRAM_PROXY_URL || '',
    graphAccessToken: process.env.INSTAGRAM_GRAPH_ACCESS_TOKEN || '',
    graphUserId: process.env.INSTAGRAM_GRAPH_USER_ID || '',
  },
  analytics: process.env.NEXT_PUBLIC_ANALYTICS || '',
};
