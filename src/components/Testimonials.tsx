import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Vedha transformed our digital presence completely.",
    author: 'Sarah Chen',
    role: 'CEO',
    company: 'TechFlow',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    quote: "Best investment we've ever made.",
    author: 'Michael Torres',
    role: 'VP Sales',
    company: 'GrowthMetrics',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    quote: "Seamless workflow, incredible results.",
    author: 'Emily Watson',
    role: 'COO',
    company: 'Innovate Labs',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    quote: "They truly understand modern design.",
    author: 'David Park',
    role: 'Founder',
    company: 'Nexus',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    quote: "A game changer for our brand.",
    author: 'Lisa Wang',
    role: 'Director',
    company: 'Studio X',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  },
];

const tweets = [
  "Amazing work!", "Incredible team", "Fast delivery", "Just wow",
  "Top quality", "Highly recommended", "Pixel perfect", "Great support",
  "Outstanding", "Simply the best", "Love it!", "Fantastic job",
  "Exceeded expectations", "A++ service", "Truly visionary", "Game changer",
  "World class", "Beautiful design", "Super efficient", "Best decision",
  "Professional squad", "Mind blown", "10/10 would recommend", "Pure magic",
  "Innovation leaders"
];

// Generate deterministic grid positions to avoid overlap
const generateTweets = () => {
  return tweets.map((text, i) => {
    // Desktop Grid: 5 columns x 5 rows
    const dCols = 5;
    const dRows = 5;
    const dCol = i % dCols;
    const dRow = Math.floor(i / dCols);

    // Desktop Position with jitter
    const dTop = (dRow * (100 / dRows)) + Math.random() * 10 + 2; // + padding
    const dLeft = (dCol * (100 / dCols)) + Math.random() * 10 + 2;

    // Mobile Grid: 2 columns x 13 rows (for 25 items)
    // Using 2 columns to ensure plenty of horizontal space for text
    const mCols = 2;
    // We only care about the distribution, the hidden ones just leave gaps which is fine
    const mCol = i % mCols;
    const mRow = Math.floor(i / mCols);

    // Mobile Position with more horizontal variation (jitter)
    // Column 0: 0-40%, Column 1: 50-90%
    const mLeft = (mCol * 50) + Math.random() * 30 + 5;
    const mTop = (mRow * (100 / 13)) + Math.random() * 4 + 1;

    return {
      text,
      // Store formatted percentage strings for CSS variables
      dTop: `${dTop}%`,
      dLeft: `${dLeft}%`,
      mTop: `${mTop}%`,
      mLeft: `${mLeft}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    };
  });
};

const floatingTweets = generateTweets();

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <section id="testimonials" className="relative py-20 md:py-40 bg-background min-h-[80vh] md:min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Breathing Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(229, 255, 0, 0.4) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.02] blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(229, 255, 0, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full opacity-[0.025] blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(229, 255, 0, 0.25) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.025, 0.04, 0.025],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-left md:text-center mb-12 md:mb-20">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 text-xs md:text-sm font-medium tracking-wide uppercase rounded-full border border-border/50 text-muted-foreground bg-background/50 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Testimonials
          </motion.div> */}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
          >
            Brands we've helped reach their next level
            <br />
            <span className="gradient-text">here's what they have to say.</span>
          </motion.h2>
        </div>

        {/* Horizontal Scroll Marquee */}
        <div className="relative w-full overflow-hidden mask-linear-fade">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          <div className="flex gap-4 md:gap-8 animate-marquee hover:pause whitespace-nowrap py-6 md:py-10">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.author}-${index}`}
                className="w-[280px] md:w-[400px] flex-shrink-0 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glass Card */}
                <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden hover:border-primary/30 transition-colors duration-500">

                  {/* Moving Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <motion.div
                    className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full items-start text-left whitespace-normal">
                    <Quote className="w-6 h-6 md:w-8 md:h-8 text-primary/50 mb-4 md:mb-6" />

                    <p className="text-base md:text-xl text-foreground font-medium mb-6 md:mb-8 leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    <div className="mt-auto flex items-center gap-3 md:gap-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/10">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{testimonial.author}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
