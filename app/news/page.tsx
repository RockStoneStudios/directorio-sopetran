import { Calendar, User, Clock, Share2, Users, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function NewsDetailPage({ params }: PageProps) {
  const news = {
    id: "1",
    title: "Directorio Digital con IA Revoluciona el Comercio Local: Más de 45 Negocios Ya Inscritos",
    content: `
      <p class="lead">SOPETRÁN - En un hito histórico para la economía digital del municipio, 
      más de 45 negocios locales se han registrado en el primer directorio comercial potenciado 
      con inteligencia artificial, marcando el inicio de una nueva era para el comercio sopetranero.</p>
      
      <p>La plataforma, que promete transformar la forma en que los consumidores encuentran 
      productos y servicios, ya cuenta con una diversidad impresionante de establecimientos: 
      desde tiendas tradicionales familiares hasta nuevos emprendimientos tecnológicos que 
      buscan conquistar mercados más amplios.</p>
      
      <h2>Impacto en la Competitividad Local</h2>
      
      <p>"Estamos presenciando una revolución silenciosa en nuestro comercio local", 
      afirmó Omar Ortiz, director del proyecto. "La inteligencia artificial no solo 
      ayuda a los negocios a ser más visibles, sino que también les proporciona 
      herramientas para entender mejor a sus clientes y adaptar sus estrategias."</p>
      
      <p>Los primeros datos son contundentes: los negocios registrados han reportado 
      un incremento promedio del 45% en su visibilidad digital y un 30% en leads 
      comerciales durante la primera semana de operaciones.</p>
      
      <h2>Testimonios de Éxito</h2>
      
      
      
      
      <h2>El Futuro del Comercio Sopetranero</h2>
      
      <p>El directorio no se limita a ser un listado estático. La inteligencia artificial 
      aprende de los patrones de búsqueda, recomienda negocios basándose en preferencias 
      individuales y ayuda a los comerciantes a optimizar sus horarios y ofertas.</p>
      
      <p>Se proyecta que para finales de 2025, más del 70% del comercio formal del 
      municipio estará integrado en la plataforma, creando un ecosistema digital 
      robusto que competirá con opciones de grandes ciudades.</p>
    `,
    category: "Tecnología & Innovación",
    date: "2025-10-20",
    author: "Omar Ortiz",
    readTime: "4 min read"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Encabezado de la noticia */}
        <header className="mb-8 border-b pb-6">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full font-medium">
              {news.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              20 de Octubre, 2025
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              Por {news.author}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {news.readTime}
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {news.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Compartir
            </Button>
          </div>
        </header>

        {/* Estadísticas destacadas */}
        <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border">
          <div className="text-center">
            <Users className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">45+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Negocios Registrados</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">45%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Más Visibilidad</div>
          </div>
          <div className="text-center">
            <Zap className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">IA</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Potenciado con</div>
          </div>
        </div>

        {/* Contenido de la noticia */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-700 rounded-lg mb-8 flex items-center justify-center text-white relative">
            <div className="text-center p-8">
              <Zap className="w-20 h-20 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-2">Revolución Digital en Marcha</h3>
              <p className="text-lg opacity-90">Sopetrán se consolida como pionero en transformación digital municipal</p>
            </div>
            <div className="absolute bottom-4 left-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
              REPORTE EXCLUSIVO
            </div>
          </div>
          
          <div 
            className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </article>

        {/* Sección de noticias relacionadas */}
        <section className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">
            Más sobre Transformación Digital
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Aquí irían las noticias relacionadas */}
          </div>
        </section>
      </div>
    </div>
  );
}