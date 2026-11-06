import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { CITY, INSTAGRAM_URL, MEETUP_URL } from '../config.ts';

const PHONE_NAV_QUERY = '(max-width: 479px)';

const LINKS = [
  { href: '/meetups-in-surrey', label: 'Meetups' },
  { href: '/events', label: 'Events' },
  { href: '/coworking-surrey', label: 'Coworking' },
  { href: '/board-game-night-surrey', label: 'Board games' },
  { href: '/about', label: 'About' },
] as const;

function JoinButton({ onClick }: { onClick?: () => void }) {
  return (
    <a className="btn" href={MEETUP_URL} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      Join
    </a>
  );
}

export function Layout({ path, children }: { path: string; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPhoneNav, setIsPhoneNav] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((restore: 'now' | 'after' = 'now') => {
    const restoreFocus = menuRef.current?.contains(document.activeElement) ?? false;
    setMenuOpen(false);
    if (!restoreFocus) return;

    const focusToggle = () => toggleRef.current?.focus({ preventScroll: true });
    if (restore === 'now') {
      focusToggle();
      return;
    }

    setTimeout(() => {
      const active = document.activeElement;
      if (active === document.body || active === null || menuRef.current?.contains(active)) {
        focusToggle();
      }
    }, 0);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(PHONE_NAV_QUERY);
    const onChange = () => {
      setIsPhoneNav(media.matches);
      if (!media.matches) setMenuOpen(false);
    };
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu('now');
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) closeMenu('after');
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [menuOpen, closeMenu]);

  const menu = (
    <nav id="site-nav" ref={menuRef} className={menuOpen ? 'nav__links is-open' : 'nav__links'}>
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          aria-current={path === link.href ? 'page' : undefined}
          onClick={() => closeMenu('after')}
        >
          {link.label}
        </a>
      ))}
      <a href={path === '/' ? '#newsletter' : '/#newsletter'} onClick={() => closeMenu('after')}>
        Newsletter
      </a>
    </nav>
  );

  return (
    <>
      <header className={menuOpen ? 'nav nav--open' : 'nav'} ref={navRef}>
        <a className="nav__brand script" href="/" aria-label="f8social.club home" onClick={() => closeMenu()}>
          f8social.club
        </a>
        {isPhoneNav ? null : menu}
        <JoinButton onClick={() => closeMenu()} />
        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="nav__burger" aria-hidden="true" />
        </button>
        {isPhoneNav ? menu : null}
      </header>
      {children}
      <footer className="footer">
        <p>
          f8social.club, hosted by Faith · {CITY} · © {new Date().getFullYear()}
        </p>
        <p className="footer__links">
          <a href={INSTAGRAM_URL}>Instagram @socialclub.pros</a>
          <a href={MEETUP_URL} target="_blank" rel="noopener noreferrer">
            Meetup
          </a>
        </p>
      </footer>
    </>
  );
}
