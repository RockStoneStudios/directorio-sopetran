'use client';

import { useState, useEffect } from 'react';
import { Thermometer, Info } from 'lucide-react';
import WeatherModal from './WeatherModal';
import { correctSopetranTemperature } from '@/utils/weatherCorrection';

const SOPETRAN_COORDS = { lat: 6.5014, lon: -75.7431 };

interface WeatherData {
  temperature: number;
  feelsLike: number;
  weathercode: number;
  humidity: number;
  windspeed: number;
  precipitation: number;
  isDay: number;
  time: string;
}

const weatherIcons: Record<number, { icon: string; color: string }> = {
  0: { icon: '☀️', color: 'text-yellow-500' },
  1: { icon: '⛅', color: 'text-yellow-400' },
  2: { icon: '☁️', color: 'text-gray-400' },
  3: { icon: '☁️', color: 'text-gray-500' },
  45: { icon: '🌫️', color: 'text-gray-400' },
  48: { icon: '🌫️', color: 'text-gray-400' },
  51: { icon: '🌦️', color: 'text-blue-400' },
  53: { icon: '🌦️', color: 'text-blue-500' },
  55: { icon: '🌦️', color: 'text-blue-600' },
  61: { icon: '🌧️', color: 'text-blue-500' },
  63: { icon: '🌧️', color: 'text-blue-600' },
  65: { icon: '🌧️', color: 'text-blue-700' },
  80: { icon: '🌦️', color: 'text-blue-500' },
  81: { icon: '🌧️', color: 'text-blue-600' },
  82: { icon: '⛈️', color: 'text-purple-600' },
  95: { icon: '⛈️', color: 'text-purple-500' },
  96: { icon: '⛈️', color: 'text-purple-600' },
  99: { icon: '⛈️', color: 'text-purple-700' },
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${SOPETRAN_COORDS.lat}&longitude=${SOPETRAN_COORDS.lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m&timezone=America/Bogota`
      );
      
      if (!response.ok) throw new Error('Error al obtener el clima');
      
      const data = await response.json();
      
      const corrected = correctSopetranTemperature(
        data.current_weather.temperature,
        data.hourly?.relativehumidity_2m?.[0]
      );
      
      setWeather({
        temperature: corrected.temperature,
        feelsLike: corrected.feelsLike,
        weathercode: data.current_weather.weathercode,
        humidity: data.hourly?.relativehumidity_2m?.[0] || 75,
        windspeed: data.current_weather.windspeed,
        precipitation: data.hourly?.precipitation_probability?.[0] || 0,
        isDay: data.current_weather.is_day,
        time: data.current_weather.time,
      });
    } catch (error) {
      setWeather({
        temperature: 26,
        feelsLike: 28,
        weathercode: 2,
        humidity: 75,
        windspeed: 8,
        precipitation: 20,
        isDay: 1,
        time: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-800/80 animate-pulse">
        <div className="w-4 h-4 bg-gray-700 rounded"></div>
        <div className="w-6 h-4 bg-gray-700 rounded"></div>
      </button>
    );
  }

  if (!weather) return null;

  const weatherIcon = weatherIcons[weather.weathercode] || { icon: '☁️', color: 'text-gray-400' };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-900/90 border border-gray-700 hover:border-blue-500 transition-all hover:scale-105 active:scale-95 group shadow-lg"
        style={{
          background: 'linear-gradient(145deg, #1e293b 0%, #111827 100%)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}
        aria-label="Ver clima actual"
      >
        {weather.precipitation > 30 && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        )}
        
        <div className={`text-lg ${weatherIcon.color}`}>
          {weatherIcon.icon}
        </div>
        
        <div className="flex items-center space-x-1">
          <Thermometer className="w-3.5 h-3.5 text-red-400" />
          <span className="text-sm font-bold text-white">
            {Math.round(weather.temperature)}°C
          </span>
        </div>
        
        <Info className="w-3 h-3 text-gray-400 group-hover:text-blue-400 transition-colors" />
      </button>

      {showModal && weather && (
        <WeatherModal 
          weather={weather}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}