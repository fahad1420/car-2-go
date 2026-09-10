import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { Button } from '../common/Button';
import { Plane, Shield, Navigation, Key } from 'lucide-react';

interface ServicesSectionProps {
  onInquireService?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onInquireService = () => {}
}) => {
  const { t, language } = useI18n();

  const services = [
    {
      id: 'runway',
      icon: <Plane className="w-6 h-6 text-brand-lemon" />,
      tag: 'PRIVATE AVIATION',
      title: t('services.service1Title'),
      desc: t('services.service1Desc'),
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
      specs: ['Direct Runway Jet Clearance', 'Chilled Arabian Dates & Refreshments', 'Luggage Escort to Trunk']
    },
    {
      id: 'chauffeur',
      icon: <Navigation className="w-6 h-6 text-brand-lemon" />,
      tag: 'EXECUTIVE DISCRETION',
      title: t('services.service2Title'),
      desc: t('services.service2Desc'),
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      specs: ['Multilingual Certified Drivers', 'Diplomatic & VIP Route Security', 'Hourly & Multi-Day Retainer']
    },
    {
      id: 'crossborder',
      icon: <Shield className="w-6 h-6 text-brand-lemon" />,
      tag: 'GCC FREEDOM',
      title: t('services.service3Title'),
      desc: t('services.service3Desc'),
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      specs: ['Pre-Approved UAE & Qatar Entry', 'Cross-Border 24/7 Breakdown Recovery', 'Customs Fast-Track Paperwork']
    },
    {
      id: 'door-to-door',
      icon: <Key className="w-6 h-6 text-brand-lemon" />,
      tag: 'WHITE-GLOVE CONCIERGE',
      title: t('services.service4Title'),
      desc: t('services.service4Desc'),
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      specs: ['Enclosed Transport Option', 'Delivery to Private Villa / Penthouse', 'Instant Digital Key Transfer']
    }
  ];

  return (
    <section className="py-20 sm:py-28 md:py-36 bg-brand-pure text-brand-charcoal overflow-hidden border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-2.5 sm:gap-3 mb-12 sm:mb-20">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-brand-lemon" />
            <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-label-luxury text-zinc-400">
              05 / {t('services.tag')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight sm:tracking-tight-luxury text-brand-charcoal">
            {t('services.title')}
          </h2>
          <p className="text-zinc-500 max-w-xl text-xs sm:text-base font-normal">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Editorial Alternating Layouts */}
        <div className="flex flex-col gap-12 sm:gap-24">
          {services.map((srv, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={srv.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Column */}
                <div className={`lg:col-span-6 relative aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-zinc-900 group ${
                  isReversed ? 'lg:order-2' : 'lg:order-1'
                }`}>
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Editorial Content Column */}
                <div className={`lg:col-span-6 flex flex-col gap-4 sm:gap-6 ${
                  isReversed ? 'lg:order-1' : 'lg:order-2'
                }`}>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-brand-charcoal text-white">
                      {srv.icon}
                    </div>
                    <span className="text-[10px] sm:text-xs uppercase tracking-label-luxury text-zinc-400 font-semibold">
                      {srv.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold uppercase tracking-tight text-brand-charcoal">
                    {srv.title}
                  </h3>

                  <p className="text-zinc-600 text-sm sm:text-base font-normal leading-relaxed">
                    {srv.desc}
                  </p>

                  {/* Bullet Specs */}
                  <ul className="flex flex-col gap-2 sm:gap-2.5 py-2 border-y border-zinc-100">
                    {srv.specs.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 sm:gap-2.5 text-xs text-zinc-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-lemon shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <Button
                      variant="charcoal"
                      size="md"
                      className="w-full sm:w-auto justify-center"
                      onClick={() => onInquireService(srv.title)}
                    >
                      {language === 'ar' ? 'طلب الخدمة الخاصة' : 'Request Bespoke Service'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
