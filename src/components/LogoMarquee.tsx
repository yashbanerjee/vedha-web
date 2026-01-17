import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';

const logos = [
  {
    name: 'COP28',
    icon: 'https://www.google.com/s2/favicons?domain=cop28.com&sz=128',
  },
  {
    name: 'Dubai DET',
    icon: 'https://www.google.com/s2/favicons?domain=dubaidet.gov.ae&sz=128',
  },
  {
    name: 'Dunkin',
    icon: 'https://www.google.com/s2/favicons?domain=dunkindonuts.com&sz=128',
  },
  {
    name: 'Baskin Robbins',
    icon: 'https://www.google.com/s2/favicons?domain=baskinrobbins.com&sz=128',
  },
  {
    name: 'Arby’s',
    icon: 'https://www.google.com/s2/favicons?domain=arbys.com&sz=128',
  },
  {
    name: 'Jimmy Johns',
    icon: 'https://www.google.com/s2/favicons?domain=jimmyjohns.com&sz=128',
  },
  {
    name: 'Biko Institute',
    icon: 'https://www.google.com/s2/favicons?domain=bikoemotionalwellnesscentre.com&sz=128',
  },
  {
    name: 'Buffalo Wild Wings',
    icon: 'https://www.google.com/s2/favicons?domain=buffalowildwings.com&sz=128',
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
    const totalDuration = 4000; // 5 seconds total
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

const LogoItem = ({ name, icon }: { name: string; icon: string }) => (
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
      className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-foreground/40 group-hover:text-foreground/80 transition-colors overflow-hidden"
      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
      transition={{ duration: 0.5 }}
    >
      <img src={icon} alt={name} className="w-full h-full object-contain" />
    </motion.div>
    <span className="font-semibold text-base whitespace-nowrap">{name}</span>
  </motion.div>
);

export default LogoMarquee;