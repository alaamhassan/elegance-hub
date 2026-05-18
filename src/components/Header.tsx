import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/useTranslation';
import { useLanguageStore } from '@/lib/languageStore';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useTranslation();
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const navLinks = [
    { name: 'Finishing', path: '/services' },
    { name: 'Supplies & Trading', path: '/services' },
    { name: 'Lighting', path: '/portfolio' },
    { name: 'Components', path: '/portfolio' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#D4C5B9] to-[#C4B5AA] backdrop-blur-sm border-b-2 border-[#B8A07A]/40 shadow-lg">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-28">
          {/* Left: Logo Image + Brand Name */}
          <Link to="/" className="flex items-center gap-4 group">
            <motion.div 
              className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#B8A07A] flex-shrink-0 bg-white/50"
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="https://static.wixstatic.com/media/6de235_aa692f69e0014f9ea69a35b14fc017b2~mv2.png?originWidth=128&originHeight=128"
                alt="Elegant Home Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-heading text-2xl md:text-3xl text-[#3D2817] font-light tracking-wide">
                Elegant Home
              </h1>
              <p className="font-paragraph text-xs text-[#5A4A42] tracking-[0.15em] uppercase font-light">
                Commercial Services & Contracting
              </p>
            </motion.div>
          </Link>

          {/* Right: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.path}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={link.path}
                  className="font-paragraph text-sm text-[#3D2817] uppercase tracking-[0.12em] transition-all duration-300 relative group/nav font-light hover:text-[#B8A07A]"
                >
                  {link.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#B8A07A] to-[#B8A07A]/0"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}

            {/* Language Selector */}
            <div className="relative ml-4 pl-4 border-l-2 border-[#B8A07A]/30">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center gap-2 font-paragraph text-sm uppercase tracking-[0.12em] text-[#3D2817] hover:text-[#B8A07A] transition-colors p-2 font-light"
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
                    className="absolute top-full right-0 mt-2 bg-[#D4C5B9] border-2 border-[#B8A07A] rounded-lg shadow-xl z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-6 py-3 font-paragraph text-sm transition-all ${
                        language === 'en'
                          ? 'text-[#B8A07A] bg-[#3D2817]/10 font-semibold'
                          : 'text-[#3D2817] hover:text-[#B8A07A] hover:bg-[#3D2817]/5'
                      }`}
                    >
                      English
                    </button>
                    <div className="h-px bg-[#B8A07A]/20" />
                    <button
                      onClick={() => {
                        setLanguage('ar');
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-6 py-3 font-paragraph text-sm transition-all ${
                        language === 'ar'
                          ? 'text-[#B8A07A] bg-[#3D2817]/10 font-semibold'
                          : 'text-[#3D2817] hover:text-[#B8A07A] hover:bg-[#3D2817]/5'
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
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="text-[#3D2817] p-2 hover:text-[#B8A07A] transition-colors"
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
                    className="absolute top-full right-0 mt-2 bg-[#D4C5B9] border-2 border-[#B8A07A] rounded-lg shadow-xl z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 font-paragraph text-sm transition-all ${
                        language === 'en'
                          ? 'text-[#B8A07A] bg-[#3D2817]/10'
                          : 'text-[#3D2817] hover:text-[#B8A07A]'
                      }`}
                    >
                      English
                    </button>
                    <div className="h-px bg-[#B8A07A]/20" />
                    <button
                      onClick={() => {
                        setLanguage('ar');
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 font-paragraph text-sm transition-all ${
                        language === 'ar'
                          ? 'text-[#B8A07A] bg-[#3D2817]/10'
                          : 'text-[#3D2817] hover:text-[#B8A07A]'
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
              className="text-[#3D2817] p-2 hover:text-[#B8A07A] transition-colors"
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
            className="lg:hidden bg-[#D4C5B9]/95 border-t-2 border-[#B8A07A]/40"
          >
            <nav className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-paragraph text-sm uppercase tracking-[0.12em] text-[#3D2817] hover:text-[#B8A07A] transition-colors font-light py-2"
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
