'use client';

import { CONTACT_MODE_EVENT, type ContactMode } from './ContactForm';

function setMode(mode: ContactMode) {
  window.dispatchEvent(
    new CustomEvent(CONTACT_MODE_EVENT, { detail: { mode } }),
  );
  const target = document.getElementById('message-form');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Two pill CTAs in the contact hero. Clicking flips the form mode via a
 * custom event and smooth-scrolls to the form — no full-page reload, no
 * query-string flicker.
 */
export default function ContactHeroCTAs() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
      <button
        type="button"
        onClick={() => setMode('message')}
        className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition"
      >
        Send a message
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setMode('call')}
        className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 px-5 py-3 text-sm font-semibold text-neutral-50 hover:bg-neutral-50/10 transition"
      >
        Request a call
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
      </button>
    </div>
  );
}
