'use client';

import { X, Umbrella, Wind, Droplets, Thermometer, CloudRain, AlertCircle, Calendar, Sun ,Moon } from 'lucide-react';
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
  80: 'Chubascos ligeros', 81: 'Chubascos moderados', 82: 'Chubascos violentos',
  95: 'Tormenta', 96: 'Tormenta con granizo', 99: 'Tormenta intensa',
};

export default function WeatherModal({ weather, onClose }: WeatherModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const getRecommendation = () => {
    if (weather.precipitation > 70) return { text: 'Lluvia fuerte. Paraguas ya.', color: 'border-red-600 bg-red-950' };
    if (weather.precipitation > 40) return { text: 'Posible lluvia. Ten cuidado.', color: 'border-yellow-600 bg-yellow-950' };
    if (weather.temperature > 28) return { text: 'Calor intenso. Hidrátate.', color: 'border-orange-600 bg-orange-950' };
    return { text: 'Clima perfecto para Sopetrán.', color: 'border-green-600 bg-green-950' };
  };

  const recommendation = getRecommendation();
  const lastUpdated = new Date(weather.time).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black" // ← 100% negro, cero transparencia
      onClick={onClose}
    >
      {/* Modal pequeño y 100% sólido */}
      <div 
        className="relative w-full max-w-xs bg-black border-4 border-cyan-500 rounded-2xl overflow-hidden"
        style={{
          boxShadow: `
            0 0 60px rgba(34, 211, 238, 1),
            0 0 120px rgba(34, 211, 238, 0.8),
            inset 0 0 50px rgba(34, 211, 238, 0.3)
          `
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Bordes neón ultra potentes */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"></div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>

        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-black border-b-4 border-cyan-500">
          <div className="flex items-center gap-3">
           <div className="text-3xl">
  {weather.isDay ? <Sun className="w-9 h-9 text-yellow-400" /> : <Moon className="w-9 h-9 text-blue-300" />}
</div>
            <div>
              <h2 className="text-xl font-bold text-white">Sopetrán, ANT</h2>
              <p className="text-cyan-400 text-xs font-bold">
                {weatherLabels[weather.weathercode] || 'Clima actual'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-900 rounded-lg">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Temperatura */}
        <div className="py-6 text-center bg-black">
          <div className="text-7xl font-black text-white tracking-tighter">
            {weather.temperature}°C
          </div>
          <div className="text-cyan-400 text-sm font-bold">Sensación {weather.feelsLike}°C</div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-3">
          {[
            { icon: Droplets, value: `${weather.humidity}%`, label: 'Humedad', color: 'blue' },
            { icon: Wind, value: `${weather.windspeed} km/h`, label: 'Viento', color: 'green' },
            { icon: CloudRain, value: `${weather.precipitation}%`, label: 'Lluvia', color: 'purple' },
            { icon: Thermometer, value: weather.isDay ? 'Día' : 'Noche', label: 'Estado', color: 'orange' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-gray-950 rounded-lg border border-gray-800 text-center">
              <item.icon className={`w-6 h-6 mx-auto mb-1 text-${item.color}-400`} />
              <div className="text-xs text-gray-500">{item.label}</div>
              <div className="font-bold text-white">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Recomendación */}
        <div className={`mx-4 mb-4 p-3 rounded-lg border-4 ${recommendation.color} text-center`}>
          <p className="text-white font-bold">{recommendation.text}</p>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 flex justify-between items-center text-xs border-t-4 border-cyan-500 bg-black">
          <span className="text-gray-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {lastUpdated}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg text-sm"
          >
            Cerrar
          </button>
        </div>

        {/* Esquinas neón */}
        <div className="absolute top-1 left-1 w-6 h-6 border-l-4 border-t-4 border-cyan-400"></div>
        <div className="absolute top-1 right-1 w-6 h-6 border-r-4 border-t-4 border-cyan-400"></div>
        <div className="absolute bottom-1 left-1 w-6 h-6 border-l-4 border-b-4 border-blue-500"></div>
        <div className="absolute bottom-1 right-1 w-6 h-6 border-r-4 border-b-4 border-blue-500"></div>
      </div>
    </div>
  );
}