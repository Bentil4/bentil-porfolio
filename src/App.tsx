import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { GitHubStats } from './components/GitHubStats'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
      <Navbar />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <GitHubStats />
        <Contact />
      </main>
      <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
