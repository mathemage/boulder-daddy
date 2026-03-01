import { InstagramPost } from './types';
import { env } from '@/lib/env';
import path from 'path';
import { readFileSync } from 'fs';

async function getManualPosts(): Promise<InstagramPost[]> {
  try {
    const filePath = path.resolve(process.cwd(), env.instagram.manualJsonPath);
    const raw = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw) as InstagramPost[];
    return data;
  } catch (error) {
    console.error('Failed to read manual Instagram JSON:', error);
    return [];
  }
}

async function getProxyPosts(): Promise<InstagramPost[]> {
  if (!env.instagram.proxyUrl) {
    console.warn('INSTAGRAM_PROXY_URL not set, falling back to manual posts');
    return getManualPosts();
  }

  try {
    const res = await fetch(env.instagram.proxyUrl, {
      next: { revalidate: 21600 }, // 6 hours
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

async function getGraphPosts(): Promise<InstagramPost[]> {
  if (!env.instagram.graphAccessToken || !env.instagram.graphUserId) {
    console.warn('Instagram Graph API credentials not set, falling back to manual posts');
    return getManualPosts();
  }

  try {
    const url = `https://graph.instagram.com/${env.instagram.graphUserId}/media?fields=id,caption,media_url,permalink,timestamp&access_token=${env.instagram.graphAccessToken}`;

    const res = await fetch(url, {
      next: { revalidate: 21600 }, // 6 hours
    });

    if (!res.ok) {
      throw new Error(`Graph API returned ${res.status}`);
    }

    const json = await res.json();

    return (json.data || []).map(
      (item: { id: string; media_url?: string; caption?: string; permalink?: string; timestamp?: string }) => ({
        id: item.id,
        image: item.media_url || '',
        caption: item.caption || '',
        url: item.permalink || '',
        timestamp: item.timestamp || new Date().toISOString(),
      }),
    );
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
