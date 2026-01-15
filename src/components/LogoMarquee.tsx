import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';

const logos = [
  {
    name: 'Microsoft',
    icon: (
      <svg viewBox="0 0 23 23" fill="none" className="w-full h-full">
        <path d="M0 0h11v11H0z" fill="#F25022" />
        <path d="M12 0h11v11H12z" fill="#7FBA00" />
        <path d="M0 12h11v11H0z" fill="#00A4EF" />
        <path d="M12 12h11v11H12z" fill="#FFB900" />
      </svg>
    ),
  },
  {
    name: 'Google',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    name: 'Slack',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 5.042a2.528 2.528 0 0 1 2.522-2.52A2.528 2.528 0 0 1 24 5.042a2.528 2.528 0 0 1-2.522 2.521h-2.522V5.042zM17.688 5.042a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v2.52zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A" />
      </svg>
    ),
  },
  {
    name: 'Notion',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.606c.093.42 0 .841-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .841-1.168.841l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zm7.704 0H15.852c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-3.117-7.51h3.117c1.665 0 3.019 1.355 3.019 3.019s-1.355 3.019-3.019 3.019h-3.117V8.471zm3.117 7.51c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.491 4.49-4.491h7.704zm0 1.471H8.148c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h7.704c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Stripe',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.467-5.85-6.594-7.305h.003z" fill="#635BFF" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Linear',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M2.4 2.4h19.2v19.2H2.4V2.4zm1.2 1.2v16.8h16.8V3.6H3.6zm2.4 2.4h12v1.2H6v-1.2zm0 3h12v1.2H6V9zm0 3h9.6v1.2H6v-1.2z" fill="currentColor" />
      </svg>
    ),
  },
];

const AnimatedGradientText = ({
  text,
  showCursor,
  isComplete,
  fullText
}: {
  text: string;
  showCursor: boolean;
  isComplete: boolean;
  fullText: string;
}) => {
  // Ensure the container has consistent width by using the full text length
  const displayText = text.length < fullText.length
    ? text.padEnd(fullText.length, '\u00A0') // Use non-breaking space to maintain width
    : text;

  return (
    <motion.h2
      className="section-title relative inline-block whitespace-nowrap"
      style={{
        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.08) 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        textAlign: 'center',
      }}
      animate={isComplete ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      } : {
        backgroundPosition: '0% 50%',
      }}
      transition={isComplete ? {
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      } : {}}
    >
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.15) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          |
        </motion.span>
      )}
    </motion.h2>
  );
};

const LogoMarquee = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'We solve growth for those who demand';

  // Characters for decryption effect
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    if (!isInView) return;

    setDisplayedText('');
    let currentIndex = 0;
    let iteration = 0;
    const iterationsPerChar = 4; // Number of random char changes before locking
    const totalDuration = 1000; // 5 seconds total
    const intervalTime = totalDuration / (fullText.length * iterationsPerChar); // Calculate timing to complete in 5 seconds

    const decryptInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        // Build the decrypted string
        const decrypted = Array.from({ length: fullText.length }, (_, i) => {
          if (i < currentIndex) {
            // Already decrypted - show actual character
            return fullText[i];
          } else if (i === currentIndex) {
            // Currently decrypting - show random char, lock after iterations
            if (iteration >= iterationsPerChar) {
              return fullText[i];
            }
            // Preserve spaces to maintain layout
            if (fullText[i] === ' ') {
              return ' ';
            }
            return chars[Math.floor(Math.random() * chars.length)];
          } else {
            // Not yet decrypted - preserve spaces, show random char for others
            if (fullText[i] === ' ') {
              return ' ';
            }
            return chars[Math.floor(Math.random() * chars.length)];
          }
        }).join('');

        setDisplayedText(decrypted);

        iteration++;
        if (iteration > iterationsPerChar && currentIndex < fullText.length) {
          iteration = 0;
          currentIndex++;
        }
      } else {
        // Ensure final text is correct
        setDisplayedText(fullText);
        clearInterval(decryptInterval);
      }
    }, Math.max(intervalTime, 20)); // Ensure minimum 20ms for smooth animation

    return () => clearInterval(decryptInterval);
  }, [isInView]);

  return (
    <section ref={ref} id="logo-marquee" className="py-20 md:py-24 border-y border-border bg-muted/30 min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6"
      >
        {/* Header Section */}
        <div className="text-left mb-24 md:mb-32 overflow-hidden">
          <AnimatedGradientText
            text={displayedText || fullText.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('')}
            showCursor={false}
            isComplete={displayedText === fullText && displayedText.length === fullText.length}
            fullText={fullText}
          />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 md:gap-x-10 gap-y-12 md:gap-y-16">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <LogoItem name={logo.name} icon={logo.icon} />
            </motion.div>
          ))}

          {/* Empty Slot - Add Your Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * logos.length }}
            whileHover={{
              y: -4,
              scale: 1.05,
            }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 text-muted-foreground/60 hover:text-foreground transition-colors group cursor-pointer"
          >
            <motion.div
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-foreground/40 group-hover:text-foreground/80 transition-colors border-2 border-dashed border-foreground/20 group-hover:border-primary/50 rounded-lg"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Plus size={20} className="group-hover:text-primary transition-colors" />
            </motion.div>
            <span className="font-semibold text-base whitespace-nowrap">Add your brand</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const LogoItem = ({ name, icon }: { name: string; icon: React.ReactNode }) => (
  <motion.div
    className="flex items-center gap-3 text-muted-foreground/60 hover:text-foreground transition-colors min-w-fit group cursor-pointer"
    whileHover={{
      y: -4,
      scale: 1.05,
    }}
    whileTap={{ scale: 0.98 }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 17
    }}
  >
    <motion.div
      className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-foreground/40 group-hover:text-foreground/80 transition-colors"
      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    <span className="font-semibold text-base whitespace-nowrap">{name}</span>
  </motion.div>
);

export default LogoMarquee;
