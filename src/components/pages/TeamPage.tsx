import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';

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

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const result = await BaseCrudService.getAll<TeamMembers>('teammembers');
        setTeamMembers(result.items);
      } catch (error) {
        console.error('Error loading team members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeam();
  }, []);

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
          <motion.div 
            className="absolute bottom-0 left-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, delay: 2 }}
          />
          
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
            <FadeIn>
              <motion.span 
                className="block font-paragraph text-xs uppercase tracking-[0.3em] text-accent-gold mb-8 font-light"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                ✦ Meet Our Experts ✦
              </motion.span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl leading-tight mb-8 font-light">
                Our <br />
                <span className="italic font-extralight text-accent-gold">Creative Team</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="font-paragraph text-lg md:text-xl max-w-2xl leading-relaxed font-light opacity-90">
                Talented designers, architects, and craftspeople dedicated to transforming your vision into timeless elegance.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Team Grid */}
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
                  <p className="font-paragraph text-secondary">Loading team...</p>
                </div>
              </div>
            ) : teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <FadeIn key={member._id} delay={index * 0.1}>
                    <motion.div
                      className="group"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Profile Image */}
                      <div className="relative overflow-hidden bg-primary-foreground aspect-square mb-6">
                        {member.profilePicture ? (
                          <Image
                            src={member.profilePicture}
                            alt={member.memberName || 'Team member'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-accent-gold/20 to-primary/10 flex items-center justify-center">
                            <span className="font-heading text-4xl text-accent-gold/30 font-light">
                              {member.memberName?.charAt(0) || 'T'}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                          {member.linkedinProfile && (
                            <motion.a
                              href={member.linkedinProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              className="bg-accent-gold p-3 rounded-full text-primary hover:bg-primary-foreground transition-colors"
                            >
                              <Linkedin className="w-5 h-5" />
                            </motion.a>
                          )}
                          {member.email && (
                            <motion.a
                              href={`mailto:${member.email}`}
                              whileHover={{ scale: 1.1 }}
                              className="bg-accent-gold p-3 rounded-full text-primary hover:bg-primary-foreground transition-colors"
                            >
                              <Mail className="w-5 h-5" />
                            </motion.a>
                          )}
                        </div>
                      </div>

                      {/* Member Info */}
                      <div>
                        <h3 className="font-heading text-2xl text-primary mb-1 font-light">
                          {member.memberName}
                        </h3>
                        <p className="font-paragraph text-sm text-accent-gold uppercase tracking-[0.1em] mb-3">
                          {member.role}
                        </p>
                        {member.yearsOfExperience && (
                          <p className="font-paragraph text-xs text-secondary mb-3 opacity-75">
                            {member.yearsOfExperience}+ years of experience
                          </p>
                        )}
                        <p className="font-paragraph text-sm text-secondary leading-relaxed line-clamp-3">
                          {member.biography}
                        </p>
                      </div>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-secondary">Team members will be displayed here.</p>
              </div>
            )}
          </div>
        </section>

        {/* Team Values Section */}
        <section className="w-full bg-primary text-primary-foreground py-32 lg:py-48 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
          />
          
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
            <FadeIn>
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-16 leading-tight font-light">
                What Drives <br />
                <span className="italic font-extralight text-accent-gold">Our Team</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Passion for Design",
                  description: "Every team member brings an unwavering commitment to creating spaces that inspire and elevate daily living."
                },
                {
                  title: "Attention to Detail",
                  description: "We believe that perfection lies in the details. Every element is carefully considered and meticulously executed."
                },
                {
                  title: "Client-Centric Approach",
                  description: "Your vision is our mission. We listen, collaborate, and deliver solutions tailored to your unique needs."
                }
              ].map((value, index) => (
                <FadeIn key={index} delay={index * 0.2}>
                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span 
                      className="font-heading text-3xl text-accent-gold italic mb-4 block font-light"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                      0{index + 1}.
                    </motion.span>
                    <h3 className="font-heading text-2xl mb-4 font-light">{value.title}</h3>
                    <p className="font-paragraph text-base opacity-85 leading-relaxed font-light">
                      {value.description}
                    </p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
