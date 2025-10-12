
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
    <div className="relative mt-5 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
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

       <div className="relative z-10 flex items-center justify-center h-full mb-8">
  <div className="text-center px-4 w-full max-w-3xl space-y-2">
    {/* Título principal */}
    <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mt-3 mb-3">
     Agrega y Busca Negocios locales con{"  "}
      <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text animate-pulse">
        IA
      </span>
    </h1>

    {/* Subtítulo */}
    <h2 className="text-xl text-white font-medium mt-2 ">
      ✨ Sopetrán como nunca antes ✨
    </h2>

    {/* Descripción */}
    <p className="text-white text-base md:text-lg leading-relaxed">
      En nuestro <span className="font-semibold">Directorio de Negocios Locales </span> 
      encuentras todo lo que buscas: <br /> tiendas, restaurantes, servicios ,actividades locales y mucho más…  
      ¡a un solo clic! 📲
    </p>

    {/* Lista de beneficios */}
    {/* <ul className="space-y-3 text-left md:text-center text-white">
      <li className="flex items-start gap-2">
        🚀 <span>Si tienes un negocio: <strong>regístralo y crea tu marca digital</strong>.</span>
      </li>
      <li className="flex items-start gap-2">
        💎 <span>Si eres usuario: descubre joyas locales, apoya a tu gente y conecta con tu comunidad.</span>
      </li>
    </ul> */}

    {/* Texto destacado */}
    <p className="text-white italic text-base md:text-lg">
      Porque Sopetrán se vive mejor cuando estamos conectados 💚 <br />
      👉 ¡No preguntes más por ahí… encuéntralo todo en segundos!
    </p>

    {/* Botón */}
   <Link href={`https://wa.me/573206209817`} target="_blank" rel="noopener noreferrer">
      <Button
        size="lg"
        className="text-lg mt-1 px-6 py-3 w-full md:w-auto rounded-xl shadow-lg hover:scale-105 transition"
      >
        Escríbenos por WhatsApp <ArrowRight className="ml-2" />
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
            <Link href="/businesses">
              <Button
                size="lg"
                className="text-lg px-4 md:px-8 py-2 md:py-4 w-full md:w-auto"
              >
                Empezar a navegar <ArrowRight className="ml-2" />
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
            <Link href="/" className="w-full md:w-auto">
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