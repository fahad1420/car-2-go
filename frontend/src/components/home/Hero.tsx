import React from 'react';
import { HeroScene3D } from '../3d/HeroScene3D';
import { Button } from '../common/Button';
import { useI18n } from '../../i18n/i18nContext';
import { useBooking } from '../../context/BookingContext';
import { ArrowRight, Calendar, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreFleet?: () => void;
  onBookNow?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreFleet = () => {},
  onBookNow = () => {}
}) => {
  const { t, language, direction } = useI18n();
  const { pickupLocation, setPickupLocation, pickupDate, setPickupDate, returnDate, setReturnDate, setStep } = useBooking();

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Go to vehicle select
    onBookNow();
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-brand-charcoal text-white">
      {/* 3D WebGL Background Cinema Canvas */}
      <div className="absolute inset-0 z-0">
        <HeroScene3D />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-3xl flex flex-col gap-6">
          {/* Top Editorial Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 w-fit">
            <span className="w-2 h-2 rounded-full bg-brand-lemon animate-pulse" />
            <span className="text-[11px] md:text-xs font-semibold uppercase tracking-label-luxury text-white/90">
              {t('hero.badge')}
            </span>
          </div>

          {/* Huge Editorial Headline (Manrope 800/900, tight tracking, crisp soft lemon accent) */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter-luxury uppercase leading-hero">
            <span className="block text-white">{t('hero.titleLine1')}</span>
            <span className="block text-brand-lemon">
              {t('hero.titleLine2')}
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-xl font-normal leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="lemon"
              size="lg"
              onClick={onExploreFleet}
              icon={<ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
            >
              {t('hero.exploreFleet')}
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={onBookNow}
            >
              {t('hero.bookNow')}
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Concierge Booking Ribbon Widget */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full mt-8">
        <form
          onSubmit={handleQuickBook}
          className="glass-panel-dark rounded-3xl p-4 md:p-6 border border-white/15 shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
        >
          {/* Location Select */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
            <MapPin className="w-5 h-5 text-brand-lemon shrink-0" />
            <div className="flex flex-col text-start overflow-hidden">
              <span className="text-[10px] font-semibold uppercase tracking-label-luxury text-zinc-400">
                {t('booking.pickupLoc')}
              </span>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                aria-label={t('booking.pickupLoc')}
                className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer truncate"
              >
                <option value="Riyadh - King Khalid International Airport (Terminal 1-5 VIP)" className="bg-brand-charcoal text-white">
                  Riyadh - King Khalid Airport VIP
                </option>
                <option value="Riyadh - Al Olaya Prestige Showroom" className="bg-brand-charcoal text-white">
                  Riyadh - Al Olaya Prestige
                </option>
                <option value="Jeddah - North Corniche Waterfront Hub" className="bg-brand-charcoal text-white">
                  Jeddah - Corniche Waterfront
                </option>
                <option value="AlUla - Banyan Tree & Desert Resort Pavilion" className="bg-brand-charcoal text-white">
                  AlUla - Desert Resort Pavilion
                </option>
                <option value="Dubai - DIFC Gate Precinct Hub" className="bg-brand-charcoal text-white">
                  Dubai - DIFC Gate Precinct
                </option>
              </select>
            </div>
          </div>

          {/* Pickup Date */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
            <Calendar className="w-5 h-5 text-brand-lemon shrink-0" />
            <div className="flex flex-col text-start">
              <span className="text-[10px] font-semibold uppercase tracking-label-luxury text-zinc-400">
                {language === 'ar' ? 'تاريخ الاستلام' : 'Pickup Date'}
              </span>
              <input
                type="datetime-local"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                aria-label={language === 'ar' ? 'تاريخ الاستلام' : 'Pickup Date'}
                className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Return Date */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
            <Calendar className="w-5 h-5 text-brand-lemon shrink-0" />
            <div className="flex flex-col text-start">
              <span className="text-[10px] font-semibold uppercase tracking-label-luxury text-zinc-400">
                {language === 'ar' ? 'تاريخ الإرجاع' : 'Return Date'}
              </span>
              <input
                type="datetime-local"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                aria-label={language === 'ar' ? 'تاريخ الإرجاع' : 'Return Date'}
                className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Search Button */}
          <Button
            type="submit"
            variant="lemon"
            size="lg"
            fullWidth
            icon={<ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
          >
            {t('fleet.reserve')}
          </Button>
        </form>

        {/* Live Trust Metrics Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-6 text-zinc-400 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-lemon" />
            <span className="text-white font-bold">{t('hero.stat1Value')}</span>
            <span className="font-normal">{t('hero.stat1Label')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-lemon" />
            <span className="text-white font-bold">{t('hero.stat2Value')}</span>
            <span className="font-normal">{t('hero.stat2Label')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-lemon" />
            <span className="text-white font-bold">{t('hero.stat3Value')} ★</span>
            <span className="font-normal">{t('hero.stat3Label')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
