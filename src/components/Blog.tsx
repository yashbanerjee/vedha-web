import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowUpRight } from 'lucide-react';

const posts = [
  {
    title: 'The Future of Digital Marketing: Trends to Watch in 2025',
    category: 'Marketing',
    date: 'Dec 15, 2024',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=400&fit=crop',
    excerpt: 'Discover the key marketing trends that will shape business growth in the coming year.',
  },
  {
    title: 'How to Build a Website That Actually Converts',
    category: 'Web Development',
    date: 'Dec 10, 2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    excerpt: 'A practical guide to creating websites that turn visitors into paying customers.',
  },
  {
    title: '5 Signs Your Brand Needs a Digital Refresh',
    category: 'Branding',
    date: 'Dec 5, 2024',
    image: 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=600&h=400&fit=crop',
    excerpt: 'Key indicators that show your brand is ready for a modern transformation.',
  },
];

const Blog = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} id="blog" className="py-32 md:py-40 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 md:mb-24 gap-6 md:gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-badge inline-flex mb-6 md:mb-8"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Blog
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-title"
            >
              Latest insights
            </motion.h2>
          </div>
          
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#"
            className="btn-secondary inline-flex items-center gap-2"
          >
            View All Posts
            <ArrowUpRight size={18} />
          </motion.a>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/2] mb-6 rounded-2xl overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                <span className="text-primary font-medium">{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              
              <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
