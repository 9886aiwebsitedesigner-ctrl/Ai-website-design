import React from 'react';
import { motion } from 'motion/react';
import { Droplets, Sparkles, Wind, Heart, Clock, Check, ArrowRight } from 'lucide-react';

interface HeadSpaSpotlightProps {
  onBookHeadSpa: () => void;
}

export const JapaneseHeadSpaSpotlight: React.FC<HeadSpaSpotlightProps> = ({ onBookHeadSpa }) => {
  const spaSteps = [
    {
      num: "01",
      title: "Microscopic Scalp Diagnostic",
      desc: "High-magnification camera analysis to determine sebum levels, follicle blockage, and scalp sensitivity."
    },
    {
      num: "02",
      title: "Botanical Clay & Carbonated Foam",
      desc: "Cleanses deeply rooted impurities, silicones, and micro-particles while rebalancing the acid mantle."
    },
    {
      num: "03",
      title: "Circular Waterfall Hydrotherapy",
      desc: "Warm mineralized stream cascades continuously over the forehead and scalp for profound nervous system calm."
    },
    {
      num: "04",
      title: "Shiatsu Acupressure Cranial Massage",
      desc: "Targeted point stimulation easing neck tension, promoting micro-circulation, and stimulating hair follicles."
    },
    {
      num: "05",
      title: "Micro-Mist Steam & Moisture Lock",
      desc: "Ultrasonic warm mist gently opens hair cuticles to infuse Japanese amino acids and botanical oils."
    }
  ];

  return (
    <section id="head-spa" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#11100F] border-b border-[#2D2A26] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#C5A880]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col space-y-6"
          >
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-[11px] uppercase tracking-widest font-semibold">
              <Droplets className="w-3.5 h-3.5" />
              <span>Sensory Wellness Sanctuary</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F4EF] leading-tight">
              The Japanese Head Spa: <span className="italic font-normal text-[#C5A880]">Sanctuary for Scalp & Soul</span>
            </h2>

            <p className="text-sm sm:text-base text-[#B3A99D] font-light leading-relaxed">
              In traditional Japanese hair care, breathtaking hair begins at the roots. Our immersive 60-minute Head Spa ritual combines ancient acupressure touch with modern hydro-mist therapy to de-stress the mind and revitalize the scalp ecosystem.
            </p>

            <div className="p-4 rounded-sm bg-[#181614] border border-[#2D2A26] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C847A] block">Ritual Duration & Investment</span>
                <span className="font-serif text-xl text-[#F3EFEA] font-light">60 Minutes • $140</span>
              </div>
              <button
                onClick={onBookHeadSpa}
                className="px-5 py-2.5 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-200 cursor-pointer shadow-md"
              >
                Book Head Spa
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#161413] border border-[#262421] rounded-sm">
                <span className="text-xs font-medium text-[#E5DDD4] block">Deep Follicle Detox</span>
                <span className="text-[11px] text-[#8C847A] font-light">Removes sebum build-up & hard water residue</span>
              </div>
              <div className="p-3 bg-[#161413] border border-[#262421] rounded-sm">
                <span className="text-xs font-medium text-[#E5DDD4] block">Stress & Tension Relief</span>
                <span className="text-[11px] text-[#8C847A] font-light">Calms vagus nerve & facial strain</span>
              </div>
            </div>
          </motion.div>

          {/* Right: The 5-Stage Protocol Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 bg-[#161412] border border-[#2C2925] p-6 sm:p-8 rounded-lg shadow-2xl relative"
          >
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>The 5-Stage Head Spa Protocol</span>
            </h3>

            <div className="space-y-4">
              {spaSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-4 border-b border-[#22201D] last:border-0 last:pb-0">
                  <span className="font-serif text-xl font-light text-[#C5A880] shrink-0 w-8">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-[#F3EFEA] tracking-wide">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#9E9589] font-light mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
