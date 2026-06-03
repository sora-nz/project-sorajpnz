import { FormEvent, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { contactPage, links, Locale } from '../lib/content';
import { pageJsonLd, useMeta } from '../lib/useMeta';

type ContactProps = {
  locale: Locale;
  path: string;
};

export function Contact({ locale, path }: ContactProps) {
  const copy = contactPage[locale];
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const title = `${copy.title} - Sora Oya`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();

    formData.forEach((value, key) => {
      if (typeof value === 'string') body.append(key, value);
    });

    setStatus('sending');

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });

      if (!response.ok) throw new Error('Contact form submission failed');

      form.reset();
      setMessage('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  useMeta({
    locale,
    path,
    title,
    description: copy.intro,
    jsonLd: pageJsonLd(locale, path, title, copy.intro)
  });

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main>
        <section className="contact-page-section">
          <div className="section-inner contact-layout">
            <div className="contact-copy">
              <h1>{copy.title}</h1>
              <p>{copy.intro}</p>

              <div className="contact-methods" aria-label={copy.title}>
                <a className="contact-method" href={links.email}>
                  <span className="contact-method-icon">
                    <i className="ri-mail-line" />
                  </span>
                  <span>{links.emailText}</span>
                </a>
                <a className="contact-method" href={links.privacyEmail}>
                  <span className="contact-method-icon">
                    <i className="ri-shield-user-line" />
                  </span>
                  <span>
                    {copy.privacyLabel}: {links.privacyEmailText}
                  </span>
                </a>
              </div>
            </div>

            <form className="contact-form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="subject" value={copy.subject} />
              <p className="hidden-field" aria-hidden="true">
                <label>
                  Do not fill this out
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className="contact-form-field">
                <label htmlFor="contact-name">{copy.nameLabel} *</label>
                <input id="contact-name" name="name" type="text" placeholder={copy.namePlaceholder} required />
              </div>

              <div className="contact-form-field">
                <label htmlFor="contact-email">{copy.emailFieldLabel} *</label>
                <input id="contact-email" name="email" type="email" placeholder={copy.emailPlaceholder} required />
              </div>

              <div className="contact-form-field">
                <label htmlFor="contact-message">{copy.messageLabel} *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder={copy.messagePlaceholder}
                  maxLength={500}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                />
                <span className="char-counter">
                  {message.length}/500 {copy.characters}
                </span>
              </div>

              <button className="button primary contact-submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? copy.sending : copy.send}
              </button>

              {status === 'success' && <p className="form-status success">{copy.success}</p>}
              {status === 'error' && <p className="form-status error">{copy.error}</p>}
            </form>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
