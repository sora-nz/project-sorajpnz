type ProjectGlanceItem = {
  icon: string;
  label: string;
  value: string;
};

type ProjectGlanceProps = {
  title: string;
  items: readonly ProjectGlanceItem[];
};

export function ProjectGlance({ title, items }: ProjectGlanceProps) {
  return (
    <section className="project-glance-section" aria-labelledby="project-glance-title">
      <div className="section-inner glance-inner">
        <div className="project-glance-heading">
          <h2 id="project-glance-title">{title}</h2>
        </div>
        <div className="glance-grid">
          {items.map((item) => (
            <article className="glance-card" key={item.label}>
              <span className="glance-card-icon" aria-hidden="true">
                <i className={item.icon} />
              </span>
              <span className="glance-label">{item.label}</span>
              <p>{item.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
