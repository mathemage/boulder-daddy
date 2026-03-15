import { readFile } from 'fs/promises';
import path from 'path';
import { unstable_cache } from 'next/cache';
import { env } from '@/lib/env';
import { InstagramPost } from './types';

const INSTAGRAM_REVALIDATE_SECONDS = 21600;

interface GraphMediaItem {
  id: string;
  media_type?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  caption?: string;
  permalink?: string;
  timestamp?: string;
}

async function readManualPosts(): Promise<InstagramPost[]> {
  try {
    const filePath = path.resolve(process.cwd(), env.instagram.manualJsonPath);
    const raw = await readFile(filePath, 'utf-8');
    const data = JSON.parse(raw) as InstagramPost[];
    return data;
  } catch (error) {
    console.error('Failed to read manual Instagram JSON:', error);
    return [];
  }
}

const getManualPosts = unstable_cache(readManualPosts, ['instagram-manual-posts', env.instagram.manualJsonPath], {
  revalidate: INSTAGRAM_REVALIDATE_SECONDS,
});

async function getProxyPosts(): Promise<InstagramPost[]> {
  if (!env.instagram.proxyUrl) {
    console.warn('INSTAGRAM_PROXY_URL not set, falling back to manual posts');
    return getManualPosts();
  }

  try {
    const res = await fetch(env.instagram.proxyUrl, {
      next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      throw new Error(`Proxy returned ${res.status}`);
    }

    const data = await res.json();

    // Map proxy response to our internal type
    // Adjust mapping based on your proxy's response format
    if (Array.isArray(data)) {
      return data
        .map((item: Record<string, unknown>) => ({
          id: String(item.id || item.shortcode || ''),
          image: String(item.image || item.thumbnail_url || item.display_url || ''),
          caption: String(item.caption || item.text || ''),
          url: String(item.url || item.permalink || ''),
          timestamp: String(item.timestamp || item.taken_at || new Date().toISOString()),
        }))
        .filter((post) => post.id && post.image);
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch from Instagram proxy:', error);
    return getManualPosts();
  }
}

export function normalizeGraphPosts(items: GraphMediaItem[]): InstagramPost[] {
  return items
    .map((item) => ({
      id: item.id,
      image: item.media_type === 'VIDEO' ? item.thumbnail_url || '' : item.media_url || item.thumbnail_url || '',
      caption: item.caption || '',
      url: item.permalink || '',
      timestamp: item.timestamp || new Date().toISOString(),
    }))
    .filter((post) => post.id && post.image);
}

async function getGraphPosts(): Promise<InstagramPost[]> {
  if (!env.instagram.graphAccessToken || !env.instagram.graphUserId) {
    console.warn('Instagram Graph API credentials not set, falling back to manual posts');
    return getManualPosts();
  }

  try {
    const url = `https://graph.facebook.com/v21.0/${env.instagram.graphUserId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${env.instagram.graphAccessToken}`,
      },
      next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      throw new Error(`Graph API returned ${res.status}`);
    }

    const json = await res.json();

    return normalizeGraphPosts((json.data || []) as GraphMediaItem[]);
  } catch (error) {
    console.error('Failed to fetch from Instagram Graph API:', error);
    return getManualPosts();
  }
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  switch (env.instagram.mode) {
    case 'proxy':
      return getProxyPosts();
    case 'graph':
      return getGraphPosts();
    case 'manual':
    default:
      return getManualPosts();
  }
}
