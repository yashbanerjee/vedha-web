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
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';


const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        

        <ProblemSolution />
        <Services />
        <CaseStudies />
        <Approach />
        <Testimonials />
        <Comparison />
        <Technologies />
        <LogoMarquee />
        <About />
        <Pricing />
        <FAQ />
        {/* <Blog /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
