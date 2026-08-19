import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Disc, 
  Play, 
  Pause, 
  Radio, 
  Volume2, 
  VolumeX, 
  Youtube, 
  SkipBack, 
  SkipForward, 
  RotateCcw,
  Clock
} from 'lucide-react';

const formatSeconds = (sec: number): string => {
  const mins = Math.floor(sec / 60);
  const secs = Math.floor(sec % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const parseDurationToSeconds = (durStr?: string): number => {
  if (!durStr) return 2700;
  const match = durStr.match(/(\d+)\s*min/i);
  if (match && match[1]) {
    return parseInt(match[1], 10) * 60;
  }
  return 2700;
};

const getYouTubeEmbedUrl = (url?: string, startSeconds: number = 0): string | null => {
  if (!url) return null;
  try {
    let baseUrl = '';
    if (url.includes('list=')) {
      const listMatch = url.match(/[?&]list=([^&]+)/);
      if (listMatch && listMatch[1]) {
        baseUrl = `https://www.youtube.com/embed/videoseries?list=${listMatch[1]}`;
      }
    } else {
      const videoMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (videoMatch && videoMatch[1]) {
        baseUrl = `https://www.youtube.com/embed/${videoMatch[1]}`;
      }
    }
    if (baseUrl) {
      const startParam = startSeconds > 0 ? `&start=${Math.floor(startSeconds)}` : '';
      return `${baseUrl}?autoplay=1&enablejsapi=1${startParam}`;
    }
  } catch (e) {
    console.error('Error parsing YouTube URL:', e);
  }
  return null;
};

export const RadioSetsSection: React.FC = () => {
  const { radioSets } = useAppContext();

  // Load Saved Player State from LocalStorage
  const [activeSetId, setActiveSetId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('radiolina_set_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.setId && radioSets.some(s => s.id === parsed.setId)) {
          return parsed.setId;
        }
      }
    } catch(e){}
    return radioSets[0]?.id || '1';
  });

  const [currentTime, setCurrentTime] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('radiolina_set_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.currentTime === 'number' && parsed.currentTime > 0) {
          return parsed.currentTime;
        }
      }
    } catch(e){}
    return 0;
  });

  const [seekStartTime, setSeekStartTime] = useState<number>(currentTime);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const activeSet = radioSets.find(s => s.id === activeSetId) || radioSets[0] || {
    id: '1',
    titulo: 'Selección de Música',
    genero: 'Rock & Blues',
    frecuencia: '91.3 FM',
    descripcion: 'Sets especiales curados por Gastón',
    duracion: '45 min',
    artistas: ['Artista 1'],
    portadaUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    freqsAudio: [220, 330, 440]
  };

  const totalDuration = parseDurationToSeconds(activeSet.duracion);

  // Save Player State to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('radiolina_set_state', JSON.stringify({
        setId: activeSetId,
        currentTime,
        volume
      }));
    } catch(e){}
  }, [activeSetId, currentTime, volume]);

  // Timer Effect when Playing (Ticks every second without triggering iframe re-mount)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  const stopAudio = () => {
    activeOscsRef.current.forEach(osc => {
      try { osc.stop(); } catch(e){}
    });
    activeOscsRef.current = [];
    setIsPlaying(false);
  };

  const playSetAudio = (freqs: number[]) => {
    stopAudio();

    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const masterGain = audioCtxRef.current.createGain();
    masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.05, audioCtxRef.current.currentTime);
    masterGain.connect(audioCtxRef.current.destination);
    gainNodeRef.current = masterGain;

    freqs.forEach((f, idx) => {
      if (!audioCtxRef.current) return;
      const osc = audioCtxRef.current.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, audioCtxRef.current.currentTime);
      osc.connect(masterGain);
      osc.start();
      activeOscsRef.current.push(osc);
    });

    setIsPlaying(true);
  };

  const handleSelectSet = (setObj: typeof radioSets[0]) => {
    if (setObj.id !== activeSetId) {
      setActiveSetId(setObj.id);
      setCurrentTime(0);
      setSeekStartTime(0);
      if (isPlaying) {
        if (!setObj.youtubeUrl) {
          playSetAudio(setObj.freqsAudio || [220, 330, 440]);
        }
      }
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      setSeekStartTime(currentTime);
      if (!activeSet.youtubeUrl) {
        playSetAudio(activeSet.freqsAudio || [220, 330, 440]);
      } else {
        setIsPlaying(true);
      }
    }
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    setSeekStartTime(newTime);
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime(prev => {
      const nextTime = Math.max(0, Math.min(totalDuration, prev + seconds));
      setSeekStartTime(nextTime);
      return nextTime;
    });
  };

  const handleResetTime = () => {
    setCurrentTime(0);
    setSeekStartTime(0);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : newVol * 0.05, audioCtxRef.current.currentTime);
    }
  };

  return (
    <section id="radiosets" className="py-20 bg-[#0d1117] border-t border-[#21262d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Radio className="w-3.5 h-3.5" />
            Mezclas & Selección del Profe
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Radio Sets & Dj Melómano
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Sesiones temáticas curadas por Gastón con grandes clásicos, bandas ocultas e historia de cada género.
          </p>

          {/* Persistent State Saved Notification */}
          {currentTime > 0 && !isPlaying && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] text-xs font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Guardado en memoria: Minuto {formatSeconds(currentTime)}</span>
              <button 
                onClick={toggleAudio} 
                className="ml-2 underline font-bold hover:text-white"
              >
                Continuar
              </button>
            </div>
          )}
        </div>

        {/* Original Player Unit with Spinning Vinyl */}
        <div className="max-w-4xl mx-auto bg-[#161b22] border-2 border-[#21262d] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            
            {/* Original Vinyl Spinning Animation */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-56 h-56 rounded-full bg-black p-2 shadow-2xl border-4 border-[#21262d] flex items-center justify-center group">
                <div className="absolute inset-2 rounded-full border border-gray-800 opacity-60"></div>
                <div className="absolute inset-6 rounded-full border border-gray-800 opacity-40"></div>
                <div className="absolute inset-10 rounded-full border border-gray-800 opacity-30"></div>

                <img
                  src={activeSet.portadaUrl}
                  alt={activeSet.titulo}
                  className={`w-28 h-28 rounded-full object-cover shadow-inner transition-transform duration-700 ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '6s' }}
                />

                <div className="absolute w-6 h-6 rounded-full bg-[#0d1117] border-2 border-gray-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>
            </div>

            {/* Set Info & Controls */}
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-mono font-bold text-[#f59e0b] bg-[#0d1117] px-2.5 py-1 rounded-md border border-[#21262d]">
                  {activeSet.frecuencia}
                </span>
                <span className="text-xs text-purple-400 font-semibold">{activeSet.genero}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeSet.titulo}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {activeSet.descripcion}
              </p>

              {/* Artists list */}
              <div className="pt-1 flex flex-wrap justify-center md:justify-start gap-2">
                {activeSet.artistas.map(art => (
                  <span key={art} className="text-[11px] bg-[#0d1117] text-gray-400 px-2.5 py-1 rounded-lg border border-[#21262d]">
                    🎵 {art}
                  </span>
                ))}
              </div>

              {/* Interactive Timeline & Scrubber */}
              <div className="pt-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400 px-1">
                  <span className="text-[#f59e0b] font-bold">{formatSeconds(currentTime)}</span>
                  <span>{formatSeconds(totalDuration)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={totalDuration}
                  value={currentTime}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  className="w-full h-2 bg-[#0d1117] border border-[#21262d] rounded-lg appearance-none cursor-pointer accent-[#f59e0b]"
                />
              </div>

              {/* Playback Controls */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <button
                  type="button"
                  onClick={handleResetTime}
                  className="p-2.5 bg-[#0d1117] hover:bg-gray-800 border border-[#21262d] rounded-xl text-gray-300 transition-colors"
                  title="Reiniciar desde el inicio (00:00)"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSkip(-10)}
                  className="p-2.5 bg-[#0d1117] hover:bg-gray-800 border border-[#21262d] rounded-xl text-gray-300 transition-colors flex items-center gap-1 text-xs font-mono"
                  title="Retroceder 10 segundos"
                >
                  <SkipBack className="w-4 h-4" />
                  <span>-10s</span>
                </button>

                <button
                  type="button"
                  onClick={toggleAudio}
                  className="bg-gradient-to-r from-[#f59e0b] to-[#ff6b4a] text-black font-extrabold px-6 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 text-xs"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  <span>{isPlaying ? 'Pausar Mezcla' : 'Reproducir Mezcla'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSkip(10)}
                  className="p-2.5 bg-[#0d1117] hover:bg-gray-800 border border-[#21262d] rounded-xl text-gray-300 transition-colors flex items-center gap-1 text-xs font-mono"
                  title="Adelantar 10 segundos"
                >
                  <span>+10s</span>
                  <SkipForward className="w-4 h-4" />
                </button>

                {activeSet.youtubeUrl && (
                  <a
                    href={activeSet.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs"
                    title="Ver sesión completa en YouTube"
                  >
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>YouTube</span>
                  </a>
                )}

                {/* Volume Control */}
                <div className="flex items-center gap-2 bg-[#0d1117] border border-[#21262d] px-3 py-1.5 rounded-xl text-xs">
                  <button 
                    type="button" 
                    onClick={() => setIsMuted(!isMuted)} 
                    className="text-gray-400 hover:text-white"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#f59e0b]" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-16 h-1.5 bg-[#161b22] border border-[#21262d] rounded-lg appearance-none cursor-pointer accent-[#f59e0b]"
                    title="Control de volumen"
                  />
                </div>
              </div>

            </div>

            {/* Hidden Audio Player for YouTube Sessions (re-mounts ONLY on seekStartTime change) */}
            {isPlaying && getYouTubeEmbedUrl(activeSet.youtubeUrl, seekStartTime) && (
              <iframe
                key={`${activeSet.id}_${Math.floor(seekStartTime)}`}
                src={getYouTubeEmbedUrl(activeSet.youtubeUrl, seekStartTime)!}
                allow="autoplay"
                className="hidden"
                aria-hidden="true"
                title="YouTube Audio Player"
              />
            )}

          </div>

          {/* Sets Selection List */}
          <div className="mt-8 pt-6 border-t border-[#21262d] grid sm:grid-cols-3 gap-3">
            {radioSets.map((setObj) => {
              const isSelected = setObj.id === activeSetId;
              return (
                <button
                  key={setObj.id}
                  onClick={() => handleSelectSet(setObj)}
                  className={`text-left p-3.5 rounded-xl border text-xs transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#0d1117] border-[#f59e0b] text-white shadow-md'
                      : 'bg-[#0d1117]/60 border-[#21262d] text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <Disc className={`w-5 h-5 shrink-0 ${isSelected ? 'text-[#f59e0b] animate-pulse' : 'text-gray-500'}`} />
                  <div className="truncate flex-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-bold text-white truncate">{setObj.titulo}</span>
                      {setObj.youtubeUrl && (
                        <Youtube className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      )}
                    </div>
                    <div className="text-[10px] text-gray-500">{setObj.genero}</div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
