import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Search, Map, Hammer, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    description: 'We dive deep into your business, market, and goals to understand what success looks like.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  },
  {
    number: '02',
    icon: Map,
    title: 'Strategize',
    description: 'We craft a tailored roadmap combining tech and marketing for maximum impact.',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600&h=400&fit=crop',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Execute',
    description: 'Our team brings the strategy to life with pixel-perfect design and flawless development.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Scale',
    description: 'We continuously optimize and expand your digital presence as your business grows.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  },
];

const Approach = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium tracking-wide uppercase rounded-full border border-secondary-foreground/20 text-secondary-foreground/60"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Our Approach
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-0"
          >
            How we work
          </motion.h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative group"
            >
              <div className="relative aspect-[4/3] mb-6 rounded-2xl overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/40" />
                <div className="absolute top-4 left-4">
                  <span className="text-5xl font-display font-semibold text-primary/80">
                    {step.number}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-xl">
                  {step.title}
                </h3>
              </div>
              
              <p className="text-secondary-foreground/70 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
