import Link from 'next/link';
import { cn } from '@/lib/cn';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function CTAButton({
  href,
  children,
  size = 'md',
  variant = 'primary',
  className,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-block rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'primary' &&
          'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900',
        variant === 'secondary' &&
          'border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white focus:ring-slate-900',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        className,
      )}
    >
      {children}
    </Link>
  );
}
