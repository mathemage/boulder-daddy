'use client';

import { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { InstagramPost } from '@/lib/instagram/types';

interface LightboxModalProps {
  post: InstagramPost | null;
  onClose: () => void;
}

export function LightboxModal({ post, onClose }: LightboxModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!post) return;

    const previousActiveElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousActiveElement?.focus();
    };
  }, [post, handleKeyDown]);

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Instagram post lightbox"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/50 px-3 py-1 text-sm text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close lightbox"
            >
              ✕
            </button>

            <div className="relative aspect-square w-full max-w-2xl">
              <Image
                src={post.image}
                alt={post.caption || 'Instagram post'}
                fill
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
                unoptimized
              />
            </div>

            <div className="p-4">
              {post.caption && (
                <p className="text-sm text-slate-700">{post.caption}</p>
              )}
              {post.url && (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-slate-900 underline hover:no-underline"
                >
                  View on Instagram →
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
