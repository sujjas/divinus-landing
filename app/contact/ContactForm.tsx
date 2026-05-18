'use client';

import { useEffect, useState } from 'react';
import {
  SUBJECTS,
  COMMUNITY_ROUTES,
  type SubjectId,
  type ContactMode,
} from './contact-form-data';

export type { SubjectId, ContactMode };
export { SUBJECTS };

type Props = { initialRoute?: string; initialMode?: ContactMode };

// Listened on `window`. Fired by hero CTAs to flip the form mode without a
// full-page reload. See ContactHeroCTAs.tsx.
export const CONTACT_MODE_EVENT = 'divinus:contact-mode';

export default function ContactForm({ initialRoute, initialMode = 'message' }: Props) {
  const [mode, setMode] = useState<ContactMode>(initialMode);
  const [subject, setSubject] = useState<SubjectId>('general');
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialRoute) return;
    if (COMMUNITY_ROUTES.has(initialRoute)) {
      setSubject('communities');
    } else if ((SUBJECTS as readonly { id: string }[]).some(s => s.id === initialRoute)) {
      setSubject(initialRoute as SubjectId);
    }
  }, [initialRoute]);

  useEffect(() => {
    if (initialMode === 'call' || initialMode === 'message') {
      setMode(initialMode);
    }
  }, [initialMode]);

  useEffect(() => {
    function onModeEvent(e: Event) {
      const detail = (e as CustomEvent<{ mode?: ContactMode }>).detail;
      if (detail?.mode === 'call' || detail?.mode === 'message') {
        setMode(detail.mode);
      }
    }
    window.addEventListener(CONTACT_MODE_EVENT, onModeEvent);
    return () => window.removeEventListener(CONTACT_MODE_EVENT, onModeEvent);
  }, []);

  const subjectLabel = SUBJECTS.find(s => s.id === subject)?.label ?? '';
  const showCommunityHint = initialRoute && COMMUNITY_ROUTES.has(initialRoute);
  const communityName = initialRoute === 'genesis-woman' ? 'Genesis Woman' : 'Men of Substance';
  const isCall = mode === 'call';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const fd = new FormData(e.currentTarget);
      const payload = {
        mode,
        subject,
        subjectLabel,
        route: initialRoute ?? null,
        name: fd.get('name'),
        email: fd.get('email'),
        organisation: fd.get('organisation'),
        phone: fd.get('phone'),
        preferredTime: fd.get('preferredTime'),
        message: fd.get('message'),
      };
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or email hello@divinus.com.');
      console.error('[contact] submission failed', err);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12">
        {/* Info column — direct lines */}
        <aside className="lg:col-span-5">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Direct lines</p>
          <h2 className="mt-6 text-[clamp(28px,4vw,48px)] font-bold display-tight text-neutral-50 text-balance">
            We will follow up<br/>
            <span className="text-neutral-500">within two working days.</span>
          </h2>

          <dl className="mt-10 space-y-7">
            <div>
              <dt className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Email</dt>
              <dd>
                <a href="mailto:hello@divinus.com" className="text-lg font-semibold text-neutral-100 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 transition">
                  hello@divinus.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Press & media</dt>
              <dd>
                <a href="mailto:press@divinus.com" className="text-base font-semibold text-neutral-200 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 transition">
                  press@divinus.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Partnerships</dt>
              <dd>
                <a href="mailto:partners@divinus.com" className="text-base font-semibold text-neutral-200 underline decoration-neutral-700 underline-offset-[6px] hover:decoration-neutral-50 transition">
                  partners@divinus.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Response time</dt>
              <dd className="text-base text-neutral-300 leading-[1.6]">
                We will follow up within two working days.
              </dd>
            </div>
            <div>
              <dt className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Office</dt>
              <dd className="text-base text-neutral-300 leading-[1.6]">
                Headquartered with global ambition and African conviction.
              </dd>
            </div>
          </dl>
        </aside>

        {/* Form */}
        <form
          id="message-form"
          onSubmit={onSubmit}
          className="lg:col-span-7 lg:pl-6 scroll-mt-32"
          aria-labelledby="form-heading"
        >
          {/* Mode toggle */}
          <div
            role="tablist"
            aria-label="How would you like us to reply?"
            className="mb-8 inline-flex rounded-full border border-neutral-800 bg-neutral-900/40 p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isCall}
              onClick={() => setMode('message')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                !isCall
                  ? 'bg-neutral-50 text-neutral-950'
                  : 'text-neutral-400 hover:text-neutral-100'
              }`}
            >
              Send a message
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isCall}
              onClick={() => setMode('call')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                isCall
                  ? 'bg-neutral-50 text-neutral-950'
                  : 'text-neutral-400 hover:text-neutral-100'
              }`}
            >
              Request a call
            </button>
          </div>

          <p id="form-heading" className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-6">
            {isCall ? 'Request a call' : 'Send a message'} · routed to {subjectLabel}
          </p>

          {showCommunityHint && !submitted && (
            <p className="mb-6 rounded-md border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-sm text-neutral-300">
              You’re applying to <span className="font-semibold text-neutral-50">{communityName}</span>.
              We’ll route this to the Exchange team.
            </p>
          )}

          {submitted ? (
            <div className="rounded-md border border-neutral-800 bg-neutral-900/60 px-6 py-10 text-center">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">Received</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-neutral-50">
                {isCall ? 'Thank you. We will call you back.' : 'Thank you. We have your message.'}
              </h3>
              <p className="mt-3 text-sm text-neutral-400">
                We will follow up within two working days.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="block text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Name</span>
                  <input
                    type="text" name="name" required autoComplete="name"
                    className="w-full bg-transparent border border-neutral-800 rounded-md px-4 py-3 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                    placeholder="Your full name"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Email</span>
                  <input
                    type="email" name="email" required autoComplete="email"
                    className="w-full bg-transparent border border-neutral-800 rounded-md px-4 py-3 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Organisation (optional)</span>
                <input
                  type="text" name="organisation" autoComplete="organization"
                  className="w-full bg-transparent border border-neutral-800 rounded-md px-4 py-3 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                  placeholder="Company or institution"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Subject</span>
                <div className="relative">
                  <select
                    name="subject"
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value as SubjectId)}
                    className="w-full appearance-none bg-transparent border border-neutral-800 rounded-md px-4 py-3 pr-12 text-base text-neutral-100 focus:outline-none focus:border-neutral-500 transition"
                  >
                    {SUBJECTS.map(s => (
                      <option key={s.id} value={s.id} className="bg-neutral-950 text-neutral-100">
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500"
                    fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                <span className="block mt-2 text-xs text-neutral-600">
                  {SUBJECTS.find(s => s.id === subject)?.helper}
                </span>
              </label>

              {isCall ? (
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="block text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Phone number</span>
                    <input
                      type="tel" name="phone" required autoComplete="tel"
                      className="w-full bg-transparent border border-neutral-800 rounded-md px-4 py-3 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                      placeholder="+256 700 000 000"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">Preferred time (optional)</span>
                    <input
                      type="text" name="preferredTime"
                      className="w-full bg-transparent border border-neutral-800 rounded-md px-4 py-3 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition"
                      placeholder="e.g. weekday afternoons, GMT+3"
                    />
                  </label>
                </div>
              ) : null}

              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">
                  {isCall ? 'Anything we should know before we call? (optional)' : 'Message'}
                </span>
                <textarea
                  name="message"
                  required={!isCall}
                  rows={isCall ? 4 : 6}
                  className="w-full bg-transparent border border-neutral-800 rounded-md px-4 py-3 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition resize-y"
                  placeholder={
                    isCall
                      ? 'Brief context so we come to the call prepared.'
                      : 'What would you like us to know? Context, timeline, and what a useful response looks like.'
                  }
                />
              </label>

              {error && (
                <p role="alert" className="rounded-md border border-red-900/60 bg-red-950/30 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-neutral-500 max-w-xs">
                  By {isCall ? 'requesting a call' : 'sending'} you accept that Divinus may contact you about this enquiry.
                </p>
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {pending ? 'Sending…' : (isCall ? 'Request call' : 'Send message')}
                  <svg className="cta-arrow h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
