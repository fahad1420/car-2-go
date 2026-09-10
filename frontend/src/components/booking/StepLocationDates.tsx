import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { useI18n } from '../../i18n/i18nContext';
import { Button } from '../common/Button';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

const HUBS = [
  'Riyadh - King Khalid International Airport (Terminal 1-5 VIP)',
  'Riyadh - Al Olaya Prestige Showroom',
  'Jeddah - North Corniche Waterfront Hub',
  'AlUla - Banyan Tree & Desert Resort Pavilion',
  'Eastern Province - Al Khobar Corniche Concierge',
  'Dubai - DIFC Gate Precinct Hub',
  'Doha - The Pearl Island Concierge'
];

export const StepLocationDates: React.FC = () => {
  const {
    pickupLocation,
    setPickupLocation,
    returnLocation,
    setReturnLocation,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    sameLocation,
    setSameLocation,
    days,
    setStep
  } = useBooking();

  const { t, language, direction } = useI18n();
  const isArabic = language === 'ar';

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <form onSubmit={handleNext} className="max-w-3xl mx-auto p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-zinc-200/80 shadow-lg flex flex-col gap-6 sm:gap-8">
      {/* Title */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-label-luxury text-zinc-400">
          STEP 01 • CONCIERGE DISPATCH
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight sm:tracking-tight-luxury text-brand-charcoal">
          {isArabic ? 'حدد موعد ومواقع الاستلام والتسليم' : 'Select Schedule & VIP Hubs'}
        </h2>
      </div>

      {/* Same vs Different Location Toggle */}
      <div className="flex items-center gap-2 sm:gap-4 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-zinc-100 w-full sm:w-fit">
        <button
          type="button"
          onClick={() => setSameLocation(true)}
          className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs font-semibold uppercase tracking-wide transition-all ${
            sameLocation ? 'bg-white text-brand-charcoal shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          {t('booking.sameReturn')}
        </button>
        <button
          type="button"
          onClick={() => setSameLocation(false)}
          className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs font-semibold uppercase tracking-wide transition-all ${
            !sameLocation ? 'bg-white text-brand-charcoal shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          {t('booking.diffReturn')}
        </button>
      </div>

      {/* Location Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Pickup Location */}
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label className="text-xs uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 font-bold">
            <MapPin className="w-4 h-4 text-brand-charcoal" />
            {t('booking.pickupLoc')}
          </label>
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal cursor-pointer"
          >
            {HUBS.map((hub) => (
              <option key={hub} value={hub}>
                {hub}
              </option>
            ))}
          </select>
        </div>

        {/* Return Location */}
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label className="text-xs uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 font-bold">
            <MapPin className="w-4 h-4 text-brand-charcoal" />
            {t('booking.returnLoc')}
          </label>
          <select
            value={sameLocation ? pickupLocation : returnLocation}
            disabled={sameLocation}
            onChange={(e) => setReturnLocation(e.target.value)}
            className={`w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal cursor-pointer ${
              sameLocation ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {HUBS.map((hub) => (
              <option key={hub} value={hub}>
                {hub}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Pickup Date & Time */}
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label className="text-xs uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 font-bold">
            <Calendar className="w-4 h-4 text-brand-charcoal" />
            {t('booking.pickupDateTime')}
          </label>
          <input
            type="datetime-local"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
            className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-charcoal cursor-pointer"
          />
        </div>

        {/* Return Date & Time */}
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label className="text-xs uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 font-bold">
            <Calendar className="w-4 h-4 text-brand-charcoal" />
            {t('booking.returnDateTime')}
          </label>
          <input
            type="datetime-local"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
            className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-charcoal cursor-pointer"
          />
        </div>
      </div>

      {/* Rental Duration Callout */}
      <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-brand-charcoal" />
          <span className="text-[11px] sm:text-xs uppercase text-zinc-600 font-bold">
            {t('booking.duration')}:
          </span>
        </div>
        <span className="text-sm sm:text-base font-extrabold text-brand-charcoal px-3 py-1 rounded-full bg-brand-lemon">
          {days} {t('booking.days')}
        </span>
      </div>

      {/* Next Step Action */}
      <div className="flex justify-end pt-2 sm:pt-4">
        <Button
          type="submit"
          variant="lemon"
          size="lg"
          className="w-full sm:w-auto justify-center"
          icon={<ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
        >
          {t('booking.continue')}
        </Button>
      </div>
    </form>
  );
};
