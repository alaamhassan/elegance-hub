// HPI 1.7-G
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Home, Wrench, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Utility Components for Animation & Layout ---

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode, delay?: number, className?: string, direction?: "up" | "down" | "left" | "right" | "none" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ParallaxImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`overflow-clip relative ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-20%] w-[140%] h-[140%]">
        <Image src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-gold selection:text-primary-foreground">
      <style>{`
        .hairline-b { border-bottom: 1px solid rgba(90, 74, 66, 0.15); }
        .hairline-t { border-top: 1px solid rgba(90, 74, 66, 0.15); }
        .hairline-l { border-left: 1px solid rgba(90, 74, 66, 0.15); }
        .hairline-r { border-right: 1px solid rgba(90, 74, 66, 0.15); }
        .text-balance { text-wrap: balance; }
      `}</style>

      <Header />

      <main>
        {/* 1. HERO SECTION - Immersive & Architectural */}
        <section ref={heroRef} className="relative w-full min-h-[100vh] flex items-center pt-24 pb-16 overflow-clip">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full h-full">
              <div className="absolute inset-0 bg-background/40 z-10 mix-blend-overlay" />
              <Image
                src="https://static.wixstatic.com/media/6de235_48ab531acd144e9286277031b26a14f8~mv2.png?originWidth=1280&originHeight=704"
                alt="Elegant luxury interior design showcase"
                className="w-full h-full object-cover opacity-40"
              />
            </motion.div>
          </div>

          <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              
              {/* Text Content - Spans 7 columns, overlaps image */}
              <div className="lg:col-span-7 lg:col-start-1 flex flex-col justify-center z-20">
                <FadeIn delay={0.1}>
                  <span className="block font-paragraph text-sm uppercase tracking-[0.2em] text-accent-gold mb-6">
                    Welcome to Elegant Home
                  </span>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] text-primary leading-[0.95] tracking-tight mb-8 text-balance">
                    Curating Spaces of <br className="hidden md:block" />
                    <span className="italic font-light">Timeless Elegance</span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.5}>
                  <p className="font-paragraph text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mb-12">
                    Elegant Home transforms your vision into reality through bespoke interior design and premium home appliances. We craft sanctuaries that reflect your refined taste and elevate everyday living.
                  </p>
                </FadeIn>
                <FadeIn delay={0.7} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Link
                    to="/services"
                    className="group relative inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 font-paragraph text-sm uppercase tracking-widest overflow-hidden transition-all hover:bg-accent-gold"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Explore Services
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-center text-primary font-paragraph text-sm uppercase tracking-widest pb-1 border-b border-primary/30 hover:border-primary transition-colors"
                  >
                    Get in Touch
                  </Link>
                </FadeIn>
              </div>

              {/* Hero Image - Spans 6 columns, pushed right */}
              <div className="lg:col-span-6 lg:col-start-7 hidden lg:block relative h-[80vh] mt-16 lg:mt-0 z-10">
                <FadeIn delay={0.4} direction="left" className="w-full h-full">
                  <div className="w-full h-full relative overflow-clip">
                    <Image
                      src="https://static.wixstatic.com/media/6de235_106280bb7dbe4624aa080447069b1b20~mv2.png?originWidth=1280&originHeight=704"
                      alt="Refined interior detail"
                      className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s] ease-out"
                    />
                    {/* Decorative Frame */}
                    <div className="absolute inset-4 border border-primary-foreground/20 pointer-events-none" />
                  </div>
                </FadeIn>
              </div>

            </div>
          </div>
        </section>

        {/* 2. PHILOSOPHY - The Quiet Breather */}
        <section className="w-full bg-primary-foreground py-32 lg:py-48 hairline-t hairline-b relative">
          {/* Subtle background texture/grid could go here, keeping it clean for now */}
          <div className="max-w-[80rem] mx-auto px-6 md:px-12 text-center">
            <FadeIn>
              <Sparkles className="w-6 h-6 text-accent-gold mx-auto mb-8 opacity-50" />
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary mb-10 text-balance leading-tight">
                "The Art of <span className="italic">Refined Living</span>"
              </h2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="font-paragraph text-lg md:text-xl text-secondary leading-loose max-w-3xl mx-auto text-balance">
                At Elegant Home, we believe that your living space should be a reflection of your unique story. Our approach combines timeless design principles with contemporary sensibilities, creating environments that are both sophisticated and deeply personal. Every detail is considered, every element curated to perfection.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 3. SERVICES - Sticky Narrative Flow */}
        <section className="w-full relative bg-background">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 py-32 lg:py-48">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
              
              {/* Sticky Left Column */}
              <div className="lg:w-1/3 lg:sticky lg:top-40 z-20">
                <FadeIn>
                  <span className="block font-paragraph text-sm uppercase tracking-[0.2em] text-accent-gold mb-4">
                    Our Expertise
                  </span>
                  <h2 className="font-heading text-5xl lg:text-6xl text-primary mb-6 leading-tight">
                    Comprehensive <br />
                    <span className="italic">Solutions</span>
                  </h2>
                  <p className="font-paragraph text-secondary text-lg leading-relaxed mb-8">
                    We offer a holistic approach to home curation, seamlessly blending architectural interior design with the integration of premium, high-performance appliances.
                  </p>
                  <div className="hidden lg:block w-12 h-[1px] bg-primary/20" />
                </FadeIn>
              </div>

              {/* Scrolling Right Column */}
              <div className="lg:w-2/3 flex flex-col gap-32">
                
                {/* Service 1 */}
                <div className="group">
                  <FadeIn>
                    <div className="relative h-[50vh] md:h-[70vh] w-full overflow-clip mb-8">
                      <Image
                        src="https://static.wixstatic.com/media/6de235_26eb9d7b876d486f91798c36248d89ab~mv2.png?originWidth=1152&originHeight=640"
                        alt="Interior design services"
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-700" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                      <div className="flex-shrink-0 mt-2">
                        <span className="font-heading text-2xl text-accent-gold italic">01</span>
                      </div>
                      <div>
                        <h3 className="font-heading text-4xl text-primary mb-4 flex items-center gap-4">
                          Interior Design
                          <Home className="w-6 h-6 text-accent-gold opacity-50" />
                        </h3>
                        <p className="font-paragraph text-lg text-secondary leading-relaxed mb-6 max-w-2xl">
                          From concept to completion, we craft bespoke interiors that embody elegance and functionality. Our designers work closely with you to understand your vision and bring it to life with meticulous attention to detail.
                        </p>
                        <Link
                          to="/services"
                          className="inline-flex items-center font-paragraph text-sm uppercase tracking-widest text-primary hover:text-accent-gold transition-colors group/link"
                        >
                          View Design Services
                          <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                </div>

                {/* Service 2 */}
                <div className="group">
                  <FadeIn>
                    <div className="relative h-[50vh] md:h-[70vh] w-full overflow-clip mb-8">
                      <Image
                        src="https://static.wixstatic.com/media/6de235_da099f5448cc4030a9fd0f98f2b7d457~mv2.png?originWidth=1152&originHeight=640"
                        alt="Home appliances services"
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-700" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                      <div className="flex-shrink-0 mt-2">
                        <span className="font-heading text-2xl text-accent-gold italic">02</span>
                      </div>
                      <div>
                        <h3 className="font-heading text-4xl text-primary mb-4 flex items-center gap-4">
                          Home Appliances
                          <Wrench className="w-6 h-6 text-accent-gold opacity-50" />
                        </h3>
                        <p className="font-paragraph text-lg text-secondary leading-relaxed mb-6 max-w-2xl">
                          Elevate your home with premium appliances that blend seamlessly with your design aesthetic. We source, install, and maintain the finest appliances to ensure your space functions as beautifully as it looks.
                        </p>
                        <Link
                          to="/services"
                          className="inline-flex items-center font-paragraph text-sm uppercase tracking-widest text-primary hover:text-accent-gold transition-colors group/link"
                        >
                          View Appliance Services
                          <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 4. VISUAL BREATHER - Full Bleed Parallax */}
        <section className="w-full h-[70vh] lg:h-[90vh] relative">
          <ParallaxImage 
            src="https://static.wixstatic.com/media/6de235_03173f8c33954b4091c286732a87ed52~mv2.png?originWidth=1600&originHeight=896" 
            alt="Atmospheric interior detail"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply pointer-events-none" />
        </section>

        {/* 5. WHY CHOOSE US - Architectural Grid */}
        <section className="w-full bg-primary text-primary-foreground py-32 lg:py-48">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <FadeIn>
                <h2 className="font-heading text-5xl lg:text-6xl leading-tight">
                  The Elegant Home <br />
                  <span className="italic text-accent-gold">Difference</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-paragraph text-lg opacity-80 max-w-md text-balance">
                  What sets us apart in the world of luxury interior design is our unwavering commitment to perfection.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 hairline-t border-primary-foreground/20">
              
              {/* Feature 1 */}
              <div className="pt-12 pb-12 md:pr-12 md:hairline-r border-primary-foreground/20">
                <FadeIn delay={0.1}>
                  <span className="font-heading text-xl text-accent-gold italic mb-6 block">01.</span>
                  <h3 className="font-heading text-3xl mb-4">Bespoke Approach</h3>
                  <p className="font-paragraph text-base opacity-80 leading-relaxed">
                    Every project is uniquely tailored to your lifestyle, preferences, and aspirations. No templates, only original designs crafted specifically for your sanctuary.
                  </p>
                </FadeIn>
              </div>

              {/* Feature 2 */}
              <div className="pt-12 pb-12 md:px-12 md:hairline-r border-primary-foreground/20 hairline-t md:border-t-0">
                <FadeIn delay={0.3}>
                  <span className="font-heading text-xl text-accent-gold italic mb-6 block">02.</span>
                  <h3 className="font-heading text-3xl mb-4">Timeless Quality</h3>
                  <p className="font-paragraph text-base opacity-80 leading-relaxed">
                    We source only the finest materials and work with master craftsmen to ensure lasting beauty and durability. Our selections are designed to transcend fleeting trends.
                  </p>
                </FadeIn>
              </div>

              {/* Feature 3 */}
              <div className="pt-12 pb-12 md:pl-12 hairline-t md:border-t-0 border-primary-foreground/20">
                <FadeIn delay={0.5}>
                  <span className="font-heading text-xl text-accent-gold italic mb-6 block">03.</span>
                  <h3 className="font-heading text-3xl mb-4">White Glove Service</h3>
                  <p className="font-paragraph text-base opacity-80 leading-relaxed">
                    From initial consultation to final installation, we provide seamless, attentive service at every step, ensuring a stress-free and enjoyable curation process.
                  </p>
                </FadeIn>
              </div>

            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION - The Final Invitation */}
        <section className="w-full bg-background py-32 lg:py-48 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-[60rem] mx-auto px-6 text-center relative z-10">
            <FadeIn>
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary mb-8 leading-tight">
                Begin Your Journey to <br />
                <span className="italic">Refined Living</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-paragraph text-lg md:text-xl text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
                Let us help you create a space that reflects your unique vision and elevates your everyday experience.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-5 font-paragraph text-sm uppercase tracking-widest overflow-hidden transition-all hover:bg-accent-gold"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </FadeIn>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}