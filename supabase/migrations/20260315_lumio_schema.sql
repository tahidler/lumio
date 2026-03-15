-- Lumio schema
CREATE SCHEMA IF NOT EXISTS lumio;

-- Products
CREATE TABLE lumio.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  category TEXT NOT NULL, -- notion_template, ui_kit, boilerplate, prompts, guide, bundle
  price INTEGER NOT NULL, -- centimes
  original_price INTEGER, -- pour afficher la réduction
  preview_url TEXT,
  thumbnail_url TEXT,
  download_url TEXT,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  sales_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers
CREATE TABLE lumio.customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE lumio.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES lumio.customers(id),
  product_id UUID REFERENCES lumio.products(id),
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, paid, refunded
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_session_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX ON lumio.products(category);
CREATE INDEX ON lumio.products(featured);
CREATE INDEX ON lumio.orders(customer_id);
CREATE INDEX ON lumio.orders(status);

-- RLS
ALTER TABLE lumio.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE lumio.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE lumio.orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Products are public" ON lumio.products FOR SELECT USING (active = true);
CREATE POLICY "Customers manage own data" ON lumio.customers USING (user_id = auth.uid());
CREATE POLICY "Customers see own orders" ON lumio.orders USING (
  customer_id IN (SELECT id FROM lumio.customers WHERE user_id = auth.uid())
);

-- Seed products
INSERT INTO lumio.products (slug, name, description, category, price, featured, tags) VALUES
('notion-second-brain', '🧠 2ème Cerveau Notion', 'Système complet de gestion des connaissances, projets et habitudes', 'notion_template', 1900, true, ARRAY['notion','productivité','organisation']),
('notion-student-os', '📚 Student OS Notion', 'Template ultime pour étudiants — cours, révisions, projets', 'notion_template', 1200, true, ARRAY['notion','étudiant','université']),
('notion-startup-kit', '🚀 Startup Kit Notion', 'Dashboard complet pour suivre ton startup — roadmap, finances, OKRs', 'notion_template', 2900, true, ARRAY['notion','startup','business']),
('notion-fitness-tracker', '🏋️ Fitness Tracker Notion', 'Suivi workouts, nutrition et progression — connecté à tes goals', 'notion_template', 900, false, ARRAY['notion','fitness','sport']),
('nextjs-saas-boilerplate', '⚡ Next.js SaaS Boilerplate', 'Starter complet Next.js 15 + Supabase + Stripe + Auth — lance en heures', 'boilerplate', 9900, true, ARRAY['nextjs','saas','typescript']),
('gpt-builder-prompts', '🤖 Pack Prompts Builder', '50 prompts GPT optimisés pour dev, marketing et productivité', 'prompts', 700, false, ARRAY['gpt','prompts','ia']);

