import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOOKBOOK_ITEMS } from '../data/salonData';
import { LookbookItem } from '../types';
import { Sparkles, X, ArrowRight, Eye, Scissors, Check } from 'lucide-react';

interface LookbookSectionProps {
  onBookFromLookbook: (serviceName: string) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onBookFromLookbook }) => {
  const [selectedLook, setSelectedLook] = useState<LookbookItem | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const filterOptions = ['All', 'Straightening', 'Perms', 'Color', 'Cuts', 'Head Spa'];

  const filteredItems = LOOKBOOK_ITEMS.filter((item) => {
    if (filter === 'All') return true;
    return item.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <section id="lookbook" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121110] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-2">
            Editorial Lookbook
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F4EF] leading-tight">
            Curated Styles & Texture Portfolios
          </h2>
          <p className="text-sm sm:text-base text-[#A89F93] font-light mt-3">
            An archive of bespoke textures, sculptural cuts, and luminous colors created inside our Buckhead salon.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer ${
                filter === opt
                  ? 'bg-[#C5A880] text-[#121110] font-semibold'
                  : 'bg-[#181614] text-[#A89F93] hover:text-[#F3EFEA] border border-[#2D2A26]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setSelectedLook(item)}
              className="group relative h-96 rounded-sm overflow-hidden bg-[#181614] border border-[#2D2A26] hover:border-[#C5A880]/60 cursor-pointer shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />
              
              {/* Dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

              {/* Top category tag */}
              <div className="absolute top-4 left-4 bg-[#141312]/80 backdrop-blur-md border border-[#C5A880]/30 text-[#C5A880] text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-sm">
                {item.category}
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-0 inset-x-0 p-5 transform transition-transform">
                <span className="text-[10px] uppercase tracking-wider text-[#A89F93] block">
                  {item.subtitle}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F3EFEA] font-light group-hover:text-[#C5A880] transition-colors mt-0.5">
                  {item.title}
                </h3>
                
                <div className="mt-2 flex items-center justify-between text-xs text-[#9E9589] border-t border-[#2D2A26] pt-2">
                  <span>Artist: <strong className="text-[#EAE4DC] font-normal">{item.stylist}</strong></span>
                  <span className="text-[#C5A880] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Look</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox / Lookbook Detail Modal */}
        <AnimatePresence>
          {selectedLook && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#171614] border border-[#3E3A34] rounded-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl relative max-h-[90vh]"
              >
                <button
                  onClick={() => setSelectedLook(null)}
                  className="absolute top-4 right-4 z-10 bg-[#121110]/80 text-[#A89F93] hover:text-[#F3EFEA] w-8 h-8 rounded-full flex items-center justify-center border border-[#332F2A]"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Photo */}
                <div className="md:col-span-6 h-72 md:h-full min-h-[300px] relative bg-black">
                  <img
                    src={selectedLook.image}
                    alt={selectedLook.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm border border-[#C5A880]/50 text-[#C5A880] text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-sm">
                    {selectedLook.category}
                  </div>
                </div>

                {/* Right Details */}
                <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-1">
                      {selectedLook.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EFEA] font-light">
                      {selectedLook.title}
                    </h3>

                    <div className="mt-4 p-3 bg-[#1C1A18] rounded-sm border border-[#2D2A26] space-y-1.5 text-xs text-[#9E9589]">
                      <div>
                        <span className="text-[#C5A880] font-medium">Master Stylist: </span>
                        <span className="text-[#EAE4DC]">{selectedLook.stylist}</span>
                      </div>
                      <div>
                        <span className="text-[#C5A880] font-medium">Hair Profile: </span>
                        <span className="text-[#EAE4DC]">{selectedLook.hairType}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#BDB2A6] font-light leading-relaxed mt-4">
                      {selectedLook.description}
                    </p>

                    <div className="mt-5">
                      <span className="text-[10px] uppercase tracking-wider text-[#A89F93] block mb-2 font-medium">
                        Treatments Applied:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedLook.servicesUsed.map((srv, sIdx) => (
                          <span key={sIdx} className="text-xs bg-[#22201D] text-[#D8D0C5] px-2.5 py-1 rounded-sm border border-[#2F2C28] flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-[#C5A880]" />
                            <span>{srv}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#2B2824] flex gap-3">
                    <button
                      onClick={() => {
                        const name = selectedLook.title;
                        setSelectedLook(null);
                        onBookFromLookbook(name);
                      }}
                      className="flex-1 py-3 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors text-center cursor-pointer shadow-md"
                    >
                      Inquire / Reserve This Look
                    </button>
                    <button
                      onClick={() => setSelectedLook(null)}
                      className="px-4 py-3 border border-[#3E3A34] text-xs text-[#A89F93] hover:text-[#F3EFEA] rounded-sm uppercase tracking-wider cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
