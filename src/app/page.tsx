"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles, ArrowRight, Check, Star, Zap, Layout, Code2, FileText, Palette, Menu, X, ChevronRight } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";
import MagneticButton from "@/components/MagneticButton";
import SplitText from "@/components/SplitText";
import Link from "next/link";

// ── BACKGROUND SCENE ────────────────────────────────────────────────────────
function BackgroundScene() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(88,28,135,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(30,64,175,0.3) 0%, transparent 50%), #000"
      }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
      }} />

      {/* Orbs */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-200px] left-[-100px] w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 80, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 70%)" }}
      />

      {/* Stars */}
      {Array.from({ length: 80 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 0.5,
            height: Math.random() * 2 + 0.5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [Math.random() * 0.3, Math.random() * 0.8 + 0.2, Math.random() * 0.3] }}
          transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Produits", "Templates", "Pricing", "Blog"];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
    >
      <motion.div
        animate={{
          background: scrolled ? "rgba(0,0,0,0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(30px)" : "none",
          borderColor: scrolled ? "rgba(255,255,255,0.08)" : "transparent",
        }}
        className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 border transition-all duration-500"
      >
        {/* Logo */}
        <motion.div className="flex items-center gap-2 cursor-pointer" whileHover={{ scale: 1.05 }}>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 flex items-center justify-center"
          >
            <Sparkles size={14} className="text-white" />
          </motion.div>
          <span className="font-black text-xl tracking-tight tg">Lumio</span>
        </motion.div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link}
              href="#"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="text-sm text-white/50 hover:text-white transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-sm text-white/50 hover:text-white transition-colors px-4 py-2"
          >
            Se connecter
          </motion.button>
          <MagneticButton className="relative text-sm font-bold text-white px-5 py-2.5 rounded-xl animated-border bg-violet-600/20 hover:bg-violet-600/30 transition-colors">
            Commencer →
          </MagneticButton>
        </div>

        <button className="md:hidden text-white/50" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden max-w-6xl mx-auto mt-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4"
          >
            {links.map(link => (
              <a key={link} href="#" className="block py-3 text-white/50 hover:text-white transition-colors border-b border-white/5 last:border-none">
                {link}
              </a>
            ))}
            <button className="mt-4 w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 rounded-xl font-bold text-sm">
              Commencer →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <motion.div style={{ y, opacity, scale }} className="text-center max-w-5xl mx-auto z-10 relative pt-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="relative inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/25 rounded-full px-5 py-2.5 text-sm font-medium text-violet-300">
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-violet-400 rounded-full"
            />
            La boutique de ressources pour builders
            <ChevronRight size={14} className="opacity-60" />
          </div>
        </motion.div>

        {/* Headline */}
        <div className="mb-6 overflow-hidden">
          <h1 className="text-6xl md:text-8xl font-black leading-[1.0] tracking-tighter">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <span className="tg">Build</span>{" "}
                <span className="text-white">plus</span>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.55, duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <span className="text-white">vite</span>{" "}
                <span className="tg">avec</span>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.7, duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <span className="text-white/90 italic">Lumio.</span>
              </motion.div>
            </div>
          </h1>
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-lg md:text-xl text-white/40 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Templates Notion, UI kits, boilerplates et outils pensés pour ceux
          qui construisent des choses qui comptent.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/products">
            <MagneticButton className="group relative flex items-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-2xl text-base overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 group-hover:text-white transition-colors">Explorer les produits</span>
              <ArrowRight size={18} className="relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </MagneticButton>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-white/50 text-base hover:text-white transition-colors px-4 py-4"
          >
            <span>Voir la démo</span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ▶
              </motion.div>
            </div>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex flex-wrap justify-center gap-10 mt-20"
        >
          {[
            { n: "50+", l: "Produits" },
            { n: "2 000+", l: "Utilisateurs" },
            { n: "4.9 / 5", l: "Satisfaction" },
          ].map(({ n, l }) => (
            <div key={l} className="text-center">
              <div className="text-3xl font-black tg">{n}</div>
              <div className="text-xs text-white/30 mt-1 uppercase tracking-widest">{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/20 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-violet-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ── MARQUEE ───────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Notion Templates", "UI Kits", "Boilerplates", "Prompts GPT", "Guides PDF", "Bundles", "Design Systems", "Code Starters"];
  const doubled = [...items, ...items];

  return (
    <div className="relative z-10 py-10 overflow-hidden border-y border-white/5">
      <div className="flex marquee-inner whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-8 text-sm font-medium text-white/25 uppercase tracking-widest">
            <Sparkles size={12} className="text-violet-500/60 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── FEATURES BENTO ───────────────────────────────────────────────────────────
function FeatureCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      className={`card rounded-3xl overflow-hidden relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

function BentoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-4">Ce qu&apos;on propose</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Tout pour{" "}
            <span className="tg">décoller</span>
            <br />plus vite
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Big card */}
          <FeatureCard className="md:col-span-2 p-8 min-h-[300px]" delay={0}>
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center mb-6">
                <Layout size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3">Templates Notion</h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                2ème cerveau, OS étudiant, startup kit, fitness tracker...
                Des systèmes complets conçus pour durer.
              </p>
              <div className="flex gap-2 mt-6 flex-wrap">
                {["Productivité", "Startup", "Étudiant", "Fitness"].map(tag => (
                  <span key={tag} className="text-xs bg-violet-500/15 text-violet-300 border border-violet-500/20 rounded-full px-3 py-1">{tag}</span>
                ))}
              </div>
            </div>
            {/* Floating mockup */}
            <div className="absolute right-6 bottom-6 w-40 h-28 bg-white/5 rounded-xl border border-white/10 float opacity-60 hidden md:block">
              <div className="p-3 space-y-2">
                {[80, 60, 90, 45].map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-violet-500/60" />
                    <div className="h-2 bg-white/20 rounded-full" style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </FeatureCard>

          {/* Small card */}
          <FeatureCard className="p-8 min-h-[300px]" delay={0.1}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-6">
                <Code2 size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-black mb-3">Boilerplates</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Next.js, FastAPI, SaaS starters.
                Lance en heures.
              </p>
              <div className="mt-6 font-mono text-xs text-green-400/70 bg-black/40 rounded-lg p-3">
                <div>$ npx create-lumio-app</div>
                <div className="text-white/30">✓ Setup complet en 30s</div>
              </div>
            </div>
          </FeatureCard>

          {/* Small card */}
          <FeatureCard className="p-8" delay={0.2}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center mb-6">
                <Palette size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-black mb-3">UI Kits</h3>
              <p className="text-white/40 text-sm">Figma + React. Pixel-perfect.</p>
              <div className="flex gap-2 mt-4">
                {["#818cf8", "#c084fc", "#f472b6", "#38bdf8"].map(c => (
                  <div key={c} className="w-8 h-8 rounded-full border-2 border-black/50 float-delay" style={{ background: c }} />
                ))}
              </div>
            </div>
          </FeatureCard>

          {/* Medium card */}
          <FeatureCard className="md:col-span-2 p-8" delay={0.3}>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-6">
                  <Zap size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-black mb-3">Prompts & Guides</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  50+ prompts GPT packagés + mini-guides PDF.
                  Des raccourcis qui font gagner des heures.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full md:w-48 shrink-0">
                {["Marketing", "Dev", "Design", "Finance", "SEO", "Copywriting"].map(tag => (
                  <div key={tag} className="text-xs bg-amber-500/10 text-amber-300/70 border border-amber-500/15 rounded-lg px-3 py-2 text-center">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
const testimonials = [
  { name: "Marie L.", role: "Freelance Designer", text: "Le UI kit m'a fait économiser 2 semaines. Qualité incroyable.", stars: 5, avatar: "ML" },
  { name: "Karim B.", role: "Indie hacker", text: "J'ai lancé mon SaaS en 3 jours avec le boilerplate. Imposs sans Lumio.", stars: 5, avatar: "KB" },
  { name: "Sophie T.", role: "Étudiante en médecine", text: "Le template Notion 2ème cerveau a révolutionné ma façon d'étudier.", stars: 5, avatar: "ST" },
  { name: "Alex M.", role: "Growth marketer", text: "Les prompts GPT sont exactement ce qu'il me fallait. ROI immédiat.", stars: 5, avatar: "AM" },
];

function Testimonials() {
  return (
    <section className="relative z-10 py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-4">Ce qu&apos;ils disent</p>
          <h2 className="text-4xl md:text-5xl font-black">
            Ils ont <span className="tg">décollé</span> avec Lumio
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? -1 : 1 }}
              className="card rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-white/30">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PRICING ───────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Free", price: "0€", desc: "Pour explorer",
    features: ["3 templates gratuits", "Accès communauté", "Newsletter"],
    cta: "Commencer →", hot: false,
    gradient: "from-white/5 to-white/[0.02]",
  },
  {
    name: "Pro", price: "29€", period: "/mois", desc: "Pour les builders",
    features: ["Tous les templates", "UI Kits complets", "Boilerplates", "Packs prompts", "Support prioritaire"],
    cta: "Passer Pro →", hot: true,
    gradient: "from-violet-600/20 to-blue-600/10",
  },
  {
    name: "VIP", price: "99€", period: "/an", desc: "Accès à vie",
    features: ["Tout Pro inclus", "Accès anticipé", "Call 1-on-1/mois", "Contenu exclusif", "Badge VIP"],
    cta: "Rejoindre VIP →", hot: false,
    gradient: "from-amber-600/10 to-orange-600/5",
  },
];

function Pricing() {
  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-4xl md:text-6xl font-black">
            Simple &amp; <span className="tg">honnête</span>
          </h2>
          <p className="text-white/30 mt-4">Sans surprise. Tu paies ce que tu veux.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-7 bg-gradient-to-b ${plan.gradient} border ${plan.hot ? "border-violet-500/30" : "border-white/5"}`}
            >
              {plan.hot && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <motion.div
                    animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0.5)", "0 0 40px rgba(139,92,246,0.8)", "0 0 20px rgba(139,92,246,0.5)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-black px-5 py-1.5 rounded-full"
                  >
                    ⭐ RECOMMANDÉ
                  </motion.div>
                </div>
              )}

              <p className="text-sm text-white/40 font-medium mb-2">{plan.name}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-black">{plan.price}</span>
                {plan.period && <span className="text-white/30 text-sm">{plan.period}</span>}
              </div>
              <p className="text-xs text-white/25 mb-6">{plan.desc}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-white" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <MagneticButton
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                  plan.hot
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                    : "border border-white/10 text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {plan.cta}
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA FINAL ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="relative z-10 py-32 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center relative"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-blue-600/20 to-violet-600/20 rounded-3xl blur-3xl" />

        <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-16 overflow-hidden">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-violet-600/20 to-transparent rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-600/20 to-transparent rounded-br-3xl" />

          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-6xl mb-6 inline-block"
          >
            ✨
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Prêt à{" "}
            <span className="tg">briller</span> ?
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-lg mx-auto">
            Rejoins des centaines de builders qui utilisent Lumio
            pour construire plus vite et mieux.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton className="bg-white text-black font-black px-10 py-4 rounded-2xl text-base hover:bg-violet-50 transition-colors">
              Commencer gratuitement →
            </MagneticButton>
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="text-white/50 hover:text-white transition-colors px-6 py-4 text-sm"
            >
              Voir tous les produits
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="font-black tg">Lumio</span>
        </div>
        <p className="text-xs text-white/20">© 2026 Lumio. Tous droits réservés.</p>
        <div className="flex gap-6">
          {["CGV", "Confidentialité", "Contact"].map(l => (
            <a key={l} href="#" className="text-xs text-white/25 hover:text-white/60 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <CursorGlow />
      <BackgroundScene />
      <Navbar />
      <Hero />
      <Marquee />
      <BentoSection />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  );
}
