type ProjectCardProps = {
  image: string;
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
  action: string;
  featured?: string;
  headingLevel?: 2 | 3;
};

export function ProjectCard({ image, title, description, tags, href, action, featured, headingLevel = 2 }: ProjectCardProps) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  return (
    <article className="project-card">
      <a href={href} className="project-image-link" aria-label={title}>
        <img src={image} alt={`${title} preview`} loading="lazy" decoding="async" />
        {featured && <span className="featured-badge">{featured}</span>}
      </a>
      <div className="project-card-body">
        <Heading><a href={href}>{title}</a></Heading>
        <p>{description}</p>
        <div className="tag-row">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a className="button primary small" href={href}>
          <span>{action}</span>
          <i className="ri-arrow-right-line" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
