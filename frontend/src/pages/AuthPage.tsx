import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n/i18nContext';
import { Button } from '../components/common/Button';
import { Logo } from '../components/common/Logo';
import { Lock, Mail, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthPageProps {
  onNavigate?: (page: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate = () => {} }) => {
  const { login, register } = useAuth();
  const { language, direction } = useI18n();
  const isArabic = language === 'ar';

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (res.success) {
          onNavigate('account');
        } else {
          setError(res.message || 'Login failed');
        }
      } else {
        const res = await register({ name, email, password, phone });
        if (res.success) {
          onNavigate('account');
        } else {
          setError(res.message || 'Registration failed');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-brand-light min-h-screen text-brand-charcoal flex items-center justify-center px-6">
      <div className="w-full max-w-md p-8 md:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-xl flex flex-col gap-6">
        {/* Logo & Mode Switcher */}
        <div className="flex flex-col items-center text-center gap-3">
          <Logo variant="light" showTagline={true} />
          <h2 className="text-2xl font-display font-extrabold uppercase tracking-tight text-brand-charcoal mt-2">
            {mode === 'login'
              ? (isArabic ? 'تسجيل الدخول للنخبة' : 'VIP Client Sign In')
              : (isArabic ? 'إنشاء حساب جديد' : 'Create Prestige Account')}
          </h2>
        </div>

        {/* Mode Tabs */}
        <div className="flex p-1 rounded-2xl bg-zinc-100 border border-zinc-200">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide transition-all ${
              mode === 'login' ? 'bg-white text-brand-charcoal shadow-sm' : 'text-zinc-500'
            }`}
          >
            {isArabic ? 'تسجيل الدخول' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide transition-all ${
              mode === 'register' ? 'bg-white text-brand-charcoal shadow-sm' : 'text-zinc-500'
            }`}
          >
            {isArabic ? 'حساب جديد' : 'Register'}
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase text-zinc-500 font-bold">Full Name *</label>
              <div className="relative">
                <User className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Al-Mansoor"
                  className="w-full ps-10 pe-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-brand-charcoal"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase text-zinc-500 font-bold">Email Address *</label>
            <div className="relative">
              <Mail className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@domain.sa"
                className="w-full ps-10 pe-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-brand-charcoal"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase text-zinc-500 font-bold">Phone Number</label>
              <div className="relative">
                <Phone className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 50 000 0000"
                  className="w-full ps-10 pe-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-brand-charcoal"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase text-zinc-500 font-bold">Password *</label>
            <div className="relative">
              <Lock className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full ps-10 pe-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-brand-charcoal"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="lemon"
            size="lg"
            disabled={loading}
            fullWidth
            icon={<ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
            className="mt-2"
          >
            {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to Portal' : 'Create VIP Account'}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 pt-2 border-t border-zinc-100 text-[11px] text-zinc-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-brand-charcoal" />
          <span>256-bit Encrypted Sovereign Authentication</span>
        </div>
      </div>
    </div>
  );
};
