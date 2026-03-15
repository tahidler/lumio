"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase, type Product } from "@/lib/supabase";
import { ArrowRight, Sparkles, Search, Filter } from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "all", label: "Tout", emoji: "✨" },
  { id: "notion_template", label: "Notion", emoji: "📋" },
  { id: "ui_kit", label: "UI Kits", emoji: "🎨" },
  { id: "boilerplate", label: "Boilerplates", emoji: "⚡" },
  { id: "prompts", label: "Prompts", emoji: "🤖" },
  { id: "guide", label: "Guides", emoji: "📚" },
  { id: "bundle", label: "Bundles", emoji: "🔥" },
];

const categoryColors: Record<string, string> = {
  notion_template: "from-violet-600 to-purple-600",
  ui_kit: "from-blue-600 to-cyan-600",
  boilerplate: "from-pink-600 to-rose-600",
  prompts: "from-amber-500 to-orange-500",
  guide: "from-green-600 to-emerald-600",
  bundle: "from-violet-600 to-pink-600",
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const gradient = categoryColors[product.category] || "from-violet-600 to-blue-600";
  const price = (product.price / 100).toFixed(0);
  const originalPrice = product.original_price ? (product.original_price / 100).toFixed(0) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group card-hover bg-white/[0.03] rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Thumbnail */}
      <div className={`h-48 bg-gradient-to-br ${gradient} relative flex items-center justify-center`}>
        <div className="text-6xl opacity-30">
          {categories.find(c => c.id === product.category)?.emoji || "✨"}
        </div>
        {product.featured && (
          <div className="absolute top-3 left-3 text-xs font-bold bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1">
            <Sparkles size={10} /> Featured
          </div>
        )}
        {originalPrice && (
          <div className="absolute top-3 right-3 text-xs font-bold bg-red-500 text-white px-3 py-1 rounded-full">
            -{Math.round((1 - product.price / product.original_price!) * 100)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs text-white/40 bg-white/5 rounded-full px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-bold text-base mb-2 text-white group-hover:text-gradient transition-all line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-white/40 mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-black text-lg text-white">{price}€</span>
            {originalPrice && (
              <span className="text-sm text-white/30 line-through">{originalPrice}€</span>
            )}
          </div>
          <Link href={`/products/${product.slug}`}>
            <motion.button
              className={`text-xs font-semibold bg-gradient-to-r ${gradient} text-white px-4 py-2 rounded-xl flex items-center gap-1`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir <ArrowRight size={12} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .schema("lumio" as never)
          .from("products")
          .select("*")
          .eq("active", true)
          .order("featured", { ascending: false });
        setProducts(data as Product[] || []);
        setFiltered(data as Product[] || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== "all") result = result.filter(p => p.category === activeCategory);
    if (search) result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [activeCategory, search, products]);

  return (
    <main className="bg-animated min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Tous les <span className="text-gradient">produits</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Des ressources premium pour builders, créatifs et entrepreneurs.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-8 max-w-md mx-auto"
        >
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-sm px-4 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.emoji} {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Count */}
        <div className="flex items-center gap-2 mb-6 text-sm text-white/30">
          <Filter size={14} />
          {filtered.length} produit{filtered.length > 1 ? "s" : ""}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 bg-white/[0.03] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <div className="text-5xl mb-4">🔍</div>
            <p>Aucun produit trouvé</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
