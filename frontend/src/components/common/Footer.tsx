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
    <footer className="bg-brand-charcoal text-white pt-16 sm:pt-20 pb-24 sm:pb-28 lg:pb-12 border-t border-white/10 safe-pb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Tier: Brand, Trust Badges, Quick Hubs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          {/* Col 1-2: Brand Narrative */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">
            <Logo variant="dark" showTagline={true} />
            <p className="text-zinc-400 text-xs sm:text-sm font-normal leading-relaxed max-w-md">
              {t('footer.about')}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-lemon shrink-0" />
                <span>Saudi Ministry of Transport Licensed</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                <Award className="w-4 h-4 text-brand-lemon shrink-0" />
                <span>GCC Luxury Fleet Certification</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-label-luxury text-brand-lemon">
              {t('footer.quickLinks')}
            </h4>
            <ul className="flex flex-col gap-2 sm:gap-2.5 text-xs sm:text-sm text-zinc-400 font-normal">
              <li>
                <button
                  onClick={() => { onNavigate('fleet'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors py-1 text-start"
                >
                  {t('nav.fleet')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors py-1 text-start"
                >
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors py-1 text-start"
                >
                  {t('nav.locations')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors py-1 text-start font-semibold text-white"
                >
                  {t('nav.bookNow')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Hubs */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-label-luxury text-brand-lemon">
              {language === 'ar' ? 'المراكز الاستراتيجية' : 'Key Hubs'}
            </h4>
            <ul className="flex flex-col gap-2 sm:gap-2.5 text-xs sm:text-sm text-zinc-400 font-normal">
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
          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-label-luxury text-brand-lemon">
              {language === 'ar' ? 'الكونسيرج الملكي' : 'Royal Concierge'}
            </h4>
            <div className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-sm text-zinc-300">
              <a
                href="tel:+966800227246"
                className="flex items-center gap-2 hover:text-brand-lemon active:text-brand-lemon transition-colors py-1"
              >
                <Phone className="w-4 h-4 text-brand-lemon shrink-0" />
                <span className="font-semibold">+966 800 227 246</span>
              </a>
              <a
                href="mailto:concierge@car2go.sa"
                className="flex items-center gap-2 hover:text-brand-lemon active:text-brand-lemon transition-colors font-normal py-1"
              >
                <Mail className="w-4 h-4 text-brand-lemon shrink-0" />
                <span>concierge@car2go.sa</span>
              </a>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-400 font-medium pt-1">
                <Clock className="w-3.5 h-3.5 text-brand-lemon shrink-0" />
                <span>24/7/365 White-Glove Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Legal & Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start text-[11px] sm:text-xs text-zinc-500 font-medium">
          <p>{t('footer.copyright')}</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">{t('footer.terms')}</span>
            <span className="hover:text-zinc-300 cursor-pointer">{t('footer.privacy')}</span>
            <span className="hover:text-zinc-300 cursor-pointer">Security & Protection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
