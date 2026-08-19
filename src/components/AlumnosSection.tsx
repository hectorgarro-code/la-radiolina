import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Play, Pause, Award, Sparkles, Filter, Youtube } from 'lucide-react';

export const AlumnosSection: React.FC = () => {
  const { alumnos } = useAppContext();
  const [selectedTag, setSelectedTag] = useState<string>('Todos');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const tagsList = ['Todos', 'Guitarra', 'Batería', 'Piano', 'Ukelele', 'Solo', 'Groove'];

  const filteredAlumnos = alumnos.filter(item => {
    if (selectedTag === 'Todos') return true;
    return (
      item.instrumento.toLowerCase().includes(selectedTag.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(selectedTag.toLowerCase()))
    );
  });

  const togglePlayAudio = (id: string) => {
    if (playingId === id) {
      if (oscRef.current) {
        try { oscRef.current.stop(); } catch(e){}
      }
      setPlayingId(null);
      return;
    }

    if (oscRef.current) {
      try { oscRef.current.stop(); } catch(e){}
    }

    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, audioCtxRef.current.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    osc.start();

    oscRef.current = osc;
    setPlayingId(id);
  };

  return (
    <section id="alumnos" className="py-20 bg-[#0d1117] border-t border-[#21262d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            Producción en el Estudio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Alumnos en Acción
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Grabaciones reales de las clases en La Radiolina. Desde los primeros acordes hasta maquetas completas.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs text-gray-500 flex items-center gap-1 mr-2 font-mono">
            <Filter className="w-3.5 h-3.5" /> Filtrar por:
          </span>
          {tagsList.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedTag === tag
                  ? 'bg-[#f59e0b] text-black shadow-md shadow-[#f59e0b]/20 font-bold'
                  : 'bg-[#161b22] text-gray-300 border border-[#21262d] hover:border-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Alumnos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAlumnos.map((alumno) => {
            const isThisPlaying = playingId === alumno.id;
            return (
              <div
                key={alumno.id}
                className="bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden hover:border-[#f59e0b]/50 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Media Banner */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={alumno.imagenUrl}
                      alt={alumno.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/40 to-transparent"></div>

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => togglePlayAudio(alumno.id)}
                      className={`absolute inset-0 m-auto w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                        isThisPlaying
                          ? 'bg-[#ff6b4a] text-white scale-110'
                          : 'bg-[#f59e0b] text-black hover:scale-110'
                      }`}
                      aria-label="Reproducir grabación"
                    >
                      {isThisPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>

                    <div className="absolute top-3 left-3 bg-[#0d1117]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#21262d] text-[11px] text-gray-300 font-medium">
                      {alumno.instrumento}
                    </div>

                    <div className="absolute bottom-2 right-3 text-[11px] font-mono text-[#f59e0b] bg-black/60 px-2 py-0.5 rounded">
                      {alumno.duracion}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#f59e0b]">{alumno.nombre}</span>
                      <span className="text-[10px] text-gray-500">{alumno.fecha}</span>
                    </div>

                    <h3 className="font-bold text-white text-base leading-snug group-hover:text-[#f59e0b] transition-colors">
                      {alumno.titulo}
                    </h3>

                    <p className="text-xs text-gray-400 leading-relaxed font-light">
                      {alumno.descripcion}
                    </p>

                    {alumno.youtubeUrl && (
                      <div className="pt-1">
                        <a
                          href={alumno.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Youtube className="w-4 h-4 text-red-500" />
                          <span>Ver en YouTube</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Tags */}
                <div className="p-5 pt-0 flex flex-wrap gap-1.5">
                  {alumno.tags.map(t => (
                    <span key={t} className="text-[10px] bg-[#0d1117] border border-[#21262d] text-gray-400 px-2 py-0.5 rounded-md">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout */}
        <div className="mt-12 bg-[#161b22] border border-[#21262d] rounded-2xl p-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f59e0b]" /> ¿Querés grabar tu propio tema en el estudio?
            </h4>
            <p className="text-xs text-gray-400">Todas las clases incluyen sesiones de prueba con micros y pistas.</p>
          </div>
          <a
            href="#agendar"
            className="bg-[#f59e0b] hover:bg-amber-400 text-black text-xs font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
          >
            Quiero Probar
          </a>
        </div>

      </div>
    </section>
  );
};
