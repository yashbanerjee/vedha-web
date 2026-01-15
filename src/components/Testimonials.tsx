import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Vedha transformed our digital presence completely. Our website traffic increased by 300% and conversions doubled within 6 months.",
    author: 'Sarah Chen',
    role: 'CEO',
    company: 'TechFlow Inc.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    quote: "The marketing strategy they developed helped us reach our target audience like never before. Best investment we've made.",
    author: 'Michael Torres',
    role: 'VP of Sales',
    company: 'GrowthMetrics',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    quote: "Working with Vedha was seamless. They built us a world-class product that our customers love. Highly recommended!",
    author: 'Emily Watson',
    role: 'COO',
    company: 'Innovate Labs',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
];

const Testimonials = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} id="testimonials" className="py-32 md:py-40 bg-muted/30 min-h-screen flex flex-col justify-center">
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
            Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
          >
            People we’ve helped reach their next level.
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-primary/30 mb-6" />

              <p className="text-foreground text-lg leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>

              {/* <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p> 
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div> */}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
