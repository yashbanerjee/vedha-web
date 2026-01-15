import { Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import ProblemSolution from '@/components/ProblemSolution';
import Services from '@/components/Services';
import SectionNavigator from '@/components/SectionNavigator';
import LoadingScreen from '@/components/LoadingScreen';

// Lazy load below-the-fold components
const Approach = lazy(() => import('@/components/Approach'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const About = lazy(() => import('@/components/About'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Footer = lazy(() => import('@/components/Footer'));

// Commented out components kept for reference but imports removed to avoid unused warnings
// import CaseStudies from '@/components/CaseStudies';
// import Comparison from '@/components/Comparison';
// import Technologies from '@/components/Technologies';
// import Pricing from '@/components/Pricing';

const Index = () => {
  const sections = [
    { id: 'hero', label: 'Hero' },
    { id: 'problem-solution', label: 'Problem & Solution' },
    { id: 'logo-marquee', label: 'Clients' },
    { id: 'services', label: 'Services' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'approach', label: 'Approach' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'comparison', label: 'Comparison' },
    { id: 'technologies', label: 'Technologies' },
    { id: 'about', label: 'About' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="snap-y snap-mandatory">
        <Hero />
        <ProblemSolution />
        <LogoMarquee />
        <Services />
        
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading...</div>}>
          <Approach />
          <Testimonials />
          <About />
          <FAQ />
          <Footer />
        </Suspense>
      </main>
      
      <SectionNavigator sections={sections} />
    </div>
  );
};

export default Index;
