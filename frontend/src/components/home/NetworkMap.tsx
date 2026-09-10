import React, { useState } from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { MapPin, Plane, Building2, Palmtree } from 'lucide-react';

export const NetworkMap: React.FC = () => {
  const { t, language } = useI18n();
  const isArabic = language === 'ar';

  const hubs = [
    {
      id: 'ruh-airport',
      name: 'King Khalid International Airport',
      nameAr: 'مطار الملك خالد الدولي (صالة الطيران الخاص VIP)',
      city: 'Riyadh',
      cityAr: 'الرياض',
      type: 'Private Aviation & Terminals 1-5',
      typeAr: 'صالات الطيران الخاص والمحطات 1-5',
      address: 'King Khalid Airport Rd, Riyadh, Saudi Arabia',
      dispatch: '< 30 mins',
      icon: <Plane className="w-5 h-5" />,
      active: true
    },
    {
      id: 'ruh-olaya',
      name: 'Al Olaya Prestige Showroom',
      nameAr: 'صالة العليا للعرض والكونسيرج',
      city: 'Riyadh',
      cityAr: 'الرياض',
      type: 'Central Prestige Hub',
      typeAr: 'المركز الرئيسي للعاصمة',
      address: 'King Fahd Rd, Al Olaya, Riyadh, Saudi Arabia',
      dispatch: '< 20 mins',
      icon: <Building2 className="w-5 h-5" />
    },
    {
      id: 'jed-corniche',
      name: 'Jeddah Waterfront & KAIA Lounge',
      nameAr: 'واجهة جدة البحرية وصالة مطار الملك عبدالعزيز',
      city: 'Jeddah',
      cityAr: 'جدة',
      type: 'Coastal & VIP Airport Hub',
      typeAr: 'مركز الواجهة والمطار الدولي',
      address: 'North Corniche Rd, Jeddah, Saudi Arabia',
      dispatch: '< 35 mins',
      icon: <Plane className="w-5 h-5" />
    },
    {
      id: 'alula-resort',
      name: 'AlUla Desert Resort Pavilion',
      nameAr: 'جناح منتجعات العلا الصحراوية',
      city: 'AlUla',
      cityAr: 'العلا',
      type: 'Luxury Eco-Resort Dispatch',
      typeAr: 'تسليم المنتجعات الفاخرة',
      address: 'Ashar Valley / Banyan Tree, AlUla, Saudi Arabia',
      dispatch: '< 45 mins',
      icon: <Palmtree className="w-5 h-5" />
    },
    {
      id: 'dxb-difc',
      name: 'Dubai DIFC Gate Precinct',
      nameAr: 'مركز دبي المالي العالمي (DIFC)',
      city: 'Dubai',
      cityAr: 'دبي',
      type: 'GCC Cross-Border Gateway',
      typeAr: 'بوابة التنقل الدولي في الخليج',
      address: 'Gate Precinct 4, DIFC, Dubai, UAE',
      dispatch: '< 30 mins',
      icon: <Building2 className="w-5 h-5" />
    }
  ];

  const [selectedHub, setSelectedHub] = useState(hubs[0]);

  return (
    <section className="py-20 sm:py-28 md:py-36 bg-brand-pure text-brand-charcoal overflow-hidden border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-2.5 sm:gap-3 mb-10 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-brand-lemon" />
            <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-label-luxury text-zinc-400">
              09 / {t('network.tag')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight sm:tracking-tight-luxury text-brand-charcoal">
            {t('network.title')}
          </h2>
          <p className="text-zinc-500 max-w-xl text-xs sm:text-sm font-normal">
            {t('network.subtitle')}
          </p>
        </div>

        {/* Hub Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Hubs List */}
          <div className="lg:col-span-6 flex flex-col gap-2.5 sm:gap-3">
            {hubs.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              return (
                <div
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 sm:gap-4 active:scale-[0.99] ${
                    isSelected
                      ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-lg'
                      : 'bg-zinc-50 text-zinc-800 border-zinc-200/80 hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl shrink-0 ${isSelected ? 'bg-brand-lemon text-brand-charcoal' : 'bg-white text-zinc-700'}`}>
                      {hub.icon}
                    </div>
                    <div className="flex flex-col text-start">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-tight line-clamp-1">
                        {isArabic ? hub.nameAr : hub.name}
                      </span>
                      <span className={`text-[11px] sm:text-xs ${isSelected ? 'text-zinc-400' : 'text-zinc-500'} line-clamp-1`}>
                        {isArabic ? hub.typeAr : hub.type} • {isArabic ? hub.cityAr : hub.city}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full shrink-0 ${isSelected ? 'bg-white/10 text-brand-lemon' : 'bg-zinc-200 text-zinc-700'}`}>
                    {hub.dispatch}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Hub Detail Showcase Box */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-xl flex flex-col justify-between gap-6 sm:gap-8">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] uppercase bg-brand-lemon/20 text-brand-lemon border border-brand-lemon/30 font-bold tracking-wider">
                  ACTIVE STRATEGIC HUB
                </span>
                <span className="text-[11px] sm:text-xs text-zinc-400 font-semibold">
                  {selectedHub.dispatch} Dispatch
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold uppercase text-white leading-tight">
                {isArabic ? selectedHub.nameAr : selectedHub.name}
              </h3>

              <div className="flex items-start gap-2.5 sm:gap-3 text-zinc-400 text-xs sm:text-sm pt-1 sm:pt-2">
                <MapPin className="w-4 h-4 text-brand-lemon shrink-0 mt-0.5" />
                <span>{selectedHub.address}</span>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-xs font-bold text-brand-lemon uppercase tracking-wider">CONCIERGE COORDINATION PROTOCOL</span>
              <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed font-normal">
                {isArabic
                  ? 'يتم تنسيق استلام الطائرة أو الفيلا قبل 60 دقيقة من موعد وصولكم مع ممثل البروتوكول الخاص.'
                  : 'Runway apron entry and hotel valet integration pre-coordinated 60 minutes prior to arrival.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
