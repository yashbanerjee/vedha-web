import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Minimum loading time for smooth experience
    const timer = setTimeout(() => {
      // Start fade out animation
      setIsVisible(false);
      // Wait for both logo fade (0.8s) and background fade (0.3s + 0.5s delay = 0.8s total)
      // Then remove component completely
      setTimeout(onComplete, 800);
    }, 500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#1a1b1f] flex flex-col items-center justify-center"
          style={{ opacity: 1 }}
        >
          {/* Logo - Centered */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
            className="flex flex-col items-center justify-center"
          >
            {/* Logo - Using SVG file from public folder */}
            <img
              src="/vedha-icon.svg"
              alt="Vedha Logo"
              className="w-[120px] h-auto"
            />
          </motion.div>

          {/* Company Name - Bottom Center */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: 0.3
            }}
            className="absolute bottom-8 text-center font-display font-light text-white/70"
            style={{
              fontSize: '18px',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            Vedha Technologies
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

