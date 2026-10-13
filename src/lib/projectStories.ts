export const projectIndexCopy = {
  ja: {
    title: '作ったもの',
    intro: 'NZで暮らしていて気になったことを、計算機やダッシュボードにしています。使って試せるものと、作る途中で考えたことをまとめました。',
    calculator: {
      label: '生活費を試算する', title: 'NZ生活リアリティ計算機',
      body: '時給・勤務時間・家賃・車・貯金目標を変えて、月に残る金額をNZDと日本円で見られます。入力した数字は保存しません。',
      tools: 'React / TypeScript', action: '計算機を使う', story: '制作メモを読む'
    },
    relocation: {
      label: '公的データを比べる', title: 'NZの家賃・為替ダッシュボード',
      body: '地域別の家賃、NZD/JPY、食品価格指数を一つの画面に。データの取得から加工・検証・Tableauでの表示まで作成しました。',
      tools: 'Python / SQL / Tableau · 公的データ使用', action: '制作内容とダッシュボードを見る'
    },
    rent: {
      label: '架空データで試したこと', title: 'Rent Radar',
      body: '家賃情報の比較やフィルターを試した、初期のPower BIレポートです。すべて架空データで、実際の家賃相場を調べるものではありません。',
      tools: 'Power BI · 2025年8月 · 架空データ', action: 'プロトタイプを見る'
    },
    contactTitle: '作ったものについて話す',
    contactBody: '個人で制作したものです。採用・面談のご連絡や、設計についての質問はお問い合わせからどうぞ。',
    contact: 'お問い合わせ', github: 'GitHubを見る'
  },
  en: {
    title: 'Things I’ve built',
    intro: 'Tools and dashboards built around questions about living in New Zealand. Try them out, or read how I put them together.',
    calculator: {
      label: 'Interactive calculator', title: 'NZ Life Reality Calculator',
      body: 'Change wages, work hours, rent, car costs and savings goals to estimate what remains each month. See NZD and optional JPY amounts. Your inputs are not saved.',
      tools: 'React / TypeScript', action: 'Try the calculator', story: 'Read the case study'
    },
    relocation: {
      label: 'Public-data dashboard', title: 'NZ Relocation Affordability Dashboard',
      body: 'Local rent, NZD/JPY and food-price trends in one view. I built the workflow from public source files through cleaning and validation to a published Tableau dashboard.',
      tools: 'Python / SQL / Tableau · Public data', action: 'Explore the dashboard and build'
    },
    rent: {
      label: 'Earlier prototype', title: 'Rent Radar',
      body: 'An early Power BI report testing rental comparisons and filters. It uses mock data throughout, so it is not a source of real rental prices.',
      tools: 'Power BI · August 2025 · Mock data', action: 'View the prototype'
    },
    contactTitle: 'Talk about the work',
    contactBody: 'These are independent projects. Get in touch about a role, an interview, or a question about how I built them.',
    contact: 'Contact me', github: 'View GitHub'
  }
} as const;

export const relocationStory = {
  ja: {
    title: 'NZの家賃・為替ダッシュボード',
    lead: '日本円の貯蓄でNZ生活を考えると、家賃だけでなく為替も気になります。地域別の家賃、NZD/JPY、食品価格指数を、一つの画面で比べられるようにしました。',
    summaryLabel: '制作の概要',
    facts: [
      { label: '制作', value: '2026年 · 個人プロジェクト' },
      { label: '使用技術', value: 'Python / SQL / Tableau Public' },
      { label: 'データ', value: 'Tenancy Services / MBIE、RBNZ、Stats NZ' }
    ],
    previewTitle: 'まず、できたものを見る',
    previewCaption: '公開中のTableauダッシュボード。数値の対象月はダッシュボード内で確認できます。自動更新ではありません。',
    openDashboard: 'Tableauで開く', openSource: 'コードと資料を見る',
    embedAction: 'このページでダッシュボードを操作する', embedClose: 'プレビューを閉じる',
    mobileNote: 'グラフを操作する場合はTableauで開いてください。大きな画面での閲覧をおすすめします。',
    problemTitle: '別々のデータを、一緒に見たかった',
    problem: '家賃、為替、物価のデータは、それぞれ別の機関から、違う形式で公開されています。そのままでは、地域を選んだり生活費の予算を立てたりするときに見比べにくい。まずは同じ月で比較できる形にそろえました。',
    audience: '想定したのは、NZへの渡航を考えている人や、すでにNZで暮らしていて地域ごとの家賃を比べたい日本語話者です。日本とNZの住宅市場を直接比較するものではありません。',
    workflowTitle: '私が作成した範囲',
    workflow: [
      { title: '取得・加工・検証', body: '手動でダウンロードした公的データを、Pythonで整形・クリーニング・検証。ローカルで再実行できる処理フローを作成しました。' },
      { title: 'SQLとCSVで、計算の中身を追えるように', body: '変換ロジックをSQLで記述し、Tableau用のCSVを出力しました。家賃・為替・食品価格指数がそろう共通期間のファイルも作成しています。' },
      { title: '比較する画面と、確認するための資料', body: 'Tableauのダッシュボードと、人が確認するためのルールベースの月次メモを作成しました。要件、データソース、指標の計算、受け入れ基準、制約も文書に残しています。' }
    ],
    aiNote: 'Codexは、プロジェクト構造の作成、資料の整理、コードレビュー、処理フローの改善に使用しました。AIの支援を受けながら制作した個人プロジェクトです。',
    decisionsTitle: '設計で決めたこと',
    decisions: [
      { title: '家賃をNZDとJPYの両方で見る', body: 'NZで払う金額と、日本円の貯蓄から見た負担を同じ画面に置きました。為替の変化で円換算の家賃がどう動くかを比べられます。' },
      { title: '比較できる期間をそろえる', body: '家賃・為替・食品価格指数を共通して比較できる1999年以降を、推奨分析期間としています。' },
      { title: '食品価格の指数を、生活費そのものと混同しない', body: 'Food Price Indexは食品価格の変化を見る参考指標です。家計全体の生活費や、今のスーパーの価格を表すものとしては扱いません。' }
    ],
    viewsTitle: '画面で比べられること',
    views: [
      '最新月の平均家賃（NZD・JPY）、為替、食品価格指数、家賃プレッシャースコア',
      '最新月の家賃が高い15地域と、プレッシャーレベルごとの地域数',
      '家賃（NZD・JPY）、NZD/JPY、食品価格指数の月次推移'
    ],
    metricsTitle: '指標と前提',
    metrics: [
      { label: '家賃', body: 'Tenancy Services / MBIEの中央値の週額家賃を、推定月額に換算しています。「最新平均家賃」は、ダッシュボードの最新月に含まれるNZの市・地区の推定月額家賃の平均です。' },
      { label: 'NZD/JPY', body: 'RBNZの月次平均為替レートを使用しています。1NZドルあたりの日本円を示し、レートが上がると日本円の貯蓄から払う家賃が重くなる場合があります。' },
      { label: 'Food Price Index', body: 'Stats NZの食品価格指数です。使用した系列は2017年6月＝1000。ドル金額ではなく、食品価格の変化を示す指数です。' },
      { label: 'Rent Pressure Score', body: '家賃水準、家賃の推移、食品価格指数、NZD/JPYの動きを組み合わせた0–100の簡易比較指標です。低：55未満、中：55以上70未満、高：70以上。個人の支払い能力を判定するものではありません。' }
    ],
    limitsTitle: 'このデータで分からないこと',
    limits: [
      '家賃はTLA（市・地区）単位です。物件タイプはAll tenancy types、寝室数はAllとして集計しているため、特定の部屋やフラットの家賃は分かりません。',
      '食品価格指数とプレッシャースコアだけで、家計全体の生活費や暮らしやすさを判断することはできません。数値は比較と傾向把握の参考値で、固定の見積もりや金融助言ではありません。',
      '信頼できる市・地区の緯度経度データをまだ加えていないため、地図表示は含めていません。'
    ],
    nextTitle: '次に改善したいところ',
    nextBody: '地域選択の操作、家賃の区分、地図表示を改善したいと考えています。家計全体の物価指標の追加や月次更新の自動化は、手動の処理が安定してから検討します。',
    sourcesTitle: '使用したデータ',
    sources: [
      '月次の市・地区別賃貸ボンドデータ。家賃の比較に使用。',
      'B1の月次NZD/JPY。1NZドルあたりの日本円として使用。',
      'Selected Price IndexesのFood Price Index。食品価格の変化を見るために使用。',
      '公開中のダッシュボード。対象期間と数値を確認できます。'
    ],
    nextProjectLabel: '関連する制作記録', nextProjectTitle: 'Rent Radar',
    nextProjectBody: 'こちらは架空データで画面構成やフィルターを試した、初期のPower BIプロトタイプです。'
  },
  en: {
    title: 'NZ Relocation Affordability Dashboard',
    lead: 'For someone planning NZ life with savings in yen, rent and exchange rates belong in the same conversation. I brought local rent, NZD/JPY and food-price trends into one Tableau dashboard.',
    summaryLabel: 'Project details',
    facts: [
      { label: 'Built', value: '2026 · Independent project' },
      { label: 'Tools', value: 'Python / SQL / Tableau Public' },
      { label: 'Data', value: 'Tenancy Services / MBIE, RBNZ, Stats NZ' }
    ],
    previewTitle: 'See what I built',
    previewCaption: 'The published Tableau dashboard. Check the reporting month inside the dashboard; it does not refresh automatically.',
    openDashboard: 'Open in Tableau', openSource: 'View code and documentation',
    embedAction: 'Explore the dashboard on this page', embedClose: 'Close interactive preview',
    mobileNote: 'Open Tableau to use the chart controls. The dashboard is best viewed on a larger screen.',
    problemTitle: 'Making separate data sources comparable',
    problem: 'Rent, exchange rates and price indexes are published by different organisations in different formats. Before comparing places or budgets, I needed to clean the files and align them by month.',
    audience: 'I designed this for Japanese speakers planning a move to New Zealand or comparing places within NZ, especially those budgeting with yen savings. It does not directly compare the Japanese and NZ housing markets.',
    workflowTitle: 'What I worked on',
    workflow: [
      { title: 'Preparing and checking the data', body: 'I built a repeatable local workflow around manually downloaded public files, using Python to clean, validate and transform the data.' },
      { title: 'Keeping the transformations inspectable', body: 'SQL files record the transformation logic. CSV outputs feed Tableau, including a common-period file with rent, FX and food-price data available together.' },
      { title: 'Building the dashboard and its documentation', body: 'I created the Tableau dashboard and a rules-based monthly insight note for human review. The documentation covers requirements, sources, metric logic, acceptance criteria and limitations.' }
    ],
    aiNote: 'I used Codex for scaffolding, documentation, code review and workflow iteration. This is an independent project built with AI assistance.',
    decisionsTitle: 'Decisions behind the build',
    decisions: [
      { title: 'Show rent in NZD and JPY', body: 'The same view shows what rent costs locally and what it means for yen savings. This makes exchange-rate changes visible alongside rent changes.' },
      { title: 'Compare a common time period', body: 'The recommended analysis period is 1999 onward, when rent, FX and food-price context can be compared together.' },
      { title: 'Keep food prices in context', body: 'The Food Price Index provides context for changing food costs. It is not a model of total household expenses or real-time supermarket prices.' }
    ],
    viewsTitle: 'What the dashboard shows',
    views: [
      'Latest average rent in NZD and JPY, NZD/JPY, the Food Price Index and the Rent Pressure Score',
      'The 15 highest-rent locations in the latest month, and location counts by pressure band',
      'Monthly trends for rent in NZD and JPY, exchange rates and food prices'
    ],
    metricsTitle: 'Metrics and assumptions',
    metrics: [
      { label: 'Rent', body: 'Median weekly rent from Tenancy Services / MBIE is converted to estimated monthly rent. “Latest average rent” averages the estimated monthly figures across included NZ city/district areas in the latest dashboard month.' },
      { label: 'NZD/JPY', body: 'Monthly average exchange rates from RBNZ, expressed as yen per NZ dollar. A higher rate can make rent more expensive for someone using yen savings.' },
      { label: 'Food Price Index', body: 'The Stats NZ food-price series uses June 2017 = 1000. This is an index of price changes, not a dollar amount.' },
      { label: 'Rent Pressure Score', body: 'A directional 0–100 indicator combining rent level, rent trend, Food Price Index movement and NZD/JPY movement. Lower: below 55. Medium: 55 to below 70. High: 70 or above. It does not assess an individual’s ability to afford a home.' }
    ],
    limitsTitle: 'What the data cannot tell you',
    limits: [
      'Rent is aggregated at territorial authority level, with property type set to All tenancy types and bedrooms to All. It does not give the rent for a particular room or flat.',
      'The Food Price Index and pressure score do not model total household costs or personal affordability. Treat the figures as comparison indicators, not quotes or financial advice.',
      'A map is not included because reliable latitude/longitude values for the territorial authority areas have not yet been added.'
    ],
    nextTitle: 'What I would improve next',
    nextBody: 'I would improve the location selector, add reliable map coordinates and explore more detailed rent breakdowns. A fuller household living-cost index and automated monthly refresh would follow once the manual workflow is stable.',
    sourcesTitle: 'Data sources',
    sources: [
      'Monthly territorial authority rental bond data used for rent comparisons.',
      'B1 monthly NZD/JPY, expressed as yen per NZ dollar.',
      'Food Price Index from Selected Price Indexes, used for food-price context.',
      'The published dashboard, including the reporting period and figures.'
    ],
    nextProjectLabel: 'Related build', nextProjectTitle: 'Rent Radar',
    nextProjectBody: 'An earlier Power BI prototype using mock data to test comparisons, filters and dashboard structure.'
  }
} as const;

export const rentRadarStory = {
  ja: {
    title: 'Rent Radar',
    lead: '家賃情報をどう並べると比較しやすいか。架空データを使い、エリア別の指標とフィルターをPower BIで試しました。',
    facts: [
      { label: '制作', value: '2025年8月' },
      { label: '使用技術', value: 'Power BI' },
      { label: 'データ', value: 'すべて架空のサンプルデータ' }
    ],
    previewTitle: '初期プロトタイプ',
    previewCaption: '表示されている数値はすべて架空です。実際の家賃相場や地域別統計を表していません。',
    openDashboard: 'Power BIで開く', embedAction: 'このページでレポートを操作する', embedClose: 'プレビューを閉じる',
    mobileNote: 'フィルターを試す場合はPower BIで開いてください。大きな画面での閲覧をおすすめします。',
    scopeTitle: 'この段階で試したこと',
    scopeBody: 'まず比較したい項目と主要指標を決め、画面を組むための架空の家賃データを作成しました。エリア別の比較指標をモデル化し、フィルターと比較ビューを備えたレポートにしています。',
    decisionsTitle: '画面を作るときに考えたこと',
    decisions: [
      { title: '何を最初に見せるか', body: '要約指標と比較グラフを配置し、全体を見てから条件を絞れる構成を試しました。' },
      { title: 'どう比較するか', body: 'エリアごとの指標とフィルターを組み合わせ、条件を変えたときの比較の見せ方を検討しました。' }
    ],
    limitsTitle: '実際の家賃を調べるものではありません',
    limitsBody: '小規模な架空データで作った、画面構成と操作を試すためのレポートです。実際の家賃市場の統計や地域別データは含まれていません。',
    nextLabel: '公的データで作ったもの', nextTitle: 'NZの家賃・為替ダッシュボード',
    nextBody: 'Tenancy Services / MBIE、RBNZ、Stats NZのデータを加工・検証して作成したTableauダッシュボードも公開しています。',
    nextAction: '制作内容を見る'
  },
  en: {
    title: 'Rent Radar',
    lead: 'An early Power BI prototype exploring how to compare rental information. I used mock data to test area-level metrics, filters and comparison views.',
    facts: [
      { label: 'Built', value: 'August 2025' },
      { label: 'Tools', value: 'Power BI' },
      { label: 'Data', value: 'Mock/sample data throughout' }
    ],
    previewTitle: 'The early prototype',
    previewCaption: 'Every figure shown is mock data. It does not represent rental market statistics or actual suburb-level data.',
    openDashboard: 'Open in Power BI', embedAction: 'Explore the report on this page', embedClose: 'Close interactive preview',
    mobileNote: 'Open Power BI to try the filters. The report is best viewed on a larger screen.',
    scopeTitle: 'What I tested',
    scopeBody: 'I defined the dashboard structure and key metrics, generated sample rental data and modelled area-level indicators. I then built the Power BI report with filters and comparison views.',
    decisionsTitle: 'Questions behind the layout',
    decisions: [
      { title: 'What should someone see first?', body: 'I placed summary metrics alongside comparison charts to test a path from an overview to more specific conditions.' },
      { title: 'How should the comparisons work?', body: 'I combined area-level indicators with filters to explore how the view changes as someone narrows the data.' }
    ],
    limitsTitle: 'Not a rental market analysis tool',
    limitsBody: 'This is a layout and interaction prototype built with a small, limited mock dataset. It contains no real rental market statistics or actual suburb-level data.',
    nextLabel: 'Built with public data', nextTitle: 'NZ Relocation Affordability Dashboard',
    nextBody: 'For a later Tableau build, I prepared and validated real rent, exchange-rate and food-price data from Tenancy Services / MBIE, RBNZ and Stats NZ.',
    nextAction: 'Explore the build'
  }
} as const;
