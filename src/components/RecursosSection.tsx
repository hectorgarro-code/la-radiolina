import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Download, FileText, BookOpen, CheckCircle, Sparkles, Youtube, MessageCircle, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export const RecursosSection: React.FC = () => {
  const { recursos } = useAppContext();
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 4;
  const categoriesList = ['Todos', 'PDF Guiado', 'Tip de Práctica', 'Escalas & Armonía', 'Técnica'];

  const filteredRecursos = recursos.filter(rec => {
    if (selectedCategory === 'Todos') return true;
    return rec.categoria === selectedCategory;
  });

  const totalPages = Math.ceil(filteredRecursos.length / ITEMS_PER_PAGE) || 1;
  const currentRecursos = filteredRecursos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleDownloadPdf = (id: string, titulo: string) => {
    setDownloadedId(id);
    setTimeout(() => {
      setDownloadedId(null);
    }, 3000);

    const element = document.createElement("a");
    const file = new Blob([`Recurso Didáctico de La Radiolina:\n\n${titulo}\n\nMaterial preparado por el Profe Gastón.\nCosta del Este - Espacio Musical.`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${titulo.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="recursos" className="py-20 bg-[#161b22]/40 border-t border-[#21262d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Material de Estudio Gratuito
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Recursos Pedagógicos & Tips
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Guías en PDF, diagramas de escalas y consejos de práctica técnica preparados por el profesor.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs text-gray-500 flex items-center gap-1 mr-2 font-mono">
            <Filter className="w-3.5 h-3.5" /> Categoría:
          </span>
          {categoriesList.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-400 text-black shadow-md font-bold'
                  : 'bg-[#161b22] text-gray-300 border border-[#21262d] hover:border-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {currentRecursos.map((rec) => {
            const isDownloaded = downloadedId === rec.id;
            return (
              <div
                key={rec.id}
                className="bg-[#161b22] border border-[#21262d] rounded-2xl p-6 flex flex-col justify-between hover:border-[#f59e0b]/40 transition-all shadow-lg relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[#0d1117] border border-[#21262d] text-[#f59e0b]">
                      {rec.categoria}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {rec.nivel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#f59e0b] transition-colors leading-snug">
                    {rec.titulo}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    {rec.descripcion}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#21262d] space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>{rec.tipo === 'pdf' ? `PDF (${rec.tamanioPdf || '1.0 MB'})` : 'Guía de Práctica'}</span>
                    </div>

                    <a
                      href="#agendar"
                      className="text-xs font-semibold text-gray-300 hover:text-white bg-[#0d1117] px-3 py-1.5 rounded-xl border border-[#21262d] hover:border-gray-600 transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span>Consultar en Clase</span>
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {rec.documentoUrl ? (
                      <a
                        href={rec.documentoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold px-4 py-2 rounded-xl bg-[#f59e0b] hover:bg-amber-400 text-black shadow-md flex items-center gap-2 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span>Ver / Descargar PDF</span>
                      </a>
                    ) : rec.tipo === 'pdf' && (
                      <button
                        onClick={() => handleDownloadPdf(rec.id, rec.titulo)}
                        className={`text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                          isDownloaded
                            ? 'bg-emerald-500 text-black shadow-md'
                            : 'bg-[#f59e0b] hover:bg-amber-400 text-black shadow-md shadow-[#f59e0b]/10'
                        }`}
                      >
                        {isDownloaded ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>¡Descargado!</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Descargar PDF</span>
                          </>
                        )}
                      </button>
                    )}

                    {rec.youtubeUrl && (
                      <a
                        href={rec.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold px-4 py-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 flex items-center gap-2 transition-all"
                      >
                        <Youtube className="w-4 h-4 text-red-500" />
                        <span>Ver Lección en YouTube</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto bg-[#161b22] border border-[#21262d] px-6 py-4 rounded-2xl">
            <span className="text-xs text-gray-400 font-mono">
              Página {currentPage} de {totalPages} ({filteredRecursos.length} recursos totales)
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-[#0d1117] border border-[#21262d] text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Página anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                    currentPage === p
                      ? 'bg-cyan-400 text-black shadow-md'
                      : 'bg-[#0d1117] text-gray-300 border border-[#21262d] hover:border-gray-600'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-[#0d1117] border border-[#21262d] text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Página siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tip Banner */}
        <div className="mt-12 max-w-3xl mx-auto bg-gradient-to-r from-amber-950/30 via-[#161b22] to-amber-950/30 border border-[#f59e0b]/30 rounded-2xl p-6 flex items-center gap-4">
          <Sparkles className="w-8 h-8 text-[#f59e0b] shrink-0" />
          <p className="text-xs text-gray-300 leading-relaxed">
            <strong className="text-white font-semibold">¿Tenés dudas sobre algún tema teórico?</strong> En las clases particulares llevamos este material a la práctica con ejercicios a tu medida.
          </p>
        </div>

      </div>
    </section>
  );
};

