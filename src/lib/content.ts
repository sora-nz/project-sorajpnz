export type Locale = 'en' | 'ja';

export const siteUrl = 'https://sorajpnz.com';

export const assets = {
  logoFull: '/assets/sora-jpnz-logo-full.png',
  logoMark: '/assets/sora-jpnz-logo-mark.png',
  hero: '/assets/homepage1.jpg',
  projectsBg: '/assets/homepage2.jpg',
  profileBg: '/assets/homepage3.jpg',
  aucklandHarbour: '/assets/home/auckland-harbour-view.jpg',
  westCoastRocks: '/assets/home/west-coast-rocks.jpg',
  dashboard: '/assets/nz-relocation-dashboard.png',
  rentRadar: '/assets/rentradar.png',
  calculator: '/assets/nz-life-reality-calculator.png',
  calculatorJa: '/assets/nz-life-reality-calculator-ja.png',
  avatar: '/assets/sora-avatar.png',
  blogHero: '/assets/blog/thea-fishing-rocks.jpg',
  blogOceanFloat: '/assets/blog/ocean-float.jpg',
  blogSpearfishing: '/assets/blog/ocean-spearfishing-octopus.jpg',
  blogSnapperWharf: '/assets/blog/thea-snapper-wharf.jpg',
  blogHobbiton: '/assets/blog/hobbiton-couple.jpg',
  blogTaranaki: '/assets/blog/taranaki-track-couple.jpg'
};

export const links = {
  email: 'mailto:contact@sorajpnz.com',
  emailText: 'contact@sorajpnz.com',
  privacyEmailText: 'privacy@sorajpnz.com',
  privacyEmail: 'mailto:privacy@sorajpnz.com',
  linkedin: 'https://www.linkedin.com/in/soraoya/',
  github: 'https://github.com/sora-nz',
  youtube: 'https://www.youtube.com/@sorajpnz',
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

export const socialLinks = [
  {
    id: 'youtube',
    label: 'YouTube',
    href: links.youtube,
    icon: 'ri-youtube-fill',
    tone: 'youtube',
    showOnHome: true,
    showOnLinks: true,
    showInHeader: true,
    showInFooter: true,
    role: {
      en: 'Long-form videos and main video archive',
      ja: '長尺動画とメインの動画アーカイブ'
    }
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/sorajpnz',
    icon: 'ri-instagram-line',
    tone: 'instagram',
    showOnHome: true,
    showOnLinks: true,
    showInHeader: true,
    showInFooter: true,
    role: {
      en: 'Short clips, ocean moments, and daily updates',
      ja: '短尺動画、海の記録、日々の更新'
    }
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@sorajpnz',
    icon: 'ri-tiktok-fill',
    tone: 'tiktok',
    showOnHome: true,
    showOnLinks: true,
    showInHeader: true,
    showInFooter: true,
    role: {
      en: 'Short-form discovery and quick stories',
      ja: '短尺動画と認知拡大'
    }
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/sorajpnz',
    icon: 'ri-facebook-circle-fill',
    tone: 'facebook',
    showOnHome: true,
    showOnLinks: true,
    showInHeader: false,
    showInFooter: true,
    role: {
      en: 'NZ life updates and community posts',
      ja: 'NZ生活の更新やコミュニティ向け投稿'
    }
  },
  {
    id: 'threads',
    label: 'Threads',
    href: 'https://www.threads.com/@sorajpnz',
    icon: 'ri-threads-line',
    tone: 'threads',
    showOnHome: false,
    showOnLinks: false,
    showInHeader: false,
    showInFooter: false,
    role: {
      en: 'Short thoughts and lightweight updates',
      ja: '短い考えや軽い更新'
    }
  },
  {
    id: 'x',
    label: 'X',
    href: 'https://x.com/sorajpnz',
    icon: 'ri-twitter-x-fill',
    tone: 'x',
    showOnHome: false,
    showOnLinks: false,
    showInHeader: false,
    showInFooter: false,
    role: {
      en: 'Work, AI, data, migration, and update notes',
      ja: '仕事、AI、データ、移住、更新告知'
    }
  }
] as const;

export const common = {
  en: {
    name: 'SoraJPNZ',
    shortName: 'SoraJPNZ',
    home: 'Home',
    services: 'Services',
    projects: 'Projects',
    blog: 'Blog',
    links: 'Links',
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
    siteTagline: 'New Zealand life, ocean notes, work, money, and practical data',
    viewProject: 'View Project',
    viewProjects: 'View Projects',
    emailMe: 'Email Me',
    backToProjects: 'Back to Projects',
    footerPrivacyOfficer: 'Privacy Officer: Sora Oya - privacy@sorajpnz.com'
  },
  ja: {
    name: 'SoraJPNZ',
    shortName: 'SoraJPNZ',
    home: 'ホーム',
    services: 'サービス',
    projects: 'プロジェクト',
    blog: 'ブログ',
    links: 'リンク',
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
    siteTagline: 'NZ生活、海、仕事、お金、データ活用の記録',
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
      title: 'SoraJPNZ | Business Systems, Data, and Decision-Support Projects',
      description:
        'Auckland-based portfolio by Sora Oya, showing practical business analysis, data, AI-enabled process improvement, and decision-support tools built from real New Zealand questions.'
    },
    services: {
      title: 'Services | SoraJPNZ',
      description:
        'Light SoraJPNZ support for small dashboards, website analytics, portfolio feedback, content notes, and practical project organization.'
    },
    projects: {
      title: 'Projects | SoraJPNZ',
      description:
        'Explore SoraJPNZ projects across New Zealand life, relocation, ocean notes, work, money, content experiments, and practical data tools.'
    },
    relocation: {
      title: 'NZ Relocation Affordability Dashboard | SoraJPNZ',
      description:
        'A Tableau public-data dashboard comparing New Zealand rent, NZD/JPY exchange-rate impact, and selected price-index context for relocation planning.'
    },
    rentRadar: {
      title: 'Rent Radar Power BI Dashboard | SoraJPNZ',
      description:
        'An early Power BI rental dashboard prototype showing BI layout, mock rental indicators, filters, and comparison-focused dashboard design.'
    },
    blog: {
      title: 'SoraJPNZ Notes | SoraJPNZ',
      description:
        'SoraJPNZ Notes organizes New Zealand living costs, work, money, Japan comparisons, field notes, and practical tools.'
    },
    links: {
      title: 'Links | SoraJPNZ',
      description:
        'Quick links to SoraJPNZ YouTube, blog, Instagram, TikTok, projects, contact, and Facebook.'
    },
    contact: {
      title: 'Contact | SoraJPNZ',
      description:
        'Contact SoraJPNZ for Business Analyst / Data Analyst opportunities, project enquiries, interviews, or data analysis conversations.'
    }
  },
  ja: {
    home: {
      title: 'SoraJPNZ | NZ生活の選択を数字と実体験で考える',
      description:
        'Aucklandで実際に迷った生活費、仕事、お金のことを、Notes、計算機、データプロジェクトとして残しているSoraJPNZの個人サイトです。'
    },
    services: {
      title: 'サービス | SoraJPNZ',
      description:
        'SoraJPNZの軽いサポートページです。小さなダッシュボード、Web分析、ポートフォリオ相談、発信内容の整理、実用的な制作を扱います。'
    },
    projects: {
      title: 'プロジェクト | SoraJPNZ',
      description:
        'NZ生活で気になった家賃、為替、生活費を、計算機やダッシュボードで確かめられる形にしたSoraJPNZのプロジェクトです。'
    },
    relocation: {
      title: 'NZ移住向け家賃負担ダッシュボード | SoraJPNZ',
      description:
        'ニュージーランドの家賃、NZD/JPY為替、食品価格指数を組み合わせた、移住検討向けのTableau公的データダッシュボードです。'
    },
    rentRadar: {
      title: 'Rent Radar Power BIダッシュボード | SoraJPNZ',
      description:
        '架空データを使い、家賃情報の整理、比較、フィルター設計を試した初期Power BIダッシュボードプロトタイプです。'
    },
    blog: {
      title: 'SoraJPNZ Notes | SoraJPNZ',
      description:
        'Aucklandで暮らして気づいたNZ生活費、仕事、お金、日本との違いを、数字や一次情報と一緒に書き残すSoraJPNZ Notesです。'
    },
    links: {
      title: 'リンク | SoraJPNZ',
      description:
        'SoraJPNZのYouTube、ブログ、Instagram、TikTok、プロジェクト、お問い合わせ、Facebookへの入口です。'
    },
    contact: {
      title: 'お問い合わせ | SoraJPNZ',
      description:
        'Business Analyst / Data Analystの機会、面談、プロジェクト相談、データ分析に関するお問い合わせはこちらから。'
    }
  }
} as const;

export const home = {
  en: {
    title: 'Practical systems and data work, grounded in real New Zealand questions.',
    role: '',
    tagline:
      'SoraJPNZ is my Auckland-based portfolio for business analysis, data, AI-enabled process improvement, and decision-support tools.',
    description:
      'I use real questions about living costs, rent, work, and everyday decisions to show how I structure problems, make assumptions visible, and build useful outputs.',
    primaryCta: 'Try the NZ Life Reality Calculator',
    primaryHref: '/en/tools/nz-life-reality-calculator',
    primaryExternal: false,
    primaryIcon: 'ri-calculator-line',
    contactCta: 'View Projects',
    contactHref: '/en/projects',
    contactIcon: 'ri-folder-chart-line',
    heroContextEyebrow: 'How I work',
    heroContextTitle: 'From an unclear question to something people can use.',
    heroContextBody:
      'Each project starts with a real decision or workflow problem, then moves through requirements, assumptions, data, and a working tool or dashboard.',
    heroContextCaption: 'Auckland life provides the context. The work shows the method.',
    socialEyebrow: 'Social Channels',
    socialTitle: 'Follow the journey',
    socialSubtitle:
      'YouTube and social channels are for videos, quick updates, and ocean records. Anything worth revisiting gets organized back into Notes or Projects.',
    socialPrimaryLabel: 'Main channel',
    socialSecondaryLabel: 'Short clips and updates',
    allLinksCta: 'Open all links',
    servicesEyebrow: 'Explore the work',
    servicesTitle: 'Start with something working',
    servicesSubtitle:
      'Try the calculator first, then review the projects and notes behind the approach.',
    servicesCta: 'See collaboration and support',
    services: [
      {
        icon: 'ri-calculator-line',
        title: 'Try the NZ Life Reality Calculator',
        body: 'Adjust wage, work hours, weekly rent, car costs, and savings goals to test a New Zealand living-cost scenario in NZD and approximate JPY.',
        href: '/en/tools/nz-life-reality-calculator',
        cta: 'Open the calculator'
      },
      {
        icon: 'ri-folder-chart-line',
        title: 'Review the Projects',
        body: 'Dashboards and decision-support tools show how I frame questions, document assumptions, and turn data into usable outputs.',
        href: '/en/projects',
        cta: 'View Projects'
      },
      {
        icon: 'ri-article-line',
        title: 'Read the Notes',
        body: 'Longer notes explain the real context, trade-offs, and source checks behind the tools and projects.',
        href: '/en/blog',
        cta: 'Open Notes'
      }
    ],
    trustEyebrow: 'Working approach',
    trustTitle: 'How I approach the work',
    trustIntro:
      'The same habits run through the tools, dashboards, and notes on this site.',
    trustItems: [
      {
        title: 'Structure the problem before choosing the tool',
        body: 'I separate the decision, users, assumptions, constraints, and useful output before building.'
      },
      {
        title: 'Make the data and limitations visible',
        body: 'Sources, estimates, and gaps stay clear so a result can be questioned and improved.'
      },
      {
        title: 'Build something practical, then iterate',
        body: 'A small working calculator or dashboard creates a clearer basis for feedback than an abstract idea alone.'
      }
    ],
    fieldNotesEyebrow: 'Field Notes',
    fieldNotesTitle: 'Life context, not the whole brand',
    fieldNotesBody:
      'Fishing, spearfishing, ocean conditions, tools, and local lessons also stay here. They capture the feeling of living in New Zealand that does not fit into numbers or work notes.',
    fieldNotesCta: 'Read Notes',
    projectsTitle: 'Selected projects',
    projectsEyebrow: 'Proof of work',
    projectsIntro:
      'These projects show how I turn ambiguous real-life questions into browser tools, public-data dashboards, and documented analysis.',
    projectsCta: 'Open Projects',
    aboutTitle: 'About Me',
    about:
      'I am an Auckland-based analyst building toward Business Systems, Business Analysis, Data, and AI-enabled process improvement roles. SoraJPNZ is where I turn real questions into working tools, dashboards, and clear documentation while continuing to build my New Zealand career.',
    contactTitle: 'Contact',
    contact:
      'For Business Systems Analyst, Business Analyst, Data Analyst, or AI and process-improvement opportunities, interviews, and project conversations, please get in touch.'
  },
  ja: {
    title: 'NZ生活の選択を、数字と実体験で現実的に考える。',
    role: '',
    tagline:
      '生活費、仕事、お金、日本との違い、海のある暮らし。Aucklandで実際に迷ったことを、Notes・Tools・Projectsにまとめています。',
    description:
      '自分の経験だけで決めつけず、数字や一次情報も確かめながら、あとで見返せる形にしています。',
    primaryCta: 'SoraJPNZ Notesを見る',
    primaryHref: '/ja/blog',
    primaryExternal: false,
    primaryIcon: 'ri-article-line',
    contactCta: '生活費を試算する',
    contactHref: '/ja/tools/nz-life-reality-calculator',
    contactIcon: 'ri-calculator-line',
    heroContextEyebrow: 'Aucklandから',
    heroContextTitle: '迷ったことを、次に使える形へ。',
    heroContextBody:
      '生活の疑問はNotesに書き、数字で確かめたいものは計算機やダッシュボードにします。海で過ごした日も、NZで暮らす日常として残します。',
    heroContextCaption: 'Aucklandで暮らしながら考えていること。',
    socialEyebrow: 'Social Channels',
    socialTitle: '動画と日々の記録',
    socialSubtitle:
      'YouTubeではVlogや海の動画、SNSでは短い更新を出しています。あとから読み返したい内容は、NotesやProjectsにまとめます。',
    socialPrimaryLabel: 'メインチャンネル',
    socialSecondaryLabel: '短尺動画と更新',
    allLinksCta: 'リンク一覧を見る',
    servicesEyebrow: 'Start here',
    servicesTitle: 'まずここから',
    servicesSubtitle:
      '何から見ればいいか迷ったら、まずはこの3つから。',
    servicesCta: '軽いサポート内容を見る',
    services: [
      {
        icon: 'ri-article-line',
        title: 'Notesを読む',
        body: 'Aucklandでの生活費、仕事、お金、日本との違い、海での出来事を書き残しています。',
        href: '/ja/blog',
        cta: 'Notes Hubを見る'
      },
      {
        icon: 'ri-calculator-line',
        title: '生活費を試算する',
        body: '時給・勤務時間・家賃・車コストを入れて、月に残りそうな金額をざっくり確認できます。',
        href: '/ja/tools/nz-life-reality-calculator',
        cta: '計算機を使う'
      },
      {
        icon: 'ri-folder-chart-line',
        title: 'Projectsを見る',
        body: '生活の疑問を計算機やダッシュボードにして、実際に試せるようにしています。',
        href: '/ja/projects',
        cta: 'プロジェクトを見る'
      }
    ],
    trustEyebrow: 'Careful Notes',
    trustTitle: 'このサイトで大事にしていること',
    trustIntro:
      '私自身の生活感と、数字や一次情報の違いが分かるように書くことを大切にしています。',
    trustItems: [
      {
        title: '数字は、前提と一緒に見る',
        body: '時給や家賃だけで結論を出さず、勤務時間、車、貯金目標まで含めて見ます。'
      },
      {
        title: '自分の体験だけで決めつけない',
        body: 'Aucklandでの実感は書きますが、それを全員に当てはまる正解にはしません。'
      },
      {
        title: '公式情報と、個人の経験を分ける',
        body: 'ビザ、税金、投資などは公式情報と分けて扱い、助言が必要な内容は専門家への確認を案内します。'
      }
    ],
    fieldNotesEyebrow: 'Field Notes',
    fieldNotesTitle: '海で過ごした日も、NZ生活の記録です',
    fieldNotesBody:
      '釣り、スピアフィッシング、海況、道具、現地で覚えたことも書いていきます。生活費や仕事の数字だけでは伝わらない、Aucklandで暮らす日々の一部です。',
    fieldNotesCta: 'Notesで読む',
    projectsTitle: 'プロジェクト',
    projectsEyebrow: 'Proof of work',
    projectsIntro:
      '生活費や家賃、為替で気になったことを、計算機やダッシュボードとして試せる形にしています。作って終わりにせず、あとから前提やデータを見直せるように残しています。',
    projectsCta: 'プロジェクト一覧を見る',
    aboutTitle: '自己紹介',
    about:
      'Aucklandで暮らす私が、NZ生活で実際に迷ったことを記録している個人サイトです。データ分析やダッシュボード制作の経験を生かし、生活費や仕事の疑問を自分で確かめられる形にしています。海や釣りの記録も、こちらでの暮らしの一部として残しています。',
    contactTitle: 'お問い合わせ',
    contact:
      '採用、面談、コラボレーション、ポートフォリオへのフィードバック、小さなプロジェクト相談などはこちらからお願いします。'
  }
} as const;

export const servicesPage = {
  en: {
    eyebrow: 'Services',
    title: 'Small support for content, data, and practical projects',
    subtitle:
      'SoraJPNZ is not trying to look like a large BI agency. This page is for lightweight help around dashboards, analytics setup, data write-ups, websites, portfolios, and small experiments.',
    primaryCta: 'Start a Light Conversation',
    secondaryCta: 'See Projects',
    introTitle: 'What this is useful for',
    intro:
      'The current focus is intentionally small: practical dashboard work, simple analytics setup, and clear documentation. It is useful when you have a project, content idea, portfolio piece, or early business question that needs a clean first version before anything bigger is built.',
    packages: [
      {
        icon: 'ri-dashboard-3-line',
        title: 'Dashboard Starter',
        summary:
          'A focused Tableau or Power BI dashboard for one clear question, using business data, spreadsheet data, public datasets, or content-performance data.',
        deliverables: [
          'Dashboard structure and key metric definition',
          'Cleaned input data or documented data assumptions',
          'Power BI or Tableau dashboard with simple navigation',
          'Short handover notes explaining what to trust and what to check'
        ]
      },
      {
        icon: 'ri-line-chart-line',
        title: 'Analytics Setup',
        summary:
          'A lightweight measurement foundation for a portfolio, small website, blog, social-content funnel, landing page, or early product idea.',
        deliverables: [
          'GA4 and Google Search Console setup review',
          'Basic event and conversion naming plan',
          'Simple reporting view for traffic, pages, and contact signals',
          'Privacy-aware notes for what should and should not be tracked'
        ]
      },
      {
        icon: 'ri-file-chart-line',
        title: 'Data Storytelling',
        summary:
          'A clear write-up that turns data, project work, or lived experience into a useful case study, blog post, or decision note.',
        deliverables: [
          'Data-source review and limitation notes',
          'Charts or dashboard screenshots for the main findings',
          'Plain-English summary for non-technical readers',
          'Portfolio-ready write-up or internal decision note'
        ]
      }
    ],
    processTitle: 'How this stays simple',
    process: [
      {
        step: '01',
        title: 'Scope the question',
        body:
          'Start with one decision, one audience, and the smallest useful output. This keeps the work practical and avoids a dashboard that tries to answer everything.'
      },
      {
        step: '02',
        title: 'Build transparently',
        body:
          'Clean the data, document assumptions, and keep metric logic visible. AI tools can support drafting and validation, but source transparency stays central.'
      },
      {
        step: '03',
        title: 'Hand over clearly',
        body:
          'Deliver the dashboard, report, or analytics setup with notes that explain how to read it, where the limits are, and what to improve next.'
      }
    ],
    brandTitle: 'Where Pacibridge and Oceaflow fit',
    brandBody:
      'SoraJPNZ is the public hub today. Pacibridge can become the future analytics and tools branch, while Oceaflow can become the lifestyle and storytelling branch. For now, both should stay light until there is enough content or a product worth separating.',
    ctaTitle: 'Have a small data problem or portfolio conversation?',
    ctaBody:
      'Reach out for a small project, portfolio feedback, dashboard review, website analytics setup, or a practical conversation about turning content and data into something useful.',
    ctaButton: 'Contact SoraJPNZ'
  },
  ja: {
    eyebrow: 'Services',
    title: '発信・データ・小さな制作を整えるサポート',
    subtitle:
      'SoraJPNZは大きな会社向けの本格BIサービスとして見せるより、ダッシュボード、分析設定、文章化、Webサイト、ポートフォリオ、小さな実験を軽く整える相談窓口として置いています。',
    primaryCta: '軽く相談する',
    secondaryCta: 'プロジェクトを見る',
    introTitle: 'どういう時に使えるか',
    intro:
      '現在のサービス方針はあえて小さくしています。ダッシュボード制作、軽い分析設定、分かりやすいドキュメント化を中心に、発信、ポートフォリオ、初期の事業アイデアをまず形にするためのサポートです。',
    packages: [
      {
        icon: 'ri-dashboard-3-line',
        title: 'Dashboard Starter',
        summary:
          'ひとつの問いに絞ったTableau / Power BIダッシュボードを、業務データ、スプレッドシート、公的データ、発信活動のデータから作成します。',
        deliverables: [
          'ダッシュボード構成と主要指標の整理',
          '入力データのクリーニング、または前提条件の整理',
          'Power BIまたはTableauでのシンプルなダッシュボード',
          '読み方、注意点、確認すべき点をまとめた短い引き継ぎメモ'
        ]
      },
      {
        icon: 'ri-line-chart-line',
        title: 'Analytics Setup',
        summary:
          'ポートフォリオ、小規模Webサイト、ブログ、SNS導線、ランディングページ、初期プロダクト向けに、軽い計測基盤を整えます。',
        deliverables: [
          'GA4とGoogle Search Consoleの設定確認',
          '基本的なイベント名、コンバージョン名の整理',
          '流入、ページ、問い合わせシグナルを確認する簡単なレポート',
          '何を計測し、何を計測しないべきかのプライバシー配慮メモ'
        ]
      },
      {
        icon: 'ri-file-chart-line',
        title: 'Data Storytelling',
        summary:
          'データ、制作物、経験から何が言えるかを、ケーススタディ、ブログ記事、判断メモとして整理します。',
        deliverables: [
          'データソースと制約の整理',
          '主要な発見を示すチャート、またはダッシュボード画面',
          '非エンジニアにも伝わる要約',
          'ポートフォリオ掲載用、または社内メモ向けの文章'
        ]
      }
    ],
    processTitle: 'シンプルな進め方',
    process: [
      {
        step: '01',
        title: '問いを絞る',
        body:
          '最初に、ひとつの判断、ひとつの読み手、最小限のアウトプットに絞ります。何でも入ったダッシュボードではなく、使える形を優先します。'
      },
      {
        step: '02',
        title: '透明性を保って作る',
        body:
          'データを整え、前提条件を残し、指標ロジックを見える状態にします。AIツールは下書きや検証に使いますが、元データと人間の確認を重視します。'
      },
      {
        step: '03',
        title: '読み方まで渡す',
        body:
          'ダッシュボード、レポート、分析設定だけでなく、読み方、制約、次に改善すべき点を一緒にまとめます。'
      }
    ],
    brandTitle: 'Pacibridge / Oceaflow の位置づけ',
    brandBody:
      '現時点ではSoraJPNZを公開ハブにします。Pacibridgeは将来の分析・ツール系ブランド、Oceaflowはライフスタイル・発信系ブランドとして育てる候補です。今は無理に分けず、コンテンツや商品が形になった段階で独立させる方針が自然です。',
    ctaTitle: '小さなデータ課題やポートフォリオ相談がありますか？',
    ctaBody:
      '小さな制作、ポートフォリオへのフィードバック、ダッシュボードレビュー、Web分析設定、発信とデータの整理など、お気軽にご連絡ください。',
    ctaButton: 'SoraJPNZに問い合わせる'
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
    subject: 'Contact form - SoraJPNZ'
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
    subject: 'お問い合わせフォーム - SoraJPNZ'
  }
} as const;

export const projects = {
  en: {
    title: 'Projects',
    subtitle:
      'Practical projects that connect public data, New Zealand life, content experiments, and analytics into something useful.',
    featured: 'Featured',
    calculatorBadge: 'Interactive tool',
    calculatorTitle: 'NZ Life Reality Calculator',
    calculatorDescription:
      'A browser-based decision-support tool for testing how hourly wage, work hours, weekly rent, car costs, savings goals, and emergency-buffer assumptions affect the estimated amount left each month in NZD and approximate JPY.',
    calculatorTags: ['React', 'TypeScript', 'Decision Support', 'Business Analysis', 'Browser-side'],
    calculatorAction: 'Try the calculator',
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
    subtitle:
      'NZ生活で気になった家賃、為替、生活費を、計算機やダッシュボードとして実際に試せる形にしています。',
    featured: '注目',
    calculatorBadge: '実用ツール',
    calculatorTitle: 'NZ生活リアリティ計算機',
    calculatorDescription:
      '時給、勤務時間、週の家賃、車、貯金目標を変えながら、月に残りそうな金額をNZDと日本円で見られる計算機です。入力した数字はブラウザ内で計算し、保存しません。',
    calculatorTags: ['React', 'TypeScript', '意思決定支援', '業務分析', 'ブラウザ計算'],
    calculatorAction: '計算機を使う',
    relocationTitle: 'ニュージーランド移住向け 家賃負担ダッシュボード',
    relocationDescription:
      'Tenancy Services / MBIEの家賃、RBNZのNZD/JPY為替、Stats NZの食品価格指数を一つにまとめました。NZで暮らす場所や予算を考えるときに、地域ごとの家賃負担を比べるためのダッシュボードです。',
    rentRadarTitle: 'Rent Radar (Power BI)',
    rentRadarDescription: '架空のサンプルデータで、家賃情報の見せ方やフィルターを試した初期のPower BIプロトタイプです。',
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
    glanceTitle: 'At a glance',
    glanceItems: [
      {
        icon: 'ri-dashboard-3-line',
        label: 'What it is',
        value: 'A Tableau decision-support dashboard for early New Zealand relocation and budgeting decisions.'
      },
      {
        icon: 'ri-database-2-line',
        label: 'Data',
        value: 'MBIE rental bond data, RBNZ NZD/JPY exchange rates, and Stats NZ Food Price Index context.'
      },
      {
        icon: 'ri-tools-line',
        label: 'Built with',
        value: 'Python, SQL, Tableau Public, CSV outputs, documentation, and validation checks.'
      },
      {
        icon: 'ri-line-chart-line',
        label: 'Outcome',
        value: 'Compare location-level rent pressure, yen impact, and selected cost-context trends in one view.'
      }
    ],
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
    glanceTitle: '概要',
    glanceItems: [
      {
        icon: 'ri-dashboard-3-line',
        label: '何を作ったか',
        value: 'ニュージーランド移住や予算検討の初期判断を支援するTableauダッシュボードです。'
      },
      {
        icon: 'ri-database-2-line',
        label: '使用データ',
        value: 'MBIE家賃データ、RBNZのNZD/JPY為替、Stats NZ Food Price Indexを使用しています。'
      },
      {
        icon: 'ri-tools-line',
        label: '使用技術',
        value: 'Python、SQL、Tableau Public、CSV出力、ドキュメント、検証チェックを組み合わせました。'
      },
      {
        icon: 'ri-line-chart-line',
        label: '見えること',
        value: '地域別の家賃負担、日本円換算の影響、選択された物価指標の推移を一画面で比較できます。'
      }
    ],
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
    viewAllProjects: 'View All Projects',
    glanceTitle: 'At a glance',
    glanceItems: [
      {
        icon: 'ri-dashboard-line',
        label: 'What it is',
        value: 'An early Power BI prototype exploring how rental information can be structured into a dashboard.'
      },
      {
        icon: 'ri-flask-line',
        label: 'Data',
        value: 'Mock/sample rental data generated for layout, filtering, and BI storytelling practice.'
      },
      {
        icon: 'ri-bar-chart-box-line',
        label: 'Built with',
        value: 'Power BI, dashboard wireframing, metric design, filters, and comparison views.'
      },
      {
        icon: 'ri-compass-3-line',
        label: 'Status',
        value: 'A portfolio prototype, useful for showing BI thinking rather than real market analysis.'
      }
    ]
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
    viewAllProjects: 'すべてのプロジェクトを見る',
    glanceTitle: '概要',
    glanceItems: [
      {
        icon: 'ri-dashboard-line',
        label: '何を作ったか',
        value: '家賃情報をダッシュボードとしてどう整理できるかを試したPower BI初期プロトタイプです。'
      },
      {
        icon: 'ri-flask-line',
        label: '使用データ',
        value: 'レイアウト、フィルタ、BIストーリー設計を試すための架空サンプル家賃データです。'
      },
      {
        icon: 'ri-bar-chart-box-line',
        label: '使用技術',
        value: 'Power BI、ダッシュボード設計、指標設計、フィルタ、比較ビューを使用しました。'
      },
      {
        icon: 'ri-compass-3-line',
        label: '位置づけ',
        value: '実際の市場分析ではなく、BI的な考え方と情報設計を示すポートフォリオ用プロトタイプです。'
      }
    ]
  }
} as const;

export const blog = {
  en: {
    title: 'SoraJPNZ Notes',
    subtitle:
      'Notes from Auckland on living costs, work, money, Japan comparisons, and the everyday context behind New Zealand life.',
    eyebrow: 'Notes hub',
    introTitle: 'Practical notes are being organized.',
    body:
      'SoraJPNZ Notes is being shaped around realistic Japan x New Zealand decision-making. English article links are not published here yet.',
    featuredTool: null,
    latestNote: null,
    categoryTitle: 'Core themes',
    categoryBody:
      'Notes will be grouped around practical questions first, with field notes kept as lived context rather than the whole identity of the site.',
    categories: [
      {
        icon: 'ri-home-5-line',
        title: 'NZ Living Costs',
        description: 'Rent, cars, savings targets, and the monthly space left after core costs.',
        themes: ['Rent', 'Car costs', 'Savings buffer']
      },
      {
        icon: 'ri-briefcase-4-line',
        title: 'Work & Career',
        description: 'Job search, early-career choices, work patterns, and realistic tradeoffs.',
        themes: ['Job search', 'Work style', 'Career notes']
      },
      {
        icon: 'ri-coins-line',
        title: 'Money & Investing Notes',
        description: 'Platforms, currency, budgeting, and money decisions while living between countries.',
        themes: ['Currency', 'Platforms', 'Budgeting']
      },
      {
        icon: 'ri-scales-3-line',
        title: 'NZ vs Japan',
        description: 'Living comfort, prices, work culture, and how daily life feels across both places.',
        themes: ['Prices', 'Work culture', 'Life choices']
      },
      {
        icon: 'ri-sailboat-line',
        title: 'Field Notes / Ocean & Fishing',
        description: 'Fishing, spearfishing, ocean conditions, gear, and what real days outside teach.',
        themes: ['Fishing', 'Spearfishing', 'Ocean notes']
      }
    ],
    comingSoonTitle: 'Notes being organized',
    comingSoonBody:
      'The first public notes will be added when the assumptions and sources are ready.',
    comingSoonItems: [
      'The real cost of living in Auckland',
      'New Zealand or Japan: which feels easier to live in?',
      'Thinking about happiness after years in New Zealand',
      'Money and investing notes from a New Zealand resident',
      'Auckland ocean notes'
    ],
    editorNote: {
      label: 'Written from Auckland',
      title: 'Still figuring it out, and documenting what helps.',
      body:
        'SoraJPNZ connects practical data with lived experience in New Zealand. Unfinished questions stay visible instead of being turned into easy answers.'
    }
  },
  ja: {
    title: 'SoraJPNZ Notes',
    subtitle:
      'Aucklandで暮らしていて気になった生活費、仕事、お金、日本との違いを、数字と自分の経験で書き残しています。海や釣りの話も、こちらで暮らす日々の一部です。',
    eyebrow: 'Notes from Auckland',
    introTitle: 'Aucklandで迷ったことを、あとから読み返せるノートに。',
    body:
      '生活費や仕事、お金のことは、感覚だけでは見えにくい部分があります。自分の経験に数字や一次情報を重ねながら、少しずつ書いています。',
    featuredTool: {
      title: '先に、自分の数字で試してみる',
      body: '時給・勤務時間・家賃・車コスト・貯金目標を入れて、NZ生活で月にいくら残りそうかを試算できます。',
      cta: 'NZ生活リアリティ計算機を使う',
      href: '/ja/tools/nz-life-reality-calculator'
    },
    latestNote: {
      label: '最新のノート',
      category: 'NZ生活費',
      date: '2026-08-28',
      dateLabel: '2026年8月28日 更新',
      title: 'Auckland生活費のリアル。家賃・車・貯金まで入れると、月いくら残る？',
      excerpt:
        '時給が高く見えても、家賃や車まで入れると月に残る金額は大きく変わります。最低賃金、Living Wage、家賃、貯金をAucklandでの生活感と一緒に見直しました。',
      cta: 'ノートを読む',
      href: '/ja/blog/auckland-living-cost-hourly-wage',
      image: assets.aucklandHarbour,
      imageAlt: '海越しに見たAucklandの街並み'
    },
    categoryTitle: '扱うテーマ',
    categoryBody:
      'Aucklandで暮らしていて実際に迷ったことを、五つのテーマに分けて書いています。うまくいった話だけでなく、まだ答えの出ていないことも残します。',
    categories: [
      {
        icon: 'ri-home-5-line',
        title: 'NZ生活費',
        description: '家賃、車、食費、貯金。Aucklandで月にいくら出ていき、何が残るのかを見ます。',
        themes: ['家賃', '車', '貯金']
      },
      {
        icon: 'ri-briefcase-4-line',
        title: '仕事・キャリア',
        description: '仕事探しや働き方について、実際に試したことを書きます。自分のキャリアも途中なので、分かったことと分からないことを分けて残します。',
        themes: ['仕事探し', '働き方']
      },
      {
        icon: 'ri-coins-line',
        title: 'お金・投資メモ',
        description: 'NZDと日本円、投資サービス、国をまたぐお金のこと。自分で確認したことを個人メモとして残します。',
        themes: ['投資メモ', '通貨']
      },
      {
        icon: 'ri-scales-3-line',
        title: 'NZ vs 日本',
        description: '物価や働き方、暮らしやすさは、条件によって見え方が変わります。優劣を決めるより、違いを具体的に見ます。',
        themes: ['住みやすさ', '物価']
      },
      {
        icon: 'ri-sailboat-line',
        title: 'Field Notes / 海・釣り',
        description: '釣り、スピアフィッシング、海況、道具、現地で覚えたこと。Aucklandで暮らす日々の記録として残します。',
        themes: ['釣り', '海況']
      }
    ],
    comingSoonTitle: '次に書きたいノート',
    comingSoonBody:
      '次に自分が書きたいテーマです。体験を書き出し、必要な数字や一次情報を確かめてから公開します。',
    comingSoonItems: [
      'NZと日本、どちらが住みやすいのか',
      'NZに7年以上住んで考える幸せ',
      'NZ在住者のお金・投資メモ',
      'Auckland海メモ'
    ],
    editorNote: {
      label: 'Aucklandから',
      title: 'まだ答えが出ていないことも書きます。',
      body:
        '日本からNZへ移り、生活費や仕事で迷ったことを、数字や一次情報と一緒に書いています。まだ分からないことは、分かったふりをせずそのまま残します。'
    }
  }
} as const;

export const linksPage = {
  en: {
    title: 'SoraJPNZ Links',
    eyebrow: 'SoraJPNZ',
    intro: 'Documenting New Zealand life, ocean stories, work, money, and practical data projects from Auckland.',
    primaryNote: 'Start here',
    secondaryNote: 'Explore the site',
    youtubeCta: 'Watch on YouTube',
    blogCta: 'Read the Blog',
    projectsCta: 'View Projects',
    servicesCta: 'Small projects and support',
    servicesNote: 'Website analytics, portfolio feedback, and data organization',
    contactCta: 'Contact',
    footer: 'This page is the lightweight SoraJPNZ link-in-bio hub.'
  },
  ja: {
    title: 'SoraJPNZ リンク',
    eyebrow: 'SoraJPNZ',
    intro: 'Aucklandで暮らしながら、NZ生活・海・仕事・お金・データ活用を記録しています。',
    primaryNote: 'まずはこちら',
    secondaryNote: 'サイトを見る',
    youtubeCta: 'YouTubeを見る',
    blogCta: 'ブログを読む',
    projectsCta: 'プロジェクトを見る',
    servicesCta: '制作・相談について',
    servicesNote: 'サイト分析、ポートフォリオ、データ整理など',
    contactCta: 'お問い合わせ',
    footer: 'SNSプロフィール用の、SoraJPNZ公式リンク入口です。'
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
