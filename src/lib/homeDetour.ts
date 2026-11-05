import { assets, aucklandLivingCostMeta, type Locale, projects } from './content';
import { localize } from './routes';
import type { HomeVideo } from './youtubeFeed';

export type HomeDetourItem = {
  id: string;
  kind: 'project' | 'note' | 'video';
  title: string;
  description: string;
  href: string;
  image?: string;
  video?: HomeVideo;
};

export type DetourBag = {
  deck: readonly string[];
  remaining: readonly string[];
  previousId: string | null;
};

export function buildHomeDetourItems(locale: Locale, videos: readonly HomeVideo[]): HomeDetourItem[] {
  const base = localize(locale);
  const copy = projects[locale];
  const isJapanese = locale === 'ja';
  const items: HomeDetourItem[] = [
    {
      id: 'project:calculator',
      kind: 'project',
      title: copy.calculatorTitle,
      description: isJapanese ? '生活費を試せる計算機。その前提と作り方をまとめました。' : 'The assumptions and design behind a browser-based living-cost calculator.',
      href: `${base}/projects/nz-life-reality-calculator`,
      image: isJapanese ? assets.calculatorJa : assets.calculator
    },
    {
      id: 'project:relocation',
      kind: 'project',
      title: copy.relocationTitle,
      description: isJapanese ? '公的な家賃・食品価格・為替データをまとめたダッシュボードです。' : 'A dashboard connecting public rent, food-price and exchange-rate data.',
      href: `${base}/projects/nz-japan-relocation`,
      image: assets.dashboard
    },
    {
      id: 'project:rent-radar',
      kind: 'project',
      title: copy.rentRadarTitle,
      description: copy.rentRadarDescription,
      href: `${base}/projects/rent-radar`,
      image: assets.rentRadar
    }
  ];

  if (isJapanese) {
    items.push({
      id: 'note:auckland-living-cost',
      kind: 'note',
      title: aucklandLivingCostMeta.title,
      description: '家賃、車、貯金まで入れると、月にどれくらい残るのか。Aucklandでの生活費のノートです。',
      href: aucklandLivingCostMeta.path,
      image: assets.aucklandHarbour
    });
  }

  const seen = new Set<string>();
  for (const video of videos) {
    if (seen.size === 4) break;
    if (!/^[A-Za-z0-9_-]{11}$/.test(video.id) || !video.title.trim() || seen.has(video.id)) continue;
    seen.add(video.id);
    items.push({
      id: `video:${video.id}`,
      kind: 'video',
      title: video.title,
      description: isJapanese ? 'SoraJPNZの動画から、今日のひとこま。' : 'A moment from SoraJPNZ, shared on YouTube.',
      href: `https://www.youtube.com/watch?v=${video.id}`,
      video
    });
  }
  return items;
}

export function drawHomeDetour(ids: readonly string[], state: DetourBag, random = Math.random) {
  const deck = [...new Set(ids)];
  if (deck.length === 0) return { id: null, bag: { deck, remaining: [], previousId: null } satisfies DetourBag };
  const sameDeck = deck.length === state.deck.length && deck.every((id, index) => id === state.deck[index]);
  let remaining = sameDeck ? [...state.remaining] : [];

  if (remaining.length === 0) {
    remaining = [...deck];
    for (let index = remaining.length - 1; index > 0; index -= 1) {
      const other = Math.floor(random() * (index + 1));
      [remaining[index], remaining[other]] = [remaining[other], remaining[index]];
    }
    // A new bag should not immediately repeat the last item from the old bag.
    if (remaining.length > 1 && remaining[0] === state.previousId) {
      [remaining[0], remaining[1]] = [remaining[1], remaining[0]];
    }
  }

  const [id, ...rest] = remaining;
  return { id, bag: { deck, remaining: rest, previousId: id } satisfies DetourBag };
}
