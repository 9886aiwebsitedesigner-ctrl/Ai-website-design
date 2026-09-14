import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ArrowRight, RotateCcw, X, ShieldAlert, Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/salonData';

interface ConsultationAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedService: (serviceId: string) => void;
}

export const HairConsultationAdvisor: React.FC<ConsultationAdvisorProps> = ({
  isOpen,
  onClose,
  onSelectRecommendedService
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [result, setResult] = useState<{
    serviceId: string;
    title: string;
    subtitle: string;
    reason: string;
    recommendedStylist: string;
    prepTip: string;
  } | null>(null);

  const handleSelectOption = (trait: string) => {
    const updated = [...selectedTraits, trait];
    setSelectedTraits(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(updated);
    }
  };

  const calculateResult = (traits: string[]) => {
    // Count occurrences or priority
    const hasJtr = traits.includes('jtr');
    const hasPerm = traits.includes('digital-perm');
    const hasSpa = traits.includes('head-spa');
    const hasKeratin = traits.includes('keratin');
    const hasBalayage = traits.includes('balayage');

    if (hasJtr && !traits.includes('keratin')) {
      setResult({
        serviceId: 'jtr-full',
        title: 'Japanese Thermal Reconditioning (JTR / YUKO)',
        subtitle: 'Permanent Silk Glass Transformation',
        reason: 'Your hair profile and resistance to humidity make you an optimal candidate for Japanese bond restructuring. This will grant you permanent pin-straight, mirror-like gloss with zero daily flat-ironing required.',
        recommendedStylist: 'Kai (Master Texture & JTR Educator)',
        prepTip: 'Arrive with clean, product-free hair. Avoid chemical bleaching in the 2 weeks prior.'
      });
    } else if (hasPerm) {
      setResult({
        serviceId: 'digital-perm',
        title: 'Japanese Digital Ceramic Perm (Air Wave)',
        subtitle: 'Effortless Bouncy Mermaid Waves',
        reason: 'You desire natural body and wave memory that springs into romantic curls when air-dried. Japanese computerized ceramic rods deliver bouncy volume without damaging dryness.',
        recommendedStylist: 'Kai or Soung Youn',
        prepTip: 'We recommend adding our Milbon 5-Step Treatment for maximum elasticity.'
      });
    } else if (hasSpa) {
      setResult({
        serviceId: 'japanese-head-spa',
        title: 'Japanese Scalp & Head Spa Ritual',
        subtitle: 'Holistic Scalp Detox & Deep Stress Relief',
        reason: 'Your scalp ecosystem and hair cuticles need nutrient replenishment. The warm waterfall hydro-stream and shiatsu acupressure massage will restore vitality and weightless shine.',
        recommendedStylist: 'Elena (Certified Head Spa Practitioner)',
        prepTip: 'Wear comfortable clothing to fully relax during the 60-minute cranial treatment.'
      });
    } else if (hasKeratin) {
      setResult({
        serviceId: 'keratin-smoothing',
        title: 'Keratin Complex Smoothing Therapy',
        subtitle: 'Anti-Frizz Protection Preserving Natural Wave',
        reason: 'Because you want manageable humidity defense without permanently losing your curl foundation, Keratin Complex coats each strand to eliminate 95% of frizz for 4–5 months.',
        recommendedStylist: 'Ahmed or Elena',
        prepTip: 'Must wait 48 hours post-treatment before washing or tying hair.'
      });
    } else {
      setResult({
        serviceId: 'dimensional-balayage',
        title: 'Bespoke Dimensional Balayage & Olaplex Gloss',
        subtitle: 'Luminous Hand-Painted Color Artistry',
        reason: 'Customized anti-brass toning and freehand micro-lightening designed to complement your undertones with seamless, soft regrowth.',
        recommendedStylist: 'Soung Youn or Kai',
        prepTip: 'Bring reference photos of tones you admire during your consultation.'
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedTraits([]);
    setResult(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-[#171513] border border-[#3E3A34] rounded-lg max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8C847A] hover:text-[#F3EFEA] p-2 text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Diagnostic Concierge</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F3EFEA] font-light mt-1">
            Find Your Ideal Japanese Hair Ritual
          </h2>
        </div>

        {/* Quiz Step or Result */}
        {!result ? (
          <div>
            {/* Progress Bar */}
            <div className="w-full bg-[#25221F] h-1 rounded-full mb-6 overflow-hidden">
              <div 
                className="bg-[#C5A880] h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-wider text-[#8C847A] font-medium">
                Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F3EFEA] font-normal mt-1">
                {QUIZ_QUESTIONS[currentStep].question}
              </h3>
              <p className="text-xs text-[#9E9589] font-light mt-1">
                {QUIZ_QUESTIONS[currentStep].description}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentStep].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt.trait)}
                  className="w-full p-4 text-left rounded-sm bg-[#1E1C1A] hover:bg-[#25221F] border border-[#2E2B27] hover:border-[#C5A880] transition-all duration-200 group flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-[#F3EFEA] group-hover:text-[#C5A880] transition-colors">
                      {opt.label}
                    </h4>
                    <p className="text-[11px] text-[#8C847A] font-light mt-0.5">
                      {opt.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C847A] group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="mt-6 text-xs text-[#8C847A] hover:text-[#F3EFEA] flex items-center gap-1"
              >
                ← Previous Question
              </button>
            )}
          </div>
        ) : (
          /* Result View */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-5 rounded-sm bg-[#1F1C18] border border-[#C5A880]/40 gold-glow">
              <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Diagnostic Match</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EFEA] font-light">
                {result.title}
              </h3>
              <span className="text-xs text-[#C5A880] font-medium block mt-0.5">
                {result.subtitle}
              </span>

              <p className="text-xs sm:text-sm text-[#BDB2A6] font-light leading-relaxed mt-4">
                {result.reason}
              </p>

              <div className="mt-4 pt-3 border-t border-[#332F2A] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C847A] block">
                    Recommended Lead Artisan:
                  </span>
                  <span className="text-[#EAE4DC] font-medium">{result.recommendedStylist}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C847A] block">
                    Preparation Tip:
                  </span>
                  <span className="text-[#EAE4DC] font-light">{result.prepTip}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const sId = result.serviceId;
                  onClose();
                  onSelectRecommendedService(sId);
                }}
                className="flex-1 py-3.5 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors text-center cursor-pointer shadow-lg"
              >
                Reserve Your Diagnostic Session
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-3.5 border border-[#3E3A34] hover:border-[#C5A880] text-xs uppercase tracking-wider text-[#A89F93] hover:text-[#F3EFEA] rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};
