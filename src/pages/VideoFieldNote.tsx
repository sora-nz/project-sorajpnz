import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { VideoFeature } from '../components/VideoFeature';
import { latestVideo, videoNoteMeta } from '../lib/videos';
import { articleJsonLd, useMeta } from '../lib/useMeta';

export function VideoFieldNote({ path }: { path: string }) {
  useMeta({
    locale: 'ja', path,
    title: `${videoNoteMeta.title} | SoraJPNZ Notes`,
    description: videoNoteMeta.description,
    image: latestVideo.thumbnail,
    noIndex: videoNoteMeta.noIndex,
    alternates: false,
    jsonLd: articleJsonLd({ locale: 'ja', path, title: videoNoteMeta.title,
      description: videoNoteMeta.description, image: latestVideo.thumbnail,
      datePublished: videoNoteMeta.created, dateModified: videoNoteMeta.created })
  });

  return (
    <div className="page draft-article-page video-note-page">
      <Header locale="ja" path={path} languageSwitchHref="/en/blog" />
      <main>
        <article className="section-inner draft-article-shell">
          <header className="draft-article-header">
            <a className="back-link" href="/ja/blog"><i className="ri-arrow-left-line" aria-hidden="true" />SoraJPNZ Notes</a>
            <p className="draft-article-kicker">Field Notes / 動画の補足ノート</p>
            <h1>{videoNoteMeta.title}</h1>
            <p className="draft-article-lead">今回はTheaと初めての浜釣りへ。夕飯になる魚を求めて場所を移動した一日を、Vlogにしました。</p>
            <p className="draft-article-lead">このページは、動画に添える短いメモです。釣り方の解説よりも、二人で海に出かけた日の様子を残しています。</p>
            <dl className="draft-article-meta">
              <div><dt>動画公開</dt><dd><time dateTime={latestVideo.date}>2026年10月7日</time></dd></div>
              <div><dt>ノート作成</dt><dd><time dateTime={videoNoteMeta.created}>2026年10月8日</time></dd></div>
              <div><dt>状態</dt><dd>レビュー版 / noindex</dd></div>
            </dl>
          </header>

          <div className="video-note-feature"><VideoFeature locale="ja" video={latestVideo} headingLevel={2} showDescription={false} /></div>
          <div className="draft-article-body">
            <section className="draft-article-chapter" aria-labelledby="video-note-day">
              <h2 id="video-note-day">夕飯を釣りに、もう一度</h2>
              <p>前編に続いて、早起きして海へ。今回は浜から投げる釣りに挑戦しています。初めてなので、投げ方も、魚がかかったときの感触も手探りです。</p>
              <p>釣果だけでなく、魚がかかったときの反応や、疲れて帰ろうとする頃のやり取りも動画に残っています。まずはその一日を見てもらえたらうれしいです。</p>
            </section>
            <section className="draft-article-chapter" aria-labelledby="video-note-moments">
              <h2 id="video-note-moments">動画の中の、こんな場面</h2>
              <p>気になるところから見るなら、こちらから。リンクはYouTubeの該当場面を開きます。</p>
              <ol className="video-moment-list">
                <li><a href={`${latestVideo.url}&t=42s`} target="_blank" rel="noopener noreferrer"><time>00:42</time><span>初めてのsurfcasting。まだ手探りのスタート</span><i className="ri-external-link-line" aria-hidden="true" /></a></li>
                <li><a href={`${latestVideo.url}&t=147s`} target="_blank" rel="noopener noreferrer"><time>02:27</time><span>魚がかかって、二人で大喜び</span><i className="ri-external-link-line" aria-hidden="true" /></a></li>
                <li><a href={`${latestVideo.url}&t=832s`} target="_blank" rel="noopener noreferrer"><time>13:52</time><span>帰る前の片付けと、タックルボックス</span><i className="ri-external-link-line" aria-hidden="true" /></a></li>
              </ol>
            </section>
            <section className="draft-article-chapter" aria-labelledby="video-note-previous">
              <h2 id="video-note-previous">この日の前編もあります</h2>
              <p>夕飯を釣りに出かけた前編から続く動画です。時間があれば、二本続けてどうぞ。</p>
              <a className="text-link" href={latestVideo.previousUrl} target="_blank" rel="noopener noreferrer">前編をYouTubeで見る<i className="ri-external-link-line" aria-hidden="true" /></a>
            </section>
            <aside className="video-note-caution">
              <p>このノートは公開動画に基づく個人の記録です。釣りのルールや海の安全を案内するものではありません。実際に出かける際は、最新の公式情報と現地の状況を確認してください。</p>
            </aside>
            {/* Add Sora's own reflections, gear details or original stills only after his review. Do not infer them from automatic captions. */}
            <section className="draft-article-continue">
              <h2>また、NZの日々を残していきます</h2>
              <p>動画では一日の様子を、Notesではあとから読み返したいことを。生活費のノートや、作ったツールは別の入口から見られます。</p>
              <div className="button-row left">
                <a className="button secondary small" href="/ja/blog">Notesへ戻る<i className="ri-arrow-right-line" aria-hidden="true" /></a>
                <a className="button secondary small" href="/ja/projects">Projectsを見る<i className="ri-arrow-right-line" aria-hidden="true" /></a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer locale="ja" />
    </div>
  );
}
