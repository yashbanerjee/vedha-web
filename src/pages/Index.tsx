import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import ProblemSolution from '@/components/ProblemSolution';
import Services from '@/components/Services';
import CaseStudies from '@/components/CaseStudies';
import Approach from '@/components/Approach';
import Testimonials from '@/components/Testimonials';
import Comparison from '@/components/Comparison';
import Technologies from '@/components/Technologies';
import About from '@/components/About';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import SectionNavigator from '@/components/SectionNavigator';


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
        {/* <CaseStudies /> */}
        <Approach />
        <Testimonials />
        {/* <Comparison /> */}
        {/* <Technologies /> */}
        {/* <About /> */}
        {/* <Pricing /> */}
        <FAQ />
        <Footer />
      </main>

      <SectionNavigator sections={sections} />
    </div>
  );
};

export default Index;
