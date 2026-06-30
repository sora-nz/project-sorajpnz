import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, links, Locale, socialLinks } from '../lib/content';
import { localize } from '../lib/routes';
import {
  calculateNzLifeReality,
  CalculatorInputs,
  defaultNzLifeInputs,
  monthlyFactor
} from '../lib/nzLifeRealityCalculator';
import { useMeta } from '../lib/useMeta';
import { useReveal } from '../lib/useReveal';

type AucklandLivingCostArticleProps = {
  locale: Locale;
  path: string;
};

const articleTitle = 'Aucklandで生活するには時給いくら必要か：家賃・車・貯金目標から見るNZ生活の現実';
const articleDescription =
  'Aucklandでの生活費を、家賃だけでなく勤務時間、車、固定費、貯金目標、緊急資金から考えるSoraJPNZの下書き記事です。';

const tocItems = [
  { href: '#premise', label: 'この記事の前提' },
  { href: '#hourly-wage', label: '時給だけでは判断できない' },
  { href: '#rent', label: '家賃は週額でも月の生活に効く' },
  { href: '#car', label: '車を持つと見え方が変わる' },
  { href: '#savings', label: '貯金目標と緊急資金' },
  { href: '#scenarios', label: '下書きシナリオ' },
  { href: '#calculator', label: '自分の前提で試算する' },
  { href: '#todos', label: '公式情報確認TODO' }
];

const officialTodos = [
  'NZ minimum wage: 最新の時給と適用日を公式情報で確認する。',
  'Living Wage: 最新の公表値、対象期間、公式説明を確認する。',
  'INZ median wage / visa thresholds: 記事内で触れる場合は、必ずINZ公式情報と日付を確認する。',
  'IRD PAYE / take-home pay: 正確な手取りはIRDまたは給与明細・専門家で確認する案内を入れる。',
  'Rent data: 家賃相場を入れる場合は、Stats NZ、MBIE、Tenancy Servicesなど一次情報で確認する。'
];

const nextTopics = [
  'Aucklandで家賃を下げるときに、通勤・車・生活時間がどう変わるか',
  '車なし生活と車あり生活で、毎月の余白がどれくらい変わるか',
  'NZ生活リアリティ計算機の前提を、実際の生活メモから少しずつ改善する'
];

const scenarioInputs: Array<{
  title: string;
  body: string;
  inputs: CalculatorInputs;
}> = [
  {
    title: '車なし・家賃を抑える前提',
    body: '家賃と交通費を抑え、まず生活を安定させることを優先する下書き例です。',
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
    title: '車あり・生活の自由度を取る前提',
    body: '車を持つことで行動範囲は広がる一方、燃料、保険、整備、rego/WOF積立が効く下書き例です。',
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
    title: '勤務時間が少なめの前提',
    body: '時給が同じでも、週の勤務時間が減ると一気に余白が小さくなることを見るための下書き例です。',
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
        <section className="draft-article-hero">
          <img className="draft-article-hero-image animate-hero-pan" src={assets.blogSnapperWharf} alt="" fetchPriority="high" decoding="async" />
          <div className="draft-article-hero-overlay" aria-hidden="true" />
          <div className="section-inner narrow draft-article-hero-inner animate-slide-up">
            <span className="draft-pill">Draft / noindex</span>
            <p className="eyebrow">SoraJPNZ Notes</p>
            <h1>{articleTitle}</h1>
            <p>
              家賃だけで「生活できるか」を見るのではなく、勤務時間、車、固定費、貯金目標、緊急資金まで含めて、NZ生活の前提を整理する下書きです。
            </p>
          </div>
        </section>

        <section className="draft-article-section">
          <div className="section-inner draft-article-layout">
            <aside className="draft-toc reveal-on-scroll" aria-label="記事の目次">
              <span>目次</span>
              <nav>
                {tocItems.map((item) => (
                  <a href={item.href} key={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>

            <article className="draft-article-body">
              <section className="draft-article-card lead reveal-on-scroll" id="premise">
                <p className="eyebrow">Premise</p>
                <h2>この記事の前提</h2>
                <p>
                  この記事は、Aucklandで生活するには「時給いくらなら大丈夫か」を一発で答えるためのものではありません。むしろ、
                  その質問だけでは足りない理由を整理するための下書きです。
                </p>
                <p>
                  実際には、時給だけでなく、週に何時間働けるか、家賃をいくらにするか、車を持つか、毎月いくら貯めたいか、緊急資金をどれくらい用意したいかで、生活の現実感は大きく変わります。
                </p>
                <div className="draft-note-box">
                  このページは公開完成版ではなく、SoraJPNZの下書き記事です。数字は計算機MVPの仮定を説明するための例であり、公式な生活費・税金・賃金・移民情報ではありません。
                </div>
              </section>

              <section className="draft-article-card reveal-on-scroll" id="hourly-wage">
                <h2>時給だけでは判断できない</h2>
                <p>
                  「時給が高いか低いか」は大事ですが、それだけでは生活の安定度は見えません。たとえば同じ時給でも、週40時間働ける場合と週30時間しか入れない場合では、月の余白がかなり変わります。
                </p>
                <ul className="draft-check-list">
                  <li>週の勤務時間が安定しているか</li>
                  <li>税引き後の手取りをどれくらいで見るか</li>
                  <li>家賃を週いくらで置くか</li>
                  <li>車を持つか、公共交通や徒歩中心で生活するか</li>
                  <li>毎月の貯金目標を生活費に含めるか</li>
                </ul>
              </section>

              <section className="draft-article-card reveal-on-scroll" id="rent">
                <h2>家賃は週額でも、月の生活に効いてくる</h2>
                <p>
                  New Zealandでは家賃を週額で見ることが多いですが、生活全体の見通しは月単位で考えると分かりやすくなります。SoraJPNZの計算機では、週額を月額に直すときに
                  <strong> 52 / 12 </strong>
                  を使っています。
                </p>
                <p>
                  たとえば、週の家賃が50ドル変わると、月ではおよそ
                  <strong> {formatCurrency(50 * monthlyFactor)} </strong>
                  の差になります。これは食費や通信費よりも大きく効くことがあり、生活の余白を考えるときの重要な前提になります。
                </p>
              </section>

              <section className="draft-article-card reveal-on-scroll" id="car">
                <h2>車を持つと見え方が変わる</h2>
                <p>
                  Aucklandで車があると、行ける場所や働ける場所は広がります。一方で、燃料、保険、整備、rego、WOF、駐車場などが毎月の生活費に乗ってきます。
                </p>
                <p>
                  これは「車は持つべきではない」という話ではありません。仕事、住む場所、釣りや海に行く頻度、生活の自由度まで含めて、車を持つ価値と費用を分けて考える必要があるという話です。
                </p>
              </section>

              <section className="draft-article-card reveal-on-scroll" id="savings">
                <h2>貯金目標と緊急資金を入れると、現実が見えやすい</h2>
                <p>
                  生活費を払えるだけなら、表面上は「生活できている」ように見えます。ただ、毎月の貯金目標や緊急資金を入れると、前提がかなり変わります。
                </p>
                <p>
                  特に海外生活では、仕事時間が急に減る、引っ越しが必要になる、車の修理が出る、帰国や家族の事情で大きな出費が出るなど、計画どおりにいかないことがあります。だからこそ、余白を数字で見ておくことが大事です。
                </p>
              </section>

              <section className="draft-article-card reveal-on-scroll" id="scenarios">
                <p className="eyebrow">Draft scenarios</p>
                <h2>下書きシナリオ</h2>
                <p>
                  以下は、公式データではなく、NZ生活リアリティ計算機MVPの仮定を使った説明用の例です。正確な手取り、家賃相場、税金、制度上の数字は必ず公式情報で確認してください。
                </p>
                <div className="draft-scenario-grid">
                  {scenarios.map((scenario) => (
                    <article className="draft-scenario-card" key={scenario.title}>
                      <span className={`draft-scenario-status ${scenario.result.status}`}>{scenario.result.statusLabel}</span>
                      <h3>{scenario.title}</h3>
                      <p>{scenario.body}</p>
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
                    </article>
                  ))}
                </div>
              </section>

              <section className="draft-article-card calculator-bridge reveal-on-scroll" id="calculator">
                <p className="eyebrow">Try your assumptions</p>
                <h2>自分の前提で試算してみる</h2>
                <p>
                  時給・労働時間・家賃・車・貯金目標を動かして、NZ生活の余白を確認できます。これは「答えを出す」ためではなく、
                  自分の前提のどこが強く、どこが脆いかを見るための道具です。
                </p>
                <a className="button primary" href={calculatorHref}>
                  <span>自分の前提で試算してみる</span>
                  <i className="ri-calculator-line" />
                </a>
              </section>

              <section className="draft-article-card warning reveal-on-scroll">
                <p className="eyebrow">Important</p>
                <h2>注意事項</h2>
                <p>
                  この記事は、NZ生活を考えるための個人的な下書きメモです。移民、ビザ、税金、雇用、法律、金融、投資の助言ではありません。
                  実際の判断には、必ずNew Zealand政府、IRD、INZ、その他公式情報、または資格を持つ専門家の情報を確認してください。
                </p>
              </section>

              <section className="draft-article-card reveal-on-scroll" id="todos">
                <h2>公式情報確認TODO</h2>
                <p>
                  公開版に近づける前に、以下の情報は一次情報で確認し、必要なら日付と出典を本文に追加します。
                </p>
                <ul className="draft-check-list">
                  {officialTodos.map((todo) => (
                    <li key={todo}>{todo}</li>
                  ))}
                </ul>
              </section>

              <section className="draft-article-card reveal-on-scroll">
                <h2>次にまとめたいこと</h2>
                <ul className="draft-check-list">
                  {nextTopics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </section>

              <section className="draft-article-card draft-cta-card reveal-on-scroll">
                <h2>SoraJPNZで続けて読む</h2>
                <p>
                  生活費の数字だけでなく、実際の生活メモ、データプロジェクト、動画で話した内容も少しずつ整理していきます。
                </p>
                <div className="button-row left">
                  <a className="button secondary" href={localize(locale, '/blog')}>
                    <span>Blog Hubへ戻る</span>
                    <i className="ri-article-line" />
                  </a>
                  <a className="button secondary" href={links.youtube} target="_blank" rel="noopener noreferrer">
                    <span>YouTubeを見る</span>
                    <i className="ri-youtube-fill" />
                  </a>
                  {instagramHref && (
                    <a className="button secondary" href={instagramHref} target="_blank" rel="noopener noreferrer">
                      <span>Instagramを見る</span>
                      <i className="ri-instagram-line" />
                    </a>
                  )}
                  <a className="button secondary" href={localize(locale, '/projects')}>
                    <span>Projectsを見る</span>
                    <i className="ri-folder-chart-line" />
                  </a>
                  <a className="button secondary" href={localize(locale, '/contact')}>
                    <span>問い合わせる</span>
                    <i className="ri-mail-line" />
                  </a>
                </div>
              </section>
            </article>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
