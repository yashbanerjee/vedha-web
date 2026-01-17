import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const steps = [
  {
    id: 'step-1',
    number: '01',
    title: 'We put on your shoes and run a mile',
    bgTitle: 'Discover',
    description: 'It all starts with understanding your goals. We dive deep into your business, audience, and market to uncover opportunities.',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'We design strategy, never wing it',
    bgTitle: 'Strategize',
    description: 'We craft a tailored roadmap combining tech and marketing for maximum impact. Every decision is data-driven.',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Before we hit go, we make sure it flies',
    bgTitle: 'Validate',
    description: 'We test and validate our strategy to ensure it aligns with your business objectives and market needs.',
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Strategy is only as good as its execution',
    bgTitle: 'Develop',
    description: 'Our team brings the strategy to life with pixel-perfect design and flawless development.',
  },
  {
    id: 'step-5',
    number: '05',
    title: 'What works, we crank it up',
    bgTitle: 'Scale Up',
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
  const step0BgOpacity = useTransform(step0Progress, [0, 0.2, 0.8, 1], [0.03, 0.08, 0.08, 0.03]);
  const step0BorderOpacity = useTransform(step0Progress, [0, 0.2, 0.8, 1], [0.08, 0.18, 0.18, 0.08]);
  const step0BackgroundColor = useTransform(step0BgOpacity, (opacity) => `rgba(255, 255, 255, ${opacity})`);
  const step0Border = useTransform(step0BorderOpacity, (opacity) => `1px solid rgba(255, 255, 255, ${opacity})`);
  const step0BackdropFilter = useTransform(step0Progress, (progress) => {
    const blur = progress < 0.2 ? 8 + (progress / 0.2) * 12 : progress > 0.8 ? 20 - ((progress - 0.8) / 0.2) * 12 : 20;
    const saturate = progress < 0.2 ? 120 + (progress / 0.2) * 60 : progress > 0.8 ? 180 - ((progress - 0.8) / 0.2) * 60 : 180;
    return `blur(${blur}px) saturate(${saturate}%)`;
  });

  const step1Y = useTransform(step1Progress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const step1Opacity = useTransform(step1Progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const step1Scale = useTransform(step1Progress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const step1BgOpacity = useTransform(step1Progress, [0, 0.2, 0.8, 1], [0.03, 0.08, 0.08, 0.03]);
  const step1BorderOpacity = useTransform(step1Progress, [0, 0.2, 0.8, 1], [0.08, 0.18, 0.18, 0.08]);
  const step1BackgroundColor = useTransform(step1BgOpacity, (opacity) => `rgba(255, 255, 255, ${opacity})`);
  const step1Border = useTransform(step1BorderOpacity, (opacity) => `1px solid rgba(255, 255, 255, ${opacity})`);
  const step1BackdropFilter = useTransform(step1Progress, (progress) => {
    const blur = progress < 0.2 ? 8 + (progress / 0.2) * 12 : progress > 0.8 ? 20 - ((progress - 0.8) / 0.2) * 12 : 20;
    const saturate = progress < 0.2 ? 120 + (progress / 0.2) * 60 : progress > 0.8 ? 180 - ((progress - 0.8) / 0.2) * 60 : 180;
    return `blur(${blur}px) saturate(${saturate}%)`;
  });

  const step2Y = useTransform(step2Progress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const step2Opacity = useTransform(step2Progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const step2Scale = useTransform(step2Progress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const step2BgOpacity = useTransform(step2Progress, [0, 0.2, 0.8, 1], [0.03, 0.08, 0.08, 0.03]);
  const step2BorderOpacity = useTransform(step2Progress, [0, 0.2, 0.8, 1], [0.08, 0.18, 0.18, 0.08]);
  const step2BackgroundColor = useTransform(step2BgOpacity, (opacity) => `rgba(255, 255, 255, ${opacity})`);
  const step2Border = useTransform(step2BorderOpacity, (opacity) => `1px solid rgba(255, 255, 255, ${opacity})`);
  const step2BackdropFilter = useTransform(step2Progress, (progress) => {
    const blur = progress < 0.2 ? 8 + (progress / 0.2) * 12 : progress > 0.8 ? 20 - ((progress - 0.8) / 0.2) * 12 : 20;
    const saturate = progress < 0.2 ? 120 + (progress / 0.2) * 60 : progress > 0.8 ? 180 - ((progress - 0.8) / 0.2) * 60 : 180;
    return `blur(${blur}px) saturate(${saturate}%)`;
  });

  const step3Y = useTransform(step3Progress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const step3Opacity = useTransform(step3Progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const step3Scale = useTransform(step3Progress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const step3BgOpacity = useTransform(step3Progress, [0, 0.2, 0.8, 1], [0.03, 0.08, 0.08, 0.03]);
  const step3BorderOpacity = useTransform(step3Progress, [0, 0.2, 0.8, 1], [0.08, 0.18, 0.18, 0.08]);
  const step3BackgroundColor = useTransform(step3BgOpacity, (opacity) => `rgba(255, 255, 255, ${opacity})`);
  const step3Border = useTransform(step3BorderOpacity, (opacity) => `1px solid rgba(255, 255, 255, ${opacity})`);
  const step3BackdropFilter = useTransform(step3Progress, (progress) => {
    const blur = progress < 0.2 ? 8 + (progress / 0.2) * 12 : progress > 0.8 ? 20 - ((progress - 0.8) / 0.2) * 12 : 20;
    const saturate = progress < 0.2 ? 120 + (progress / 0.2) * 60 : progress > 0.8 ? 180 - ((progress - 0.8) / 0.2) * 60 : 180;
    return `blur(${blur}px) saturate(${saturate}%)`;
  });

  const step4Y = useTransform(step4Progress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const step4Opacity = useTransform(step4Progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const step4Scale = useTransform(step4Progress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const step4BgOpacity = useTransform(step4Progress, [0, 0.2, 0.8, 1], [0.03, 0.08, 0.08, 0.03]);
  const step4BorderOpacity = useTransform(step4Progress, [0, 0.2, 0.8, 1], [0.08, 0.18, 0.18, 0.08]);
  const step4BackgroundColor = useTransform(step4BgOpacity, (opacity) => `rgba(255, 255, 255, ${opacity})`);
  const step4Border = useTransform(step4BorderOpacity, (opacity) => `1px solid rgba(255, 255, 255, ${opacity})`);
  const step4BackdropFilter = useTransform(step4Progress, (progress) => {
    const blur = progress < 0.2 ? 8 + (progress / 0.2) * 12 : progress > 0.8 ? 20 - ((progress - 0.8) / 0.2) * 12 : 20;
    const saturate = progress < 0.2 ? 120 + (progress / 0.2) * 60 : progress > 0.8 ? 180 - ((progress - 0.8) / 0.2) * 60 : 180;
    return `blur(${blur}px) saturate(${saturate}%)`;
  });

  const ctaY = useTransform(ctaProgress, [0, 0.3, 1], [100, 0, 0]);
  const ctaOpacity = useTransform(ctaProgress, [0, 0.2, 1], [0, 1, 1]);
  const ctaScale = useTransform(ctaProgress, [0, 0.3, 1], [0.95, 1, 1]);

  const stepTransforms = [
    { y: step0Y, opacity: step0Opacity, scale: step0Scale, backgroundColor: step0BackgroundColor, border: step0Border, backdropFilter: step0BackdropFilter },
    { y: step1Y, opacity: step1Opacity, scale: step1Scale, backgroundColor: step1BackgroundColor, border: step1Border, backdropFilter: step1BackdropFilter },
    { y: step2Y, opacity: step2Opacity, scale: step2Scale, backgroundColor: step2BackgroundColor, border: step2Border, backdropFilter: step2BackdropFilter },
    { y: step3Y, opacity: step3Opacity, scale: step3Scale, backgroundColor: step3BackgroundColor, border: step3Border, backdropFilter: step3BackdropFilter },
    { y: step4Y, opacity: step4Opacity, scale: step4Scale, backgroundColor: step4BackgroundColor, border: step4Border, backdropFilter: step4BackdropFilter },
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
        <div className="absolute top-0 left-0 right-0 pt-44 md:pt-40 pb-6 md:pb-8 z-50 pointer-events-none">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-left md:text-center relative mb-12 md:mb-0">
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
                className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight md:leading-normal"
              >
                We guide your journey from start to scale
                <br className="hidden sm:block" />
                <span className="block sm:inline"> </span>
                <span className="gradient-text">with strategy, tech, and a touch of clever.</span>
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Steps Container - Exactly centered in the screen */}
        <div className="w-full h-full flex items-center justify-center relative pt-8 md:pt-0">
          <div className="w-full max-w-3xl mx-auto px-4 md:px-6 relative h-[400px] sm:h-[450px] md:h-[500px] mt-8 md:mt-16 lg:mt-20">
            {/* Large Faded Title Display - Fixed in background, changes based on current step */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0 pointer-events-none"
              animate={{ opacity: showCTA ? 0 : 1 }}
            >
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[100px] sm:text-[120px] md:text-[140px] lg:text-[180px] xl:text-[220px] 2xl:text-[260px] font-display font-bold leading-none whitespace-nowrap opacity-40 md:opacity-100"
                style={{
                  background: 'linear-gradient(180deg, rgba(229, 255, 0, 0.06) 0%, rgba(229, 255, 0, 0.015) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: 'none',
                }}
              >
                {steps[currentStep]?.bgTitle || 'Discover'}
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
                  <motion.div 
                    className="w-full max-w-6xl rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 hover:border-primary/50 transition-all duration-500 relative overflow-hidden mx-2 md:mx-0"
                    style={{
                      backgroundColor: transforms.backgroundColor,
                      backdropFilter: transforms.backdropFilter,
                      WebkitBackdropFilter: transforms.backdropFilter,
                      border: transforms.border,
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Animated glassmorphic gradient overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(229, 255, 0, 0.08) 0%, rgba(229, 255, 0, 0.02) 50%, transparent 100%)',
                        opacity: transforms.opacity,
                      }}
                    />

                    {/* Subtle theme color tint in bottom right */}
                    <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-gradient-to-tl from-primary/8 via-primary/4 to-transparent rounded-2xl pointer-events-none" />

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

                    {/* Content */}
                    <div className="space-y-3 sm:space-y-4 md:space-y-5 relative z-10">
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-semibold text-foreground tracking-tight leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide">
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
              <div className="text-center mb-6 md:mb-8 px-4">
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-primary text-primary-foreground rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg shadow-primary/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's meet for a coffee
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
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
