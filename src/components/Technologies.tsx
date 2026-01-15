import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const technologies = [
  { name: 'OpenAI', category: 'AI Models' },
  { name: 'Anthropic', category: 'AI Models' },
  { name: 'Langchain', category: 'Framework' },
  { name: 'Python', category: 'Language' },
  { name: 'Zapier', category: 'Automation' },
  { name: 'Make', category: 'Automation' },
  { name: 'Airtable', category: 'Database' },
  { name: 'Notion', category: 'Workspace' },
  { name: 'Slack', category: 'Communication' },
  { name: 'HubSpot', category: 'CRM' },
];

const Technologies = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} id="technologies" className="py-32 md:py-40 bg-muted/30 min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6"
      >
        {/* Section Header */}
        <div className="text-left md:text-center mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-badge inline-flex mb-6 md:mb-8"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Technologies
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-title"
          >
            Tech stack we use
          </motion.h2>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-muted rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <span className="font-display font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                  {tech.name[0]}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">{tech.name}</h3>
              <p className="text-xs text-muted-foreground">{tech.category}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Technologies;
