import React, { useState, useRef, useEffect } from 'react';
import { 
  Radio, 
  Disc, 
  Sparkles, 
  Zap, 
  Guitar, 
  Drum, 
  Keyboard, 
  Mic, 
  Wind, 
  Sliders, 
  Sun, 
  Check, 
  Play, 
  Pause, 
  Menu, 
  X, 
  CircleCheck, 
  Armchair, 
  Umbrella, 
  MessageCircle, 
  Youtube, 
  Volume2,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dial Radio Audio Synthesizer State
  const [isPlaying, setIsPlaying] = useState(false);
  const [dialState, setDialState] = useState({
    freq: '88.5 FM',
    genre: 'Rock & Blues',
    instruments: 'Guitarra Eléctrica / Bajo / Batería',
    freqs: [330, 392, 493, 587]
  });

  const audioCtxRef = useRef(null);
  const activeNodesRef = useRef([]);

  // Quiz State
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({});

  // Booking Form State
  const [formInstrument, setFormInstrument] = useState('Guitarra');
  const [formLevel, setFormLevel] = useState('Desde cero');
  const [formMode, setFormMode] = useState('Ciclo Anual (Residente)');
  const [formMsg, setFormMsg] = useState('');

  const stopSound = () => {
    activeNodesRef.current.forEach((node) => {
      try {
        node.stop();
      } catch (e) {}
    });
    activeNodesRef.current = [];
    setIsPlaying(false);
  };

  const playSound = (frequenciesToPlay) => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    stopSound(); // Clear previous active oscillators

    const freqs = frequenciesToPlay || dialState.freqs;

    freqs.forEach((f, idx) => {
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtxRef.current.currentTime);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      activeNodesRef.current.push(osc);
    });

    setIsPlaying(true);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopSound();
    } else {
      playSound();
    }
  };

  const handleSetDial = (freq, genre, inst, freqs) => {
    setDialState({ freq: `${freq} FM`, genre, instruments: inst, freqs });
    if (isPlaying) {
      stopSound();
      playSound(freqs);
    }
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  const handleQuizStep = (step, val) => {
    const updated = { ...quizAnswers, [`step${step}`]: val };
    setQuizAnswers(updated);

    if (step === 1) {
      setQuizStep(2);
    } else if (step === 2) {
      setQuizStep(3);
    }
  };

  const getQuizResult = () => {
    if (quizAnswers.step1 === 'ritmo') {
      return {
        title: 'Batería & Percusión',
        desc: 'Tenés ritmo natural. En el estudio vas a coordinar y tocar bases sobre canciones reales desde la primera sesión.',
        icon: Drum
      };
    } else if (quizAnswers.step1 === 'armonia') {
      return {
        title: 'Piano / Teclado',
        desc: 'El piano te permite visualizar la música claramente, acompañar la voz y componer de forma fluida e intuitiva.',
        icon: Keyboard
      };
    } else if (quizAnswers.step1 === 'portatil') {
      return {
        title: 'Ukelele o Guitarra Criolla',
        desc: 'Amigables, versátiles y livianos. Ideales para tocar en el pinar, la playa o llevar a reuniones.',
        icon: Umbrella
      };
    } else {
      return {
        title: 'Guitarra Eléctrica / Bajo',
        desc: 'Potencia y energía pura. Vas a aprender solos, distorsión y el groove fundamental de las bandas.',
        icon: Guitar
      };
    }
  };

  const applyQuizToBooking = () => {
    const result = getQuizResult();
    setFormInstrument(result.title);
    scrollToSection('agendar');
  };

  const quickSelect = (instName) => {
    setFormInstrument(instName);
    scrollToSection('agendar');
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendWhatsApp = (e) => {
    e.preventDefault();
    const phone = "5491112345678";

    let text = `Hola! Vengo desde la página web de *La Radiolina* 📻🎶\n\n`;
    text += `Quisiera consultar por las clases:\n`;
    text += `🎸 *Instrumento:* ${formInstrument}\n`;
    text += `🎯 *Nivel:* ${formLevel}\n`;
    text += `📅 *Modalidad:* ${formMode}\n`;
    if (formMsg.trim()) text += `💬 *Mensaje:* ${formMsg}\n`;
    text += `\n¿Me podrías brindar información de horarios y disponibilidad? ¡Gracias!`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-[#0d1117] text-[#f0f6fc] font-sans antialiased selection:bg-[#f59e0b] selection:text-black min-h-screen">
      {/* Custom Keyframe Styles */}
      <style>{`
        .glass-nav {
          background: rgba(13, 17, 23, 0.9);
          backdrop-filter: blur(12px);
        }
        .hero-bg {
          background: linear-gradient(to bottom, rgba(13, 17, 23, 0.65), rgba(13, 17, 23, 1)), 
                      url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
        }
        @keyframes bounceEqualizer {
          0% { height: 15%; }
          100% { height: 100%; }
        }
        .equalizer-bar {
          animation: bounceEqualizer 1s infinite ease-in-out alternate;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-[#21262d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#ff6b4a] flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-[#f59e0b]/20">
              <Radio className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight block text-white">La Radiolina</span>
              <span className="text-xs text-[#8b949e] block -mt-1 font-medium">Costa del Este • Espacio Musical</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <a href="#dial" onClick={(e) => { e.preventDefault(); scrollToSection('dial'); }} className="hover:text-[#f59e0b] transition-colors flex items-center gap-1">
              <Disc className="w-4 h-4 text-[#f59e0b]" /> El Dial
            </a>
            <a href="#quiz" onClick={(e) => { e.preventDefault(); scrollToSection('quiz'); }} className="hover:text-[#f59e0b] transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#ff6b4a]" /> Quiz
            </a>
            <a href="#instrumentos" onClick={(e) => { e.preventDefault(); scrollToSection('instrumentos'); }} className="hover:text-[#f59e0b] transition-colors">Instrumentos</a>
            <a href="#planes" onClick={(e) => { e.preventDefault(); scrollToSection('planes'); }} className="hover:text-[#f59e0b] transition-colors">Planes y Verano</a>
            <a href="#youtube" onClick={(e) => { e.preventDefault(); scrollToSection('youtube'); }} className="hover:text-[#f59e0b] transition-colors">YouTube</a>
          </div>

          {/* Direct CTA */}
          <a href="#agendar" onClick={(e) => { e.preventDefault(); scrollToSection('agendar'); }} className="hidden sm:flex bg-gradient-to-r from-[#f59e0b] to-[#ff6b4a] text-black font-bold px-5 py-2.5 rounded-full text-sm hover:opacity-95 transition-all items-center gap-2 shadow-lg shadow-[#f59e0b]/10">
            <MessageCircle className="w-4 h-4" />
            <span>Agendar Clase</span>
          </a>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-gray-300 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#161b22] border-b border-[#21262d] px-6 py-5 space-y-4">
            <a href="#dial" onClick={(e) => { e.preventDefault(); scrollToSection('dial'); }} className="block text-gray-200 hover:text-[#f59e0b] font-medium flex items-center gap-2">
              <Disc className="w-4 h-4 text-[#f59e0b]" /> El Dial de Estilos
            </a>
            <a href="#quiz" onClick={(e) => { e.preventDefault(); scrollToSection('quiz'); }} className="block text-gray-200 hover:text-[#f59e0b] font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff6b4a]" /> Quiz de Instrumento
            </a>
            <a href="#instrumentos" onClick={(e) => { e.preventDefault(); scrollToSection('instrumentos'); }} className="block text-gray-200 hover:text-[#f59e0b] font-medium">Instrumentos</a>
            <a href="#planes" onClick={(e) => { e.preventDefault(); scrollToSection('planes'); }} className="block text-gray-200 hover:text-[#f59e0b] font-medium">Planes Anuales y Verano</a>
            <a href="#youtube" onClick={(e) => { e.preventDefault(); scrollToSection('youtube'); }} className="block text-gray-200 hover:text-[#f59e0b] font-medium">Canal de YouTube</a>
            <a href="#agendar" onClick={(e) => { e.preventDefault(); scrollToSection('agendar'); }} className="block w-full text-center bg-[#f59e0b] text-black font-bold py-3 rounded-xl mt-2 flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" /> Agendar por WhatsApp
            </a>
          </div>
        )}
      </nav>

      <section className="relative min-h-screen hero-bg flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-10 items-center">
          
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161b22]/90 border border-[#21262d] text-[#f59e0b] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping"></span>
              Clases 1 a 1 en Costa del Este
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Tocá la música que amás. <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-amber-200 to-[#ff6b4a]">
                Todos los instrumentos en un solo lugar.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl font-light leading-relaxed mx-auto md:mx-0">
              En <strong className="text-white">La Radiolina</strong> contás con un estudio totalmente equipado. Venís sin nada, elegís tu instrumento preferido y aprendés a tu propio ritmo con clases personalizadas.
            </p>

            {/* Badges */}
            <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3 text-xs font-medium text-gray-300">
              <div className="flex items-center gap-2 bg-[#161b22]/90 px-3.5 py-2 rounded-xl border border-[#21262d]">
                <Armchair className="w-4 h-4 text-[#f59e0b]" /> Estudio Equipado
              </div>
              <div className="flex items-center gap-2 bg-[#161b22]/90 px-3.5 py-2 rounded-xl border border-[#21262d]">
                <Guitar className="w-4 h-4 text-[#ff6b4a]" /> No traés instrumento
              </div>
              <div className="flex items-center gap-2 bg-[#161b22]/90 px-3.5 py-2 rounded-xl border border-[#21262d]">
                <Sun className="w-4 h-4 text-[#f59e0b]" /> Abierto todo el año + Verano
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <button onClick={() => scrollToSection('agendar')} className="w-full sm:w-auto text-center bg-gradient-to-r from-[#f59e0b] to-[#ff6b4a] text-black font-bold px-8 py-4 rounded-xl shadow-lg shadow-[#f59e0b]/20 hover:scale-[1.02] transition-transform">
                Agendar Clase de Prueba
              </button>
              <button onClick={() => scrollToSection('dial')} className="w-full sm:w-auto text-center bg-[#161b22] hover:bg-gray-800 border border-[#21262d] text-white font-semibold px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Radio className="w-4 h-4 text-[#f59e0b]" />
                <span>Probar El Dial Interactivo</span>
              </button>
            </div>
          </div>

          {/* Visual Hero Card */}
          <div className="md:col-span-5 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#f59e0b] to-[#ff6b4a] rounded-3xl blur-xl opacity-25"></div>
            <div className="relative bg-[#161b22] border border-[#21262d] rounded-3xl p-6 shadow-2xl">
              <div className="relative h-72 rounded-2xl overflow-hidden mb-5">
                <img 
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" 
                  alt="La Radiolina Espacio Musical" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 bg-[#0d1117]/90 backdrop-blur-md p-3 rounded-xl border border-[#21262d] flex items-center justify-between">
                  <div>
                    <h4 className="text-white text-xs font-bold">La Radiolina Studio</h4>
                    <p className="text-[11px] text-[#8b949e]">Sesiones 100% individuales</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    En Costa del Este
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <CircleCheck className="w-4 h-4 text-[#f59e0b]" />
                  <span>Guitarra, Piano, Bajo, Batería, Ukelele, Canto y Vientos</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <CircleCheck className="w-4 h-4 text-[#f59e0b]" />
                  <span>Para niños, jóvenes, adultos y residentes/vacacionantes</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="dial" className="py-20 bg-[#161b22]/50 border-t border-b border-[#21262d] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-widest block mb-2">Experiencia Interactiva</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Sintonizá "El Dial" de La Radiolina</h2>
            <p className="mt-3 text-gray-400 text-sm">Elegí una frecuencia para escuchar una muestra en vivo del estilo e instrumentos que vas a aprender.</p>
          </div>

          {/* Analog Radio Player */}
          <div className="max-w-3xl mx-auto bg-[#0d1117] border-2 border-[#21262d] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#21262d] pb-6">
              
              {/* Dial Frequencies */}
              <div className="w-full md:w-auto flex flex-wrap justify-center gap-2">
                <button 
                  onClick={() => handleSetDial('88.5', 'Rock & Blues', 'Guitarra Eléctrica / Bajo / Batería', [330, 392, 493, 587])} 
                  className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    dialState.freq === '88.5 FM' ? 'bg-[#f59e0b]/20 border-[#f59e0b] text-white' : 'bg-[#161b22] border-[#21262d] text-gray-200 hover:border-[#f59e0b]'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-[#f59e0b]" /> 88.5 FM - Rock
                </button>
                <button 
                  onClick={() => handleSetDial('94.1', 'Jazz & Bossa', 'Piano / Saxo / Bajos suaves', [261, 329, 392, 493])} 
                  className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    dialState.freq === '94.1 FM' ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-[#161b22] border-[#21262d] text-gray-200 hover:border-[#f59e0b]'
                  }`}
                >
                  <Disc className="w-3.5 h-3.5 text-cyan-400" /> 94.1 FM - Jazz
                </button>
                <button 
                  onClick={() => handleSetDial('102.7', 'Pop & Acústico', 'Guitarra Criolla / Ukelele / Canto', [293, 370, 440, 554])} 
                  className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    dialState.freq === '102.7 FM' ? 'bg-[#ff6b4a]/20 border-[#ff6b4a] text-white' : 'bg-[#161b22] border-[#21262d] text-gray-200 hover:border-[#f59e0b]'
                  }`}
                >
                  <Guitar className="w-3.5 h-3.5 text-[#ff6b4a]" /> 102.7 FM - Acústico
                </button>
                <button 
                  onClick={() => handleSetDial('106.3', 'Groove & Ritmo', 'Batería / Percusión / Bajo', [110, 146, 164, 220])} 
                  className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    dialState.freq === '106.3 FM' ? 'bg-purple-500/20 border-purple-400 text-white' : 'bg-[#161b22] border-[#21262d] text-gray-200 hover:border-[#f59e0b]'
                  }`}
                >
                  <Drum className="w-3.5 h-3.5 text-purple-400" /> 106.3 FM - Groove
                </button>
              </div>

              {/* Play/Stop Button */}
              <button 
                onClick={toggleAudio} 
                className="w-full md:w-auto bg-gradient-to-r from-[#f59e0b] to-[#ff6b4a] text-black font-extrabold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                <span>{isPlaying ? 'Pausar Muestra' : 'Escuchar Muestra'}</span>
              </button>
            </div>

            {/* Dial Screen */}
            <div className="mt-6 bg-[#161b22] rounded-2xl p-6 border border-[#21262d] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs text-[#f59e0b] font-mono uppercase tracking-widest flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`}></span>
                  Sintonizando: <span className="font-bold text-white">{dialState.freq}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mt-1">{dialState.genre}</h3>
                <p className="text-xs text-gray-400 mt-1">{dialState.instruments}</p>
              </div>

              {/* Equalizer Animation */}
              <div className="flex items-end gap-1.5 h-12 w-32 bg-[#0d1117]/80 p-2 rounded-lg border border-[#21262d] justify-center">
                <div className={`w-2 bg-[#f59e0b] rounded-full ${isPlaying ? 'equalizer-bar' : 'h-3'}`} style={{ animationDuration: '0.6s' }}></div>
                <div className={`w-2 bg-[#ff6b4a] rounded-full ${isPlaying ? 'equalizer-bar' : 'h-5'}`} style={{ animationDuration: '0.9s' }}></div>
                <div className={`w-2 bg-cyan-400 rounded-full ${isPlaying ? 'equalizer-bar' : 'h-2'}`} style={{ animationDuration: '0.4s' }}></div>
                <div className={`w-2 bg-purple-400 rounded-full ${isPlaying ? 'equalizer-bar' : 'h-4'}`} style={{ animationDuration: '0.7s' }}></div>
                <div className={`w-2 bg-emerald-400 rounded-full ${isPlaying ? 'equalizer-bar' : 'h-2.5'}`} style={{ animationDuration: '0.5s' }}></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="quiz" className="py-20 bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#ff6b4a] uppercase tracking-widest block mb-2">¿Indeciso/a?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Descubrí tu Instrumento Ideal</h2>
            <p className="mt-2 text-gray-400 text-sm">Respondé 2 preguntas rápidas y te decimos con cuál empezar en La Radiolina.</p>
          </div>

          <div className="bg-[#161b22] border border-[#21262d] rounded-3xl p-6 sm:p-10 shadow-xl">
            
            {/* Step 1 */}
            {quizStep === 1 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#f59e0b]">Paso 1 de 2</span>
                <h3 className="text-xl font-bold text-white">¿Qué sensación buscás al hacer música?</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button onClick={() => handleQuizStep(1, 'ritmo')} className="text-left bg-[#0d1117] p-4 rounded-xl border border-[#21262d] hover:border-[#f59e0b] text-gray-200 text-sm font-medium transition-all">
                    🥁 Moverme, descargar energía y marcar el ritmo
                  </button>
                  <button onClick={() => handleQuizStep(1, 'armonia')} className="text-left bg-[#0d1117] p-4 rounded-xl border border-[#21262d] hover:border-[#f59e0b] text-gray-200 text-sm font-medium transition-all">
                    🎹 Relajarme, crear melodías y cantar mis canciones
                  </button>
                  <button onClick={() => handleQuizStep(1, 'potencia')} className="text-left bg-[#0d1117] p-4 rounded-xl border border-[#21262d] hover:border-[#f59e0b] text-gray-200 text-sm font-medium transition-all">
                    🎸 Hacer solos, ponerle distorsión o tocar con amigos
                  </button>
                  <button onClick={() => handleQuizStep(1, 'portatil')} className="text-left bg-[#0d1117] p-4 rounded-xl border border-[#21262d] hover:border-[#f59e0b] text-gray-200 text-sm font-medium transition-all">
                    🏖️ Algo fácil, liviano y llevarlo a la playa/reuniones
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {quizStep === 2 && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#f59e0b]">Paso 2 de 2</span>
                <h3 className="text-xl font-bold text-white">¿Cuánto tiempo le querés dedicar?</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button onClick={() => handleQuizStep(2, 'poco')} className="text-left bg-[#0d1117] p-4 rounded-xl border border-[#21262d] hover:border-[#f59e0b] text-gray-200 text-sm font-medium transition-all">
                    ⚡ Poco tiempo, quiero resultados rápidos en pocas clases
                  </button>
                  <button onClick={() => handleQuizStep(2, 'regular')} className="text-left bg-[#0d1117] p-4 rounded-xl border border-[#21262d] hover:border-[#f59e0b] text-gray-200 text-sm font-medium transition-all">
                    📅 1 hora por semana para desconectar y disfrutar
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Result */}
            {quizStep === 3 && (
              <div className="text-center space-y-4 py-4">
                {(() => {
                  const result = getQuizResult();
                  const ResultIcon = result.icon;
                  return (
                    <>
                      <div className="w-16 h-16 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] flex items-center justify-center text-3xl mx-auto">
                        <ResultIcon className="w-8 h-8 text-[#f59e0b]" />
                      </div>
                      <span className="text-xs font-mono text-[#f59e0b] uppercase tracking-widest block">Tu Instrumento Recomendado</span>
                      <h3 className="text-3xl font-extrabold text-white">{result.title}</h3>
                      <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                        {result.desc}
                      </p>
                      
                      <button onClick={applyQuizToBooking} className="bg-gradient-to-r from-[#f59e0b] to-[#ff6b4a] text-black font-bold px-8 py-3.5 rounded-xl text-sm shadow-lg hover:scale-105 transition-transform inline-flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Consultar Turno para este Instrumento</span>
                      </button>
                    </>
                  );
                })()}
              </div>
            )}

          </div>
        </div>
      </section>

      <section id="instrumentos" className="py-20 bg-[#161b22]/30 border-t border-[#21262d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-[#f59e0b] uppercase tracking-widest mb-2">Multinstrumentista</h2>
            <p className="text-3xl font-extrabold text-white">Instrumentos Disponibles en el Estudio</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Guitarra */}
            <div onClick={() => quickSelect('Guitarra')} className="bg-[#161b22] border border-[#21262d] hover:border-[#f59e0b]/60 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1">
              <Guitar className="w-7 h-7 text-[#f59e0b] mb-3" />
              <h4 className="font-bold text-white text-base">Guitarra</h4>
              <p className="text-xs text-gray-400 mt-1">Criolla, Acústica y Eléctrica</p>
            </div>
            {/* Piano */}
            <div onClick={() => quickSelect('Piano / Teclado')} className="bg-[#161b22] border border-[#21262d] hover:border-[#f59e0b]/60 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1">
              <Keyboard className="w-7 h-7 text-cyan-400 mb-3" />
              <h4 className="font-bold text-white text-base">Piano / Teclado</h4>
              <p className="text-xs text-gray-400 mt-1">Armonía y canciones</p>
            </div>
            {/* Batería */}
            <div onClick={() => quickSelect('Batería')} className="bg-[#161b22] border border-[#21262d] hover:border-[#f59e0b]/60 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1">
              <Drum className="w-7 h-7 text-[#ff6b4a] mb-3" />
              <h4 className="font-bold text-white text-base">Batería & Ritmo</h4>
              <p className="text-xs text-gray-400 mt-1">Groove e independencia</p>
            </div>
            {/* Bajo */}
            <div onClick={() => quickSelect('Bajo Eléctrico')} className="bg-[#161b22] border border-[#21262d] hover:border-[#f59e0b]/60 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1">
              <Disc className="w-7 h-7 text-purple-400 mb-3" />
              <h4 className="font-bold text-white text-base">Bajo Eléctrico</h4>
              <p className="text-xs text-gray-400 mt-1">La base de la banda</p>
            </div>
            {/* Ukelele */}
            <div onClick={() => quickSelect('Ukelele')} className="bg-[#161b22] border border-[#21262d] hover:border-[#f59e0b]/60 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1">
              <Umbrella className="w-7 h-7 text-emerald-400 mb-3" />
              <h4 className="font-bold text-white text-base">Ukelele</h4>
              <p className="text-xs text-gray-400 mt-1">Ideal iniciación rápida</p>
            </div>
            {/* Canto */}
            <div onClick={() => quickSelect('Canto')} className="bg-[#161b22] border border-[#21262d] hover:border-[#f59e0b]/60 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1">
              <Mic className="w-7 h-7 text-blue-400 mb-3" />
              <h4 className="font-bold text-white text-base">Canto & Voz</h4>
              <p className="text-xs text-gray-400 mt-1">Técnica y acompañamiento</p>
            </div>
            {/* Saxo */}
            <div onClick={() => quickSelect('Saxo / Vientos')} className="bg-[#161b22] border border-[#21262d] hover:border-[#f59e0b]/60 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1">
              <Wind className="w-7 h-7 text-yellow-400 mb-3" />
              <h4 className="font-bold text-white text-base">Saxo & Vientos</h4>
              <p className="text-xs text-gray-400 mt-1">Expresión y escala</p>
            </div>
            {/* Composición */}
            <div onClick={() => quickSelect('Composición')} className="bg-[#161b22] border border-[#21262d] hover:border-[#f59e0b]/60 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1">
              <Sliders className="w-7 h-7 text-indigo-400 mb-3" />
              <h4 className="font-bold text-white text-base">Composición</h4>
              <p className="text-xs text-gray-400 mt-1">Grabación de maquetas</p>
            </div>
          </div>
        </div>
      </section>

      <section id="planes" className="py-20 bg-[#0d1117] border-t border-[#21262d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-widest block mb-2">Modalidades de Trabajo</span>
            <h2 className="text-3xl font-extrabold text-white">Pensado para Residentes y Turistas</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Plan Anual */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">Residentes Costa del Este</span>
                <h3 className="text-2xl font-bold text-white">Ciclo Regular Anual</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Para quienes viven en la zona y buscan una rutina semanal constante de aprendizaje y progreso paulatino.
                </p>
                <ul className="mt-6 space-y-3 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#f59e0b]" /> 1 clase semanal de 60 min</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#f59e0b]" /> Horarios fijos reservados</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#f59e0b]" /> Material y pistas grabadas</li>
                </ul>
              </div>
              <button onClick={() => scrollToSection('agendar')} className="mt-8 w-full text-center bg-[#0d1117] hover:bg-gray-800 border border-[#21262d] text-white text-xs font-bold py-3 rounded-xl transition-colors">
                Consultar Arancel Mensual
              </button>
            </div>

            {/* Pack Intensivo Verano */}
            <div className="bg-gradient-to-b from-[#161b22] to-amber-950/20 border-2 border-[#f59e0b] rounded-3xl p-6 flex flex-col justify-between relative shadow-xl">
              <span className="absolute -top-3 right-6 bg-[#f59e0b] text-black font-extrabold text-[10px] uppercase px-3 py-1 rounded-full">
                Especial Vacaciones
              </span>
              <div>
                <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider block mb-2">Turistas / Verano</span>
                <h3 className="text-2xl font-bold text-white">Pack Intensivo de Verano</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  ¿Aprovechás tus días en Costa del Este para tocar? Clases aceleradas de 1 a 3 semanas durante tu estadía.
                </p>
                <ul className="mt-6 space-y-3 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><Sun className="w-4 h-4 text-[#f59e0b]" /> 2 a 3 clases por semana</li>
                  <li className="flex items-center gap-2"><Sun className="w-4 h-4 text-[#f59e0b]" /> Enfoque 100% práctico</li>
                  <li className="flex items-center gap-2"><Sun className="w-4 h-4 text-[#f59e0b]" /> Flexibilidad de días</li>
                </ul>
              </div>
              <button onClick={() => scrollToSection('agendar')} className="mt-8 w-full text-center bg-gradient-to-r from-[#f59e0b] to-[#ff6b4a] text-black font-extrabold text-xs py-3 rounded-xl shadow-lg">
                Consultar Disponibilidad Verano
              </button>
            </div>

            {/* Clase Suelta */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#ff6b4a] uppercase tracking-wider block mb-2">Flexibilidad Total</span>
                <h3 className="text-2xl font-bold text-white">Clase Diagnóstico / Suelta</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Ideal si querés probar un instrumento por primera vez o destrabar una técnica específica sin compromiso de continuidad.
                </p>
                <ul className="mt-6 space-y-3 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#ff6b4a]" /> 1 sesión individual de 60 min</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#ff6b4a]" /> Proba varios instrumentos</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#ff6b4a]" /> Sin matrícula ni cuota</li>
                </ul>
              </div>
              <button onClick={() => scrollToSection('agendar')} className="mt-8 w-full text-center bg-[#0d1117] hover:bg-gray-800 border border-[#21262d] text-white text-xs font-bold py-3 rounded-xl transition-colors">
                Reservar Clase Suelta
              </button>
            </div>

          </div>
        </div>
      </section>

      <section id="youtube" className="py-16 bg-[#161b22]/50 border-t border-[#21262d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#161b22] border border-[#21262d] rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest block flex items-center justify-center md:justify-start gap-1">
                <Youtube className="w-4 h-4" /> Canal Oficial
              </span>
              <h3 className="text-2xl font-bold text-white">La Radiolina en YouTube</h3>
              <p className="text-xs text-gray-400 max-w-lg">
                Mirá las grabaciones del estudio, arreglos multi-instrumentales y contenido grabado en el espacio.
              </p>
            </div>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs transition-colors flex items-center gap-2 shrink-0">
              <Youtube className="w-5 h-5" />
              <span>Visitar Canal de YouTube</span>
            </a>
          </div>
        </div>
      </section>

      <section id="agendar" className="py-20 bg-[#0d1117]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-widest block mb-2">Contacto Directo</span>
            <h2 className="text-3xl font-extrabold text-white">Consultar Disponibilidad y Precios</h2>
            <p className="mt-2 text-gray-400 text-xs">Completá tus datos y te abre automáticamente el mensaje en WhatsApp.</p>
          </div>

          <form onSubmit={sendWhatsApp} className="bg-[#161b22] border border-[#21262d] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Instrumento elegido</label>
              <select 
                value={formInstrument} 
                onChange={(e) => setFormInstrument(e.target.value)} 
                className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl px-4 py-3 text-white text-sm focus:border-[#f59e0b] focus:outline-none"
              >
                <option value="Guitarra">Guitarra (Criolla / Acústica / Eléctrica)</option>
                <option value="Piano / Teclado">Piano / Teclado</option>
                <option value="Batería">Batería & Percusión</option>
                <option value="Bajo Eléctrico">Bajo Eléctrico</option>
                <option value="Ukelele">Ukelele</option>
                <option value="Canto">Canto & Voz</option>
                <option value="Saxo / Vientos">Saxo / Vientos</option>
                <option value="Composición">Composición / Producción</option>
                <option value="Probar Varios">Quiero probar varios instrumentos</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Tu nivel actual</label>
                <select 
                  value={formLevel} 
                  onChange={(e) => setFormLevel(e.target.value)} 
                  className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl px-4 py-3 text-white text-sm focus:border-[#f59e0b] focus:outline-none"
                >
                  <option value="Desde cero">Desde cero (Nunca toqué)</option>
                  <option value="Principiante">Principiante (Sé lo básico)</option>
                  <option value="Intermedio">Intermedio (Busco avanzar)</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Modalidad deseada</label>
                <select 
                  value={formMode} 
                  onChange={(e) => setFormMode(e.target.value)} 
                  className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl px-4 py-3 text-white text-sm focus:border-[#f59e0b] focus:outline-none"
                >
                  <option value="Ciclo Anual (Residente)">Ciclo Anual (Residente)</option>
                  <option value="Intensivo de Verano (Vacaciones)">Intensivo de Verano (Vacaciones)</option>
                  <option value="Clase Suelta / Diagnóstico">Clase Suelta / Diagnóstico</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Comentario / Horarios preferidos (Opcional)</label>
              <textarea 
                rows="3" 
                value={formMsg}
                onChange={(e) => setFormMsg(e.target.value)}
                placeholder="Ej: Me gustaría enfocarme en rock nacional, suelo tener libres las tardes..." 
                className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl p-4 text-white text-sm placeholder-gray-500 focus:border-[#f59e0b] focus:outline-none"
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all">
              <MessageCircle className="w-5 h-5" />
              <span>Enviar Consulta a La Radiolina</span>
            </button>
          </form>

        </div>
      </section>

      <footer className="bg-[#0d1117] border-t border-[#21262d] py-8 text-center text-xs text-[#8b949e]">
        <p>© La Radiolina - Espacio Musical • Costa del Este, Partido de La Costa.</p>
      </footer>
    </div>
  );
}