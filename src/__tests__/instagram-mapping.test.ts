import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { HOMEPAGE_INSTAGRAM_POST_LIMIT } from '@/lib/instagram';
import { normalizeGraphPosts } from '@/lib/instagram/getInstagramPosts';
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

  it('uses video thumbnails for Graph API posts', () => {
    const posts = normalizeGraphPosts([
      {
        id: 'ig-video-1',
        media_type: 'VIDEO',
        media_url: 'https://example.com/video.mp4',
        thumbnail_url: 'https://example.com/video-thumb.jpg',
        permalink: 'https://instagram.com/p/video',
        timestamp: '2025-01-20T10:00:00Z',
      },
    ]);

    expect(posts).toHaveLength(1);
    expect(posts[0].image).toBe('https://example.com/video-thumb.jpg');
  });

  it('filters Graph API posts without a usable image', () => {
    const posts = normalizeGraphPosts([
      {
        id: 'ig-video-2',
        media_type: 'VIDEO',
        media_url: 'https://example.com/video.mp4',
        permalink: 'https://instagram.com/p/video-2',
      },
    ]);

    expect(posts).toHaveLength(0);
  });

  it('ships twelve real manual posts for the homepage gallery', () => {
    const manualPath = path.resolve(process.cwd(), 'src/content/instagram.json');
    const raw = JSON.parse(readFileSync(manualPath, 'utf8')) as InstagramPost[];
    const homepagePosts = raw.slice(0, HOMEPAGE_INSTAGRAM_POST_LIMIT);

    expect(raw.length).toBeGreaterThanOrEqual(HOMEPAGE_INSTAGRAM_POST_LIMIT);
    expect(homepagePosts).toHaveLength(HOMEPAGE_INSTAGRAM_POST_LIMIT);
    expect(homepagePosts.filter((post) => post.caption).length).toBeGreaterThanOrEqual(6);

    homepagePosts.forEach((post) => {
      expect(post.image).toMatch(/^(\/|https?:\/\/)/);
      expect(post.image).not.toContain('placehold.co');
      expect(post.url).toMatch(/^https:\/\/www\.instagram\.com\/(?:reel|p)\/[A-Za-z0-9_-]+\/$/);
      expect(post.url).not.toContain('example');
      expect(Number.isNaN(Date.parse(post.timestamp))).toBe(false);
    });
  });
});
