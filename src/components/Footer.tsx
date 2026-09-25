import { config } from '../config'
import { GitHubIcon, LinkedInIcon } from './icons'
import { SocialIcon } from './ui/SocialIcon'

export function Footer() {
  const { name, socials } = config
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {name}. Built with React & Tailwind.
        </p>
        <div className="flex items-center gap-2">
          <SocialIcon href={socials.github} label="GitHub profile">
            <GitHubIcon size={18} />
          </SocialIcon>
          {socials.linkedin && (
            <SocialIcon href={socials.linkedin} label="LinkedIn profile">
              <LinkedInIcon size={18} />
            </SocialIcon>
          )}
        </div>
      </div>
    </footer>
  )
}
