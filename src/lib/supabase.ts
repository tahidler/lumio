import { createClient } from '@supabase/supabase-js'

// Assurez-vous que ces variables sont définies dans votre .env.local
// NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Créez le client Supabase uniquement si les variables sont définies
// Cela permet d'éviter les erreurs de build/runtime en l'absence de configuration
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

if (!supabase && process.env.NODE_ENV === 'development') {
  console.warn(
    'Supabase client non initialisé. Assurez-vous que NEXT_PUBLIC_SUPABASE_URL ' +
    'et NEXT_PUBLIC_SUPABASE_ANON_KEY sont définis dans votre .env.local.'
  )
}
