import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  X, 
  Settings, 
  Award, 
  BookOpen, 
  Radio, 
  Disc, 
  Users, 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    isAdminLoggedIn, 
    logoutAdmin,
    siteTexts,
    updateSiteTexts,
    alumnos,
    addAlumno,
    deleteAlumno,
    recursos,
    addRecurso,
    deleteRecurso,
    dialChannels,
    updateDialChannel,
    radioSets,
    addRadioSet,
    deleteRadioSet,
    eventoClub,
    updateEventoClub,
    resetToDefaults
  } = useAppContext();

  const [activeTab, setActiveTab] = useState<'textos' | 'alumnos' | 'recursos' | 'dial' | 'sets' | 'club'>('textos');
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // New Item States
  const [newAlumno, setNewAlumno] = useState({
    nombre: '',
    instrumento: 'Guitarra Eléctrica',
    titulo: '',
    descripcion: '',
    duracion: '2:00',
    fecha: 'Agosto 2026',
    imagenUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    tags: ['Estudio', 'Práctica']
  });

  const [newRecurso, setNewRecurso] = useState({
    titulo: '',
    categoria: 'PDF Guiado' as const,
    descripcion: '',
    nivel: 'Todos los niveles' as const,
    tipo: 'pdf' as const,
    tamanioPdf: '1.2 MB'
  });

  const [newRadioSet, setNewRadioSet] = useState({
    titulo: '',
    genero: 'Rock & Blues',
    frecuencia: '95.5 FM',
    descripcion: '',
    duracion: '45 min',
    artistas: ['Artista 1', 'Artista 2'],
    portadaUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    freqsAudio: [220, 330, 440, 550]
  });

  if (!isAdminOpen || !isAdminLoggedIn) return null;

  const showNotify = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(null), 2500);
  };

  const handleSaveTexts = (e: React.FormEvent) => {
    e.preventDefault();
    showNotify('¡Textos principales actualizados!');
  };

  const handleAddAlumno = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlumno.titulo || !newAlumno.nombre) return;
    addAlumno(newAlumno);
    setNewAlumno({
      nombre: '',
      instrumento: 'Guitarra Eléctrica',
      titulo: '',
      descripcion: '',
      duracion: '2:00',
      fecha: 'Agosto 2026',
      imagenUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
      tags: ['Estudio']
    });
    showNotify('¡Grabación de alumno agregada!');
  };

  const handleAddRecurso = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecurso.titulo) return;
    addRecurso(newRecurso);
    setNewRecurso({
      titulo: '',
      categoria: 'PDF Guiado',
      descripcion: '',
      nivel: 'Todos los niveles',
      tipo: 'pdf',
      tamanioPdf: '1.2 MB'
    });
    showNotify('¡Recurso pedagógico agregado!');
  };

  const handleAddRadioSet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRadioSet.titulo) return;
    addRadioSet(newRadioSet);
    setNewRadioSet({
      titulo: '',
      genero: 'Rock & Blues',
      frecuencia: '95.5 FM',
      descripcion: '',
      duracion: '45 min',
      artistas: ['Artista 1', 'Artista 2'],
      portadaUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
      freqsAudio: [220, 330, 440, 550]
    });
    showNotify('¡Radio Set agregado!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#161b22] border-2 border-[#f59e0b] rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0d1117] p-5 border-b border-[#21262d] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f59e0b] text-black font-bold flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Panel de Control & CMS</h3>
              <p className="text-xs text-[#8b949e]">Administración integral de La Radiolina</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (confirm('¿Restablecer todos los datos originales de fábrica?')) {
                  resetToDefaults();
                  showNotify('¡Datos restablecidos!');
                }
              }}
              className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 bg-[#161b22] px-3 py-1.5 rounded-lg border border-[#21262d]"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restablecer Todo
            </button>
            <button
              onClick={logoutAdmin}
              className="bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-bold px-3.5 py-1.5 rounded-lg border border-red-500/30"
            >
              Cerrar Sesión
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Saved Toast Notification */}
        {saveNotification && (
          <div className="bg-emerald-500 text-black font-bold text-xs p-2.5 text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {saveNotification}
          </div>
        )}

        {/* Tabs Bar */}
        <div className="bg-[#0d1117]/60 border-b border-[#21262d] px-4 pt-2 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('textos')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'textos' ? 'bg-[#161b22] text-[#f59e0b] border-t-2 border-[#f59e0b]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" /> Textos & Hero
          </button>
          <button
            onClick={() => setActiveTab('alumnos')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'alumnos' ? 'bg-[#161b22] text-[#f59e0b] border-t-2 border-[#f59e0b]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" /> Alumnos ({alumnos.length})
          </button>
          <button
            onClick={() => setActiveTab('recursos')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'recursos' ? 'bg-[#161b22] text-[#f59e0b] border-t-2 border-[#f59e0b]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Recursos PDF ({recursos.length})
          </button>
          <button
            onClick={() => setActiveTab('dial')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'dial' ? 'bg-[#161b22] text-[#f59e0b] border-t-2 border-[#f59e0b]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-[#f59e0b]" /> El Dial ({dialChannels.length})
          </button>
          <button
            onClick={() => setActiveTab('sets')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'sets' ? 'bg-[#161b22] text-[#f59e0b] border-t-2 border-[#f59e0b]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Disc className="w-3.5 h-3.5 text-purple-400" /> Radio Sets ({radioSets.length})
          </button>
          <button
            onClick={() => setActiveTab('club')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'club' ? 'bg-[#161b22] text-[#f59e0b] border-t-2 border-[#f59e0b]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#ff6b4a]" /> Club Melómanos
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: Textos & Hero */}
          {activeTab === 'textos' && (
            <form onSubmit={handleSaveTexts} className="space-y-4 max-w-3xl">
              <h4 className="text-sm font-bold text-[#f59e0b] uppercase tracking-wider">Edición de Títulos y Frases</h4>
              
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Título Principal (Hero H1)</label>
                <input
                  type="text"
                  value={siteTexts.heroTitle}
                  onChange={(e) => updateSiteTexts({ heroTitle: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl px-4 py-2.5 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Frase Destacada (Gradiente)</label>
                <input
                  type="text"
                  value={siteTexts.heroHighlight}
                  onChange={(e) => updateSiteTexts({ heroHighlight: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl px-4 py-2.5 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Descripción General de La Radiolina</label>
                <textarea
                  rows={3}
                  value={siteTexts.heroDescription}
                  onChange={(e) => updateSiteTexts({ heroDescription: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl p-3 text-white text-sm"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Número de WhatsApp (con código de país)</label>
                  <input
                    type="text"
                    value={siteTexts.whatsappPhone}
                    onChange={(e) => updateSiteTexts({ whatsappPhone: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl px-4 py-2.5 text-white text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#f59e0b] hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Guardar Textos
              </button>
            </form>
          )}

          {/* TAB 2: Alumnos en Acción */}
          {activeTab === 'alumnos' && (
            <div className="space-y-6">
              {/* Form Add Alumno */}
              <form onSubmit={handleAddAlumno} className="bg-[#0d1117] p-5 rounded-2xl border border-[#21262d] space-y-4">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Agregar Nueva Grabación de Alumno
                </h4>
                
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre (ej: Sofi M.)"
                      value={newAlumno.nombre}
                      onChange={(e) => setNewAlumno({ ...newAlumno, nombre: e.target.value })}
                      className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-3 py-2 text-white text-xs"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Instrumento (ej: Batería)"
                      value={newAlumno.instrumento}
                      onChange={(e) => setNewAlumno({ ...newAlumno, instrumento: e.target.value })}
                      className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-3 py-2 text-white text-xs"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Título (ej: Solo de Rock)"
                      value={newAlumno.titulo}
                      onChange={(e) => setNewAlumno({ ...newAlumno, titulo: e.target.value })}
                      className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-3 py-2 text-white text-xs"
                      required
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Descripción de lo grabado en la sesión..."
                    value={newAlumno.descripcion}
                    onChange={(e) => setNewAlumno({ ...newAlumno, descripcion: e.target.value })}
                    className="w-full bg-[#161b22] border border-[#21262d] rounded-xl p-3 text-white text-xs"
                  />
                </div>

                <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Cargar Grabación
                </button>
              </form>

              {/* List Alumnos */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase">Grabaciones Actuales</h4>
                {alumnos.map((a) => (
                  <div key={a.id} className="bg-[#0d1117] p-4 rounded-xl border border-[#21262d] flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{a.nombre}</span>
                        <span className="text-xs text-[#f59e0b]">({a.instrumento})</span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium">{a.titulo}</p>
                    </div>
                    <button
                      onClick={() => deleteAlumno(a.id)}
                      className="text-gray-500 hover:text-red-400 p-2"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Recursos Pedagógicos */}
          {activeTab === 'recursos' && (
            <div className="space-y-6">
              <form onSubmit={handleAddRecurso} className="bg-[#0d1117] p-5 rounded-2xl border border-[#21262d] space-y-4">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Agregar Nuevo Recurso Didáctico / PDF
                </h4>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Título de la guía o PDF"
                    value={newRecurso.titulo}
                    onChange={(e) => setNewRecurso({ ...newRecurso, titulo: e.target.value })}
                    className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-3 py-2 text-white text-xs"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Categoría (ej: Escalas & Armonía)"
                    value={newRecurso.categoria}
                    onChange={(e) => setNewRecurso({ ...newRecurso, categoria: e.target.value as any })}
                    className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-3 py-2 text-white text-xs"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Descripción pedagógica..."
                  value={newRecurso.descripcion}
                  onChange={(e) => setNewRecurso({ ...newRecurso, descripcion: e.target.value })}
                  className="w-full bg-[#161b22] border border-[#21262d] rounded-xl p-3 text-white text-xs"
                />

                <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Guardar Recurso PDF
                </button>
              </form>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase">Recursos Publicados</h4>
                {recursos.map((r) => (
                  <div key={r.id} className="bg-[#0d1117] p-4 rounded-xl border border-[#21262d] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-cyan-400">{r.categoria}</span>
                      <h5 className="font-bold text-white text-sm">{r.titulo}</h5>
                    </div>
                    <button
                      onClick={() => deleteRecurso(r.id)}
                      className="text-gray-500 hover:text-red-400 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: El Dial */}
          {activeTab === 'dial' && (
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider">Estaciones del Dial Interactivo</h4>
              {dialChannels.map((ch, idx) => (
                <div key={idx} className="bg-[#0d1117] p-4 rounded-2xl border border-[#21262d] space-y-3">
                  <span className="text-xs font-bold text-[#f59e0b] font-mono">Estación #{idx + 1}: {ch.freq}</span>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">Frecuencia FM</label>
                      <input
                        type="text"
                        value={ch.freq}
                        onChange={(e) => updateDialChannel(idx, { ...ch, freq: e.target.value })}
                        className="w-full bg-[#161b22] border border-[#21262d] rounded-lg px-3 py-1.5 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">Género / Estilo</label>
                      <input
                        type="text"
                        value={ch.genre}
                        onChange={(e) => updateDialChannel(idx, { ...ch, genre: e.target.value })}
                        className="w-full bg-[#161b22] border border-[#21262d] rounded-lg px-3 py-1.5 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">Instrumentos Incluidos</label>
                      <input
                        type="text"
                        value={ch.instruments}
                        onChange={(e) => updateDialChannel(idx, { ...ch, instruments: e.target.value })}
                        className="w-full bg-[#161b22] border border-[#21262d] rounded-lg px-3 py-1.5 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: Radio Sets */}
          {activeTab === 'sets' && (
            <div className="space-y-6">
              <form onSubmit={handleAddRadioSet} className="bg-[#0d1117] p-5 rounded-2xl border border-[#21262d] space-y-4">
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Cargar Nueva Mezcla / Radio Set
                </h4>
                
                <div className="grid sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Título de la mezcla"
                    value={newRadioSet.titulo}
                    onChange={(e) => setNewRadioSet({ ...newRadioSet, titulo: e.target.value })}
                    className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-3 py-2 text-white text-xs"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Género (ej: Soul & Funk)"
                    value={newRadioSet.genero}
                    onChange={(e) => setNewRadioSet({ ...newRadioSet, genero: e.target.value })}
                    className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-3 py-2 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Frecuencia (ej: 99.1 FM)"
                    value={newRadioSet.frecuencia}
                    onChange={(e) => setNewRadioSet({ ...newRadioSet, frecuencia: e.target.value })}
                    className="w-full bg-[#161b22] border border-[#21262d] rounded-xl px-3 py-2 text-white text-xs"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Descripción del set de música..."
                  value={newRadioSet.descripcion}
                  onChange={(e) => setNewRadioSet({ ...newRadioSet, descripcion: e.target.value })}
                  className="w-full bg-[#161b22] border border-[#21262d] rounded-xl p-3 text-white text-xs"
                />

                <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-black font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Publicar Radio Set
                </button>
              </form>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase">Mezclas Publicadas</h4>
                {radioSets.map((s) => (
                  <div key={s.id} className="bg-[#0d1117] p-4 rounded-xl border border-[#21262d] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-purple-400">{s.frecuencia} - {s.genero}</span>
                      <h5 className="font-bold text-white text-sm">{s.titulo}</h5>
                    </div>
                    <button
                      onClick={() => deleteRadioSet(s.id)}
                      className="text-gray-500 hover:text-red-400 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Club de los Melómanos */}
          {activeTab === 'club' && (
            <div className="space-y-4 max-w-3xl">
              <h4 className="text-xs font-bold text-[#ff6b4a] uppercase tracking-wider">Configurar Próximo Debate (Google Meet)</h4>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Título del Encuentro</label>
                <input
                  type="text"
                  value={eventoClub.titulo}
                  onChange={(e) => updateEventoClub({ titulo: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl px-4 py-2.5 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Descripción / Temas a tratar</label>
                <textarea
                  rows={3}
                  value={eventoClub.descripcion}
                  onChange={(e) => updateEventoClub({ descripcion: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl p-3 text-white text-sm"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Fecha y Hora</label>
                  <input
                    type="text"
                    value={eventoClub.fechaHora}
                    onChange={(e) => updateEventoClub({ fechaHora: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl px-4 py-2.5 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Enlace a Google Meet</label>
                  <input
                    type="text"
                    value={eventoClub.linkMeet}
                    onChange={(e) => updateEventoClub({ linkMeet: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl px-4 py-2.5 text-white text-sm"
                  />
                </div>
              </div>

              <button
                onClick={() => showNotify('¡Encuentro de Melómanos actualizado!')}
                className="bg-[#ff6b4a] text-black font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Guardar Evento del Club
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
