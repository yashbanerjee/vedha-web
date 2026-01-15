import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DotGridBackground } from '@/components/DotGridBackground';
import { useInView } from '@/hooks/useInView';

const Hero = () => {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  // ========================================
  // ANIMATION CONTROLS - Adjust these values to control timing
  // ========================================

  // Dot Grid Background Animations
  const dotGridConfig = {
    dotColor: "#e5ff00",
    dotSize: 3,
    spacing: 10,
    logoOpacity: 0.8,
    backgroundOpacity: 0.05,
    // Background dots animation duration (in milliseconds)
    backgroundAnimationDuration: 2000,
    // Delay before logo animation starts (in milliseconds)
    logoDelay: 1000,
    // Logo animation duration - how long it takes for logo to fully appear (in milliseconds)
    logoAnimationDuration: 5000,
    // Uneven loading effect - controls how much delay between top and bottom of logo (0-1)
    // Higher values = more uneven (top loads much later than bottom)
    // Lower values = more even (top and bottom load closer together)
    logoPositionDelay: 0.6,
  };

  // Text Content Animations (Framer Motion)
  const textAnimations = {
    // Main heading animation
    heading: {
      duration: 0.8,
      delay: 0.1,
    },
    // Description text animation
    description: {
      duration: 0.8,
      delay: 0.2,
    },
    // CTA button animation
    ctaButton: {
      duration: 0.8,
      delay: 0.3,
    },
  };

  return (
    <section ref={ref} id="hero" className="relative min-h-screen pt-32 pb-32 md:pb-40 overflow-hidden flex flex-col md:flex-row items-center justify-center md:justify-start">
      {/* Dot Grid Background with V Logo */}
      <DotGridBackground
        dotColor={dotGridConfig.dotColor}
        dotSize={dotGridConfig.dotSize}
        spacing={dotGridConfig.spacing}
        logoOpacity={dotGridConfig.logoOpacity}
        backgroundOpacity={dotGridConfig.backgroundOpacity}
        backgroundAnimationDuration={dotGridConfig.backgroundAnimationDuration}
        logoDelay={dotGridConfig.logoDelay}
        logoAnimationDuration={dotGridConfig.logoAnimationDuration}
        logoPositionDelay={dotGridConfig.logoPositionDelay}
        className="-z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 relative z-10 flex flex-col md:block"
      >
        {/* Spacer for logo on mobile */}
        <div className="h-48 md:hidden"></div>
        <div className="max-w-5xl text-left w-full md:w-auto">

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: textAnimations.heading.duration,
              delay: textAnimations.heading.delay
            }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-semibold text-foreground mb-6 md:mb-12 text-balance"
          >
            Your Technology {' '}
            <span className="gradient-text">Partner</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: textAnimations.description.duration,
              delay: textAnimations.description.delay
            }}
            className="text-base md:text-xl text-muted-foreground max-w-2xl mb-8 md:mb-12"
          >
            Thinking Like You, Building For You
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: textAnimations.ctaButton.duration,
              delay: textAnimations.ctaButton.delay
            }}
            className="flex items-start justify-start"
          >
            <motion.a
              href="#contact"
              className="btn-primary flex items-center gap-2 text-base px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Let’s Talk Strategy
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
