import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STYLISTS_DATA } from '../data/salonData';
import { Calendar, Sparkles, Scissors, Award, CheckCircle2 } from 'lucide-react';
import { Stylist } from '../types';

interface StylistTeamProps {
  onSelectStylistForBooking: (stylistId: string) => void;
}

type FilterCategory = 'all' | 'jtr-perms' | 'color-balayage' | 'cuts-natural';

export const StylistTeam: React.FC<StylistTeamProps> = ({ onSelectStylistForBooking }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredStylists = STYLISTS_DATA.filter(stylist => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'jtr-perms') {
      return (
        stylist.specialties.some(s => s.toLowerCase().includes('jtr') || s.toLowerCase().includes('perm') || s.toLowerCase().includes('reconditioning')) ||
        stylist.title.toLowerCase().includes('jtr') ||
        stylist.title.toLowerCase().includes('perm')
      );
    }
    if (activeFilter === 'color-balayage') {
      return (
        stylist.specialties.some(s => s.toLowerCase().includes('color') || s.toLowerCase().includes('balayage') || s.toLowerCase().includes('highlight') || s.toLowerCase().includes('blonde')) ||
        stylist.title.toLowerCase().includes('color') ||
        stylist.title.toLowerCase().includes('balayage') ||
        stylist.title.toLowerCase().includes('highlight')
      );
    }
    if (activeFilter === 'cuts-natural') {
      return (
        stylist.specialties.some(s => s.toLowerCase().includes('cut') || s.toLowerCase().includes('natural') || s.toLowerCase().includes('layer') || s.toLowerCase().includes('extension')) ||
        stylist.title.toLowerCase().includes('cut') ||
        stylist.title.toLowerCase().includes('natural')
      );
    }
    return true;
  });

  return (
    <section id="stylists" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#141312] border-b border-[#2D2A26]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#C5A880]/10 border border-[#C5A880]/30 px-3.5 py-1 rounded-full text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-medium mb-3">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>Meet Our Stylists</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F4EF] leading-tight">
            The Master Artists of Junko Hair Studio
          </h2>
          <p className="text-sm sm:text-base text-[#A89F93] font-light mt-3 leading-relaxed">
            With decades of combined international mastery across Tokyo, Vidal Sassoon NYC, Paul Mitchell, and Atlanta, our licensed master stylists bring dedicated technical precision and bespoke artistry to every client.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: `All Master Stylists (${STYLISTS_DATA.length})` },
            { id: 'jtr-perms', label: 'JTR & Digital Perm Specialists' },
            { id: 'color-balayage', label: 'Balayage & Color Artists' },
            { id: 'cuts-natural', label: 'Precision Cuts & Natural Hair' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as FilterCategory)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#C5A880] text-[#121110] font-semibold shadow-[0_0_15px_rgba(197,168,128,0.3)]'
                  : 'bg-[#1C1A18] text-[#9E9589] hover:text-[#F3EFEA] hover:bg-[#25221F] border border-[#2B2824]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stylists Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredStylists.map((stylist: Stylist) => (
              <motion.div
                key={stylist.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="bg-[#181614] border border-[#2B2824] hover:border-[#C5A880]/50 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:shadow-black/60"
              >
                <div>
                  {/* Stylist Real Photo */}
                  <div className="relative h-80 w-full overflow-hidden bg-[#1D1B18]">
                    <img
                      src={stylist.image}
                      alt={`${stylist.name} - ${stylist.title}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-black/10 to-transparent" />
                    
                    {/* Experience Badge */}
                    <div className="absolute top-3 left-3 bg-[#121110]/85 backdrop-blur-md border border-[#C5A880]/50 text-[#C5A880] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm font-semibold shadow-md flex items-center gap-1">
                      <Award className="w-3 h-3 text-[#C5A880]" />
                      <span>{stylist.experienceYears}+ Years Exp</span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-2xl text-[#F3EFEA] font-light group-hover:text-[#C5A880] transition-colors">
                        {stylist.name}
                      </h3>
                    </div>
                    
                    <span className="text-xs text-[#C5A880] font-medium tracking-wide block mt-1 leading-snug">
                      {stylist.title}
                    </span>

                    {/* Credentials / Licenses */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {stylist.licenses.map((lic, lIdx) => (
                        <span key={lIdx} className="text-[10px] bg-[#22201D] text-[#A89F93] px-2 py-0.5 rounded-sm border border-[#2E2B27]">
                          {lic}
                        </span>
                      ))}
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-[#9E9589] font-light leading-relaxed mt-4">
                      {stylist.bio}
                    </p>

                    {/* Quote */}
                    <blockquote className="mt-4 pl-3 border-l-2 border-[#C5A880]/60 text-xs italic text-[#C8C0B5] font-serif">
                      "{stylist.quote}"
                    </blockquote>

                    {/* Specialties */}
                    <div className="mt-5 pt-3.5 border-t border-[#262320]">
                      <span className="text-[10px] uppercase tracking-wider text-[#8C847A] block mb-2 font-semibold flex items-center gap-1">
                        <Scissors className="w-2.5 h-2.5 text-[#C5A880]" />
                        <span>Specialties & Focus:</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {stylist.specialties.map((spec, sIdx) => (
                          <span key={sIdx} className="text-[11px] text-[#D8D0C5] bg-[#201D1B] border border-[#2D2A26] px-2.5 py-0.5 rounded-sm">
                            • {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Action Footer */}
                <div className="p-6 pt-0">
                  <button
                    id={`book-with-${stylist.id}`}
                    onClick={() => onSelectStylistForBooking(stylist.id)}
                    className="w-full py-2.5 border border-[#3E3A34] hover:border-[#C5A880] bg-[#1E1C19] hover:bg-[#C5A880] text-[#E5DDD4] hover:text-[#121110] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book with {stylist.name.split(' ')[0]}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
