import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumio — Ressources digitales premium",
  description: "Templates Notion, UI kits, boilerplates et outils pour les builders, créatifs et entrepreneurs.",
  openGraph: {
    title: "Lumio — Ressources digitales premium",
    description: "Templates Notion, UI kits, boilerplates et outils pour les builders, créatifs et entrepreneurs.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
