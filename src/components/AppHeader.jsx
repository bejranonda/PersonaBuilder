import { Sparkles } from 'lucide-react';
import StepIndicator from './StepIndicator';
import LanguageSwitcher from './LanguageSwitcher';

export default function AppHeader({ step, lang, setLang, t }) {
  const stepLabels = [t.step1, t.step2, t.step3, t.step4];

  return (
    <header className="border-b border-[var(--color-border)] bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] p-2 rounded-xl shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)] hidden sm:block">
            {t.appTitle}
          </h1>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <StepIndicator step={step} stepLabels={stepLabels} />
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>
    </header>
  );
}
