import React, { useState, useEffect } from 'react';
import { Vehicle } from '../../types';
import { api } from '../../services/api';
import { useI18n } from '../../i18n/i18nContext';
import { VehicleCard } from '../fleet/VehicleCard';
import { Button } from '../common/Button';
import { ArrowRight } from 'lucide-react';

interface FleetPreviewProps {
  onSelectVehicle?: (vehicle: Vehicle) => void;
  onViewDetails?: (vehicle: Vehicle) => void;
  onViewAllFleet?: () => void;
}

export const FleetPreview: React.FC<FleetPreviewProps> = ({
  onSelectVehicle = () => {},
  onViewDetails = () => {},
  onViewAllFleet = () => {},
}) => {
  const { t, direction } = useI18n();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const query = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
        const res = await api.get(`/vehicles${query}`);
        if (res.success && res.vehicles) {
          setVehicles(res.vehicles.slice(0, 6));
        }
      } catch (e) {
        console.error('Failed to load fleet:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [selectedCategory]);

  const categories = [
    { id: 'all', label: t('fleet.all') },
    { id: 'Luxury', label: t('fleet.luxury') },
    { id: 'Sports', label: t('fleet.sports') },
    { id: 'Executive', label: t('fleet.executive') },
    { id: 'SUV', label: t('fleet.suv') },
  ];

  return (
    <section className="py-20 sm:py-28 md:py-36 bg-brand-light text-brand-charcoal overflow-hidden border-b border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header & Category Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-14">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-brand-lemon" />
              <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-label-luxury text-zinc-400">
                04 / {t('fleet.tag')}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight sm:tracking-tight-luxury text-brand-charcoal">
              {t('fleet.title')}
            </h2>
            <p className="text-zinc-500 max-w-xl text-xs sm:text-sm font-normal">
              {t('fleet.subtitle')}
            </p>
          </div>

          {/* Category Tabs (Horizontally swipeable on mobile) */}
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
            <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-white border border-zinc-200/80 shadow-sm w-max">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 active:scale-95 ${
                    selectedCategory === cat.id
                      ? 'bg-brand-charcoal text-brand-lemon shadow-sm'
                      : 'text-zinc-500 hover:text-brand-charcoal'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fleet Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 sm:h-96 rounded-3xl bg-zinc-200/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                onSelect={onSelectVehicle}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}

        {/* View All Fleet Action */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <Button
            variant="charcoal"
            size="lg"
            onClick={onViewAllFleet}
            className="w-full sm:w-auto justify-center"
            icon={<ArrowRight className={`w-4 h-4 text-brand-lemon ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
          >
            {t('featured.viewShowroom')}
          </Button>
        </div>
      </div>
    </section>
  );
};
