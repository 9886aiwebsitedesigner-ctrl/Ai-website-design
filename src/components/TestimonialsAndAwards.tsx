import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS_DATA, FAQS, SALON_DETAILS } from '../data/salonData';
import { Star, Award, ShieldCheck, ChevronDown, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const TestimonialsAndAwards: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#151413] border-b border-[#2D2A26] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Award Highlight Banner */}
        <div className="bg-[#1C1A17] border border-[#C5A880]/30 rounded-lg p-6 sm:p-10 mb-20 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#C5A880] text-xs uppercase tracking-widest font-semibold">
                <Award className="w-4 h-4" />
                <span>Prestigious Distinction</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#F7F4EF] font-light leading-snug">
                Winner of the 2024 Quality Business Award for Best Hair Salon in Atlanta
              </h3>
              <p className="text-xs sm:text-sm text-[#B3A99D] font-light leading-relaxed max-w-2xl">
                Recognized for continuous dedication to excellence, authentic Japanese technique mastery, client safety standards, and over 33 years of hair transformation leadership in Buckhead Atlanta.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-start lg:items-end">
              <div className="bg-[#141312] border border-[#2F2C28] p-4 rounded-sm w-full sm:w-auto lg:w-full">
                <div className="flex items-center gap-1 text-[#C5A880] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A880]" />
                  ))}
                </div>
                <span className="text-sm font-serif text-[#F3EFEA] block font-light">4.9 Average Verified Rating</span>
                <span className="text-[10px] text-[#8C847A] uppercase tracking-wider">Across 650+ Client Experiences</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-2">
            Client Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F4EF] leading-tight">
            Loved Across Atlanta & The Southeast
          </h2>
          <p className="text-sm sm:text-base text-[#A89F93] font-light mt-3">
            Read authentic experiences from long-time clients whose daily routines were revolutionized by our studio.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-[#181614] border border-[#2B2824] p-6 rounded-sm flex flex-col justify-between hover:border-[#C5A880]/40 transition-colors"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C5A880]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#A3D9A5] flex items-center gap-1 font-medium bg-[#1C281E] px-2 py-0.5 rounded-sm">
                    <CheckCircle2 className="w-3 h-3" /> Verified Client
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#C8C0B5] font-light leading-relaxed italic mb-6">
                  "{item.review}"
                </p>
              </div>

              <div className="border-t border-[#262320] pt-4">
                <h4 className="font-serif text-base text-[#F3EFEA] font-normal">{item.author}</h4>
                <div className="flex justify-between text-[11px] text-[#8C847A] mt-0.5">
                  <span>{item.service} (by {item.stylist})</span>
                  <span>{item.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-1">
              Curated Answers
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F7F4EF] font-light">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="bg-[#181614] border border-[#2B2824] rounded-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 cursor-pointer hover:bg-[#1C1A18] transition-colors"
                >
                  <span className="font-serif text-lg sm:text-xl text-[#F3EFEA] font-light">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5A880] shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#A89F93] font-light leading-relaxed border-t border-[#262421] pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
