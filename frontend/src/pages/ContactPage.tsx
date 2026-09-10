import React, { useState } from 'react';
import { useI18n } from '../i18n/i18nContext';
import { api } from '../services/api';
import { Button } from '../components/common/Button';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language } = useI18n();
  const isArabic = language === 'ar';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+966 ');
  const [serviceType, setServiceType] = useState('VIP Concierge');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/inquiries', {
        name,
        email,
        phone,
        serviceType,
        message
      });
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-brand-light min-h-screen text-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center mb-12 flex flex-col gap-2">
          <span className="text-xs font-mono uppercase tracking-wide-luxury text-zinc-400">
            ROYAL CONCIERGE DIRECT
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-brand-charcoal">
            {isArabic ? 'تواصل مع إدارة الكونسيرج' : 'Connect with Royal Concierge'}
          </h1>
          <p className="text-zinc-500 text-sm font-light">
            {isArabic
              ? 'فريقنا متاح على مدار الساعة للإجابة على استفساراتكم وترتيب رحلاتكم الخاصة.'
              : 'Our executive concierge team is at your disposal 24/7 for bespoke inquiries.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          {/* Contact Info Card (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-brand-charcoal text-white flex flex-col justify-between gap-8 shadow-xl">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono uppercase tracking-wide-luxury text-brand-lemon">
                HEADQUARTERS & DIRECT HOTLINE
              </span>
              <h3 className="text-2xl font-display font-bold uppercase">CAR 2 GO LUXURY MOBILITY</h3>

              <div className="flex flex-col gap-4 text-sm text-zinc-300 font-mono">
                <a href="tel:+966800227246" className="flex items-center gap-3 hover:text-brand-lemon transition-colors">
                  <div className="p-2.5 rounded-xl bg-white/10 text-brand-lemon">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+966 800 227 246</span>
                </a>

                <a href="mailto:concierge@car2go.sa" className="flex items-center gap-3 hover:text-brand-lemon transition-colors">
                  <div className="p-2.5 rounded-xl bg-white/10 text-brand-lemon">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>concierge@car2go.sa</span>
                </a>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 text-brand-lemon shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>King Fahd Rd, Al Olaya District, Riyadh, Kingdom of Saudi Arabia</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
              Response SLA: Under 15 minutes for all VIP reservation inquiries.
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-zinc-200 shadow-md">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                <h3 className="text-xl font-bold uppercase text-brand-charcoal">
                  {isArabic ? 'تم استلام طلبكم بنجاح' : 'Inquiry Received'}
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm">
                  {isArabic
                    ? 'سيقوم مدير الكونسيرج بالتواصل معكم عبر الهاتف أو البريد الإلكتروني خلال دقائق.'
                    : 'A dedicated concierge director will contact you via phone or email shortly.'}
                </p>
                <Button variant="charcoal" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-500 font-semibold">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tariq Al-Mansoor"
                    className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-brand-charcoal"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono uppercase text-zinc-500 font-semibold">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@domain.sa"
                      className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-brand-charcoal"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono uppercase text-zinc-500 font-semibold">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold font-mono focus:outline-none focus:border-brand-charcoal"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-500 font-semibold">Service Type</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-brand-charcoal cursor-pointer"
                  >
                    <option value="VIP Concierge">VIP Concierge & Runway Delivery</option>
                    <option value="Executive Chauffeur">Executive Chauffeur Retainer</option>
                    <option value="Diplomatic Fleet">Diplomatic / Corporate Fleet</option>
                    <option value="GCC Cross-Border">GCC Cross-Border Travel</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-500 font-semibold">Message & Dates *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details on requested vehicles, flight numbers, or dates..."
                    className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-brand-charcoal"
                  />
                </div>

                <Button
                  type="submit"
                  variant="lemon"
                  size="lg"
                  disabled={submitting}
                  icon={<Send className="w-4 h-4" />}
                >
                  {submitting ? 'Transmitting...' : 'Send to VIP Concierge'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

