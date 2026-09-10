import React, { useState } from 'react';
import { Vehicle } from '../types';
import { useI18n } from '../i18n/i18nContext';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/common/Button';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Star,
  MapPin
} from 'lucide-react';

interface VehicleDetailPageProps {
  vehicle: Vehicle | null;
  onNavigate?: (page: string) => void;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({
  vehicle,
  onNavigate = () => {}
}) => {
  const { t, language, direction } = useI18n();
  const { startBookingWithVehicle } = useBooking();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isArabic = language === 'ar';

  if (!vehicle) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-bold">No vehicle selected</h2>
        <Button variant="charcoal" onClick={() => onNavigate('fleet')} className="mt-4">
          Back to Showroom
        </Button>
      </div>
    );
  }

  const features = (isArabic && vehicle.featuresAr) ? vehicle.featuresAr : vehicle.features;
  const tagline = (isArabic && vehicle.taglineAr) ? vehicle.taglineAr : vehicle.tagline;

  const handleBookThisCar = () => {
    startBookingWithVehicle(vehicle);
    onNavigate('booking');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-brand-light min-h-screen text-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => onNavigate('fleet')}
            className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-zinc-500 hover:text-brand-charcoal transition-colors py-2"
          >
            <ArrowLeft className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
            <span>{isArabic ? 'العودة لأسطول النخبة' : 'Back to Fleet Collection'}</span>
          </button>
        </div>

        {/* Hero Gallery & Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Main Visual Carousel (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-200">
              <img
                src={vehicle.images[activeImageIndex] || vehicle.images[0]}
                alt={vehicle.name}
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85';
                }}
              />
              <div className="absolute top-4 start-4">
                <span className="px-3.5 py-1 rounded-full text-xs uppercase font-bold bg-brand-charcoal text-brand-lemon border border-brand-lemon/30">
                  {vehicle.category}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {vehicle.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-brand-charcoal ring-2 ring-brand-lemon'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Header & Booking Widget (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-zinc-200 shadow-xl flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-xs text-zinc-400 uppercase font-semibold tracking-wider">
                  {vehicle.brand} • {vehicle.year}
                </span>
                <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight-luxury text-brand-charcoal">
                  {vehicle.name}
                </h1>
                <p className="text-xs text-zinc-500 mt-1 font-normal leading-relaxed">
                  {tagline}
                </p>
              </div>

              {/* Price Callout */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-baseline justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Daily Privilege Rate</span>
                  <span className="text-xs font-semibold text-emerald-700">Includes 15% VAT & Full Waiver</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-display font-black text-brand-charcoal">
                    {vehicle.pricePerDay.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">SAR / day</span>
                </div>
              </div>

              {/* Location Availability */}
              <div className="flex items-start gap-2.5 text-xs text-zinc-600 font-medium">
                <MapPin className="w-4 h-4 text-brand-charcoal shrink-0 mt-0.5" />
                <span>{vehicle.location}</span>
              </div>
            </div>

            {/* Reserve CTA */}
            <div className="flex flex-col gap-3">
              <Button
                variant="lemon"
                size="lg"
                fullWidth
                onClick={handleBookThisCar}
                icon={<ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
              >
                {t('fleet.reserve')}
              </Button>
              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-charcoal" />
                <span>Instant confirmation • Free cancellation up to 24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Matrix */}
        <div className="p-8 md:p-12 rounded-3xl bg-white border border-zinc-200 shadow-sm mb-16">
          <h3 className="text-2xl font-display font-extrabold uppercase tracking-tight text-brand-charcoal mb-8">
            {isArabic ? 'المواصفات الهندسية والأداء' : 'Technical Specifications & Performance'}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Acceleration</span>
              <span className="text-base font-extrabold text-brand-charcoal mt-1">{vehicle.acceleration}</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Horsepower</span>
              <span className="text-base font-extrabold text-brand-charcoal mt-1">{vehicle.horsepower}</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Top Speed</span>
              <span className="text-base font-extrabold text-brand-charcoal mt-1">{vehicle.topSpeed}</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Powertrain</span>
              <span className="text-base font-extrabold text-brand-charcoal mt-1">{vehicle.engine}</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Transmission</span>
              <span className="text-base font-extrabold text-brand-charcoal mt-1">{vehicle.transmission}</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Capacity</span>
              <span className="text-base font-extrabold text-brand-charcoal mt-1">{vehicle.seats} Seats • {vehicle.doors} Doors</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Daily Allowance</span>
              <span className="text-base font-extrabold text-brand-charcoal mt-1">{vehicle.mileageLimitPerDay} km / day</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col">
              <span className="text-xs text-zinc-400 uppercase font-semibold">Security Deposit</span>
              <span className="text-base font-extrabold text-brand-charcoal mt-1">{vehicle.deposit.toLocaleString()} SAR</span>
            </div>
          </div>
        </div>

        {/* Bespoke Features List */}
        <div className="p-8 md:p-12 rounded-3xl bg-brand-charcoal text-white border border-white/10 shadow-xl mb-16">
          <h3 className="text-2xl font-display font-extrabold uppercase tracking-tight text-white mb-6">
            {isArabic ? 'تجهيزات ومزايا الرفاهية الحصرية' : 'Bespoke Cabin Appointments & Features'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-brand-lemon shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-200 font-normal">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews for this model */}
        {vehicle.reviews && vehicle.reviews.length > 0 && (
          <div className="p-8 md:p-12 rounded-3xl bg-white border border-zinc-200 shadow-sm">
            <h3 className="text-2xl font-display font-extrabold uppercase tracking-tight text-brand-charcoal mb-6">
              {isArabic ? 'تقييمات كبار العملاء لهذا الموديل' : 'Verified VIP Client Reviews'}
            </h3>
            <div className="flex flex-col gap-6">
              {vehicle.reviews.map((rev) => (
                <div key={rev._id} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={rev.userAvatar} alt={rev.userName} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-brand-charcoal">{rev.userName}</span>
                        <span className="text-xs text-zinc-400 font-medium">{new Date(rev.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-800">{isArabic ? rev.titleAr : rev.title}</h4>
                  <p className="text-xs text-zinc-600 font-normal leading-relaxed">{isArabic ? rev.commentAr : rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
