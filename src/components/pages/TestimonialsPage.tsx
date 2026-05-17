import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ClientTestimonials } from '@/entities';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<ClientTestimonials[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const result = await BaseCrudService.getAll<ClientTestimonials>('clienttestimonials');
        setTestimonials(result.items);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const renderStars = (rating: number | undefined) => {
    if (!rating) return null;
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.round(rating)
                ? 'fill-accent-gold text-accent-gold'
                : 'text-accent-gold/30'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-gold selection:text-primary-foreground">
      <Header />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="w-full bg-primary text-primary-foreground py-32 lg:py-48 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
          />
          
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
            <FadeIn>
              <motion.span 
                className="block font-paragraph text-xs uppercase tracking-[0.3em] text-accent-gold mb-8 font-light"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                ✦ Client Stories ✦
              </motion.span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl leading-tight mb-8 font-light">
                Testimonials & <br />
                <span className="italic font-extralight text-accent-gold">Success Stories</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="font-paragraph text-lg md:text-xl max-w-2xl leading-relaxed font-light opacity-90">
                Hear from our satisfied clients about their transformative experiences with Elegant Home.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full bg-background py-16 lg:py-24 border-b border-accent-gold/20">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { number: "500+", label: "Projects Completed" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "15+", label: "Years of Excellence" }
              ].map((stat, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <motion.h3 
                      className="font-heading text-5xl md:text-6xl text-accent-gold mb-3 font-light"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="font-paragraph text-secondary uppercase tracking-[0.1em] text-sm">
                      {stat.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="w-full bg-background py-32 lg:py-48">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-2 border-accent-gold border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="font-paragraph text-secondary">Loading testimonials...</p>
                </div>
              </div>
            ) : testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <FadeIn key={testimonial._id} delay={index * 0.1}>
                    <motion.div
                      className="bg-primary-foreground p-8 border border-accent-gold/20 hover:border-accent-gold/50 transition-all duration-300 group"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Stars */}
                      <div className="mb-6">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Testimonial Text */}
                      <p className="font-paragraph text-secondary leading-relaxed mb-8 italic">
                        "{testimonial.testimonialText}"
                      </p>

                      {/* Client Info */}
                      <div className="flex items-center gap-4">
                        {testimonial.clientPhoto && (
                          <Image
                            src={testimonial.clientPhoto}
                            alt={testimonial.clientName || 'Client'}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <h4 className="font-heading text-lg text-primary font-light">
                            {testimonial.clientName}
                          </h4>
                          <p className="font-paragraph text-xs text-accent-gold uppercase tracking-[0.1em]">
                            {testimonial.clientTitleCompany}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-secondary">Testimonials will be displayed here.</p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Testimonial */}
        {testimonials.length > 0 && (
          <section className="w-full bg-primary text-primary-foreground py-32 lg:py-48 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl"
              animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
              transition={{ duration: 25, repeat: Infinity }}
            />
            
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
              <FadeIn>
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-8"
                  >
                    <Star className="w-8 h-8 text-accent-gold fill-accent-gold" />
                  </motion.div>
                  <p className="font-paragraph text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-12 italic font-light">
                    "{testimonials[0]?.testimonialText}"
                  </p>
                  <div className="flex flex-col items-center gap-3">
                    <h4 className="font-heading text-2xl font-light">
                      {testimonials[0]?.clientName}
                    </h4>
                    <p className="font-paragraph text-sm text-accent-gold uppercase tracking-[0.1em]">
                      {testimonials[0]?.clientTitleCompany}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="w-full bg-background py-32 lg:py-48 relative overflow-hidden">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent-gold/8 rounded-full blur-3xl"
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          
          <div className="max-w-[60rem] mx-auto px-6 text-center relative z-10">
            <FadeIn>
              <h2 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary mb-10 leading-tight font-light">
                Ready to Create <br />
                <span className="italic font-extralight text-accent-gold">Your Story?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-paragraph text-lg md:text-xl text-secondary mb-14 max-w-2xl mx-auto leading-relaxed font-light">
                Let us help you transform your space into a sanctuary of elegance and comfort.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <motion.a
                href="/contact"
                className="group relative inline-flex items-center justify-center bg-primary text-primary-foreground px-12 py-6 font-paragraph text-xs uppercase tracking-[0.15em] overflow-hidden transition-all duration-500 hover:bg-accent-gold hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Schedule Your Consultation</span>
              </motion.a>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
