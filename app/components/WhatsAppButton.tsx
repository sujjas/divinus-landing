'use client';

// TODO: replace with the client's WhatsApp number (digits only, country code first, no '+').
// Until set, the link points to wa.me's landing page so the icon is still visible for review.
const WHATSAPP_NUMBER = '';

export default function WhatsAppButton() {
  const href = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : 'https://wa.me/';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-110 hover:shadow-[0_6px_32px_rgba(37,211,102,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="#fff"
        aria-hidden="true"
      >
        <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.47 1.65 6.35L3 29l6.85-1.6A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.85a11.84 11.84 0 0 1-6.03-1.65l-.43-.26-4.07.95.99-3.96-.28-.45A11.85 11.85 0 1 1 16 26.85zm6.51-8.87c-.36-.18-2.1-1.03-2.42-1.15-.32-.12-.56-.18-.79.18-.23.36-.9 1.15-1.1 1.38-.2.23-.41.26-.77.09-.36-.18-1.52-.56-2.9-1.79-1.07-.95-1.8-2.13-2.01-2.49-.2-.36-.02-.55.15-.73.16-.16.36-.41.54-.62.18-.2.24-.36.36-.6.12-.23.06-.44-.03-.62-.09-.18-.79-1.9-1.08-2.6-.28-.68-.57-.59-.79-.6l-.67-.01c-.23 0-.6.09-.92.44-.32.35-1.2 1.17-1.2 2.85 0 1.68 1.23 3.3 1.4 3.53.18.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.1-.86 2.4-1.69.3-.83.3-1.54.21-1.69-.09-.14-.32-.23-.68-.41z" />
      </svg>
    </a>
  );
}
