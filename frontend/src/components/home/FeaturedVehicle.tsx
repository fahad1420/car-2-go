import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { Button } from '../common/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedVehicleProps {
  onReserveFlagship?: () => void;
}

export const FeaturedVehicle: React.FC<FeaturedVehicleProps> = ({
  onReserveFlagship = () => {}
}) => {
  const { t, language, direction } = useI18n();

  return (
    <section className="relative py-28 md:py-36 bg-brand-charcoal text-white overflow-hidden">
      {/* Background Soft Lemon Ambient Radial */}
      <div className="absolute top-1/3 end-0 w-[600px] h-[600px] bg-brand-lemon/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Flagship Launch Editorial Details */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-lemon/15 border border-brand-lemon/30 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-brand-lemon" />
              <span className="text-[11px] font-bold tracking-label-luxury text-brand-lemon uppercase">
                {t('featured.tag')}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tighter-luxury text-white leading-none">
              ROLLS-ROYCE SPECTRE
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
              {language === 'ar'
                ? 'الكوبيه الفاخرة الكهربائية الأرقى في العالم. 584 حصاناً من القوة الصامتة المعزولة بسقف النجوم المضاء، وتوصيل خاص إلى مدرجات الطيران الخاص في الرياض وجدة والعلا.'
                : 'The world’s first ultra-luxury all-electric super coupé. 584 horsepower of whisper-quiet majesty, bespoke starlight headliner, and white-glove runway hand-off.'}
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10">
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Acceleration</span>
                <span className="text-xl font-extrabold text-white">4.5s</span>
                <span className="text-[10px] text-brand-lemon font-medium">0-100 km/h</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Powertrain</span>
                <span className="text-xl font-extrabold text-white">584 HP</span>
                <span className="text-[10px] text-brand-lemon font-medium">Dual-Motor Electric</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Daily Privilege</span>
                <span className="text-xl font-extrabold text-white">4,800 SAR</span>
                <span className="text-[10px] text-brand-lemon font-medium">All-Inclusive VAT</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Button
                variant="lemon"
                size="lg"
                onClick={onReserveFlagship}
                icon={<ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
              >
                {t('featured.reserveNow')}
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Photography Layer */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-zinc-900 group">
              <img
                src="https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1400&q=85"
                alt="Rolls-Royce Spectre Launch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent opacity-80" />

              {/* Bottom Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
                  VIN #C2G-RR-9025
                </span>
                <span className="text-xs text-brand-lemon uppercase font-bold tracking-wider">
                  Guaranteed Model
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
