import React from 'react';
import { Vehicle } from '../../types';
import { useI18n } from '../../i18n/i18nContext';
import { Button } from '../common/Button';
import { Gauge, Zap, Users, ArrowRight, ShieldCheck } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect?: (vehicle: Vehicle) => void;
  onViewDetails?: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onSelect = () => {},
  onViewDetails = () => {}
}) => {
  const { t, language, direction } = useI18n();

  const isArabic = language === 'ar';
  const tagline = (isArabic && vehicle.taglineAr) ? vehicle.taglineAr : vehicle.tagline;

  return (
    <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl active:scale-[0.99] transition-all duration-300 flex flex-col justify-between">
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-brand-charcoal">
            {vehicle.category}
          </span>
          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider bg-brand-charcoal/90 text-brand-lemon border border-brand-lemon/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lemon animate-pulse" />
            {t('fleet.available')}
          </span>
        </div>

        {/* Brand & Model Overlay */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-300 uppercase block mb-0.5">
            {vehicle.brand} • {vehicle.year}
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase tracking-tight text-white group-hover:text-brand-lemon transition-colors leading-tight">
            {vehicle.name}
          </h3>
        </div>
      </div>

      {/* Card Body & Technical Specs */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between gap-4 sm:gap-6">
        {/* Short Tagline */}
        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed font-normal">
          {tagline}
        </p>

        {/* 3 Key Metrics */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-2.5 sm:py-3 border-y border-zinc-100 text-center">
          <div className="flex flex-col items-center">
            <Gauge className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 mb-1" />
            <span className="text-[11px] sm:text-xs font-bold text-brand-charcoal">{vehicle.acceleration}</span>
            <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase font-medium">{t('fleet.acceleration')}</span>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 mb-1" />
            <span className="text-[11px] sm:text-xs font-bold text-brand-charcoal">{vehicle.horsepower}</span>
            <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase font-medium">{t('fleet.horsepower')}</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 mb-1" />
            <span className="text-[11px] sm:text-xs font-bold text-brand-charcoal">{vehicle.seats}</span>
            <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase font-medium">{t('fleet.seats')}</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 pt-1 sm:pt-2">
          <div className="flex flex-col text-start">
            <span className="text-[9px] sm:text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Daily Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-display font-extrabold text-brand-charcoal">
                {vehicle.pricePerDay.toLocaleString()}
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-500 font-semibold">
                {vehicle.currency} {t('fleet.perDay')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onViewDetails(vehicle)}
              className="p-2.5 sm:p-3 rounded-full border border-zinc-200 hover:border-brand-charcoal hover:bg-zinc-50 text-zinc-700 transition-colors active:scale-90"
              title={t('fleet.details')}
              aria-label="View vehicle details"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
            <Button
              variant="lemon"
              size="sm"
              onClick={() => onSelect(vehicle)}
              icon={<ArrowRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
            >
              {t('fleet.reserve')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
