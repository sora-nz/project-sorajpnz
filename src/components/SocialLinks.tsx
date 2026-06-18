import { socialLinks } from '../lib/content';

type SocialLinksProps = {
  compact?: boolean;
  dark?: boolean;
  placement?: 'header' | 'footer';
};

export function SocialLinks({ compact = false, dark = false, placement = 'header' }: SocialLinksProps) {
  const items = socialLinks.filter((item) =>
    placement === 'header' ? item.href && item.showInHeader : item.href && item.showInFooter
  );

  return (
    <div className={compact ? 'social compact' : 'social'}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={`social-link ${item.tone} ${dark ? 'dark' : ''}`}
        >
          <i className={item.icon} />
        </a>
      ))}
    </div>
  );
}
