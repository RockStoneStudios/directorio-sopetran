// app/news/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, TrendingUp, ArrowRight, Eye, Store } from "lucide-react";
import Link from "next/link";
import newsData from '@/data/news.json';

export default function NewsPage() {
  const featuredNews = newsData.news.filter(news => news.featured).slice(0, 3);
  const categories = newsData.categories;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Noticias de Sopetrán
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Mantente al día con lo último que ocurre en nuestro municipio: eventos culturales, 
            desarrollos locales, comercio, turismo y comunidad.
          </p>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">$45.504M</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Presupuesto Municipal 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
                  <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">3.472</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Récord de Visitas Simultáneas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-800 rounded-full">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">+12%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Crecimiento Comercio Digital</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categorías de Noticias */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
              Explorar por Categoría
            </h2>
            <Button variant="outline" asChild>
              <Link href="/news/all">
                Ver todas las noticias <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const categoryNews = newsData.news.filter(news => news.category === category.name);
              const latestNews = categoryNews[0]; // Noticia más reciente de la categoría
              
              return (
                <Link key={category.id} href={`/news/category/${category.id}`}>
                  <Card className="h-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg border-2">
                    <CardHeader className={`bg-gradient-to-r ${category.color} p-6`}>
                      <CardTitle className="text-white text-xl flex items-center justify-between">
                        {category.name}
                        <span className="text-white/80 text-sm bg-white/20 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      {latestNews && (
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                            {latestNews.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {latestNews.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{latestNews.author}</span>
                            <span>{latestNews.readTime}</span>
                          </div>
                        </div>
                      )}
                      <Button variant="ghost" size="sm" className="w-full mt-4">
                        Ver categoría <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Noticias Destacadas */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">
            Noticias Destacadas
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredNews.map((news) => (
              <Link key={news.id} href={`/news/${news.slug}`}>
                <Card className="h-full cursor-pointer transform transition-all duration-300 hover:shadow-lg border">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                      <div className="text-center p-4">
                        <Store className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Imagen ilustrativa</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${categories.find(c => c.name === news.category)?.color || 'from-gray-600 to-gray-800'} text-white`}>
                          {news.category}
                        </span>
                        <span className="text-xs text-gray-500">{news.readTime}</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                        {news.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Por {news.author}</span>
                        <span>{new Date(news.date).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-2">¿Te gusta estar informado?</h3>
            <p className="text-blue-100 mb-4">
              Descubre todas las noticias que tenemos para ti en Sopetrán
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="/news/all">
                Explorar Todas las Noticias <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}