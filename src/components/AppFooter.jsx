export default function AppFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white/60 py-8 mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-medium text-[var(--color-text-secondary)]">Persona Builder v{__APP_VERSION__} &mdash; Inspired by the philosophical approach of Poramate Minsiri</span>
          <span>6-Dimension Deep Analysis Framework</span>
        </div>
        <div className="flex flex-col items-center md:items-end gap-1">
          <span className="opacity-80">Powered by Cloudflare Workers AI &amp; Llama 3.1</span>
          <span className="opacity-50 text-[10px]">Privacy-First: All computation happens in isolated contexts. No data is stored.</span>
        </div>
      </div>
    </footer>
  );
}
