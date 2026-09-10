import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useI18n } from '../../i18n/i18nContext';
import { Button } from '../common/Button';
import { Check, Tag, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export const StepAddonsPricing: React.FC = () => {
  const {
    selectedVehicle,
    addons,
    toggleAddon,
    promoCode,
    promoData,
    applyPromoCode,
    removePromoCode,
    days,
    baseTotal,
    addonsTotal,
    discountAmount,
    vatAmount,
    depositAmount,
    totalAmount,
    setStep
  } = useBooking();

  const { t, language, direction } = useI18n();
  const isArabic = language === 'ar';

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const [validating, setValidating] = useState(false);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    setValidating(true);
    const res = await applyPromoCode(inputCode.trim());
    setValidating(false);
    if (res.success) {
      setPromoMessage({ text: res.message });
      setInputCode('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  if (!selectedVehicle) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-500">Please select a vehicle first.</p>
        <Button variant="charcoal" onClick={() => setStep(2)} className="mt-4">
          Select Vehicle
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left Column: Bespoke Add-Ons Selection (7 cols) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-label-luxury text-zinc-400">
            STEP 03 • BESPOKE PRIVILEGES
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight-luxury text-brand-charcoal">
            {isArabic ? 'الخدمات الإضافية والتأمين' : 'Tailor Your Mobility Experience'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-normal">
            {isArabic
              ? 'اختر باقات الراحة والتنقل الحصرية لرحلة استثنائية لا تُنسى.'
              : 'Select white-glove enhancements for an effortless, prestigious journey.'}
          </p>
        </div>

        {/* Addon Options List */}
        <div className="flex flex-col gap-4">
          {addons.map((addon) => {
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 sm:gap-4 active:scale-[0.99] touch-manipulation ${
                  addon.selected
                    ? 'border-brand-charcoal bg-white shadow-md'
                    : 'border-zinc-200/80 bg-zinc-50 hover:bg-white'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                      addon.selected
                        ? 'bg-brand-lemon text-brand-charcoal'
                        : 'border-2 border-zinc-300 bg-white'
                    }`}
                  >
                    {addon.selected && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-tight text-brand-charcoal">
                      {isArabic ? addon.nameAr : addon.name}
                    </span>
                    <span className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 leading-relaxed font-normal">
                      {isArabic ? addon.descriptionAr : addon.description}
                    </span>
                  </div>
                </div>

                <div className="text-end shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-brand-charcoal">
                    +{addon.price.toLocaleString()} SAR
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Promo Code Box */}
        <div className="p-4 sm:p-6 rounded-2xl bg-zinc-100 border border-zinc-200 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wider text-zinc-600 font-bold flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-brand-charcoal" />
            {t('booking.applyPromo')}
          </span>

          {promoData && promoData.valid ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-brand-lemon/20 border border-brand-lemon/40">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-charcoal" />
                <span className="text-xs font-bold text-brand-charcoal">
                  CODE: {promoCode} (-{promoData.discountPercent}%)
                </span>
              </div>
              <button
                onClick={removePromoCode}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder={t('booking.promoPlaceholder')}
                className="flex-1 px-3 sm:px-4 py-2.5 rounded-xl bg-white border border-zinc-300 text-xs uppercase font-bold focus:outline-none focus:border-brand-charcoal"
              />
              <Button type="submit" variant="charcoal" size="sm" disabled={validating}>
                {validating ? 'Checking...' : 'Apply'}
              </Button>
            </form>
          )}

          {promoMessage && (
            <p className={`text-xs font-medium ${promoMessage.isError ? 'text-red-600' : 'text-emerald-700 font-bold'}`}>
              {promoMessage.text}
            </p>
          )}
        </div>
      </div>

      {/* Right Column: Live Pricing Ledger Card (5 cols) */}
      <div className="lg:col-span-5 p-5 sm:p-8 rounded-3xl bg-brand-charcoal text-white border border-white/10 shadow-2xl flex flex-col justify-between gap-6 sm:gap-8">
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <span className="text-xs uppercase tracking-label-luxury font-bold text-brand-lemon">
              {t('booking.bookingSummary')}
            </span>
            <span className="text-xs text-zinc-400 font-semibold">
              {days} {t('booking.days')}
            </span>
          </div>

          {/* Vehicle Snapshot */}
          <div className="flex items-center gap-4">
            <img
              src={selectedVehicle.images[0]}
              alt={selectedVehicle.name}
              className="w-20 h-14 object-cover rounded-xl border border-white/10"
            />
            <div className="flex flex-col">
              <span className="text-xs text-zinc-400 uppercase font-semibold">{selectedVehicle.brand}</span>
              <span className="text-base font-bold font-display uppercase text-white">{selectedVehicle.name}</span>
              <span className="text-xs text-brand-lemon font-bold">{selectedVehicle.pricePerDay} SAR / day</span>
            </div>
          </div>

          {/* Pricing Ledger Items */}
          <div className="flex flex-col gap-3 text-xs pt-4 border-t border-white/10">
            <div className="flex justify-between text-zinc-300">
              <span className="font-normal">{t('booking.baseRate')} ({days} days)</span>
              <span className="font-bold">{baseTotal.toLocaleString()} SAR</span>
            </div>

            {addonsTotal > 0 && (
              <div className="flex justify-between text-zinc-300">
                <span className="font-normal">Selected Add-Ons</span>
                <span className="font-bold">+{addonsTotal.toLocaleString()} SAR</span>
              </div>
            )}

            {discountAmount > 0 && (
              <div className="flex justify-between text-brand-lemon font-bold">
                <span>VIP Promo Privilege</span>
                <span>-{discountAmount.toLocaleString()} SAR</span>
              </div>
            )}

            <div className="flex justify-between text-zinc-300">
              <span className="font-normal">{t('booking.vat')}</span>
              <span className="font-bold">{vatAmount.toFixed(2)} SAR</span>
            </div>

            <div className="flex justify-between text-zinc-400 pt-2 border-t border-white/5 font-medium">
              <span>{t('booking.deposit')}</span>
              <span>{depositAmount.toLocaleString()} SAR (Hold)</span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-baseline justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">{t('booking.total')}</span>
              <span className="text-xs text-brand-lemon font-medium">Includes 15% VAT</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-display font-black text-white">
                {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-zinc-400 font-bold">SAR</span>
            </div>
          </div>
        </div>

        {/* Stepper Navigation Actions */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
          <Button
            variant="glass"
            size="md"
            onClick={() => setStep(2)}
            icon={<ArrowLeft className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
          >
            {t('booking.back')}
          </Button>

          <Button
            variant="lemon"
            size="lg"
            onClick={() => setStep(4)}
            icon={<ArrowRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
          >
            {isArabic ? 'المتابعة للتأكيد والبيانات' : 'Proceed to Confirmation'}
          </Button>
        </div>
      </div>
    </div>
  );
};
