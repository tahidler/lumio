import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lumio — Ressources premium pour builders',
  description: 'Templates Notion, UI kits, boilerplates et prompts IA. Tout ce dont vous avez besoin pour builder plus vite.',
  keywords: ['templates notion', 'ui kit', 'boilerplate', 'ressources digitales', 'prompts ia'],
  openGraph: {
    title: 'Lumio — Ressources premium pour builders',
    description: 'Build plus vite avec les meilleures ressources digitales.',
    url: 'https://lumio-omega.vercel.app',
    siteName: 'Lumio',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
