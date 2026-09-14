import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BEFORE_AFTER_ITEMS } from '../data/salonData';
import { Sparkles, CheckCircle, Clock, Scissors, UserCheck } from 'lucide-react';

interface BeforeAfterGalleryProps {
  onBookTransformation: (serviceName: string) => void;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({ onBookTransformation }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100

  const currentItem = BEFORE_AFTER_ITEMS[selectedItemIndex];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <section id="transformations" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#161513] border-b border-[#2D2A26] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-2">
            Real Transformations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F4EF] leading-tight">
            The Power of Japanese Thermal Alchemy
          </h2>
          <p className="text-sm sm:text-base text-[#A89F93] font-light mt-3">
            Interact with the slider to inspect the dramatic before & after textures achieved by our master technicians.
          </p>
        </div>

        {/* Transformation Switcher Tabs */}
        <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-2">
          {BEFORE_AFTER_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedItemIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer ${
                selectedItemIndex === idx
                  ? 'bg-[#C5A880] text-[#121110] font-semibold shadow-lg'
                  : 'bg-[#1D1B18] text-[#9E9589] hover:text-[#F3EFEA] border border-[#2F2C28]'
              }`}
            >
              {item.service}
            </button>
          ))}
        </div>

        {/* Main Interactive Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#131211] border border-[#2C2925] p-4 sm:p-8 rounded-lg shadow-2xl">
          
          {/* Interactive Slider Canvas */}
          <div className="lg:col-span-7">
            <div 
              className="relative w-full h-[360px] sm:h-[480px] rounded-sm overflow-hidden select-none cursor-ew-resize border border-[#3A3631]"
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
            >
              {/* After Image (Background Full) */}
              <img
                src={currentItem.afterImage}
                alt={`${currentItem.title} - After`}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 right-4 bg-[#141312]/80 backdrop-blur-md border border-[#C5A880]/50 text-[#C5A880] text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm font-semibold pointer-events-none">
                AFTER: Glass Result
              </span>

              {/* Before Image (Clipped Overlay) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentItem.beforeImage}
                  alt={`${currentItem.title} - Before`}
                  className="absolute inset-y-0 left-0 w-[800px] h-[360px] sm:h-[480px] object-cover max-w-none"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/20 text-[#D8D2C9] text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm font-semibold pointer-events-none">
                  BEFORE: Natural Texture
                </span>
              </div>

              {/* Draggable Divider Line */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-[#C5A880] shadow-[0_0_12px_rgba(197,168,128,0.8)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#C5A880] text-[#121110] flex items-center justify-center shadow-lg border-2 border-[#121110]">
                  <span className="text-xs font-bold font-sans">‹ ›</span>
                </div>
              </div>

              {/* Mobile helper tip */}
              <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-[#F3EFEA]/80 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                  Drag slider horizontally to compare
                </span>
              </div>
            </div>
          </div>

          {/* Details Narrative Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-[10px] uppercase tracking-widest font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Case Study</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EFEA] font-light leading-snug">
                {currentItem.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-[#8E8478] mt-3 pb-3 border-b border-[#252320]">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Artist: <strong className="text-[#E5DDD4]">{currentItem.stylist}</strong></span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Duration: {currentItem.timeTaken}</span>
                </span>
              </div>

              <p className="text-sm text-[#B5ABA0] font-light leading-relaxed mt-4">
                {currentItem.hairStory}
              </p>

              {/* Key Highlights */}
              <div className="mt-5 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-semibold block">
                  Outcome Highlights:
                </span>
                {currentItem.keyBenefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-xs text-[#DDD5CC]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#A3D9A5] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onBookTransformation(currentItem.service)}
              className="w-full py-3.5 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-200 shadow-md cursor-pointer"
            >
              Consult On This Transformation
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
