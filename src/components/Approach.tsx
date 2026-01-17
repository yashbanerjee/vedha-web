import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const steps = [
  {
    id: 'step-1',
    number: '01',
    title: 'Discover',
    description: 'It all starts with understanding your goals. We dive deep into your business, audience, and market to uncover opportunities.',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Strategize',
    description: 'We craft a tailored roadmap combining tech and marketing for maximum impact. Every decision is data-driven.',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Validate',
    description: 'We test and validate our strategy to ensure it aligns with your business objectives and market needs.',
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Develop',
    description: 'Our team brings the strategy to life with pixel-perfect design and flawless development.',
  },
  {
    id: 'step-5',
    number: '05',
    title: 'Scale Up',
    description: 'We continuously optimize and expand your digital presence as your business grows.',
  },
];

const Approach = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  // Scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Create progress transforms for each step at the top level - increased sensitivity (faster transitions)
  const step0Progress = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const step1Progress = useTransform(scrollYProgress, [0.25, 0.40], [0, 1]);
  const step2Progress = useTransform(scrollYProgress, [0.40, 0.55], [0, 1]);
  const step3Progress = useTransform(scrollYProgress, [0.55, 0.70], [0, 1]);
  const step4Progress = useTransform(scrollYProgress, [0.70, 0.85], [0, 1]);
  const ctaProgress = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  // Transform values for each step
  const step0Y = useTransform(step0Progress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const step0Opacity = useTransform(step0Progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const step0Scale = useTransform(step0Progress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  const step1Y = useTransform(step1Progress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const step1Opacity = useTransform(step1Progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const step1Scale = useTransform(step1Progress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  const step2Y = useTransform(step2Progress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const step2Opacity = useTransform(step2Progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const step2Scale = useTransform(step2Progress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  const step3Y = useTransform(step3Progress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const step3Opacity = useTransform(step3Progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const step3Scale = useTransform(step3Progress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  const step4Y = useTransform(step4Progress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const step4Opacity = useTransform(step4Progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const step4Scale = useTransform(step4Progress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  const ctaY = useTransform(ctaProgress, [0, 0.3, 1], [100, 0, 0]);
  const ctaOpacity = useTransform(ctaProgress, [0, 0.2, 1], [0, 1, 1]);
  const ctaScale = useTransform(ctaProgress, [0, 0.3, 1], [0.95, 1, 1]);

  const stepTransforms = [
    { y: step0Y, opacity: step0Opacity, scale: step0Scale },
    { y: step1Y, opacity: step1Opacity, scale: step1Scale },
    { y: step2Y, opacity: step2Opacity, scale: step2Scale },
    { y: step3Y, opacity: step3Opacity, scale: step3Scale },
    { y: step4Y, opacity: step4Opacity, scale: step4Scale },
  ];

  // Update current step based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (progress < 0.25) {
        setCurrentStep(0);
        setShowCTA(false);
      } else if (progress < 0.40) {
        setCurrentStep(1);
        setShowCTA(false);
      } else if (progress < 0.55) {
        setCurrentStep(2);
        setShowCTA(false);
      } else if (progress < 0.70) {
        setCurrentStep(3);
        setShowCTA(false);
      } else if (progress < 0.85) {
        setCurrentStep(4);
        setShowCTA(false);
      } else {
        setCurrentStep(5);
        setShowCTA(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative bg-background min-h-screen snap-start snap-always"
    >
      {/* Sticky container that holds steps AND header */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Header - Absolute position so it doesn't affect card centering */}
        <div className="absolute top-0 left-0 right-0 pt-32 md:pt-40 pb-4 md:pb-8 z-50 pointer-events-none">
          <div className="container mx-auto px-6">
            <div className="text-left md:text-center relative">
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium tracking-wide uppercase rounded-full border border-border/50 text-muted-foreground bg-background/50 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Our Approach
              </motion.div> */}

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="section-title"
              >
                We guide your journey from start to scale
                <br />
                <span className="gradient-text">with strategy, tech, and a touch of clever.</span>
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Steps Container - Exactly centered in the screen */}
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="w-full max-w-3xl mx-auto px-6 relative h-[500px]">
            {/* Large Number Display - Fixed on left, changes based on current step */}
            <motion.div
              className="absolute left-0 md:left-[-160px] top-1/2 -translate-y-1/2 z-10 pointer-events-none"
              animate={{ opacity: showCTA ? 0 : 1 }}
            >
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[280px] md:text-[320px] font-display font-bold leading-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(229, 255, 0, 0.08) 0%, rgba(229, 255, 0, 0.02) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: 'none',
                }}
              >
                {steps[currentStep]?.number || '01'}
              </motion.div>
            </motion.div>

            {steps.map((step, index) => {
              const transforms = stepTransforms[index];

              return (
                <motion.div
                  key={step.id}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    y: transforms.y,
                    opacity: transforms.opacity,
                    scale: transforms.scale,
                    zIndex: index === currentStep ? 30 : index < currentStep ? 0 : 20,
                  }}
                >
                  <motion.div className="w-full max-w-2xl bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-12 md:p-16 hover:border-primary/50 transition-all duration-500 relative ml-0 md:ml-20 overflow-hidden">
                    {/* Subtle theme color tint in bottom right */}
                    <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-gradient-to-tl from-primary/8 via-primary/4 to-transparent rounded-2xl pointer-events-none" />

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

                    {/* Content */}
                    <div className="space-y-5 relative z-10">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* CTA - Shows after last step */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                y: ctaY,
                opacity: ctaOpacity,
                scale: ctaScale,
                zIndex: showCTA ? 40 : 0,
              }}
            >
              <div className="text-center mb-8">
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg shadow-primary/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's meet for a coffee
                  <ArrowRight className="w-6 h-6" />
                </motion.a>
              </div>

              {/* Scroll indicator with pulsating arrow */}
              <motion.div
                className="flex flex-col items-center gap-2 text-muted-foreground/60"
                initial={{ opacity: 0, y: 10 }}
                animate={showCTA ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Spacer to create scrollable height for step transitions - reduced for faster scrolling */}
      <div style={{ height: '400vh' }} />
    </section>
  );
};

export default Approach;
