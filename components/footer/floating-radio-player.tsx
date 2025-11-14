// components/radio/radio-player-wrapper.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';

export default function FloatingRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);

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

  // Control táctil del dial
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateVolumeFromTouch(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    updateVolumeFromTouch(e);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updateVolumeFromTouch = (e: React.TouchEvent) => {
    if (!dialRef.current) return;
    
    const dial = dialRef.current;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const touch = e.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    
    const deltaX = touchX - centerX;
    const deltaY = centerY - touchY;
    
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    
    let newVolume = angle / 270;
    newVolume = Math.max(0, Math.min(1, newVolume));
    
    setVolume(newVolume);
  };

  // Control con mouse - CORREGIDO
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateVolumeFromMouse(e);
    document.addEventListener('mousemove', handleMouseMove as EventListener);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    updateVolumeFromMouse(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove as EventListener);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Función corregida para manejar ambos tipos de eventos
  const updateVolumeFromMouse = (e: MouseEvent | React.MouseEvent) => {
    if (!dialRef.current) return;
    
    const dial = dialRef.current;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Manejar tanto MouseEvent como React.MouseEvent
    const clientX = 'clientX' in e ? e.clientX : 0;
    const clientY = 'clientY' in e ? e.clientY : 0;
    
    const deltaX = clientX - centerX;
    const deltaY = centerY - clientY;
    
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    
    let newVolume = angle / 270;
    newVolume = Math.max(0, Math.min(1, newVolume));
    
    setVolume(newVolume);
  };

  const handleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    
    if (newExpandedState && !isPlaying) {
      setTimeout(() => {
        togglePlay();
      }, 300);
    }
  };

  const knobRotation = volume * 270;

  return (
    <>
      <audio
        ref={audioRef}
        src="https://radio25.virtualtronics.com:20029/;"
        preload="none"
      />

      {/* POSICIÓN MÁS ALTA - 100px desde abajo en lugar de 80px */}
      <div className="fixed bottom-28 right-4 z-[9999] md:bottom-8">
        {/* Botón principal futurista */}
        <div className="relative group">
          {/* Efecto neón sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/60 to-purple-500/60 rounded-full blur-md opacity-70 group-hover:opacity-90 transition-opacity" />
          
          <button
            onClick={handleExpand}
            className="relative w-12 h-12 bg-gray-900/90 backdrop-blur-md border border-cyan-400/30 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-cyan-400/20"
            aria-label="Sopetrán Estéreo"
          >
            <Radio className="w-5 h-5 text-cyan-300" strokeWidth={2.5} />
            
            {isPlaying && (
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse ring-1 ring-white" />
            )}
          </button>

          {isPlaying && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping" />
            </div>
          )}
        </div>

        {/* Panel expandido futurista compacto */}
        {isExpanded && (
          <div className="absolute bottom-14 -right-1 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-cyan-400/20 p-3 w-56 animate-slide-up-futurist">
            {/* Efecto de borde neón */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-xs -z-10" />
            
            {/* Header ultra compacto - NOMBRE CAMBIADO */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/30">
                <Radio className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xs text-cyan-100 uppercase tracking-wider">SOPETRÁN ESTÉREO</h3>
                <p className="text-[10px] text-cyan-400/80 font-mono">
                  {isPlaying ? '● EN VIVO' : '○ STANDBY'}
                </p>
              </div>
            </div>

            {/* Dial futurista compacto */}
            <div className="mb-3">
              <div className="text-center mb-2">
                <p className="text-cyan-300 text-[10px] uppercase tracking-widest font-mono mb-1">
                  {isPlaying ? 'TRANSMITIENDO' : 'LISTO'}
                </p>
                <p className="text-cyan-400 text-lg font-mono font-bold">
                  {Math.round(volume * 100)}<span className="text-cyan-400/60 text-sm">%</span>
                </p>
              </div>

              {/* Dial interactivo futurista */}
              <div className="relative flex justify-center items-center">
                <div 
                  ref={dialRef}
                  className="relative w-16 h-16 bg-gray-800/80 rounded-full border border-cyan-400/20 shadow-inner cursor-pointer"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Marcas del dial futuristas */}
                  <div className="absolute inset-1 rounded-full border border-cyan-400/10" />
                  
                  {/* Líneas guía */}
                  {[0, 90, 180, 270].map((angle) => (
                    <div
                      key={angle}
                      className="absolute w-[1px] h-1 bg-cyan-400/30"
                      style={{
                        left: '50%',
                        top: '15%',
                        transform: `translateX(-50%) rotate(${angle}deg)`,
                        transformOrigin: '50% 150%'
                      }}
                    />
                  ))}
                  
                  {/* Perilla indicadora futurista */}
                  <div
                    className="absolute w-4 h-4 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full border border-cyan-300/50 shadow-lg cursor-pointer z-10"
                    style={{
                      left: '50%',
                      top: '12%',
                      transform: `translateX(-50%) rotate(${knobRotation}deg)`,
                      transformOrigin: '50% 150%'
                    }}
                  >
                    <div className="absolute inset-[2px] bg-cyan-300/20 rounded-full" />
                  </div>
                  
                  {/* Punto central con glow */}
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow shadow-cyan-400/50" />
                </div>
              </div>

              {/* Indicador de uso minimalista */}
              <div className="text-center mt-1">
                <p className="text-cyan-400/60 text-[10px] font-mono">
                  GIRAR PARA VOLUMEN
                </p>
              </div>
            </div>

            {/* Controles inferiores futuristas */}
            <div className="flex gap-2">
              {/* Botón mute futurista */}
              <button
                onClick={toggleMute}
                className={`flex-1 rounded-lg p-2 transition-all duration-300 flex flex-col items-center justify-center border ${
                  isMuted || volume === 0 
                    ? 'bg-red-500/20 border-red-500/30 text-red-400' 
                    : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20'
                }`}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3 h-3" />
                ) : (
                  <Volume2 className="w-3 h-3" />
                )}
                <span className="text-[10px] mt-0.5 font-mono uppercase">
                  {isMuted ? 'SILENCIO' : 'VOLUMEN'}
                </span>
              </button>

              {/* Botón play/pause futurista */}
              <button
                onClick={togglePlay}
                className={`flex-1 rounded-lg p-2 transition-all duration-300 flex items-center justify-center gap-1 border ${
                  isPlaying 
                    ? 'bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20' 
                    : 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span className="text-[10px] font-mono uppercase">PAUSAR</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 ml-0.5" />
                    <span className="text-[10px] font-mono uppercase">PLAY</span>
                  </>
                )}
              </button>
            </div>

            {/* Footer futurista */}
            <div className="text-center mt-2 pt-2 border-t border-cyan-400/10">
              <p className="text-cyan-400/40 text-[10px] font-mono uppercase tracking-widest">
                24/7 • SOPETRÁN
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Estilos */}
      <style jsx>{`
        @keyframes slide-up-futurist {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-up-futurist {
          animation: slide-up-futurist 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </>
  );
}