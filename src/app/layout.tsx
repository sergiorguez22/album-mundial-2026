import type { Metadata, Viewport } from 'next';
import { Anton, Archivo, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
});

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '700', '900'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Álbum Virtual · Mundial 2026',
  description:
    'Coleccionable digital no oficial del Mundial 2026 · 48 selecciones · uso privado entre amigos.',
  applicationName: 'Álbum Virtual Mundial 2026',
  authors: [{ name: 'NewGearCars' }],
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${archivo.variable} ${cormorant.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
