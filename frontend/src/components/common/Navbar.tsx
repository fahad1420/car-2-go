import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Button } from './Button';
import { useI18n } from '../../i18n/i18nContext';
import { useAuth } from '../../context/AuthContext';
import { Globe, User as UserIcon, Menu, X, Shield, ArrowRight, LogOut, PhoneCall, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigate = () => {}
}) => {
  const { language, toggleLanguage, t, direction } = useI18n();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', num: '01', label: t('nav.home') },
    { id: 'fleet', num: '02', label: t('nav.fleet') },
    { id: 'services', num: '03', label: t('nav.services') },
    { id: 'locations', num: '04', label: t('nav.locations') },
    { id: 'contact', num: '05', label: t('nav.contact') },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-pt ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5 py-3 md:py-3.5'
            : 'bg-white/85 backdrop-blur-sm py-3.5 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="focus:outline-none flex items-center group cursor-pointer text-start active:scale-95 transition-transform"
            aria-label="CAR 2 GO Homepage"
          >
            <Logo variant="light" showTagline={false} />
          </button>

          {/* Center Desktop Navigation Items */}
          <nav className="hidden md:flex items-center gap-8">
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

          {/* Right Desktop Action Cluster */}
          <div className="hidden lg:flex items-center gap-4">
            {/* VIP Hotline Indicator */}
            <a
              href="tel:+966800227246"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-charcoal" />
              <span>+966 800 227 246</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-200 text-xs font-semibold tracking-wide uppercase text-zinc-800 hover:border-brand-lemon hover:bg-brand-lemon/10 transition-colors"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-brand-charcoal" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* User Auth or Profile */}
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
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-charcoal text-brand-lemon text-xs font-bold hover:bg-black transition-all"
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

            {/* Primary CTA: Book Now */}
            <Button
              variant="lemon"
              size="sm"
              onClick={() => handleNavClick('booking')}
              icon={<ArrowRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
            >
              {t('nav.bookNow')}
            </Button>
          </div>

          {/* Mobile Right Controls: Language Pill + App Drawer Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-full border border-zinc-200/90 text-xs font-bold text-brand-charcoal active:scale-95 transition-transform bg-zinc-50"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'عربي' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-brand-charcoal hover:bg-zinc-100 rounded-full active:scale-90 transition-all cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2.2]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cinematic Luxury Mobile App Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-brand-charcoal/95 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 text-white safe-pb animate-in fade-in duration-200 overflow-y-auto"
        >
          {/* Top Info Banner */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-lemon animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
                ROYAL AUTOMOTIVE CONCIERGE
              </span>
            </div>
            <a
              href="tel:+966800227246"
              className="text-[11px] font-bold text-brand-lemon flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>800 227 246</span>
            </a>
          </div>

          {/* Editorial Menu Navigation Links */}
          <div className="flex flex-col gap-2 my-auto py-6">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group w-full flex items-center justify-between py-3.5 px-4 rounded-2xl transition-all duration-200 text-start active:scale-[0.98] ${
                    active
                      ? 'bg-white/10 text-brand-lemon border border-brand-lemon/30 shadow-lg'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-500 group-hover:text-brand-lemon transition-colors">
                      {item.num}
                    </span>
                    <span className="text-lg font-display font-extrabold uppercase tracking-tight">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${
                      direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''
                    } ${active ? 'text-brand-lemon opacity-100' : ''}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Bottom App Actions: User Profile + Primary CTA */}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            {user ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-lemon/15 text-brand-lemon flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col text-start">
                    <span className="text-xs font-bold text-white leading-tight">{user.name}</span>
                    <span className="text-[10px] text-zinc-400 capitalize">{user.role} Member</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNavClick('account')}
                    className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-semibold text-white hover:bg-white/20"
                  >
                    {t('nav.account')}
                  </button>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="p-1.5 rounded-xl bg-brand-lemon text-brand-charcoal font-bold text-xs"
                      title="Admin Suite"
                    >
                      <Shield className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={logout}
                    className="p-1.5 text-zinc-400 hover:text-red-400"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 rounded-2xl border border-white/10 transition-colors"
              >
                {t('nav.signIn')} • Member Portal
              </button>
            )}

            {/* Primary Action Button */}
            <Button
              variant="lemon"
              size="lg"
              fullWidth
              onClick={() => handleNavClick('booking')}
              icon={<ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
            >
              {t('nav.bookNow')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
