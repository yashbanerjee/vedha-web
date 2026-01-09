import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Section {
  id: string;
  label: string;
}

interface SectionNavigatorProps {
  sections: Section[];
}

const SectionNavigator = ({ sections }: SectionNavigatorProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean) as HTMLElement[];

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveIndex(i);
          break;
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (index: number) => {
    if (index < 0 || index >= sections.length) return;

    const section = document.getElementById(sections[index].id);
    if (!section) return;

    isScrolling.current = true;
    setActiveIndex(index);

    section.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });

    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  };

  const scrollToNext = () => {
    if (activeIndex < sections.length - 1) {
      scrollToSection(activeIndex + 1);
    }
  };

  const scrollToPrev = () => {
    if (activeIndex > 0) {
      scrollToSection(activeIndex - 1);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:flex flex-col items-center gap-4">
      {/* Up Arrow */}
      <motion.button
        onClick={scrollToPrev}
        disabled={activeIndex === 0}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          activeIndex === 0
            ? 'bg-muted/30 text-muted-foreground/30 cursor-not-allowed'
            : 'bg-card/80 backdrop-blur-xl border border-border/50 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary cursor-pointer'
        }`}
        whileHover={activeIndex > 0 ? { scale: 1.1 } : {}}
        whileTap={activeIndex > 0 ? { scale: 0.95 } : {}}
        aria-label="Previous section"
      >
        <ChevronUp size={20} />
      </motion.button>

      {/* Section Indicators */}
      <div className="flex flex-col gap-2 bg-card/80 backdrop-blur-xl border border-border/50 rounded-full px-2 py-3">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-primary w-2 h-6'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to ${section.label}`}
          />
        ))}
      </div>

      {/* Down Arrow */}
      <motion.button
        onClick={scrollToNext}
        disabled={activeIndex === sections.length - 1}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          activeIndex === sections.length - 1
            ? 'bg-muted/30 text-muted-foreground/30 cursor-not-allowed'
            : 'bg-card/80 backdrop-blur-xl border border-border/50 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary cursor-pointer'
        }`}
        whileHover={activeIndex < sections.length - 1 ? { scale: 1.1 } : {}}
        whileTap={activeIndex < sections.length - 1 ? { scale: 0.95 } : {}}
        aria-label="Next section"
      >
        <ChevronDown size={20} />
      </motion.button>
    </div>
  );
};

export default SectionNavigator;

