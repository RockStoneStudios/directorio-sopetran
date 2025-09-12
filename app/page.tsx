
// app/page.tsx
// landing page
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  MapPin,
  Star,
  PlusCircle,
  Smartphone,
  Share2,
  Link as LinkIcon,
  Cpu,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/ia.jpg")',
          height: "60vh",
        }}
      >
        {/* bg-gradient-to-b from-transparent to-[#010818] z-0 */}
        <div className="absolute inset-0 bg-black/80 z-0 "></div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4 w-full max-w-4xl">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
             Descubra y promueva negocios locales con{" "}
              <span className="inline-block">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text animate-pulse">
                  IA
                </span>
              </span>
            </h1>

            <p className="text-white mb-5 mx-auto">
             Nuestro Directorio de Negocios Locales te ayuda a encontrar y apoyar negocios cercanos.
              Registrar tu negocio es gratis y descubrir joyas locales es fácil. ¡Conéctate con tu comunidad hoy mismo!
            </p>
            <Link href="/business/add">
              <Button
                size="lg"
                className="text-lg px-4 md:px-8 py-2 md:py-4 w-full md:w-auto"
              >
                Agrega tu negocio <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-20">
           ¿Por qué utilizar nuestro directorio de empresas locales mejorado con inteligencia artificial?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<PlusCircle className="w-12 h-12 text-blue-500" />}
              title="Listados de empresas gratuitos"
              description="Añade tu negocio a nuestro directorio y aumenta tu presencia online y llega a más locales y turistas."
            />
            <FeatureCard
              icon={<Search className="w-12 h-12 text-green-500" />}
              title="Búsqueda local sencilla"
              description="Encuentra negocios en tu zona de forma rápida y sencilla. Nuestra función de búsqueda te ayuda a descubrir servicios y productos locales."
            />
            <FeatureCard
              icon={<Star className="w-12 h-12 text-purple-500" />}
              title="Comentarios de clientes"
              description="Lee y deja reseñas de empresas. Ayuda a otros a tomar decisiones informadas y a mejorar tus servicios con base en tus comentarios."
            />
          </div>

          <div className="mt-20 text-center">
            <Link href="/business/add">
              <Button
                size="lg"
                className="text-lg px-4 md:px-8 py-2 md:py-4 w-full md:w-auto"
              >
                Start Browsing <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Benefits Section */}
      <section className="bg-blue-100 dark:bg-blue-900 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-20">
            Impulsa tu SEO local al instante
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Cpu className="w-12 h-12 text-blue-500" />}
              title="Contenido generado por IA"
              description="Nuestra IA crea descripciones comerciales optimizadas en segundos, ahorrándole tiempo y mejorando su presencia en línea.."
            />
            <FeatureCard
              icon={<LinkIcon className="w-12 h-12 text-green-500" />}
              title="Impulso de backlinks para SEO"
              description="Obtenga vínculos de retroceso valiosos para su sitio web, mejorando su clasificación en los motores de búsqueda y su visibilidad en línea."
            />
            <FeatureCard
              icon={<MapPin className="w-12 h-12 text-purple-500" />}
              title="Clasificaciones locales mejoradas"
              description="Mejore su SEO local con nuestros listados optimizados, ayudándolo a aparecer en más resultados de búsqueda locales."
            />
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 dark:bg-blue-800 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Conéctese con empresas locales en cualquier momento y en cualquier lugar
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex flex-col items-center">
              <MapPin className="w-12 h-12 mb-2" />
              <span>Buscar cerca</span>
            </div>
            <div className="flex flex-col items-center">
              <Smartphone className="w-12 h-12 mb-2" />
              <span>Diseño responsivo</span>
            </div>
            <div className="flex flex-col items-center">
              <Share2 className="w-12 h-12 mb-2" />
              <span>Compartir favoritos</span>
            </div>
          </div>
          <p className="text-xl mb-8 mx-auto">
            Únase a miles de negocios y clientes locales que están fortaleciendo sus comunidades.
            Ya sea que busque promocionar su negocio o descubrir servicios locales, ¡nuestro directorio lo simplifica!
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/businesses" className="w-full md:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-4 md:px-8 py-2 md:py-4 w-full"
              >
                Explore los Negocios Sopetraneros  <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/business/add" className="w-full md:w-auto">
              <Button
                size="lg"
                className="text-lg px-4 md:px-8 py-2 md:py-4 w-full"
              >
                Agrega tu Negocio <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        {description}
      </p>
    </div>
  );
}