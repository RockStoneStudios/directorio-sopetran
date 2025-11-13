'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';

export default function FloatingRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error('Error al reproducir:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="https://radio25.virtualtronics.com:20029/;"
        preload="none"
      />

      {/* Floating Player */}
      <div className="fixed bottom-24 right-4 z-[9998] md:bottom-6">
        {/* Botón principal */}
        <div className="relative group">
          {/* Sombra animada */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
          
          {/* Botón */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white dark:ring-gray-900"
            aria-label="Radio Sopetrán"
          >
            <Radio className="w-7 h-7 text-white" strokeWidth={2.5} />
            
            {/* Indicador de reproducción */}
            {isPlaying && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse ring-2 ring-white dark:ring-gray-900" />
            )}
          </button>

          {/* Ondas de sonido animadas */}
          {isPlaying && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/50 animate-ping" />
              <div className="absolute inset-0 rounded-full border-2 border-pink-500/50 animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          )}
        </div>

        {/* Panel expandido */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 w-64 animate-slide-up">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Radio className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  Radio Sopetrán
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isPlaying ? '🔴 En vivo' : 'Desconectado'}
                </p>
              </div>
            </div>

            {/* Controles */}
            <div className="space-y-3">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 ml-1" />
                    <span>Reproducir</span>
                  </>
                )}
              </button>

              {/* Control de volumen */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Info adicional */}
              <div className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                Transmisión en vivo 24/7
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Estilos para el slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9333ea, #ec4899);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9333ea, #ec4899);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}