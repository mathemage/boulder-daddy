import { describe, expect, it } from 'vitest';
import { normalizeSiteUrl, normalizedSiteUrl, siteConfig } from '@/content/site';

describe('site config', () => {
  it('normalizes a trailing slash from a site URL', () => {
    expect(normalizeSiteUrl('https://example.com/')).toBe('https://example.com');
  });

  it('preserves a site URL without a trailing slash', () => {
    expect(normalizeSiteUrl('https://example.com')).toBe('https://example.com');
  });

  it('exports a normalized canonical site URL', () => {
    expect(normalizedSiteUrl).toBe(siteConfig.siteUrl);
    expect(normalizedSiteUrl.endsWith('/')).toBe(false);
  });
});
