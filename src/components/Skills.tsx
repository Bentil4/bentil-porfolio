import { Code2, Database, Wrench } from 'lucide-react'
import { config } from '../config'
import { Pill } from './ui/Pill'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SectionHeading } from './ui/SectionHeading'

const GROUPS = [
  { key: 'frontend', heading: 'Frontend', Icon: Code2 },
  { key: 'backend', heading: 'Backend & Databases', Icon: Database },
  { key: 'devops', heading: 'DevOps & Tools', Icon: Wrench },
] as const

export function Skills() {
  return (
    <Section id="skills" className="border-t border-line">
      <Reveal>
        <SectionHeading id="skills-heading" eyebrow="toolkit" title="Skills & tools." />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {GROUPS.map(({ key, heading, Icon }, i) => (
          <Reveal key={key} delay={i * 0.08} className="h-full">
            <div className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-lime/30">
              <h3 className="mb-5 flex items-center gap-3 font-display text-lg font-bold text-ink">
                <span className="grid size-9 place-items-center rounded-lg bg-lime/10 text-lime">
                  <Icon size={18} aria-hidden="true" />
                </span>
                {heading}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {config.skills[key].map((skill) => (
                  <li key={skill}>
                    <Pill>{skill}</Pill>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
