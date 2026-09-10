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

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  const baseUrl = (import.meta as any).env?.BASE_URL || './';
  const videoPath = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}videos/hero_cinematic.mp4`;
  const posterUrl = 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=85';

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce HTML5 & WebKit specific mobile autoplay constraints
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');

    const attemptPlay = () => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoLoaded(true);
          })
          .catch((error) => {
            // Autoplay deferred by browser (e.g. iOS Low Power Mode / Battery Saver)
            console.warn('[CAR 2 GO] Video autoplay policy handled:', error);
            
            // Seamlessly resume on first ambient touch/scroll without breaking UI
            const handleResume = () => {
              if (video) {
                video.muted = true;
                video.play().then(() => setVideoLoaded(true)).catch(() => {});
              }
              window.removeEventListener('touchstart', handleResume);
              window.removeEventListener('scroll', handleResume);
              window.removeEventListener('click', handleResume);
            };

            window.addEventListener('touchstart', handleResume, { passive: true, once: true });
            window.addEventListener('scroll', handleResume, { passive: true, once: true });
            window.addEventListener('click', handleResume, { passive: true, once: true });
          });
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener('loadedmetadata', attemptPlay, { once: true });
      video.addEventListener('loadeddata', attemptPlay, { once: true });
      video.addEventListener('canplay', attemptPlay, { once: true });
    }

    attemptPlay();

    return () => {
      video.removeEventListener('loadedmetadata', attemptPlay);
      video.removeEventListener('loadeddata', attemptPlay);
      video.removeEventListener('canplay', attemptPlay);
    };
  }, [videoPath]);

  return (
    <section className="relative w-full min-h-[92vh] md:min-h-screen flex flex-col justify-between pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-28 lg:pb-12 overflow-hidden bg-brand-charcoal text-white">
      {/* Full-Screen Cinematic Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-brand-charcoal">
        {/* Poster Fallback Layer (Ensures zero blank frames while video initializes) */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundImage: `url(${posterUrl})` }}
        />

        <video
          ref={videoRef}
          src={videoPath}
          poster={posterUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          // @ts-ignore
          webkit-playsinline="true"
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-[0.72] sm:brightness-[0.78] contrast-[1.1] saturate-[1.08] transition-opacity duration-1000 transform-gpu"
        >
          <source src={videoPath} type="video/mp4" />
          <source src="./videos/hero_cinematic.mp4" type="video/mp4" />
          <source src="/videos/hero_cinematic.mp4" type="video/mp4" />
        </video>

        {/* Multi-Layer Luxury Editorial Overlays for pristine typography legibility */}
        {/* 1. Horizontal Directional Readability Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            direction === 'rtl'
              ? 'from-transparent via-brand-charcoal/70 to-brand-charcoal/95'
              : 'from-brand-charcoal/95 via-brand-charcoal/70 to-transparent'
          }`}
        />

        {/* 2. Vertical Ambient Vignette (Navbar & Bottom Section Blend) */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/85 via-transparent to-brand-charcoal/95" />

        {/* 3. Luxury Ambient Sheen */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full flex-1 flex flex-col justify-center my-auto pt-4 md:pt-0">
        <div className="max-w-3xl flex flex-col gap-4 sm:gap-6">
          {/* Top Editorial Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 w-fit">
            <span className="w-2 h-2 rounded-full bg-brand-lemon animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-label-luxury text-white/90">
              {t('hero.badge')}
            </span>
          </div>

          {/* Fluid Luxury Headline (Scales smoothly from 320px up to 4K displays) */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight sm:tracking-tighter-luxury uppercase leading-[1.08] sm:leading-hero">
            <span className="block text-white">{t('hero.titleLine1')}</span>
            <span className="block text-brand-lemon drop-shadow-sm">
              {t('hero.titleLine2')}
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-sm sm:text-base md:text-xl text-zinc-300 max-w-xl font-normal leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Primary Action Buttons (Stack cleanly on mobile, row on tablet/desktop) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button
              variant="lemon"
              size="lg"
              onClick={onExploreFleet}
              className="w-full sm:w-auto justify-center"
              icon={<ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
            >
              {t('hero.exploreFleet')}
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={onBookNow}
              className="w-full sm:w-auto justify-center"
            >
              {t('hero.bookNow')}
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Concierge Booking Ribbon Widget */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full mt-6 md:mt-8">
        <form
          onSubmit={handleQuickBook}
          className="glass-panel-dark rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-white/15 shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 items-center"
        >
          {/* Location Select */}
          <div className="flex items-center gap-3 p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 min-h-[52px]">
            <MapPin className="w-5 h-5 text-brand-lemon shrink-0" />
            <div className="flex flex-col text-start overflow-hidden flex-1">
              <span className="text-[10px] font-semibold uppercase tracking-label-luxury text-zinc-400">
                {t('booking.pickupLoc')}
              </span>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                aria-label={t('booking.pickupLoc')}
                className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer truncate w-full"
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
          <div className="flex items-center gap-3 p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 min-h-[52px]">
            <Calendar className="w-5 h-5 text-brand-lemon shrink-0" />
            <div className="flex flex-col text-start flex-1">
              <span className="text-[10px] font-semibold uppercase tracking-label-luxury text-zinc-400">
                {language === 'ar' ? 'تاريخ الاستلام' : 'Pickup Date'}
              </span>
              <input
                type="datetime-local"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                aria-label={language === 'ar' ? 'تاريخ الاستلام' : 'Pickup Date'}
                className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer w-full"
              />
            </div>
          </div>

          {/* Return Date */}
          <div className="flex items-center gap-3 p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 min-h-[52px]">
            <Calendar className="w-5 h-5 text-brand-lemon shrink-0" />
            <div className="flex flex-col text-start flex-1">
              <span className="text-[10px] font-semibold uppercase tracking-label-luxury text-zinc-400">
                {language === 'ar' ? 'تاريخ الإرجاع' : 'Return Date'}
              </span>
              <input
                type="datetime-local"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                aria-label={language === 'ar' ? 'تاريخ الإرجاع' : 'Return Date'}
                className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer w-full"
              />
            </div>
          </div>

          {/* Submit Search Button */}
          <Button
            type="submit"
            variant="lemon"
            size="lg"
            fullWidth
            className="min-h-[52px] justify-center"
            icon={<ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
          >
            {t('fleet.reserve')}
          </Button>
        </form>

        {/* Live Trust Metrics Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-6 pt-4 sm:pt-6 text-zinc-400 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-lemon shrink-0" />
            <span className="text-white font-bold">{t('hero.stat1Value')}</span>
            <span className="font-normal">{t('hero.stat1Label')}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-lemon shrink-0" />
            <span className="text-white font-bold">{t('hero.stat2Value')}</span>
            <span className="font-normal">{t('hero.stat2Label')}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-lemon shrink-0" />
            <span className="text-white font-bold">{t('hero.stat3Value')} ★</span>
            <span className="font-normal">{t('hero.stat3Label')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
