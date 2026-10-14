import { FormEvent, useRef, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { contactPage, links, Locale, seo } from '../lib/content';
import { trackEvent } from '../lib/analytics';
import { pageJsonLd, useMeta } from '../lib/useMeta';
import { localize } from '../lib/routes';
import { submitContactMessage } from '../lib/contactForm';
import './Contact.css';

type ContactProps = {
  locale: Locale;
  path: string;
};

export function Contact({ locale, path }: ContactProps) {
  const copy = contactPage[locale];
  const meta = seo[locale].contact;
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const pending = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();

    formData.forEach((value, key) => {
      if (typeof value === 'string') body.append(key, value);
    });

    pending.current = true;
    setStatus('sending');

    try {
      await submitContactMessage(body.toString());

      form.reset();
      setMessage('');
      setStatus('success');
      trackEvent('generate_lead', {
        form_name: 'contact',
        method: 'netlify_form'
      });
    } catch {
      setStatus('error');
    } finally {
      pending.current = false;
    }
  };

  useMeta({
    locale,
    path,
    title: meta.title,
    description: meta.description,
    jsonLd: pageJsonLd(locale, path, meta.title, meta.description)
  });

  return (
    <div className="page content-pages contact-page">
      <Header locale={locale} path={path} />
      <main>
        <section className="contact-page-section">
          <div className="section-inner contact-layout">
            <div className="contact-copy">
              <p className="content-page-kicker">SoraJPNZ</p>
              <h1>{copy.title}</h1>
              <p>{copy.intro}</p>

              <div className="contact-methods" aria-label={copy.title}>
                <a className="contact-method" href={links.email}>
                  <span className="contact-method-icon">
                    <i className="ri-mail-line" aria-hidden="true" />
                  </span>
                  <span>{links.emailText}</span>
                </a>
                <a className="contact-method contact-method-privacy" href={links.privacyEmail}>
                  <span className="contact-method-icon">
                    <i className="ri-shield-user-line" aria-hidden="true" />
                  </span>
                  <span>
                    {copy.privacyLabel}: {links.privacyEmailText}
                  </span>
                </a>
              </div>
            </div>

            <form className="contact-form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} aria-busy={status === 'sending'}
              onChange={() => { if (status === 'success' || status === 'error') setStatus('idle'); }}>
              <h2>{copy.formTitle}</h2>
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="subject" value={copy.subject} />
              <p className="hidden-field" aria-hidden="true">
                <label>
                  Do not fill this out
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <fieldset className="contact-fields" disabled={status === 'sending'} aria-label={copy.formTitle}>
                <div className="contact-form-field">
                  <label htmlFor="contact-name">{copy.nameLabel} *</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" placeholder={copy.namePlaceholder} required />
                </div>

                <div className="contact-form-field">
                  <label htmlFor="contact-email">{copy.emailFieldLabel} *</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" placeholder={copy.emailPlaceholder} required />
                </div>

                <div className="contact-form-field">
                  <label htmlFor="contact-message">{copy.messageLabel} *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder={copy.messagePlaceholder}
                    maxLength={500}
                    aria-describedby="contact-privacy contact-count"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                  />
                  <span className="char-counter" id="contact-count">
                    {message.length}/500 {copy.characters}
                  </span>
                </div>
              </fieldset>

              <p className="contact-privacy-note" id="contact-privacy">
                {locale === 'ja' ? 'お問い合わせの内容を簡単にお知らせください。パスワードや、他の方の個人情報は送らないでください。送信内容は問い合わせ対応のためNetlify経由で受け取ります。' : 'Please briefly describe your enquiry. Do not send passwords or other people\'s personal information. Your message is received through Netlify to respond to your enquiry.'}
                {' '}<a href={localize(locale, '/privacy')}>{locale === 'ja' ? '個人情報の扱い' : 'Privacy policy'}</a>
              </p>

              <button className="button primary contact-submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? copy.sending : copy.send}
              </button>

              <div role="status" aria-live="polite" aria-atomic="true">
                {status === 'success' && <p className="form-status success">{copy.success}</p>}
                {status === 'error' && <div className="contact-error"><p className="form-status error">{copy.error}</p><a href={links.email}>{links.emailText}<i className="ri-mail-line" aria-hidden="true" /></a></div>}
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
