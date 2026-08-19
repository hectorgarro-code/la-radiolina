import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, QrCode, Download, Calendar, Video, Radio, CheckCircle2, ShieldCheck } from 'lucide-react';

const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className || "w-4 h-4"} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export const ClubMelomanosSection: React.FC = () => {
  const { eventoClub, siteTexts } = useAppContext();
  const [nombre, setNombre] = useState<string>('Carlos Spinetta');
  const [generoFav, setGeneroFav] = useState<string>('Rock Nacional & Blues');
  const [rolClub, setRolClub] = useState<string>('Melómano / Estudiante');
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const numSocio = 'RAD-2026-084';

  const handleDownloadCard = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 3000);

    const svgData = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="350" viewBox="0 0 600 350">
        <rect width="600" height="350" rx="24" fill="#161b22" stroke="#f59e0b" stroke-width="4"/>
        <rect x="20" y="20" width="560" height="310" rx="16" fill="#0d1117" stroke="#21262d"/>
        <circle cx="70" cy="70" r="30" fill="#f59e0b"/>
        <text x="70" y="78" font-size="28" font-family="sans-serif" text-anchor="middle" fill="#000">📻</text>
        <text x="120" y="65" font-size="24" font-weight="bold" font-family="sans-serif" fill="#ffffff">LA RADIOLINA</text>
        <text x="120" y="85" font-size="14" font-family="sans-serif" fill="#f59e0b">CLUB DE LOS MELÓMANOS • COSTA DEL ESTE</text>
        
        <text x="40" y="140" font-size="12" font-family="sans-serif" fill="#8b949e">MIEMBRO OFICIAL</text>
        <text x="40" y="175" font-size="26" font-weight="bold" font-family="sans-serif" fill="#ffffff">${nombre}</text>
        
        <text x="40" y="215" font-size="12" font-family="sans-serif" fill="#8b949e">GÉNERO / ESTILO PREFERIDO</text>
        <text x="40" y="235" font-size="16" font-family="sans-serif" fill="#f59e0b">${generoFav}</text>
        
        <text x="40" y="280" font-size="12" font-family="sans-serif" fill="#8b949e">ROL</text>
        <text x="40" y="300" font-size="14" font-family="sans-serif" fill="#ffffff">${rolClub}</text>
        
        <text x="450" y="140" font-size="12" font-family="sans-serif" fill="#8b949e">SOCIO Nº</text>
        <text x="450" y="165" font-size="16" font-weight="bold" font-family="monospace" fill="#f59e0b">${numSocio}</text>
        
        <rect x="450" y="190" width="110" height="110" fill="#ffffff" rx="8"/>
        <text x="505" y="250" font-size="32" text-anchor="middle" fill="#000">🏁</text>
      </svg>
    `;

    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Carnet_Melomano_${nombre.replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section id="club" className="py-20 bg-[#161b22]/50 border-t border-[#21262d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#f59e0b] text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            Comunidad de Música
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            El Club de los Melómanos
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Un espacio gratuito para amantes de la música, coleccionistas y estudiantes. Obtené tu carnet virtual de socio, sumate a nuestro canal de Discord y participá de nuestros encuentros de debate.
          </p>
        </div>

        {/* Grid: Carnet Generator + Meet Convocatoria */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Form + Carnet Preview Column */}
          <div className="lg:col-span-7 bg-[#0d1117] border border-[#21262d] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-widest block mb-1">
                Pase Digital de Socio
              </span>
              <h3 className="text-xl font-bold text-white">Generá tu Carnet Virtual de Melómano</h3>
            </div>

            {/* Inputs */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Tu Nombre y Apellido</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Carlos Spinetta"
                  className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-4 py-3 text-white text-sm focus:border-[#f59e0b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Estilo / Género Favorito</label>
                <input
                  type="text"
                  value={generoFav}
                  onChange={(e) => setGeneroFav(e.target.value)}
                  placeholder="Ej: Rock, Blues, Jazz"
                  className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-4 py-3 text-white text-sm focus:border-[#f59e0b] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Rol en la Comunidad</label>
              <select
                value={rolClub}
                onChange={(e) => setRolClub(e.target.value)}
                className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-4 py-3 text-white text-sm focus:border-[#f59e0b] focus:outline-none"
              >
                <option value="Melómano / Oyente">Melómano / Oyente Apasionado</option>
                <option value="Estudiante de La Radiolina">Estudiante de La Radiolina</option>
                <option value="Coleccionista de Vinilos">Coleccionista de Vinilos</option>
                <option value="Músico Aficionado">Músico Aficionado</option>
              </select>
            </div>

            {/* Carnet Card Render Preview */}
            <div className="pt-2">
              <span className="text-xs text-gray-400 font-mono block mb-2">Previsualización de Credencial:</span>
              
              <div
                ref={cardRef}
                className="relative bg-gradient-to-br from-[#161b22] via-[#0d1117] to-[#161b22] border-2 border-[#f59e0b] rounded-2xl p-6 shadow-2xl overflow-hidden group"
              >
                <Radio className="absolute -right-6 -bottom-6 w-40 h-40 text-[#f59e0b]/5 pointer-events-none" />

                <div className="flex items-center justify-between border-b border-[#21262d] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#ff6b4a] flex items-center justify-center text-black font-bold">
                      <Radio className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white tracking-wide">LA RADIOLINA</h4>
                      <p className="text-[10px] text-[#8b949e] font-semibold">CLUB DE LOS MELÓMANOS • COSTA DEL ESTE</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 px-2.5 py-1 rounded-full">
                    {numSocio}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-8 space-y-2">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Socio Activo</span>
                      <h3 className="text-xl font-extrabold text-white truncate">{nombre || 'Tu Nombre'}</h3>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Estilo Preferido</span>
                      <p className="text-xs font-semibold text-[#f59e0b] truncate">{generoFav || 'Estilo'}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Categoría</span>
                      <p className="text-xs text-gray-300 font-medium">{rolClub}</p>
                    </div>
                  </div>

                  <div className="col-span-4 flex flex-col items-center justify-center bg-[#0d1117] p-3 rounded-xl border border-[#21262d]">
                    <QrCode className="w-14 h-14 text-white" />
                    <span className="text-[9px] text-gray-500 font-mono mt-1">MEMBER VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownloadCard}
              className={`w-full font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                isDownloaded
                  ? 'bg-emerald-500 text-black'
                  : 'bg-gradient-to-r from-[#f59e0b] to-[#ff6b4a] text-black hover:opacity-95'
              }`}
            >
              {isDownloaded ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>¡Carnet Generado y Descargado!</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Descargar mi Carnet de Melómano (SVG)</span>
                </>
              )}
            </button>
          </div>

          {/* Google Meet Event Column */}
          <div className="lg:col-span-5 bg-[#0d1117] border border-[#21262d] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider">
                <Video className="w-3.5 h-3.5" /> Próximo Debate en Vivo
              </div>

              <h3 className="text-2xl font-extrabold text-white">
                {eventoClub.titulo}
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed font-light">
                {eventoClub.descripcion}
              </p>

              <div className="bg-[#161b22] rounded-2xl p-4 border border-[#21262d] space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-200">
                  <Calendar className="w-4 h-4 text-[#f59e0b]" />
                  <span><strong>Fecha:</strong> {eventoClub.fechaHora}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span><strong>Modera:</strong> {eventoClub.moderador}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-200">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span><strong>Modalidad:</strong> Google Meet (Acceso Libre para Melómanos)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={eventoClub.linkMeet}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Video className="w-4 h-4" />
                <span>Sumarme al próximo Meet</span>
              </a>

              <a
                href={siteTexts.discordUrl || 'https://discord.gg/radiolina'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <DiscordIcon className="w-4 h-4" />
                <span>Unirme a nuestro Canal de Discord</span>
              </a>

              <a
                href="https://calendar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#161b22] hover:bg-gray-800 border border-[#21262d] text-gray-300 font-semibold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#f59e0b]" />
                <span>Agregar Recordatorio a Google Calendar</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
