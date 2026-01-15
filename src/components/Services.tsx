import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Folder, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { DotGridBackground } from '@/components/DotGridBackground';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  services: string[];
}

interface MagicBentoBoxProps {
  service: string;
  index: number;
  isInView: boolean;
  className?: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: 'Tech Development',
    description: 'Elevate your technology: sharp positioning, cohesive solutions, real impact.',
    services: ['WEB DEVELOPMENT', 'MOBILE APP DEVELOPMENT', 'API INTEGRATION', 'CLOUD INFRASTRUCTURE'],
  },
  {
    id: 2,
    title: 'Marketing',
    description: 'Refresh or rebrand your strategy; lift retention with clear flows and data-driven campaigns.',
    services: ['SEO & CONTENT STRATEGY', 'SOCIAL MEDIA MARKETING', 'PPC ADVERTISING', 'ANALYTICS & REPORTING'],
  },
  {
    id: 3,
    title: 'Branding and Design',
    description: 'Launch a revenue-driving brand that captures attention 24/7 — shipped in 14 days or less.',
    services: ['LOGO & IDENTITY DESIGN', 'BRAND GUIDELINES', 'UI/UX DESIGN', 'GRAPHIC DESIGN'],
  },
];

const MagicBentoBox = ({ service, index, isInView, className = '' }: MagicBentoBoxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        delay: index * 0.08,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      className={`${className} relative group/pill`}
    >
      <div className="relative w-full inline-flex items-center gap-2.5 rounded-full bg-card/60 border border-border/50 px-4 py-2 md:px-5 md:py-2.5 group-hover/pill:bg-primary/10 group-hover/pill:border-primary/50 group-hover/pill:shadow-md group-hover/pill:shadow-primary/10 transition-all duration-200 cursor-pointer">
        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 group-hover/pill:scale-110 transition-transform duration-200" />
        <span className="text-sm font-semibold text-foreground uppercase tracking-wider whitespace-nowrap flex-1 group-hover/pill:text-primary transition-colors duration-200">
          {service}
        </span>
        <ChevronRight size={13} className="text-foreground/60 group-hover/pill:text-primary group-hover/pill:translate-x-1 transition-all duration-200 flex-shrink-0" />
      </div>
    </motion.div>
  );
};

const Services = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  // Dot Grid Background Configuration (without logo)
  const dotGridConfig = {
    dotColor: "#e5ff00",
    dotSize: 3,
    spacing: 10,
    logoOpacity: 0, // Hide the logo
    backgroundOpacity: 0.05,
    backgroundAnimationDuration: 2000,
    logoDelay: 1000,
    logoAnimationDuration: 5000,
    logoPositionDelay: 0.6,
  };

  return (
    <section ref={ref} id="services" className="relative py-32 md:py-40 bg-muted/30 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Dot Grid Background without logo */}
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
        className="container mx-auto px-6 relative z-10"
      >
        {/* Header Section */}
        <div className="mb-24 md:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            What We Do.
          </motion.h2>
        </div>

        {/* Services - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-stretch">
          {servicesData.map((service, index) => {
            const ServiceCard = () => {
              const cardRef = useRef<HTMLDivElement>(null);
              const mouseX = useMotionValue(0);
              const mouseY = useMotionValue(0);
              const isHovered = useMotionValue(false);

              const mouseXSpring = useSpring(mouseX, { stiffness: 150, damping: 15 });
              const mouseYSpring = useSpring(mouseY, { stiffness: 150, damping: 15 });

              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                if (!cardRef.current) return;
                const rect = cardRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                mouseX.set(x);
                mouseY.set(y);
                isHovered.set(true);
              };

              const handleMouseLeave = () => {
                isHovered.set(false);
              };

              const opacity = useTransform(isHovered, (v) => (v ? 1 : 0));
              const background = useMotionTemplate`radial-gradient(250px circle at ${mouseXSpring}px ${mouseYSpring}px, rgba(229, 255, 0, 0.015), transparent 60%)`;
              const borderGlow = useMotionTemplate`radial-gradient(250px circle at ${mouseXSpring}px ${mouseYSpring}px, rgba(229, 255, 0, 0.08), transparent 60%)`;
              const borderGlowInner = useMotionTemplate`radial-gradient(250px circle at ${mouseXSpring}px ${mouseYSpring}px, rgba(229, 255, 0, 0.12), transparent 70%)`;

              return (
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="rounded-2xl bg-card/40 backdrop-blur-xl border border-border/50 p-8 md:p-10 flex flex-col gap-8 relative overflow-hidden shadow-lg shadow-black/10 h-full group/card transition-all duration-500 group-hover/card:-translate-y-2 group-hover/card:shadow-xl"
                >
                  {/* Subtle gradient border glow on hover */}
                  <div className="pointer-events-none absolute inset-[-1px] rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" style={{
                    background: 'linear-gradient(135deg, rgba(229, 255, 0, 0.15), rgba(229, 255, 0, 0.05), rgba(229, 255, 0, 0.15))',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    padding: '1px',
                  }} />

                  {/* Mouse-tracking gradient glow background - subtle glass effect */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{ background, opacity: useTransform(opacity, (v) => v * 0.4) }}
                  />

                  {/* Mouse-tracking border glow - outer soft glow */}
                  <motion.div
                    className="pointer-events-none absolute inset-[-2px] rounded-2xl blur-[1px]"
                    style={{
                      background: borderGlow,
                      opacity: useTransform(opacity, (v) => v * 0.3),
                    }}
                  />

                  {/* Mouse-tracking border glow - inner border ring */}
                  <motion.div
                    className="pointer-events-none absolute inset-[-1px] rounded-2xl"
                    style={{
                      background: borderGlowInner,
                      opacity: useTransform(opacity, (v) => v * 0.5),
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      padding: '1px',
                    }}
                  />
                  {/* Service Header */}
                  <div className="relative z-10 flex flex-col gap-5 flex-shrink-0">
                    <div className="flex-shrink-0">
                      <Folder className="w-6 h-6 md:w-7 md:h-7 text-foreground transition-colors duration-500 group-hover/card:text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <motion.h3
                        className="text-xl md:text-2xl font-display font-semibold text-foreground mb-3 whitespace-nowrap overflow-hidden text-ellipsis tracking-tight transition-colors duration-500 group-hover/card:text-primary"
                      >
                        {service.title}
                      </motion.h3>
                      <p className="text-sm text-muted-foreground leading-relaxed tracking-wide">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Secondary Services Pills */}
                  <div className="relative z-10 flex-1 min-h-0">
                    <div className="flex flex-wrap gap-2.5 md:gap-3">
                      {service.services.map((item, idx) => (
                        <MagicBentoBox
                          key={idx}
                          service={item}
                          index={idx}
                          isInView={isInView}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            };

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.15 * index,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex flex-col h-full group"
              >
                <ServiceCard />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
