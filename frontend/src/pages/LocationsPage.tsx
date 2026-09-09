import React from 'react';
import { NetworkMap } from '../components/home/NetworkMap';
import { useI18n } from '../i18n/i18nContext';

export const LocationsPage: React.FC = () => {
  const { language } = useI18n();
  const isArabic = language === 'ar';

  return (
    <div className="pt-24 bg-brand-pure min-h-screen text-brand-charcoal">
      <div className="bg-brand-charcoal text-white py-16 px-6 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-wide-luxury text-brand-lemon">
            KINGDOM & GCC COVERAGE
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight">
            {isArabic ? 'مراكزنا في المملكة ودول الخليج' : 'Strategic GCC Mobility Hubs'}
          </h1>
          <p className="text-zinc-400 text-sm font-light max-w-xl">
            {isArabic
              ? 'متواجدون على مدار الساعة في الرياض، جدة، العلا، الخبر، دبي والدوحة.'
              : 'Immediate white-glove dispatch across Saudi Arabia, UAE, and Qatar premier gateways.'}
          </p>
        </div>
      </div>
      <NetworkMap />
    </div>
  );
};

