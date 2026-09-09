import React, { useState } from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { language } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "The Rolls-Royce Spectre was delivered directly to the private jet steps at King Khalid Airport. Pristine condition, exquisite whisper-quiet performance, and the concierge was truly world-class.",
      quoteAr: "تم تسليم رولز رويس سبكتر مباشرة أمام سلم الطائرة الخاصة بمطار الملك خالد. حالة السيارة لا تشوبها شائبة وعزلها الصوتي خيالي، وتعامل فريق الكونسيرج راقٍ ومحترف للغاية.",
      author: "HRH Prince Khalid Al-Saud",
      role: "Private Aviation Client • Riyadh",
      roleAr: "عميل الطيران الخاص • الرياض",
      vehicle: "Rolls-Royce Spectre",
      rating: 5
    },
    {
      quote: "The Porsche 911 GT3 RS is a masterpiece. Flawless ceramic brakes, telepathic steering response, and seamless digital booking. The only luxury rental brand I trust across the GCC.",
      quoteAr: "سيارة بورشه GT3 RS تحفة هندسية بحق. المكابح السيراميكية واستجابة المقود فورية، وتجربة الحجز الرقمية كانت سلسة وسريعة بدون أي تعقيد. المنصة الأولى للسيارات الفارهة.",
      author: "Faisal Bin Hamad",
      role: "Automotive Collector • Dubai & Jeddah",
      roleAr: "جامع سيارات ومستثمر • دبي وجدة",
      vehicle: "Porsche 911 GT3 RS",
      rating: 5
    },
    {
      quote: "Unmatched comfort and presence for our international delegation in AlUla. The Maybach S 680 made inter-city transfers between the resort and conference pavilions completely effortless.",
      quoteAr: "راحة لا تضاهى وهيبة ملكية لوفدنا الدولي في العلا. مرسيدس مايباخ جعلت التنقل بين المنتجع وقاعات المؤتمرات في غاية السلاسة والراحة التامة.",
      author: "Alexander Vance",
      role: "Global Executive Partner • AlUla & Riyadh",
      roleAr: "شريك تنفيذي دولي • العلا والرياض",
      vehicle: "Mercedes-Maybach S 680",
      rating: 5
    }
  ];

  const current = testimonials[activeIndex];
  const isArabic = language === 'ar';

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-28 md:py-36 bg-brand-light text-brand-charcoal overflow-hidden border-b border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Controls */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-brand-lemon" />
              <span className="text-xs uppercase font-semibold tracking-label-luxury text-zinc-400">
                08 / {isArabic ? 'شهادات كبار العملاء' : 'VIP REVIEWS'}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight-luxury text-brand-charcoal">
              {isArabic ? 'ثقة النخبة والشخصيات المرموقة' : 'TRUSTED BY THE DISCERNING FEW'}
            </h2>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={prev}
                className="p-3.5 rounded-full border border-zinc-300 hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-3.5 rounded-full border border-zinc-300 hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold text-zinc-400 ms-2">
                0{activeIndex + 1} / 0{testimonials.length}
              </span>
            </div>
          </div>

          {/* Right Column: Large Editorial Quote */}
          <div className="lg:col-span-8 p-8 md:p-12 rounded-3xl bg-white border border-zinc-200 shadow-sm relative">
            <Quote className="w-12 h-12 text-brand-lemon/40 mb-6" />

            <blockquote className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-charcoal leading-relaxed mb-8">
              "{isArabic ? current.quoteAr : current.quote}"
            </blockquote>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-100">
              <div className="flex flex-col">
                <span className="text-base font-bold text-brand-charcoal">{current.author}</span>
                <span className="text-xs text-zinc-500 font-medium">{isArabic ? current.roleAr : current.role}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100">
                <span className="text-xs text-zinc-700 font-semibold">{current.vehicle}</span>
                <div className="flex text-amber-500 ms-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
