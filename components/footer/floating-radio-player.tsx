import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';

export default function FloatingRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    updateVolumeFromTouch(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    updateVolumeFromTouch(e);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    updateVolumeFromMouse(e);
    
    document.addEventListener('mousemove', handleMouseMove as EventListener, { passive: false });
    document.addEventListener('mouseup', handleMouseUp, { passive: false });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updateVolumeFromMouse(e);
  };

  const handleMouseUp = (e?: MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove as EventListener);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const updateVolumeFromMouse = (e: MouseEvent | React.MouseEvent) => {
    if (!dialRef.current) return;
    
    const dial = dialRef.current;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
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

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        onContextMenu={(e) => e.preventDefault()}
      />

      <div 
        className="fixed bottom-28 right-4 z-[9999] md:bottom-8"
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Mensaje temporal */}
        {showMessage && (
          <div className="absolute bottom-16 right-0 bg-gradient-to-r from-cyan-500/90 to-purple-500/90 backdrop-blur-md rounded-lg px-4 py-2 shadow-xl border border-cyan-400/30 animate-fade-in-out whitespace-nowrap">
            <p className="text-white text-sm font-bold tracking-wide">
              🎧 Escucha aquí Sopetrán Stereo
            </p>
          </div>
        )}

        {/* Botón principal futurista */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/43 to-purple-500/43 rounded-full blur-md opacity-50 group-hover:opacity-65 transition-opacity" />
          
          <button
            onClick={handleExpand}
            className="relative w-12 h-12 bg-gray-900/90 backdrop-blur-md border border-cyan-400/22 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 hover:border-cyan-400/43 hover:shadow-cyan-400/14"
            aria-label="Sopetrán Estéreo"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <Radio className="w-5 h-5 text-cyan-300" strokeWidth={2.5} />
            
            {isPlaying && (
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse ring-1 ring-white" />
            )}
          </button>

          {isPlaying && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 rounded-full border border-green-400/50 animate-ping" />
            </div>
          )}
        </div>

        {/* Panel expandido futurista compacto */}
        {isExpanded && (
          <div 
            className="absolute bottom-14 -right-1 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-cyan-400/22 p-3 w-56 animate-slide-up-futurist neon-glow"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/14 via-purple-500/11 to-cyan-500/14 blur-sm -z-10 neon-inner" />
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-400/29 via-purple-500/22 to-cyan-400/29 blur-lg opacity-43 -z-20 animate-pulse-slow" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/22 neon-icon">
                  <Radio className="w-3 h-3 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xs text-cyan-100 uppercase tracking-wider neon-text">SOPETRÁN ESTÉREO</h3>
                  <p className="text-[10px] text-cyan-400/80 font-mono">
                    {isPlaying ? '● EN VIVO' : '○ STANDBY'}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-center mb-2">
                  <p className="text-cyan-300 text-[10px] uppercase tracking-widest font-mono mb-1">
                    {isPlaying ? 'TRANSMITIENDO' : 'LISTO'}
                  </p>
                  <p className="text-cyan-400 text-lg font-mono font-bold neon-text">
                    {Math.round(volume * 100)}<span className="text-cyan-400/60 text-sm">%</span>
                  </p>
                </div>

                <div className="relative flex justify-center items-center">
                  <div 
                    ref={dialRef}
                    className="relative w-16 h-16 bg-gray-800/80 rounded-full border border-cyan-400/22 shadow-inner cursor-pointer select-none touch-none dial-container"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: 'none', userSelect: 'none' }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900" />
                    <div className="absolute inset-1 rounded-full border border-cyan-400/14" />
                    
                    {[0, 90, 180, 270].map((angle) => (
                      <div
                        key={angle}
                        className="absolute w-[1px] h-1 bg-cyan-400/29"
                        style={{
                          left: '50%',
                          top: '15%',
                          transform: `translateX(-50%) rotate(${angle}deg)`,
                          transformOrigin: '50% 150%'
                        }}
                      />
                    ))}
                    
                    <div
                      className="absolute w-4 h-4 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full border border-cyan-300 shadow-lg cursor-grab active:cursor-grabbing z-10 neon-knob"
                      style={{
                        left: '50%',
                        top: '12%',
                        transform: `translateX(-50%) rotate(${knobRotation}deg)`,
                        transformOrigin: '50% 150%'
                      }}
                      draggable="false"
                      onDragStart={(e) => e.preventDefault()}
                    >
                      <div className="absolute inset-[2px] bg-cyan-300/20 rounded-full" />
                      <div className="absolute inset-0 rounded-full bg-cyan-400/14 blur-[1px]" />
                    </div>
                    
                    <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-cyan-400/43" />
                  </div>
                </div>

                <div className="text-center mt-1">
                  <p className="text-cyan-400/60 text-[10px] font-mono">
                    GIRAR PARA VOLUMEN
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={toggleMute}
                  className={`flex-1 rounded-lg p-2 transition-all duration-300 flex flex-col items-center justify-center border neon-button ${
                    isMuted || volume === 0 
                      ? 'bg-red-500/20 border-red-400/36 text-red-400 shadow-red-400/14' 
                      : 'bg-cyan-500/10 border-cyan-400/29 text-cyan-400 hover:bg-cyan-500/20 shadow-cyan-400/14'
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

                <button
                  onClick={togglePlay}
                  className={`flex-1 rounded-lg p-2 transition-all duration-300 flex items-center justify-center gap-1 border neon-button ${
                    isPlaying 
                      ? 'bg-purple-500/10 border-purple-400/29 text-purple-400 hover:bg-purple-500/20 shadow-purple-400/14' 
                      : 'bg-green-500/10 border-green-400/29 text-green-400 hover:bg-green-500/20 shadow-green-400/14'
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

              <div className="text-center mt-2 pt-2 border-t border-cyan-400/14">
                <p className="text-cyan-400/80 text-[11px] font-mono uppercase tracking-widest neon-text">
                  24/7 • SOPETRÁN
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

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

   @keyframes fade-in-out {
      0% {
        opacity: 0;
        transform: translateY(10px) scale(1);
      }
      10% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      15% {
        opacity: 1;
        transform: translateY(0) scale(1.18);
      }
      30% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      45% {
        opacity: 1;
        transform: translateY(0) scale(1.15);
      }
      60% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      75% {
        opacity: 1;
        transform: translateY(0) scale(1.09);
      }
      90% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-5px) scale(1);
      }
    }
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.43;
          }
          50% {
            opacity: 0.58;
          }
        }

        @keyframes subtle-glow {
          0%, 100% {
            box-shadow: 0 0 14px rgba(34, 211, 238, 0.22),
                       0 0 29px rgba(34, 211, 238, 0.14),
                       0 0 43px rgba(34, 211, 238, 0.07);
          }
          50% {
            box-shadow: 0 0 18px rgba(34, 211, 238, 0.29),
                       0 0 36px rgba(34, 211, 238, 0.22),
                       0 0 54px rgba(34, 211, 238, 0.14);
          }
        }

        @keyframes inner-glow {
          0%, 100% {
            opacity: 0.22;
          }
          50% {
            opacity: 0.36;
          }
        }

        @keyframes knob-glow {
          0%, 100% {
            filter: drop-shadow(0 0 1px rgba(34, 211, 238, 0.43));
          }
          50% {
            filter: drop-shadow(0 0 3px rgba(34, 211, 238, 0.68))
                    drop-shadow(0 0 6px rgba(168, 85, 247, 0.39));
          }
        }

        .animate-slide-up-futurist {
          animation: slide-up-futurist 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-fade-in-out {
          animation: fade-in-out 2.1s ease-in-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .neon-glow {
          animation: subtle-glow 4s ease-in-out infinite;
          border: 1px solid rgba(34, 211, 238, 0.29) !important;
        }

        .neon-inner {
          animation: inner-glow 3s ease-in-out infinite;
        }

        .neon-knob {
          animation: knob-glow 2s ease-in-out infinite;
        }

        .neon-text {
          text-shadow: 0 0 7px rgba(34, 211, 238, 0.36),
                      0 0 14px rgba(34, 211, 238, 0.22);
        }

        .neon-icon {
          filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.43));
        }

        .neon-button {
          transition: all 0.3s ease;
          box-shadow: 0 0 7px rgba(34, 211, 238, 0.14);
        }

        .neon-button:hover {
          box-shadow: 0 0 11px rgba(34, 211, 238, 0.29),
                     0 0 18px rgba(34, 211, 238, 0.14);
        }

        .dial-container {
          box-shadow: inset 0 0 14px rgba(0, 0, 0, 0.5),
                     0 0 11px rgba(34, 211, 238, 0.14);
        }
      `}</style>
    </>
  );
}