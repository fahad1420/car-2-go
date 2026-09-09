import React, { useState } from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { t, language } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const isArabic = language === 'ar';

  const faqs = [
    {
      q: 'What credentials and documents are required to rent a luxury vehicle?',
      qAr: 'ما هي الوثائق والمستندات المطلوبة لاستئجار سيارة فاخرة؟',
      a: 'For Saudi citizens and GCC residents: A valid national ID or resident Iqama, along with a valid driver’s license (minimum 21 years old). For international visitors: An original passport with entry visa, home country driver’s license, and an International Driving Permit (IDP) where required.',
      aAr: 'للمواطنين والمقيمين في دول الخليج: بطاقة الهوية الوطنية أو الإقامة سارية المفعول، مع رخصة قيادة سارية (الحد الأدنى للعمر 21 عاماً). للزوار الدوليين: جواز السفر الأصلي مع تأشيرة الدخول، ورخصة القيادة الوطنية مع رخصة قيادة دولية معتمدة.'
    },
    {
      q: 'How does the refundable security deposit work?',
      qAr: 'كيف يتم التعامل مع التأمين المالي (الوديعة المستردة)؟',
      a: 'A pre-authorization hold is placed on your credit card upon vehicle hand-off. The hold is automatically released within 7 to 14 business days following inspection upon return, ensuring zero hidden deduction.',
      aAr: 'يتم حجز مبلغ التأمين كعملية تفويض معلق على بطاقتك الائتمانية عند استلام السيارة. يتم إلغاء الحجز تلقائياً وإعادة المبلغ كاملاً خلال 7 إلى 14 يوم عمل بعد تسليم وفحص السيارة دون أي رسوم خفية.'
    },
    {
      q: 'Can the vehicle be delivered directly to a private aviation terminal or runway?',
      qAr: 'هل يمكن تسليم السيارة مباشرة في صالة الطيران الخاص أو أمام سلم الطائرة؟',
      a: 'Yes. Our VIP Runway Concierge coordinates with King Khalid Airport, King Abdulaziz Private Aviation, and AlUla air terminals to deliver your vehicle directly to the designated VIP reception area with chilled Arabian refreshments.',
      aAr: 'نعم بالتأكيد. ينسق فريق الكونسيرج الملكي مباشرة مع صالات الطيران الخاص في مطار الملك خالد بجدة والرياض والعلا لتسليم السيارة عند نقطة الاستقبال الخاصة مع الضيافة العربية الفاخرة.'
    },
    {
      q: 'Can I drive the vehicle across GCC borders (UAE, Qatar, Bahrain)?',
      qAr: 'هل يمكنني القيادة والتنقل بالسيارة بين دول الخليج (الإمارات، قطر، البحرين)؟',
      a: 'Yes. We provide official cross-border travel permits, customs documentation, and unified GCC insurance coverage upon request during Step 3 of the booking flow.',
      aAr: 'نعم، نوفر تصاريح السفر الرسمية المعتمدة والتأمين الموحد لدول الخليج عند طلب باقة التنقل الدولي أثناء خطوات الحجز في الموقع.'
    },
    {
      q: 'What is your cancellation and modification policy?',
      qAr: 'ما هي سياسة الإلغاء وتعديل الحجز؟',
      a: 'Reservations can be modified or cancelled free of charge up to 24 hours prior to the scheduled pickup time. Cancellations can be executed seamlessly from your online customer portal.',
      aAr: 'يمكن تعديل أو إلغاء الحجز مجاناً وبكل سهولة حتى 24 ساعة قبل موعد الاستلام المحدد، وذلك بلمسة زر واحدة من خلال لوحة حسابك الشخصي.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-28 md:py-36 bg-brand-light text-brand-charcoal overflow-hidden border-b border-zinc-200/60">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-brand-lemon" />
            <span className="text-xs uppercase font-semibold tracking-label-luxury text-zinc-400">
              10 / {t('faq.tag')}
            </span>
            <span className="w-8 h-[2px] bg-brand-lemon" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight-luxury text-brand-charcoal">
            {t('faq.title')}
          </h2>
          <p className="text-zinc-500 max-w-lg text-sm font-normal">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-zinc-200/80 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-start flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-brand-charcoal hover:text-zinc-600 transition-colors"
                >
                  <span>{isArabic ? faq.qAr : faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-charcoal' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-zinc-600 font-normal leading-relaxed border-t border-zinc-100 pt-4 animate-in fade-in duration-200">
                    {isArabic ? faq.aAr : faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
