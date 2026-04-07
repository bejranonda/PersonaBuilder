import { CheckCircle2 } from 'lucide-react';

export default function StepIndicator({ step, stepLabels }) {
  const getStepperClass = (s) => {
    if (step === s) return 'bg-[var(--color-accent)] text-white ring-4 ring-[var(--color-accent)]/15 shadow-md';
    if (step > s) return 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]';
    return 'bg-[var(--color-surface-sunken)] text-[var(--color-text-muted)] border border-[var(--color-border)]';
  };

  const getConnectorClass = (s) => {
    return step > s ? 'bg-[var(--color-accent)]/30' : 'bg-[var(--color-border)]';
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center" title={stepLabels[s - 1]}>
          <div className={'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ' + getStepperClass(s)}>
            {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
          </div>
          {s < 4 && (
            <div className={'w-4 sm:w-8 h-1 mx-1 rounded-full transition-all duration-300 ' + getConnectorClass(s)} />
          )}
        </div>
      ))}
    </div>
  );
}
