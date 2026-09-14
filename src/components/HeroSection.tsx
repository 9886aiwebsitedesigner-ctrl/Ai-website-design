import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, Award, ShieldCheck, Star } from 'lucide-react';
import { SALON_DETAILS } from '../data/salonData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenQuiz }) => {
  return (
    <section id="hero-editorial" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#2D2A26]">
      {/* Background Subtle Gradient & Grid Glow */}
      <div className="absolute inset-0 bg-radial from-[#221F1B] via-[#141312] to-[#0E0D0C] opacity-90 -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#C5A880]/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Editorial Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col space-y-6"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-[#C5A880]/30 bg-[#1C1A17]/80 backdrop-blur-md">
            <Award className="w-4 h-4 text-[#C5A880]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              Buckhead, Atlanta • Established 1991
            </span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#F7F4EF] tracking-tight leading-[1.08]">
            Mastery of <span className="italic font-normal text-[#C5A880]">Texture</span>, Precision in <span className="italic font-normal">Form</span>.
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg text-[#BDB2A6] font-light max-w-2xl leading-relaxed">
            Atlanta's premier Japanese hair studio for over three decades. Pioneering authentic <strong className="text-[#EAE4DC] font-normal">Japanese Thermal Reconditioning (JTR)</strong>, weightless <strong className="text-[#EAE4DC] font-normal">Digital Perms</strong>, architectural precision cuts, and restorative <strong className="text-[#EAE4DC] font-normal">Head Spa rituals</strong> for every hair texture.
          </p>

          {/* Interactive Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              id="hero-book-primary-btn"
              onClick={onOpenBooking}
              className="px-7 py-4 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] font-semibold text-xs sm:text-sm uppercase tracking-widest rounded-sm transition-all duration-300 shadow-xl hover:shadow-[#C5A880]/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve An Appointment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-match-quiz-btn"
              onClick={onOpenQuiz}
              className="px-6 py-4 border border-[#3E3A34] hover:border-[#C5A880] text-[#E5DDD4] hover:text-[#F3EFEA] bg-[#1A1816]/60 text-xs sm:text-sm uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Find Your Hair Treatment</span>
            </button>
          </div>

          {/* Social Proof & Badges */}
          <div className="pt-6 border-t border-[#2A2723] grid grid-cols-3 gap-4 max-w-xl">
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl text-[#F3EFEA] font-light">33+</span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#8E8478] mt-0.5">Years in Buckhead</span>
            </div>
            <div className="flex flex-col border-l border-[#2A2723] pl-4">
              <div className="flex items-center text-[#C5A880] gap-0.5 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#C5A880]" />
                <span className="text-[#F3EFEA] font-serif text-2xl sm:text-3xl font-light ml-1">4.9</span>
              </div>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#8E8478] mt-0.5">650+ Client Reviews</span>
            </div>
            <div className="flex flex-col border-l border-[#2A2723] pl-4">
              <span className="font-serif text-2xl sm:text-3xl text-[#C5A880] font-light">Dual</span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#8E8478] mt-0.5">US & Japan Licensed</span>
            </div>
          </div>
        </motion.div>

        {/* Right High-Fashion Editorial Imagery Composition */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Outer luxury border card */}
            <div className="relative rounded-lg overflow-hidden border border-[#3E3A34] bg-[#181614] shadow-2xl gold-glow group">
              <img
                src="/src/assets/images/junko_hero_hair_1788320326641.jpg"
                alt="Junko Hair Studio - Japanese Thermal Reconditioning High Fashion Editorial"
                className="w-full h-[460px] sm:h-[540px] object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-black/20" />

              {/* Floating Editorial Label Tag */}
              <div className="absolute bottom-6 inset-x-6 bg-[#161514]/90 backdrop-blur-md border border-[#3A3630] p-4 rounded-sm shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-medium block">
                      Signature Transformation
                    </span>
                    <h2 className="font-serif text-lg sm:text-xl text-[#F3EFEA] font-light">
                      Japanese Thermal Reconditioning
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A8175] block">Atlanta Humidity</span>
                    <span className="text-xs font-semibold text-[#A3D9A5] flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Proof
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Floating Badge */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#1F1D1A] border border-[#C5A880]/50 p-3 rounded-sm shadow-2xl items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] tracking-wider uppercase text-[#C5A880] font-semibold block">Quality Award</span>
                <span className="text-xs text-[#EAE4DC]">Best Atlanta Salon 2024</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
