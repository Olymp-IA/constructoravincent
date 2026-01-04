import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Constructora Vincent | Obras Civiles y Construcción',
  description: 'Especialistas en construcción de hospitales, obras civiles y proyectos privados. Más de 15 años de experiencia construyendo con calidad y compromiso.',
  keywords: ['constructora', 'obras civiles', 'hospitales', 'construcción', 'Chile', 'Vincent'],
  authors: [{ name: 'Constructora Vincent' }],
  openGraph: {
    title: 'Constructora Vincent | Obras Civiles y Construcción',
    description: 'Especialistas en construcción de hospitales, obras civiles y proyectos privados.',
    type: 'website',
    locale: 'es_CL',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
