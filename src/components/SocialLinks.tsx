import { links } from '../lib/content';

type SocialLinksProps = {
  compact?: boolean;
  dark?: boolean;
};

export function SocialLinks({ compact = false, dark = false }: SocialLinksProps) {
  const items = [
    { href: links.linkedin, label: 'LinkedIn', icon: 'ri-linkedin-fill', tone: 'linkedin' },
    { href: links.github, label: 'GitHub', icon: 'ri-github-fill', tone: 'github' },
    { href: links.youtube, label: 'YouTube', icon: 'ri-youtube-fill', tone: 'youtube' },
    { href: links.email, label: 'Email', icon: 'ri-mail-line', tone: 'email' }
  ];

  return (
    <div className={compact ? 'social compact' : 'social'}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={item.label}
          className={`social-link ${item.tone} ${dark ? 'dark' : ''}`}
        >
          <i className={item.icon} />
        </a>
      ))}
    </div>
  );
}
