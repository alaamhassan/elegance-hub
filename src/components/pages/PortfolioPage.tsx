import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useTranslation } from '@/lib/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { PortfolioVideos } from '@/entities';

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

interface PortfolioImage {
  _id: string;
  imageFile?: string;
  imageTitle?: string;
  description?: string;
  projectCategory?: string;
  displayOrder?: number;
  projectUrl?: string;
}

export default function PortfolioPage() {
  const { language } = useTranslation();
  const [videos, setVideos] = useState<PortfolioVideos[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<PortfolioVideos[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideos | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const result = await BaseCrudService.getAll<PortfolioVideos>('portfoliovideos');
        setVideos(result.items);
        setFilteredVideos(result.items);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(result.items.map(v => v.category).filter(Boolean))];
        setCategories(uniqueCategories as string[]);
      } catch (error) {
        console.error('Error loading portfolio videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, []);

  useEffect(() => {
    const loadPortfolioImages = async () => {
      try {
        const result = await BaseCrudService.getAll<PortfolioImage>('portfolioimages', [], { limit: 100 });
        // Sort by displayOrder if available
        const sorted = result.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setPortfolioImages(sorted);
      } catch (error) {
        console.error('Error loading portfolio images:', error);
      } finally {
        setIsLoadingImages(false);
      }
    };

    loadPortfolioImages();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(videos.filter(v => v.category === selectedCategory));
    }
  }, [selectedCategory, videos]);

  const extractVideoId = (url: string) => {
    if (!url) return '';
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    return youtubeMatch ? youtubeMatch[1] : vimeoMatch ? vimeoMatch[1] : '';
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    } else if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    return url;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
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
                ✦ Visual Storytelling ✦
              </motion.span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className={`font-heading leading-tight mb-8 font-light ${language === 'ar' ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-6xl md:text-7xl lg:text-8xl'}`}>
                Portfolio <br />
                <span className="italic font-extralight text-accent-gold">Videos</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="font-paragraph text-lg md:text-xl max-w-2xl leading-relaxed font-light opacity-90">
                Explore our curated collection of interior design transformations, showcasing the artistry and precision that defines Elegant Home.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Portfolio Images Gallery Section */}
        {!isLoadingImages && portfolioImages.length > 0 && (
          <section className="w-full bg-primary-foreground py-16 lg:py-24 border-b border-accent-gold/20">
            <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
              <FadeIn>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-8 bg-accent-gold" />
                  <h2 className="font-heading text-2xl md:text-3xl text-primary font-light">Our Work</h2>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.1}>
                <div className="relative group">
                  {/* Scroll Container */}
                  <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {portfolioImages.map((image, index) => (
                      <motion.div
                        key={image._id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="flex-shrink-0 w-64 h-48 group/item cursor-pointer"
                      >
                        <div className="relative overflow-hidden h-full bg-secondary rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                          {image.imageFile && (
                            <Image
                              src={image.imageFile}
                              alt={image.imageTitle || 'Portfolio work'}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                            />
                          )}
                          <div className="absolute inset-0 bg-primary/0 group-hover/item:bg-primary/50 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover/item:opacity-100">
                            <div className="text-center px-4">
                              <h3 className="font-heading text-lg text-primary-foreground font-light mb-2 line-clamp-2">
                                {image.imageTitle}
                              </h3>
                              {image.projectCategory && (
                                <p className="font-paragraph text-xs text-accent-gold uppercase tracking-[0.1em]">
                                  {image.projectCategory}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <motion.button
                    onClick={() => scroll('left')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-accent-gold hover:text-primary transition-colors duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => scroll('right')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-accent-gold hover:text-primary transition-colors duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* Filter Section */}
        <section className="w-full bg-background py-16 lg:py-24 border-b border-accent-gold/20">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <Filter className="w-5 h-5 text-accent-gold" />
                <h2 className="font-heading text-2xl text-primary font-light">Filter by Category</h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 font-paragraph text-sm uppercase tracking-[0.1em] transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary-foreground text-primary border border-accent-gold/30 hover:border-accent-gold'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Videos Grid */}
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
                  <p className="font-paragraph text-secondary">Loading portfolio...</p>
                </div>
              </div>
            ) : filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map((video, index) => (
                  <FadeIn key={video._id} delay={index * 0.1}>
                    <motion.div
                      className="group cursor-pointer"
                      onClick={() => setSelectedVideo(video)}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative overflow-hidden bg-primary-foreground aspect-video mb-6">
                        {video.thumbnail && (
                          <Image
                            src={video.thumbnail}
                            alt={video.title || 'Portfolio video'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-center justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-accent-gold/90 p-4 rounded-full"
                          >
                            <Play className="w-6 h-6 text-primary fill-primary" />
                          </motion.div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl text-primary mb-3 font-light group-hover:text-accent-gold transition-colors">
                          {video.title}
                        </h3>
                        <p className="font-paragraph text-sm text-accent-gold uppercase tracking-[0.1em] mb-3">
                          {video.category}
                        </p>
                        <p className="font-paragraph text-secondary leading-relaxed line-clamp-2">
                          {video.description}
                        </p>
                      </div>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-secondary">No videos found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Video Modal */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <div className="relative bg-black aspect-video">
                <iframe
                  src={getEmbedUrl(selectedVideo.videoUrl || '')}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              <div className="bg-primary text-primary-foreground p-6 mt-4">
                <h3 className="font-heading text-2xl mb-2 font-light">{selectedVideo.title}</h3>
                <p className="font-paragraph text-sm text-accent-gold uppercase tracking-[0.1em] mb-3">
                  {selectedVideo.category}
                </p>
                <p className="font-paragraph text-base leading-relaxed opacity-90">
                  {selectedVideo.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
