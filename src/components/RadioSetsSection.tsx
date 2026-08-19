import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Disc, Play, Pause, Radio, Volume2, Youtube } from 'lucide-react';

const getYouTubeEmbedUrl = (url?: string): string | null => {
  if (!url) return null;
  try {
    if (url.includes('list=')) {
      const listMatch = url.match(/[?&]list=([^&]+)/);
      if (listMatch && listMatch[1]) {
        return `https://www.youtube.com/embed/videoseries?list=${listMatch[1]}&autoplay=1&enablejsapi=1`;
      }
    }
    const videoMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (videoMatch && videoMatch[1]) {
      return `https://www.youtube.com/embed/${videoMatch[1]}?autoplay=1&enablejsapi=1`;
    }
  } catch (e) {
    console.error('Error parsing YouTube URL:', e);
  }
  return null;
};

export const RadioSetsSection: React.FC = () => {
  const { radioSets } = useAppContext();
  const [activeSetId, setActiveSetId] = useState<string>(radioSets[0]?.id || '1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscsRef = useRef<OscillatorNode[]>([]);

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

    freqs.forEach((f, idx) => {
      if (!audioCtxRef.current) return;
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      activeOscsRef.current.push(osc);
    });

    setIsPlaying(true);
  };

  const handleSelectSet = (setObj: typeof radioSets[0]) => {
    setActiveSetId(setObj.id);
    if (isPlaying) {
      if (!setObj.youtubeUrl) {
        playSetAudio(setObj.freqsAudio || [220, 330, 440]);
      }
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      if (!activeSet.youtubeUrl) {
        playSetAudio(activeSet.freqsAudio || [220, 330, 440]);
      } else {
        setIsPlaying(true);
      }
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
        </div>

        {/* Player Vinyl Unit */}
        <div className="max-w-4xl mx-auto bg-[#161b22] border-2 border-[#21262d] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            
            {/* Vinyl Image Animation */}
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

            {/* Set Info & Playback */}
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

              {/* Play Control */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                <button
                  onClick={toggleAudio}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#f59e0b] to-[#ff6b4a] text-black font-extrabold px-8 py-3.5 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  <span>{isPlaying ? 'Pausar Mezcla' : 'Reproducir Mezcla'}</span>
                </button>

                {activeSet.youtubeUrl && (
                  <a
                    href={activeSet.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 font-bold px-5 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                    title="Ver sesión completa en YouTube"
                  >
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>Ver en YouTube</span>
                  </a>
                )}

                <div className="text-xs font-mono text-gray-400 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#f59e0b]" />
                  <span>Duración: {activeSet.duracion}</span>
                </div>
              </div>
            </div>

            {/* Hidden Audio Player for YouTube Sessions */}
            {isPlaying && getYouTubeEmbedUrl(activeSet.youtubeUrl) && (
              <iframe
                src={getYouTubeEmbedUrl(activeSet.youtubeUrl)!}
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
