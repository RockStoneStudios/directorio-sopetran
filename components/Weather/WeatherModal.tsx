'use client';

import { X, Droplets, Wind, CloudRain, Thermometer, Sun, Moon } from 'lucide-react';
import { useEffect } from 'react';

interface WeatherModalProps {
  weather: {
    temperature: number;
    feelsLike: number;
    weathercode: number;
    humidity: number;
    windspeed: number;
    precipitation: number;
    isDay: number;
    time: string;
  };
  onClose: () => void;
}

const weatherLabels: Record<number, string> = {
  0: 'Despejado', 1: 'Mayormente despejado', 2: 'Parcialmente nublado',
  3: 'Nublado', 45: 'Niebla', 48: 'Niebla escarchada',
  51: 'Llovizna ligera', 53: 'Llovizna moderada', 55: 'Llovizna intensa',
  61: 'Lluvia ligera', 63: 'Lluvia moderada', 65: 'Lluvia intensa',
  80: 'Chubascos', 81: 'Chubascos fuertes', 82: 'Chubascos violentos',
  95: 'Tormenta', 96: 'Tormenta con granizo', 99: 'Tormenta intensa',
};

export default function WeatherModal({ weather, onClose }: WeatherModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const getRecommendation = () => {
    if (weather.precipitation > 70) return { text: 'Clima perfecto para Sopetrán.', color: 'bg-green-600' };
    if (weather.precipitation > 70) return { text: 'Lluvia fuerte. Paraguas ya.', color: 'bg-red-600' };
    if (weather.precipitation > 40) return { text: 'Posible lluvia. Ten cuidado.', color: 'bg-yellow-600' };
    if (weather.temperature > 28) return { text: 'Calor intenso. Hidrátate.', color: 'bg-orange-600' };
    return { text: 'Clima perfecto para Sopetrán.', color: 'bg-green-600' };
  };

  const recommendation = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black" onClick={onClose}>
      {/* Modal ultra compacto y 100% opaco */}
      <div 
        className="relative w-full max-w-[280px] bg-black border-2 border-cyan-500 rounded-xl overflow-hidden shadow-2xl"
        style={{
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* LED rojo superior */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>

        {/* Título con puntos rojos */}
        <div className="bg-gradient-to-b from-gray-900 to-black p-3 text-center border-b-2 border-cyan-500">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <h1 className="text-sm font-bold text-white tracking-wider">TEMPERATURA SOPETRAN</h1>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-4 bg-black">
          {/* Clima principal */}
          <div className="mb-4 p-3 bg-gray-900 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {weather.isDay ? 
                  <Sun className="w-7 h-7 text-yellow-400" /> : 
                  <Moon className="w-7 h-7 text-blue-300" />
                }
                <div>
                  <h2 className="text-sm font-bold text-white">Sopetrán, ANT</h2>
                  <p className="text-cyan-400 text-xs">
                    {weatherLabels[weather.weathercode] || 'Clima actual'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-white leading-none">
                  {weather.temperature}°C
                </div>
                <div className="text-cyan-400 text-xs">Sensación {weather.feelsLike}°C</div>
              </div>
            </div>
          </div>

          {/* Métricas 2x2 */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { icon: Droplets, value: `${weather.humidity}%`, label: 'HUMEDAD' },
              { icon: Wind, value: `${weather.windspeed} km/h`, label: 'VIENTO' },
              { icon: CloudRain, value: `${weather.precipitation}%`, label: 'LLUVIA' },
              { icon: Thermometer, value: weather.isDay ? 'DÍA' : 'NOCHE', label: 'ESTADO' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 p-3 rounded border border-gray-700 text-center">
                <item.icon className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">{item.label}</div>
                <div className="text-lg font-bold text-white">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Recomendación */}
          <div className={`p-3 rounded-lg ${recommendation.color} text-center mb-4 border-2 border-white/20`}>
            <p className="text-white font-bold text-sm">{recommendation.text}</p>
          </div>

          {/* Botón cerrar */}
          <div className="text-center">
            <button 
              onClick={onClose}
              className="w-full max-w-[200px] py-2 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded border-2 border-cyan-500 text-sm transition-all"
            >
              CERRAR
            </button>
          </div>
        </div>

        {/* Botón X esquina */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-1 hover:bg-gray-800 rounded"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}