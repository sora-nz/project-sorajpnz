import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, links, Locale, socialLinks } from '../lib/content';
import { localize } from '../lib/routes';
import {
  calculateNzLifeReality,
  defaultNzLifeInputs,
  monthlyFactor,
  referenceWages,
  roughTakeHomeRate
} from '../lib/nzLifeRealityCalculator';
import type { CalculatorInputs } from '../lib/nzLifeRealityCalculator';
import { useMeta } from '../lib/useMeta';

type AucklandLivingCostArticleProps = {
  locale: Locale;
  path: string;
};

const articleTitle = 'Auckland生活費のリアル。家賃・車・貯金まで入れると、月いくら残る？';
const articleDescription =
  'Auckland生活で月にいくら残るのかを、家賃、車、貯金目標、緊急資金、日本円の参考換算から考えるSoraJPNZのレビュー中記事です。';

const articleMeta = [
  { label: '作成日', value: '2026-07-04' },
  { label: '最終更新日', value: '2026-08-27' },
  { label: '状態', value: 'Review / noindex' }
];

const tocItems = [
  { href: '#monthly-remaining', label: '時給だけでは見えないこと' },
  { href: '#rent', label: '家賃と車の重さ' },
  { href: '#car', label: '車を持つということ' },
  { href: '#sora-sense', label: '私が生活費を見るときに気にしていること' },
  { href: '#jpy-reference', label: '日本円で見る生活費' },
  { href: '#savings', label: '貯金できるか' },
  { href: '#scenarios', label: '3つの生活費試算' },
  { href: '#sora-conclusion', label: 'Soraの結論' }
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
      hourlyWage: referenceWages.livingWage,
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
      hourlyWage: referenceWages.livingWage,
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
      hourlyWage: referenceWages.livingWage,
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

const sourceReferences = [
  {
    title: '最低賃金',
    source: 'Employment New Zealand',
    url: 'https://www.employment.govt.nz/pay-and-hours/pay-and-wages/minimum-wage/minimum-wage-rates-and-types',
    note: '2026年4月1日からadult minimum wageは$23.95/hour、starting-out/training minimum wageは$19.16/hour。確認日: 2026-08-27。'
  },
  {
    title: 'Living Wage',
    source: 'Living Wage Movement Aotearoa New Zealand',
    url: 'https://www.livingwage.org.nz/lw25',
    note: '2025/26 Living Wageは$28.95/hour。2025年9月1日から適用されている値で、2026年9月以降は再確認が必要。確認日: 2026-08-27。'
  },
  {
    title: '税金・手取り確認',
    source: 'Inland Revenue',
    url: 'https://www.ird.govt.nz/income-tax/income-tax-for-individuals/types-of-individual-income/earning-salary-and-wages',
    note: 'PAYEは税コード、KiwiSaver、student loanなどで変わるため、正確な手取り確認に使う公式情報。確認日: 2026-08-27。'
  },
  {
    title: 'Market Rent / rental bond data',
    source: 'Tenancy Services',
    url: 'https://www.tenancy.govt.nz/rent-bond-and-bills/market-rent/',
    note: '直近6か月のbond dataをもとに毎月更新される参考値。地域、物件タイプ、対象期間を分けて見る必要がある。確認日: 2026-08-27。'
  },
  {
    title: 'NZD/JPY参考換算',
    source: 'Frankfurter',
    url: 'https://frankfurter.dev/',
    note: '計算機のNZD/JPY参考換算に使う公開API。取得できない場合は手動入力に戻す設計。確認日: 2026-08-27。'
  },
  {
    title: '為替データの公式統計確認候補',
    source: 'Reserve Bank of New Zealand',
    url: 'https://www.rbnz.govt.nz/statistics/series/exchange-and-interest-rates',
    note: '為替レートの公式統計を確認したい場合の参照先。確認日: 2026-08-27。'
  }
];

function formatCurrency(value: number) {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? '-' : '';
  return `${sign}$${Math.abs(rounded).toLocaleString('en-NZ')}`;
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

type ReferenceCardProps = {
  title: string;
  source: string;
  url: string;
  note: string;
};

function ReferenceCard({ title, source, url, note }: ReferenceCardProps) {
  return (
    <a className="article-link-card reference" href={url} target="_blank" rel="noopener noreferrer">
      <span className="article-link-label">{source}</span>
      <strong>{title}</strong>
      <p>{note}</p>
    </a>
  );
}

type CalculatorCTAProps = {
  href: string;
  buttonLabel: string;
};

function CalculatorCTA({ href, buttonLabel }: CalculatorCTAProps) {
  return (
    <a className="article-calculator-cta" href={href}>
      <span>
        <strong>NZ生活リアリティ計算機</strong>
        <small>時給・勤務時間・家賃・車・貯金目標を入れて、月に残る金額をNZDと日本円で確認できます。</small>
      </span>
      <em>
        {buttonLabel}
        <i className="ri-calculator-line" aria-hidden="true" />
      </em>
    </a>
  );
}

export function AucklandLivingCostArticle({ locale, path }: AucklandLivingCostArticleProps) {
  const calculatorHref = '/ja/tools/nz-life-reality-calculator';
  const instagramHref = socialLinks.find((item) => item.id === 'instagram')?.href;

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
              NZは日本より時給が高く見えるので、「ちゃんと働けば、それなりに余裕があるのでは」と思いがちです。
            </p>
            <p className="draft-article-lead">
              でもAucklandでは、家賃、車、食費、貯金まで入れると、同じ時給でも月に残る金額はかなり変わります。時給だけを見ていると、実際の生活より少し余裕があるように見えてしまいます。
            </p>
            <p className="draft-article-lead">
              この記事では、Aucklandで単身、フラット生活、または子どものいないカップルとして暮らす場合に、月の余白をどう考えればよいか整理します。
            </p>
            <p>
              主に、ワーホリ、学生、Post-study visa、キャリア初期など、20代〜30代前半の生活を想定しています。
            </p>
            <div className="article-link-card">
              <span className="article-link-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <img src={assets.logoMark} alt="" width="30" height="30" style={{ borderRadius: '50%' }} />
                Soraメモ
              </span>
              <p>
                Aucklandで暮らしていて感じるのは、時給より家賃と車の方が生活の余裕を左右することです。給料だけを見ると暮らせそうでも、固定費まで入れると見え方がかなり変わります。
              </p>
            </div>
            <CalculatorCTA href={calculatorHref} buttonLabel="NZ生活リアリティ計算機を使ってみる" />
            <dl className="draft-article-meta" aria-label="記事メタ情報">
              {articleMeta.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="article-link-card">
              <span className="article-link-label">この記事でわかること</span>
              <ul className="draft-check-list">
                <li>Aucklandで生活費を考えるとき、どこからお金が消えやすいか</li>
                <li>最低賃金やLiving Wageを見ても、それだけでは判断できない理由</li>
                <li>家賃、車、食費、貯金を含めて、どのくらい現実的に見ればいいか</li>
              </ul>
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
            <section className="draft-article-chapter" id="monthly-remaining">
              <h2>Auckland生活費は、時給だけ見ると勘違いする</h2>
              <p>
                日本から見ると、NZの時給は高く見えることがあります。
              </p>
              <p>
                ただ、実際の生活では、時給だけを見てもあまり意味がありません。
              </p>
              <p>
                同じ時給でも、週40時間働ける人と、授業やシフトの都合で週30時間になる人では、月の手取り感が大きく変わります。
              </p>
              <p>
                さらに、家賃、食費、通信費、車、保険、サブスク、外食、趣味、貯金目標まで入れると、「思ったより残らない」と感じることもあります。
              </p>
              <p>大事なのは、時給そのものよりも、次の前提をまとめて見ることだと思っています。</p>
              <ul className="draft-check-list">
                <li>週に何時間働けそうか</li>
                <li>家賃を週いくらで見るか</li>
                <li>車を持つか</li>
                <li>毎月いくら貯金したいか</li>
                <li>急な出費にどれくらい備えたいか</li>
              </ul>
              <p>
                時給を見るときは、Employment New Zealandの最低賃金や、Living Wage Movement Aotearoa New ZealandのLiving Wageも参考になります。
              </p>
              <p>
                ただ、Auckland生活では時給だけで余裕があるかは判断しにくいです。勤務時間、家賃、車、貯金目標まで入れると、同じ時給でも月に残る金額はかなり変わります。
              </p>
              <p>
                Employment New Zealandでは、2026年4月1日からadult minimum wageが <strong>${referenceWages.adultMinimum.toFixed(2)}/hour</strong>、starting-out/training minimum wageが <strong>$19.16/hour</strong> とされています（確認日: 2026-08-27）。
              </p>
              <p>
                Living Wage Movement Aotearoa New Zealandでは、2025/26のLiving Wageが <strong>${referenceWages.livingWage.toFixed(2)}/hour</strong> とされています。2025年9月1日から適用されている値なので、2026年9月以降に読む場合は最新値を確認してください（確認日: 2026-08-27）。
              </p>
              <p>
                正確な手取りは、税コード、KiwiSaver、student loan、控除、個人の状況で変わります。この記事の試算では生活感を見るために総収入の約{Math.round(roughTakeHomeRate * 100)}%を概算手取りとして使っていますが、正確な税額や手取りはIRD、給与明細、または専門家で確認する前提です。
              </p>
            </section>

            <section className="draft-article-chapter" id="rent">
              <h2>家賃でまず削られる</h2>
              <p>
                NZでは家賃を週額で見ることが多いです。給与も fortnight、つまり2週間単位で出ることがあるので、日本の月給ベースの感覚とは少し違います。
              </p>
              <p>
                ただ、生活に余裕があるかを考えるときは、月単位に直した方が実感に近いです。
              </p>
              <p>
                そのため、SoraJPNZの計算機では、週額を月額に直すときに <strong>52 ÷ 12</strong> を使っています。1年52週を12か月に割って、月あたりに均しているだけです。
              </p>
              <p>
                たとえば家賃が週$50違うと、月ではおよそ{formatCurrency(50 * monthlyFactor)}の差になります。
              </p>
              <p>
                $50/week と聞くと少しの差に見えますが、月で見ると食費や通信費より大きく効くこともあります。
              </p>
              <p>
                ただし、安い家賃だけを見ればいいわけでもありません。
              </p>
              <p>
                家賃を下げても、通勤時間が増える、車が必要になる、買い物が不便になる、治安や生活ストレスが増えることもあります。
              </p>
              <p>
                Aucklandでは、家賃と移動のバランスを一緒に見る必要があります。
              </p>
              <p>
                家賃はAuckland全体で一つの数字にするより、エリアや部屋タイプごとに見た方が現実に近いです。相場を確認するときは、Tenancy ServicesのMarket Rentで対象期間、エリア、物件タイプを分けて見るようにしています。
              </p>
            </section>

            <section className="draft-article-chapter" id="car">
              <h2>車を持つと、自由度と固定費が増える</h2>
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
                ただ、車を持つなら、その自由度に毎月いくら払っているのかは見ておいた方がいいです。
              </p>
              <p>
                特に、仕事の場所、住む場所、買い物、趣味、海に行く頻度まで含めると、車は単なる交通費ではなく、生活スタイルそのものに関わってきます。
              </p>
            </section>

            <section className="draft-article-chapter" id="sora-sense">
              <h2>私が生活費を見るときに気にしていること</h2>
              <p>
                私自身も、Aucklandで生活していて「収入がいくらか」だけでは生活の余裕は判断できないと感じています。
              </p>
              <p>
                家賃、食費、通信費、車、海や釣りに行く移動費、将来のための貯金を入れると、同じ収入でも月に残る金額の見え方がかなり変わります。
              </p>
              <p>
                特に自分の場合、車や移動費はただの出費ではなく、仕事、買い物、海に行くこと、生活の自由度とつながっています。
              </p>
              <p>
                だからこそ、単純に「車なしの方が安い」「家賃が安い方がいい」とは言い切れません。
              </p>
              <p>生活費を見るとき、私はまずこの3つを見ます。</p>
              <ul className="draft-check-list">
                <li>家賃</li>
                <li>車関連のコスト</li>
                <li>毎月どれくらい残したいか</li>
              </ul>
              <p>
                細かい節約も大事ですが、Auckland生活ではこの3つの前提が大きくズレると、月の余白が一気に変わります。
              </p>
              <p>
                今後、公開しても問題ない範囲で、自分の生活費メモも少しずつ足していく予定です。正確な家計簿を出すというより、Auckland生活を考えるときに何を見ているかを残していくイメージです。
              </p>
              {/*
                Internal TODO:
                If Sora wants to add personal living-cost memo later, add it here carefully.
                Do not show empty placeholders to readers.
                Possible fields:
                - Rent
                - Food
                - Car / transport
                - Phone / internet
                - Insurance
                - Subscriptions
                - Eating out / hobbies / fishing / ocean trips
              */}
            </section>

            <section className="draft-article-chapter" id="jpy-reference">
              <h2>日本円で考えると、生活費の見え方が変わる</h2>
              <p>
                日本語でNZ生活を考えるとき、NZDだけだと感覚がつかみにくいことがあります。
              </p>
              <p>
                たとえば、週$50の家賃差は、月ではおよそ{formatCurrency(50 * monthlyFactor)}です。これを日本円でも見ると、「毎月どれくらい重い差なのか」が一気に分かりやすくなります。
              </p>
              <p>
                SoraJPNZの計算機では、NZDの金額に加えて、日本円の参考換算も表示できます。
              </p>
              <p>
                為替レートは取得できる場合はFrankfurterのNZD/JPY参考レートを使って自動で表示し、必要に応じて手動で変更できます（確認日: 2026-08-27）。
              </p>
              <p>
                ただし、日本円換算はあくまで生活感をつかむための参考表示です。
              </p>
              <p>
                税務、会計、送金、投資判断に使うものではありません。為替レートは日々変わるので、厳密な判断ではなく「規模感を見るための補助」として扱うのが前提です。
              </p>
            </section>

            <section className="draft-article-chapter" id="savings">
              <h2>貯金できるかは、給料より固定費でほぼ決まる</h2>
              <p>
                生活費を払えているだけなら、表面上は「生活できている」ように見えます。
              </p>
              <p>
                でも、毎月少しでも貯金したい、次のビザや引っ越しに備えたい、車の修理や急な出費にも耐えたいと考えると、必要な余白は変わります。
              </p>
              <p>
                海外生活では、仕事時間が急に減る、引っ越しが必要になる、車の修理が出る、帰国や家族の事情で大きな出費が出ることもあります。
              </p>
              <p>
                だからこそ、「今月払えるか」だけでなく、「どれくらい余白を作れるか」を見ておくことが大事だと思います。
              </p>
            </section>

            <section className="draft-article-chapter" id="scenarios">
              <h2>3つの生活費試算</h2>
              <p>
                以下は、公式データではなく、SoraJPNZの計算機MVPを使った説明用の例です。おすすめの生活パターンではありません。
              </p>
              <p>
                見たいのは、「どの生活が正解か」ではなく、家賃、勤務時間、車の有無が変わると、月に残る金額がどれくらい動くかです。
              </p>
              <p>
                説明用の時給には、確認日時点で適用されている2025/26 Living Wageの <strong>${referenceWages.livingWage.toFixed(2)}/hour</strong> を使っています（確認日: 2026-08-27）。月収は計算機と同じく、総収入の約{Math.round(roughTakeHomeRate * 100)}%を概算手取りとして扱った値です。
              </p>
              <div className="article-scenario-notes">
                {scenarios.map((scenario) => (
                  <section key={scenario.title}>
                    <h3>{scenario.title}</h3>
                    <p>{scenario.body}</p>
                    <ul>
                      <li>概算手取り月収: {formatCurrency(scenario.result.monthlyIncomeUsedForCalculation)}</li>
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

            <section className="draft-article-chapter" id="calculator">
              <h2>結局、Aucklandで暮らせるかは「残るお金」で決まる</h2>
              <p>
                Auckland生活がきついかどうかは、人によってかなり違います。
              </p>
              <p>
                同じ時給でも、住む場所、車の有無、勤務時間、貯金目標、緊急資金の考え方で、月に残る金額は変わります。
              </p>
              <p>
                なので、この記事の数字はあくまでサンプルです。
              </p>
              <p>
                自分の時給、働けそうな時間、家賃、車コスト、貯金目標、緊急資金を入れて、自分の前提で一度見てみるのが一番分かりやすいと思います。
              </p>
              <CalculatorCTA href={calculatorHref} buttonLabel="自分の前提で試算してみる" />
            </section>

            <section className="draft-article-chapter" id="sora-conclusion">
              <div className="article-link-card">
                <span className="article-link-label">Soraの結論</span>
                <p>
                  Aucklandで生活費を考えるなら、時給よりも先に「家賃・車・食費・送金・貯金」を見た方がいいです。最低賃金やLiving Wageは参考になりますが、実際に余るかどうかは固定費でほぼ決まります。
                </p>
                <p>
                  「給料はいくらか」だけで判断すると、現実より少し甘く見えます。Aucklandでは、稼ぐ力と同じくらい、生活を小さく作る力も大事です。
                </p>
              </div>
            </section>

            <section className="draft-article-chapter" id="sources">
              <h2>参考にした公式情報</h2>
              <p>
                最低賃金、Living Wage、家賃、為替などは、以下の情報を参考にしています。数字は時期や条件によって変わるため、公開時点の確認日と対象期間を併記しています。
              </p>
              <div className="article-reference-grid">
                {sourceReferences.map((reference) => (
                  <ReferenceCard key={reference.title} {...reference} />
                ))}
              </div>
            </section>

            <section className="draft-article-callout warning" id="notes">
              <h2>注意事項</h2>
              <p>
                この記事は、NZ生活を考えるための個人的なフィールドノートです。
              </p>
              <p>
                移民、ビザ、税金、雇用、法律、金融、投資の助言ではありません。
              </p>
              <p>
                家族移住、住宅購入、高所得専門職向けの生活設計を扱う記事でもありません。
              </p>
              <p>
                実際の判断には、New Zealand政府、IRD、INZ、その他の公式情報、または資格を持つ専門家の情報を確認してください。
              </p>
            </section>

            <section className="draft-article-chapter" id="next">
              <h2>次にまとめたいこと</h2>
              <p>このテーマは、まだ整理したいことがいくつかあります。</p>
              <ul className="draft-check-list">
                {nextTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </section>

            <section className="draft-article-continue">
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
            {/*
              Internal maintenance checklist before linking this article publicly:
              - Reconfirm the Living Wage value on or after 2026-09-01.
              - Reconfirm the latest minimum wage and effective date from Employment New Zealand.
              - Confirm INZ wage thresholds before mentioning visa-related income rules.
              - Confirm IRD/take-home calculation guidance before discussing net pay.
              - Confirm rent data with Tenancy Services Market Rent / rental bond data if adding market figures.
              - Reconfirm NZD/JPY reference conversion source and manual override behavior.
            */}
          </div>
        </article>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
