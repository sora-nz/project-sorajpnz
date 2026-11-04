import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { Locale } from '../lib/content';
import './HomeCarousel.css';

type HomeCarouselProps = {
  id: string;
  label: string;
  locale: Locale;
  children: ReactNode[];
  itemKeys: string[];
  delay?: number;
};

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function HomeCarousel({ id, label, locale, children, itemKeys, delay = 6500 }: HomeCarouselProps) {
  const regionRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [inView, setInView] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(() => typeof document === 'undefined' || !document.hidden);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleIndices, setVisibleIndices] = useState<number[]>([0]);
  const [announcementIndex, setAnnouncementIndex] = useState<number | null>(null);
  const rotationPointerIntent = useRef<boolean | null>(null);
  const slideCount = children.length;
  const options = useMemo(() => ({
    align: 'start' as const,
    containScroll: 'trimSnaps' as const,
    loop: slideCount > 1,
    duration: 24,
    breakpoints: { '(prefers-reduced-motion: reduce)': { duration: 0 } },
  }), [slideCount]);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const activeIndex = Math.min(selectedIndex, Math.max(0, slideCount - 1));
  const isJapanese = locale === 'ja';

  const pause = useCallback(() => setPlaying(false), []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => {
      setReducedMotion(motion.matches);
      if (motion.matches) setPlaying(false);
    };
    onMotionChange();
    motion.addEventListener('change', onMotionChange);
    return () => motion.removeEventListener('change', onMotionChange);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    const region = regionRef.current;
    if (!region || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onVisibility = () => setVisibleIndices(emblaApi.slidesInView());
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      onVisibility();
    };
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('slidesInView', onVisibility);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('slidesInView', onVisibility);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !playing || reducedMotion || !inView || !documentVisible || slideCount < 2) return;
    const timer = window.setInterval(() => {
      emblaApi.scrollTo((emblaApi.selectedScrollSnap() + 1) % slideCount);
    }, Math.max(delay, 3500));
    return () => window.clearInterval(timer);
  }, [delay, documentVisible, emblaApi, inView, playing, reducedMotion, slideCount]);

  const select = (index: number) => {
    pause();
    setAnnouncementIndex(index);
    emblaApi?.scrollTo(index);
  };

  return (
    <div className="home-carousel" id={id} ref={regionRef} role="region" aria-roledescription="carousel" aria-label={label}
      onPointerEnter={(event) => { if (event.pointerType !== 'touch') pause(); }}
      onFocusCapture={pause}
      onPointerDownCapture={(event) => {
        rotationPointerIntent.current = (event.target as Element).closest('.home-carousel__rotation') ? playing : null;
        pause();
      }}
      onPointerCancel={() => { rotationPointerIntent.current = null; }}
      onKeyDownCapture={() => { rotationPointerIntent.current = null; }}>
      {slideCount > 1 && (
        <div className="home-carousel__controls">
          <button className="home-carousel__control home-carousel__rotation" type="button"
            aria-label={isJapanese ? playing ? '自動切り替えを停止' : '自動切り替えを再開' : playing ? 'Pause automatic slides' : 'Play automatic slides'}
            title={isJapanese ? reducedMotion ? '動きを減らす設定が有効です' : playing ? '自動切り替えを停止' : '自動切り替えを再開' : reducedMotion ? 'Reduced motion is enabled' : playing ? 'Pause automatic slides' : 'Play automatic slides'}
            aria-pressed={playing && !reducedMotion} disabled={reducedMotion || !emblaApi}
            onClick={() => {
              const wasPlaying = rotationPointerIntent.current;
              rotationPointerIntent.current = null;
              setAnnouncementIndex(null);
              setPlaying(wasPlaying === null ? (current) => !current : !wasPlaying);
            }}>
            <i className={playing && !reducedMotion ? 'ri-pause-fill' : 'ri-play-fill'} aria-hidden="true" />
          </button>
          <div className="home-carousel__dots" role="group" aria-label={isJapanese ? `${label}の項目` : `${label} slides`}>
            {children.map((_, index) => (
              <button className="home-carousel__dot" type="button" key={itemKeys[index] ?? index}
                aria-label={isJapanese ? `${index + 1} / ${slideCount}を表示` : `Show slide ${index + 1} of ${slideCount}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                aria-controls={`${id}-slide-${index + 1}`}
                disabled={!emblaApi}
                onClick={() => select(index)} />
            ))}
          </div>
          <div className="home-carousel__arrows" role="group" aria-label={isJapanese ? '前後の項目' : 'Previous and next slides'}>
            <button className="home-carousel__control" type="button"
              aria-label={isJapanese ? '前の項目' : 'Previous slide'} disabled={!emblaApi}
              onClick={() => select((activeIndex - 1 + slideCount) % slideCount)}>
              <i className="ri-arrow-left-line" aria-hidden="true" />
            </button>
            <button className="home-carousel__control" type="button"
              aria-label={isJapanese ? '次の項目' : 'Next slide'} disabled={!emblaApi}
              onClick={() => select((activeIndex + 1) % slideCount)}>
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
      <div className="home-carousel__viewport" ref={emblaRef} aria-live="off">
        <div className="home-carousel__track">
          {children.map((child, index) => (
            <div className="home-carousel__slide" id={`${id}-slide-${index + 1}`}
              role="group" aria-roledescription="slide"
              aria-label={isJapanese ? `${index + 1} / ${slideCount}` : `${index + 1} of ${slideCount}`}
              aria-hidden={activeIndex !== index && !visibleIndices.includes(index)}
              inert={activeIndex !== index && !visibleIndices.includes(index)}
              key={itemKeys[index] ?? index}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <span className="home-carousel__announcement" role="status" aria-live="polite">{announcementIndex === null ? '' : isJapanese ? `${label}、${announcementIndex + 1} / ${slideCount}` : `${label}, ${announcementIndex + 1} of ${slideCount}`}</span>
    </div>
  );
}
