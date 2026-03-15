"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { use } from "react";
import { getProductBySlug, type Product } from "@/lib/supabase";
import { ArrowLeft, Check, Sparkles, Download, Shield, Zap } from "lucide-react";
import Link from "next/link";

const categoryColors: Record<string, string> = {
  notion_template: "from-violet-600 to-purple-600",
  ui_kit: "from-blue-600 to-cyan-600",
  boilerplate: "from-pink-600 to-rose-600",
  prompts: "from-amber-500 to-orange-500",
  guide: "from-green-600 to-emerald-600",
  bundle: "from-violet-600 to-pink-600",
};

const includes: Record<string, string[]> = {
  notion_template: ["Template Notion complet", "Guide d'installation", "Mises à jour incluses", "Support par email"],
  boilerplate: ["Code source complet", "Documentation technique", "Mises à jour 6 mois", "Support Discord"],
  prompts: ["Pack de prompts PDF", "Guide d'utilisation", "Accès communauté", "Mises à jour incluses"],
  ui_kit: ["Fichiers Figma", "Composants React", "Guide d'utilisation", "Mises à jour incluses"],
  guide: ["Guide PDF", "Ressources complémentaires", "Accès communauté"],
  bundle: ["Accès à tous les produits", "Mises à jour à vie", "Support prioritaire", "Accès anticipé nouveautés"],
};

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-animated min-h-screen pt-24 px-6 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="bg-animated min-h-screen pt-24 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-2">Produit introuvable</h1>
          <Link href="/products" className="text-violet-400 hover:underline">← Retour aux produits</Link>
        </div>
      </main>
    );
  }

  const gradient = categoryColors[product.category] || "from-violet-600 to-blue-600";
  const price = (product.price / 100).toFixed(0);
  const productIncludes = includes[product.category] || includes.guide;

  return (
    <main className="bg-animated min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <Link href="/products">
          <motion.div
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
            whileHover={{ x: -3 }}
          >
            <ArrowLeft size={16} /> Tous les produits
          </motion.div>
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — Preview */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className={`h-72 rounded-3xl bg-gradient-to-br ${gradient} relative flex items-center justify-center overflow-hidden mb-4`}>
              <div className="text-8xl opacity-20">
                {product.category === "notion_template" ? "📋" :
                 product.category === "boilerplate" ? "⚡" :
                 product.category === "prompts" ? "🤖" :
                 product.category === "ui_kit" ? "🎨" : "✨"}
              </div>
              {product.featured && (
                <div className="absolute top-4 left-4 text-xs font-bold bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={10} /> Featured
                </div>
              )}
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="text-xs text-white/40 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h1 className="text-3xl md:text-4xl font-black mb-3 leading-tight">{product.name}</h1>
            <p className="text-white/50 text-base mb-6 leading-relaxed">{product.description}</p>

            {/* Ce qui est inclus */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-6">
              <h3 className="font-bold text-sm text-white/60 mb-3 uppercase tracking-wider">Ce qui est inclus</h3>
              <ul className="space-y-2">
                {productIncludes.map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                      <Check size={10} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Garanties */}
            <div className="flex gap-4 mb-6">
              {[
                { icon: Shield, label: "Paiement sécurisé" },
                { icon: Download, label: "Accès immédiat" },
                { icon: Zap, label: "MàJ incluses" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-white/30">
                  <Icon size={14} className="text-violet-400" />
                  {label}
                </div>
              ))}
            </div>

            {/* Prix & CTA */}
            <div className="flex items-center gap-4">
              <div>
                <div className="text-4xl font-black">{price}€</div>
                <div className="text-xs text-white/30">Paiement unique · Accès à vie</div>
              </div>
              <motion.button
                className={`flex-1 bg-gradient-to-r ${gradient} text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2`}
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(139,92,246,0.4)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPurchasing(true)}
                disabled={purchasing}
              >
                {purchasing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Acheter maintenant <ArrowLeft size={16} className="rotate-180" /></>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
