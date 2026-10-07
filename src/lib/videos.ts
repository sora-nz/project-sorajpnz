// Public video details checked on YouTube on 2026-10-08. No viewer data is fetched.
export const latestVideo = {
  id: 'OYzlhtqtuzs',
  url: 'https://www.youtube.com/watch?v=OYzlhtqtuzs',
  thumbnail: '/assets/videos/first-surfcasting-nz.jpg',
  date: '2026-10-07',
  ja: {
    title: '初めて浜から釣ったら、このサイズ！ニュージーランドの海で釣りに挑戦',
    description: 'Theaと初めての浜釣りへ。夕飯になる魚を求めて場所を移動した日の様子を、動画に残しました。',
    imageAlt: '浜釣りで釣れた魚を持つThea。SoraJPNZ動画のサムネイル'
  },
  en: {
    title: 'Our first surfcasting day in New Zealand',
    description: 'A fishing day with Thea, trying surfcasting for the first time. A little of the New Zealand life behind the projects.',
    imageAlt: 'Thea holding a fish on the beach, from the SoraJPNZ surfcasting vlog'
  },
  notePath: '/ja/blog/first-surfcasting-nz',
  previousUrl: 'https://www.youtube.com/watch?v=SPNGt_ROUaI'
} as const;

export const videoNoteMeta = {
  path: latestVideo.notePath,
  title: 'Theaと初めての浜釣り。動画に残したNZの一日',
  description: 'Theaと初めて浜釣りに挑戦したSoraJPNZのVlogに添える短いノート。動画の見どころと前編へのリンクをまとめました。',
  created: '2026-10-08',
  noIndex: true
} as const;
