export const calculatorProjectRepositoryUrl = 'https://github.com/sora-nz/project-sorajpnz';

export const calculatorProject = {
  en: {
    meta: {
      title: 'NZ Life Reality Calculator: Project Case Study | SoraJPNZ',
      description:
        'How SoraJPNZ turns New Zealand living-cost questions into a bilingual browser-side calculator: requirements, assumptions, scenario comparisons, implementation, and limitations.'
    },
    label: 'Independent project',
    title: 'NZ Life Reality Calculator',
    subtitle: 'From a question about living costs to a tool you can test.',
    lead:
      'An hourly wage only tells part of the story. I built a calculator that brings work hours, weekly rent, car costs, savings, and an emergency buffer into one view, so people can see which assumptions leave room and which make a plan fragile.',
    openTool: 'Try the live calculator',
    viewSource: 'View source code',
    summaryLabel: 'Project overview',
    summary: [
      { label: 'For', value: 'People comparing everyday living costs in New Zealand, with Japanese and English interfaces.' },
      { label: 'My contribution', value: 'Problem framing, requirements, design decisions, and review of AI-assisted implementation.' },
      { label: 'Built with', value: 'React, TypeScript, Vite, CSS, and the Frankfurter exchange-rate API.' },
      { label: 'Scope', value: 'An independent MVP. Browser-side estimates with no saved user inputs.' }
    ],
    previewAlt: 'NZ Life Reality Calculator interface with income, living-cost inputs, and estimated monthly results',
    previewCaption: 'Example interface. The live tool lets you change the inputs; the screenshot is not a recommended budget.',
    problemTitle: 'The question behind the tool',
    problemBody:
      'Living in Auckland made me look beyond the headline hourly wage. Rent is commonly discussed weekly, while some car and household costs are easier to estimate monthly. Keeping these figures separate makes it harder to see what is actually left.',
    problemSecond:
      'The useful question became: what changes if the same person pays more rent, works fewer hours, or needs a car? The MVP makes those trade-offs visible without asking someone to build a spreadsheet first.',
    requirementsTitle: 'What the MVP needed to do',
    requirements: [
      'Keep the unit visible beside each input: per hour, per week, or per month.',
      'Offer sliders and editable numbers, including decimal wages, without leading-zero confusion.',
      'Compare wage, work hours, and car costs while keeping the other assumptions visible.',
      'Show NZD results with an optional JPY reference, and keep working if the rate request fails.'
    ],
    flowTitle: 'How the calculation works',
    flowIntro:
      'The monthly view is a comparison basis. It does not predict the timing of a weekly rent payment or a fortnightly payday.',
    flow: [
      { title: 'Put the periods on the same basis', body: 'Weekly amounts are multiplied by 52 / 12. Monthly costs stay monthly.' },
      { title: 'Choose the income assumption', body: 'Use an entered monthly take-home amount, or a rough estimate from wage and weekly hours. The rough mode uses a fixed 82% take-home assumption, not a PAYE calculation.' },
      { title: 'Show what remains', body: 'Monthly expenses are deducted from the chosen income. Savings goals and the emergency-buffer target are shown separately so the cost of preparing for a setback stays visible.' },
      { title: 'Change one condition', body: 'Compare wage, hours, and car costs. Wage and hours comparisons use rough-income mode, even when the main result uses manually entered income.' }
    ],
    decisionsTitle: 'Implementation choices',
    decisions: [
      { title: 'Calculations separate from the screen', body: 'A pure TypeScript helper returns income, expense breakdowns, scenario results, and buffer estimates. The UI formats these outputs for each language, so the model can be adjusted without rewriting the page.' },
      { title: 'An exchange rate that can fail safely', body: 'Frankfurter provides a reference rate and date when available. Users can override it manually. The JPY display is separate from the NZD calculation, and the request does not contain their budget inputs.' },
      { title: 'Editing state separate from numeric state', body: 'Numeric fields allow a temporary empty value while editing and normalize on blur. Sliders share the committed numeric value. Hourly wages keep decimal support.' }
    ],
    codeTitle: 'A few places to inspect',
    codeLinks: [
      { title: 'Calculation model', path: 'src/lib/nzLifeRealityCalculator.ts', note: 'Inputs, monthly conversion, scenarios, result categories, and emergency-buffer logic.' },
      { title: 'Exchange-rate helper', path: 'src/lib/fxReference.ts', note: 'Rate fetching, validation, NZD-to-JPY conversion, and formatting.' },
      { title: 'Calculator interface', path: 'src/pages/NzLifeRealityCalculator.tsx', note: 'Bilingual labels, synchronized controls, input editing, and loading/fallback states.' }
    ],
    checksTitle: 'What I checked',
    checksIntro: 'The calculation helper was checked independently of the screen with these cases:',
    checks: [
      'A weekly rent increase changes the monthly remainder by the same amount multiplied by 52 / 12.',
      'Turning car costs off removes the configured fuel, parking, insurance, and maintenance amounts.',
      'A positive manual take-home amount overrides the rough income estimate.',
      'When no money remains after the savings target, the buffer estimate returns no clear build-up path rather than a misleading completion date.',
      'Zero income and zero-cost inputs return defined results instead of NaN values.'
    ],
    limitsTitle: 'What the tool cannot tell you',
    limits: [
      'The 82% assumption is deliberately simple. Tax code, deductions, KiwiSaver, student loans, and other personal circumstances are not modelled.',
      'The status labels follow the entered savings target. They are a comparison cue, not evidence that a particular income is enough for everyone.',
      'The emergency-buffer estimate starts from zero and uses the costs marked essential in this MVP. Existing savings, debts, setup costs, dependants, and variable income need separate consideration.',
      'The JPY amount is a lifestyle reference. It is not a bank quote or a rate for tax, accounting, remittance, or investment decisions.'
    ],
    privacyNote: 'Inputs stay in React state in the browser. This tool does not save them or send them with the exchange-rate request.',
    adviceNote: 'The calculator is an estimate, not immigration, tax, employment, legal, financial, or investment advice.',
    nextTitle: 'What I would improve next',
    nextBody:
      'I would start with feedback from people who have tried the tool: which inputs are unclear, which costs they miss, and where the monthly view needs a weekly or fortnightly explanation. The next model changes should follow those findings. I have not measured user outcomes or established demand yet.',
    contact: 'Ask about the project',
    back: 'Back to Projects'
  },
  ja: {
    meta: {
      title: 'NZ生活リアリティ計算機の制作記録 | SoraJPNZ',
      description:
        'NZ生活リアリティ計算機を、生活費の疑問からどう形にしたか。要件、計算の前提、条件比較、実装、検証と限界をまとめたSoraJPNZの制作記録です。'
    },
    label: '個人プロジェクト',
    title: 'NZ生活リアリティ計算機',
    subtitle: '生活費の疑問を、自分の条件で試せるツールに。',
    lead:
      '時給だけでは、月に残る金額は見えてきません。勤務時間、週払いの家賃、車コスト、貯金目標、緊急資金を一緒に見られる計算機を作りました。条件を少し変えると、生活の余白がどこで小さくなるか確かめられます。',
    openTool: '計算機を使う',
    viewSource: 'ソースコードを見る',
    summaryLabel: 'プロジェクトの概要',
    summary: [
      { label: '使う人', value: 'NZでの生活費を比べたい人。日本語と英語に対応しています。' },
      { label: '担当したこと', value: '課題の整理、要件、設計の判断、AIを使った実装の確認と改善。' },
      { label: '使ったもの', value: 'React、TypeScript、Vite、CSS、Frankfurterの為替API。' },
      { label: '現在の範囲', value: '個人制作のMVP。ブラウザ内で概算し、入力内容は保存しません。' }
    ],
    previewAlt: 'NZ生活リアリティ計算機の画面。収入と生活費の入力欄、月の残りの試算が並んでいる',
    previewCaption: '画面の表示例です。推奨する家計ではありません。実際の計算機では自分の数字に変えて試せます。',
    problemTitle: '作ろうと思ったきっかけ',
    problemBody:
      'Aucklandで暮らしていると、時給だけを見ても生活の余裕は分からないと感じます。家賃は週額、車や通信の費用は月額で見ることもあり、別々に考えると、結局いくら残るのかつかみにくくなります。',
    problemSecond:
      '同じ人でも、家賃が上がる、勤務時間が減る、車が必要になるとどう変わるのか。まずはその違いを、表計算ファイルを用意しなくても試せるようにしました。',
    requirementsTitle: '最初の版で大事にしたこと',
    requirements: [
      '時給、週額、月額のどれを入力するか、数字のそばに単位を出す。',
      'スライダーでも直接入力でも変えられるようにし、先頭の余計なゼロを残さない。時給は小数にも対応する。',
      'ほかの条件を見失わずに、時給、勤務時間、車の有無を比べられる。',
      'NZDに加えて日本円の参考表示を用意する。為替を取得できなくても計算は続けられる。'
    ],
    flowTitle: '数字をどう計算しているか',
    flowIntro:
      '月額は、条件を比べるための共通の単位です。週払いの家賃や2週間ごとの給与が、実際にいつ出入りするかまでは計算しません。',
    flow: [
      { title: '週額と月額をそろえる', body: '週額には52 / 12を掛けます。月額で入力した費用は、そのまま使います。' },
      { title: '収入の前提を選ぶ', body: '月の手取りを直接入力するか、時給と勤務時間から概算します。概算では税引き前の収入に固定の82%を掛けており、PAYEの税額計算はしていません。' },
      { title: '生活費を引き、備えも見る', body: '計算用の月収から生活費を引きます。貯金目標と緊急資金の目標額は別に表示し、急な出費に備える余地も確認できるようにしました。' },
      { title: '一つの条件を変えて比べる', body: '時給、勤務時間、車コストを比べます。時給と勤務時間の比較では、手取りを直接入力していても概算モードを使います。' }
    ],
    decisionsTitle: '実装で選んだこと',
    decisions: [
      { title: '計算と画面を分ける', body: '収入、支出の内訳、条件比較、緊急資金をTypeScriptの計算関数で返し、画面側で日英の表示を整えています。前提を見直すときに、画面全体を書き直さずに済む形です。' },
      { title: '為替が取れなくても使えるようにする', body: 'Frankfurterから参考レートと日付を取得し、手動での変更にも対応しました。円表示はNZDの収支計算から分けています。為替の取得時に家計の入力内容は送信しません。' },
      { title: '入力途中と、計算に使う数字を分ける', body: '入力途中は一時的に空欄にでき、入力欄を離れたときに表示を整えます。スライダーは同じ数値と連動し、時給の小数も残せるようにしました。' }
    ],
    codeTitle: 'コードで確認できるところ',
    codeLinks: [
      { title: '生活費の計算', path: 'src/lib/nzLifeRealityCalculator.ts', note: '入力項目、月額換算、条件比較、結果ラベル、緊急資金の計算。' },
      { title: '日本円の参考換算', path: 'src/lib/fxReference.ts', note: '為替の取得、レートの確認、NZDからJPYへの換算と表示。' },
      { title: '計算機の画面', path: 'src/pages/NzLifeRealityCalculator.tsx', note: '日英の表示、数値入力とスライダーの連動、為替取得中と取得失敗時の処理。' }
    ],
    checksTitle: '確認したこと',
    checksIntro: '画面とは別に計算関数を動かし、次の条件を確認しました。',
    checks: [
      '週の家賃を増やすと、その金額に52 / 12を掛けた分だけ月の残りが減る。',
      '車なしにすると、設定した燃料、駐車場、保険、整備の費用が外れる。',
      '正の月額手取りを直接入力すると、概算収入より優先される。',
      '貯金目標のあとに余力が残らない場合は、緊急資金ができるまでの期間を無理に出さない。',
      '収入と費用をゼロにしても、計算結果がNaNにならない。'
    ],
    limitsTitle: 'まだ計算できないこと',
    limits: [
      '82%は簡易的な前提です。税コード、控除、KiwiSaver、student loanなど、個別の税や給与条件は計算していません。',
      '結果ラベルは、入力した貯金目標との関係で決まります。その収入で誰もが生活できるという判定ではありません。',
      '緊急資金は、今の版で生活に必要な費用として分類した項目を使い、ゼロから積み立てる前提です。すでにある貯金、借入、初期費用、扶養家族、収入の変動は別に考える必要があります。',
      '円換算は生活費の規模感を見るための参考です。銀行の提示レートや、税務・会計・送金・投資判断に使うレートではありません。'
    ],
    privacyNote: '入力した数字は、ブラウザ内のReactの状態だけで扱います。保存せず、為替を取得するときにも送りません。',
    adviceNote: '概算ツールであり、移民、税務、雇用、法律、金融、投資の助言ではありません。',
    nextTitle: '次に確かめたいこと',
    nextBody:
      'まず使ってもらい、分かりにくい入力項目や抜けている費用、週払いや2週間ごとの給与について補足が必要なところを知りたいです。その声をもとに、計算の前提を少しずつ見直すつもりです。利用者への効果や需要は、まだ測定できていません。',
    contact: 'このプロジェクトについて連絡する',
    back: 'Projectsへ戻る'
  }
} as const;
