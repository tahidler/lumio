'use client'

import { useState, useRef } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, X, Menu, Github, Twitter, Zap, Code, Brain, ArrowUpRight, Stars, Sparkles, UserRound, LayoutDashboard } from 'lucide-react'

/* ── Helpers ─────────────────────────────────────────────── */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-white/[0.06] text-white/55 border border-white/[0.07]">
      {children}
    </span>
  )
}

function Pill({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white shadow-lg transition-all"
      style={{ background: 'linear-gradient(135deg, #9333ea, #6d28d9)', boxShadow: '0 4px 24px rgba(109,40,217,0.45)' }}
    >
      {children}
    </motion.button>
  )
}

function GhostPill({ children, href }: { children: React.ReactNode; href?: string }) {
  return (
    <motion.a
      href={href ?? '#'}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.06)' }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white/55 border border-white/10 transition-all"
    >
      {children}
    </motion.a>
  )
}

/* ── Navbar ──────────────────────────────────────────────── */
function Navbar({ onStart }: { onStart: () => void }) {
  const [open, setOpen] = useState(false)
  const nav = [
    { l: 'Produits', h: '#products' },
    { l: 'Pricing', h: '#pricing' },
    { l: 'Témoignages', h: '#social' },
  ]
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl border border-white/[0.07] px-5 py-2.5"
        style={{ background: 'rgba(6,6,10,0.80)', backdropFilter: 'blur(24px)' }}>
        <a href="#" className="flex items-center gap-2 font-bold text-base">
          <Zap size={18} className="text-violet-400" />
          <span className="text-white">Lumio</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(n => (
            <a key={n.l} href={n.h}
              className="px-4 py-2 rounded-xl text-sm text-white/45 hover:text-white hover:bg-white/[0.04] transition-all">
              {n.l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:block text-sm text-white/40 hover:text-white transition-colors">Se connecter</a>
          <Pill onClick={onStart}>Commencer <ArrowRight size={14} /></Pill>
          <button onClick={() => setOpen(true)} className="md:hidden text-white/60"><Menu size={22} /></button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
            style={{ background: '#06060a' }}
            onClick={() => setOpen(false)}
          >
            {nav.map(n => (
              <a key={n.l} href={n.h} className="text-3xl font-bold text-white/60 hover:text-white transition-colors">{n.l}</a>
            ))}
            <Pill onClick={onStart}>Commencer <ArrowRight size={14} /></Pill>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ── Hero ────────────────────────────────────────────────── */
function Hero({ onStart }: { onStart: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #9333ea, #6d28d9)' }} />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none bg-blue-500" />

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)'
        }} />

      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs font-semibold text-violet-300 tracking-wide">Nouvelles ressources chaque semaine</span>
        </motion.div>

        {/* H1 — taille maîtrisée */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="text-[44px] md:text-[64px] lg:text-[76px] font-extrabold leading-[1.06] tracking-tight text-white mb-5">
          Ressources premium <br />
          <span style={{ background: 'linear-gradient(135deg, #c084fc, #818cf8, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            pour builders
          </span>
        </motion.h1>

        {/* Sous-titre — contraste correct */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="text-base md:text-lg text-white/55 max-w-xl leading-relaxed mb-10">
          Templates Notion, UI kits, boilerplates, prompts IA.
          Tout pour lancer et scaler vos projets plus vite — avec un niveau de qualité inégalé.
        </motion.p>

        {/* CTAs — 1 primaire + 1 secondaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-14">
          <Pill onClick={onStart}>
            Commencer gratuitement <Sparkles size={14} />
          </Pill>
          <GhostPill href="#products">
            Voir les produits <ArrowUpRight size={14} />
          </GhostPill>
        </motion.div>

        {/* Social proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="flex items-center gap-8 text-center">
          {[
            { v: '50+', l: 'Ressources' },
            { v: '2k+', l: 'Builders' },
            { v: '4.9★', l: 'Note moyenne' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-xl font-bold text-white">{s.v}</div>
              <div className="text-xs text-white/35 mt-0.5">{s.l}</div>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  )
}

/* ── Products ────────────────────────────────────────────── */
const PRODUCTS = [
  {
    icon: <Zap size={28} className="text-violet-400" />,
    title: 'Templates Notion',
    desc: 'Productivity, CRM, gestion de projets. Organisez tout, perdez rien.',
    tags: ['Productivity', 'CRM', 'Finance', 'Marketing'],
    glow: 'rgba(147,51,234,0.12)',
    featured: true,
  },
  {
    icon: <LayoutDashboard size={28} className="text-blue-400" />,
    title: 'UI Kits',
    desc: "Composants Figma & React prêts à l'emploi. Design-to-code sans friction.",
    tags: ['Figma', 'React', 'Tailwind'],
    glow: 'rgba(96,165,250,0.10)',
    featured: false,
  },
  {
    icon: <Code size={28} className="text-emerald-400" />,
    title: 'Boilerplates',
    desc: 'Next.js, SaaS starter, auth, paiement. Lancez en heures, pas en semaines.',
    tags: ['Next.js', 'Supabase', 'TypeScript'],
    glow: 'rgba(52,211,153,0.10)',
    featured: false,
  },
  {
    icon: <Brain size={28} className="text-pink-400" />,
    title: 'Prompts IA',
    desc: "ChatGPT, Midjourney, Claude. Maîtrisez l'IA avec des prompts experts.",
    tags: ['ChatGPT', 'Claude', 'Midjourney'],
    glow: 'rgba(244,114,182,0.10)',
    featured: false,
  },
]

function Products() {
  return (
    <section id="products" className="py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">Catalogue</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Tout pour décoller plus vite</h2>
          <p className="text-white/40 text-base mt-4 max-w-md mx-auto">Des ressources soignées, documentées et maintenues à jour en permanence.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCTS.map((p, i) => (
            <motion.a
              key={i} href="#"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }}
              whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.14)' }}
              className="group relative flex flex-col gap-4 p-7 rounded-2xl border border-white/[0.06] transition-all duration-300"
              style={{ background: `linear-gradient(135deg, ${p.glow}, transparent), rgba(255,255,255,0.02)` }}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/[0.07] bg-white/[0.04]">
                  {p.icon}
                </div>
                <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors mt-1" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">{p.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{p.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials ────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: 'Emma Dupont', role: 'Tech Lead @ InnovLabs', avatar: 'https://avatar.vercel.sh/emma?size=48', text: 'Les boilerplates nous ont fait gagner 3 semaines sur notre MVP. La qualité du code est impressionnante.', stars: 5 },
  { name: 'Lucas Martin', role: 'Freelance Designer', avatar: 'https://avatar.vercel.sh/lucas?size=48', text: 'Les UI kits Figma sont impeccables. Intégration directe avec mon workflow, zéro friction.', stars: 5 },
  { name: 'Amara Koné', role: 'Fondatrice @ BuildFast', avatar: 'https://avatar.vercel.sh/amara?size=48', text: 'Les templates Notion ont transformé ma façon de gérer mes projets. Indispensable.', stars: 5 },
]

function Testimonials() {
  return (
    <section id="social" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">Témoignages</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Ils ont décollé avec Lumio</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="flex flex-col gap-4 p-6 rounded-2xl border border-white/[0.06]"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex gap-0.5 text-amber-400">
                {[...Array(t.stars)].map((_, j) => <Stars key={j} size={14} fill="currentColor" />)}
              </div>
              <p className="text-sm text-white/65 leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.05]">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full border border-white/10" />
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/35">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Pricing ─────────────────────────────────────────────── */
const PLANS = [
  {
    name: 'Gratuit', price: '0€', period: '', cta: 'Commencer', featured: false,
    perks: ['Accès aux ressources Free', 'Mises à jour incluses', 'Support communauté'],
    bad: ['Support prioritaire', 'Accès premium'],
  },
  {
    name: 'Pro', price: '29€', period: '/mois', cta: 'Passer Pro', featured: true,
    perks: ['Tout le catalogue Pro', 'Mises à jour automatiques', 'Support email sous 24h', 'Accès anticipé aux nouveautés'],
    bad: [],
  },
  {
    name: 'VIP', price: '99€', period: '/an', cta: 'Rejoindre VIP', featured: false,
    perks: ['Tout le catalogue VIP', 'Support prioritaire 24/7', 'Accès bêta exclusif', 'Session onboarding 1h'],
    bad: [],
  },
]

function Pricing({ onStart }: { onStart: () => void }) {
  return (
    <section id="pricing" className="py-28 px-4 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.08] bg-violet-600 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Un prix honnête</h2>
          <p className="text-white/40 text-base mt-4">Pas de surprise, pas d&apos;abonnement caché.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className={`relative flex flex-col p-7 rounded-2xl border transition-all ${plan.featured
                ? 'border-violet-500/60 ring-1 ring-violet-500/30'
                : 'border-white/[0.06]'
              }`}
              style={{
                background: plan.featured
                  ? 'linear-gradient(135deg, rgba(147,51,234,0.12), rgba(109,40,217,0.04))'
                  : 'rgba(255,255,255,0.02)',
              }}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white bg-violet-600 shadow-lg shadow-violet-900/50">
                    RECOMMANDÉ
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm font-semibold text-white/55 mb-2">{plan.name}</p>
                <p className="text-4xl font-bold text-white">
                  {plan.price}<span className="text-base font-normal text-white/30">{plan.period}</span>
                </p>
              </div>

              <button
                onClick={onStart}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold mb-7 transition-all hover:opacity-90 active:scale-[0.98] ${plan.featured
                  ? 'text-white'
                  : 'text-white/70 border border-white/10 hover:bg-white/[0.05]'
                }`}
                style={plan.featured ? { background: 'linear-gradient(135deg, #9333ea, #6d28d9)' } : {}}
              >
                {plan.cta}
              </button>

              <ul className="space-y-3 flex-1">
                {plan.perks.map(p => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-white/60">
                    <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />{p}
                  </li>
                ))}
                {plan.bad.map(p => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-white/25 line-through">
                    <X size={14} className="text-white/20 mt-0.5 shrink-0" />{p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA final ───────────────────────────────────────────── */
function CtaSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="py-28 px-4">
      <div className="max-w-3xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full blur-[120px] opacity-[0.10] bg-blue-500 pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Prêt à builder <span style={{ background: 'linear-gradient(135deg, #c084fc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>plus vite</span> ?
          </h2>
          <p className="text-white/40 text-base mb-10 max-w-lg mx-auto leading-relaxed">
            Rejoignez 2 000+ builders qui utilisent Lumio pour lancer leurs projets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Pill onClick={onStart}>Commencer gratuitement <Sparkles size={14} /></Pill>
            <GhostPill href="#pricing">Voir les plans <ArrowUpRight size={14} /></GhostPill>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-violet-400" />
          <span className="font-bold text-sm text-white">Lumio</span>
          <span className="text-white/20 text-xs ml-2">© 2026</span>
        </div>
        <div className="flex gap-6 text-xs text-white/25">
          {['CGV', 'Confidentialité', 'Aide'].map(l => (
            <a key={l} href="#" className="hover:text-white/55 transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex gap-3">
          {[Github, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="w-8 h-8 rounded-xl flex items-center justify-center text-white/30 hover:text-white border border-white/[0.06] hover:border-white/20 transition-all">
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ── Page ────────────────────────────────────────────────── */
export default function Home() {
  const [_, setShowModal] = useState(false)
  const openModal = () => setShowModal(true)

  return (
    <div className="min-h-screen" style={{ background: '#06060a' }}>
      <Navbar onStart={openModal} />
      <main className="pt-20">
        <Hero onStart={openModal} />
        <Products />
        <Testimonials />
        <Pricing onStart={openModal} />
        <CtaSection onStart={openModal} />
      </main>
      <Footer />
    </div>
  )
}
