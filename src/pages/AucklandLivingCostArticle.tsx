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

const articleTitle = 'Auckland生活の出費と貯金の現実';
const articleDescription =
  'Auckland生活を、家賃、車、貯金目標、緊急資金、日本円の参考換算から考えるSoraJPNZのレビュー中記事です。';

const articleMeta = [
  { label: '作成日', value: '2026-07-04' },
  { label: '最終更新日', value: '2026-07-04' },
  { label: '状態', value: 'Review / noindex' }
];

const tocItems = [
  { href: '#target-reader', label: 'この記事で想定している読者' },
  { href: '#monthly-remaining', label: '時給より月にいくら残るか' },
  { href: '#rent', label: '家賃は週額でも生活は月で効く' },
  { href: '#car', label: '車と固定費' },
  { href: '#sora-sense', label: '私の生活感として' },
  { href: '#jpy-reference', label: '日本円で見る生活費' },
  { href: '#savings', label: '貯金目標と緊急資金' },
  { href: '#scenarios', label: '例としての試算' },
  { href: '#calculator', label: '自分の前提で試算する' },
  { href: '#todos', label: '公開前に確認する一次情報' }
];

const officialTodos = [
  '最低賃金: 最新の時給と適用日を公式情報で確認する。',
  'Living Wage: 最新の公表値、対象期間、公式説明を確認する。',
  'INZの賃金基準: 記事内で触れる場合は、必ずINZ公式情報と日付を確認する。',
  'IRDの手取り計算: 正確な手取りはIRDまたは給与明細・専門家で確認する案内を入れる。',
  '家賃データ: 家賃相場を入れる場合は、Stats NZ、MBIE、Tenancy Servicesなど一次情報で確認する。',
  'NZD/JPY参考換算: 計算機の取得元、更新日、手動上書きの扱いを公開前に再確認する。'
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
        <small>時給・勤務時間・家賃・車コスト・貯金目標・緊急資金を動かして、NZDと日本円の両方で生活の余白を確認できます。</small>
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
              「NZは日本より時給が高そう」と感じることがありますよね。でも私自身Aucklandで生活していると、時給が高い＝余裕がある、とはなかなか言えません。
            </p>
            <p className="draft-article-lead">
              家賃は週払い、車があると便利だけど固定費は増える。さらに少しでも貯金したい、急な出費にも備えたいとなると、月に残る金額の見え方はかなり変わります。
            </p>
            <p className="draft-article-lead">
              この記事では、Aucklandで単身または子どもなしカップルとして生活する日本語話者向けに、家賃・車・貯金目標を入れると月にどれくらい余白が残るのかを、SoraJPNZの計算機とつなげて整理します。
            </p>
            <dl className="draft-article-meta" aria-label="記事メタ情報">
              {articleMeta.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
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
                この記事は、家族移住や住宅購入を前提にしたものではありません。
              </p>
              <p>
                主に、20代〜30代前半くらいで、ワーホリ、学生、Post-study、パートナー、キャリア初期の仕事をしながら、AucklandやNZでの生活を現実的に考えている人向けに制作しています。
              </p>
              <p>
                ひとり暮らし、フラット生活、または子どものいないカップルの生活感に近い内容です。永住権の取り方、税金の最適化、投資判断、高所得専門職向けの移住パッケージを説明する記事ではありません。
              </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="monthly-remaining">
              <h2>まず見たいのは「時給」より「月にいくら残るか」</h2>
              <p>
                日本から見ると、NZの時給は高く見えることがあります。ただ、実際の生活では、時給だけを見てもあまり意味がありません。
              </p>
              <p>
                同じ時給でも、週40時間働ける人と、授業やシフトの都合で週30時間になる人では、月の手取り感が大きく変わります。さらに、家賃、食費、通信費、車、保険、サブスク、外食、趣味、貯金目標まで入れると、「思ったより残らない」と感じることもあります。
              </p>
              <p>大事なのは、時給そのものよりも、次の前提をまとめて見ることだと思っています。</p>
              <ul className="draft-check-list">
                <li>週に何時間働けそうか</li>
                <li>家賃を週いくらで見るか</li>
                <li>車を持つか</li>
                <li>毎月いくら貯金したいか</li>
                <li>急な出費にどれくらい備えたいか</li>
              </ul>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="rent">
              <h2>家賃は週額でも、生活は月で効いてくる</h2>
              <p>
                NZでは家賃を週額で見ることが多いです。給与もfortnight（2週間）単位で出ることが多いため、日本でのお金回りの感覚と少し違います。
              </p>
              <p>
                でもやはり、生活の余白を考えるときは、少し大きく月単位に直した方が分かりやすいです。SoraJPNZの計算機では、週額を月額に直すときに <strong>52 / 12</strong> を使っています。たとえば、週の家賃が$50変わると、月ではおよそ <strong>{formatCurrency(50 * monthlyFactor)}</strong> の差になります。
              </p>
              <p>
                $50/week と聞くと少しの差に見えますが、月で見ると食費や通信費より大きく効くこともあります。
              </p>
              <p>
                ただし、安い家賃だけを見ればいいわけでもありません。家賃を下げても、通勤時間が増える、車が必要になる、買い物が不便になる、治安や生活ストレスが増えることもあります。Aucklandでは、家賃と移動のバランスを一緒に見る必要があります。
              </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="car">
              <h2>車を持つと、生活の自由度と固定費が一緒に増える</h2>
              <p>
                Aucklandで車があると、かなり動きやすくなります。仕事探し、買い物、郊外への移動、海や釣りに行くことも楽になります。
              </p>
              <p>
                一方で、燃料、保険、整備、rego、WOF、駐車場などが毎月の生活費に乗ってきます。
              </p>
              <p>
                これは「車を持つべきではない」という話ではありません。むしろNZでは、車があることで生活の自由度がかなり上がる場面も多いです。
              </p>
              <p>
                ただ、車を持つなら、その自由度に毎月いくら払っているのかは見ておいた方がいいです。特に、仕事の場所、住む場所、買い物、趣味、海に行く頻度まで含めると、車は単なる交通費ではなく、生活スタイルそのものに関わってきます。
              </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="sora-sense">
              <h2>私(sora)の生活感として</h2>
              <p>
                私自身も、Aucklandで生活していて「収入がいくらか」だけでは生活の余裕は判断できないと感じています。
              </p>
              <p>
                家賃、食費、通信費、車、海や釣りに行く移動費、将来のための貯金を入れると、同じ収入でも月に残る金額の見え方がかなり変わります。
              </p>
              <p>
                特に自分の場合、車や移動費はただの出費ではなく、仕事、買い物、海に行くこと、生活の自由度とつながっています。だからこそ、単純に「車なしの方が安い」「家賃が安い方がいい」とは言い切れません。
              </p>
              <p>
                ここは今後、自分が公開してもいい範囲で、実際の生活費メモを少しずつ入れていきたい部分です。正確な家計簿を公開するというより、Auckland生活を考えるときに、どんな項目を見るべきかを残していくつもりです。
              </p>
              {/*
                Internal TODO:
                Add Sora personal living-cost memo later if comfortable.
                Possible fields: rent, food, car / transport, phone / internet, insurance,
                subscriptions, eating out / hobbies / fishing / ocean trips.
                Do not show empty placeholders to readers.
              */}
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="jpy-reference">
              <h2>日本円で見ると、生活費の重さが分かりやすい</h2>
              <p>
                日本語でNZ生活を考えるとき、NZDだけだと感覚がつかみにくいことがあると思います。
              </p>
              <p>
                たとえば、週$50の家賃差は、月ではおよそ <strong>{formatCurrency(50 * monthlyFactor)}</strong> です。これを日本円でも見ると、日本で生活してきた人なら「毎月どれくらい重い差なのか」が一気に分かりやすくなると思います。
              </p>
              <p>
                SoraJPNZの計算機では、NZDの金額に加えて、日本円の参考換算も表示できます。為替レートは取得できる場合は自動で表示し、必要に応じて手動で変更できます。
              </p>
              <p>
                ただし、日本円換算はあくまで生活感をつかむための参考表示です。税務、会計、送金、投資判断に使うものではありません。為替レートは日々変わるので、厳密な判断ではなく「規模感を見るための補助」として扱うのが前提です。
              </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="savings">
              <h2>貯金目標と緊急資金を入れると、現実が見えやすい</h2>
              <p>
                生活費を払えているだけなら、表面上は「生活できている」ように見えます。
              </p>
              <p>
                でも、毎月少しでも貯金したい、次のビザや引っ越しに備えたい、車の修理や急な出費にも耐えたいと考えると、必要な余白は変わります。
              </p>
              <p>
                海外生活では、仕事時間が急に減る、引っ越しが必要になる、車の修理が出る、帰国や家族の事情で大きな出費が出ることもあります。だからこそ、「今月払えるか」だけでなく、「どれくらい余白を作れるか」を見ておくことが大事だと思います。
              </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="scenarios">
              <h2>例としての試算</h2>
              <p>
                以下は、公式データではなく、SoraJPNZの計算機MVPを使った説明用の例です。おすすめの生活パターンではありません。
              </p>
              <p>
                見たいのは、「どの生活が正解か」ではなく、家賃、勤務時間、車の有無が変わると、月に残る金額がどれくらい動くかです。
              </p>
              <div className="article-scenario-notes">
                {scenarios.map((scenario) => (
                  <section key={scenario.title}>
                    <h3>{scenario.title}</h3>
                    <p>{scenario.body}</p>
                    <ul>
                      <li>計算用月収: {formatCurrency(scenario.result.monthlyIncomeUsedForCalculation)}</li>
                      <li>月の生活費: {formatCurrency(scenario.result.monthlyExpenses)}</li>
                      <li>月の残り: {formatCurrency(scenario.result.monthlyRemaining)}</li>
                    </ul>
                  </section>
                ))}
              </div>
              <p>
                この3つを見るだけでも、生活費の問題は「時給が高いか低いか」だけでは決まらないことが分かります。
              </p>
            </section>

            <section className="draft-article-chapter reveal-on-scroll" id="calculator">
              <h2>自分の前提で試算する</h2>
              <p>
                自分の時給、働けそうな時間、家賃、車コスト、貯金目標、緊急資金を入れると、月の余白をNZDと日本円の参考換算で試算できます。
              </p>
              <p>
                これは「答えを出す」ためのものではありません。自分の前提のどこが強く、どこが脆いかを見るための道具です。
              </p>
              <CalculatorCTA href={calculatorHref} />
            </section>

            <section className="draft-article-callout warning reveal-on-scroll">
              <h2>注意事項</h2>
              <p>
                この記事は、NZ生活を考えるための個人的なフィールドノートです。移民、ビザ、税金、雇用、法律、金融、投資の助言ではありません。
              </p>
              <p>
                実際の判断には、New Zealand政府、IRD、INZ、その他の公式情報、または資格を持つ専門家の情報を確認してください。
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
