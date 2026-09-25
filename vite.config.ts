import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { config } from './src/config/index.ts'

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Injects <title> and SEO/social meta tags from the portfolio config. */
function portfolioMeta(): Plugin {
  return {
    name: 'portfolio-meta',
    transformIndexHtml() {
      const { name, title, seo } = config
      const fullTitle = `${name} — ${title}`
      const meta: Record<string, string>[] = [
        { name: 'description', content: seo.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: seo.description },
        { property: 'og:url', content: seo.siteUrl },
        { name: 'twitter:card', content: seo.ogImage ? 'summary_large_image' : 'summary' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: seo.description },
      ]
      if (seo.ogImage) {
        meta.push({ property: 'og:image', content: seo.ogImage }, { name: 'twitter:image', content: seo.ogImage })
      }
      return [
        { tag: 'title', children: escapeHtml(fullTitle), injectTo: 'head' },
        ...meta.map((attrs) => ({ tag: 'meta', attrs, injectTo: 'head' as const })),
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths so the build works from any GitHub Pages sub-folder.
  base: './',
  plugins: [react(), tailwindcss(), portfolioMeta()],
})
