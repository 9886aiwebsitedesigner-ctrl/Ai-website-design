import React, { useEffect, useState } from 'react';
import { Star, MessageSquareQuote, ExternalLink, CheckCircle } from 'lucide-react';
import { SALON_DETAILS } from '../data/salonData';

export const ClientGoogleReviews: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamically inject the SociableKIT Google Reviews script to ensure it mounts in React SPA
    const scriptId = 'sociablekit-google-reviews-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://widgets.sociablekit.com/google-reviews/widget.js';
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);
    } else {
      // If already present, re-execute to render inside current mounted DOM element
      const reScript = document.createElement('script');
      reScript.src = `https://widgets.sociablekit.com/google-reviews/widget.js?v=${Date.now()}`;
      reScript.defer = true;
      reScript.onload = () => setIsLoaded(true);
      document.body.appendChild(reScript);

      return () => {
        reScript.remove();
      };
    }
  }, []);

  return (
    <section 
      id="client-reviews" 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#141312] border-t border-[#262421] relative overflow-hidden"
    >
      {/* Subtle ambient luxury backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A880]/15 text-[#C5A880] text-xs uppercase tracking-widest font-semibold mb-4">
            <Star className="w-3.5 h-3.5 fill-[#C5A880]" />
            <span>Live Verified Google Reviews</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F7F4EF] leading-tight">
            Client Reviews
          </h2>

          <p className="text-sm sm:text-base text-[#A89F93] font-light mt-3 max-w-2xl mx-auto leading-relaxed">
            Read real-time verified feedback from our guests across Atlanta and beyond. Powered directly by Google Reviews.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-[#C5A880]">
            <span className="flex items-center gap-1.5 bg-[#1C1A17] border border-[#2E2B27] px-3.5 py-1.5 rounded-full">
              <span className="font-bold text-[#F3EFEA]">4.9 / 5.0</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#C5A880]" />
                ))}
              </div>
              <span className="text-[#8C847A]">(650+ Google Ratings)</span>
            </span>

            <a
              href={SALON_DETAILS.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#F3EFEA] hover:text-[#C5A880] transition-colors bg-[#1C1A17] border border-[#2E2B27] hover:border-[#C5A880]/40 px-3.5 py-1.5 rounded-full"
            >
              <CheckCircle className="w-3.5 h-3.5 text-[#A3D9A5]" />
              <span>Verified Google Business Profile</span>
              <ExternalLink className="w-3 h-3 ml-0.5 text-[#8C847A]" />
            </a>
          </div>
        </div>

        {/* Live Google Reviews SociableKIT Embed Container */}
        <div className="bg-[#181614] border border-[#2B2824] rounded-2xl p-4 sm:p-8 shadow-2xl relative">
          {/* Official SociableKIT Embed Widget Div */}
          <div 
            className="sk-ww-google-reviews min-h-[350px] w-full" 
            data-embed-id="25722849"
          >
            {/* Elegant placeholder / fallback while widget iframe hydrates */}
            {!isLoaded && (
              <div className="flex flex-col items-center justify-center py-16 text-center text-[#8C847A] space-y-3">
                <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
                <p className="text-xs tracking-wider uppercase">Loading live Google Reviews...</p>
              </div>
            )}
          </div>
        </div>

        {/* Call to action below reviews */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#8C847A]">
            Have you visited Junko Hair Studio recently?{' '}
            <a 
              href={SALON_DETAILS.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A880] hover:underline underline-offset-4"
            >
              Share your experience on Google
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
