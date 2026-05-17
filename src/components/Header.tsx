import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/useTranslation';
import { useLanguageStore } from '@/lib/languageStore';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useTranslation();
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('services'), path: '/services' },
    { name: t('portfolio'), path: '/portfolio' },
    { name: t('team'), path: '/team' },
    { name: t('testimonials'), path: '/testimonials' },
    { name: t('contact'), path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-accent-gold/20">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.span 
              className="font-heading text-4xl text-primary font-light"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Elegant Home
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-sm uppercase tracking-[0.1em] transition-all duration-300 relative ${
                  isActive(link.path)
                    ? 'text-accent-gold'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-gold to-accent-gold/0"
                    transition={{ duration: 0.4 }}
                  />
                )}
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className={`flex items-center gap-2 font-paragraph uppercase tracking-[0.1em] text-secondary hover:text-primary transition-colors p-2 ${
                  language === 'ar' ? 'text-base' : 'text-sm'
                }`}
                aria-label={t('language')}
              >
                <Globe className="h-4 w-4" />
                {language.toUpperCase()}
              </button>
              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-background border border-accent-gold/30 rounded-lg shadow-lg z-50"
                  >
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 font-paragraph text-sm transition-colors ${
                        language === 'en'
                          ? 'text-accent-gold bg-primary/5'
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('ar');
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 font-paragraph text-base transition-colors border-t border-accent-gold/20 ${
                        language === 'ar'
                          ? 'text-accent-gold bg-primary/5'
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      العربية
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="text-primary p-2"
                aria-label={t('language')}
              >
                <Globe className="h-5 w-5" />
              </button>
              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-background border border-accent-gold/30 rounded-lg shadow-lg z-50"
                  >
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 font-paragraph text-sm transition-colors ${
                        language === 'en'
                          ? 'text-accent-gold bg-primary/5'
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('ar');
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 font-paragraph text-base transition-colors border-t border-accent-gold/20 ${
                        language === 'ar'
                          ? 'text-accent-gold bg-primary/5'
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      العربية
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t border-accent-gold/20"
          >
            <nav className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-paragraph text-sm uppercase tracking-[0.1em] transition-colors ${
                    isActive(link.path)
                      ? 'text-accent-gold'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
