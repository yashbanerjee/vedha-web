import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DotGridBackground } from '@/components/DotGridBackground';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-32 md:pb-40 overflow-hidden flex flex-col md:flex-row items-center justify-center md:justify-start">
      {/* Dot Grid Background with V Logo */}
      <DotGridBackground
        dotColor="#e5ff00"
        dotSize={3}
        spacing={10}
        logoOpacity={0.8}
        backgroundOpacity={0.05}
        animationDuration={2000}
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
            transition={{ duration: 0.8, delay: 0.1 }}
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
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl text-muted-foreground max-w-2xl mb-8 md:mb-12"
          >
            Vedha combines cutting-edge technology with strategic marketing to help 
            businesses scale, innovate, and dominate their markets.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
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
