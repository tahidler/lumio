import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  long_description: string
  category: string
  price: number
  original_price: number | null
  preview_url: string | null
  thumbnail_url: string | null
  tags: string[]
  featured: boolean
  sales_count: number
  created_at: string
}

export async function getProducts(category?: string) {
  let query = supabase
    .schema('lumio' as never)
    .from('products')
    .select('*')
    .eq('active', true)
    .order('featured', { ascending: false })
    .order('sales_count', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) throw error
  return data as Product[]
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .schema('lumio' as never)
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (error) throw error
  return data as Product
}
