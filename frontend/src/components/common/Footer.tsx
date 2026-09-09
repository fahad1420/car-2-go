import React from 'react';
import { Logo } from './Logo';
import { useI18n } from '../../i18n/i18nContext';
import { MapPin, Phone, Mail, ShieldCheck, Award, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate = () => {} }) => {
  const { t, language } = useI18n();

  return (
    <footer className="bg-brand-charcoal text-white pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Tier: Brand, Trust Badges, Quick Hubs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Col 1-2: Brand Narrative */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Logo variant="dark" showTagline={true} />
            <p className="text-zinc-400 text-sm font-normal leading-relaxed max-w-md">
              {t('footer.about')}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-lemon" />
                <span>Saudi Ministry of Transport Licensed</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                <Award className="w-4 h-4 text-brand-lemon" />
                <span>GCC Luxury Fleet Certification</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase font-bold tracking-label-luxury text-brand-lemon">
              {t('footer.quickLinks')}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-400 font-normal">
              <li>
                <button onClick={() => { onNavigate('fleet'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  {t('nav.fleet')}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  {t('nav.locations')}
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                  {t('nav.bookNow')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Hubs */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase font-bold tracking-label-luxury text-brand-lemon">
              {language === 'ar' ? 'المراكز الاستراتيجية' : 'Key Hubs'}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-400 font-normal">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-lemon shrink-0 mt-0.5" />
                <span>Riyadh Private Aviation & Olaya</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-lemon shrink-0 mt-0.5" />
                <span>Jeddah Corniche & KAIA VIP</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-lemon shrink-0 mt-0.5" />
                <span>AlUla Desert Resort Pavilion</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-lemon shrink-0 mt-0.5" />
                <span>Dubai DIFC Gate Precinct</span>
              </li>
            </ul>
          </div>

          {/* Col 5: VIP Concierge Hotline */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase font-bold tracking-label-luxury text-brand-lemon">
              {language === 'ar' ? 'الكونسيرج الملكي' : 'Royal Concierge'}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-zinc-300">
              <a href="tel:+966800227246" className="flex items-center gap-2 hover:text-brand-lemon transition-colors">
                <Phone className="w-4 h-4 text-brand-lemon" />
                <span className="font-semibold">+966 800 227 246</span>
              </a>
              <a href="mailto:concierge@car2go.sa" className="flex items-center gap-2 hover:text-brand-lemon transition-colors font-normal">
                <Mail className="w-4 h-4 text-brand-lemon" />
                <span>concierge@car2go.sa</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                <Clock className="w-4 h-4 text-brand-lemon" />
                <span>24/7/365 White-Glove Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">{t('footer.terms')}</span>
            <span className="hover:text-zinc-300 cursor-pointer">{t('footer.privacy')}</span>
            <span className="hover:text-zinc-300 cursor-pointer">Security & Protection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
