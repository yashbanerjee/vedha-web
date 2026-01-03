import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$3,000',
    period: '/month',
    description: 'Perfect for startups and small businesses looking to establish their digital presence.',
    features: [
      'Custom website (up to 5 pages)',
      'Basic SEO setup',
      'Social media management',
      'Monthly performance report',
      'Email support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$7,500',
    period: '/month',
    description: 'For scaling businesses ready to dominate their market.',
    features: [
      'Custom web application',
      'Full digital marketing suite',
      'Advanced SEO & content strategy',
      'Paid advertising management',
      'Weekly strategy calls',
      'Priority support',
      'Dedicated account manager',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations with complex needs.',
    features: [
      'Everything in Growth',
      'Custom software development',
      'Multi-channel campaigns',
      'Brand strategy & design',
      'SLA guarantees',
      '24/7 dedicated support',
      'On-site workshops',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const Pricing = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} id="pricing" className="py-32 md:py-40 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-badge inline-flex mb-6 md:mb-8"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Pricing
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title mb-6 md:mb-8"
          >
            Simple, transparent pricing
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Choose the plan that fits your needs. Scale up or down as your business grows.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-secondary text-secondary-foreground border-2 border-primary'
                  : 'bg-card border border-border'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="font-display font-semibold text-xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-display font-semibold">{plan.price}</span>
                  {plan.period && (
                    <span className={plan.highlighted ? 'text-secondary-foreground/60' : 'text-muted-foreground'}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm ${plan.highlighted ? 'text-secondary-foreground/70' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'bg-primary' : 'bg-primary/20'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.highlighted ? 'text-primary-foreground' : 'text-primary'}`} />
                    </div>
                    <span className={`text-sm ${plan.highlighted ? 'text-secondary-foreground/90' : 'text-muted-foreground'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <motion.a
                href="#contact"
                className={`w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  plan.highlighted
                    ? 'btn-primary'
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
                <ArrowRight size={18} />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
