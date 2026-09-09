import React from 'react';
import { useI18n } from '../../i18n/i18nContext';
import { CheckCircle2, ShieldCheck, Clock, Award } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const { t } = useI18n();

  const pillars = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-brand-charcoal" />,
      num: '01',
      title: t('whyUs.card1Title'),
      desc: t('whyUs.card1Desc')
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-charcoal" />,
      num: '02',
      title: t('whyUs.card2Title'),
      desc: t('whyUs.card2Desc')
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-charcoal" />,
      num: '03',
      title: t('whyUs.card3Title'),
      desc: t('whyUs.card3Desc')
    },
    {
      icon: <Award className="w-6 h-6 text-brand-charcoal" />,
      num: '04',
      title: t('whyUs.card4Title'),
      desc: t('whyUs.card4Desc')
    }
  ];

  return (
    <section className="py-28 md:py-36 bg-brand-pure text-brand-charcoal overflow-hidden border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-20">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-brand-lemon" />
            <span className="text-xs uppercase font-semibold tracking-label-luxury text-zinc-400">
              07 / {t('whyUs.tag')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight-luxury text-brand-charcoal">
            {t('whyUs.title')}
          </h2>
        </div>

        {/* 4 Editorial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/70 hover:border-brand-lemon hover:bg-white transition-all duration-300 flex flex-col justify-between gap-8 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-white shadow-sm group-hover:bg-brand-lemon transition-colors">
                  {item.icon}
                </div>
                <span className="text-2xl font-black text-zinc-300 group-hover:text-brand-charcoal transition-colors">
                  {item.num}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold uppercase tracking-tight text-brand-charcoal">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
