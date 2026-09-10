import React from 'react';
import { useI18n } from '../../i18n/i18nContext';

export const BrandStatement: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="relative py-20 sm:py-28 md:py-36 bg-brand-pure text-brand-charcoal overflow-hidden border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Subtle Index */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-label-luxury text-zinc-400">
              02 / {t('statement.tag')}
            </span>
            <div className="w-10 sm:w-12 h-[2px] bg-brand-lemon mt-1 sm:mt-2" />
          </div>

          {/* Right Column: Massive Editorial Typography & Philosophy */}
          <div className="lg:col-span-9 flex flex-col gap-6 md:gap-8">
            <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight sm:tracking-tight-luxury leading-snug sm:leading-editorial text-brand-charcoal">
              {t('statement.heading')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-2 md:pt-4">
              <p className="text-sm sm:text-base md:text-lg text-zinc-600 font-normal leading-relaxed">
                {t('statement.description')}
              </p>
              <div className="flex flex-col gap-2.5 sm:gap-3 border-s-2 border-brand-lemon ps-4 sm:ps-6">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-label-luxury text-zinc-400">
                  PRECISION BENCHMARK
                </span>
                <p className="text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed">
                  Every reservation includes individual vehicle provenance verification, private jet coordination, and dedicated 24-hour concierge oversight.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
