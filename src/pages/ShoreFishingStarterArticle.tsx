import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, links, Locale, shoreFishingStarterArticle, socialLinks } from '../lib/content';
import { localize } from '../lib/routes';
import { pageJsonLd, useMeta } from '../lib/useMeta';
import { useReveal } from '../lib/useReveal';

type ShoreFishingStarterArticleProps = {
  locale: Locale;
  path: string;
};

export function ShoreFishingStarterArticle({ locale, path }: ShoreFishingStarterArticleProps) {
  const article = shoreFishingStarterArticle[locale];
  const base = localize(locale);
  const instagram = socialLinks.find((item) => item.id === 'instagram');

  useReveal();
  useMeta({
    locale,
    path,
    title: article.title + ' | SoraJPNZ Notes',
    description: article.description,
    image: assets.blogSnapperWharf,
    noIndex: true,
    jsonLd: pageJsonLd(locale, path, article.title, article.description)
  });

  const ctaLinks = [
    { label: article.ctas.blog, href: base + '/blog', icon: 'ri-article-line', external: false },
    { label: article.ctas.youtube, href: links.youtube, icon: 'ri-youtube-fill', external: true },
    instagram ? { label: article.ctas.instagram, href: instagram.href, icon: instagram.icon, external: true } : null,
    { label: article.ctas.projects, href: base + '/projects', icon: 'ri-folder-chart-line', external: false },
    { label: article.ctas.contact, href: base + '/contact', icon: 'ri-mail-line', external: false }
  ].filter(Boolean) as Array<{ label: string; href: string; icon: string; external: boolean }>;

  return (
    <div className="page blog-article-page">
      <Header locale={locale} path={path} />
      <main>
        <article>
          <section className="blog-article-hero">
            <img
              className="blog-article-hero-image animate-hero-pan"
              src={assets.blogSnapperWharf}
              alt={article.heroAlt}
              fetchPriority="high"
              decoding="async"
            />
            <div className="blog-article-hero-overlay" aria-hidden="true" />
            <div className="section-inner blog-article-hero-inner animate-slide-up">
              <p className="blog-article-eyebrow">{article.eyebrow}</p>
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <div className="article-meta-row" aria-label={article.statusLabel}>
                <span className="article-draft-pill">{article.draftLabel}</span>
                <span>{article.statusLabel}</span>
              </div>
            </div>
          </section>

          <section className="content-section blog-article-content">
            <div className="section-inner article-shell">
              <section className="article-intro-card reveal-on-scroll" aria-label={article.eyebrow}>
                <span className="legacy-card-index">SoraJPNZ Notes</span>
                <p>{article.intro}</p>
              </section>

              <nav className="article-toc-card reveal-on-scroll" aria-label={article.tocTitle}>
                <h2>{article.tocTitle}</h2>
                <ol>
                  {article.sections.map((section) => (
                    <li key={section.id}>
                      <a href={'#' + section.id}>{section.title}</a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="article-body">
                {article.sections.map((section, index) => (
                  <section className="article-section reveal-on-scroll" id={section.id} key={section.id}>
                    <span className="article-section-index">{String(index + 1).padStart(2, '0')}</span>
                    <h2>{section.title}</h2>
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {'note' in section && section.note ? (
                      <div className="article-inline-note">
                        <i className="ri-sticky-note-line" aria-hidden="true" />
                        <span>{section.note}</span>
                      </div>
                    ) : null}
                  </section>
                ))}
              </div>

              <aside className="article-warning-card reveal-on-scroll">
                <i className="ri-alert-line" aria-hidden="true" />
                <div>
                  <h2>{article.noticeTitle}</h2>
                  <p>{article.noticeBody}</p>
                </div>
              </aside>

              <aside className="article-fact-card reveal-on-scroll">
                <h2>{article.factCheckTitle}</h2>
                <ul>
                  {article.factCheckItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </aside>

              <section className="article-cta-panel reveal-on-scroll" aria-labelledby="article-cta-title">
                <div>
                  <span className="legacy-card-index">Next</span>
                  <h2 id="article-cta-title">{article.ctaTitle}</h2>
                  <p>{article.ctaBody}</p>
                </div>
                <div className="article-cta-grid">
                  {ctaLinks.map((item) => (
                    <a
                      className="article-cta-link"
                      href={item.href}
                      key={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      <i className={item.icon} aria-hidden="true" />
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </article>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
