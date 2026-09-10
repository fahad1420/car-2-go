import React, { useState, useEffect } from 'react';
import { Vehicle } from '../types';
import { api } from '../services/api';
import { useI18n } from '../i18n/i18nContext';
import { VehicleCard } from '../components/fleet/VehicleCard';
import { useBooking } from '../context/BookingContext';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

interface FleetPageProps {
  onNavigate?: (page: string) => void;
  onSelectVehicle?: (vehicle: Vehicle) => void;
}

export const FleetPage: React.FC<FleetPageProps> = ({
  onNavigate = () => {},
  onSelectVehicle = () => {}
}) => {
  const { t, language } = useI18n();
  const { startBookingWithVehicle } = useBooking();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const loadFleet = async () => {
      try {
        const res = await api.get('/vehicles');
        if (res.success && res.vehicles) {
          setVehicles(res.vehicles);
        }
      } catch (e) {
        console.error('Failed to load fleet', e);
      } finally {
        setLoading(false);
      }
    };
    loadFleet();
  }, []);

  const handleReserve = (vehicle: Vehicle) => {
    startBookingWithVehicle(vehicle);
    onNavigate('booking');
  };

  const handleViewDetails = (vehicle: Vehicle) => {
    onSelectVehicle(vehicle);
    onNavigate('vehicle-detail');
  };

  const filteredVehicles = vehicles.filter((v) => {
    const matchesCategory = selectedCategory === 'all' || v.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.tagline && v.tagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (v.taglineAr && v.taglineAr.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price-asc') {
    filteredVehicles.sort((a, b) => a.pricePerDay - b.pricePerDay);
  } else if (sortBy === 'price-desc') {
    filteredVehicles.sort((a, b) => b.pricePerDay - a.pricePerDay);
  } else if (sortBy === 'rating') {
    filteredVehicles.sort((a, b) => b.rating - a.rating);
  }

  const categories = [
    { id: 'all', label: t('fleet.all') },
    { id: 'Luxury', label: t('fleet.luxury') },
    { id: 'Sports', label: t('fleet.sports') },
    { id: 'Executive', label: t('fleet.executive') },
    { id: 'SUV', label: t('fleet.suv') },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-brand-light min-h-screen text-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Page Header */}
        <div className="flex flex-col gap-2 sm:gap-3 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-brand-lemon" />
            <span className="text-[11px] sm:text-xs uppercase font-semibold tracking-label-luxury text-zinc-400">
              PRESTIGE SHOWROOM CATALOG
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight-luxury text-brand-charcoal">
            {t('fleet.title')}
          </h1>
          <p className="text-zinc-500 max-w-xl text-sm sm:text-base font-normal">
            {t('fleet.subtitle')}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3 sm:p-4 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col lg:flex-row gap-3 sm:gap-4 justify-between items-stretch lg:items-center mb-8 sm:mb-12">
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('fleet.searchPlaceholder')}
              className="w-full ps-11 pe-4 py-2.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-brand-charcoal focus:outline-none focus:border-brand-charcoal"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-100 border border-zinc-200/80 overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all shrink-0 active:scale-95 touch-manipulation ${
                  selectedCategory === cat.id
                    ? 'bg-brand-charcoal text-brand-lemon shadow-sm'
                    : 'text-zinc-500 hover:text-brand-charcoal'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center justify-end gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-brand-charcoal focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Fleet Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 rounded-3xl bg-zinc-200 animate-pulse" />
            ))}
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200 p-8">
            <Sparkles className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-brand-charcoal">No luxury vehicles found matching your criteria</h3>
            <p className="text-xs text-zinc-500 mt-1 font-normal">Try adjusting your search keyword or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                onSelect={handleReserve}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
