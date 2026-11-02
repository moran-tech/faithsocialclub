import type { MouseEvent } from 'react';

type LinkClickProperties = {
  label: string;
  url: string;
  position: number;
  section: string;
};

declare global {
  interface Window {
    posthog?: {
      capture: (event: 'link_clicked', properties: LinkClickProperties) => unknown;
    };
  }
}

export function trackLinkClick(event: MouseEvent<HTMLDivElement>) {
  if (!(event.target instanceof Element) || !window.posthog?.capture) return;

  const control = event.target.closest<HTMLAnchorElement | HTMLButtonElement>('a[href], button');
  if (!control || !event.currentTarget.contains(control)) return;

  const section = control.closest<HTMLElement>('[data-analytics-section]');
  const label = control.getAttribute('aria-label') ?? control.innerText;

  window.posthog.capture('link_clicked', {
    label: label.replace(/\s+/g, ' ').trim(),
    url: control.getAttribute('href') ?? '',
    // One-based order across the page, including buttons. Buttons have no href.
    position: Array.from(event.currentTarget.querySelectorAll('a[href], button')).indexOf(control) + 1,
    section: section?.dataset.analyticsSection ?? '',
  });
}
