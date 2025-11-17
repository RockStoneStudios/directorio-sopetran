// app/news/[slug]/page.tsx
'use client';

import { Calendar, User, Clock, Share2, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimeSincePublication } from "@/components/timer/timer-count";
import newsData from '@/data/news.json';
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  // Buscar la noticia por slug
  const news = newsData.news.find(item => item.slug === params.slug);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const authorTextRef = useRef<HTMLSpanElement>(null);
  const authorContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Evitar hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Efecto de neón letra por letra
  useEffect(() => {
    if (!mounted || !authorTextRef.current || !authorContainerRef.current || !news?.author) return;

    const authorName = news.author;
    const letters = authorName.split('');
    const textElement = authorTextRef.current;
    const containerElement = authorContainerRef.current;
    
    // Limpiar el contenido existente
    textElement.textContent = '';
    
    // Crear un span para cada letra
    letters.forEach((letter) => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.className = 'inline-block transition-all duration-300';
      span.style.opacity = '0.7';
      span.style.filter = 'brightness(1)';
      textElement.appendChild(span);
    });

    // Animación GSAP para el efecto de neón
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    // Efecto de recorrido letra por letra
    const children = Array.from(textElement.children) as HTMLElement[];
    children.forEach((child) => {
      tl.to(child, {
        duration: 0.1,
        opacity: 1,
        scale: 1.2,
        filter: 'brightness(2) drop-shadow(0 0 8px #00ffff)',
        ease: 'power2.out'
      })
      .to(child, {
        duration: 0.2,
        opacity: 0.7,
        scale: 1,
        filter: 'brightness(1) drop-shadow(0 0 0px transparent)',
        ease: 'power2.in',
        delay: 0.1
      }, `+=0.1`);
    });

    // Efecto de respiración suave para todo el texto
    gsap.to(containerElement, {
      duration: 3,
      textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

    return () => {
      tl.kill();
    };
  }, [mounted, news?.author]);

  // Aplicar estilos al contenido HTML
  useEffect(() => {
    if (!contentRef.current || !news?.content) return;

    const applyStyles = () => {
      const content = contentRef.current;
      if (!content) return;

      // Aplicar estilos a todos los párrafos
      const paragraphs = content.querySelectorAll('p');
      paragraphs.forEach((p, index) => {
        p.className = 'mb-6 leading-relaxed text-justify text-gray-800 dark:text-gray-200 text-lg';
        
        // Primer párrafo con estilo especial
        if (index === 0) {
          p.className += ' text-xl font-medium text-gray-900 dark:text-white first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-2 first-letter:text-blue-600 dark:first-letter:text-blue-400';
        }
      });

      // Aplicar estilos a los encabezados
      const h2Elements = content.querySelectorAll('h2');
      h2Elements.forEach(h2 => {
        h2.className = 'text-3xl font-bold mt-10 mb-4 text-gray-900 dark:text-white border-b-2 border-blue-600 dark:border-blue-400 pb-2';
      });

      const h3Elements = content.querySelectorAll('h3');
      h3Elements.forEach(h3 => {
        h3.className = 'text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 dark:border-blue-400 pl-3';
      });

      // Aplicar estilos a blockquotes
      const blockquotes = content.querySelectorAll('blockquote');
      blockquotes.forEach(blockquote => {
        blockquote.className = 'border-l-4 border-blue-600 dark:border-blue-400 px-6 py-4 my-6 italic text-xl text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg shadow-sm';
      });

      // Aplicar estilos a listas
      const lists = content.querySelectorAll('ul, ol');
      lists.forEach(list => {
        list.className = 'my-6 pl-8 space-y-2';
      });

      const listItems = content.querySelectorAll('li');
      listItems.forEach(li => {
        li.className = 'text-gray-700 dark:text-gray-300 text-lg leading-relaxed';
      });

      // Aplicar estilos a elementos strong
      const strongElements = content.querySelectorAll('strong');
      strongElements.forEach(strong => {
        strong.className = 'font-bold text-gray-900 dark:text-white';
      });

      // Aplicar estilos a enlaces
      const links = content.querySelectorAll('a');
      links.forEach(link => {
        link.className = 'text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors';
      });

      // Aplicar estilos a elementos hr
      const hrElements = content.querySelectorAll('hr');
      hrElements.forEach(hr => {
        hr.className = 'my-8 border-t-2 border-gray-800 dark:border-blue-400';
      });
    };

    // Aplicar estilos después de un pequeño delay para asegurar que el contenido esté renderizado
    setTimeout(applyStyles, 100);
  }, [news?.content]);

  // Si no encuentra la noticia, mostrar 404
  if (!news) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-gray-600 dark:text-gray-400">Noticia no encontrada</p>
          <Button asChild className="mt-4">
            <a href="/news">Volver a Noticias</a>
          </Button>
        </div>
      </div>
    );
  }

  const publishDate = new Date(news.date);
  const categoryData = newsData.categories.find(cat => cat.name === news.category);

  // Función para copiar URL al portapapeles
  const handleShare = async () => {
    if (!mounted) return;
    
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar: ', err);
      // Fallback para navegadores más antiguos
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Encabezado */}
        <header className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span className={`bg-gradient-to-r ${categoryData?.color || 'from-gray-600 to-gray-800'} text-white px-3 py-1 rounded-full font-medium flex items-center gap-2`}>
              <BarChart3 className="w-4 h-4" />
              {news.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <TimeSincePublication publishDate={publishDate} />
            </div>
            <div 
              ref={authorContainerRef}
              className="flex items-center gap-1 text-cyan-600 dark:text-cyan-500 font-medium transition-all duration-300"
            >
              <User className="w-4 h-4" />
              Por <span ref={authorTextRef} className="font-bold ml-1"></span>
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
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={handleShare}
              disabled={!mounted}
            >
              <Share2 className="w-4 h-4" />
              {copied ? "¡Copiado!" : "Compartir"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <BarChart3 className="w-4 h-4" />
              Ver Análisis
            </Button>
          </div>
        </header>

        {/* Imagen destacada */}
        <div className="aspect-video rounded-lg mb-8 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
          {news.image ? (
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 flex items-center justify-center text-white">
              <div className="text-center p-8">
                <BarChart3 className="w-20 h-20 mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">{news.category}</h3>
                <p className="text-lg opacity-90">Noticias actualizadas de Sopetrán</p>
              </div>
            </div>
          )}
          
          {news.featured && (
            <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
              DESTACADA
            </div>
          )}
          
          {/* Badge de categoría en la imagen */}
          <div className="absolute bottom-4 left-4">
            <span className={`bg-gradient-to-r ${categoryData?.color || 'from-gray-600 to-gray-800'} text-white px-3 py-1 rounded-full font-medium text-sm`}>
              {news.category}
            </span>
          </div>
        </div>

        {/* Línea divisoria antes del contenido */}
        <hr className="my-8 border-t-2 border-gray-800 dark:border-blue-400" />

        {/* Contenido con diseño mejorado */}
        <article className="max-w-none mb-12">
          {/* Primer párrafo destacado */}
          <div className="text-xl lg:text-2xl font-serif text-gray-800 dark:text-gray-200 leading-relaxed mb-8 pl-6 border-l-4 border-blue-500 italic bg-blue-50 dark:bg-blue-900/20 py-4 rounded-r-lg">
            {news.excerpt}
          </div>

          {/* Contenido principal con estilos Tailwind */}
          <div 
            ref={contentRef}
            className="space-y-6"
            dangerouslySetInnerHTML={{ __html: news.content || '' }}
          />

          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Etiquetas relacionadas:
              </h4>
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Línea divisoria antes de noticias relacionadas */}
        <hr className="my-8 border-t-2 border-gray-800 dark:border-blue-400" />

        {/* Noticias relacionadas por categoría */}
        <section className="mt-12 pt-8">
          <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">
            Más sobre {news.category}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {newsData.news
              .filter(item => item.category === news.category && item.id !== news.id)
              .slice(0, 2)
              .map(relatedNews => (
                <a 
                  key={relatedNews.id} 
                  href={`/news/${relatedNews.slug}`}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer block bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <h4 className="font-bold mb-2 text-gray-900 dark:text-white">{relatedNews.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{relatedNews.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {relatedNews.readTime}
                  </div>
                </a>
              ))}
          </div>
        </section>

        {/* Línea divisoria antes de la sección de Facebook */}
        <hr className="my-8 border-t-2 border-gray-800 dark:border-blue-400" />

        {/* Sección "Sígueme" con Facebook */}
        <section className="mt-12 pt-8">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Sígueme en Facebook
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Mantente al día con más noticias y actualizaciones sobre Sopetrán
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=61582100796538"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              <FaFacebook className="w-5 h-5" />
              Seguir en Facebook
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              Directorio Sopetran
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}