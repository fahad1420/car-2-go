import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Button } from './Button';
import { useI18n } from '../../i18n/i18nContext';
import { useAuth } from '../../context/AuthContext';
import { Globe, User as UserIcon, Menu, X, Shield, ArrowRight, LogOut, PhoneCall } from 'lucide-react';

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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'fleet', label: t('nav.fleet') },
    { id: 'services', label: t('nav.services') },
    { id: 'locations', label: t('nav.locations') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5 py-3.5'
          : 'bg-white/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="focus:outline-none flex items-center group cursor-pointer text-start"
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

        {/* Right Action Cluster */}
        <div className="hidden lg:flex items-center gap-4">
          {/* VIP Hotline Indicator */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold">
            <PhoneCall className="w-3.5 h-3.5 text-brand-charcoal" />
            <span>+966 800 227 246</span>
          </div>

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

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded-full border border-zinc-200 text-xs font-semibold text-zinc-700"
          >
            {language === 'en' ? 'عربي' : 'EN'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-charcoal hover:bg-zinc-100 rounded-full transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-zinc-200 shadow-xl px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-start py-2.5 px-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-colors ${
                  currentPage === item.id
                    ? 'bg-zinc-100 text-brand-charcoal'
                    : 'text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-100 flex flex-col gap-3">
            {user ? (
              <>
                <button
                  onClick={() => handleNavClick('account')}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-zinc-800"
                >
                  <UserIcon className="w-4 h-4 text-brand-charcoal" />
                  <span>{t('nav.account')} ({user.name})</span>
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="flex items-center gap-2 py-2 text-sm font-semibold text-amber-600"
                  >
                    <Shield className="w-4 h-4" />
                    <span>{t('nav.admin')}</span>
                  </button>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="py-2.5 text-center text-sm font-semibold uppercase tracking-wide text-zinc-700 bg-zinc-100 rounded-full"
              >
                {t('nav.signIn')}
              </button>
            )}

            <Button
              variant="lemon"
              size="md"
              fullWidth
              onClick={() => handleNavClick('booking')}
            >
              {t('nav.bookNow')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
