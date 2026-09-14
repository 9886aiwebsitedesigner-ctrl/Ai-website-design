import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, DollarSign, Sparkles, Check, ArrowRight, Filter, Search, Info } from 'lucide-react';
import { SERVICES_DATA } from '../data/salonData';
import { ServiceCategory, ServiceItem } from '../types';

interface ServiceMenuProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServiceMenu: React.FC<ServiceMenuProps> = ({ onSelectServiceForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all' as ServiceCategory, label: 'All Services' },
    { id: 'jtr-straightening' as ServiceCategory, label: 'JTR Straightening' },
    { id: 'digital-perms' as ServiceCategory, label: 'Digital Perms' },
    { id: 'precision-cuts' as ServiceCategory, label: 'Precision Cuts' },
    { id: 'color-balayage' as ServiceCategory, label: 'Color & Balayage' },
    { id: 'head-spa-treatments' as ServiceCategory, label: 'Head Spa & Care' },
    { id: 'extensions-styling' as ServiceCategory, label: 'Bridal & Styling' },
  ];

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121110] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-2">
            Curated Salon Menu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F4EF] leading-tight">
            Services of Scientific Precision & Artistic Grace
          </h2>
          <p className="text-sm sm:text-base text-[#A89F93] font-light mt-3">
            Every session begins with an individualized hair porosity & texture diagnosis. Select a service to explore formulas, duration, and tailored master stylists.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#262421]">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs uppercase tracking-wider whitespace-nowrap rounded-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#C5A880] text-[#121110] font-semibold shadow-md'
                    : 'bg-[#1A1816] text-[#A89F93] hover:text-[#F3EFEA] hover:bg-[#25221F] border border-[#2D2A26]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C847A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search treatments or techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1A1816] border border-[#2E2B27] rounded-sm text-xs text-[#F3EFEA] placeholder-[#6E665D] focus:outline-none focus:border-[#C5A880] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C847A] hover:text-[#F3EFEA]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="bg-[#171614] border border-[#2B2824] hover:border-[#C5A880]/50 rounded-sm p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:shadow-black/40 relative"
              >
                {/* Service Tag */}
                {service.tag && (
                  <div className="absolute top-4 right-4 bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-sm font-medium">
                    {service.tag}
                  </div>
                )}

                <div>
                  <div className="pr-16">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F3EFEA] font-normal group-hover:text-[#C5A880] transition-colors">
                      {service.name}
                    </h3>
                  </div>

                  {/* Timing and Price Metadata */}
                  <div className="flex items-center gap-4 text-xs text-[#A89F93] mt-3 pb-3 border-b border-[#262320]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{service.durationMinutes} min</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium text-[#E5DDD4]">
                      <span className="text-[#C5A880]">From ${service.priceStartingAt}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9E9589] font-light mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Highlights Checklist */}
                  <ul className="mt-4 space-y-1.5">
                    {service.highlights.slice(0, 3).map((item, hIdx) => (
                      <li key={hIdx} className="text-xs text-[#C8C0B5] flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Recommended Stylists */}
                  <div className="mt-4 pt-3 border-t border-[#262320] flex flex-wrap items-center gap-1.5 text-[11px] text-[#8C847A]">
                    <span className="font-medium text-[#A89F93]">Specialists:</span>
                    {service.recommendedStylists.map((st, sIdx) => (
                      <span key={sIdx} className="bg-[#201E1B] text-[#D4CAC0] px-2 py-0.5 rounded-sm border border-[#2E2B27]">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="mt-6 pt-4 border-t border-[#262320] flex items-center justify-between gap-3">
                  <button
                    id={`view-details-${service.id}`}
                    onClick={() => setSelectedServiceDetail(service)}
                    className="text-xs text-[#B8AEA3] hover:text-[#C5A880] flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Details & Prep</span>
                  </button>

                  <button
                    id={`book-service-${service.id}`}
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="px-4 py-2 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal for Service Details */}
        <AnimatePresence>
          {selectedServiceDetail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#181614] border border-[#3E3A34] rounded-lg max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedServiceDetail(null)}
                  className="absolute top-4 right-4 text-[#8C847A] hover:text-[#F3EFEA] p-2 text-xl"
                >
                  ✕
                </button>

                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                    Comprehensive Guide
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EFEA] font-light mt-1">
                    {selectedServiceDetail.name}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#C5A880] bg-[#221F1B] p-3 rounded-sm border border-[#332F2A] mb-4">
                  <span>Duration: ~{selectedServiceDetail.durationMinutes} min</span>
                  <span>•</span>
                  <span>Investment: Starting at ${selectedServiceDetail.priceStartingAt}</span>
                </div>

                <p className="text-sm text-[#BDB2A6] leading-relaxed mb-4">
                  {selectedServiceDetail.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-xs uppercase tracking-wider text-[#EAE4DC] font-semibold mb-2">
                    Included in this Treatment:
                  </h4>
                  <ul className="space-y-2">
                    {selectedServiceDetail.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-[#9E9488] flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedServiceDetail.priceNote && (
                  <p className="text-xs text-[#8C847A] italic bg-[#1E1C1A] p-3 rounded-sm border border-[#2D2A26] mb-6">
                    Note: {selectedServiceDetail.priceNote}
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const id = selectedServiceDetail.id;
                      setSelectedServiceDetail(null);
                      onSelectServiceForBooking(id);
                    }}
                    className="flex-1 py-3 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors text-center cursor-pointer"
                  >
                    Select & Reserve Date
                  </button>
                  <button
                    onClick={() => setSelectedServiceDetail(null)}
                    className="px-4 py-3 border border-[#3E3A34] hover:border-[#C5A880] text-xs text-[#D4CAC0] uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
