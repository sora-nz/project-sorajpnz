export type Locale = 'en' | 'ja';

export const siteUrl = 'https://sorajpnz.com';

export const assets = {
  logoFull: '/assets/sora-jpnz-logo-full.png',
  logoMark: '/assets/sora-jpnz-logo-mark.png',
  hero: '/assets/homepage1.jpg',
  projectsBg: '/assets/homepage2.jpg',
  profileBg: '/assets/homepage3.jpg',
  dashboard: '/assets/nz-relocation-dashboard.png',
  rentRadar: '/assets/rentradar.png',
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
      title: 'SoraJPNZ | New Zealand Life, Ocean, Work, Money, and Data',
      description:
        'SoraJPNZ is a New Zealand-based content hub for NZ life, ocean and fishing stories, work, money, practical data projects, and social updates.'
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
        'Field notes from New Zealand life, ocean days, work, money, and practical data projects by SoraJPNZ.'
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
      title: 'SoraJPNZ | NZ生活・海・仕事・お金・データ',
      description:
        'SoraJPNZは、NZ生活、海・釣り、仕事、お金、データ活用、SNS発信をまとめる個人ブランドの発信母艦です。'
    },
    services: {
      title: 'サービス | SoraJPNZ',
      description:
        'SoraJPNZの軽いサポートページです。小さなダッシュボード、Web分析、ポートフォリオ相談、発信内容の整理、実用的な制作を扱います。'
    },
    projects: {
      title: 'プロジェクト | SoraJPNZ',
      description:
        'NZ生活、移住、海、仕事、お金、発信活動、データ活用を、あとから使える形にしていくSoraJPNZのプロジェクトです。'
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
        'NZ生活、海、仕事、お金、データ活用を動画・ブログ・プロジェクトとして残すSoraJPNZの記録ページです。'
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
    title: 'SoraJPNZ',
    role: 'Videos, blog notes, and practical projects from New Zealand',
    tagline:
      'SoraJPNZ is a personal media hub documenting New Zealand life, ocean stories, work, money, and practical data projects through videos, blog notes, and projects.',
    description:
      'Follow the journey through YouTube, short-form social posts, blog notes, and practical projects.',
    primaryCta: 'Watch on YouTube',
    contactCta: 'Read the Blog',
    socialEyebrow: 'Social Channels',
    socialTitle: 'Follow the journey',
    socialSubtitle:
      'YouTube is the main archive. Short clips, updates, and lightweight notes live across the other channels, then the useful parts become blog posts and projects here.',
    socialPrimaryLabel: 'Main channel',
    socialSecondaryLabel: 'Short clips and updates',
    allLinksCta: 'Open all links',
    servicesEyebrow: 'Now building',
    servicesTitle: 'From content to projects',
    servicesSubtitle:
      'The site starts with videos and notes, then turns useful ideas into projects, data experiments, and small support when it makes sense.',
    servicesCta: 'See light support options',
    services: [
      {
        icon: 'ri-youtube-line',
        title: 'Video & Blog Notes',
        body: 'YouTube and short-form ideas become notes that can be searched, shared, and improved later.'
      },
      {
        icon: 'ri-compass-3-line',
        title: 'Practical Projects',
        body: 'New Zealand life, relocation, ocean, work, money, and data ideas are shaped into useful public projects.'
      },
      {
        icon: 'ri-hand-heart-line',
        title: 'Light Support',
        body: 'Portfolio feedback, website analytics, dashboard organization, and small practical conversations stay available when needed.'
      }
    ],
    projectsTitle: 'Projects',
    aboutTitle: 'About Me',
    about:
      'I use SoraJPNZ as a public record of what I am learning and building in New Zealand. The work still includes data analysis, dashboards, and practical reporting, but it now sits alongside content about life, ocean activities, career building, money, and small experiments.',
    contactTitle: 'Contact',
    contact:
      'For hiring, interviews, collaborations, portfolio feedback, or small project conversations, please get in touch.'
  },
  ja: {
    title: 'SoraJPNZ',
    role: 'NZ生活・海・仕事・お金・データの記録',
    tagline:
      'SoraJPNZは、ニュージーランドでの生活、海、仕事、お金、データ活用を、動画・ブログ・プロジェクトとして記録する個人メディアです。',
    description:
      'YouTube、短尺SNS、ブログ、プロジェクトをつなげながら、あとから使える記録として残していきます。',
    primaryCta: 'YouTubeを見る',
    contactCta: 'ブログを読む',
    socialEyebrow: 'Social Channels',
    socialTitle: '発信をフォローする',
    socialSubtitle:
      'YouTubeをメインの動画アーカイブにしつつ、短尺動画や軽い更新は各SNSに出していきます。役に立つ内容はブログやプロジェクトとして、このサイトに残していきます。',
    socialPrimaryLabel: 'メインチャンネル',
    socialSecondaryLabel: '短尺動画と更新',
    allLinksCta: 'リンク一覧を見る',
    servicesEyebrow: 'Now building',
    servicesTitle: '発信からプロジェクトへ',
    servicesSubtitle:
      '動画やメモから始めて、役に立つ内容をプロジェクト、データ実験、必要なときの軽い相談へ育てていきます。',
    servicesCta: '軽いサポート内容を見る',
    services: [
      {
        icon: 'ri-youtube-line',
        title: '動画とブログメモ',
        body: 'YouTubeや短尺SNSで出した内容を、あとから探せて共有できるメモとして整理します。'
      },
      {
        icon: 'ri-compass-3-line',
        title: '実用プロジェクト',
        body: 'NZ生活、移住、海、仕事、お金、データ活用を、あとから使える制作物や公開プロジェクトにしていきます。'
      },
      {
        icon: 'ri-hand-heart-line',
        title: '軽い相談・サポート',
        body: 'ポートフォリオ相談、Web分析、ダッシュボード整理など、必要があれば小さく相談できる形にしています。'
      }
    ],
    projectsTitle: 'プロジェクト',
    aboutTitle: '自己紹介',
    about:
      'SoraJPNZは、ニュージーランドで暮らしながら学び、作り、発信していく過程を残す場所です。データ分析、ダッシュボード、レポート制作の強みは残しつつ、生活、海、仕事、お金、AI活用、発信活動も一緒に扱っていきます。',
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
      '公的データ、NZ生活、発信活動、分析の実験を、あとから使える形にしていくプロジェクトです。',
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
      'Field notes from New Zealand life, ocean days, work, money, and practical data projects.',
    introLabel: 'Content hub',
    introTitle: 'Videos become notes. Notes become projects.',
    body:
      'This blog turns YouTube ideas, short social posts, New Zealand life, and ocean notes into something searchable and useful.',
    fieldTitle: 'From the field',
    fieldBody:
      'Real moments from ocean days, fishing, spearfishing, New Zealand life, and small trips that will become future notes and projects.',
    fieldCaptions: [
      'Shore fishing days',
      'Spearfishing notes',
      'Ocean markers',
      'Small catches',
      'NZ life and trips',
      'Field notes from Auckland'
    ],
    firstNoteTitle: 'Start here',
    firstNoteBody:
      'The first notes will focus on practical topics from New Zealand life, fishing, ocean days, work, and money.',
    firstNoteItems: [
      'How SoraJPNZ will record Auckland ocean and fishing notes',
      'Why SoraJPNZ is documenting New Zealand life and fishing',
      'Why I am recording ocean, work, money, and data while living in Auckland'
    ],
    firstNoteDraft: {
      label: 'Draft: Before You Start Shore Fishing in Auckland',
      href: '/blog/auckland-shore-fishing-starter',
      note: 'A working note with rule-check reminders before it becomes a full guide.'
    },
    categoryTitle: "Topics I'm building",
    categoryBody:
      'Videos and daily notes will be organized into themes that can be revisited later.',
    categories: [
      {
        icon: 'ri-youtube-line',
        title: 'Video Notes',
        description: 'Readable notes from YouTube videos, Shorts, and useful social clips.',
        themes: ['Video summaries', 'Behind-the-scenes notes', 'Links and references']
      },
      {
        icon: 'ri-home-heart-line',
        title: 'New Zealand Life',
        description: 'Auckland living, housing, transport, food costs, and everyday observations.',
        themes: ['Auckland life', 'Moving and settling', 'Cost-of-living notes']
      },
      {
        icon: 'ri-sailboat-line',
        title: 'Ocean & Fishing',
        description: 'Shore fishing, spearfishing, ocean safety, gear, and trip notes.',
        themes: ['Spearfishing logs', 'Gear and safety', 'Trip notes']
      },
      {
        icon: 'ri-briefcase-4-line',
        title: 'Work & Money',
        description: 'Career building, visa context, living costs, investing, and money reality checks.',
        themes: ['Career notes', 'Visa and job search context', 'Money reality checks']
      },
      {
        icon: 'ri-database-2-line',
        title: 'Data & Tools',
        description: 'AI, analytics, dashboards, content performance, and data experiments.',
        themes: ['GA4 and Search Console', 'Dashboards', 'AI-assisted workflows']
      }
    ]
  },
  ja: {
    title: 'SoraJPNZ Notes',
    subtitle:
      'NZ生活、海、仕事、お金、データ活用を、動画・ブログ・プロジェクトとして残していきます。',
    introLabel: 'Content hub',
    introTitle: '動画をメモに。メモをプロジェクトに。',
    body:
      'SoraJPNZのブログは、YouTubeやSNSで出した内容、NZ生活の気づき、海や釣りの記録を、あとから読み返せる形で残す場所です。',
    fieldTitle: '現地の記録',
    fieldBody:
      '海、釣り、スピアフィッシング、NZ生活、日帰り旅の実体験を、これから動画・ブログ・プロジェクトとして残していきます。',
    fieldCaptions: [
      '岸釣りの日',
      'スピアフィッシング記録',
      '海の記録',
      '小さな釣果',
      'NZ生活と日帰り旅',
      'Aucklandからの記録'
    ],
    firstNoteTitle: 'まずここから',
    firstNoteBody:
      '最初は、NZ生活・釣り・海・仕事・お金の中から、実体験として残しやすいテーマをまとめていきます。',
    firstNoteItems: [
      'Aucklandでの海・釣り記録をどう残していくか',
      'ニュージーランド生活と釣りをSoraJPNZで記録する理由',
      'Aucklandで暮らしながら、海・仕事・お金・データを記録していく理由'
    ],
    firstNoteDraft: {
      label: '下書き: NZオークランドで岸釣りを始める前に知っておくこと',
      href: '/blog/auckland-shore-fishing-starter',
      note: '公式情報の確認メモを残しながら作成中です。'
    },
    categoryTitle: '記録していくテーマ',
    categoryBody:
      '動画や日々の記録を、あとから読み返せるテーマごとに整理していきます。',
    categories: [
      {
        icon: 'ri-youtube-line',
        title: 'Video Notes',
        description: 'YouTubeやShortsで話した内容を、あとから読み返せる形で整理します。',
        themes: ['動画の要約', '撮影・編集の裏側', '参考リンク']
      },
      {
        icon: 'ri-home-heart-line',
        title: 'New Zealand Life',
        description: 'Aucklandでの生活、住まい、移動、食費、日常の気づきを扱います。',
        themes: ['オークランド生活', '移住と生活の立ち上げ', '生活費メモ']
      },
      {
        icon: 'ri-sailboat-line',
        title: 'Ocean & Fishing',
        description: '岸釣り、スピアフィッシング、海の安全、道具、釣行記録を扱います。',
        themes: ['スピアフィッシング記録', '道具と安全', '釣行メモ']
      },
      {
        icon: 'ri-briefcase-4-line',
        title: 'Work & Money',
        description: '仕事探し、ビザ、生活費、投資、NZで生きるためのお金の現実を扱います。',
        themes: ['キャリア記録', 'ビザと仕事探し', 'お金の現実']
      },
      {
        icon: 'ri-database-2-line',
        title: 'Data & Tools',
        description: 'AI、Webサイト、アクセス分析、ダッシュボード、発信改善の裏側を扱います。',
        themes: ['GA4とSearch Console', 'ダッシュボード', 'AI活用ワークフロー']
      }
    ]
  }
} as const;


export const shoreFishingStarterArticle = {
  en: {
    title: 'Before You Start Shore Fishing in Auckland, New Zealand',
    eyebrow: 'Draft field note',
    draftLabel: 'Draft / first note',
    statusLabel: 'Working draft',
    description:
      'A draft starter note for people who want to begin shore fishing around Auckland, covering places, gear, safety, rule checking, and how SoraJPNZ records real trips.',
    heroAlt: 'A shore fishing moment near Auckland with a snapper by the water',
    intro:
      'A draft starter note for people who want to begin shore fishing around Auckland, covering places, gear, safety, rule checking, and how SoraJPNZ records real trips.',
    tocTitle: 'Table of contents',
    sections: [
      {
        id: 'premise',
        title: 'The premise of this article',
        body: [
          'This is not a finished public guide yet. It is a field-note draft that will become more useful as I add real trips, photos, video notes, and confirmed references.',
          'The goal is simple: help a beginner think through the first fishing day before buying too much gear or choosing a random spot.'
        ]
      },
      {
        id: 'first-things',
        title: 'Start with the day, not just the spot',
        body: [
          'Around Auckland, shore fishing can feel very different depending on the tide, weather, wind, swell, access, and how comfortable you are moving around rocks or wharves.',
          'For a first trip, I would rather choose a calm, easy-to-leave place than chase the most exciting looking location. A good beginner day is one where you can learn, stay safe, and come home with useful notes.'
        ]
      },
      {
        id: 'gear',
        title: 'Minimum gear to prepare',
        body: [
          'You do not need to turn the first trip into a full gear project. A simple rod and reel setup, suitable line, basic tackle, a small bag, sun protection, drinking water, and something warm can already teach you a lot.',
          'The details depend on the style of fishing, the location, and the species you are targeting, so this section needs more confirmed local references before it becomes a full checklist.'
        ],
        note: 'TODO: Add a beginner gear checklist after checking local shop advice and official safety references.'
      },
      {
        id: 'location',
        title: 'Choosing a place',
        body: [
          'I want this article to eventually compare beginner-friendly situations, such as wharf access, rock access, beach access, parking, toilets, mobile reception, and how easy it is to leave if conditions change.',
          'For now, the safest wording is this: choose a place you can understand before you fish. Check access, weather, tide, swell, daylight, and whether the area has special rules or restrictions.'
        ],
        note: 'TODO: Add official links and only mention specific locations after checking current access and rule information.'
      },
      {
        id: 'safety',
        title: 'Safety comes first',
        body: [
          'Auckland fishing can look relaxed from photos, but wet rocks, changing swell, wind, darkness, and unfamiliar access can turn a simple trip into a stressful one.',
          'Beginner trips are easier when you go with someone, tell someone where you are going, keep an exit plan, avoid pushing conditions, and treat the ocean as stronger than your schedule.'
        ]
      },
      {
        id: 'rules',
        title: 'Always check the official fishing rules',
        body: [
          'Fishing rules, size limits, closed areas, and catch limits can change. I do not want this page to become a place where outdated information gives someone the wrong idea.',
          'Before fishing, check official New Zealand sources and any current local notices. This draft intentionally avoids giving exact limits or legal instructions until the official references are reviewed.'
        ],
        note: 'TODO: Confirm the latest official Fisheries New Zealand / MPI pages before adding links or specific rule summaries.'
      },
      {
        id: 'records',
        title: 'Photos, video, and trip notes',
        body: [
          'SoraJPNZ is not only about catching fish. I want to record the full context: what the day looked like, what I tried, what I learned, how conditions felt, and what I would do differently next time.',
          'Over time, these notes can become YouTube videos, short clips, blog posts, and simple data projects about trips, conditions, gear, and learning curves.'
        ]
      },
      {
        id: 'next',
        title: 'What I want to write next',
        body: [
          'Next, I want to turn this draft into a practical starter note with confirmed links, a beginner gear list, a simple trip log template, and examples from real Auckland fishing days.',
          'The public version should stay useful without pretending to be official advice.'
        ]
      }
    ],
    noticeTitle: 'Rule check note',
    noticeBody:
      'Fishing rules, size limits, closed areas, and catch limits can change. This article is a personal field note, not official advice. Always check official New Zealand sources before fishing.',
    factCheckTitle: 'Fact-check TODO',
    factCheckItems: [
      'Confirm the current official Fisheries New Zealand / MPI recreational fishing pages.',
      'Add official links for area rules, temporary closures, and any relevant local notices.',
      'Review safety references before turning this draft into a public guide.'
    ],
    ctaTitle: 'Keep exploring',
    ctaBody: 'This draft will become clearer as more real trips, photos, videos, and notes are added.',
    ctas: {
      blog: 'Back to Blog Hub',
      youtube: 'Watch YouTube',
      instagram: 'Instagram',
      contact: 'Contact',
      projects: 'Projects'
    }
  },
  ja: {
    title: 'NZオークランドで岸釣りを始める前に知っておくこと',
    eyebrow: '下書きフィールドノート',
    draftLabel: 'Draft / 下書き',
    statusLabel: '作成中の下書き',
    description:
      'Aucklandで岸釣りを始めたい人向けに、最初に考えるべき場所、道具、安全、ルール確認、記録の残し方を、自分の実体験ベースで整理する下書きです。',
    heroAlt: 'Auckland周辺の岸釣りで釣れた魚を水辺で持っている様子',
    intro:
      'Aucklandで岸釣りを始めたい人向けに、最初に考えるべき場所、道具、安全、ルール確認、記録の残し方を、自分の実体験ベースで整理する下書きです。',
    tocTitle: '目次',
    sections: [
      {
        id: 'premise',
        title: 'この記事の前提',
        body: [
          'これはまだ完成版の公開ガイドではありません。実際の釣行、写真、動画メモ、確認済みの参考リンクを足しながら育てていくための下書きです。',
          '目的はシンプルで、初めてAuckland周辺で岸釣りをする人が、道具を買いすぎたり、なんとなく場所を選んだりする前に、最初の一日をどう考えるか整理することです。'
        ]
      },
      {
        id: 'first-things',
        title: 'Aucklandの岸釣りは、場所選びでかなり変わる',
        body: [
          'Auckland周辺の岸釣りは、潮、天気、風、波、足場、アクセス、岩場や桟橋に慣れているかどうかで体験が大きく変わります。',
          '最初の釣行では、いきなり一番よさそうな場所を狙うより、落ち着いて帰れる場所を選ぶ方がいいと思っています。初心者にとって良い日は、釣果だけでなく、安全に学んで、次に活かせるメモを残せる日です。'
        ]
      },
      {
        id: 'gear',
        title: '最初にそろえる道具',
        body: [
          '最初から道具を完璧にそろえる必要はありません。シンプルなロッドとリール、用途に合うライン、基本的な仕掛け、小さなバッグ、日焼け対策、水、少し暖かい服があるだけでも学べることは多いです。',
          'ただし、具体的な道具は釣り方、場所、狙う魚によって変わるので、このセクションはローカル情報と安全情報を確認してから、公開版でチェックリスト化したいです。'
        ],
        note: 'TODO: ローカルの釣具店情報と安全情報を確認してから、初心者用の道具リストを追加する。'
      },
      {
        id: 'location',
        title: '場所選び',
        body: [
          '将来的には、桟橋、岩場、ビーチ、駐車場、トイレ、電波、天候が変わったときの帰りやすさなどを、初心者目線で整理したいです。',
          '現時点で安全に言えるのは、釣る前にその場所を理解することです。アクセス、天気、潮、波、明るさ、特別なルールや制限がないかを確認してから行くようにします。'
        ],
        note: 'TODO: 具体的な場所を出す前に、最新のアクセス情報と公式ルールを確認してリンクを追加する。'
      },
      {
        id: 'safety',
        title: '安全面で気をつけること',
        body: [
          '写真で見ると穏やかに見えても、濡れた岩、変わる波、風、暗さ、慣れない足場はかなり負担になります。',
          '最初のうちは誰かと一緒に行く、行き先を人に伝える、帰る判断を早めにする、無理なコンディションで粘らない、海は自分の予定より強いものとして扱う、くらい慎重でちょうどいいと思っています。'
        ]
      },
      {
        id: 'rules',
        title: '釣りルールは必ず公式情報で確認する',
        body: [
          '釣りのルール、サイズ制限、禁止エリア、持ち帰り制限などは変わる可能性があります。古い情報が残って誰かを誤解させる場所にはしたくありません。',
          '釣りに行く前には、New Zealandの公式情報と、その時点のローカルな注意情報を確認してください。この下書きでは、公式情報を確認するまで具体的な制限や法的な説明は書かない方針にしています。'
        ],
        note: 'TODO: MPI / Fisheries New Zealand の最新公式ページを確認してから、リンクやルール概要を追加する。'
      },
      {
        id: 'records',
        title: 'SoraJPNZでは釣行記録も残していく',
        body: [
          'SoraJPNZで残したいのは、釣果だけではありません。その日の雰囲気、試したこと、学んだこと、コンディション、次に変えたいことまで含めて記録していきたいです。',
          '少しずつ、YouTube、短尺動画、ブログ、釣行メモ、シンプルなデータプロジェクトにつなげていく予定です。'
        ]
      },
      {
        id: 'next',
        title: '次にまとめたいこと',
        body: [
          '次は、確認済みの公式リンク、初心者向け道具リスト、簡単な釣行ログテンプレート、実際のAuckland周辺での釣行例を足して、より実用的な記事にしていきたいです。',
          '公開版にするときも、公式情報の代わりではなく、実体験ベースの入口として役立つ形に留めます。'
        ]
      }
    ],
    noticeTitle: '公式情報確認メモ',
    noticeBody:
      '釣りのルール、サイズ制限、禁止エリア、持ち帰り制限などは変わる可能性があります。この記事は個人の実体験メモであり、最終判断には必ずNew Zealandの公式情報を確認してください。',
    factCheckTitle: '確認TODO',
    factCheckItems: [
      'MPI / Fisheries New Zealand の最新公式ページを確認してリンクを追加する。',
      'エリア別ルール、一時的な閉鎖情報、ローカルな注意情報を公式ページで確認する。',
      '公開版にする前に、安全情報の参照元を確認する。'
    ],
    ctaTitle: '続きもゆっくり整えていく',
    ctaBody: '実際の釣行、写真、動画、メモが増えたら、この記事も少しずつ実用的にしていきます。',
    ctas: {
      blog: 'Blog Hubへ戻る',
      youtube: 'YouTubeを見る',
      instagram: 'Instagram',
      contact: 'お問い合わせ',
      projects: 'Projectsを見る'
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
