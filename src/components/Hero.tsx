import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DotGridBackground } from '@/components/DotGridBackground';

const Hero = () => {
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
    // Underline animation
    underline: {
      duration: 0.8,
      delay: 0.8, // Starts after heading animation
    },
    // Description text animation
    description: {
      duration: 0.8,
      delay: 0.2,
    },
    // CTA buttons animation
    ctaButtons: {
      duration: 0.8,
      delay: 0.3,
    },
  };

  return (
    <section className="relative min-h-screen pt-32 pb-32 md:pb-40 overflow-hidden flex flex-col md:flex-row items-center justify-center md:justify-start">
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

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:block">
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
            className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-foreground mb-6 md:mb-12 text-balance"
          >
            Digital Solutions
            <br />
            <span className="relative">
              That Drive
              <span className="relative inline-block ml-3">
                <span className="gradient-text">Growth.</span>
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ 
                    duration: textAnimations.underline.duration, 
                    delay: textAnimations.underline.delay 
                  }}
                />
              </span>
            </span>
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
            Vedha combines cutting-edge technology with strategic marketing to help 
            businesses scale, innovate, and dominate their markets.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: textAnimations.ctaButtons.duration, 
              delay: textAnimations.ctaButtons.delay 
            }}
            className="flex flex-col sm:flex-row items-start justify-start gap-5 md:gap-6"
          >
            <motion.a
              href="#contact"
              className="btn-primary flex items-center gap-2 text-base px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Free Consultation
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#services"
              className="btn-secondary flex items-center gap-2 text-base px-8 py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Work with us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
