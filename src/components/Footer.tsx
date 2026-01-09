import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const footerLinks = {
    company: [
      { label: 'About', href: '#about' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#' },
    ],
    services: [
      { label: 'Web Development', href: '#services' },
      { label: 'Digital Marketing', href: '#services' },
      { label: 'Brand Strategy', href: '#services' },
      { label: 'SEO & Analytics', href: '#services' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  };

  return (
    <footer ref={ref} id="contact" className="min-h-screen flex flex-col justify-center bg-secondary text-secondary-foreground">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
      {/* CTA Section */}
      <div className="border-b border-secondary-foreground/10">
        <div className="container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6">
              Ready to elevate your
              <br />
              <span className="gradient-text">digital presence?</span>
            </h2>
            <p className="text-xl text-secondary-foreground/70 mb-10 max-w-2xl mx-auto">
              Let's discuss how we can help you build, market, and scale 
              your business to new heights.
            </p>
            <motion.a
              href="#"
              className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Free Consultation
              <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-display font-semibold text-primary-foreground text-sm">V</span>
              </div>
              <span className="font-display font-semibold text-xl">Vedha</span>
            </div>
            <p className="text-secondary-foreground/60 mb-6 max-w-sm">
              Your full-service tech and marketing partner. We build digital products, 
              drive growth, and transform brands for the modern era.
            </p>
            <div className="flex gap-4">
              {['X', 'Li', 'Ig'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <span className="text-sm font-medium">{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-6">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground/60">
            © 2024 Vedha. All rights reserved.
          </p>
          <p className="text-sm text-secondary-foreground/60">
            Made by vedha 
          </p>
        </div>
      </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
