import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../i18n/i18nContext';
import { api } from '../../services/api';
import { Button } from '../common/Button';
import { CheckCircle2, ShieldCheck, ArrowLeft, User, Mail, Phone, FileText } from 'lucide-react';

interface StepCustomerConfirmProps {
  onBookingComplete?: (booking: any) => void;
}

export const StepCustomerConfirm: React.FC<StepCustomerConfirmProps> = ({
  onBookingComplete = () => {}
}) => {
  const {
    pickupLocation,
    returnLocation,
    pickupDate,
    returnDate,
    selectedVehicle,
    addons,
    promoCode,
    notes,
    setNotes,
    days,
    baseTotal,
    addonsTotal,
    discountAmount,
    vatAmount,
    depositAmount,
    totalAmount,
    setStep,
    resetBooking
  } = useBooking();

  const { user, token } = useAuth();
  const { t, language, direction } = useI18n();
  const isArabic = language === 'ar';

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+966 ');
  const [idNumber, setIdNumber] = useState(user?.idNumber || '');
  const [licenseNumber, setLicenseNumber] = useState(user?.drivingLicenseNumber || '');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card / Apple Pay (Simulated)');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle) return;
    if (!termsAccepted) {
      setErrorMessage(isArabic ? 'يرجى الموافقة على شروط التأجير للمتابعة.' : 'Please accept terms to proceed.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        vehicleId: selectedVehicle._id,
        pickupLocation,
        returnLocation,
        pickupDate,
        returnDate,
        addons: addons.filter(a => a.selected),
        promoCode: promoCode || undefined,
        customerDetails: {
          name,
          email,
          phone,
          idNumber,
          licenseNumber,
          paymentMethod
        },
        notes
      };

      const res = await api.post('/bookings', payload, token || undefined);
      if (res.success && res.booking) {
        setConfirmedBooking(res.booking);
        onBookingComplete(res.booking);
      } else {
        setErrorMessage(res.message || 'Booking submission failed');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Booking submission failed. Please verify selected dates.');
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmedBooking) {
    return (
      <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-3xl bg-brand-charcoal text-white border border-white/10 shadow-2xl flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 rounded-full bg-brand-lemon/20 text-brand-lemon flex items-center justify-center border border-brand-lemon/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-label-luxury font-bold text-brand-lemon">
            RESERVATION CONFIRMED
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight-luxury text-white">
            {isArabic ? 'تم تأكيد حجزك الملكي بنجاح' : 'Your Prestige Journey is Secured'}
          </h2>
          <p className="text-sm text-zinc-400 font-normal max-w-md">
            {isArabic
              ? `تم إصدار المرجع الخاص بحجزك: ${confirmedBooking.bookingReference}. سيتواصل معك مدير الكونسيرج الملكي لترتيب التسليم.`
              : `Your booking reference is ${confirmedBooking.bookingReference}. Our personal concierge manager has been assigned to coordinate your arrival.`}
          </p>
        </div>

        {/* Boarding Pass Card */}
        <div className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 text-start flex flex-col gap-4 text-xs">
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <span className="text-zinc-400 font-medium">REFERENCE:</span>
            <span className="text-brand-lemon font-bold text-sm">{confirmedBooking.bookingReference}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 font-medium">VEHICLE:</span>
            <span className="text-white font-bold">{confirmedBooking.vehicleName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 font-medium">PICKUP HUB:</span>
            <span className="text-white truncate max-w-[200px] font-medium">{confirmedBooking.pickupLocation}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 font-medium">DURATION:</span>
            <span className="text-white font-bold">{confirmedBooking.days} Days</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-white/10 text-sm">
            <span className="text-zinc-400 font-medium">TOTAL AMOUNT:</span>
            <span className="text-brand-lemon font-extrabold">{confirmedBooking.totalAmount?.toLocaleString()} SAR</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="lemon"
            size="lg"
            onClick={() => {
              resetBooking();
              window.location.href = '/';
            }}
          >
            {isArabic ? 'العودة للرئيسية' : 'Return to Home'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 md:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-lg flex flex-col gap-8">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-label-luxury text-zinc-400">
          STEP 04 • GUEST IDENTIFICATION & CONFIRMATION
        </span>
        <h2 className="text-3xl font-display font-extrabold uppercase tracking-tight-luxury text-brand-charcoal">
          {isArabic ? 'بيانات الضيف وتأكيد الحجز' : 'Guest Identification & Verification'}
        </h2>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
          {errorMessage}
        </div>
      )}

      {/* Guest Credentials Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase text-zinc-500 font-bold flex items-center gap-1.5">
            <User className="w-4 h-4 text-brand-charcoal" />
            {t('booking.fullName')} *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Tariq Al-Mansoor"
            className="w-full p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-charcoal"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase text-zinc-500 font-bold flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-brand-charcoal" />
            {t('booking.email')} *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="client@domain.sa"
            className="w-full p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-charcoal"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase text-zinc-500 font-bold flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-brand-charcoal" />
            {t('booking.phone')} *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+966 50 000 0000"
            className="w-full p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-charcoal"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase text-zinc-500 font-bold flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-brand-charcoal" />
            {t('booking.idNumber')}
          </label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="National ID / Passport No."
            className="w-full p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-sm font-semibold text-brand-charcoal focus:outline-none focus:border-brand-charcoal"
          />
        </div>
      </div>

      {/* Special Requests */}
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase text-zinc-500 font-bold">
          {t('booking.notes')}
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Private aviation terminal flight #, chilled sparkling water, specific child seat age..."
          className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-sm text-brand-charcoal focus:outline-none focus:border-brand-charcoal font-normal"
        />
      </div>

      {/* Payment Selection & Terms */}
      <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase text-zinc-500 font-bold">Payment Method</span>
          <span className="text-xs text-zinc-700 font-semibold">Pre-Authorized Card / Mada</span>
        </div>

        <label className="flex items-start gap-3 cursor-pointer pt-2 border-t border-zinc-200">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 rounded text-brand-charcoal focus:ring-brand-lemon cursor-pointer"
          />
          <span className="text-xs text-zinc-600 font-normal leading-relaxed">
            {isArabic
              ? 'أوافق على الشروط والأحكام الخاصة بالتأجير الفاخر، وسياسة التأمين والوديعة المستردة المعتمدة لدى كار تو جو.'
              : 'I acknowledge and agree to CAR 2 GO VIP Mobility Terms, transparent deposit release policy, and vehicle provenance standards.'}
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => setStep(3)}
          icon={<ArrowLeft className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />}
        >
          {t('booking.back')}
        </Button>

        <Button
          type="submit"
          variant="lemon"
          size="lg"
          disabled={submitting}
          icon={<ShieldCheck className="w-4 h-4" />}
        >
          {submitting ? 'Verifying & Reserving...' : t('booking.confirmBooking')}
        </Button>
      </div>
    </form>
  );
};
