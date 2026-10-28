import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { CITY } from './config.ts';

type Phase = 'idle' | 'invalid' | 'loading' | 'subscribed' | 'already_subscribed' | 'error';
type Field = 'email' | 'firstName' | 'consent' | null;

const messages = {
  invalidEmail: 'Enter an email address like you@example.com.',
  invalidName: 'First name should be 80 characters or fewer.',
  consent: 'Check the box so I know it’s okay to email you.',
  subscribed: 'I’ll write when the next gathering is set.',
  already: "You're already on the list",
  error: 'Something went wrong and I couldn’t add you. Please try again in a minute.',
  rateLimit: 'Too many tries, please wait',
  validation: 'Please check your details and try again.',
} as const;

function normalizeEmail(value: string): string | null {
  const email = value.trim().toLowerCase();
  if (email.length < 3 || email.length > 254 || email.includes('..')) return null;
  const at = email.indexOf('@');
  if (at <= 0 || at !== email.lastIndexOf('@')) return null;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length > 64 || domain.length > 253) return null;
  if (!/^[^\s@]+$/.test(local)) return null;
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain)) return null;
  if (domain.startsWith('.') || domain.startsWith('-') || domain.endsWith('-')) return null;
  return email;
}

function normalizeFirstName(value: string): { ok: true; name: string } | { ok: false } {
  const name = value.trim().replace(/[\u0000-\u001F\u007F]/g, '');
  if (name.length > 80) return { ok: false };
  return { ok: true, name };
}

/** Full endpoint from the build, or null when it is missing or not an absolute URL. */
function subscribeEndpoint(value: string | undefined): string | null {
  const raw = value?.trim() ?? '';
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    return url.href;
  } catch {
    return null;
  }
}

function errorFromBody(value: unknown): string | null {
  if (!value || typeof value !== 'object') return null;
  const error = (value as { error?: unknown }).error;
  if (typeof error !== 'string') return null;
  const trimmed = error.trim();
  return trimmed ? trimmed.slice(0, 300) : null;
}

export function NewsletterForm() {
  const emailId = useId();
  const nameId = useId();
  const consentId = useId();
  const emailErrorId = useId();
  const nameErrorId = useId();
  const consentErrorId = useId();
  const formErrorId = useId();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [consent, setConsent] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [field, setField] = useState<Field>(null);
  const [message, setMessage] = useState('');
  const [slow, setSlow] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (phase !== 'loading') return undefined;
    const timer = window.setTimeout(() => setSlow(true), 4000);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === 'subscribed' || phase === 'already_subscribed') {
      resultRef.current?.focus();
    }
  }, [phase]);

  function showInvalid(nextField: Exclude<Field, null>, nextMessage: string) {
    setPhase('invalid');
    setField(nextField);
    setMessage(nextMessage);
    if (nextField === 'email') emailRef.current?.focus();
    else if (nextField === 'firstName') nameRef.current?.focus();
    else consentRef.current?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const company = String(new FormData(event.currentTarget).get('company') ?? '');
    if (!consent) {
      showInvalid('consent', messages.consent);
      return;
    }
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      showInvalid('email', messages.invalidEmail);
      return;
    }
    const normalizedName = normalizeFirstName(firstName);
    if (!normalizedName.ok) {
      showInvalid('firstName', messages.invalidName);
      return;
    }

    const endpoint = subscribeEndpoint(import.meta.env.VITE_SUBSCRIBE_API_URL);
    if (!endpoint) {
      setField(null);
      setPhase('error');
      setMessage(messages.error);
      return;
    }

    setPhase('loading');
    setField(null);
    setMessage('');
    setSlow(false);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        credentials: 'omit',
        body: JSON.stringify({
          email: normalizedEmail,
          ...(normalizedName.name ? { firstName: normalizedName.name } : {}),
          consent: true,
          company: company.trim(),
        }),
        signal: AbortSignal.timeout(45_000),
      });

      const payload: unknown = await response.json().catch(() => null);
      const serverError = errorFromBody(payload);

      if (response.status === 400) {
        setPhase('error');
        setMessage(serverError ?? messages.validation);
        return;
      }

      if (response.status === 429) {
        setPhase('error');
        setMessage(serverError ?? messages.rateLimit);
        return;
      }

      if (response.status === 200 && payload && typeof payload === 'object') {
        const status = (payload as { status?: unknown }).status;
        if (status === 'subscribed') {
          setPhase('subscribed');
          setMessage(messages.subscribed);
          return;
        }
        if (status === 'already_subscribed') {
          setPhase('already_subscribed');
          setMessage(messages.already);
          return;
        }
      }

      setPhase('error');
      setMessage(messages.error);
    } catch {
      setPhase('error');
      setMessage(messages.error);
    }
  }

  function onEmailBlur() {
    if (!email.trim() || phase === 'loading') return;
    if (!normalizeEmail(email)) {
      showInvalid('email', messages.invalidEmail);
      return;
    }
    if (field === 'email') {
      setField(null);
      setPhase('idle');
      setMessage('');
    }
  }

  const done = phase === 'subscribed' || phase === 'already_subscribed';
  const emailInvalid = field === 'email';
  const nameInvalid = field === 'firstName';
  const consentInvalid = field === 'consent';
  const savedName = firstName.trim();

  return (
    <section className="newsletter" id="newsletter" aria-labelledby="newsletter-heading">
      <div className="newsletter__card">
        <div className="newsletter__intro">
          <p className="eyebrow">Newsletter</p>
          <h2 id="newsletter-heading" className="script">
            A note before we meet
          </h2>
          <p>
            Monday coworking, Thursday board games, and the occasional extra plan. A short email from Faith
            in {CITY}. No weekly blast.
          </p>
        </div>

        {done ? (
          <div className="newsletter__result">
            <h3 ref={resultRef} tabIndex={-1} className="script newsletter__result-title">
              {phase === 'subscribed'
                ? savedName
                  ? `You're on the list, ${savedName}.`
                  : "You're on the list."
                : messages.already}
            </h3>
            <p role="status">{message}</p>
            <p className="newsletter__signoff script">See you there! — Faith</p>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setPhase('idle');
                setField(null);
                setMessage('');
                setConsent(false);
              }}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form className="newsletter__form" onSubmit={onSubmit} noValidate aria-busy={phase === 'loading'}>
            <p className="sr-only" aria-live="polite">
              {phase === 'loading' ? (slow ? 'Still joining the list' : 'Joining the list') : ''}
            </p>
            <div className="hp-field" aria-hidden="true">
              <label>
                Company
                <input name="company" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
              </label>
            </div>

            <div className="field">
              <label htmlFor={emailId}>
                Email <span className="sr-only">(required)</span>
              </label>
              <input
                ref={emailRef}
                id={emailId}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                maxLength={254}
                required
                value={email}
                disabled={phase === 'loading'}
                aria-invalid={emailInvalid || undefined}
                aria-describedby={emailInvalid ? emailErrorId : undefined}
                onBlur={onEmailBlur}
                onChange={(event) => setEmail(event.target.value)}
              />
              {emailInvalid ? (
                <p id={emailErrorId} className="field-error">
                  {message}
                </p>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor={nameId}>
                First name <span className="optional">(optional)</span>
              </label>
              <input
                ref={nameRef}
                id={nameId}
                name="firstName"
                type="text"
                autoComplete="given-name"
                autoCapitalize="words"
                maxLength={80}
                value={firstName}
                disabled={phase === 'loading'}
                aria-invalid={nameInvalid || undefined}
                aria-describedby={nameInvalid ? nameErrorId : undefined}
                onChange={(event) => setFirstName(event.target.value)}
              />
              {nameInvalid ? (
                <p id={nameErrorId} className="field-error">
                  {message}
                </p>
              ) : null}
            </div>

            <div className="field">
              <label className="consent" htmlFor={consentId}>
                <input
                  ref={consentRef}
                  id={consentId}
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  disabled={phase === 'loading'}
                  aria-invalid={consentInvalid || undefined}
                  aria-describedby={consentInvalid ? consentErrorId : undefined}
                  onChange={(event) => setConsent(event.target.checked)}
                />
                <span>Email me about Social Club events. Unsubscribe any time.</span>
              </label>
              {consentInvalid ? (
                <p id={consentErrorId} className="field-error">
                  {message}
                </p>
              ) : null}
            </div>

            {phase === 'error' ? (
              <p id={formErrorId} className="form-error" role="alert">
                {message}
              </p>
            ) : null}

            <button className="btn" type="submit" disabled={phase === 'loading'}>
              {phase === 'loading' ? (slow ? 'Still joining…' : 'Joining…') : 'Join the list'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
