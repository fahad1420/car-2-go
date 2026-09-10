import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { Button } from '../common/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onExploreFleet?: () => void;
  onBookNow?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onExploreFleet = () => {},
  onBookNow = () => {}
}) => {
  const { t, direction } = useI18n();

  return (
    <section className="relative py-20 sm:py-32 md:py-44 bg-brand-charcoal text-white overflow-hidden">
      {/* Background Soft Lemon Glow Spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-brand-lemon/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center flex flex-col items-center gap-6 sm:gap-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-brand-lemon" />
          <span className="text-[10px] sm:text-[11px] font-bold tracking-label-luxury text-white uppercase">
            11 / BESPOKE PRIVILEGE
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight sm:tracking-tighter-luxury text-white leading-tight sm:leading-headline">
          {t('cta.title')}
        </h2>

        <p className="text-sm sm:text-lg md:text-xl text-zinc-300 font-normal max-w-2xl leading-relaxed">
          {t('cta.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto">
          <Button
            variant="lemon"
            size="lg"
            onClick={onExploreFleet}
            className="w-full sm:w-auto justify-center"
            icon={<ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
          >
            {t('cta.exploreFleet')}
          </Button>
          <Button
            variant="glass"
            size="lg"
            onClick={onBookNow}
            className="w-full sm:w-auto justify-center"
          >
            {t('cta.bookNow')}
          </Button>
        </div>
      </div>
    </section>
  );
};
