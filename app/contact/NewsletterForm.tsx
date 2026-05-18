'use client';

import { useState } from 'react';

type Variant = 'dark' | 'light';

export default function NewsletterForm({ variant = 'dark' }: { variant?: Variant }) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLight = variant === 'light';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const fd = new FormData(e.currentTarget);
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fd.get('email') }),
      });
      if (!res.ok) {
        const data: { error?: string } = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      setError('Could not subscribe right now. Please try again.');
      console.error('[newsletter] subscribe failed', err);
    } finally {
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <div
        className={
          isLight
            ? 'rounded-md border border-neutral-300 bg-white px-6 py-8 text-center'
            : 'rounded-md border border-neutral-800 bg-neutral-900/60 px-6 py-8 text-center'
        }
      >
        <p
          className={`text-xs font-mono uppercase tracking-[0.18em] ${
            isLight ? 'text-neutral-500' : 'text-neutral-500'
          }`}
        >
          Subscribed
        </p>
        <h3
          className={`mt-2 text-xl font-bold tracking-tight ${
            isLight ? 'text-neutral-950' : 'text-neutral-50'
          }`}
        >
          You&apos;re in.
        </h3>
        <p className={`mt-2 text-sm ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
          Expect substance, not noise.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="your@email.com"
        className={
          isLight
            ? 'flex-1 bg-white border border-neutral-300 rounded-full px-5 py-3 text-base text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-700 transition'
            : 'flex-1 bg-transparent border border-neutral-800 rounded-full px-5 py-3 text-base text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 transition'
        }
      />
      <button
        type="submit"
        disabled={pending}
        className={
          (isLight
            ? 'inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-neutral-50 hover:bg-neutral-800 transition whitespace-nowrap'
            : 'inline-flex items-center justify-center gap-2 rounded-full bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition whitespace-nowrap'
          ) + ' disabled:opacity-60 disabled:cursor-not-allowed'
        }
      >
        {pending ? 'Subscribing…' : 'Subscribe'}
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
      </div>
      {error && (
        <p role="alert" className={`text-xs ${isLight ? 'text-red-700' : 'text-red-300'}`}>
          {error}
        </p>
      )}
    </form>
  );
}
