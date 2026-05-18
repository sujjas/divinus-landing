import Link from 'next/link';
import Logo from './Logo';

const DIVISIONS = [
  { href: '/divisions#ai', label: 'AI / Vision Africa' },
  { href: '/divisions#advisory', label: 'Advisory' },
  { href: '/divisions#exchange', label: 'Exchange' },
  { href: '/divisions#labs', label: 'Labs' },
  { href: '/divisions#capital', label: 'Capital' },
  { href: '/divisions#partners', label: 'Strategic Partners' },
  { href: '/divisions#foundation', label: 'Foundation' },
];

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/divisions', label: 'Divisions' },
  { href: '/communities', label: 'Communities' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Insights' },
  { href: '/contact', label: 'Connect' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/divinus_investment_group?igsh=OHpibzQ1eWNtN2l5&utm_source=qr',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/divinus_ai?s=21&t=8ojLx-hNg3eHv6iQt1Q5UA',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.261 5.632 5.902-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

function SocialLinks({ className, linkClassName }: { className?: string; linkClassName: string }) {
  return (
    <div className={className}>
      {SOCIALS.map(s => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={linkClassName}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-black text-neutral-300 border-t border-neutral-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-8">
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="h-7 w-auto text-neutral-50" />
              <span className="text-xl font-bold tracking-tight text-neutral-50">Divinus</span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-neutral-500 max-w-xs">
              Divinus Investment Group Limited
            </p>
            <p className="mt-6 text-sm text-neutral-400 italic">
              Built for Substance. Structured for Scale.
            </p>
            <SocialLinks
              className="mt-6 flex items-center gap-3"
              linkClassName="text-neutral-500 hover:text-neutral-50 transition"
            />
            <p className="mt-8 text-xs text-neutral-600">© 2026 Divinus Investment Group</p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-4">Navigate</p>
            <ul className="space-y-2.5 text-sm">
              {NAV.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-neutral-400 hover:text-neutral-50 transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-4">Divisions</p>
            <ul className="space-y-2.5 text-sm">
              {DIVISIONS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-neutral-400 hover:text-neutral-50 transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-4">Legal</p>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-neutral-400 hover:text-neutral-50 transition">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-neutral-50 transition">Terms of Use</a></li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-neutral-500">
              Divinus Capital is a financial education division. Not regulated financial advice.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-mono text-neutral-600">divinus.com</p>
          <SocialLinks
            className="flex items-center gap-4"
            linkClassName="text-neutral-600 hover:text-neutral-300 transition"
          />
          <p className="text-xs text-neutral-600">All rights reserved · 2026</p>
        </div>
      </div>
    </footer>
  );
}
