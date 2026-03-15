import { Hero } from '@/components/Hero';
import { ServiceCards } from '@/components/ServiceCards';
import { InstagramGallery } from '@/components/InstagramGallery';
import { Testimonials } from '@/components/Testimonials';
import { CTAButton } from '@/components/CTAButton';
import { env } from '@/lib/env';
import { getInstagramPosts } from '@/lib/instagram';

export default async function HomePage() {
  const posts = await getInstagramPosts();

  return (
    <>
      <Hero coachCity={env.coachCity} />
      <ServiceCards />
      <InstagramGallery posts={posts} coachIgUsername={env.coachIgUsername} />
      <Testimonials />

      {/* CTA Section */}
      <section className="bg-slate-900 px-4 py-20 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">Ready to Level Up?</h2>
        <p className="mx-auto mb-8 max-w-xl text-slate-300">
          Whether you are a complete beginner or pushing your hardest grade, let&apos;s work
          together to unlock your potential on the wall.
        </p>
        <CTAButton href="/contact" size="lg">
          Get in Touch
        </CTAButton>
      </section>
    </>
  );
}
