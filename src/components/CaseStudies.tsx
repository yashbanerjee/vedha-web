import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowUpRight } from 'lucide-react';

const caseStudies = [
  {
    title: 'E-commerce Brand Transformation',
    category: 'Web + Marketing',
    date: 'Nov 2024',
    result: '250% Revenue Growth',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  },
  {
    title: 'SaaS Platform Launch',
    category: 'Product Development',
    date: 'Oct 2024',
    result: '10K Users in 30 Days',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
  },
  {
    title: 'B2B Lead Generation Campaign',
    category: 'Digital Marketing',
    date: 'Sep 2024',
    result: '5x More Qualified Leads',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
];

const CaseStudies = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} id="case-studies" className="py-32 md:py-40 min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 md:mb-24 gap-6 md:gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-badge inline-flex mb-6 md:mb-8"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Case Studies
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-title"
            >
              Latest works
            </motion.h2>
          </div>
          
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#"
            className="btn-secondary inline-flex items-center gap-2"
          >
            View All Projects
            <ArrowUpRight size={18} />
          </motion.a>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] mb-6 rounded-2xl overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Result Badge */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <span className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    {study.result}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                <span>{study.category}</span>
                <span>•</span>
                <span>{study.date}</span>
              </div>
              
              <h3 className="font-display font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                {study.title}
              </h3>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CaseStudies;
