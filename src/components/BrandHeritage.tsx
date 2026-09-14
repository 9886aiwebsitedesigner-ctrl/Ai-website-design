import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Award, HeartHandshake, Scissors, Droplets } from 'lucide-react';
import { SALON_DETAILS } from '../data/salonData';

export const BrandHeritage: React.FC = () => {
  const pillars = [
    {
      icon: <Scissors className="w-5 h-5 text-[#C5A880]" />,
      title: "Japanese Precision Geometry",
      desc: "Every cut is calculated around cranial anatomy, hair density, and organic growth patterns for seamless grow-out."
    },
    {
      icon: <Droplets className="w-5 h-5 text-[#C5A880]" />,
      title: "Authentic Bond Science (YUKO & Milbon)",
      desc: "We exclusively utilize medical-grade Japanese collagen, SSVR silk proteins, and pH-controlled formulations."
    },
    {
      icon: <Award className="w-5 h-5 text-[#C5A880]" />,
      title: "Master Texture Specialization",
      desc: "33+ years of expertise confidently retexturizing every hair ethnicity — from stubborn coarse Asian strands to fine or fragile curls."
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#C5A880]" />,
      title: "Omotenashi Hospitality",
      desc: "Mindful, serene, unhurried Japanese hospitality in a minimalist Buckhead sanctuary designed for tranquility."
    }
  ];

  return (
    <section id="heritage" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#151413] border-b border-[#2D2A26] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#C5A880]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Architectural Photo & Legacy Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-lg overflow-hidden border border-[#3E3A34] bg-[#1A1816] shadow-2xl">
              <img
                src="/src/assets/images/junko_salon_interior_1788320344181.jpg"
                alt="Junko Hair Studio - Minimalist Japanese Salon Interior in Buckhead Atlanta"
                className="w-full h-[400px] sm:h-[480px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/90 via-[#121110]/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-1">
                  The Buckhead Sanctuary
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#F3EFEA] font-light leading-snug">
                  "A peaceful oasis where ancient Japanese craftsmanship merges with contemporary hair engineering."
                </p>
                <span className="text-xs text-[#9E9589] mt-2 block">
                  — Junko Taniguchi, Founder
                </span>
              </div>
            </div>

            {/* Experience Stamp */}
            <div className="absolute -top-4 -left-4 bg-[#1F1D1A] border border-[#C5A880]/40 p-4 rounded-sm shadow-xl hidden sm:flex items-center gap-3">
              <div className="font-serif text-3xl font-light text-[#C5A880]">33+</div>
              <div className="text-[10px] uppercase tracking-widest text-[#D4CAC0] leading-tight font-medium">
                Years of Master<br />Craftsmanship
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative & Pillars */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col space-y-6"
          >
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-2">
                Our Philosophy & Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F4EF] leading-tight">
                Rooted in Tokyo Precision. Perfected in Buckhead.
              </h2>
            </div>

            <p className="text-base text-[#B8AEA3] font-light leading-relaxed">
              Founded in 1991 on Peachtree Road, <strong className="text-[#EAE4DC] font-normal">Junko Hair Studio</strong> introduced the Southeast to the meticulous art of Japanese Thermal Reconditioning and ceramic digital perm technology. 
            </p>

            <p className="text-base text-[#B8AEA3] font-light leading-relaxed">
              Hair is living architecture. Rather than forcing temporary styling with damaging heat, our master stylists diagnose the biological porosity and elasticity of every client to craft enduring, healthy, effortless elegance.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {pillars.map((pillar, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-sm bg-[#1A1816]/70 border border-[#2D2A26] hover:border-[#C5A880]/40 transition-colors"
                >
                  <div className="mb-2.5 flex items-center gap-2">
                    {pillar.icon}
                    <h3 className="text-sm font-medium text-[#F3EFEA] tracking-wide">{pillar.title}</h3>
                  </div>
                  <p className="text-xs text-[#9E9488] leading-relaxed font-light">{pillar.desc}</p>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
