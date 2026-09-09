import React from 'react';
import { useBooking } from '../context/BookingContext';
import { BookingStepper } from '../components/booking/BookingStepper';
import { StepLocationDates } from '../components/booking/StepLocationDates';
import { StepSelectVehicle } from '../components/booking/StepSelectVehicle';
import { StepAddonsPricing } from '../components/booking/StepAddonsPricing';
import { StepCustomerConfirm } from '../components/booking/StepCustomerConfirm';
import { useI18n } from '../i18n/i18nContext';

interface BookingPageProps {
  onNavigate?: (page: string) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  onNavigate = () => {}
}) => {
  const { step, setStep } = useBooking();
  const { language } = useI18n();
  const isArabic = language === 'ar';

  return (
    <div className="pt-32 pb-24 bg-brand-light min-h-screen text-brand-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 flex flex-col gap-2">
          <span className="text-xs font-mono uppercase tracking-wide-luxury text-zinc-400">
            DIGITAL CONCIERGE WORKFLOW
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-brand-charcoal">
            {isArabic ? 'حجز السيارات الفارهة' : 'Bespoke Automotive Reservation'}
          </h1>
        </div>

        {/* 4-Step Stepper Navigation */}
        <BookingStepper currentStep={step} onStepClick={setStep} />

        {/* Step Views */}
        <div className="mt-6">
          {step === 1 && <StepLocationDates />}
          {step === 2 && <StepSelectVehicle />}
          {step === 3 && <StepAddonsPricing />}
          {step === 4 && <StepCustomerConfirm onBookingComplete={() => {}} />}
        </div>
      </div>
    </div>
  );
};

