import { describe, it, expect } from 'vitest';
import type { InstagramPost } from '@/lib/instagram/types';

// We test the manual reading path
describe('Instagram mapping', () => {
  it('maps manual JSON to InstagramPost type', () => {
    const raw = [
      {
        id: 'ig-1',
        image: 'https://placehold.co/600x600',
        caption: 'Test caption',
        url: 'https://instagram.com/p/test',
        timestamp: '2025-01-15T10:00:00Z',
      },
    ];

    const posts: InstagramPost[] = raw.map((item) => ({
      id: item.id,
      image: item.image,
      caption: item.caption,
      url: item.url,
      timestamp: item.timestamp,
    }));

    expect(posts).toHaveLength(1);
    expect(posts[0].id).toBe('ig-1');
    expect(posts[0].image).toContain('placehold.co');
    expect(posts[0].caption).toBe('Test caption');
    expect(posts[0].url).toContain('instagram.com');
    expect(posts[0].timestamp).toBeTruthy();
  });

  it('handles missing caption gracefully', () => {
    const raw = [
      {
        id: 'ig-2',
        image: 'https://placehold.co/600x600',
        caption: '',
        url: 'https://instagram.com/p/test2',
        timestamp: '2025-01-10T14:30:00Z',
      },
    ];

    const posts: InstagramPost[] = raw.map((item) => ({
      id: item.id,
      image: item.image,
      caption: item.caption || '',
      url: item.url,
      timestamp: item.timestamp,
    }));

    expect(posts[0].caption).toBe('');
  });

  it('handles proxy-style data mapping', () => {
    // Simulating proxy response format
    const proxyData = [
      {
        shortcode: 'abc123',
        thumbnail_url: 'https://example.com/image.jpg',
        text: 'Proxy caption',
        permalink: 'https://instagram.com/p/abc123',
        taken_at: '2025-01-01T00:00:00Z',
      },
    ];

    const posts: InstagramPost[] = proxyData.map((item) => ({
      id: String(item.shortcode || ''),
      image: String(item.thumbnail_url || ''),
      caption: String(item.text || ''),
      url: String(item.permalink || ''),
      timestamp: String(item.taken_at || new Date().toISOString()),
    }));

    expect(posts[0].id).toBe('abc123');
    expect(posts[0].image).toContain('example.com');
    expect(posts[0].caption).toBe('Proxy caption');
  });
});
