import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopNav from "@/components/nav/top-nav";
import FloatingNavBar from "@/components/footer/botton-navbar";
import { ThemeProvider } from "../context/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { BusinessProvider } from "@/context/business";
import Script from "next/script";
import RadioPlayerWrapper from "@/components/radio/radio-player-wrapper";
import WeatherWidget from "@/components/Weather/WeatherWidget";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// ✅ SEO Metadata MEJORADO
export const metadata: Metadata = {
  metadataBase: new URL("https://www.directoriosopetran.com"),
  title: {
    default: "Directorio Sopetrán - Negocios Locales en Antioquia",
    template: "%s | Directorio Sopetrán"
  },
  description:
    "Descubre los mejores negocios locales en Sopetrán, Antioquia. Restaurantes, tiendas, servicios y más. Directorio digital actualizado con información de contacto, horarios y ubicación.",
  keywords: [
    "Sopetrán",
    "comercio local Sopetrán",
    "negocios Sopetrán",
    "directorio empresarial",
    "Antioquia",
    "turismo Sopetrán",
    "restaurantes Sopetrán",
    "servicios Sopetrán",
    "guía comercial",
    "empresas locales"
  ],
  authors: [{ name: "Directorio Sopetrán" }],
  creator: "Directorio Sopetrán",
  publisher: "Directorio Sopetrán",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.directoriosopetran.com",
    siteName: "Directorio Sopetrán",
    title: "Directorio Sopetrán - Negocios Locales en Antioquia",
    description: "Encuentra los mejores negocios, restaurantes y servicios en Sopetrán. Directorio digital completo con toda la información que necesitas.",
    images: [
      {
        url: "https://www.directoriosopetran.com/images/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Directorio Sopetrán - Comercio Local",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Directorio Sopetrán - Negocios Locales',
    description: 'Descubre negocios locales en Sopetrán, Antioquia',
    images: ['https://www.directoriosopetran.com/images/preview.jpg'],
  },
  alternates: {
    canonical: "https://www.directoriosopetran.com",
  },
  verification: {
    google: 'tu-codigo-de-verificacion', // Reemplaza con tu código real
  },
  category: 'business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="es" suppressHydrationWarning>
        <head>
          <link rel="canonical" href="https://www.directoriosopetran.com" />
          {/* Favicon mejorado */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <meta name="theme-color" content="#3b82f6" />
        </head>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen pb-20`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Fondo de página */}
            <div
              style={{ backgroundImage: 'url("/images/ia.jpg")' }}
              className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-20 transition-opacity duration-300"
            />

            <BusinessProvider>
              <header className="fixed top-0 left-0 right-0 z-50 opacity-90">
                <TopNav />
               
              </header>

              <main className="mt-20 md:mt-10 relative min-h-screen pb-20 md:pb-0">
                {children}
              </main>
            </BusinessProvider>
            
            <FloatingNavBar />
            <RadioPlayerWrapper />

            {/* ✅ Datos estructurados JSON-LD MEJORADO */}
            <Script
              id="structured-data-organization"
              type="application/ld+json"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "Directorio Sopetrán",
                  "url": "https://www.directoriosopetran.com",
                  "logo": "https://www.directoriosopetran.com/images/logo.png",
                  "description": "Directorio digital del comercio local de Sopetrán, Antioquia. Encuentra negocios, servicios y más.",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Sopetrán",
                    "addressRegion": "Antioquia",
                    "addressCountry": "CO",
                  },
                  "sameAs": [
                    "https://www.facebook.com/profile.php?id=61582100796538"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "Customer Service",
                    "availableLanguage": "Spanish"
                  }
                }),
              }}
            />

            {/* Website Schema */}
            <Script
              id="structured-data-website"
              type="application/ld+json"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "Directorio Sopetrán",
                  "url": "https://www.directoriosopetran.com",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.directoriosopetran.com/search?query={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }),
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}