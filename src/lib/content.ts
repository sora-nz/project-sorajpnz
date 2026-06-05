export type Locale = 'en' | 'ja';

export const siteUrl = 'https://sorajpnz.com';

export const assets = {
  logoFull: '/assets/sora-jpnz-logo-full.png',
  logoMark: '/assets/sora-jpnz-logo-mark.png',
  hero: '/assets/homepage1.png',
  projectsBg: '/assets/homepage2.png',
  profileBg: '/assets/homepage3.png',
  dashboard: '/assets/nz-relocation-dashboard.png',
  rentRadar: '/assets/rentradar.png',
  avatar: '/assets/sora-avatar.png'
};

export const links = {
  email: 'mailto:contact@sorajpnz.com',
  emailText: 'contact@sorajpnz.com',
  privacyEmailText: 'privacy@sorajpnz.com',
  privacyEmail: 'mailto:privacy@sorajpnz.com',
  linkedin: 'https://www.linkedin.com/in/soraoya/',
  github: 'https://github.com/sora-nz',
  youtube: 'https://www.youtube.com/@yurufuwa_life',
  relocationGithub: 'https://github.com/sora-nz/nz-relocation-affordability-dashboard',
  tableau:
    'https://public.tableau.com/app/profile/sora.oya/viz/NZ-JapanRelocationAffordabilityDashboard/NZ-JapanRelocationAffordabilityDashboard',
  tableauEmbed:
    'https://public.tableau.com/views/NZ-JapanRelocationAffordabilityDashboard/NZ-JapanRelocationAffordabilityDashboard?:embed=y&:showVizHome=no',
  powerBi:
    'https://app.powerbi.com/view?r=eyJrIjoiOTdlNmRhZWMtODY4Mi00NDllLTk1ZGMtNjg0N2VjM2Q3MjM4IiwidCI6IjliNzM4NTI2LTY3N2YtNDY2MS1hYTVlLTgyZjk1NDdiZDBhNCJ9',
  powerBiEmbed:
    'https://app.powerbi.com/view?r=eyJrIjoiOTdlNmRhZWMtODY4Mi00NDllLTk1ZGMtNjg0N2VjM2Q3MjM4IiwidCI6IjliNzM4NTI2LTY3N2YtNDY2MS1hYTVlLTgyZjk1NDdiZDBhNCJ9'
};

export const common = {
  en: {
    name: 'Sora Oya',
    shortName: 'Sora',
    home: 'Home',
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    disclaimer: 'Disclaimer',
    navigation: 'Navigation',
    legal: 'Legal',
    connect: 'Connect',
    language: 'Language',
    english: 'English',
    japanese: 'Japanese',
    siteTagline: 'Turning data into clear decisions',
    viewProject: 'View Project',
    viewProjects: 'View Projects',
    emailMe: 'Email Me',
    backToProjects: 'Back to Projects',
    footerPrivacyOfficer: 'Privacy Officer: Sora Oya - privacy@sorajpnz.com'
  },
  ja: {
    name: '大谷 空',
    shortName: '空',
    home: 'ホーム',
    projects: 'プロジェクト',
    blog: 'ブログ',
    contact: 'お問い合わせ',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
    disclaimer: '免責事項',
    navigation: 'ナビゲーション',
    legal: 'リーガル',
    connect: '連絡先',
    language: '言語',
    english: 'English',
    japanese: '日本語',
    siteTagline: 'データを、意思決定に使える情報へ',
    viewProject: 'プロジェクトを見る',
    viewProjects: 'プロジェクト一覧',
    emailMe: 'メールする',
    backToProjects: 'プロジェクト一覧へ戻る',
    footerPrivacyOfficer: 'プライバシー担当: Sora Oya - privacy@sorajpnz.com'
  }
} as const;

export const seo = {
  en: {
    home: {
      title: 'Sora Oya | Data Analyst Portfolio in Auckland',
      description:
        'Auckland-based Business Analyst / Data Analyst portfolio featuring Python, SQL, Tableau, Power BI, and public-data dashboard projects.'
    },
    projects: {
      title: 'Data Analytics Projects | Sora Oya',
      description:
        'Explore practical analytics projects covering New Zealand relocation affordability, rent dashboards, public data, Tableau, and Power BI.'
    },
    relocation: {
      title: 'NZ Relocation Affordability Dashboard | Sora Oya',
      description:
        'A Tableau public-data dashboard comparing New Zealand rent, NZD/JPY exchange-rate impact, and selected price-index context for relocation planning.'
    },
    rentRadar: {
      title: 'Rent Radar Power BI Dashboard | Sora Oya',
      description:
        'An early Power BI rental dashboard prototype showing BI layout, mock rental indicators, filters, and comparison-focused dashboard design.'
    },
    blog: {
      title: 'Blog | Sora Oya',
      description:
        'Notes on data analysis, New Zealand life, relocation, training, and practical portfolio projects from Sora Oya.'
    },
    contact: {
      title: 'Contact | Sora Oya',
      description:
        'Contact Sora Oya for Business Analyst / Data Analyst opportunities, project enquiries, interviews, or data analysis conversations.'
    }
  },
  ja: {
    home: {
      title: '大谷 空 | データ分析ポートフォリオ',
      description:
        'オークランド拠点のBusiness Analyst / Data Analystポートフォリオ。Python、SQL、Tableau、Power BI、公的データ分析の実例を掲載しています。'
    },
    projects: {
      title: 'データ分析プロジェクト | 大谷 空',
      description:
        'ニュージーランド移住向け家賃負担、家賃ダッシュボード、公的データ、Tableau、Power BIを使った分析プロジェクトです。'
    },
    relocation: {
      title: 'NZ移住向け家賃負担ダッシュボード | 大谷 空',
      description:
        'ニュージーランドの家賃、NZD/JPY為替、食品価格指数を組み合わせた、移住検討向けのTableau公的データダッシュボードです。'
    },
    rentRadar: {
      title: 'Rent Radar Power BIダッシュボード | 大谷 空',
      description:
        '架空データを使い、家賃情報の整理、比較、フィルター設計を試した初期Power BIダッシュボードプロトタイプです。'
    },
    blog: {
      title: 'ブログ | 大谷 空',
      description:
        'データ分析、ニュージーランド生活、移住、トレーニング、ポートフォリオ開発についての記録です。'
    },
    contact: {
      title: 'お問い合わせ | 大谷 空',
      description:
        'Business Analyst / Data Analystの機会、面談、プロジェクト相談、データ分析に関するお問い合わせはこちらから。'
    }
  }
} as const;

export const home = {
  en: {
    title: 'Sora Oya',
    role: 'Business Analyst / Data Analyst Portfolio',
    tagline: 'Turning operational problems and public data into clear, decision-ready information.',
    description:
      "I was born in Japan and have lived in New Zealand since 2019. I studied Business at AUT, majoring in Information Systems and Finance, and later worked in operations-focused roles in Auckland's micromobility sector. My projects explore practical topics such as housing, living costs, mobility, and currency movement.",
    primaryCta: 'View Featured Project',
    contactCta: 'Contact Me',
    projectsTitle: 'Projects',
    aboutTitle: 'About Me',
    about:
      "I am working toward Business Analyst / Data Analyst roles, focusing on turning practical problems into clear, decision-ready information. My portfolio projects use public data to explore topics such as housing, living costs, mobility, and currency movement through data cleaning, metric design, dashboards, and insight reporting.",
    contactTitle: 'Contact',
    contact:
      'For hiring, interviews, or project-related enquiries, please get in touch. I am open to Business Analyst / Data Analyst opportunities, as well as conversations around data analysis, reporting, and process improvement.'
  },
  ja: {
    title: '大谷 空',
    role: 'Business Analyst / Data Analyst Portfolio',
    tagline: '業務課題や公的データを、意思決定に使える情報へ整理します。',
    description:
      '日本出身で、2019年からニュージーランドに住んでいます。AUTでBusinessを学び、Information SystemsとFinanceを専攻しました。その後、オークランドのマイクロモビリティ領域で、オペレーション寄りの業務に携わりました。ポートフォリオでは、住居費、生活コスト、移動、為替など、実用的なテーマをデータで扱っています。',
    primaryCta: '注目プロジェクトを見る',
    contactCta: '連絡する',
    projectsTitle: 'プロジェクト',
    aboutTitle: '自己紹介',
    about:
      'Business Analyst / Data Analystとして、実務上の課題を整理し、意思決定に使える情報へ変換することを重視しています。公的データを使ったポートフォリオでは、データクリーニング、指標設計、ダッシュボード、インサイトレポートを通じて、住宅、生活費、移動、為替などのテーマを扱っています。',
    contactTitle: 'お問い合わせ',
    contact:
      '採用、面談、プロジェクトに関するご連絡はこちらからお願いします。Business Analyst / Data Analystとしての機会に加え、データ分析、レポーティング、業務改善に関する相談も歓迎しています。'
  }
} as const;

export const contactPage = {
  en: {
    title: 'Contact',
    intro: "Feel free to reach out to me. I'll get back to you as soon as possible.",
    emailLabel: 'Email',
    privacyLabel: 'Privacy contact',
    nameLabel: 'Name',
    namePlaceholder: 'Enter your name',
    emailFieldLabel: 'Email',
    emailPlaceholder: 'Enter your email',
    messageLabel: 'Message',
    messagePlaceholder: 'Enter your message (max 500 characters)',
    characters: 'characters',
    send: 'Send Message',
    sending: 'Sending...',
    success: 'Thank you. Your message has been sent.',
    error: 'Sorry, the form could not be sent. Please email me directly.',
    subject: 'Contact form - Sora Oya'
  },
  ja: {
    title: 'お問い合わせ',
    intro: 'お気軽にお問い合わせください。できるだけ早くご返信いたします。',
    emailLabel: 'メール',
    privacyLabel: '個人情報問い合わせ',
    nameLabel: '氏名',
    namePlaceholder: 'お名前を入力してください',
    emailFieldLabel: 'メールアドレス',
    emailPlaceholder: 'メールアドレスを入力してください',
    messageLabel: 'メッセージ',
    messagePlaceholder: 'メッセージを入力してください（500文字以内）',
    characters: '文字',
    send: '送信',
    sending: '送信中...',
    success: 'お問い合わせを送信しました。',
    error: '送信できませんでした。メールで直接ご連絡ください。',
    subject: 'お問い合わせフォーム - Sora Oya'
  }
} as const;

export const projects = {
  en: {
    title: 'Projects',
    subtitle: 'Practical analytics projects that turn public and operational data into usable decisions.',
    featured: 'Featured',
    relocationTitle: 'New Zealand Relocation Affordability Dashboard',
    relocationDescription:
      'An end-to-end public-data dashboard combining MBIE/Tenancy Services rent data, RBNZ NZD/JPY exchange rates, and Stats NZ Food Price Index data to support relocation affordability comparison for Japanese-speaking users considering New Zealand.',
    rentRadarTitle: 'Rent Radar (Power BI)',
    rentRadarDescription: 'An earlier BI prototype for rental dashboard design using mock data.',
    tags: ['Python', 'SQL', 'Tableau', 'Public Data', 'Business Analysis', 'Data Validation'],
    rentTags: ['Power BI', 'Dashboard Design', 'Mock Data']
  },
  ja: {
    title: 'プロジェクト',
    subtitle: '公的データや業務データを、実際に判断へ使える形にする分析プロジェクトです。',
    featured: '注目',
    relocationTitle: 'ニュージーランド移住向け 家賃負担ダッシュボード',
    relocationDescription:
      'MBIE/Tenancy Servicesの家賃データ、RBNZのNZD/JPY為替レート、Stats NZのFood Price Indexを組み合わせ、ニュージーランド移住を検討する日本語話者向けに、移住に向けた家賃負担の比較を支援する公的データダッシュボードです。',
    rentRadarTitle: 'Rent Radar (Power BI)',
    rentRadarDescription: '架空サンプルデータを使用した、家賃ダッシュボード設計の初期BIプロトタイプです。',
    tags: ['Python', 'SQL', 'Tableau', '公的データ', '業務分析', 'データ検証'],
    rentTags: ['Power BI', 'ダッシュボード設計', 'サンプルデータ']
  }
} as const;

export const relocation = {
  en: {
    title: 'New Zealand Relocation Affordability Dashboard',
    subtitle:
      'For Japanese-speaking movers: NZ rent, NZD/JPY exchange-rate impact, and Stats NZ Food Price Index context.',
    meta: 'Completed Tableau dashboard | 2026 | Tableau | Public Data',
    previewTitle: 'Dashboard Preview',
    viewTableau: 'View Tableau Dashboard',
    viewGithub: 'View GitHub Repository',
    interactiveTitle: 'Interactive Preview',
    sections: [
      {
        label: 'Project Summary',
        body:
          'This project is an end-to-end data workflow and Tableau dashboard designed to support early relocation and budgeting decisions for Japanese-speaking people considering life in New Zealand. The dashboard brings together three real public data sources: New Zealand rental bond data, NZD/JPY exchange rates, and the Stats NZ Food Price Index. The goal is to help users compare rent pressure by location, understand estimated rent in both NZD and JPY, and review selected cost-context trends over time. This is not a direct comparison of New Zealand and Japanese markets. The Japan connection is the decision context: Japanese-speaking users may need to understand New Zealand rent in both NZD and JPY.'
      },
      {
        label: 'Business Problem',
        body:
          'Japanese newcomers to New Zealand and Japanese-speaking residents often need to understand where they can realistically live and how much money they should prepare before making relocation or budgeting decisions. Public data exists, but it is scattered across different organisations and file formats. Rent data, exchange-rate data, and price-index data are usually published separately, so users still need cleaning, alignment, transformation, and interpretation before the data becomes useful for practical decision-making. This project turns scattered public data into a single decision-support view for comparing location-level rent pressure and broader cost context.'
      },
      {
        label: 'Target Users',
        body:
          'Japanese people planning to move to New Zealand. Japanese speakers already living in New Zealand who want to compare locations. People with Japanese-yen savings who want to understand the NZD/JPY impact on rent affordability. Community advisers, analysts, or hiring managers who want to see a clear public-data workflow from source files to dashboard output.'
      },
      {
        label: 'Data Sources',
        body:
          'This dashboard uses real public data from: Tenancy Services / MBIE monthly territorial authority rental bond data for rent. Reserve Bank of New Zealand B1 monthly exchange-rate data for NZD/JPY. Stats NZ Selected Price Indexes, using the Food Price Index as selected-price context. The Food Price Index is used as a monthly selected-price context for everyday cost pressure. It is not presented as a full household living-cost model. The recommended analysis period is 1999 onward because this is the common period where rent, FX, and selected-price context can be compared together.'
      },
      {
        label: 'Dashboard Sections',
        body:
          'The completed Tableau dashboard includes: KPI cards for latest average rent in NZD and JPY. Latest NZD/JPY rate. Latest Food Price Index level. Latest rent pressure score. Top 15 locations by rent in the latest month. Location count by rent pressure level. Average rent trend in NZD. Average rent trend in JPY. NZD/JPY exchange-rate trend. Food Price Index trend.'
      },
      {
        label: 'Metric Notes',
        body:
          'Latest average rent shows the average estimated monthly rent across included New Zealand city/district areas in the latest available dashboard month. NZD/JPY shows Japanese yen per 1 New Zealand dollar. A higher rate can increase pressure for people using Japanese-yen savings. Food Price Index is an index, not a dollar amount. In the selected Stats NZ series, June 2017 month equals 1000. It is used as selected food-price context only, not as a full household living-cost model. Rent Pressure Score is a simple directional 0-100 comparison indicator based on rent level, rent trend, Food Price Index movement, and NZD/JPY movement. It is not a complete affordability model or financial advice. Pressure bands: Lower: score below 55. Medium: score from 55 to below 70. High: score 70 or above.'
      },
      {
        label: 'Key Insights',
        body:
          'The dashboard helps users quickly see: which territorial authority areas have the highest estimated monthly rents. How New Zealand rent levels translate into Japanese yen. Whether NZD/JPY movement increases or reduces pressure for people using Japanese-yen savings. How selected food-price context has changed over time. How locations are distributed across simple affordability pressure bands. The affordability pressure score is directional only. It is designed to support comparison and discussion, not to replace personal financial planning or detailed economic modelling.'
      },
      {
        label: 'Limitations',
        body:
          'Rent data is aggregated at territorial authority level. Property type is aggregated as All tenancy types. Bedrooms are aggregated as All. The Food Price Index is selected-price context, not a full household living-cost model. The affordability pressure score is a simple indicator, not a complete economic model. Map view is excluded because reliable territorial authority latitude/longitude values were not yet added. The dashboard supports early comparison and budgeting context only. It is not financial advice.'
      },
      {
        label: 'Tools Used',
        body:
          'Python for data preparation, cleaning, validation, and output generation. SQL for transparent transformation logic. CSV files as simple local inputs and outputs. Tableau Public for dashboard design and publishing. Markdown documentation for requirements, data-source notes, metric logic, and project explanation. Codex as an AI-assisted development tool for scaffolding, documentation, code review, and workflow iteration.'
      },
      {
        label: 'Potential Improvements',
        body:
          'Add reliable latitude/longitude values for a New Zealand territorial authority bubble map. Improve Tableau location selector behaviour. Add more granular rent breakdowns if a reliable official public source is available. Consider a fuller Household Living-costs Price Index in a future version. Automate monthly refresh later, after the manual workflow remains stable.'
      },
      {
        label: 'Data Notes',
        body:
          'Rent figures are based on Tenancy Services / MBIE rental bond data. The dashboard uses median weekly rent, converted into estimated monthly rent. Property type and bedrooms are aggregated as All tenancy types / All. Exchange rates use monthly averages. Food prices use the Stats NZ Food Price Index rather than real-time supermarket data. Treat all numbers as directional indicators, not fixed quotes.'
      }
    ],
    built: [
      'A local, repeatable data workflow using manually downloaded public data files.',
      'Python scripts to prepare, clean, validate, and transform rent, FX, and selected-price data.',
      'SQL transformation files to make the metric logic transparent and easy to inspect.',
      'Tableau-ready CSV outputs, including a common-period dashboard file where rent, FX, and selected-price context are all available.',
      'A completed Tableau dashboard.',
      'A rules-based monthly insight note for human review.',
      'Documentation covering the business problem, requirements, data sources, metric logic, acceptance criteria, and limitations.'
    ],
    referencesTitle: 'References / Data Sources',
    references: [
      {
        label: 'Tenancy Services / MBIE rental bond data',
        url: 'https://www.tenancy.govt.nz/about-tenancy-services/data-and-statistics/rental-bond-data/',
        desc: 'MBIE / Tenancy Services: monthly territorial authority rental bond data for rent comparison.'
      },
      {
        label: 'Reserve Bank of New Zealand B1 monthly exchange rates',
        url: 'https://www.rbnz.govt.nz/statistics/series/exchange-and-interest-rates/new-zealand-dollar-exchange-rates',
        desc: 'Monthly NZD/JPY exchange rate, treated as Japanese yen per 1 NZ dollar.'
      },
      {
        label: 'Stats NZ Selected Price Indexes metadata',
        url: 'https://datainfoplus.stats.govt.nz/Item/nz.govt.stats/9e9f65b8-533f-4e96-8d6e-030d37de1a65',
        desc: 'Food Price Index used as selected food-price context.'
      },
      {
        label: 'Tableau Public dashboard',
        url: links.tableau,
        desc: 'Tableau Public: published interactive dashboard.'
      }
    ],
    nextLabel: 'Next Project'
  },
  ja: {
    title: 'ニュージーランド移住向け 家賃負担ダッシュボード',
    subtitle:
      '日本語話者向けに、NZの家賃、NZD/JPY為替レート、Stats NZ食品価格指数をまとめて比較します。',
    meta: '完了済みダッシュボード | 2026 | Tableau | 公的データ',
    previewTitle: 'ダッシュボードプレビュー',
    viewTableau: 'Tableauダッシュボードを見る',
    viewGithub: 'GitHubリポジトリを見る',
    interactiveTitle: 'インタラクティブプレビュー',
    sections: [
      {
        label: 'プロジェクト概要',
        body:
          'このプロジェクトは、ニュージーランドへの移住や生活費の見積もりを考える日本語話者向けに作成した、データワークフローとTableauダッシュボードです。Tenancy Services / MBIEの家賃データ、RBNZのNZD/JPY為替レート、Stats NZ Food Price Indexを組み合わせ、地域ごとの家賃負担、円換算した家賃、物価の参考指標を一つの画面で確認できるようにしました。このダッシュボードは、ニュージーランドと日本の市場を直接比較するものではありません。日本語話者がNZでの家賃をNZDとJPYの両方で把握し、移住や予算検討に使いやすくすることを目的としています。'
      },
      {
        label: 'ビジネス課題',
        body:
          '家賃、為替、物価に関する公的データは存在しますが、別々の機関・形式で公開されているため、そのままでは移住や予算検討に使いにくい状態です。このプロジェクトでは、散らばった公的データを整理・突合・変換し、場所選びや生活費の初期判断に使いやすい形へまとめました。'
      },
      {
        label: '対象ユーザー',
        body:
          '主な対象は、ニュージーランドへの移住を検討している日本人、すでにニュージーランドに住んでいて地域ごとの家賃を比較したい日本語話者、日本円の貯蓄を持ちNZD/JPYの影響を把握したい人です。また、採用担当者に向けて、公的データを使った分析ワークフローを示すポートフォリオとしても作成しています。'
      },
      {
        label: 'データソース',
        body:
          'このダッシュボードでは、Tenancy Services / MBIEの月次TLA賃貸ボンドデータ、RBNZ B1の月次NZD/JPY為替データ、Stats NZ Selected Price IndexesのFood Price Indexを使用しています。Food Price Indexは生活費全体を表すものではなく、日常的な物価変化を捉えるための参考指標として扱っています。推奨分析期間は、家賃・為替・物価指標を共通して比較できる1999年以降です。'
      },
      {
        label: 'ダッシュボード構成',
        body:
          '完成したTableauダッシュボードには以下が含まれます：最新平均家賃（NZD）と（JPY）のKPIカード。最新NZD/JPYレート。最新Food Price Indexレベル。最新家賃プレッシャースコア。最新月の家賃Top 15地域。プレッシャーレベル別の地域数。NZD平均家賃トレンド。JPY平均家賃トレンド。NZD/JPY為替レートトレンド。Food Price Indexトレンド。'
      },
      {
        label: '指標の読み方',
        body:
          '最新平均家賃は、ダッシュボードの最新月における対象ニュージーランド市・地区の平均推定月額家賃を示します。NZD/JPYは1ニュージーランドドルあたりの日本円を示します。レートが高いと、日本円の貯蓄を使う人にとってプレッシャーが増える可能性があります。Food Price Indexは指数であり、ドル金額ではありません。Stats NZの選択シリーズでは2017年6月を1000としています。これは選択された食品価格の文脈としてのみ使用され、完全な家計生活費モデルではありません。Rent Pressure Scoreは、家賃水準、家賃トレンド、Food Price Indexの動き、NZD/JPYの動きに基づく単純な方向性の0-100比較指標です。完全な負担能力モデルや金融アドバイスではありません。プレッシャーバンド：低：55未満。中：55以上70未満。高：70以上。'
      },
      {
        label: '主要インサイト',
        body:
          'このダッシュボードでは、どの地域の家賃が高いか、家賃を日本円で見るとどの程度の負担になるか、為替の変動が日本円ベースの準備資金にどう影響するかを確認できます。プレッシャースコアは比較のための方向性を示す簡易指標であり、完全な経済モデルではありません。'
      },
      {
        label: '制約',
        body:
          '家賃データはTLA単位で集計されており、物件タイプはAll tenancy types、寝室数はAllとして扱っています。Food Price Indexは生活費全体を表すモデルではありません。マップビューは、信頼できるTLA緯度経度データをまだ追加していないため除外しています。このダッシュボードは初期比較と予算検討を支援するものであり、金融アドバイスではありません。'
      },
      {
        label: '使用ツール',
        body:
          'Python、SQL、CSV、Tableau Public、Markdown documentation、Codexを使用しました。Codexは、プロジェクト構造の作成、ドキュメント整理、コードレビュー、分析ワークフローの改善にAI支援ツールとして活用しました。'
      },
      {
        label: '今後の改善',
        body:
          '今後は、信頼できるTLA緯度経度データを追加してマップ表示を作成すること、Tableauの地域選択を改善すること、信頼できる公的ソースがあればより細かい家賃区分を追加すること、将来的に月次更新を半自動化することを検討します。'
      },
      {
        label: 'データの注意点',
        body:
          '家賃はTenancy Services / MBIEの賃貸ボンドデータに基づき、中央値の週額家賃を推定月額家賃に変換しています。為替はRBNZの月次NZD/JPYデータを使用しています。Food Price IndexはStats NZの公的統計であり、リアルタイムのスーパー価格ではありません。数値は固定見積もりではなく、比較と傾向把握のための参考値として扱ってください。'
      }
    ],
    built: [
      '手動で取得した公的データを使い、ローカルで再実行できるデータ処理フローを作成しました。',
      'Pythonでデータ準備、クリーニング、検証、出力生成を行いました。',
      'SQLで変換ロジックを確認できるようにしました。',
      'Tableauで読み込めるCSV出力、ダッシュボード、月次インサイトノートを作成しました。',
      'Tableauダッシュボードを完成させました。',
      'ルールベースの月次インサイトノート（人間によるレビュー用）を作成しました。',
      'ビジネス課題、要件、データソース、指標ロジック、受け入れ基準、制約を網羅したドキュメントを整備しました。'
    ],
    referencesTitle: '参考文献・データソース',
    references: [
      {
        label: 'Tenancy Services / MBIE 賃貸ボンドデータ',
        url: 'https://www.tenancy.govt.nz/about-tenancy-services/data-and-statistics/rental-bond-data/',
        desc: 'MBIE / Tenancy Services：月次TLA賃貸ボンドデータ（家賃比較用）。'
      },
      {
        label: 'RBNZ B1 月次為替レート',
        url: 'https://www.rbnz.govt.nz/statistics/series/exchange-and-interest-rates/new-zealand-dollar-exchange-rates',
        desc: 'RBNZ：月次NZD/JPY為替レート（1NZドルあたりの日本円として扱う）。'
      },
      {
        label: 'Stats NZ Selected Price Indexes メタデータ',
        url: 'https://datainfoplus.stats.govt.nz/Item/nz.govt.stats/9e9f65b8-533f-4e96-8d6e-030d37de1a65',
        desc: 'Stats NZ：Food Price Index（食品価格コンテキストとして使用）。'
      },
      {
        label: 'Tableau Public ダッシュボード',
        url: links.tableau,
        desc: 'Tableau Public：公開インタラクティブダッシュボード。'
      }
    ],
    nextLabel: '次のプロジェクト'
  }
} as const;

export const rentRadar = {
  en: {
    title: 'Rent Radar (Power BI)',
    meta: 'Built in August 2025 | Early BI Prototype | Mock Data',
    subtitle: 'An early BI prototype for rental dashboard design using mock data',
    overviewTitle: 'Project Summary',
    overviewContent:
      'Rent Radar is an early BI prototype built in August 2025 using mock data. It was created to test how rental information could be structured into a simple dashboard format with filters, summary metrics, and comparison views. Rather than a real-world market analysis tool, this project should be viewed as an exploratory portfolio piece focused on dashboard structure and BI thinking.',
    whatIDidTitle: 'Prototype Scope',
    whatIDidContent:
      'Defined the dashboard structure and key metrics, generated mock rental data for prototyping purposes, modeled area-level indicators, and built an interactive Power BI report with filters and comparison views.',
    keyResultsTitle: 'Design Value & Limitations',
    keyResultsContent:
      'This project shows my approach to structuring a BI dashboard problem: deciding what should be compared, what users should see first, and how key indicators can be presented clearly. Its main limitation is that it uses a small mock dataset with limited coverage, so it should be read as an early prototype rather than a real-world housing analysis product.',
    dataNotesTitle: 'Data Notes',
    dataNotesContent:
      'All figures used in this dashboard are mock/sample data generated for prototyping purposes. They do not represent real rental market statistics or actual suburb-level data.',
    dashboardTitle: 'Interactive Dashboard',
    dashboardFallback: 'Open dashboard in a new tab',
    viewAllProjects: 'View All Projects'
  },
  ja: {
    title: 'Rent Radar (Power BI)',
    meta: '2025年8月作成 | 初期BIプロトタイプ | 架空データ使用',
    subtitle: '架空データで家賃ダッシュボード設計を試した初期BIプロトタイプ',
    overviewTitle: 'プロジェクト概要',
    overviewContent:
      'Rent Radar は、2025年8月に架空データを使って作成した初期BIプロトタイプです。家賃に関する情報を、フィルタ、要約指標、比較ビューを用いたシンプルなダッシュボードとしてどう整理できるかを試す目的で作成しました。実務で使う市場分析ツールというより、ダッシュボード構成とBI的な情報設計の考え方を示す探索的なポートフォリオ案件として位置づけています。',
    whatIDidTitle: 'プロトタイプで設計したこと',
    whatIDidContent:
      'ダッシュボードの構成と主要指標を設計し、プロトタイプ用の架空データを作成。エリア別の比較指標を整理し、フィルタや比較ビューを備えたPower BIレポートを構築しました。',
    keyResultsTitle: 'このプロトタイプで示したことと制約',
    keyResultsContent:
      'このプロジェクトでは、何を比較対象にするか、何を先に見せるべきか、主要指標をどう分かりやすく見せるかという、BIダッシュボード設計の考え方を形にしています。一方で、小規模な架空データを使った限定的な内容であるため、実際の住宅市場分析ではなく、初期プロトタイプとして見るべき案件です。',
    dataNotesTitle: 'データの注意点',
    dataNotesContent:
      'このダッシュボードで使用しているデータはすべてプロトタイプ用の架空サンプルデータです。実際の家賃市場の統計や地域別データを反映するものではありません。',
    dashboardTitle: 'インタラクティブダッシュボード',
    dashboardFallback: '新しいタブでダッシュボードを開く',
    viewAllProjects: 'すべてのプロジェクトを見る'
  }
} as const;

export const blog = {
  en: {
    title: 'Blog',
    subtitle: 'Notes on data work, life in New Zealand, relocation, training, and practical analysis.',
    body:
      'Long-form posts will live here once they are ready. For now, the site is structured so Pacibridge-style analytics projects and Oceaflow-style lifestyle notes can grow under the existing domain without extra domain cost.'
  },
  ja: {
    title: 'ブログ',
    subtitle: 'データ、ニュージーランド生活、移住、トレーニング、実用的な分析についての記録です。',
    body:
      '長めの記事は準備ができた段階でここに追加します。まずは追加ドメイン費用をかけず、既存ドメイン内でPacibridge系の分析プロジェクトとOceaflow系のライフスタイル発信を育てられる構成にしています。'
  }
} as const;

export const legal = {
  privacy: {
    en: {
      title: 'Privacy Policy',
      body:
        'This website is a personal portfolio. If you contact me by email, I will use your details only to respond to your message. I do not sell personal information. This site may collect basic hosting, analytics, or security logs through the hosting provider.'
    },
    ja: {
      title: 'プライバシーポリシー',
      body:
        'このWebサイトは個人ポートフォリオです。メールでご連絡いただいた場合、いただいた情報は返信のためにのみ使用します。個人情報の販売は行いません。ホスティング、分析、セキュリティ目的で、基本的なログがホスティング事業者により収集される場合があります。'
    }
  },
  terms: {
    en: {
      title: 'Terms of Use',
      body:
        'The content on this website is provided for general portfolio and informational purposes. You may link to public pages, but please do not reproduce project content, images, or text without permission.'
    },
    ja: {
      title: '利用規約',
      body:
        'このWebサイトの内容は、ポートフォリオおよび一般的な情報提供を目的としています。公開ページへのリンクは可能ですが、プロジェクト内容、画像、文章の無断転載はご遠慮ください。'
    }
  },
  disclaimer: {
    en: {
      title: 'Disclaimer',
      body:
        'Project materials are for learning, portfolio, and general information only. Dashboard outputs are not financial, immigration, housing, or professional advice. Always verify source data and consult relevant professionals before making important decisions.'
    },
    ja: {
      title: '免責事項',
      body:
        'プロジェクト資料は学習、ポートフォリオ、一般的な情報提供を目的としたものです。ダッシュボードの出力は、金融、移民、住居、その他専門的な助言ではありません。重要な判断を行う前に、必ず元データを確認し、必要に応じて専門家へ相談してください。'
    }
  }
} as const;
