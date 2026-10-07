// src/components/content-sections/Footer.tsx

import COLUMNS from "@/lib/constants/footer-columns";

export default function Footer() {
  return (
    <footer className="border-t border-gold-500/15 bg-ink">
      <div className="mx-auto grid max-w-400 gap-14 px-6 py-20 lg:grid-cols-5 lg:px-12">
        <div className="lg:col-span-2">
          <p className="font-display text-3xl tracking-[0.3em]">
            AMAZING<span className="text-gold-500"> SPORTS CARS</span>
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
            The art of velocity. Hand-built in limited numbers for those who
            appreciate the difference.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-[11px] uppercase tracking-[0.35em] text-gold-500">
              {col.title}
            </h3>
            <ul className="mt-6 space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#top"
                    className="text-sm text-bone/65 transition-colors hover:text-gold-300"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="hairline" />
      <div className="mx-auto flex max-w-350 flex-col items-center justify-between gap-3 px-6 py-8 text-[11px] uppercase tracking-[0.25em] text-mist sm:flex-row lg:px-12">
        <p>
          © {new Date().getFullYear()} Amazing Sports Cars. A fictional company.
        </p>
        <p>Imagery shown is illustrative</p>
      </div>
    </footer>
  );
}
