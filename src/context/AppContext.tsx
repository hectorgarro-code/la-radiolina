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

import { 
  loadGlobalSiteConfig, 
  saveGlobalSiteConfig, 
  listenToGlobalChanges 
} from '../services/cloudStorage';

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
  heroImageUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  whatsappPhone: string;
  whatsappPhone2?: string;
  anualPriceInfo: string;
  veranoPriceInfo: string;
  discordUrl: string;
  youtubeChannelUrl: string;
  contactEmail: string;
  web3formsAccessKey?: string;
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
  heroImageUrl: '/hero_electric_bass.jpg',
  instagramUrl: 'https://www.instagram.com/clasesdeguitarra_la_radiolina/',
  tiktokUrl: '',
  whatsappPhone: '542257416711',
  whatsappPhone2: '543416752299',
  anualPriceInfo: 'Consultar Arancel Mensual',
  veranoPriceInfo: 'Consultar Disponibilidad Verano',
  discordUrl: 'https://discord.com/channels/@me',
  youtubeChannelUrl: 'https://www.youtube.com/@LaRadiolinaMusica',
  contactEmail: 'laradiolinaespaciomusical@gmail.com',
  web3formsAccessKey: '468772a1-0268-450f-[#radiolina-default]',
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

  cloudSyncState: 'synced' | 'syncing' | 'offline';
  cloudLastUpdated?: string;

  exportConfigJSON: () => string;
  importConfigJSON: (jsonString: string) => boolean;

  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  const [cloudSyncState, setCloudSyncState] = useState<'synced' | 'syncing' | 'offline'>('synced');
  const [cloudLastUpdated, setCloudLastUpdated] = useState<string | undefined>(undefined);

  // Dynamic Data States loaded from localStorage
  const TEXTS_VERSION = '2026-09-04-v3';

  const [siteTexts, setSiteTexts] = useState<SiteTexts>(() => {
    const saved = localStorage.getItem('radiolina_texts');
    if (saved) {
      try {
        return { ...DEFAULT_SITE_TEXTS, ...JSON.parse(saved) };
      } catch (e) {}
    }
    return DEFAULT_SITE_TEXTS;
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

  // Load from Global Cloud Database on startup
  useEffect(() => {
    let isMounted = true;
    setCloudSyncState('syncing');

    loadGlobalSiteConfig().then(({ data: cloudData, source }) => {
      if (!isMounted) return;
      if (cloudData) {
        if (cloudData.siteTexts) setSiteTexts(prev => ({ ...prev, ...cloudData.siteTexts }));
        if (cloudData.estudioInstrumentos) setEstudioInstrumentos(cloudData.estudioInstrumentos);
        if (cloudData.planPacks) setPlanPacks(cloudData.planPacks);
        if (cloudData.alumnos) setAlumnos(cloudData.alumnos);
        if (cloudData.recursos) setRecursos(cloudData.recursos);
        if (cloudData.dialChannels) setDialChannels(cloudData.dialChannels);
        if (cloudData.radioSets) setRadioSets(cloudData.radioSets);
        if (cloudData.eventoClub) setEventoClub(cloudData.eventoClub);
        if (cloudData.updatedAt) setCloudLastUpdated(cloudData.updatedAt);
      }
      
      if (source === 'firebase' || source === 'rest') {
        setCloudSyncState('synced');
      } else {
        setCloudSyncState('offline');
      }
    }).catch(err => {
      console.warn('[AppContext] Could not fetch global cloud data:', err);
      if (isMounted) setCloudSyncState('offline');
    });

    // Real-time listener
    const unsubscribe = listenToGlobalChanges((cloudData) => {
      if (!isMounted || !cloudData) return;
      if (cloudData.siteTexts) setSiteTexts(prev => ({ ...prev, ...cloudData.siteTexts }));
      if (cloudData.estudioInstrumentos) setEstudioInstrumentos(cloudData.estudioInstrumentos);
      if (cloudData.planPacks) setPlanPacks(cloudData.planPacks);
      if (cloudData.alumnos) setAlumnos(cloudData.alumnos);
      if (cloudData.recursos) setRecursos(cloudData.recursos);
      if (cloudData.dialChannels) setDialChannels(cloudData.dialChannels);
      if (cloudData.radioSets) setRadioSets(cloudData.radioSets);
      if (cloudData.eventoClub) setEventoClub(cloudData.eventoClub);
      if (cloudData.updatedAt) setCloudLastUpdated(cloudData.updatedAt);
      setCloudSyncState('synced');
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Save changes to LocalStorage as instant local cache
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

  // Helper to push state changes to Global Cloud Database
  const pushCloudSync = async (partialPayload: any) => {
    setCloudSyncState('syncing');
    try {
      const payload = {
        siteTexts,
        estudioInstrumentos,
        planPacks,
        alumnos,
        recursos,
        dialChannels,
        radioSets,
        eventoClub,
        ...partialPayload
      };
      const res = await saveGlobalSiteConfig(payload);
      if (res.success && (res.cloud === 'firebase' || res.cloud === 'rest')) {
        setCloudSyncState('synced');
        setCloudLastUpdated(new Date().toISOString());
      } else {
        setCloudSyncState('offline');
      }
    } catch (err) {
      console.error('[AppContext] Failed pushing to cloud:', err);
      setCloudSyncState('offline');
    }
  };

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
    setSiteTexts(prev => {
      const updated = { ...prev, ...texts };
      pushCloudSync({ siteTexts: updated });
      return updated;
    });
  };

  const addEstudioInstrumento = (item: Omit<EstudioInstrumento, 'id'>) => {
    const newItem: EstudioInstrumento = { ...item, id: Date.now().toString() };
    setEstudioInstrumentos(prev => {
      const updated = [...prev, newItem];
      pushCloudSync({ estudioInstrumentos: updated });
      return updated;
    });
  };

  const updateEstudioInstrumento = (id: string, item: Partial<EstudioInstrumento>) => {
    setEstudioInstrumentos(prev => {
      const updated = prev.map(inst => inst.id === id ? { ...inst, ...item } : inst);
      pushCloudSync({ estudioInstrumentos: updated });
      return updated;
    });
  };

  const deleteEstudioInstrumento = (id: string) => {
    setEstudioInstrumentos(prev => {
      const updated = prev.filter(inst => inst.id !== id);
      pushCloudSync({ estudioInstrumentos: updated });
      return updated;
    });
  };

  const addPlanPack = (item: Omit<PlanPack, 'id'>) => {
    const newItem: PlanPack = { ...item, id: Date.now().toString() };
    setPlanPacks(prev => {
      const updated = [...prev, newItem];
      pushCloudSync({ planPacks: updated });
      return updated;
    });
  };

  const updatePlanPack = (id: string, item: Partial<PlanPack>) => {
    setPlanPacks(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...item } : p);
      pushCloudSync({ planPacks: updated });
      return updated;
    });
  };

  const deletePlanPack = (id: string) => {
    setPlanPacks(prev => {
      const updated = prev.filter(p => p.id !== id);
      pushCloudSync({ planPacks: updated });
      return updated;
    });
  };

  const addAlumno = (item: Omit<AlumnoItem, 'id'>) => {
    const newItem: AlumnoItem = { ...item, id: Date.now().toString() };
    setAlumnos(prev => {
      const updated = [newItem, ...prev];
      pushCloudSync({ alumnos: updated });
      return updated;
    });
  };

  const updateAlumno = (id: string, item: Partial<AlumnoItem>) => {
    setAlumnos(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...item } : a);
      pushCloudSync({ alumnos: updated });
      return updated;
    });
  };

  const deleteAlumno = (id: string) => {
    setAlumnos(prev => {
      const updated = prev.filter(a => a.id !== id);
      pushCloudSync({ alumnos: updated });
      return updated;
    });
  };

  const addRecurso = (item: Omit<RecursoItem, 'id'>) => {
    const newItem: RecursoItem = { ...item, id: Date.now().toString() };
    setRecursos(prev => {
      const updated = [newItem, ...prev];
      pushCloudSync({ recursos: updated });
      return updated;
    });
  };

  const updateRecurso = (id: string, item: Partial<RecursoItem>) => {
    setRecursos(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, ...item } : r);
      pushCloudSync({ recursos: updated });
      return updated;
    });
  };

  const deleteRecurso = (id: string) => {
    setRecursos(prev => {
      const updated = prev.filter(r => r.id !== id);
      pushCloudSync({ recursos: updated });
      return updated;
    });
  };

  const updateDialChannel = (index: number, channel: Partial<DialChannel>) => {
    setDialChannels(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...channel };
      pushCloudSync({ dialChannels: copy });
      return copy;
    });
  };

  const addRadioSet = (item: Omit<RadioSetItem, 'id'>) => {
    const newItem: RadioSetItem = { ...item, id: Date.now().toString() };
    setRadioSets(prev => {
      const updated = [newItem, ...prev];
      pushCloudSync({ radioSets: updated });
      return updated;
    });
  };

  const updateRadioSet = (id: string, item: Partial<RadioSetItem>) => {
    setRadioSets(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, ...item } : s);
      pushCloudSync({ radioSets: updated });
      return updated;
    });
  };

  const deleteRadioSet = (id: string) => {
    setRadioSets(prev => {
      const updated = prev.filter(s => s.id !== id);
      pushCloudSync({ radioSets: updated });
      return updated;
    });
  };

  const updateEventoClub = (evento: Partial<EventoClub>) => {
    setEventoClub(prev => {
      const updated = { ...prev, ...evento };
      pushCloudSync({ eventoClub: updated });
      return updated;
    });
  };

  const exportConfigJSON = (): string => {
    const fullData = {
      siteTexts,
      estudioInstrumentos,
      planPacks,
      alumnos,
      recursos,
      dialChannels,
      radioSets,
      eventoClub,
      exportedAt: new Date().toISOString(),
      version: TEXTS_VERSION
    };
    return JSON.stringify(fullData, null, 2);
  };

  const importConfigJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') return false;

      if (data.siteTexts) setSiteTexts(data.siteTexts);
      if (data.estudioInstrumentos) setEstudioInstrumentos(data.estudioInstrumentos);
      if (data.planPacks) setPlanPacks(data.planPacks);
      if (data.alumnos) setAlumnos(data.alumnos);
      if (data.recursos) setRecursos(data.recursos);
      if (data.dialChannels) setDialChannels(data.dialChannels);
      if (data.radioSets) setRadioSets(data.radioSets);
      if (data.eventoClub) setEventoClub(data.eventoClub);

      pushCloudSync(data);
      return true;
    } catch (err) {
      console.error('Failed importing config JSON:', err);
      return false;
    }
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
    localStorage.setItem('radiolina_texts_version', TEXTS_VERSION);
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
      cloudSyncState,
      cloudLastUpdated,
      exportConfigJSON,
      importConfigJSON,
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
