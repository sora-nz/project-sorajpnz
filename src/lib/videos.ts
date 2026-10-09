export type VideoCopy = { title: string; description: string; imageAlt: string };
export type Video = {
  id: string;
  url: string;
  thumbnail: string;
  date: string;
  ja: VideoCopy;
  en: VideoCopy;
  notePath?: string;
  previousUrl?: string;
};

// Pin this note to its original video, independently of later channel uploads.
export const surfcastingVideo = {
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

// Public titles, dates and thumbnails checked on YouTube on 2026-10-09.
// These also keep Home useful when the public channel feed is unavailable.
export const recentVideos: readonly Video[] = [
  { ...surfcastingVideo, ja: { ...surfcastingVideo.ja,
    title: '初めての浜釣りで食いつき激しめの魚が...ニュージーランドの海で彼女が大喜び' } },
  {
    id: 'qpyFmZSDQBw',
    url: 'https://www.youtube.com/watch?v=qpyFmZSDQBw',
    thumbnail: '/assets/videos/qpyFmZSDQBw.jpg',
    date: '2026-10-07',
    ja: {
      title: 'NZのwharfで鯛(Snapper)が...！',
      description: 'NZでの釣りと、二人の日常を短い動画で。',
      imageAlt: 'NZのwharfでの釣りを撮ったSoraJPNZの短い動画'
    },
    en: {
      title: 'A snapper at a New Zealand wharf',
      description: 'A short moment from fishing and everyday life in New Zealand.',
      imageAlt: 'Thumbnail from a SoraJPNZ fishing short at a New Zealand wharf'
    }
  },
  {
    id: 'ju5FmNZWXTQ',
    url: 'https://www.youtube.com/watch?v=ju5FmNZWXTQ',
    thumbnail: '/assets/videos/ju5FmNZWXTQ.jpg',
    date: '2026-10-07',
    ja: {
      title: 'New Zealandで夕飯を釣りに来たら、一度に2匹！',
      description: '夕飯を釣りに出かけた日の、短いひとこま。',
      imageAlt: '夕飯を釣りに出かけたSoraJPNZの短い動画'
    },
    en: {
      title: 'Fishing for dinner in New Zealand: two at once',
      description: 'A short moment from a day spent fishing for dinner.',
      imageAlt: 'Thumbnail from a SoraJPNZ short about fishing for dinner'
    }
  },
  {
    id: 'SPNGt_ROUaI',
    url: 'https://www.youtube.com/watch?v=SPNGt_ROUaI',
    thumbnail: '/assets/videos/SPNGt_ROUaI.jpg',
    date: '2026-09-28',
    ja: {
      title: 'NZで夕飯を釣りに行ったら...釣れたけど...',
      description: 'Theaと夕飯を釣りに。浜釣りの動画につながる前編です。',
      imageAlt: 'NZで夕飯を釣りに出かけたSoraJPNZのVlog'
    },
    en: {
      title: 'Fishing for dinner in New Zealand',
      description: 'The earlier part of our fishing day with Thea.',
      imageAlt: 'Thumbnail from the SoraJPNZ fishing-for-dinner vlog'
    }
  }
];

export const latestVideo = recentVideos[0];
export const homeVideoFallback = recentVideos.map((video) => ({
  id: video.id, title: video.ja.title, date: video.date,
  url: video.url, thumbnail: video.thumbnail
}));

export const videoNoteMeta = {
  path: surfcastingVideo.notePath,
  title: 'Theaと初めての浜釣り。動画に残したNZの一日',
  description: 'Theaと初めて浜釣りに挑戦したSoraJPNZのVlogに添える短いノート。動画の見どころと前編へのリンクをまとめました。',
  created: '2026-10-08',
  noIndex: true
} as const;
