type ProjectCardProps = {
  image: string;
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
  action: string;
  featured?: string;
};

export function ProjectCard({ image, title, description, tags, href, action, featured }: ProjectCardProps) {
  return (
    <article className="project-card">
      <a href={href} className="project-image-link" aria-label={title}>
        <img src={image} alt={`${title} preview`} loading="lazy" decoding="async" />
        {featured && <span className="featured-badge">{featured}</span>}
      </a>
      <div className="project-card-body">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="tag-row">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a className="button primary small" href={href}>
          <span>{action}</span>
          <i className="ri-arrow-right-line" />
        </a>
      </div>
    </article>
  );
}
