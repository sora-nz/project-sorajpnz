import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, links, Locale, socialLinks } from '../lib/content';
import { localize } from '../lib/routes';
import {
  calculateNzLifeReality,
  defaultNzLifeInputs,
  monthlyFactor
} from '../lib/nzLifeRealityCalculator';
import type { CalculatorInputs } from '../lib/nzLifeRealityCalculator';
import { useMeta } from '../lib/useMeta';
import { useReveal } from '../lib/useReveal';

type AucklandLivingCostArticleProps = {
  locale: Locale;
  path: string;
};

const articleTitle = 'Auckland生活費の現実：家賃・車・貯金目標を入れると、月いくら残るのか';
const articleDescription =
  'Auckland生活を、家賃だけでなく勤務時間、車、固定費、貯金目標、緊急資金、日本円の感覚から考えるSoraJPNZのレビュー中記事です。';

const tocItems = [
  { href: '#target-reader', label: 'この記事で想定している読者' },
  { href: '#premise', label: '最初に考えたいこと' },
  { href: '#hourly-wage', label: '時給だけでは判断できない' },
  { href: '#rent', label: '家賃は週額でも月の生活に効く' },
  { href: '#car', label: '車を持つと見え方が変わる' },
  { href: '#sora-sense', label: 'Soraの生活感として' },
  { href: '#jpy-reference', label: '日本円で考えると感覚が変わる' },
  { href: '#savings', label: '貯金目標と緊急資金' },
  { href: '#scenarios', label: '試算シナリオ' },
  { href: '#calculator', label: '自分の前提で試算する' },
  { href: '#todos', label: '公開前に確認する一次情報' }
];

const officialTodos = [
  '最低賃金: 最新の時給と適用日を公式情報で確認する。',
  'Living Wage: 最新の公表値、対象期間、公式説明を確認する。',
  'INZの賃金基準: 記事内で触れる場合は、必ずINZ公式情報と日付を確認する。',
  'IRDの手取り計算: 正確な手取りはIRDまたは給与明細・専門家で確認する案内を入れる。',
  '家賃データ: 家賃相場を入れる場合は、Stats NZ、MBIE、Tenancy Servicesなど一次情報で確認する。',
  'NZD/JPY参考レート: 日本円換算を入れる場合は、固定レートと確認日を明記する。'
];

const referenceItems = [
  {
    title: '最低賃金・雇用条件の確認',
    sourceName: 'Employment New Zealand',
    url: 'https://www.employment.govt.nz/pay-and-hours/pay-and-wages/minimum-wage/',
    note: '時給や雇用条件に触れる前に、最新の公式情報と更新日を確認する。'
  },
  {
    title: '税金・手取りの確認',
    sourceName: 'Inland Revenue',
    url: 'https://www.ird.govt.nz/',
    note: '正確な手取りや税金の扱いは、公式情報または専門家で確認する。'
  },
  {
    title: '家賃相場の確認',
    sourceName: 'Tenancy Services',
    url: 'https://www.tenancy.govt.nz/rent-bond-and-bills/market-rent/',
    note: '家賃の例を公開版に入れる前に、地域と時期を分けて一次情報を確認する。'
  },
  {
    title: 'ビザ関連の確認',
    sourceName: 'Immigration New Zealand',
    url: 'https://www.immigration.govt.nz/',
    note: 'ビザや移民条件には踏み込まず、必要な場合は公式情報や有資格者へ案内する。'
  }
];

const nextTopics = [
  'Aucklandで家賃を下げるときに、通勤・車・生活時間がどう変わるか',
  '車なし生活と車あり生活で、毎月の余白がどれくらい変わるか',
  'NZDと日本円の両方で、生活費の重さをどう見せると分かりやすいか',
  'NZ生活リアリティ計算機の前提を、実際の生活メモから少しずつ改善する'
];

const scenarioInputs: Array<{
  title: string;
  body: string;
  inputs: CalculatorInputs;
}> = [
  {
    title: '家賃を抑えて車なし',
    body: '家賃と移動費を抑えて、まず毎月の余白を作りやすくする例です。車がない分、住む場所と通勤のしやすさがかなり大事になります。',
    inputs: {
      ...defaultNzLifeInputs,
      hourlyWage: 29.9,
      workHoursPerWeek: 40,
      weeklyRent: 280,
      weeklyFood: 120,
      weeklyTransport: 50,
      ownsCar: false,
      monthlySavingsTarget: 500
    }
  },
  {
    title: '車ありで行動範囲を広げる',
    body: '仕事、買い物、海や郊外への移動は楽になります。ただし燃料、保険、整備、rego/WOF積立が月の生活費に乗ってきます。',
    inputs: {
      ...defaultNzLifeInputs,
      hourlyWage: 29.9,
      workHoursPerWeek: 40,
      weeklyRent: 300,
      weeklyFood: 120,
      weeklyTransport: 30,
      ownsCar: true,
      weeklyFuel: 70,
      weeklyParking: 20,
      monthlyCarInsurance: 90,
      monthlyCarMaintenance: 130,
      monthlySavingsTarget: 500
    }
  },
  {
    title: '勤務時間が少ないケース',
    body: '時給が同じでも、シフトや授業、体調、仕事探しの状況で勤務時間が少ないと、月の残りは一気に小さくなります。',
    inputs: {
      ...defaultNzLifeInputs,
      hourlyWage: 29.9,
      workHoursPerWeek: 30,
      weeklyRent: 300,
      weeklyFood: 120,
      weeklyTransport: 50,
      ownsCar: false,
      monthlySavingsTarget: 500
    }
  }
];

const scenarios = scenarioInputs.map((scenario) => ({
  ...scenario,
  result: calculateNzLifeReality(scenario.inputs)
}));

function formatCurrency(value: number) {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? '-' : '';
  return `${sign}$${Math.abs(rounded).toLocaleString('en-NZ')}`;
}

type ReferenceCardProps = {
  title: string;
  sourceName: string;
  url: string;
  note: string;
};

export function ReferenceCard({ title, sourceName, url, note }: ReferenceCardProps) {
  return (
    <a className="article-link-card reference" href={url} target="_blank" rel="noopener noreferrer">
      <span className="article-link-label">{sourceName}</span>
      <strong>{title}</strong>
      <p>{note}</p>
    </a>
  );
}

type PersonalPostCardProps = {
  platform: string;
  title: string;
  url: string;
  note: string;
};

export function PersonalPostCard({ platform, title, url, note }: PersonalPostCardProps) {
  return (
    <a className="article-link-card personal" href={url} target="_blank" rel="noopener noreferrer">
      <span className="article-link-label">{platform}</span>
      <strong>{title}</strong>
      <p>{note}</p>
    </a>
  );
}

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div className="article-youtube-embed">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

type CalculatorCTAProps = {
  href: string;
};

function CalculatorCTA({ href }: CalculatorCTAProps) {
  return (
    <a className="article-calculator-cta" href={href}>
      <span>
        <strong>NZ生活リアリティ計算機</strong>
        <small>今はNZD前提で、時給・労働時間・家賃・車・貯金目標を動かして生活の余白を試算できます。日本円の参考表示は今後追加したい改善点です。</small>
      </span>
      <i className="ri-calculator-line" aria-hidden="true" />
    </a>
  );
}

export function AucklandLivingCostArticle({ locale, path }: AucklandLivingCostArticleProps) {
  const calculatorHref = '/ja/tools/nz-life-reality-calculator';
  const instagramHref = socialLinks.find((item) => item.id === 'instagram')?.href;

  useReveal();
  useMeta({
    locale,
    path,
    title: `${articleTitle} | SoraJPNZ`,
    description: articleDescription,
    image: assets.blogSnapperWharf,
    noIndex: true,
    alternates: false
  });

  return (
    <div className="page draft-article-page">
      <Header locale={locale} path={path} />
      <main>
        <article className="section-inner draft-article-shell">
          <header className="draft-article-header animate-slide-up">
            <span className="draft-pill">レビュー中 / noindex</span>
            <p className="draft-article-kicker">SoraJPNZ Notes</p>
            <h1>{articleTitle}</h1>
            <p className="draft-article-lead">
              「NZは時給が高そうだけど、実際いくら残るのか」。Aucklandで家賃を払って、車や固定費も考えて、少し貯金するならどれくらい余白が残るのかを、生活感に近い形で整理します。
            </p>
            <div className="draft-note-box">
              この記事は公開前レビュー中です。数字は説明用の仮定を含みます。公式な生活費・税金・賃金・移民情報ではありません。
            </div>
            <nav className="draft-inline-toc" aria-label="記事の目次">
              <span>目次</span>
              <ol>
                {tocItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </header>

          <div className="draft-article-body">
            <section className="draft-article-chapter reveal-on-scroll" id="target-reader">
              <h2>この記事で想定している読者</h2>
              <p>
                この記事は、New Zealandに来るか迷っている人、すでにAucklandで暮らしていて生活の前提を見直したい人に向けたメモです。特に、20代から30代前半くらいで、ワーホリ、学生、Post-study、パートナー、またはキャリア初期の仕事をしながら生活を組み立てている人を想定しています。
              </p>
              <p>
                ひとり暮らし、フラット生活、または子どものいないカップルの生活感に近い内容です。家族移住、住宅購入、本格的な移民戦略、税務・投資の最適化、高所得専門職の移住パッケージを扱う記事ではありません。
              </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="premise">
              <h2>最初に考えたいこと</h2>
              <p>
                Auckland生活を考えるとき、最初に出てくる問いはだいたいシンプルです。「時給はいくら必要か」「家賃はいくらまでなら大丈夫か」「日本円で見ると高すぎないか」。でも、生活のきつさはひとつの数字だけでは見えません。
              </p>
              <p>
                実際には、週に何時間働けるか、家賃をどこに置くか、車を持つか、毎月いくら残したいか、緊急資金をどれくらい用意したいかで、同じ時給でも生活の見え方がかなり変わります。
              </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="hourly-wage">
                <h2>時給だけでは判断できない</h2>
                <p>
                  日本から見ると、NZの時給は高く見えることがあります。ただ、手取り、勤務時間、家賃、車、食費、通信費を通すと、「思ったほど残らない」と感じることもあります。特にAucklandは、家賃と移動コストの影響が大きいです。
                </p>
                <p>
                  たとえば同じ時給でも、週40時間働ける場合と、授業やシフトの都合で週30時間になる場合では、月の余白が大きく変わります。時給そのものより、「安定して何時間働けるか」と「固定費がどれくらい重いか」を一緒に見た方が現実に近くなります。
                </p>
                <ul className="draft-check-list">
                  <li>週の勤務時間が安定しているか</li>
                  <li>税引き後の手取りをどれくらいで見るか</li>
                  <li>家賃を週いくらで置くか</li>
                  <li>車を持つか、公共交通や徒歩中心で生活するか</li>
                  <li>毎月の貯金目標を生活費に含めるか</li>
                </ul>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="rent">
                <h2>家賃は週額でも、月の生活に効いてくる</h2>
                <p>
                  New Zealandでは家賃を週額で見ることが多いですが、生活全体は月単位で考えると分かりやすくなります。SoraJPNZの計算機では、週額を月額に直すときに
                  <strong> 52 / 12 </strong>
                  を使っています。
                </p>
                <p>
                  たとえば、週の家賃が50ドル変わると、月ではおよそ
                  <strong> {formatCurrency(50 * monthlyFactor)} </strong>
                  の差になります。これは食費や通信費よりも大きく効くことがあり、生活の余白を考えるときの重要な前提になります。
                </p>
                <p>
                  家賃を抑えると毎月の数字は楽になりますが、通勤時間、治安、買い物、仕事へのアクセス、車が必要になるかどうかも一緒に変わります。安い家賃だけを見て決めると、別の場所でコストやストレスが増えることもあります。
                </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="car">
                <h2>車を持つと見え方が変わる</h2>
                <p>
                  Aucklandで車があると、行ける場所や働ける場所は広がります。買い物、仕事探し、海や釣り、郊外への移動もかなり楽になります。一方で、燃料、保険、整備、rego、WOF、駐車場などが毎月の生活費に乗ってきます。
                </p>
                <p>
                  これは「車は持つべきではない」という話ではありません。仕事、住む場所、釣りや海に行く頻度、生活の自由度まで含めて、車を持つ価値と費用を分けて考える必要があるという話です。
                </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="sora-sense">
              <h2>Soraの生活感として</h2>
              <p>
                私自身も、NZ生活を考えるときに「収入がいくらか」だけでは足りないと感じています。家賃、車、食費、海に行く移動、将来のための貯金を入れると、残る金額の感覚がかなり変わります。
              </p>
              <p>
                ここは公開前に、自分の生活メモから無理のない範囲で数字を入れたい場所です。正確な家計公開ではなく、「Auckland生活を考えるとき、どんな項目を見ているか」を示すためのメモとして残します。
              </p>
              <div className="article-personal-snapshot" aria-label="Soraの生活費メモのプレースホルダー">
                <div>
                  <span>家賃</span>
                  <strong>週$___</strong>
                </div>
                <div>
                  <span>食費</span>
                  <strong>週$***〜$***</strong>
                </div>
                <div>
                  <span>車関連</span>
                  <strong>月$***〜$***</strong>
                </div>
                <div>
                  <span>通信費</span>
                  <strong>月$___</strong>
                </div>
                <div>
                  <span>その他固定費</span>
                  <strong>月$___</strong>
                </div>
                <div>
                  <span>趣味・移動・外食</span>
                  <strong>月$***〜$***</strong>
                </div>
              </div>
              <p>
                これは私の一例であり、正解ではありません。住む場所、車の有無、仕事時間、家族構成によって大きく変わります。
              </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="jpy-reference">
              <h2>日本円で考えると、生活費の感覚が変わる</h2>
              <p>
                日本語でNZ生活を考えるとき、NZDだけだと感覚がつかみにくいことがあります。週$50の家賃差は、月ではおよそ
                <strong> {formatCurrency(50 * monthlyFactor)} </strong>
                です。これを日本円でも見ると、「毎月どれくらい重い差なのか」が一気に分かりやすくなります。
              </p>
              <p>
                ただし、日本円換算は生活感をつかむための参考表示です。税務・会計・送金・投資判断に使うものではありません。この記事ではリアルタイム為替APIは使わず、将来的には計算機側で「参考NZD/JPYレート」を自分で変更できる形にしたいです。
              </p>
              <div className="draft-note-box">
                例: 参考レートを 1NZD = ¥___ と置いた場合、週$50の家賃差は月約 ¥___。公開版では、固定レートと確認日を明記する予定です。
              </div>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="savings">
                <h2>貯金目標と緊急資金を入れると、現実が見えやすい</h2>
                <p>
                  生活費を払えるだけなら、表面上は「生活できている」ように見えます。ただ、毎月少しでも貯金したい、次のビザや引っ越しに備えたい、急な出費に耐えたいと考えると、必要な余白は変わります。
                </p>
                <p>
                  特に海外生活では、仕事時間が急に減る、引っ越しが必要になる、車の修理が出る、帰国や家族の事情で大きな出費が出るなど、計画どおりにいかないことがあります。だからこそ、余白を数字で見ておくことが大事です。
                </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="scenarios">
                <p className="draft-section-label">例としての試算</p>
                <h2>試算シナリオ</h2>
                <p>
                  以下は、公式データではなく、NZ生活リアリティ計算機MVPの仮定を使った説明用の例です。おすすめの生活パターンではありません。家賃、勤務時間、車の有無を変えると、月の残りがどのくらい動くかを見るためのサンプルです。
                </p>
                <div className="draft-scenario-list">
                  {scenarios.map((scenario) => (
                    <div className="draft-scenario-row" key={scenario.title}>
                      <div>
                        <span className={`draft-scenario-status ${scenario.result.status}`}>{scenario.result.statusLabel}</span>
                        <h3>{scenario.title}</h3>
                        <p>{scenario.body}</p>
                      </div>
                      <dl>
                        <div>
                          <dt>計算用月収</dt>
                          <dd>{formatCurrency(scenario.result.monthlyIncomeUsedForCalculation)}</dd>
                        </div>
                        <div>
                          <dt>月の生活費</dt>
                          <dd>{formatCurrency(scenario.result.monthlyExpenses)}</dd>
                        </div>
                        <div>
                          <dt>月の残り</dt>
                          <dd>{formatCurrency(scenario.result.monthlyRemaining)}</dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                </div>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="calculator">
                <p className="draft-section-label">自分の前提で試算する</p>
                <h2>自分の前提で試算する</h2>
                <p>
                  自分の時給、働けそうな時間、家賃、車の有無、貯金目標を入れると、NZDベースで月の余白を試算できます。これは「答えを出す」ためではなく、自分の前提のどこが強く、どこが脆いかを見るための道具です。
                </p>
                <p>
                  今のMVPはNZDでの生活費整理が中心です。日本円の参考換算は、将来的に編集できる参考レートとして追加したい改善点です。
                </p>
                <CalculatorCTA href={calculatorHref} />
            </section>

            <section className="draft-article-callout warning reveal-on-scroll">
                <p className="draft-section-label">注意事項</p>
                <h2>注意事項</h2>
                <p>
                  この記事は、NZ生活を考えるための個人的なフィールドノートです。移民、ビザ、税金、雇用、法律、金融、投資の助言ではありません。
                  実際の判断には、必ずNew Zealand政府、IRD、INZ、その他公式情報、または資格を持つ専門家の情報を確認してください。
                </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="todos">
                <h2>公開前に確認する一次情報</h2>
                <p>
                  この記事を公開版に近づける前に、以下の情報は一次情報で確認し、必要なら日付と出典を本文に追加します。この確認リストは読者向けの結論ではなく、記事を安全に育てるためのメモです。
                </p>
                <ul className="draft-check-list">
                  {officialTodos.map((todo) => (
                    <li key={todo}>{todo}</li>
                  ))}
                </ul>
                <div className="article-reference-grid" aria-label="公式情報確認用リンク">
                  {referenceItems.map((item) => (
                    <ReferenceCard key={item.url} {...item} />
                  ))}
                </div>
            </section>

            <section className="draft-article-chapter reveal-on-scroll">
                <h2>次にまとめたいこと</h2>
                <ul className="draft-check-list">
                  {nextTopics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
            </section>

            <section className="draft-article-continue reveal-on-scroll">
                <h2>SoraJPNZで続けて読む</h2>
                <p>
                  生活費の数字だけでなく、実際の生活メモ、データプロジェクト、動画で話した内容も少しずつ整理していきます。
                </p>
                <div className="article-personal-links">
                  <PersonalPostCard
                    platform="YouTube"
                    title="SoraJPNZ YouTube"
                    url={links.youtube}
                    note="動画で話した内容を、あとから記事や計算機に整理していきます。"
                  />
                  {instagramHref && (
                    <PersonalPostCard
                      platform="Instagram"
                      title="SoraJPNZ Instagram"
                      url={instagramHref}
                      note="NZ生活、海、日々の更新を軽く残していく場所です。"
                    />
                  )}
                </div>
                <div className="article-simple-links">
                  <a href={localize(locale, '/blog')}>Blog Hubへ戻る</a>
                  <a href={localize(locale, '/projects')}>Projectsを見る</a>
                  <a href={localize(locale, '/contact')}>問い合わせる</a>
                </div>
            </section>
          </div>
        </article>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
