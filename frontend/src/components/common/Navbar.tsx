import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Button } from './Button';
import { useI18n } from '../../i18n/i18nContext';
import { useAuth } from '../../context/AuthContext';
import {
  Globe,
  User as UserIcon,
  Shield,
  ArrowRight,
  LogOut,
  PhoneCall,
  Home,
  Car,
  Sparkles,
  MapPin,
  CalendarCheck
} from 'lucide-react';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigate = () => {}
}) => {
  const { language, toggleLanguage, setLanguage, t, direction } = useI18n();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isArabic = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll & handle ESC key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', num: '01', label: t('nav.home'), labelAr: 'الرئيسية', icon: Home },
    { id: 'fleet', num: '02', label: t('nav.fleet'), labelAr: 'أسطول السيارات', icon: Car },
    { id: 'services', num: '03', label: t('nav.services'), labelAr: 'خدمات النخبة', icon: Sparkles },
    { id: 'locations', num: '04', label: t('nav.locations'), labelAr: 'مراكز الخدمة', icon: MapPin },
    { id: 'contact', num: '05', label: t('nav.contact'), labelAr: 'الكونسيرج', icon: PhoneCall },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Active page label helper for the floating island contextual indicator
  const activeNavItem = navItems.find((item) => item.id === currentPage) || navItems[0];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP NAVBAR (100% UNTOUCHED, REMAINS FULL WIDTH & TRADITIONAL)     */}
      {/* ========================================================================= */}
      <header
        className={`hidden lg:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 safe-pt ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-black/[0.06] py-3.5'
            : 'bg-white/85 backdrop-blur-md py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="focus:outline-none flex items-center group cursor-pointer text-start active:scale-95 transition-transform"
            aria-label="CAR 2 GO Homepage"
          >
            <Logo variant="light" showTagline={false} />
          </button>

          {/* Desktop Links */}
          <nav className="flex items-center gap-8">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-xs font-semibold uppercase tracking-nav-luxury transition-all duration-200 py-1 ${
                    active
                      ? 'text-brand-charcoal'
                      : 'text-zinc-500 hover:text-brand-charcoal'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-lemon rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Cluster */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+966800227246"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-charcoal" />
              <span>+966 800 227 246</span>
            </a>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-200 text-xs font-semibold tracking-wide uppercase text-zinc-800 hover:border-brand-lemon hover:bg-brand-lemon/10 transition-colors"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-brand-charcoal" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('account')}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 hover:border-brand-charcoal text-xs font-semibold text-brand-charcoal transition-all"
                >
                  <UserIcon className="w-3.5 h-3.5 text-brand-charcoal" />
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-charcoal text-brand-lemon text-xs font-bold hover:bg-black transition-all"
                    title="Admin Suite"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                )}
                <button
                  onClick={logout}
                  className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="text-xs font-semibold uppercase tracking-nav-luxury text-zinc-700 hover:text-brand-charcoal px-3 py-1.5 transition-colors"
              >
                {t('nav.signIn')}
              </button>
            )}

            <Button
              variant="lemon"
              size="sm"
              onClick={() => handleNavClick('booking')}
              icon={<ArrowRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
            >
              {t('nav.bookNow')}
            </Button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MOBILE PREMIUM FLOATING TOP ISLAND (iOS / LUXURY AUTOMOTIVE APP)       */}
      {/* ========================================================================= */}
      <div className="lg:hidden fixed top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-40 safe-pt transition-transform duration-300 ease-out">
        <div
          className={`w-full max-w-lg mx-auto h-14 sm:h-15 px-3.5 sm:px-4 rounded-full flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'bg-brand-charcoal/90 backdrop-blur-2xl text-white border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.36)]'
              : 'bg-white/85 backdrop-blur-xl text-brand-charcoal border border-black/10 shadow-[0_6px_24px_rgba(0,0,0,0.12)]'
          }`}
        >
          {/* Left: Compact Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center focus:outline-none active:scale-95 transition-transform"
            aria-label="CAR 2 GO"
          >
            <Logo variant={scrolled ? 'dark' : 'light'} showTagline={false} />
          </button>

          {/* Center: Contextual Luxury Page Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-[10px] font-mono uppercase tracking-widest pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lemon animate-pulse" />
            <span className={scrolled ? 'text-zinc-200' : 'text-zinc-700 font-bold'}>
              {isArabic ? activeNavItem.labelAr : activeNavItem.label}
            </span>
          </div>

          {/* Right: Tactile Circular Morphing Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`w-10 h-10 rounded-full flex flex-col items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer ${
              scrolled
                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                : 'bg-zinc-100 hover:bg-zinc-200 text-brand-charcoal border border-black/5 shadow-sm'
            }`}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-4.5 h-3.5 relative flex flex-col justify-between items-center">
              <span
                className={`block h-[1.5px] rounded-full transition-all duration-300 ease-out origin-center ${
                  scrolled ? 'bg-white' : 'bg-brand-charcoal'
                } ${
                  mobileMenuOpen
                    ? 'w-4.5 translate-y-[6px] rotate-45 !bg-brand-lemon'
                    : 'w-4.5 translate-y-0'
                }`}
              />
              <span
                className={`block h-[1.5px] rounded-full transition-all duration-300 ease-out origin-center ${
                  scrolled ? 'bg-white' : 'bg-brand-charcoal'
                } ${
                  mobileMenuOpen
                    ? 'w-4.5 -translate-y-[6px] -rotate-45 !bg-brand-lemon'
                    : 'w-3 self-end'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE FLOATING BOTTOM DOCK (INSTANT THUMB REACHABILITY)               */}
      {/* ========================================================================= */}
      {!mobileMenuOpen && (
        <div className="lg:hidden fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-30 safe-pb pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-400">
          <div className="w-full max-w-md mx-auto p-1.5 rounded-full bg-brand-charcoal/90 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-between gap-1 pointer-events-auto text-white">
            {/* 4 Core Touch Navigation Tabs */}
            {[
              { id: 'home', icon: Home, label: isArabic ? 'الرئيسية' : 'Home' },
              { id: 'fleet', icon: Car, label: isArabic ? 'الأسطول' : 'Fleet' },
              { id: 'services', icon: Sparkles, label: isArabic ? 'الخدمات' : 'VIP' },
              { id: 'contact', icon: PhoneCall, label: isArabic ? 'الكونسيرج' : 'Concierge' },
            ].map((tab) => {
              const active = currentPage === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`flex-1 py-2 px-1.5 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all duration-200 active:scale-95 ${
                    active
                      ? 'bg-white/15 text-brand-lemon font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-label={tab.label}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-brand-lemon stroke-[2.4]' : 'stroke-[1.8]'}`} />
                  <span className="text-[9px] uppercase tracking-wider leading-none">
                    {tab.label}
                  </span>
                </button>
              );
            })}

            {/* Quick Action Pill: RESERVE / BOOK */}
            <button
              onClick={() => handleNavClick('booking')}
              className="px-3.5 py-2.5 rounded-full bg-brand-lemon text-brand-charcoal font-display font-black text-xs uppercase tracking-wide flex items-center gap-1 shrink-0 shadow-md active:scale-95 transition-transform"
            >
              <span>{isArabic ? 'احجز' : 'Reserve'}</span>
              <ArrowRight className={`w-3 h-3 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. FULLSCREEN EDITORIAL MOBILE APP NAVIGATION OVERLAY                     */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-[#09090B] text-white flex flex-col justify-between animate-nav-overlay overflow-y-auto overscroll-contain safe-pb"
          role="dialog"
          aria-modal="true"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-lemon/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Overlay Top Island Header */}
          <div className="w-full px-4 sm:px-6 safe-pt pt-3 pb-3 flex items-center justify-between border-b border-white/10">
            {/* Logo in White */}
            <button
              onClick={() => handleNavClick('home')}
              className="focus:outline-none flex items-center text-start"
            >
              <Logo variant="dark" showTagline={false} />
            </button>

            {/* Close Button Trigger with Morphing Cross & Label */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-xs font-bold uppercase tracking-wider text-brand-lemon border border-brand-lemon/30 cursor-pointer"
              aria-label="Close menu"
            >
              <span>{isArabic ? 'إغلاق' : 'CLOSE'}</span>
              <div className="w-3.5 h-3.5 relative flex items-center justify-center">
                <span className="absolute block w-3.5 h-[1.5px] bg-brand-lemon rotate-45" />
                <span className="absolute block w-3.5 h-[1.5px] bg-brand-lemon -rotate-45" />
              </div>
            </button>
          </div>

          {/* Staggered Editorial Navigation Items List */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 py-6">
            <div className="flex flex-col gap-1 sm:gap-2">
              {navItems.map((item, index) => {
                const active = currentPage === item.id;
                const delayMs = index * 55 + 80;

                return (
                  <div
                    key={item.id}
                    className="animate-nav-item border-b border-white/5 last:border-none"
                    style={{ animationDelay: `${delayMs}ms` }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`group w-full py-4 sm:py-5 flex items-center justify-between transition-all duration-300 text-start active:scale-[0.98] ${
                        active ? 'text-brand-lemon' : 'text-zinc-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-baseline gap-3 sm:gap-4">
                        <span className={`text-xs font-mono transition-colors ${
                          active ? 'text-brand-lemon font-bold' : 'text-zinc-600 group-hover:text-zinc-400'
                        }`}>
                          {item.num}
                        </span>
                        <span className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tight-luxury uppercase">
                          {isArabic ? item.labelAr : item.label}
                        </span>
                      </div>

                      {/* Active Glowing Dot / Arrow Indicator */}
                      <div className="flex items-center gap-2">
                        {active && (
                          <span className="w-2 h-2 rounded-full bg-brand-lemon shadow-[0_0_12px_#E2F163]" />
                        )}
                        <ArrowRight
                          className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                            direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                          } ${
                            active
                              ? 'text-brand-lemon opacity-100'
                              : 'text-zinc-600 group-hover:text-white opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Luxury Actions & Concierge Hub */}
          <div
            className="px-6 sm:px-8 pt-4 pb-6 flex flex-col gap-3.5 border-t border-white/10 animate-nav-item"
            style={{ animationDelay: '380ms' }}
          >
            {/* Primary Action Button: BOOK NOW */}
            <button
              onClick={() => handleNavClick('booking')}
              className="w-full py-4 rounded-2xl bg-brand-lemon text-brand-charcoal font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:bg-[#d6e556] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{t('nav.bookNow')}</span>
              <ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
            </button>

            {/* Bilingual Dual-Switch Language Toggle */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-center">
              <button
                onClick={() => setLanguage('en')}
                className={`py-2 rounded-xl transition-all ${
                  language === 'en'
                    ? 'bg-white text-brand-charcoal shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                English (EN)
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`py-2 rounded-xl font-arabic transition-all ${
                  language === 'ar'
                    ? 'bg-white text-brand-charcoal shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                العربية (AR)
              </button>
            </div>

            {/* VIP Hotline & Member Direct Strip */}
            <div className="flex items-center justify-between pt-1 text-xs text-zinc-400 font-mono">
              <a
                href="tel:+966800227246"
                className="flex items-center gap-2 hover:text-brand-lemon transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-brand-lemon animate-pulse" />
                <span className="text-zinc-300 font-bold">+966 800 227 246</span>
              </a>

              {user ? (
                <button
                  onClick={() => handleNavClick('account')}
                  className="flex items-center gap-1.5 text-brand-lemon hover:underline"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>{user.name.split(' ')[0]}</span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('auth')}
                  className="text-zinc-300 hover:text-white font-sans uppercase font-bold text-[11px]"
                >
                  {t('nav.signIn')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
