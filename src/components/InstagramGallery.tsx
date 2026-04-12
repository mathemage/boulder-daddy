'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getInstagramPostAccessibleLabel } from '@/lib/instagram/accessibility';
import type { InstagramPost } from '@/lib/instagram/types';
import { LightboxModal } from './LightboxModal';

interface InstagramGalleryProps {
  posts: InstagramPost[];
  coachIgUsername: string;
}

export function InstagramGallery({ posts, coachIgUsername }: InstagramGalleryProps) {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  if (posts.length === 0) return null;

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">On the Wall</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Follow the latest sends, sessions, and adventures on{' '}
            <a
              href={`https://instagram.com/${coachIgUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-900 underline hover:no-underline"
            >
              @{coachIgUsername}
            </a>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {posts.map((post, index) => {
            const accessibleLabel = getInstagramPostAccessibleLabel(
              post.caption,
              `Instagram post ${index + 1}`,
            );

            return (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedPost(post)}
                className="group relative aspect-square overflow-hidden rounded-lg bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                aria-label={accessibleLabel}
              >
                <Image
                  src={post.image}
                  alt={accessibleLabel}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 288px"
                  loading="lazy"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
              </motion.button>
            );
          })}
        </div>
      </div>

      <LightboxModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  );
}
