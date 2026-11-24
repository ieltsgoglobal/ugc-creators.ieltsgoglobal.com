"use client";

import Navbar from '@/components/watermelon/templates/landing-01/landing/navbar';
import Hero from '@/components/watermelon/templates/landing-01/landing/hero';
import Stats from '@/components/watermelon/templates/landing-01/landing/stats';
import Features from '@/components/watermelon/templates/landing-01/landing/features';
import AnimatedBento from '@/components/watermelon/templates/landing-01/landing/animated-bento';
import ComponentsBento from '@/components/watermelon/templates/landing-01/landing/component-bento';
import TemplateBento from '@/components/watermelon/templates/landing-01/landing/template-bento';
import Testimonial from '@/components/watermelon/templates/landing-01/landing/testimonial';
import Footer from '@/components/watermelon/templates/landing-01/landing/footer';

export default function Landing01Demo() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background dark:bg-[#101010]">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <AnimatedBento />
      <ComponentsBento />
      <TemplateBento />
      <Testimonial />
      <Footer />
    </main>
  );
}
