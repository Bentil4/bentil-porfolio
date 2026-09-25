import { config } from '../config'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SectionHeading } from './ui/SectionHeading'

export function Projects() {
  return (
    <Section id="projects" className="border-t border-line">
      <Reveal>
        <SectionHeading
          id="projects-heading"
          eyebrow="selected work"
          title="Projects that shipped."
          description="Each project is framed with STAR (Situation, Task, Action, Result) so you can see the problem, my role, and the measurable outcome at a glance."
        />
      </Reveal>
      <ul className="grid gap-6 md:grid-cols-2">
        {config.projects.map((project, i) => (
          <li key={project.id} className={config.projects.length % 2 === 1 && i === config.projects.length - 1 ? 'md:col-span-2' : ''}>
            <Reveal delay={(i % 2) * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
