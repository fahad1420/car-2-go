import React from 'react';
import { ServicesSection } from '../components/home/ServicesSection';
import { useI18n } from '../i18n/i18nContext';
import { Button } from '../components/common/Button';
import { PhoneCall, ShieldCheck } from 'lucide-react';

interface ServicesPageProps {
  onNavigate?: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate = () => {} }) => {
  const { language } = useI18n();
  const isArabic = language === 'ar';

  return (
    <div className="pt-24 bg-brand-pure min-h-screen text-brand-charcoal">
      {/* Top Banner */}
      <div className="bg-brand-charcoal text-white py-16 px-6 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-wide-luxury text-brand-lemon">
            WHITE-GLOVE MOBILITY
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight">
            {isArabic ? 'خدمات كبار الشخصيات والكونسيرج الملكي' : 'VIP Concierge & Mobility Solutions'}
          </h1>
          <p className="text-zinc-400 text-sm font-light max-w-xl">
            {isArabic
              ? 'حلول تنقل مخصصة تناسب أعلى بروتوكولات الخصوصية والفخامة في السعودية ودول الخليج.'
              : 'Bespoke chauffeur, private jet runway delivery, and diplomatic security mobility across the GCC.'}
          </p>
        </div>
      </div>

      <ServicesSection onInquireService={() => onNavigate('contact')} />

      {/* Direct Hotline Banner */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        <div className="p-8 md:p-12 rounded-3xl bg-zinc-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-start">
            <span className="text-xs font-mono text-brand-lemon uppercase">24/7 VIP Direct Hotline</span>
            <h3 className="text-2xl font-display font-bold uppercase">Need Bespoke Security or Convoy Logistics?</h3>
            <p className="text-xs text-zinc-400 font-light">Speak directly to our Chief Mobility Officer.</p>
          </div>
          <a href="tel:+966800227246">
            <Button variant="lemon" size="lg" icon={<PhoneCall className="w-4 h-4" />}>
              Call +966 800 227 246
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

