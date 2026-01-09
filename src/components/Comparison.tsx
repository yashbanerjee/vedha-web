import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Check, X } from 'lucide-react';

const sadewa = [
  'Custom AI solutions tailored to your needs',
  'Dedicated team of AI specialists',
  'Continuous optimization & support',
  'Transparent pricing with clear ROI',
  'Fast implementation (weeks, not months)',
  'Seamless integration with your stack',
];

const others = [
  'Generic, one-size-fits-all solutions',
  'Outsourced or rotating team members',
  'Set-it-and-forget-it approach',
  'Hidden fees and unclear value',
  'Long implementation timelines',
  'Complex integration requirements',
];

const Comparison = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} id="comparison" className="py-32 md:py-40 min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6"
      >
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-badge inline-flex mb-6 md:mb-8"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Why Choose Us
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
          >
            The difference is clear
          </motion.h2>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 max-w-5xl mx-auto">
          {/* Sadewa Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-secondary text-secondary-foreground rounded-2xl p-8 border-2 border-primary"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-display font-semibold text-primary-foreground">S</span>
              </div>
              <h3 className="font-display font-semibold text-2xl">Sadewa</h3>
            </div>
            
            <ul className="space-y-4">
              {sadewa.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-secondary-foreground/90">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Others Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-muted rounded-2xl p-8 border border-border"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-muted-foreground/20 rounded-lg flex items-center justify-center">
                <span className="font-display font-semibold text-muted-foreground">?</span>
              </div>
              <h3 className="font-display font-semibold text-2xl text-muted-foreground">Other Agencies</h3>
            </div>
            
            <ul className="space-y-4">
              {others.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-muted-foreground/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Comparison;
