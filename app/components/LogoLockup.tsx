const SHIELD_WIDTH = 115.95;
const SHIELD_HEIGHT = 118.36;
const TEXT_FONT_SIZE = 91;
const TEXT_LETTER_SPACING = -2.2;
const TEXT_GAP = 55;
const TEXT_X = SHIELD_WIDTH + TEXT_GAP;
const TEXT_WIDTH = 1096.5;
const VIEW_BOX_WIDTH = TEXT_X + TEXT_WIDTH + 16;

const SHIELD_PATHS = (
  <g>
    <path d="M57.97,118.36C26.01,118.36,0,92.35,0,60.38V0H115.95V60.38c0,31.97-26.01,57.97-57.97,57.97ZM2.02,2.02V60.38c0,30.85,25.1,55.95,55.95,55.95s55.95-25.1,55.95-55.95V2.02H2.02Z" />
    <path d="M62.24,34.57c-1.95-1.25-4.47-1.88-7.56-1.88h-3.7c-.04,3.09-.07,6.21-.07,9.37v21.63c0,3.2,.03,6.37,.07,9.51h3.43c3.18,0,5.77-.63,7.76-1.88,1.99-1.25,3.46-3.37,4.4-6.35,.94-2.97,1.41-6.99,1.41-12.06s-.47-9.06-1.41-12.02c-.94-2.95-2.38-5.06-4.33-6.31Z" />
    <path d="M13.54,13.8V60.12c0,24.54,19.89,44.43,44.43,44.43s44.43-19.89,44.43-44.43V13.8H13.54Zm61.66,51.13c-1.99,3.32-4.79,5.85-8.4,7.59-3.61,1.75-7.8,2.62-12.6,2.62h-16.45v-1.41l1.34-.47c1.44-.45,2.15-1.57,2.15-3.37,.04-2.55,.07-5.16,.07-7.82v-18.3c0-2.6-.03-5.2-.07-7.8,0-1.83-.69-2.97-2.08-3.43l-1.41-.4v-1.41h17.67c4.7,0,8.75,.88,12.16,2.62,3.4,1.75,6.02,4.26,7.86,7.55,1.83,3.29,2.75,7.27,2.75,11.92s-.99,8.78-2.99,12.09Z" />
  </g>
);

export default function LogoLockup({ className = '' }: { className?: string }) {
  return (
    <>
      {/* Mobile / tablet: shield only */}
      <svg
        className={`${className} lg:!hidden`}
        viewBox={`0 0 ${SHIELD_WIDTH} ${SHIELD_HEIGHT}`}
        fill="#fafafa"
        role="img"
        aria-label="Divinus Investment Group"
        xmlns="http://www.w3.org/2000/svg"
      >
        {SHIELD_PATHS}
      </svg>

      {/* Desktop: shield + wordmark */}
      <svg
        className={`${className} !hidden lg:!block`}
        viewBox={`0 0 ${VIEW_BOX_WIDTH} ${SHIELD_HEIGHT}`}
        fill="#fafafa"
        role="img"
        aria-label="Divinus Investment Group"
        xmlns="http://www.w3.org/2000/svg"
      >
        {SHIELD_PATHS}
        <text
          x={TEXT_X}
          y={SHIELD_HEIGHT / 2 + TEXT_FONT_SIZE * 0.35}
          fontFamily="Inter, system-ui, sans-serif"
          fontSize={TEXT_FONT_SIZE}
          fontWeight="700"
          letterSpacing={TEXT_LETTER_SPACING}
          fill="#fafafa"
        >
          Divinus Investment Group
        </text>
      </svg>
    </>
  );
}
