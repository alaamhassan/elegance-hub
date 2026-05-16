import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ContactInquiries } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      const inquiry: ContactInquiries = {
        _id: crypto.randomUUID(),
        customerName: formData.customerName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        subject: formData.subject,
        message: formData.message,
        submissionDate: new Date().toISOString(),
      };

      await BaseCrudService.create('contactinquiries', inquiry);
      
      setSubmitSuccess(true);
      setFormData({
        customerName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="font-heading text-6xl lg:text-7xl text-primary mb-6">
            Get in Touch
          </h1>
          <p className="font-paragraph text-lg text-secondary leading-relaxed">
            We'd love to hear about your project. Reach out to us and let's create something extraordinary together.
          </p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="w-full max-w-[100rem] mx-auto px-8 lg:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-heading text-4xl text-primary mb-8">
              Let's Connect
            </h2>
            <p className="font-paragraph text-base text-secondary mb-12 leading-relaxed">
              Whether you're looking to transform your entire home or need expert advice on a specific project, our team is here to help. Contact us through any of the following channels.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-accent-gold p-3 rounded flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">Email Us</h3>
                  <a
                    href="mailto:info@eleganthome.com"
                    className="font-paragraph text-base text-secondary hover:text-accent-gold transition-colors"
                  >
                    info@eleganthome.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent-gold p-3 rounded flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">Call Us</h3>
                  <a
                    href="tel:+1234567890"
                    className="font-paragraph text-base text-secondary hover:text-accent-gold transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                  <p className="font-paragraph text-sm text-secondary mt-1">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent-gold p-3 rounded flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">Visit Us</h3>
                  <p className="font-paragraph text-base text-secondary">
                    123 Design Avenue, Suite 100<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-primary-foreground p-8 lg:p-12 rounded"
          >
            <h2 className="font-heading text-3xl text-primary mb-6">
              Send Us a Message
            </h2>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-accent-gold/10 border border-accent-gold rounded">
                <p className="font-paragraph text-sm text-primary">
                  Thank you for your inquiry! We'll get back to you shortly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="customerName" className="block font-paragraph text-sm text-primary mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded font-paragraph text-base text-primary focus:outline-none focus:border-accent-gold transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-paragraph text-sm text-primary mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded font-paragraph text-base text-primary focus:outline-none focus:border-accent-gold transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block font-paragraph text-sm text-primary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded font-paragraph text-base text-primary focus:outline-none focus:border-accent-gold transition-colors"
                  placeholder="+1 (234) 567-890"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block font-paragraph text-sm text-primary mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded font-paragraph text-base text-primary focus:outline-none focus:border-accent-gold transition-colors"
                  placeholder="Interior Design Consultation"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-paragraph text-sm text-primary mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded font-paragraph text-base text-primary focus:outline-none focus:border-accent-gold transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center bg-accent-gold text-primary-foreground px-8 py-4 rounded font-paragraph font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
