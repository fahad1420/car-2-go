import React from 'react';
import { Hero } from '../components/home/Hero';
import { BrandStatement } from '../components/home/BrandStatement';
import { CinematicStory } from '../components/home/CinematicStory';
import { FleetPreview } from '../components/home/FleetPreview';
import { ServicesSection } from '../components/home/ServicesSection';
import { FeaturedVehicle } from '../components/home/FeaturedVehicle';
import { WhyUs } from '../components/home/WhyUs';
import { Testimonials } from '../components/home/Testimonials';
import { NetworkMap } from '../components/home/NetworkMap';
import { FAQSection } from '../components/home/FAQSection';
import { FinalCTA } from '../components/home/FinalCTA';
import { Vehicle } from '../types';
import { useBooking } from '../context/BookingContext';

interface HomePageProps {
  onNavigate?: (page: string) => void;
  onSelectVehicle?: (vehicle: Vehicle) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate = () => {},
  onSelectVehicle = () => {}
}) => {
  const { startBookingWithVehicle } = useBooking();

  const handleSelectVehicle = (vehicle: Vehicle) => {
    startBookingWithVehicle(vehicle);
    onNavigate('booking');
  };

  const handleViewDetails = (vehicle: Vehicle) => {
    onSelectVehicle(vehicle);
    onNavigate('vehicle-detail');
  };

  return (
    <main className="w-full flex flex-col">
      {/* 01: Cinematic 3D Hero */}
      <Hero
        onExploreFleet={() => onNavigate('fleet')}
        onBookNow={() => onNavigate('booking')}
      />

      {/* 02: Massive Brand Statement (Light Editorial) */}
      <BrandStatement />

      {/* 03: Cinematic Automotive Story (Dark Cinematic 3D) */}
      <CinematicStory />

      {/* 04: Showroom Fleet Showcase (Light UI) */}
      <FleetPreview
        onSelectVehicle={handleSelectVehicle}
        onViewDetails={handleViewDetails}
        onViewAllFleet={() => onNavigate('fleet')}
      />

      {/* 05: Premium VIP Services (Editorial Alternating) */}
      <ServicesSection
        onInquireService={() => onNavigate('contact')}
      />

      {/* 06: Featured Flagship Vehicle Launch (Dark Cinematic) */}
      <FeaturedVehicle
        onReserveFlagship={() => onNavigate('booking')}
      />

      {/* 07: Why CAR 2 GO (Light UI Pillars) */}
      <WhyUs />

      {/* 08: VIP Testimonials & Reviews */}
      <Testimonials />

      {/* 09: Saudi & GCC Network Hubs */}
      <NetworkMap />

      {/* 10: FAQ Accordion */}
      <FAQSection />

      {/* 11: Dark Cinematic Final CTA */}
      <FinalCTA
        onExploreFleet={() => onNavigate('fleet')}
        onBookNow={() => onNavigate('booking')}
      />
    </main>
  );
};

