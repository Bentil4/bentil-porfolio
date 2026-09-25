/* ==========================================================================
 *  ★  PORTFOLIO CONFIG — THE ONLY FILE YOU NEED TO EDIT  ★
 *
 *  Replace every value marked `// EDIT:` with your own details.
 *  Components read everything from this object, so nothing personal is
 *  hard-coded anywhere else. Optional fields can be deleted to hide the
 *  related UI (e.g. remove `liveUrl` to hide a project's "Live Demo" button).
 * ========================================================================== */

import type { PortfolioConfig } from './types.ts'

export const portfolio = {
  name: 'Alex Morgan', // EDIT: your full name
  brand: 'alex.dev', // EDIT: navbar wordmark
  title: 'Full-Stack Software Engineer', // EDIT: your title / specialization
  summary: [
    // EDIT: exactly two sentences
    'I turn ambiguous technical problems into fast, reliable products — from typed APIs to pixel-tight interfaces.',
    'I ship efficient applications end-to-end, with a bias for measurable performance and clean, maintainable code.',
  ],

  about: {
    // EDIT: or delete this block to hide the About section content
    bio: 'I’m a software engineer who enjoys owning features from database schema to deployed UI. I care about developer experience, accessible interfaces, and systems that stay simple as they scale. Lately I’ve been focused on TypeScript across the stack, edge-friendly architectures, and CI pipelines that make shipping boring.',
    facts: ['Based in Your City', '4+ years building for the web', 'Open to remote roles', 'TypeScript everywhere'],
  },

  email: 'alex.morgan@example.com', // EDIT
  resumeUrl: 'https://drive.google.com/your-resume-link', // EDIT: external resume link

  socials: {
    github: 'https://github.com/your-username', // EDIT
    linkedin: 'https://www.linkedin.com/in/your-profile', // EDIT (or delete)
  },

  github: {
    username: 'your-username', // EDIT: used for live stats
    enableLiveStats: false, // EDIT: set true once `username` is real
  },

  contact: {
    formEndpoint: '', // EDIT: e.g. 'https://formspree.io/f/xxxxxxx' — empty = no form
  },

  seo: {
    siteUrl: 'https://bentil4.github.io/bentil-porfolio/', // EDIT
    description: 'Alex Morgan — Full-Stack Software Engineer building fast, reliable web applications.', // EDIT
    // ogImage: 'https://your-username.github.io/porfolio/og.png',
  },

  // EDIT: your projects. Each card follows the STAR framework.
  projects: [
    {
      id: 'shipfast-analytics',
      title: 'ShipFast Analytics',
      category: 'Full-Stack',
      star: {
        situation: 'A SaaS team relied on nightly CSV exports, so product decisions lagged real usage by a full day.',
        task: 'Build a real-time analytics dashboard that non-technical stakeholders could self-serve.',
        action: 'Designed an event pipeline with PostgreSQL + materialized views, a typed GraphQL API, and a Next.js dashboard with streaming charts.',
        result: 'Cut time-to-insight from 24h to under 5s and removed ~6 hours/week of manual reporting.',
      },
      tech: ['Next.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Tailwind CSS'],
      liveUrl: 'https://example.com/shipfast',
      repoUrl: 'https://github.com/your-username/shipfast-analytics',
    },
    {
      id: 'tiny-queue',
      title: 'tiny-queue',
      category: 'Open-Source',
      star: {
        situation: 'Small Node services needed background jobs, but existing queues pulled in Redis and heavy dependencies.',
        task: 'Create a zero-dependency, Postgres-backed job queue with retries and scheduling.',
        action: 'Implemented SKIP LOCKED polling, exponential backoff, and a typed job API with 95% test coverage and CI on every PR.',
        result: 'Adopted by 40+ repos; one team replaced Redis entirely and reduced infra cost by 18%.',
      },
      tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'Vitest', 'GitHub Actions'],
      repoUrl: 'https://github.com/your-username/tiny-queue',
    },
    {
      id: 'clinic-booking',
      title: 'Clinic Booking Platform',
      category: 'Frontend',
      star: {
        situation: 'A multi-location clinic lost bookings because its legacy site was slow and unusable on mobile.',
        task: 'Rebuild the booking flow as a fast, accessible, mobile-first web app.',
        action: 'Built a React SPA with optimistic UI, form validation, and WCAG AA components; code-split routes and lazy-loaded heavy widgets.',
        result: 'Lighthouse performance 42 → 98, and online bookings rose 31% in the first quarter.',
      },
      tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Playwright'],
      liveUrl: 'https://example.com/clinic',
      repoPrivate: true,
    },
  ],

  // EDIT: your skills, grouped for scannability.
  skills: {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3', 'Vite', 'Framer Motion', 'Accessibility (WCAG)'],
    backend: ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'PostgreSQL', 'Prisma', 'Redis', 'MongoDB'],
    devops: ['Git', 'GitHub Actions', 'Docker', 'Vercel', 'AWS', 'Linux', 'Vitest', 'Playwright'],
  },
} satisfies PortfolioConfig
