import type { LinksEvent } from './events.ts';

export function EventArtwork({ theme }: { theme: NonNullable<LinksEvent['artwork']> }) {
  return (
    <svg
      className="event-link__illustration"
      viewBox="0 0 520 196"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      {theme === 'soccer' ? (
        <>
          <path fill="var(--sage)" d="M0 0h520v196H0z" />
          <g stroke="var(--green)" strokeWidth="2" opacity=".45">
            <rect x="70" y="28" width="380" height="140" rx="7" />
            <path d="M260 28v140M70 65h50v66H70m380-66h-50v66h50" />
            <circle cx="260" cy="98" r="38" />
          </g>
          <g transform="translate(280 96) rotate(-15)">
            <circle r="57" fill="var(--green)" transform="translate(4 5)" />
            <circle r="57" fill="var(--paper)" stroke="var(--green)" strokeWidth="2.5" />
            <path
              d="m0-23 22 16-8 26h-28l-8-26Z"
              fill="var(--green)"
            />
            <path
              d="m0-23 0-34M22-7l32-11M14 19l20 26m-48-26-20 26M-22-7l-32-11"
              stroke="var(--green)"
              strokeWidth="2.5"
            />
            <path
              d="m-19-54 19 12 19-12M54-18 40 1l11 24M34 45l-25-3-9 15m-34-12 25-3L0 57m-54-75L-40 1l-11 24"
              stroke="var(--green)"
              strokeWidth="2.5"
            />
          </g>
          <path d="m148 54 4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" fill="var(--peach)" stroke="var(--green)" strokeWidth="2" />
          <path d="m370 45 3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" fill="var(--pink)" stroke="var(--green)" strokeWidth="2" />
        </>
      ) : (
        <>
          <path fill="var(--peach)" d="M0 0h520v196H0z" />
          <path d="M0 160 182 0h156l182 160v36H0Z" fill="var(--pink)" />
          <g stroke="var(--green)" strokeWidth="2">
            <path d="M260 0v33" />
            <circle cx="260" cy="89" r="55" fill="var(--green)" transform="translate(4 5)" />
            <circle cx="260" cy="89" r="55" fill="var(--paper)" />
            <ellipse cx="260" cy="89" rx="29" ry="55" fill="var(--sage)" />
            <path d="M260 34v110m-51-75h102m-106 20h110m-106 20h102m-87-60h72m-72 80h72" />
            <path d="m159 75 5 15 15 5-15 5-5 15-5-15-15-5 15-5Zm205-45 4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" fill="var(--paper)" />
            <path d="m119 136 7 12m264-57 12-7M180 29l9 8m152 111 8-10" strokeWidth="4" strokeLinecap="round" />
            <circle cx="135" cy="47" r="5" fill="var(--sage)" />
            <circle cx="381" cy="127" r="5" fill="var(--pink)" />
          </g>
        </>
      )}
    </svg>
  );
}
