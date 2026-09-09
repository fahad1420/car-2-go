import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { Check } from 'lucide-react';

interface BookingStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const BookingStepper: React.FC<BookingStepperProps> = ({
  currentStep,
  onStepClick = () => {}
}) => {
  const { t } = useI18n();

  const steps = [
    { num: 1, label: t('booking.step1') },
    { num: 2, label: t('booking.step2') },
    { num: 3, label: t('booking.step3') },
    { num: 4, label: t('booking.step4') },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((s) => {
          const isDone = currentStep > s.num;
          const isActive = currentStep === s.num;

          return (
            <button
              key={s.num}
              onClick={() => isDone && onStepClick(s.num)}
              disabled={!isDone && !isActive}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-start ${
                isActive
                  ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-md ring-2 ring-brand-lemon/40'
                  : isDone
                  ? 'bg-zinc-100 text-brand-charcoal border-zinc-200 cursor-pointer hover:bg-zinc-200'
                  : 'bg-zinc-50 text-zinc-400 border-zinc-200/60 cursor-not-allowed opacity-60'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isActive
                    ? 'bg-brand-lemon text-brand-charcoal'
                    : isDone
                    ? 'bg-brand-charcoal text-white'
                    : 'bg-zinc-200 text-zinc-500'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
              </div>
              <span className="text-xs font-bold uppercase tracking-wide truncate">
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
