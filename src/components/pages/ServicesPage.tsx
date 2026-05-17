import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { Image } from '@/components/ui/image';
import { useTranslation } from '@/lib/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const { t, language } = useTranslation();
  const [services, setServices] = useState<Services[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Services>('services');
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category).filter(Boolean)))];
  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className={`font-heading text-primary mb-6 ${language === 'ar' ? 'text-4xl lg:text-5xl' : 'text-6xl lg:text-7xl'}`}>
            {t('allServices')}
          </h1>
          <p className={`font-paragraph text-secondary leading-relaxed ${language === 'ar' ? 'text-base' : 'text-lg'}`}>
            Discover our comprehensive range of interior design and home appliances services, each crafted to elevate your living experience with sophistication and care.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 pb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded font-paragraph text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-accent-gold text-primary-foreground'
                  : 'bg-transparent text-secondary border border-secondary hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 pb-24">
        <div className="min-h-[600px]">
          {isLoading ? null : filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/services/${service._id}`}>
                    <div className="relative h-[350px] mb-6 overflow-hidden rounded">
                      <Image
                        src={service.mainImage || 'https://static.wixstatic.com/media/6de235_926003add7d441c39eda560f3c6a3e9c~mv2.png?originWidth=448&originHeight=320'}
                        alt={service.serviceTitle || 'Service image'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        width={500}
                      />
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    </div>
                    
                    <div>
                      {service.category && (
                        <span className="inline-block font-paragraph text-xs text-accent-gold mb-2 uppercase tracking-wider">
                          {service.category}
                        </span>
                      )}
                      <h3 className="font-heading text-2xl text-primary mb-3 group-hover:text-accent-gold transition-colors">
                        {service.serviceTitle}
                      </h3>
                      <p className="font-paragraph text-base text-secondary mb-4 leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {service.price && (
                          <span className="font-paragraph text-lg text-primary font-medium">
                            {service.price}
                          </span>
                        )}
                        <span className="inline-flex items-center font-paragraph text-sm text-accent-gold group-hover:gap-2 transition-all">
                          Learn More
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="font-paragraph text-lg text-secondary">
                No services found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-primary-foreground py-24">
        <div className="max-w-[100rem] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-heading text-4xl text-primary mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="font-paragraph text-lg text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can bring your vision to life with our expert services.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-accent-gold text-primary-foreground px-8 py-4 rounded font-paragraph font-medium hover:opacity-90 transition-opacity"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
