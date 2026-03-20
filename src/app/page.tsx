'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronRight, Check, X, Menu, Github, Twitter, Linkedin, Zap, FileText, Code, Brain, ArrowUpRight, ShieldCheck, Stars, Rocket, Sparkles, Wand2, Lightbulb, UserRound, LayoutDashboard } from 'lucide-react'

// ── Composants pour la page (à créer) ───────────────────
// Ces composants seront créés au fur et à mesure. Pour l'instant on les laisse dans page.tsx pour la démo

// Composant temporaire pour un badge
function BentoCard({ className, children, href, style }: { className?: string; children: React.ReactNode; href?: string; style?: React.CSSProperties }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: { scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' },
        tap: { scale: 0.98 }
      }}
      className={`relative rounded-3xl p-6 overflow-hidden border ${className}`}
      style={{ background: 'var(--surface)', borderColor: 'var(--border)', ...style }}
    >
      {children}
    </motion.a>
  )
}

// Composant temporaire pour le CTA principal
function MainCTA({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} 
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-lg font-semibold text-white transition-all"
      style={{ background: 'linear-gradient(135deg, #a78bfc, #7c3aed)', boxShadow: '0 4px 20px rgba(124,58,237,0.4)' }}
    >
      {children}
    </motion.button>
  )
}

// ── Layout principal avec les sections ──────────────────
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const links = [
    { label: 'Produits', href: '#products' },
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blog', href: '#blog' },
  ]

  const stats = [
    { value: '50+', label: 'Produits', icon: <Sparkles size={16} /> },
    { value: '2,000+', label: 'Clients', icon: <UserRound size={16} /> },
    { value: '4.9/5', label: 'Note moyenne', icon: <Stars size={16} /> },
  ]

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-3xl border [border-color:var(--border)] py-2.5 px-6 shadow-lg shadow-black/20">
          <a href="#" className="font-bold text-lg tg flex items-center gap-2">
            <Zap size={20} /> Lumio
          </a>
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <a key={link.label} href={link.href} className="px-4 py-2 rounded-full text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/[0.05] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden md:block text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
              Se connecter
            </a>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[var(--purple-dark)] shadow-md shadow-[var(--purple-dark)/30%] hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Commencer
            </motion.button>
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-[var(--text)]">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[var(--bg)] z-[100] flex flex-col items-center justify-center p-8"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-[var(--text)]">
              <X size={28} />
            </button>
            <nav className="flex flex-col gap-6 text-center text-2xl font-bold">
              {links.map(link => (
                <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="tg text-4xl">
                  {link.label}
                </a>
              ))}
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-[var(--text-muted)] mt-8">
                Se connecter
              </a>
              <MainCTA>
                Commencer
              </MainCTA>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          style={{ opacity: heroOpacity }}
          className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 overflow-hidden pt-12"
        >
          <motion.div style={{ scale: heroScale, y: heroY }} className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border [border-color:var(--border)] mb-6"
            >
              <Zap size={16} className="text-[var(--purple)]" />
              <span className="text-sm font-medium text-white/70">Nouvelles ressources, chaque semaine.</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tighter max-w-4xl mx-auto"
            >
              Build <span className="tg">plus vite</span> avec <br className="hidden md:block" />
              <span className="tg">Lumio.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-[var(--text-muted)] mt-5 max-w-2xl mx-auto leading-relaxed"
            >
              Templates Notion, UI kits, boilerplates et prompts IA.
              Tout ce dont vous avez besoin pour builder plus vite, avec un niveau de qualité inégalé.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center gap-4 mt-10"
            >
              <MainCTA>
                Explorer les produits <ArrowRight size={18} className="mt-0.5" />
              </MainCTA>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-lg font-semibold text-[var(--purple)] border [border-color:var(--purple)] transition-all hover:bg-[var(--purple)]/10 active:scale-98"
              >
                Voir la démo <ChevronRight size={18} className="mt-0.5" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
              className="flex justify-center gap-8 mt-12 text-sm text-[var(--text-muted)]"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  {stat.icon} <span className="font-medium">{stat.value} {stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Background pattern & glow */}
          <div className="absolute inset-0 top-1/2 bg-grid-pattern opacity-10" />
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)] flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--purple)] blur-[250px] opacity-10 pulse-anim" />
          </div>
        </motion.section>

        {/* Products Section */}
        <section id="products" className="py-24 px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-snug"
          >
            Tout pour décoller <span className="tg">plus vite</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-[var(--text-muted)] mt-5 max-w-xl mx-auto leading-relaxed"
          >
            Des frameworks front-end aux templates Notion, Lumio vous donne les outils pour réussir.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-20">
            <BentoCard className="md:col-span-2 lg:col-span-2 border-[var(--purple-dark)]/50 bg-[var(--purple-dark)]/[0.08] relative"
              href="#">
              <div className="absolute inset-0 bg-[var(--purple)] opacity-10 blur-3xl rounded-full" />
              <div className="relative text-left">
                <Zap size={32} className="text-white mb-4" />
                <h3 className="text-2xl font-bold text-white">Templates Notion</h3>
                <p className="text-[var(--text-muted)] mt-2">Organisez vos projets, gérez vos tâches, et boostez votre productivité avec nos templates Notion sur mesure.</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {['Productivity', 'Project Management', 'CRM', 'Marketing', 'Finance'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.08] text-white/70 border [border-color:var(--border)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight size={20} className="absolute bottom-6 right-6 text-white/60 group-hover:text-white transition-colors" />
              </div>
            </BentoCard>
            <BentoCard href="#">
              <LayoutDashboard size={32} className="text-[var(--blue)] mb-4" />
              <h3 className="text-2xl font-bold text-white">UI Kits</h3>
              <p className="text-[var(--text-muted)] mt-2">Créez des interfaces magnifiques et responsives en un temps record.</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Figma', 'Sketch', 'React', 'Tailwind CSS'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.08] text-white/70 border [border-color:var(--border)]">
                    {tag}
                  </span>
                ))}
              </div>
            </BentoCard>
            <BentoCard href="#">
              <Code size={32} className="text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold text-white">Boilerplates</h3>
              <p className="text-[var(--text-muted)] mt-2">Lancez vos projets avec des bases solides et optimisées.</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Next.js', 'React', 'Vite', 'TypeScript'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.08] text-white/70 border [border-color:var(--border)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </BentoCard>
              <BentoCard href="#">
                <Brain size={32} className="text-pink-400 mb-4" />
                <h3 className="text-2xl font-bold text-white">Prompts IA</h3>
                <p className="text-[var(--text-muted)] mt-2">Débloquez la puissance de l'IA avec nos prompts et guides experts.</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {['ChatGPT', 'Midjourney', 'LLMs', 'Productivity'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.08] text-white/70 border [border-color:var(--border)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </BentoCard>
              
              {/* Testimonials section */}
              <BentoCard className="md:col-span-2 lg:col-span-2" href="#">
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <img src="https://avatar.vercel.sh/emma" alt="Emma Dupont" className="w-12 h-12 rounded-full border border-white/20" />
                    <div>
                      <p className="text-white font-medium">Emma Dupont</p>
                      <p className="text-sm text-[var(--text-muted)]">Tech Lead @ InnovLabs</p>
                    </div>
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed">
                    « Les boilerplates Lumio nous ont fait gagner des semaines sur le lancement de notre MVP. La qualité du code est impressionnante ! »
                  </p>
                  <div className="flex gap-0.5 mt-4 text-amber-400">
                    {[...Array(5)].map((_, i) => <Stars size={16} key={i} fill="currentColor" />)}
                  </div>
                </div>
              </BentoCard>
              <BentoCard className="md:col-span-2 lg:col-span-2" href="#">
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <img src="https://avatar.vercel.sh/lucas" alt="Lucas Martin" className="w-12 h-12 rounded-full border border-white/20" />
                    <div>
                      <p className="text-white font-medium">Lucas Martin</p>
                      <p className="text-sm text-[var(--text-muted)]">Freelance Designer</p>
                    </div>
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed">
                    « Les UI kits sont un gain de temps incroyable. Le design est soigné et l'intégration avec Figma est parfaite. »
                  </p>
                  <div className="flex gap-0.5 mt-4 text-amber-400">
                    {[...Array(5)].map((_, i) => <Stars size={16} key={i} fill="currentColor" />)}
                  </div>
                </div>
              </BentoCard>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-24 px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-snug"
            >
              Des outils pensés pour votre <span className="tg-gold">succès</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-lg text-[var(--text-muted)] mt-5 max-w-2xl mx-auto leading-relaxed"
            >
              Chaque ressource Lumio est conçue avec une obsession pour la qualité et la performance.
            </motion.p>

            <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-20">
              {[1, 2, 3].map((_, i) => (
                <BentoCard key={i} href="#">
                  <Rocket size={32} className="text-[var(--purple)]" />
                  <h3 className="text-xl font-bold text-white mt-4">Performances optimisées</h3>
                  <p className="text-[var(--text-muted)] mt-2">Tous nos produits sont conçus pour une vitesse et une efficacité maximales.</p>
                </BentoCard>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-24 px-4 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--purple)] blur-[200px] opacity-10" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-snug"
            >
              Un <span className="tg">prix juste</span> pour des <br className="hidden md:block" />ressources d&apos;exception.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-lg text-[var(--text-muted)] mt-5 max-w-2xl mx-auto leading-relaxed"
            >
              Choisissez la formule qui correspond le mieux à vos besoins.
            </motion.p>

            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6 max-w-6xl mx-auto mt-20 relative z-10">
              {/* Free */} 
              <BentoCard className="w-full lg:w-1/3 p-8 border-[var(--border)]">
                <h3 className="text-2xl font-bold text-white">Gratuit</h3>
                <p className="text-4xl font-bold text-white mt-4">0€<span className="text-lg text-[var(--text-muted)]">/mois</span></p>
                <p className="text-[var(--text-muted)] mt-2 mb-8">Pour commencer vos premiers projets.</p>
                <MainCTA>
                  Commencer gratuitement
                </MainCTA>
                <ul className="text-left mt-8 space-y-4 text-[var(--text-muted)]">
                  <li className="flex items-center gap-2"><Check size={18} className="text-green-500" /> Accès produits de base (Free)</li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-green-500" /> Mises à jour régulières</li>
                  <li className="flex items-center gap-2"><X size={18} className="text-red-500" /> Support prioritaire</li>
                </ul>
              </BentoCard>

              {/* Pro */}
              <BentoCard className="w-full lg:w-1/3 p-8 border-[var(--purple)] ring-2 ring-[var(--purple-dark)] relative overflow-visible"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(124,58,237,0.02))', boxShadow: '0 0 30px rgba(124,58,237,0.2)' }}>
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white bg-[var(--purple-dark)] shadow-md shadow-[var(--purple-dark)]/40">RECOMMANDÉ</span>
                <h3 className="text-2xl font-bold text-white">Pro</h3>
                <p className="text-4xl font-bold text-white mt-4">29€<span className="text-lg text-[var(--text-muted)]">/mois</span></p>
                <p className="text-[var(--text-muted)] mt-2 mb-8">Pour les builders ambitieux.</p>
                <MainCTA>
                  Passer Pro <ArrowRight size={18} className="mt-0.5" />
                </MainCTA>
                <ul className="text-left mt-8 space-y-4 text-[var(--text-muted)]">
                  <li className="flex items-center gap-2"><Check size={18} className="text-green-500" /> Accès à tous les produits Pro</li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-green-500" /> Mises à jour régulières</li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-green-500" /> Support prioritaire</li>
                </ul>
              </BentoCard>

              {/* VIP */}
              <BentoCard className="w-full lg:w-1/3 p-8 border-[var(--border)]">
                <h3 className="text-2xl font-bold text-white">VIP</h3>
                <p className="text-4xl font-bold text-white mt-4">99€<span className="text-lg text-[var(--text-muted)]">/an</span></p>
                <p className="text-[var(--text-muted)] mt-2 mb-8">Le plan ultime pour maximiser vos gains.</p>
                <MainCTA>
                  Devenir VIP <ArrowRight size={18} className="mt-0.5" />
                </MainCTA>
                <ul className="text-left mt-8 space-y-4 text-[var(--text-muted)]">
                  <li className="flex items-center gap-2"><Check size={18} className="text-green-500" /> Accès à tous les produits VIP</li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-green-500" /> Mises à jour et accès anticipé</li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-green-500" /> Support ultra-prioritaire 24/7</li>
                </ul>
              </BentoCard>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 px-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 top-1/2 bg-grid-pattern opacity-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--blue)] blur-[180px] opacity-10" />

            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-snug"
            >
              Prêt à <span className="tg">briller</span> ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-lg text-[var(--text-muted)] mt-5 max-w-2xl mx-auto leading-relaxed"
            >
              Accédez à toutes les ressources dont vous avez besoin pour vos projets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="flex justify-center flex-wrap gap-4 mt-12"
            >
              <MainCTA>
                Commencer gratuitement <Sparkles size={18} className="mt-0.5" />
              </MainCTA>
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-lg font-semibold text-[var(--text-muted)] border [border-color:var(--border)] transition-all hover:bg-white/[0.08] active:scale-98"
              >
                Explorer tous les produits <ArrowUpRight size={18} className="mt-0.5" />
              </a>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="border-t [border-color:var(--border)] py-12 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-sm text-[var(--text-muted)]">© 2026 Lumio. Tous droits réservés.</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--text-faint)]">
                <a href="#" className="hover:text-[var(--text-muted)] transition-colors">Conditions Générales</a>
                <a href="#" className="hover:text-[var(--text-muted)] transition-colors">Politique de Confid.</a>
                <a href="#" className="hover:text-[var(--text-muted)] transition-colors">Centre d&apos;aide</a>
                <div className="flex gap-4">
                  <a href="https://github.com/tahidler" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"><Github size={20} /></a>
                  <a href="https://twitter.com/tahidler" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"><Twitter size={20} /></a>
                  <a href="https://linkedin.com/in/tahidler" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"><Linkedin size={20} /></a>
                </div>
              </div>
            </div>
          </footer>

        </main>
      </div>
    )
  }

