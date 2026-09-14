import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Navigation, ShieldCheck, Heart, ShoppingBag, Sparkles, ExternalLink, PackageCheck } from 'lucide-react';
import { SALON_DETAILS } from '../data/salonData';
import { SocialIcons } from './SocialIcons';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const StudioLocationFooter: React.FC<FooterProps> = ({ onOpenBooking, onOpenQuiz }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer id="location" className="bg-[#0F0E0D] border-t border-[#262421] text-[#A89F93] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Highlighted Shop Products Showcase Banner at Bottom */}
        <div id="shop-products-highlight-banner" className="mb-16 bg-gradient-to-r from-[#1E1B17] via-[#24201B] to-[#1E1B17] border-2 border-[#C5A880]/60 rounded-xl p-6 sm:p-8 shadow-[0_0_30px_rgba(197,168,128,0.15)] relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            {/* Left: Highlighted Shopping Logo & Description */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
              {/* Highlighted Shopping Logo Icon with Radiant Ring */}
              <div className="relative group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#C5A880] to-[#8C7350] p-0.5 shadow-[0_0_25px_rgba(197,168,128,0.4)] flex items-center justify-center animate-pulse">
                  <div className="w-full h-full bg-[#161412] rounded-[14px] flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#121110] transition-colors duration-300">
                    <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A880] group-hover:text-[#121110] transition-colors" />
                  </div>
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#C5A880] text-[#121110] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                  SHOP STORE
                </span>
              </div>

              <div className="space-y-1.5 max-w-xl">
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-[#C5A880] bg-[#C5A880]/15 px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-[#C5A880]" />
                  <span>Official SalonInteractive Online Store</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F4EF] font-light">
                  Shop Authentic Salon Products Online
                </h3>
                <p className="text-xs sm:text-sm text-[#B8AEA3] font-light leading-relaxed">
                  Support your stylist and order authentic Milbon conditioning treatments, YUKO home care, Olaplex bond builders, and Japanese styling essentials shipped directly to your doorstep.
                </p>
              </div>
            </div>

            {/* Right: Direct High-Contrast Action Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                id="footer-highlighted-shop-btn"
                href="https://shop.saloninteractive.com/store/junko-hair-studio-95652"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-gradient-to-r from-[#C5A880] to-[#E2CFA8] hover:from-[#D5BCA0] hover:to-[#F3EFEA] text-[#121110] font-semibold text-xs uppercase tracking-widest rounded-sm shadow-[0_0_20px_rgba(197,168,128,0.35)] hover:shadow-[0_0_25px_rgba(197,168,128,0.55)] transition-all flex items-center gap-2 group cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#121110] group-hover:scale-110 transition-transform" />
                <span>Open SalonInteractive Store</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#121110]" />
              </a>
            </div>
          </div>
        </div>

        {/* Top Studio Information & Interactive Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#24221F]">
          
          {/* Left Studio Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-1">
                Buckhead Studio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F4EF] font-light">
                Visit Junko Hair Studio
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#F3EFEA] block font-medium">Studio Address:</strong>
                  <span>{SALON_DETAILS.address}</span>
                  <span className="block">{SALON_DETAILS.cityStateZip}</span>
                  <span className="text-[11px] text-[#8C847A] block mt-0.5">Complimentary garage & street parking available.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#F3EFEA] block font-medium">Direct Line:</strong>
                  <a href={`tel:${SALON_DETAILS.formattedPhone}`} className="hover:text-[#C5A880] transition-colors">
                    {SALON_DETAILS.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#F3EFEA] block font-medium">Concierge Inquiries:</strong>
                  <a href={`mailto:${SALON_DETAILS.email}`} className="hover:text-[#C5A880] transition-colors">
                    {SALON_DETAILS.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#F3EFEA] block font-medium">Studio Hours:</strong>
                  <ul className="space-y-1 mt-1 text-xs">
                    {SALON_DETAILS.hours.map((h, i) => (
                      <li key={i} className="flex justify-between gap-4">
                        <span className="text-[#8C847A]">{h.day}:</span>
                        <span className="text-[#D4CAC0]">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Social Channels in Logo Format */}
              <div className="pt-2 border-t border-[#22201D]">
                <strong className="text-xs text-[#EAE4DC] uppercase tracking-wider block font-medium mb-2.5">
                  Follow & Connect:
                </strong>
                <SocialIcons iconSize="md" showLabels={true} />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-md cursor-pointer"
              >
                Book Appointment
              </button>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent('2391 Peachtree Rd NE Suite B3D, Atlanta, GA 30305')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 border border-[#3A3630] hover:border-[#C5A880] text-xs uppercase tracking-wider text-[#D4CAC0] rounded-sm transition-all flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right Visual Map & Ambiance Showcase */}
          <div className="lg:col-span-7 bg-[#161412] border border-[#2D2A26] rounded-lg p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                    Map & Surroundings
                  </span>
                  <h3 className="font-serif text-xl text-[#F3EFEA] font-light">
                    Peachtree Battle • Buckhead
                  </h3>
                </div>
                <span className="text-xs bg-[#22201D] text-[#C5A880] px-3 py-1 rounded-full border border-[#332F2A]">
                  Suite B3D
                </span>
              </div>

              {/* Stylized Dark Map Canvas Preview */}
              <div className="relative h-60 rounded-sm overflow-hidden border border-[#2B2824] bg-[#1C1A18] flex items-center justify-center group">
                {/* Background Map Graphic Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="text-center z-10 p-4">
                  <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center mx-auto mb-2 border border-[#C5A880]/50 shadow-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg text-[#F3EFEA] font-light">Junko Hair Studio</h4>
                  <p className="text-xs text-[#8C847A] mt-0.5">2391 Peachtree Rd NE, Suite B3D, Atlanta, GA 30305</p>
                  
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent('2391 Peachtree Rd NE Suite B3D, Atlanta, GA 30305')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#C5A880] hover:underline mt-3"
                  >
                    <span>Open in Google Maps / Apple Maps</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6 pt-6 border-t border-[#262421]">
              <span className="text-[10px] uppercase tracking-wider text-[#C5A880] block font-semibold mb-1">
                The Hair Science Journal
              </span>
              <p className="text-xs text-[#8C847A] mb-3">
                Receive private invitations to seasonal Japanese conditioning rituals, texture care advice, and new styling masterclasses.
              </p>

              {subscribed ? (
                <div className="p-3 bg-[#1C281E] border border-[#2E4532] text-[#A3D9A5] text-xs rounded-sm">
                  Thank you for subscribing to our hair care journal.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#1C1A18] border border-[#2D2A26] rounded-sm text-xs text-[#F3EFEA] placeholder-[#6E665D] focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Sub-Footer & Copyright */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7268]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg tracking-widest text-[#F3EFEA] uppercase">JUNKO</span>
            <span>• Japanese Hair Studio Atlanta</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-wider">
            <button onClick={onOpenQuiz} className="hover:text-[#C5A880] transition-colors cursor-pointer">Hair Match Quiz</button>
            <a href="#services" className="hover:text-[#C5A880] transition-colors">Services</a>
            <a href="#transformations" className="hover:text-[#C5A880] transition-colors">Before & After</a>
            <a href="#stylists" className="hover:text-[#C5A880] transition-colors">Artists</a>
            <a href="#head-spa" className="hover:text-[#C5A880] transition-colors">Head Spa</a>
            <a 
              href="https://shop.saloninteractive.com/store/junko-hair-studio-95652"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C5A880] font-semibold hover:text-[#F3EFEA] bg-[#C5A880]/10 hover:bg-[#C5A880]/20 px-2.5 py-1 rounded-full border border-[#C5A880]/40 transition-colors"
            >
              <ShoppingBag className="w-3 h-3 text-[#C5A880]" />
              <span>Shop Store</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="text-[11px]">
            © {new Date().getFullYear()} Junko Hair Studio. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
