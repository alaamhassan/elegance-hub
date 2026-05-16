import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="max-w-[100rem] mx-auto px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-3xl mb-4">Elegant Home</h3>
            <p className="font-paragraph text-sm opacity-90 leading-relaxed">
              Curating spaces of timeless elegance through bespoke interior design and premium home appliances.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="font-paragraph text-sm opacity-90 hover:opacity-100 hover:text-accent-gold transition-all"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="font-paragraph text-sm opacity-90 hover:opacity-100 hover:text-accent-gold transition-all"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="font-paragraph text-sm opacity-90 hover:opacity-100 hover:text-accent-gold transition-all"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-xl mb-4">Our Services</h4>
            <ul className="flex flex-col gap-3">
              <li className="font-paragraph text-sm opacity-90">Interior Design</li>
              <li className="font-paragraph text-sm opacity-90">Space Planning</li>
              <li className="font-paragraph text-sm opacity-90">Home Appliances</li>
              <li className="font-paragraph text-sm opacity-90">Consultation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-xl mb-4">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent-gold mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@eleganthome.com"
                  className="font-paragraph text-sm opacity-90 hover:opacity-100 hover:text-accent-gold transition-all"
                >
                  info@eleganthome.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent-gold mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="font-paragraph text-sm opacity-90 hover:opacity-100 hover:text-accent-gold transition-all"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent-gold mt-0.5 flex-shrink-0" />
                <p className="font-paragraph text-sm opacity-90">
                  123 Design Avenue, Suite 100<br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <p className="font-paragraph text-sm text-center opacity-80">
            © {new Date().getFullYear()} Elegant Home. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
