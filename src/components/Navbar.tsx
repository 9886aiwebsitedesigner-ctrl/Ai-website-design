import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Sparkles, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SALON_DETAILS } from '../data/salonData';
import { SocialIcons } from './SocialIcons';

interface NavbarProps {
  onOpenBooking: (serviceId?: string, stylistId?: string) => void;
  onOpenConsultationQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenConsultationQuiz }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Transformations', href: '#transformations' },
    { name: 'Head Spa', href: '#head-spa' },
    { name: 'Lookbook', href: '#lookbook' },
    { name: 'Master Stylists', href: '#stylists' },
    { name: 'Heritage', href: '#heritage' },
    { name: 'Location & Hours', href: '#location' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro-banner with Social Logos at top corner */}
      <div id="top-announcement-bar" className="bg-[#181614] border-b border-[#2D2A26] text-xs text-[#B8AEA3] py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Buckhead, Atlanta • 2391 Peachtree Rd NE</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 border-l border-[#33302B] pl-4">
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Tue–Sat: Open for Appointments</span>
            </span>
          </div>

          {/* Top right corner actions & Social Media Logos in official app logo format */}
          <div className="flex items-center gap-3.5 ml-auto">
            <button 
              id="header-quiz-btn"
              onClick={onOpenConsultationQuiz}
              className="hover:text-[#C5A880] transition-colors hidden sm:flex items-center gap-1 text-[11px] uppercase tracking-wider font-medium cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>Hair Match Quiz</span>
            </button>
            <a 
              id="header-phone-link"
              href={`tel:${SALON_DETAILS.formattedPhone}`}
              className="hover:text-[#C5A880] transition-colors hidden sm:flex items-center gap-1 font-medium text-xs border-r border-[#33302B] pr-3"
            >
              <Phone className="w-3 h-3 text-[#C5A880]" />
              <span>{SALON_DETAILS.phone}</span>
            </a>

            {/* Social Media App Logos at Top Corner */}
            <div id="top-corner-social-links" className="flex items-center gap-1">
              <span className="text-[10px] uppercase tracking-wider text-[#8C847A] hidden xl:inline-block mr-1">
                Connect:
              </span>
              <SocialIcons iconSize="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Main sticky header */}
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#121110]/95 backdrop-blur-md py-3 shadow-xl border-b border-[#2D2A26]'
            : 'bg-[#121110]/80 backdrop-blur-sm py-5 border-b border-[#2D2A26]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            id="brand-logo"
            href="#"
            className="group flex flex-col cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl sm:text-3xl tracking-widest uppercase font-light text-[#F3EFEA] group-hover:text-[#C5A880] transition-colors">
                JUNKO
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-sans border-l border-[#3E3A34] pl-2">
                HAIR STUDIO
              </span>
            </div>
            <span className="text-[9px] tracking-[0.25em] text-[#8C847A] uppercase -mt-0.5 font-light">
              ATLANTA • EST. 1991
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-7 text-[13px] tracking-wider uppercase font-medium text-[#C8C0B5]">
            {navLinks.map((link) => (
              <button
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-[#C5A880] transition-colors relative py-1 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="cta-nav-consult"
              onClick={onOpenConsultationQuiz}
              className="px-4 py-2 text-xs uppercase tracking-widest text-[#D4CAC0] hover:text-[#F3EFEA] border border-[#3E3A34] hover:border-[#C5A880] rounded-sm transition-all duration-300 cursor-pointer"
            >
              Consultation
            </button>
            <button
              id="cta-nav-book"
              onClick={() => onOpenBooking()}
              className="px-5 py-2 text-xs uppercase tracking-widest font-semibold bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] rounded-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="cta-mobile-quick-book"
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold bg-[#C5A880] text-[#121110] rounded-sm"
            >
              Book
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F3EFEA] hover:text-[#C5A880] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[88px] z-50 bg-[#141312] border-b border-[#2D2A26] px-6 py-8 shadow-2xl lg:hidden max-h-[calc(100vh-90px)] overflow-y-auto"
          >
            <div className="flex flex-col space-y-5 text-center">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  id={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(link.href)}
                  className="font-serif text-xl tracking-wider text-[#EAE4DC] hover:text-[#C5A880] py-2 border-b border-[#22201D] text-left cursor-pointer"
                >
                  {link.name}
                </button>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  id="mobile-drawer-quiz-cta"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultationQuiz();
                  }}
                  className="w-full py-3 text-xs uppercase tracking-widest border border-[#C5A880] text-[#C5A880] rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Interactive Hair Match Quiz</span>
                </button>
                <button
                  id="mobile-drawer-book-cta"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3.5 text-xs uppercase tracking-widest font-semibold bg-[#C5A880] text-[#121110] rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Your Experience</span>
                </button>
                <a
                  id="mobile-drawer-call-btn"
                  href={`tel:${SALON_DETAILS.formattedPhone}`}
                  className="text-xs text-[#9E9488] hover:text-[#C5A880] pt-2 flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direct Line: {SALON_DETAILS.phone}</span>
                </a>

                {/* Mobile Drawer Social Links */}
                <div className="pt-4 border-t border-[#22201D] flex flex-col items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#8C847A]">
                    Follow & Review Us
                  </span>
                  <SocialIcons iconSize="md" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
