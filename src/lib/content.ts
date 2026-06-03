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
    'https://public.tableau.com/app/profile/sora.oya/viz/NZ-JapanRelocationAffordabilityDashboard/NZ-JapanRelocationAffordabilityDashboard'
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
    meta: 'Current Tableau dashboard - public data analytics portfolio project',
    viewTableau: 'Open Tableau Dashboard',
    viewGithub: 'View GitHub Repository',
    interactiveTitle: 'Interactive Tableau Dashboard',
    sections: [
      {
        label: 'Overview',
        body:
          'This project brings together New Zealand rent, exchange-rate, and selected food-price context into one dashboard for Japanese-speaking movers comparing potential relocation areas.'
      },
      {
        label: 'Business Problem',
        body:
          'Rent, currency, and price-index data are available from separate public sources, but they are difficult to compare directly. This project structures those sources into a clearer view for early relocation and budgeting decisions.'
      },
      {
        label: 'Target Users',
        body:
          'The primary users are Japanese-speaking people considering a move to New Zealand, residents comparing rent between areas, and people using Japanese-yen savings who need to understand NZD/JPY pressure.'
      },
      {
        label: 'Data Sources',
        body:
          'The dashboard uses Tenancy Services / MBIE monthly territorial authority rental bond data, RBNZ B1 monthly NZD/JPY exchange rates, and Stats NZ Selected Price Indexes Food Price Index data. The Food Price Index is context only, not a full household living-cost model.'
      },
      {
        label: 'Dashboard Sections',
        body:
          'The completed dashboard includes KPI cards for latest average rent in NZD and JPY, latest NZD/JPY rate, latest Food Price Index level, latest rent pressure score, top 15 locations by rent, location count by pressure level, average rent trends in NZD and JPY, NZD/JPY exchange-rate trend, and Food Price Index trend.'
      },
      {
        label: 'Metric Notes',
        body:
          'Latest average rent shows the average estimated monthly rent across included New Zealand city/district areas in the latest available dashboard month. NZD/JPY shows Japanese yen per 1 New Zealand dollar. Food Price Index is an index, not a dollar amount; in the selected Stats NZ series, June 2017 equals 1000. Rent Pressure Score is a simple directional 0-100 comparison indicator based on rent level, rent trend, Food Price Index movement, and NZD/JPY movement. It is not a complete affordability model or financial advice. Pressure bands: Lower below 55, Medium from 55 to below 70, High 70 or above.'
      },
      {
        label: 'Limitations',
        body:
          'Rent data is aggregated at territorial authority level, using all tenancy types and all bedroom counts. The Food Price Index is not a complete living-cost model. A map view is excluded until reliable TLA latitude and longitude data is added. The dashboard supports comparison and early budgeting; it is not financial advice.'
      },
      {
        label: 'Tools',
        body:
          'Python, SQL, CSV, Tableau Public, Markdown documentation, and AI-assisted workflow review were used to create and document the project.'
      },
      {
        label: 'Potential Improvements',
        body:
          'Potential improvements include adding a reliable map view, improving location selection in Tableau, adding more granular rent cuts if dependable public sources are available, and semi-automating monthly updates.'
      }
    ],
    built: [
      'Reusable local data-processing flow for manually sourced public data.',
      'Python preparation, cleaning, validation, and output generation.',
      'SQL checks for transformation logic.',
      'CSV outputs, completed Tableau dashboard, and monthly insight notes.',
      'Documentation covering business problem, requirements, data sources, metric logic, acceptance criteria, and limitations.'
    ],
    referencesTitle: 'References / Data Sources',
    references: [
      {
        label: 'Tenancy Services / MBIE rental bond data',
        url: 'https://www.tenancy.govt.nz/about-tenancy-services/data-and-statistics/rental-bond-data/',
        desc: 'Monthly territorial authority rental bond data for rent comparison.'
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
        desc: 'Published interactive dashboard.'
      }
    ],
    nextLabel: 'Next Project'
  },
  ja: {
    title: 'ニュージーランド移住向け 家賃負担ダッシュボード',
    subtitle:
      '日本語話者向けに、NZの家賃、NZD/JPY為替レート、Stats NZ食品価格指数をまとめて比較します。',
    meta: '完成済み Tableau ダッシュボード - 公的データ分析ポートフォリオ',
    viewTableau: 'Tableau ダッシュボードを開く',
    viewGithub: 'GitHub リポジトリを見る',
    interactiveTitle: 'インタラクティブ Tableau ダッシュボード',
    sections: [
      {
        label: '概要',
        body:
          'ニュージーランド移住を検討する日本語話者向けに、家賃、NZD/JPY為替レート、食品価格指数の文脈をひとつのダッシュボードにまとめたプロジェクトです。'
      },
      {
        label: 'ビジネス課題',
        body:
          '家賃、為替、物価に関する公的データはそれぞれ別の機関・形式で公開されており、そのままでは比較しにくい状態です。このプロジェクトでは、移住や予算検討の初期判断に使いやすい形へ整理しました。'
      },
      {
        label: '対象ユーザー',
        body:
          '主な対象は、ニュージーランドへの移住を検討している日本語話者、地域別の家賃を比較したい人、日本円の貯蓄を持ちNZD/JPYの影響を把握したい人です。'
      },
      {
        label: 'データソース',
        body:
          'Tenancy Services / MBIEの月次TLA賃貸ボンドデータ、RBNZ B1の月次NZD/JPY為替データ、Stats NZ Selected Price IndexesのFood Price Indexを使用しています。Food Price Indexは生活費全体を表すものではなく、食品価格の文脈として扱っています。'
      },
      {
        label: 'ダッシュボード構成',
        body:
          '最新平均家賃（NZD/JPY）のKPIカード、最新NZD/JPYレート、最新Food Price Indexレベル、最新家賃プレッシャースコア、最新月の家賃Top 15地域、プレッシャーレベル別の地域数、NZD平均家賃トレンド、JPY平均家賃トレンド、NZD/JPY為替レートトレンド、Food Price Indexトレンドを含みます。'
      },
      {
        label: '指標の読み方',
        body:
          '最新平均家賃は、ダッシュボード最新月における対象ニュージーランド市・地区の平均推定月額家賃です。NZD/JPYは1ニュージーランドドルあたりの日本円を示します。Food Price Indexはドル金額ではなく指数で、Stats NZの選択シリーズでは2017年6月を1000としています。Rent Pressure Scoreは、家賃水準、家賃トレンド、Food Price Indexの動き、NZD/JPYの動きに基づく0-100の方向性比較指標です。完全な負担能力モデルや金融アドバイスではありません。プレッシャーバンドは、低：55未満、中：55以上70未満、高：70以上です。'
      },
      {
        label: '制約',
        body:
          '家賃データはTLA単位で集計され、物件タイプはAll tenancy types、寝室数はAllとして扱っています。Food Price Indexは生活費全体のモデルではありません。信頼できるTLA緯度経度データをまだ追加していないため、マップビューは除外しています。このダッシュボードは比較と初期予算検討を支援するもので、金融アドバイスではありません。'
      },
      {
        label: '使用ツール',
        body:
          'Python、SQL、CSV、Tableau Public、Markdown documentation、AI支援によるワークフロー整理を使用しました。'
      },
      {
        label: '今後の改善',
        body:
          '信頼できるマップ表示の追加、Tableauの地域選択改善、信頼できる公的ソースがある場合の細かい家賃区分追加、月次更新の半自動化を検討しています。'
      }
    ],
    built: [
      '手動取得した公的データをローカルで再実行できる処理フローを作成。',
      'Pythonでデータ準備、クリーニング、検証、出力生成を実施。',
      'SQLで変換ロジックを確認。',
      'Tableau向けCSV、完成済みダッシュボード、月次インサイトノートを作成。',
      'ビジネス課題、要件、データソース、指標ロジック、受け入れ基準、制約を文書化。'
    ],
    referencesTitle: '参考文献・データソース',
    references: [
      {
        label: 'Tenancy Services / MBIE 賃貸ボンドデータ',
        url: 'https://www.tenancy.govt.nz/about-tenancy-services/data-and-statistics/rental-bond-data/',
        desc: '月次TLA賃貸ボンドデータを家賃比較に使用。'
      },
      {
        label: 'RBNZ B1 月次為替レート',
        url: 'https://www.rbnz.govt.nz/statistics/series/exchange-and-interest-rates/new-zealand-dollar-exchange-rates',
        desc: '月次NZD/JPY為替レートを、1NZドルあたりの日本円として使用。'
      },
      {
        label: 'Stats NZ Selected Price Indexes メタデータ',
        url: 'https://datainfoplus.stats.govt.nz/Item/nz.govt.stats/9e9f65b8-533f-4e96-8d6e-030d37de1a65',
        desc: 'Food Price Indexを食品価格の文脈として使用。'
      },
      {
        label: 'Tableau Public ダッシュボード',
        url: links.tableau,
        desc: '公開済みインタラクティブダッシュボード。'
      }
    ],
    nextLabel: '次のプロジェクト'
  }
} as const;

export const rentRadar = {
  en: {
    title: 'Rent Radar (Power BI)',
    subtitle: 'An earlier BI prototype for rental dashboard design using mock data.',
    body:
      'Rent Radar is a compact Power BI prototype created to explore rental dashboard layout, KPI hierarchy, and visual comparison patterns before moving into a larger public-data Tableau project.',
    note:
      'This project uses mock data and is presented as a dashboard design exercise, not as a source-backed affordability model.'
  },
  ja: {
    title: 'Rent Radar (Power BI)',
    subtitle: '架空サンプルデータを使用した、家賃ダッシュボード設計の初期BIプロトタイプです。',
    body:
      'Rent Radarは、より大きな公的データTableauプロジェクトへ進む前に、家賃ダッシュボードのレイアウト、KPI構成、比較表現を検討するために作成したPower BIプロトタイプです。',
    note:
      'このプロジェクトは架空データを使用しており、根拠データに基づく負担能力モデルではなく、ダッシュボード設計の練習として掲載しています。'
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
