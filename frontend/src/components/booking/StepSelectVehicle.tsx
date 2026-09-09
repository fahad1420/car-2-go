import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useI18n } from '../../i18n/i18nContext';
import { Vehicle } from '../../types';
import { api } from '../../services/api';
import { Button } from '../common/Button';
import { Check, ArrowLeft, ArrowRight, Gauge, Zap, Users } from 'lucide-react';

export const StepSelectVehicle: React.FC = () => {
  const {
    pickupDate,
    returnDate,
    selectedVehicle,
    setSelectedVehicle,
    days,
    setStep
  } = useBooking();

  const { t, language, direction } = useI18n();
  const isArabic = language === 'ar';

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await api.get(`/vehicles?pickupDate=${encodeURIComponent(pickupDate)}&returnDate=${encodeURIComponent(returnDate)}`);
        if (res.success && res.vehicles) {
          setVehicles(res.vehicles);
          if (!selectedVehicle && res.vehicles.length > 0) {
            setSelectedVehicle(res.vehicles[0]);
          }
        }
      } catch (e) {
        console.error('Failed to load vehicles for dates', e);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [pickupDate, returnDate]);

  const filteredVehicles = categoryFilter === 'all'
    ? vehicles
    : vehicles.filter(v => v.category.toLowerCase() === categoryFilter.toLowerCase());

  const handleNext = () => {
    if (selectedVehicle) {
      setStep(3);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-label-luxury text-zinc-400">
            STEP 02 • VEHICLE CURATION
          </span>
          <h2 className="text-3xl font-display font-extrabold uppercase tracking-tight-luxury text-brand-charcoal">
            {isArabic ? 'اختر سيارتك الفارهة' : 'Select Your Luxury Chassis'}
          </h2>
          <p className="text-sm text-zinc-500 font-normal mt-1">
            {isArabic
              ? `تم التحقق من التوفر للمدة المحددة (${days} أيام)`
              : `Live availability verified for your selected period (${days} days)`}
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-zinc-100 border border-zinc-200">
          {['all', 'Luxury', 'Sports', 'Executive', 'SUV'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all ${
                categoryFilter === cat
                  ? 'bg-brand-charcoal text-brand-lemon shadow-sm'
                  : 'text-zinc-600 hover:text-brand-charcoal'
              }`}
            >
              {cat === 'all' ? t('fleet.all') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 rounded-3xl bg-zinc-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => {
            const isSelected = selectedVehicle?._id === vehicle._id;
            const isConflict = vehicle.availableForDates === false;

            return (
              <div
                key={vehicle._id}
                onClick={() => !isConflict && setSelectedVehicle(vehicle)}
                className={`group rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-brand-charcoal ring-4 ring-brand-lemon/30 bg-white shadow-xl'
                    : isConflict
                    ? 'border-zinc-200 bg-zinc-100 opacity-60 cursor-not-allowed'
                    : 'border-zinc-200/80 bg-white hover:border-zinc-400 hover:shadow-md'
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Top Status */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold bg-white/90 text-brand-charcoal">
                      {vehicle.category}
                    </span>
                    {isSelected && (
                      <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold bg-brand-lemon text-brand-charcoal flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" /> Selected
                      </span>
                    )}
                    {isConflict && (
                      <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold bg-red-600 text-white">
                        Booked for Dates
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-semibold text-zinc-300 uppercase tracking-wider block mb-0.5">{vehicle.brand}</span>
                    <h3 className="text-xl font-display font-extrabold uppercase leading-tight">{vehicle.name}</h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-4">
                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-zinc-100 text-center">
                    <div className="flex flex-col items-center">
                      <Gauge className="w-3.5 h-3.5 text-zinc-400 mb-0.5" />
                      <span className="text-xs font-bold text-brand-charcoal">{vehicle.acceleration}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Zap className="w-3.5 h-3.5 text-zinc-400 mb-0.5" />
                      <span className="text-xs font-bold text-brand-charcoal">{vehicle.horsepower}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Users className="w-3.5 h-3.5 text-zinc-400 mb-0.5" />
                      <span className="text-xs font-bold text-brand-charcoal">{vehicle.seats} seats</span>
                    </div>
                  </div>

                  {/* Rate */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col text-start">
                      <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Daily Rate</span>
                      <span className="text-xl font-extrabold font-display text-brand-charcoal">
                        {vehicle.pricePerDay.toLocaleString()} <span className="text-xs font-normal text-zinc-500">SAR</span>
                      </span>
                    </div>

                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                      isSelected ? 'bg-brand-charcoal text-brand-lemon' : 'bg-zinc-100 text-zinc-700'
                    }`}>
                      {isSelected ? 'Chosen' : 'Select'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Navigation Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-zinc-200">
        <Button
          variant="outline"
          size="md"
          onClick={() => setStep(1)}
          icon={<ArrowLeft className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
        >
          {t('booking.back')}
        </Button>

        <Button
          variant="lemon"
          size="lg"
          disabled={!selectedVehicle || selectedVehicle.availableForDates === false}
          onClick={handleNext}
          icon={<ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
        >
          {isArabic ? 'متابعة للباقات والأسعار' : 'Continue to Add-Ons'}
        </Button>
      </div>
    </div>
  );
};
