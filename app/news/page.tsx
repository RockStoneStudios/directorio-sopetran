// app/news/[slug]/page.tsx (Server Component)
import { Calendar, User, Clock, Share2, TrendingUp, Zap, Award, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimeSincePublication } from "@/components/timer/timer-count";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function NewsDetailPage({ params }: PageProps) {
  // Fecha de publicación del artículo
  const publishDate = new Date('2025-11-05T14:08:50');
  
  const news = {
    id: "2",
    title: "DeepSeek V3 Supera a GPT-4o: Sopetrán se Prepara para Integrar IA China y Analizar Ventas Locales",
    content: `
      <p class="lead">PEKÍN / SOPETRÁN - El modelo de inteligencia artificial <strong>DeepSeek V3</strong>, 
      desarrollado por la startup china <em>DeepSeek AI</em>, ha alcanzado el <strong>primer lugar mundial</strong> 
      en <strong>LMSYS Arena</strong> con un Elo de <strong>1,385</strong>, superando a GPT-4o (1,372) 
      y Gemini 2.0 (1,368) en noviembre de 2025.</p>
      
      <p>Mientras Silicon Valley invierte cientos de millones, DeepSeek logró este hito con 
      <strong>solo $5.6 millones</strong> y una arquitectura eficiente que activa 
      <strong>37 mil millones de parámetros por token</strong> de un total de 671 mil millones.</p>
      
      <h2>¿Qué Significa Esto para Sopetrán?</h2>
      
      <p><strong>El Directorio Sopetrán aún no utiliza DeepSeek</strong>, pero 
      <strong>ya estamos en fase de pruebas</strong> para integrarlo en los próximos meses. 
      Esta tecnología permitirá un <strong>análisis profundo de ventas</strong> que transformará 
      cómo los negocios locales entienden y optimizan sus ingresos.</p>
      
      <h2>Análisis de Ventas: El Corazón de la Integración</h2>
      
      <p>DeepSeek V3 se enfocará en <strong>procesar datos de ventas locales</strong> para generar 
      insights accionables. Imagina un sistema que analiza patrones de compra en tiempo real, 
      identificando qué productos se venden más los fines de semana o cómo las promociones 
      impactan en los ingresos mensuales.</p>
      
      <p>Con algoritmos de aprendizaje automático, DeepSeek podrá:</p>
      
      <ul class="list-disc pl-6 space-y-2 my-6">
        <li><strong>Predecir picos de demanda</strong>: "¿Qué pasará si llueve el domingo? DeepSeek te dirá qué productos priorizar para maximizar ventas."</li>
        <li><strong>Optimizar precios dinámicos</strong>: Ajustes automáticos basados en competencia local, aumentando márgenes sin perder clientes.</li>
        <li><strong>Segmentar clientes</strong>: "El 65% de tus ventas vienen de familias locales — enfócate en paquetes para ellos."</li>
        <li><strong>Reducir inventarios obsoletos</strong>: Análisis que evita pérdidas por stock acumulado, ahorrando hasta 20-30% en costos.</li>
      </ul>
      
      <h2>Impacto Realista en Ventas: Datos de 2025</h2>
      
      <p>Estudios de McKinsey y Goldman Sachs en 2025 muestran que <strong>pequeños negocios usando IA para análisis de ventas ven un crecimiento promedio del 20-35%</strong> en ingresos anuales, con un 86% reportando mayor eficiencia operativa.</p>
      
      <p>En Sopetrán, esto podría traducirse en:</p>
      
      <ul class="list-disc pl-6 space-y-2 my-6">
        <li><strong>Restaurantes</strong>: +25% en ventas de fines de semana al predecir demanda de turistas.</li>
        <li><strong>Tiendas locales</strong>: Reducción del 15-20% en stock perdido, liberando capital para reinversión.</li>
        <li><strong>Emprendedores</strong>: Identificación de tendencias, como +30% en ventas de artesanías durante ferias, para preparar inventarios óptimos.</li>
      </ul>
      
      <p>"No prometemos milagros, pero sí herramientas realistas", afirma <strong>Omar Ortiz</strong>, 
      director del proyecto. "Con DeepSeek, los negocios de Sopetrán podrán tomar decisiones 
      basadas en datos locales, no en intuiciones, lo que históricamente genera un <strong>20-35% de crecimiento sostenido</strong>."</p>
      
      <h2>DeepSeek vs Modelos Estadounidenses (2025)</h2>
      
      <table class="w-full border-collapse text-sm mb-6">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-800">
            <th class="border p-2 text-left">Modelo</th>
            <th class="border p-2">LMSYS Elo</th>
            <th class="border p-2">Costo por M tokens</th>
            <th class="border p-2">Fuerte en Análisis</th>
          </tr>
        </thead>
        <tbody>
          <tr class="font-bold bg-green-50 dark:bg-green-900/20">
            <td class="border p-2">DeepSeek V3</td>
            <td class="border p-2 text-green-600">1,385</td>
            <td class="border p-2">$0.14</td>
            <td class="border p-2">Datos locales + Predicciones</td>
          </tr>
          <tr>
            <td class="border p-2">GPT-4o</td>
            <td class="border p-2">1,372</td>
            <td class="border p-2">$5.00</td>
            <td class="border p-2">Análisis general</td>
          </tr>
          <tr>
            <td class="border p-2">Gemini 2.0</td>
            <td class="border p-2">1,368</td>
            <td class="border p-2">$3.50</td>
            <td class="border p-2">Tendencias masivas</td>
          </tr>
        </tbody>
      </table>
      
      <h2>Próximos Pasos del Directorio</h2>
      
      <p>La integración de DeepSeek V3 comenzará con:</p>
      <ol class="list-decimal pl-6 space-y-2 my-6">
        <li><strong>Fase 1 (Diciembre 2025)</strong>: Análisis básico de visibilidad ventas diarias.</li>
        <li><strong>Fase 2 (Enero 2026)</strong>: Reportes personalizados para cada negocio </li>
        <li><strong>Fase 3 (Marzo 2026)</strong>:Predicciones de demanda por temporada. </li>
      </ol>
      
      <blockquote class="border-l-4 border-purple-600 pl-4 italic my-6">
        "El análisis de ventas con IA no es magia: es datos locales que se convierten en decisiones inteligentes, 
        llevando a un crecimiento real y sostenible del 20-35% para nuestros comerciantes."
        <cite class="block mt-2 text-sm font-medium">— Omar Ortiz, Director del Proyecto</cite>
      </blockquote>
    `,
    category: "Inteligencia Artificial",
    date: "2025-11-05",
    author: "Omar Ortiz",
    readTime: "6 min read"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Encabezado */}
        <header className="mb-8 border-b pb-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-3 py-1 rounded-full font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              {news.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              5 de Noviembre, 2025
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              Por {news.author}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {news.readTime}
            </div>
            {/* CONTADOR EN TIEMPO REAL */}
            <TimeSincePublication publishDate={publishDate} />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {news.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Compartir
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Ver Análisis
            </Button>
          </div>
        </header>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-lg border">
          <div className="text-center">
            <Award className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">+20-35%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Crecimiento Ventas</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">1,385</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Elo Mundial</div>
          </div>
          <div className="text-center">
            <Zap className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white">$0.14</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Por M Tokens</div>
          </div>
        </div>

        {/* Contenido */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="aspect-video bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 rounded-lg mb-8 flex items-center justify-center text-white relative overflow-hidden">
            <div className="text-center p-8 relative z-10">
              <BarChart3 className="w-20 h-20 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-2">Análisis IA + Ventas</h3>
              <p className="text-lg opacity-90">Datos locales, decisiones inteligentes</p>
            </div>
            <div className="absolute bottom-4 left-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
              PRÓXIMAMENTE
            </div>
          </div>
          
          <div 
            className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </article>

        {/* Relacionadas */}
        <section className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">
            Más sobre IA y Comercio Local
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-bold mb-2">Cómo DeepSeek analizará ventas de tamales en Sopetrán</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Predicciones realistas para picos de demanda</p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-bold mb-2">IA vs Intuición: El impacto del 20-35% en negocios locales</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Datos de McKinsey y Goldman Sachs 2025</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}