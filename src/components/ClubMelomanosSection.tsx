import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, QrCode, Download, Calendar, Video, Radio, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';

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

  const getSvgString = () => {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#161b22"/>
            <stop offset="50%" stop-color="#0d1117"/>
            <stop offset="100%" stop-color="#161b22"/>
          </linearGradient>
          <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#ff6b4a"/>
          </linearGradient>
        </defs>

        <!-- Outer Card Background & Golden Border -->
        <rect width="640" height="360" rx="24" fill="url(#bgGrad)" stroke="#f59e0b" stroke-width="4"/>

        <!-- Header Separator Line -->
        <line x1="30" y1="95" x2="610" y2="95" stroke="#21262d" stroke-width="1.5"/>

        <!-- Top Left Logo Icon -->
        <circle cx="65" cy="52" r="20" fill="url(#btnGrad)"/>
        <g transform="translate(54, 41) scale(0.9)">
          <rect x="2" y="6" width="20" height="14" rx="2" fill="none" stroke="#000000" stroke-width="2"/>
          <circle cx="8" cy="13" r="3" fill="#000000"/>
          <line x1="15" y1="11" x2="19" y2="11" stroke="#000000" stroke-width="2"/>
          <line x1="15" y1="15" x2="19" y2="15" stroke="#000000" stroke-width="2"/>
          <line x1="7" y1="6" x2="14" y2="1" stroke="#000000" stroke-width="2"/>
        </g>

        <!-- Title & Subtitle -->
        <text x="96" y="48" font-size="20" font-weight="900" font-family="system-ui, -apple-system, sans-serif" fill="#ffffff" letter-spacing="1">LA RADIOLINA</text>
        <text x="96" y="66" font-size="10" font-weight="700" font-family="system-ui, -apple-system, sans-serif" fill="#8b949e" letter-spacing="0.5">CLUB DE LOS MELÓMANOS • COSTA DEL ESTE</text>

        <!-- Top Right Badge -->
        <rect x="460" y="36" width="145" height="32" rx="16" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-opacity="0.4" stroke-width="1.5"/>
        <text x="532" y="57" font-size="13" font-weight="bold" font-family="monospace" fill="#f59e0b" text-anchor="middle">${numSocio}</text>

        <!-- Left Column Info -->
        <text x="45" y="132" font-size="10" font-weight="700" font-family="system-ui, -apple-system, sans-serif" fill="#6b7280" letter-spacing="1.5">SOCIO ACTIVO</text>
        <text x="45" y="165" font-size="24" font-weight="800" font-family="system-ui, -apple-system, sans-serif" fill="#ffffff">${nombre || 'Tu Nombre'}</text>

        <text x="45" y="210" font-size="10" font-weight="700" font-family="system-ui, -apple-system, sans-serif" fill="#6b7280" letter-spacing="1.5">ESTILO PREFERIDO</text>
        <text x="45" y="234" font-size="15" font-weight="700" font-family="system-ui, -apple-system, sans-serif" fill="#f59e0b">${generoFav || 'Estilo'}</text>

        <text x="45" y="280" font-size="10" font-weight="700" font-family="system-ui, -apple-system, sans-serif" fill="#6b7280" letter-spacing="1.5">CATEGORÍA</text>
        <text x="45" y="304" font-size="14" font-weight="500" font-family="system-ui, -apple-system, sans-serif" fill="#d1d5db">${rolClub}</text>

        <!-- Right Column QR Card Box -->
        <rect x="440" y="130" width="165" height="180" rx="16" fill="#0d1117" stroke="#21262d" stroke-width="1.5"/>

        <!-- QR Matrix Icon inside Box -->
        <g transform="translate(487, 160) scale(2.4)">
          <path d="M0 0h6v6H0zM2 2h2v2H2zM12 0h6v6h-6zM14 2h2v2h-2zM0 12h6v6H0zM2 14h2v2H2zM8 0h2v4H8zM8 8h2v2H8zM0 8h4v2H0zM12 8h4v2h-4zM16 12h2v6h-2zM12 16h2v2h-2zM8 14h4v2H8zM8 18h2v2H8zM14 14h2v2h-2z" fill="#ffffff"/>
        </g>

        <!-- MEMBER VERIFIED Text -->
        <text x="522" y="285" font-size="10" font-weight="bold" font-family="monospace" fill="#6b7280" text-anchor="middle" letter-spacing="0.5">MEMBER VERIFIED</text>
      </svg>
    `;
  };

  const handleDownloadCard = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 3000);

    const svgData = getSvgString();
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Carnet_Melomano_${(nombre || 'Socio').replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrintCard = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Carnet Melómano - ${nombre}</title>
          <style>
            body {
              margin: 0;
              padding: 40px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background-color: #0d1117;
              color: #ffffff;
              font-family: system-ui, -apple-system, sans-serif;
            }
            .card-wrapper {
              width: 640px;
              height: 360px;
              box-shadow: 0 20px 50px rgba(0,0,0,0.8);
              border-radius: 24px;
            }
            @media print {
              body { background: transparent; padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="margin-bottom: 20px;">
            <button onclick="window.print()" style="background:#f59e0b; color:#000; border:none; padding:12px 28px; border-radius:12px; font-weight:bold; font-size:14px; cursor:pointer;">
              🖨️ Imprimir Carnet
            </button>
          </div>
          <div class="card-wrapper">
            ${getSvgString()}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
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

            {/* Download & Print Buttons */}
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                onClick={handleDownloadCard}
                className={`font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isDownloaded
                    ? 'bg-emerald-500 text-black'
                    : 'bg-gradient-to-r from-[#f59e0b] to-[#ff6b4a] text-black hover:opacity-95'
                }`}
              >
                {isDownloaded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>¡Carnet Descargado!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Descargar Carnet (SVG)</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrintCard}
                className="bg-[#161b22] hover:bg-gray-800 border border-[#f59e0b]/50 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Printer className="w-4 h-4 text-[#f59e0b]" />
                <span>Imprimir Carnet</span>
              </button>
            </div>
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
