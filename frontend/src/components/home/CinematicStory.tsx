import React from 'react';
import { StoryScene3D } from '../3d/StoryScene3D';
import { useI18n } from '../../i18n/i18nContext';
import { Sparkles, Shield, Cpu } from 'lucide-react';

export const CinematicStory: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="relative py-20 sm:py-28 md:py-36 bg-brand-charcoal text-white overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-lemon/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-2.5 sm:gap-3 mb-10 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-brand-lemon" />
            <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-label-luxury text-brand-lemon">
              03 / {t('story.tag')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight sm:tracking-tight-luxury text-white">
            {t('story.title')}
          </h2>
        </div>

        {/* 3D Interactive Presentation + 3 Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* 3D Chassis Canvas Viewer */}
          <div className="lg:col-span-7">
            <StoryScene3D />
          </div>

          {/* 3 Editorial Narrative Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:border-brand-lemon/40 active:scale-[0.99] transition-all duration-300">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-brand-lemon/10 text-brand-lemon flex items-center justify-center mb-3 sm:mb-4">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-1.5 sm:mb-2">
                {t('story.point1Title')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                {t('story.point1Desc')}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:border-brand-lemon/40 active:scale-[0.99] transition-all duration-300">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-brand-lemon/10 text-brand-lemon flex items-center justify-center mb-3 sm:mb-4">
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-1.5 sm:mb-2">
                {t('story.point2Title')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                {t('story.point2Desc')}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:border-brand-lemon/40 active:scale-[0.99] transition-all duration-300">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-brand-lemon/10 text-brand-lemon flex items-center justify-center mb-3 sm:mb-4">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-1.5 sm:mb-2">
                {t('story.point3Title')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                {t('story.point3Desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
