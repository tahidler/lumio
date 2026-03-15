"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles, Zap, Layout, Code2, FileText, Palette, ArrowRight, Star, Check, Menu, X } from "lucide-react";

// ── Floating particles ──────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#60a5fa" : "#f472b6",
            opacity: Math.random() * 0.4 + 0.1,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ── Grid background ──────────────────────────────────────────────────────────
function GridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        background: scrolled ? "rgba(8,8,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.03 }}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-bold text-xl text-gradient">Lumio</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          {["Produits", "Templates", "Pricing", "Blog"].map((item) => (
            <motion.a
              key={item}
              href="#"
              className="hover:text-white transition-colors"
              whileHover={{ y: -1 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <motion.button
            className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2"
            whileHover={{ scale: 1.03 }}
          >
            Se connecter
          </motion.button>
          <motion.button
            className="text-sm bg-gradient-to-r from-violet-600 to-blue-600 text-white px-5 py-2 rounded-full font-medium"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,92,246,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            Commencer →
          </motion.button>
        </div>

        <button className="md:hidden text-white/60" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-white/10"
          >
            {["Produits", "Templates", "Pricing", "Blog"].map((item) => (
              <a key={item} href="#" className="block py-3 text-white/60 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-20 px-6">
      <motion.div style={{ y, opacity }} className="text-center max-w-4xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-8"
        >
          <Sparkles size={12} />
          Ressources digitales premium
          <span className="bg-violet-500 text-white text-xs px-2 py-0.5 rounded-full">NEW</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight"
        >
          Élève ton{" "}
          <span className="text-gradient">workflow</span>
          <br />
          avec Lumio
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Templates Notion premium, UI kits, boilerplates et outils pour les
          builders, créatifs et entrepreneurs qui veulent aller vite.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-base"
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(139,92,246,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            Explorer les produits
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            className="flex items-center justify-center gap-2 text-white/70 border border-white/10 px-8 py-4 rounded-2xl font-medium text-base hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Voir les templates →
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 mt-16 text-center"
        >
          {[
            { value: "50+", label: "Templates premium" },
            { value: "2k+", label: "Utilisateurs actifs" },
            { value: "4.9★", label: "Note moyenne" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-black text-gradient">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600 rounded-full blur-3xl opacity-15"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-10"
        />
      </div>
    </section>
  );
}

// ── Products ─────────────────────────────────────────────────────────────────
const products = [
  {
    icon: Layout,
    title: "Templates Notion",
    desc: "2ème cerveau, OS étudiant, startup kit, fitness tracker. Des systèmes complets prêts à l'emploi.",
    tag: "Best-seller",
    color: "from-violet-600 to-purple-600",
    price: "Dès 9€",
  },
  {
    icon: Palette,
    title: "UI Kits & Figma",
    desc: "Dashboards, landing pages, composants. Des designs prêts à coder, pixel-perfect.",
    tag: "Nouveau",
    color: "from-blue-600 to-cyan-600",
    price: "Dès 19€",
  },
  {
    icon: Code2,
    title: "Boilerplates",
    desc: "Next.js, FastAPI, SaaS starters. Lance ton projet en quelques heures, pas semaines.",
    tag: "Pro",
    color: "from-pink-600 to-rose-600",
    price: "Dès 49€",
  },
  {
    icon: FileText,
    title: "Packs de Prompts",
    desc: "Prompts GPT packagés par usage : dev, marketing, productivité, création de contenu.",
    tag: "Populaire",
    color: "from-amber-500 to-orange-500",
    price: "Dès 7€",
  },
  {
    icon: Zap,
    title: "Mini-guides PDF",
    desc: "Guides actionnables sur la productivité, finance perso, growth hacking et dev.",
    tag: "Quick win",
    color: "from-green-600 to-emerald-600",
    price: "Dès 5€",
  },
  {
    icon: Sparkles,
    title: "Bundles Premium",
    desc: "Accès complet à toute la bibliothèque Lumio. Mise à jour à vie incluse.",
    tag: "🔥 VIP",
    color: "from-violet-600 to-pink-600",
    price: "99€ / an",
  },
];

function Products() {
  return (
    <section className="relative py-32 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4">
            Notre catalogue
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Tout ce qu&apos;il te faut pour{" "}
            <span className="text-gradient">builder vite</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Des ressources créées par des builders, pour des builders.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="card-hover bg-white/[0.03] rounded-2xl p-6 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center`}>
                  <product.icon size={22} className="text-white" />
                </div>
                <span className="text-xs font-medium text-white/40 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                  {product.tag}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-white group-hover:text-gradient transition-all">
                {product.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed mb-4">{product.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white/80">{product.price}</span>
                <ArrowRight size={16} className="text-white/20 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Starter",
    price: "Gratuit",
    desc: "Pour explorer Lumio",
    features: ["3 templates offerts", "Accès communauté", "Mises à jour incluses"],
    cta: "Commencer gratuitement",
    gradient: false,
  },
  {
    name: "Pro",
    price: "29€",
    period: "/ mois",
    desc: "Pour les builders sérieux",
    features: [
      "Accès illimité aux templates",
      "UI Kits complets",
      "Boilerplates Next.js & FastAPI",
      "Packs de prompts",
      "Support prioritaire",
    ],
    cta: "Passer Pro →",
    gradient: true,
  },
  {
    name: "VIP",
    price: "99€",
    period: "/ an",
    desc: "Accès vie entière",
    features: [
      "Tout ce qui est Pro",
      "Accès anticipé aux nouveautés",
      "Call mensuel 1-on-1",
      "Contenu exclusif membres",
      "Badge VIP communauté",
    ],
    cta: "Rejoindre VIP →",
    gradient: false,
  },
];

function Pricing() {
  return (
    <section className="relative py-32 px-6 z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block text-xs font-medium text-pink-400 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-2 mb-4">
            Pricing simple
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Un prix <span className="text-gradient">honnête</span>
          </h2>
          <p className="text-white/40">Pas d&apos;abonnement caché. Tu paies ce que tu utilises.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 ${
                plan.gradient
                  ? "bg-gradient-to-b from-violet-600/20 to-blue-600/10 border border-violet-500/30"
                  : "bg-white/[0.03] border border-white/5"
              }`}
            >
              {plan.gradient && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-1 rounded-full">
                    ⭐ Recommandé
                  </span>
                </div>
              )}
              <div className="mb-6">
                <p className="text-sm text-white/40 mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  {plan.period && <span className="text-white/40 text-sm">{plan.period}</span>}
                </div>
                <p className="text-xs text-white/30 mt-1">{plan.desc}</p>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                    <Check size={14} className="text-violet-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.gradient
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white"
                    : "border border-white/10 text-white/60 hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.03, boxShadow: plan.gradient ? "0 0 30px rgba(139,92,246,0.4)" : "none" }}
                whileTap={{ scale: 0.97 }}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Marie L.",
    role: "Freelance Designer",
    text: "Le UI kit Lumio m'a fait économiser 2 semaines de travail. Qualité incroyable.",
    stars: 5,
  },
  {
    name: "Karim B.",
    role: "Indie hacker",
    text: "J'ai lancé mon SaaS en 3 jours avec le boilerplate Next.js. Impossible sans Lumio.",
    stars: 5,
  },
  {
    name: "Sophie T.",
    role: "Étudiante en médecine",
    text: "Le template Notion 2ème cerveau a révolutionné ma façon d'étudier. 10/10.",
    stars: 5,
  },
];

function Testimonials() {
  return (
    <section className="relative py-24 px-6 z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Ils utilisent <span className="text-gradient">Lumio</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/5 rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/30">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="relative py-32 px-6 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center bg-gradient-to-b from-violet-600/10 to-blue-600/5 border border-violet-500/20 rounded-3xl p-12"
      >
        <div className="text-5xl mb-6">✨</div>
        <h2 className="text-4xl font-black mb-4">
          Prêt à <span className="text-gradient">briller</span> ?
        </h2>
        <p className="text-white/50 mb-8">
          Rejoins des centaines de builders qui utilisent déjà Lumio pour aller plus vite.
        </p>
        <motion.button
          className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-base"
          whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(139,92,246,0.5)" }}
          whileTap={{ scale: 0.97 }}
        >
          Commencer gratuitement →
        </motion.button>
      </motion.div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative py-12 px-6 z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="font-bold text-gradient">Lumio</span>
        </div>
        <p className="text-xs text-white/20">© 2026 Lumio. Tous droits réservés.</p>
        <div className="flex gap-6 text-xs text-white/30">
          {["CGV", "Confidentialité", "Contact"].map((l) => (
            <a key={l} href="#" className="hover:text-white/60 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="bg-animated noise min-h-screen">
      <GridBackground />
      <Particles />
      <Navbar />
      <Hero />
      <Products />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
