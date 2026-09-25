interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  description?: string
}

/** Section title block; `id` is applied to the h2 for aria-labelledby. */
export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl md:mb-14">
      <p className="mb-3 font-mono text-sm text-lime">
        <span aria-hidden="true">// </span>
        {eyebrow}
      </p>
      <h2 id={id} className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </div>
  )
}
