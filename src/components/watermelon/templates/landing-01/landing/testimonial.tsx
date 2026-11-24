import { Clapperboard, MessageSquare } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import Heading from './heading';
import Container from './container';

const testimonials = [
  { id: 1, author: "Maya", format: "Relatable reels", content: "The hardest part was picking what to film. I started with a reel about going blank in the speaking test, and suddenly I had ideas for a whole series." },
  { id: 2, author: "Arjun", format: "IELTS skits", content: "Acting out both sides of a mock speaking test was more fun than reading tips to camera. I could make it feel like one of my own reels." },
  { id: 3, author: "Nina", format: "Prep stories", content: "I wish I’d filmed more of my prep. The little things, like timing my first practice test or messing up a study plan, make the best stories." },
  { id: 4, author: "Sam", format: "Learner POVs", content: "I wanted one place to copy my referral link and check what happened after I shared it. Having sales and wallet activity in the dashboard makes that easy to follow." },
  { id: 5, author: "Riya", format: "Speaking practice", content: "I filmed what my first mock test actually sounded like, then shared what I’d do differently. That gave me a much better story than starting with a list of rules." },
  { id: 6, author: "Leo", format: "Reaction videos", content: "My first idea was a reaction to my own practice recording. The awkward pause was the best part, so I kept it in." },
  { id: 7, author: "Aisha", format: "Study vlogs", content: "A day-in-my-life reel let me show what prep looks like between classes. I could film it in little pieces without writing a full script." },
  { id: 8, author: "Dev", format: "Quick demos", content: "I turned one practice question into two clips: my first answer, then what changed when I tried it again." },
];

function TestimonialCard({ testimonial: t }: { testimonial: typeof testimonials[number] }) {
  return (
    <div className="group relative w-[350px] shrink-0 cursor-crosshair border border-foreground/10 bg-foreground/5 dark:bg-black/40 backdrop-blur-md transition-colors duration-300 md:w-[450px]">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-foreground/40" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-foreground/40" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-foreground/40" />
      <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-foreground/40" />

      <div className="flex h-full w-full flex-col p-8 whitespace-normal">
        <div className="mb-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/25 bg-sky-500/10 px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest text-sky-700 uppercase dark:text-sky-400">
            <MessageSquare aria-hidden="true" className="size-3" />
            Sample quote
          </span>
          <Clapperboard aria-hidden="true" className="size-4 text-foreground/30" />
        </div>

        {/* Testimonial Content */}
        <p className="group-hover:text-primary mb-8 grow font-mono text-sm leading-relaxed tracking-wide text-foreground/80 transition-colors duration-300">
          &quot;{t.content}&quot;
        </p>

        {/* Author Info */}
        <div className="mt-auto flex items-center gap-3 border-t border-foreground/5 pt-6">
          <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full border border-foreground/20 bg-foreground/5 font-mono text-xs font-bold text-green-700 dark:text-primary">
            {t.author.charAt(0)}
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-foreground/90 uppercase">
              {t.author}
            </span>
            <span className="mt-0.5 text-[10px] tracking-widest text-foreground/40">
              {t.format}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonial() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0, 0, 1] },
    },
  };

  // Duplicate the array to create a seamless infinite loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="bg-background dark:bg-[#101010] relative overflow-hidden py-24 md:py-32 font-mono">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 hidden w-full border-t border-foreground/5 lg:block" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-16 flex flex-col items-start text-left md:items-center md:text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            variants={itemVariants}
            className="text-primary mb-8 inline-flex items-center text-xs font-bold tracking-widest uppercase"
          >
            <span className="mr-3 opacity-70">{'//'}</span>
            SAMPLE TESTIMONIALS
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              Hear from <span className="text-primary">creators</span>
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl font-mono text-sm leading-relaxed tracking-widest text-pretty text-foreground/50 uppercase"
          >
            Fictional examples of how IELTS creators might use the program.
          </motion.p>
        </motion.div>
      </Container>

      {/* Marquee Scroller */}
      <div className="relative mt-8 flex w-full max-w-full overflow-hidden">
        {/* Left/Right Fade Gradients for smooth entering/exiting */}
        <div className="from-background pointer-events-none absolute top-0 left-0 z-20 h-full w-32 bg-linear-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute top-0 right-0 z-20 h-full w-32 bg-linear-to-l to-transparent" />

        <motion.div
          className="flex gap-6 px-3 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 40,
          }}
        >
          {marqueeItems.map((t, index) => (
            <TestimonialCard key={`${t.id}-${index}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
