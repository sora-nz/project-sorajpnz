import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { blog, Locale, seo } from '../lib/content';
import { pageJsonLd, useMeta } from '../lib/useMeta';

type BlogProps = {
  locale: Locale;
  path: string;
};

export function Blog({ locale, path }: BlogProps) {
  const b = blog[locale];
  const meta = seo[locale].blog;

  useMeta({
    locale,
    path,
    title: meta.title,
    description: meta.description,
    jsonLd: pageJsonLd(locale, path, meta.title, meta.description)
  });

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main>
        <section className="subhero">
          <div className="section-inner narrow">
            <p className="eyebrow">Notes</p>
            <h1>{b.title}</h1>
            <p>{b.subtitle}</p>
          </div>
        </section>
        <section className="content-section blog-hub-section">
          <div className="section-inner blog-hub-inner">
            <div className="blog-intro-card">
              <span className="legacy-card-index">{b.introLabel}</span>
              <h2>{b.introTitle}</h2>
              <p>{b.body}</p>
            </div>

            <div className="blog-track-grid">
              {b.tracks.map((track) => (
                <article className="blog-track-card" key={track.label}>
                  <div className="blog-track-top">
                    <span className="blog-track-icon" aria-hidden="true">
                      <i className={track.icon} />
                    </span>
                    <div>
                      <span className="blog-track-direction">{track.direction}</span>
                      <h2>{track.label}</h2>
                    </div>
                  </div>
                  <p>{track.description}</p>
                  <div className="blog-topic-row" aria-label={track.label}>
                    {track.topics.map((topic) => (
                      <span key={topic}>{topic}</span>
                    ))}
                  </div>
                  <div className="blog-idea-list">
                    {track.ideas.map((idea) => (
                      <div className="blog-idea-item" key={idea}>
                        <i className="ri-arrow-right-line" aria-hidden="true" />
                        <span>{idea}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="blog-system-grid">
              <article className="blog-system-card">
                <span className="legacy-card-index">Social workflow</span>
                <h2>{b.socialTitle}</h2>
                <p>{b.socialBody}</p>
                <ol className="blog-step-list">
                  {b.socialSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </article>
              <article className="blog-system-card soft">
                <span className="legacy-card-index">Next drafts</span>
                <h2>{b.upcomingTitle}</h2>
                <p>{b.upcomingBody}</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
