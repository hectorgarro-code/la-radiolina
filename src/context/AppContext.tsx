import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AlumnoItem, 
  RecursoItem, 
  RadioSetItem, 
  EventoClub, 
  MOCK_ALUMNOS, 
  MOCK_RECURSOS, 
  MOCK_RADIO_SETS, 
  MOCK_EVENTO_CLUB 
} from '../data/mockData';

export interface DialChannel {
  freq: string;
  genre: string;
  instruments: string;
  freqs: number[];
  audioUrl?: string;
  youtubeUrl?: string;
  color?: string;
}

export interface SiteTexts {
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  whatsappPhone: string;
  anualPriceInfo: string;
  veranoPriceInfo: string;
  discordUrl: string;
  youtubeChannelUrl: string;
  contactEmail: string;
  addressText: string;
  googleMapsUrl: string;
}

export interface PlanPack {
  id: string;
  badge: string;
  titulo: string;
  descripcion: string;
  caracteristicas: string[];
  botonTexto: string;
  destacado?: boolean;
}

const DEFAULT_SITE_TEXTS: SiteTexts = {
  heroTitle: 'Tocá la música que amás.',
  heroHighlight: 'Todos los instrumentos en un solo lugar.',
  heroDescription: 'En La Radiolina contás con un estudio totalmente equipado. Venís sin nada, elegís tu instrumento preferido y aprendés a tu propio ritmo con clases personalizadas.',
  whatsappPhone: '5491112345678',
  anualPriceInfo: 'Consultar Arancel Mensual',
  veranoPriceInfo: 'Consultar Disponibilidad Verano',
  discordUrl: 'https://discord.gg/radiolina',
  youtubeChannelUrl: 'https://www.youtube.com/@laradiolina',
  contactEmail: 'contacto@laradiolina.com',
  addressText: 'Costa del Este, Partido de La Costa, Buenos Aires',
  googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12975.312957907572!2d-56.619018449999996!3d-36.6083072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959c00b9dcd8e411%3A0xb3557eefdbf7d3a0!2sCosta%20del%20Este%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar'
};

const DEFAULT_PLAN_PACKS: PlanPack[] = [
  {
    id: 'plan-1',
    badge: 'RESIDENTES COSTA DEL ESTE',
    titulo: 'Ciclo Regular Anual',
    descripcion: 'Para quienes viven en la zona y buscan una rutina semanal constante de aprendizaje y progreso paulatinamente.',
    caracteristicas: ['1 clase semanal de 60 min', 'Horarios fijos reservados', 'Material y pistas grabadas'],
    botonTexto: 'Consultar Arancel Mensual',
    destacado: false
  },
  {
    id: 'plan-2',
    badge: 'TURISTAS / VERANO',
    titulo: 'Pack Intensivo de Verano',
    descripcion: '¿Aprovechás tus días en Costa del Este para tocar? Clases aceleradas de 1 a 3 semanas durante tu estadía.',
    caracteristicas: ['2 a 3 clases por semana', 'Enfoque 100% práctico', 'Flexibilidad de días'],
    botonTexto: 'Consultar Disponibilidad Verano',
    destacado: true
  },
  {
    id: 'plan-3',
    badge: 'FLEXIBILIDAD TOTAL',
    titulo: 'Clase Diagnóstico / Suelta',
    descripcion: 'Ideal si querés probar un instrumento por primera vez o destrabar una técnica específica sin compromiso.',
    caracteristicas: ['1 sesión individual de 60 min', 'Probá varios instrumentos', 'Sin matrícula ni cuota'],
    botonTexto: 'Reservar Clase Suelta',
    destacado: false
  }
];

const DEFAULT_DIAL_CHANNELS: DialChannel[] = [
  { freq: '88.5 FM', genre: 'Rock & Blues', instruments: 'Guitarra Eléctrica / Bajo / Batería', freqs: [330, 392, 493, 587], color: '#f59e0b', youtubeUrl: 'https://www.youtube.com/watch?v=5aK7XnOnd3E' },
  { freq: '94.1 FM', genre: 'Jazz & Bossa', instruments: 'Piano / Teclado / Bajos suaves', freqs: [261, 329, 392, 493], color: '#06b6d4' },
  { freq: '102.7 FM', genre: 'Pop & Acústico', instruments: 'Guitarra Criolla / Ukelele / Teclado', freqs: [293, 370, 440, 554], color: '#ec4899' },
  { freq: '106.3 FM', genre: 'Groove & Ritmo', instruments: 'Batería / Percusión / Bajo', freqs: [110, 146, 164, 220], color: '#a855f7' }
];

export interface EstudioInstrumento {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  color?: string;
}

const DEFAULT_ESTUDIO_INSTRUMENTOS: EstudioInstrumento[] = [
  { id: 'inst-1', nombre: 'Guitarra', descripcion: 'Criolla, Acústica y Eléctrica', icono: 'guitar', color: '#f59e0b' },
  { id: 'inst-2', nombre: 'Piano / Teclado', descripcion: 'Armonía y canciones', icono: 'keyboard', color: '#06b6d4' },
  { id: 'inst-3', nombre: 'Batería & Ritmo', descripcion: 'Groove e independencia', icono: 'drum', color: '#ff6b4a' },
  { id: 'inst-4', nombre: 'Bajo Eléctrico', descripcion: 'La base de la banda', icono: 'disc', color: '#a855f7' },
  { id: 'inst-5', nombre: 'Ukelele', descripcion: 'Ideal iniciación rápida', icono: 'umbrella', color: '#10b981' },
  { id: 'inst-6', nombre: 'Composición', descripcion: 'Grabación de maquetas', icono: 'sliders', color: '#6366f1' },
];

interface AppContextType {
  isAdminOpen: boolean;
  setIsAdminOpen: (val: boolean) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  
  siteTexts: SiteTexts;
  updateSiteTexts: (texts: Partial<SiteTexts>) => void;
  
  estudioInstrumentos: EstudioInstrumento[];
  addEstudioInstrumento: (item: Omit<EstudioInstrumento, 'id'>) => void;
  updateEstudioInstrumento: (id: string, item: Partial<EstudioInstrumento>) => void;
  deleteEstudioInstrumento: (id: string) => void;

  planPacks: PlanPack[];
  addPlanPack: (item: Omit<PlanPack, 'id'>) => void;
  updatePlanPack: (id: string, item: Partial<PlanPack>) => void;
  deletePlanPack: (id: string) => void;

  alumnos: AlumnoItem[];
  addAlumno: (item: Omit<AlumnoItem, 'id'>) => void;
  updateAlumno: (id: string, item: Partial<AlumnoItem>) => void;
  deleteAlumno: (id: string) => void;
  
  recursos: RecursoItem[];
  addRecurso: (item: Omit<RecursoItem, 'id'>) => void;
  updateRecurso: (id: string, item: Partial<RecursoItem>) => void;
  deleteRecurso: (id: string) => void;
  
  dialChannels: DialChannel[];
  updateDialChannel: (index: number, channel: Partial<DialChannel>) => void;
  
  radioSets: RadioSetItem[];
  addRadioSet: (item: Omit<RadioSetItem, 'id'>) => void;
  updateRadioSet: (id: string, item: Partial<RadioSetItem>) => void;
  deleteRadioSet: (id: string) => void;
  
  eventoClub: EventoClub;
  updateEventoClub: (evento: Partial<EventoClub>) => void;

  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Dynamic Data States loaded from localStorage
  const [siteTexts, setSiteTexts] = useState<SiteTexts>(() => {
    const saved = localStorage.getItem('radiolina_texts');
    return saved ? JSON.parse(saved) : DEFAULT_SITE_TEXTS;
  });

  const [estudioInstrumentos, setEstudioInstrumentos] = useState<EstudioInstrumento[]>(() => {
    const saved = localStorage.getItem('radiolina_estudio_inst');
    return saved ? JSON.parse(saved) : DEFAULT_ESTUDIO_INSTRUMENTOS;
  });

  const [planPacks, setPlanPacks] = useState<PlanPack[]>(() => {
    const saved = localStorage.getItem('radiolina_plans');
    return saved ? JSON.parse(saved) : DEFAULT_PLAN_PACKS;
  });

  const [alumnos, setAlumnos] = useState<AlumnoItem[]>(() => {
    const saved = localStorage.getItem('radiolina_alumnos');
    return saved ? JSON.parse(saved) : MOCK_ALUMNOS;
  });

  const [recursos, setRecursos] = useState<RecursoItem[]>(() => {
    const saved = localStorage.getItem('radiolina_recursos');
    return saved ? JSON.parse(saved) : MOCK_RECURSOS;
  });

  const [dialChannels, setDialChannels] = useState<DialChannel[]>(() => {
    const saved = localStorage.getItem('radiolina_dial');
    return saved ? JSON.parse(saved) : DEFAULT_DIAL_CHANNELS;
  });

  const [radioSets, setRadioSets] = useState<RadioSetItem[]>(() => {
    const saved = localStorage.getItem('radiolina_sets');
    return saved ? JSON.parse(saved) : MOCK_RADIO_SETS;
  });

  const [eventoClub, setEventoClub] = useState<EventoClub>(() => {
    const saved = localStorage.getItem('radiolina_evento');
    return saved ? JSON.parse(saved) : MOCK_EVENTO_CLUB;
  });

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('radiolina_texts', JSON.stringify(siteTexts));
  }, [siteTexts]);

  useEffect(() => {
    localStorage.setItem('radiolina_estudio_inst', JSON.stringify(estudioInstrumentos));
  }, [estudioInstrumentos]);

  useEffect(() => {
    localStorage.setItem('radiolina_plans', JSON.stringify(planPacks));
  }, [planPacks]);

  useEffect(() => {
    localStorage.setItem('radiolina_alumnos', JSON.stringify(alumnos));
  }, [alumnos]);

  useEffect(() => {
    localStorage.setItem('radiolina_recursos', JSON.stringify(recursos));
  }, [recursos]);

  useEffect(() => {
    localStorage.setItem('radiolina_dial', JSON.stringify(dialChannels));
  }, [dialChannels]);

  useEffect(() => {
    localStorage.setItem('radiolina_sets', JSON.stringify(radioSets));
  }, [radioSets]);

  useEffect(() => {
    localStorage.setItem('radiolina_evento', JSON.stringify(eventoClub));
  }, [eventoClub]);

  const loginAdmin = (pass: string) => {
    if (pass === 'radiolina2026' || pass === 'admin123') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsAdminOpen(false);
  };

  const updateSiteTexts = (texts: Partial<SiteTexts>) => {
    setSiteTexts(prev => ({ ...prev, ...texts }));
  };

  const addEstudioInstrumento = (item: Omit<EstudioInstrumento, 'id'>) => {
    const newItem: EstudioInstrumento = { ...item, id: Date.now().toString() };
    setEstudioInstrumentos(prev => [...prev, newItem]);
  };

  const updateEstudioInstrumento = (id: string, item: Partial<EstudioInstrumento>) => {
    setEstudioInstrumentos(prev => prev.map(inst => inst.id === id ? { ...inst, ...item } : inst));
  };

  const deleteEstudioInstrumento = (id: string) => {
    setEstudioInstrumentos(prev => prev.filter(inst => inst.id !== id));
  };

  const addPlanPack = (item: Omit<PlanPack, 'id'>) => {
    const newItem: PlanPack = { ...item, id: Date.now().toString() };
    setPlanPacks(prev => [...prev, newItem]);
  };

  const updatePlanPack = (id: string, item: Partial<PlanPack>) => {
    setPlanPacks(prev => prev.map(p => p.id === id ? { ...p, ...item } : p));
  };

  const deletePlanPack = (id: string) => {
    setPlanPacks(prev => prev.filter(p => p.id !== id));
  };

  const addAlumno = (item: Omit<AlumnoItem, 'id'>) => {
    const newItem: AlumnoItem = { ...item, id: Date.now().toString() };
    setAlumnos(prev => [newItem, ...prev]);
  };

  const updateAlumno = (id: string, item: Partial<AlumnoItem>) => {
    setAlumnos(prev => prev.map(a => a.id === id ? { ...a, ...item } : a));
  };

  const deleteAlumno = (id: string) => {
    setAlumnos(prev => prev.filter(a => a.id !== id));
  };

  const addRecurso = (item: Omit<RecursoItem, 'id'>) => {
    const newItem: RecursoItem = { ...item, id: Date.now().toString() };
    setRecursos(prev => [newItem, ...prev]);
  };

  const updateRecurso = (id: string, item: Partial<RecursoItem>) => {
    setRecursos(prev => prev.map(r => r.id === id ? { ...r, ...item } : r));
  };

  const deleteRecurso = (id: string) => {
    setRecursos(prev => prev.filter(r => r.id !== id));
  };

  const updateDialChannel = (index: number, channel: Partial<DialChannel>) => {
    setDialChannels(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...channel };
      return copy;
    });
  };

  const addRadioSet = (item: Omit<RadioSetItem, 'id'>) => {
    const newItem: RadioSetItem = { ...item, id: Date.now().toString() };
    setRadioSets(prev => [newItem, ...prev]);
  };

  const updateRadioSet = (id: string, item: Partial<RadioSetItem>) => {
    setRadioSets(prev => prev.map(s => s.id === id ? { ...s, ...item } : s));
  };

  const deleteRadioSet = (id: string) => {
    setRadioSets(prev => prev.filter(s => s.id !== id));
  };

  const updateEventoClub = (evento: Partial<EventoClub>) => {
    setEventoClub(prev => ({ ...prev, ...evento }));
  };

  const resetToDefaults = () => {
    setSiteTexts(DEFAULT_SITE_TEXTS);
    setEstudioInstrumentos(DEFAULT_ESTUDIO_INSTRUMENTOS);
    setPlanPacks(DEFAULT_PLAN_PACKS);
    setAlumnos(MOCK_ALUMNOS);
    setRecursos(MOCK_RECURSOS);
    setDialChannels(DEFAULT_DIAL_CHANNELS);
    setRadioSets(MOCK_RADIO_SETS);
    setEventoClub(MOCK_EVENTO_CLUB);
    localStorage.clear();
  };

  return (
    <AppContext.Provider value={{
      isAdminOpen,
      setIsAdminOpen,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      siteTexts,
      updateSiteTexts,
      estudioInstrumentos,
      addEstudioInstrumento,
      updateEstudioInstrumento,
      deleteEstudioInstrumento,
      planPacks,
      addPlanPack,
      updatePlanPack,
      deletePlanPack,
      alumnos,
      addAlumno,
      updateAlumno,
      deleteAlumno,
      recursos,
      addRecurso,
      updateRecurso,
      deleteRecurso,
      dialChannels,
      updateDialChannel,
      radioSets,
      addRadioSet,
      updateRadioSet,
      deleteRadioSet,
      eventoClub,
      updateEventoClub,
      resetToDefaults
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
