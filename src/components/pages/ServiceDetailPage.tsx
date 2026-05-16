import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Services | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadService();
  }, [id]);

  const loadService = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<Services>('services', id);
      setService(data);
    } catch (error) {
      console.error('Error loading service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 pt-32 pb-24">
        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : !service ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h2 className="font-heading text-4xl text-primary mb-4">Service Not Found</h2>
              <p className="font-paragraph text-lg text-secondary mb-8">
                The service you're looking for doesn't exist.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center font-paragraph text-accent-gold hover:text-primary transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <Link
                  to="/services"
                  className="inline-flex items-center font-paragraph text-secondary hover:text-accent-gold transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Services
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative h-[600px] rounded overflow-hidden"
                >
                  <Image
                    src={service.mainImage || 'https://static.wixstatic.com/media/6de235_0d5bcabc3fea4a6bbc3767b4ddba437a~mv2.png?originWidth=768&originHeight=576'}
                    alt={service.serviceTitle || 'Service image'}
                    className="w-full h-full object-cover"
                    width={800}
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {service.category && (
                    <span className="inline-block font-paragraph text-sm text-accent-gold mb-4 uppercase tracking-wider">
                      {service.category}
                    </span>
                  )}
                  
                  <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-6">
                    {service.serviceTitle}
                  </h1>

                  {service.shortDescription && (
                    <p className="font-paragraph text-xl text-secondary mb-8 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  )}

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-primary/10">
                    {service.price && (
                      <div className="flex items-center gap-3">
                        <div className="bg-accent-gold/10 p-2 rounded">
                          <Tag className="h-5 w-5 text-accent-gold" />
                        </div>
                        <div>
                          <p className="font-paragraph text-xs text-secondary uppercase tracking-wider mb-1">
                            Price
                          </p>
                          <p className="font-paragraph text-lg text-primary font-medium">
                            {service.price}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {service.estimatedDuration && (
                      <div className="flex items-center gap-3">
                        <div className="bg-accent-gold/10 p-2 rounded">
                          <Clock className="h-5 w-5 text-accent-gold" />
                        </div>
                        <div>
                          <p className="font-paragraph text-xs text-secondary uppercase tracking-wider mb-1">
                            Duration
                          </p>
                          <p className="font-paragraph text-lg text-primary font-medium">
                            {service.estimatedDuration}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {service.description && (
                    <div className="mb-8">
                      <h2 className="font-heading text-3xl text-primary mb-4">
                        About This Service
                      </h2>
                      <p className="font-paragraph text-base text-secondary leading-relaxed whitespace-pre-line">
                        {service.description}
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center bg-accent-gold text-primary-foreground px-8 py-4 rounded font-paragraph font-medium hover:opacity-90 transition-opacity"
                  >
                    Request This Service
                  </Link>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
