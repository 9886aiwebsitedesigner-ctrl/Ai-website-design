/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandHeritage } from './components/BrandHeritage';
import { ServiceMenu } from './components/ServiceMenu';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { JapaneseHeadSpaSpotlight } from './components/JapaneseHeadSpaSpotlight';
import { StylistTeam } from './components/StylistTeam';
import { LookbookSection } from './components/LookbookSection';
import { HairConsultationAdvisor } from './components/HairConsultationAdvisor';
import { InteractiveBookingModal } from './components/InteractiveBookingModal';
import { TestimonialsAndAwards } from './components/TestimonialsAndAwards';
import { StudioLocationFooter } from './components/StudioLocationFooter';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [selectedStylistId, setSelectedStylistId] = useState<string | undefined>(undefined);
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  const handleOpenBooking = (serviceId?: string, stylistId?: string) => {
    setSelectedServiceId(serviceId);
    setSelectedStylistId(stylistId);
    setBookingModalOpen(true);
  };

  const handleOpenQuiz = () => {
    setQuizModalOpen(true);
  };

  const handleQuizRecommendation = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setBookingModalOpen(true);
  };

  const handleBookFromTransformation = (serviceName: string) => {
    if (serviceName.toLowerCase().includes('perm')) {
      setSelectedServiceId('digital-perm');
    } else {
      setSelectedServiceId('jtr-full');
    }
    setBookingModalOpen(true);
  };

  const handleBookFromLookbook = (lookTitle: string) => {
    if (lookTitle.toLowerCase().includes('perm') || lookTitle.toLowerCase().includes('wave')) {
      setSelectedServiceId('digital-perm');
    } else if (lookTitle.toLowerCase().includes('balayage') || lookTitle.toLowerCase().includes('color')) {
      setSelectedServiceId('dimensional-balayage');
    } else if (lookTitle.toLowerCase().includes('bob') || lookTitle.toLowerCase().includes('layer') || lookTitle.toLowerCase().includes('cut')) {
      setSelectedServiceId('master-cut-women');
    } else if (lookTitle.toLowerCase().includes('spa')) {
      setSelectedServiceId('japanese-head-spa');
    } else {
      setSelectedServiceId('jtr-full');
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#F3EFEA] flex flex-col selection:bg-[#C5A880] selection:text-[#121110]">
      {/* Navigation */}
      <Navbar 
        onOpenBooking={(serviceId, stylistId) => handleOpenBooking(serviceId, stylistId)}
        onOpenConsultationQuiz={handleOpenQuiz}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection 
          onOpenBooking={() => handleOpenBooking()}
          onOpenQuiz={handleOpenQuiz}
        />

        {/* Brand Heritage & Japanese Science */}
        <BrandHeritage />

        {/* Curated Service Menu & Direct Booking */}
        <ServiceMenu 
          onSelectServiceForBooking={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* Interactive Before & After Transformation Slider */}
        <BeforeAfterGallery 
          onBookTransformation={handleBookFromTransformation}
        />

        {/* Japanese Head Spa Spotlight */}
        <JapaneseHeadSpaSpotlight 
          onBookHeadSpa={() => handleOpenBooking('japanese-head-spa')}
        />

        {/* Editorial Lookbook Catalog */}
        <LookbookSection 
          onBookFromLookbook={handleBookFromLookbook}
        />

        {/* Master Stylists Team */}
        <StylistTeam 
          onSelectStylistForBooking={(stylistId) => handleOpenBooking(undefined, stylistId)}
        />

        {/* Awards, Testimonials & FAQs */}
        <TestimonialsAndAwards />
      </main>

      {/* Location, Hours & Footer */}
      <StudioLocationFooter 
        onOpenBooking={() => handleOpenBooking()}
        onOpenQuiz={handleOpenQuiz}
      />

      {/* Modals */}
      <InteractiveBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preSelectedServiceId={selectedServiceId}
        preSelectedStylistId={selectedStylistId}
      />

      <HairConsultationAdvisor
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        onSelectRecommendedService={handleQuizRecommendation}
      />
    </div>
  );
}

