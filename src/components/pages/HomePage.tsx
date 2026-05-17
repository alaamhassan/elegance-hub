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
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
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
        <section ref={heroRef} className="relative w-full min-h-[120vh] flex items-center pt-32 pb-20 overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <motion.div 
              animate={{ 
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(184, 160, 122, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(184, 160, 122, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(184, 160, 122, 0.15) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute inset-0"
            />
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/60 z-10" />
              <Image
                src="https://static.wixstatic.com/media/6de235_48ab531acd144e9286277031b26a14f8~mv2.png?originWidth=1280&originHeight=704"
                alt="Elegant luxury interior design showcase"
                className="w-full h-full object-cover opacity-30"
              />
            </motion.div>
          </div>

          <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
              
              {/* Text Content - Spans 7 columns, overlaps image */}
              <div className="lg:col-span-7 lg:col-start-1 flex flex-col justify-center z-20">
                <FadeIn delay={0.05}>
                  <motion.span 
                    className="block font-paragraph text-xs uppercase tracking-[0.3em] text-accent-gold mb-8 font-light"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    ✦ Welcome to Elegant Home ✦
                  </motion.span>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <h1 className="font-heading text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] text-primary leading-[0.9] tracking-tighter mb-10 text-balance font-light">
                    Curating Spaces of <br className="hidden md:block" />
                    <span className="italic font-extralight text-accent-gold">Timeless Elegance</span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <p className="font-paragraph text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mb-14 font-light">
                    Elegant Home transforms your vision into reality through bespoke interior design and premium home appliances. We craft sanctuaries that reflect your refined taste and elevate everyday living.
                  </p>
                </FadeIn>
                <FadeIn delay={0.6} className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                  <Link
                    to="/services"
                    className="group relative inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-5 font-paragraph text-xs uppercase tracking-[0.15em] overflow-hidden transition-all duration-500 hover:bg-accent-gold hover:shadow-lg"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Explore Services
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </span>
                  </Link>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-center text-primary font-paragraph text-xs uppercase tracking-[0.15em] pb-2 border-b-2 border-primary/40 hover:border-accent-gold transition-all duration-300"
                  >
                    Get in Touch
                  </Link>
                </FadeIn>
              </div>

              {/* Hero Image - Spans 6 columns, pushed right */}
              <div className="lg:col-span-6 lg:col-start-7 hidden lg:block relative h-[90vh] mt-20 lg:mt-0 z-10">
                <FadeIn delay={0.3} direction="left" className="w-full h-full">
                  <motion.div 
                    className="w-full h-full relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Image
                      src="https://static.wixstatic.com/media/6de235_106280bb7dbe4624aa080447069b1b20~mv2.png?originWidth=1280&originHeight=704"
                      alt="Refined interior detail"
                      className="w-full h-full object-cover"
                    />
                    {/* Decorative Frame with animation */}
                    <motion.div 
                      className="absolute inset-6 border-2 border-accent-gold/40 pointer-events-none"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent-gold/60" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent-gold/60" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent-gold/60" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent-gold/60" />
                  </motion.div>
                </FadeIn>
              </div>

            </div>
          </div>
        </section>

        {/* 2. PHILOSOPHY - The Quiet Breather */}
        <section className="w-full bg-primary-foreground py-40 lg:py-56 hairline-t hairline-b relative overflow-hidden">
          {/* Animated background elements */}
          <motion.div 
            className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, delay: 2 }}
          />
          
          <div className="max-w-[80rem] mx-auto px-6 md:px-12 text-center relative z-10">
            <FadeIn>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Sparkles className="w-8 h-8 text-accent-gold mx-auto mb-10 opacity-70" />
              </motion.div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary mb-12 text-balance leading-tight font-light">
                "The Art of <span className="italic font-extralight text-accent-gold">Refined Living</span>"
              </h2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="font-paragraph text-lg md:text-xl text-secondary leading-relaxed max-w-3xl mx-auto text-balance font-light">
                At Elegant Home, we believe that your living space should be a reflection of your unique story. Our approach combines timeless design principles with contemporary sensibilities, creating environments that are both sophisticated and deeply personal. Every detail is considered, every element curated to perfection.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 3. SERVICES - Sticky Narrative Flow */}
        <section className="w-full relative bg-background py-32 lg:py-56">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
              
              {/* Sticky Left Column */}
              <div className="lg:w-1/3 lg:sticky lg:top-40 z-20">
                <FadeIn>
                  <motion.span 
                    className="block font-paragraph text-xs uppercase tracking-[0.3em] text-accent-gold mb-6 font-light"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    ✦ Our Expertise ✦
                  </motion.span>
                  <h2 className="font-heading text-6xl lg:text-7xl text-primary mb-8 leading-tight font-light">
                    Comprehensive <br />
                    <span className="italic font-extralight text-accent-gold">Solutions</span>
                  </h2>
                  <p className="font-paragraph text-secondary text-lg leading-relaxed mb-10 font-light">
                    We offer a holistic approach to home curation, seamlessly blending architectural interior design with the integration of premium, high-performance appliances.
                  </p>
                  <motion.div 
                    className="hidden lg:block w-16 h-[2px] bg-gradient-to-r from-accent-gold to-accent-gold/0"
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </FadeIn>
              </div>

              {/* Scrolling Right Column */}
              <div className="lg:w-2/3 flex flex-col gap-40">
                
                {/* Service 1 */}
                <div className="group">
                  <FadeIn>
                    <motion.div 
                      className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden mb-10"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src="https://static.wixstatic.com/media/6de235_26eb9d7b876d486f91798c36248d89ab~mv2.png?originWidth=1152&originHeight=640"
                        alt="Interior design services"
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-colors duration-700" />
                      {/* Decorative overlay */}
                      <motion.div 
                        className="absolute inset-0 border-2 border-accent-gold/0 group-hover:border-accent-gold/30 transition-colors duration-700"
                      />
                    </motion.div>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                      <div className="flex-shrink-0">
                        <motion.span 
                          className="font-heading text-4xl text-accent-gold italic font-light"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          01
                        </motion.span>
                      </div>
                      <div>
                        <h3 className="font-heading text-5xl text-primary mb-6 flex items-center gap-4 font-light">
                          Interior Design
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          >
                            <Home className="w-7 h-7 text-accent-gold opacity-60" />
                          </motion.div>
                        </h3>
                        <p className="font-paragraph text-lg text-secondary leading-relaxed mb-8 max-w-2xl font-light">
                          From concept to completion, we craft bespoke interiors that embody elegance and functionality. Our designers work closely with you to understand your vision and bring it to life with meticulous attention to detail.
                        </p>
                        <Link
                          to="/services"
                          className="inline-flex items-center font-paragraph text-xs uppercase tracking-[0.15em] text-primary hover:text-accent-gold transition-all duration-300 group/link pb-2 border-b border-primary/30 hover:border-accent-gold"
                        >
                          View Design Services
                          <ChevronRight className="ml-3 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                </div>

                {/* Service 2 */}
                <div className="group">
                  <FadeIn>
                    <motion.div 
                      className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden mb-10"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src="https://static.wixstatic.com/media/6de235_da099f5448cc4030a9fd0f98f2b7d457~mv2.png?originWidth=1152&originHeight=640"
                        alt="Home appliances services"
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-colors duration-700" />
                      <motion.div 
                        className="absolute inset-0 border-2 border-accent-gold/0 group-hover:border-accent-gold/30 transition-colors duration-700"
                      />
                    </motion.div>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                      <div className="flex-shrink-0">
                        <motion.span 
                          className="font-heading text-4xl text-accent-gold italic font-light"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        >
                          02
                        </motion.span>
                      </div>
                      <div>
                        <h3 className="font-heading text-5xl text-primary mb-6 flex items-center gap-4 font-light">
                          Home Appliances
                          <motion.div
                            animate={{ rotate: [0, -360] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          >
                            <Wrench className="w-7 h-7 text-accent-gold opacity-60" />
                          </motion.div>
                        </h3>
                        <p className="font-paragraph text-lg text-secondary leading-relaxed mb-8 max-w-2xl font-light">
                          Elevate your home with premium appliances that blend seamlessly with your design aesthetic. We source, install, and maintain the finest appliances to ensure your space functions as beautifully as it looks.
                        </p>
                        <Link
                          to="/services"
                          className="inline-flex items-center font-paragraph text-xs uppercase tracking-[0.15em] text-primary hover:text-accent-gold transition-all duration-300 group/link pb-2 border-b border-primary/30 hover:border-accent-gold"
                        >
                          View Appliance Services
                          <ChevronRight className="ml-3 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
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
        <section className="w-full h-[70vh] lg:h-[100vh] relative overflow-hidden">
          <ParallaxImage 
            src="https://static.wixstatic.com/media/6de235_03173f8c33954b4091c286732a87ed52~mv2.png?originWidth=1600&originHeight=896" 
            alt="Atmospheric interior detail"
            className="w-full h-full"
          />
          <motion.div 
            className="absolute inset-0 bg-primary/30 mix-blend-multiply pointer-events-none"
            animate={{ opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          {/* Decorative text overlay */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <div className="text-center">
              <p className="font-heading text-6xl md:text-8xl text-primary-foreground/20 italic font-light">
                Timeless
              </p>
            </div>
          </motion.div>
        </section>

        {/* 5. WHY CHOOSE US - Architectural Grid */}
        <section className="w-full bg-primary text-primary-foreground py-40 lg:py-56 relative overflow-hidden">
          {/* Animated background */}
          <motion.div 
            className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
          />
          
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <FadeIn>
                <h2 className="font-heading text-6xl lg:text-7xl leading-tight font-light">
                  The Elegant Home <br />
                  <span className="italic font-extralight text-accent-gold">Difference</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-paragraph text-lg opacity-80 max-w-md text-balance font-light">
                  What sets us apart in the world of luxury interior design is our unwavering commitment to perfection.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 hairline-t border-primary-foreground/20">
              
              {/* Feature 1 */}
              <motion.div 
                className="pt-16 pb-16 md:pr-16 md:hairline-r border-primary-foreground/20 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <FadeIn delay={0.1}>
                  <motion.span 
                    className="font-heading text-2xl text-accent-gold italic mb-8 block font-light"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    01.
                  </motion.span>
                  <h3 className="font-heading text-4xl mb-6 font-light">Bespoke Approach</h3>
                  <p className="font-paragraph text-base opacity-85 leading-relaxed font-light">
                    Every project is uniquely tailored to your lifestyle, preferences, and aspirations. No templates, only original designs crafted specifically for your sanctuary.
                  </p>
                </FadeIn>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                className="pt-16 pb-16 md:px-16 md:hairline-r border-primary-foreground/20 hairline-t md:border-t-0 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <FadeIn delay={0.3}>
                  <motion.span 
                    className="font-heading text-2xl text-accent-gold italic mb-8 block font-light"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    02.
                  </motion.span>
                  <h3 className="font-heading text-4xl mb-6 font-light">Timeless Quality</h3>
                  <p className="font-paragraph text-base opacity-85 leading-relaxed font-light">
                    We source only the finest materials and work with master craftsmen to ensure lasting beauty and durability. Our selections are designed to transcend fleeting trends.
                  </p>
                </FadeIn>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                className="pt-16 pb-16 md:pl-16 hairline-t md:border-t-0 border-primary-foreground/20 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <FadeIn delay={0.5}>
                  <motion.span 
                    className="font-heading text-2xl text-accent-gold italic mb-8 block font-light"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  >
                    03.
                  </motion.span>
                  <h3 className="font-heading text-4xl mb-6 font-light">White Glove Service</h3>
                  <p className="font-paragraph text-base opacity-85 leading-relaxed font-light">
                    From initial consultation to final installation, we provide seamless, attentive service at every step, ensuring a stress-free and enjoyable curation process.
                  </p>
                </FadeIn>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 6. PORTFOLIO PREVIEW - Showcase Videos */}
        <section className="w-full bg-primary-foreground py-40 lg:py-56 relative overflow-hidden">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start mb-24">
              <div className="lg:w-1/3">
                <FadeIn>
                  <motion.span 
                    className="block font-paragraph text-xs uppercase tracking-[0.3em] text-accent-gold mb-6 font-light"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    ✦ Visual Excellence ✦
                  </motion.span>
                  <h2 className="font-heading text-6xl lg:text-7xl text-primary mb-8 leading-tight font-light">
                    Portfolio <br />
                    <span className="italic font-extralight text-accent-gold">Videos</span>
                  </h2>
                  <p className="font-paragraph text-secondary text-lg leading-relaxed mb-10 font-light">
                    Explore our curated collection of interior design transformations that showcase the artistry and precision defining Elegant Home.
                  </p>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center font-paragraph text-xs uppercase tracking-[0.15em] text-primary hover:text-accent-gold transition-all duration-300 group/link pb-2 border-b border-primary/30 hover:border-accent-gold"
                  >
                    View Full Portfolio
                    <ChevronRight className="ml-3 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CALL TO ACTION - The Final Invitation */}
        <section className="w-full bg-background py-40 lg:py-56 relative overflow-hidden">
          {/* Animated decorative elements */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent-gold/8 rounded-full blur-3xl"
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          
          <div className="max-w-[60rem] mx-auto px-6 text-center relative z-10">
            <FadeIn>
              <h2 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary mb-10 leading-tight font-light">
                Begin Your Journey to <br />
                <span className="italic font-extralight text-accent-gold">Refined Living</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-paragraph text-lg md:text-xl text-secondary mb-14 max-w-2xl mx-auto leading-relaxed font-light">
                Let us help you create a space that reflects your unique vision and elevates your everyday experience.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center bg-primary text-primary-foreground px-12 py-6 font-paragraph text-xs uppercase tracking-[0.15em] overflow-hidden transition-all duration-500 hover:bg-accent-gold hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
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