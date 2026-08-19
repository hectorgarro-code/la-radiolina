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
}

export interface SiteTexts {
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  whatsappPhone: string;
  anualPriceInfo: string;
  veranoPriceInfo: string;
  discordUrl: string;
}

const DEFAULT_SITE_TEXTS: SiteTexts = {
  heroTitle: 'Tocá la música que amás.',
  heroHighlight: 'Todos los instrumentos en un solo lugar.',
  heroDescription: 'En La Radiolina contás con un estudio totalmente equipado. Venís sin nada, elegís tu instrumento preferido y aprendés a tu propio ritmo con clases personalizadas.',
  whatsappPhone: '5491112345678',
  anualPriceInfo: 'Consultar Arancel Mensual',
  veranoPriceInfo: 'Consultar Disponibilidad Verano',
  discordUrl: 'https://discord.gg/radiolina'
};

const DEFAULT_DIAL_CHANNELS: DialChannel[] = [
  { freq: '88.5 FM', genre: 'Rock & Blues', instruments: 'Guitarra Eléctrica / Bajo / Batería', freqs: [330, 392, 493, 587] },
  { freq: '94.1 FM', genre: 'Jazz & Bossa', instruments: 'Piano / Teclado / Bajos suaves', freqs: [261, 329, 392, 493] },
  { freq: '102.7 FM', genre: 'Pop & Acústico', instruments: 'Guitarra Criolla / Ukelele / Teclado', freqs: [293, 370, 440, 554] },
  { freq: '106.3 FM', genre: 'Groove & Ritmo', instruments: 'Batería / Percusión / Bajo', freqs: [110, 146, 164, 220] }
];

interface AppContextType {
  isAdminOpen: boolean;
  setIsAdminOpen: (val: boolean) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  
  siteTexts: SiteTexts;
  updateSiteTexts: (texts: Partial<SiteTexts>) => void;
  
  alumnos: AlumnoItem[];
  addAlumno: (item: Omit<AlumnoItem, 'id'>) => void;
  updateAlumno: (id: string, item: Partial<AlumnoItem>) => void;
  deleteAlumno: (id: string) => void;
  
  recursos: RecursoItem[];
  addRecurso: (item: Omit<RecursoItem, 'id'>) => void;
  updateRecurso: (id: string, item: Partial<RecursoItem>) => void;
  deleteRecurso: (id: string) => void;
  
  dialChannels: DialChannel[];
  updateDialChannel: (index: number, channel: DialChannel) => void;
  
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

  const updateDialChannel = (index: number, channel: DialChannel) => {
    setDialChannels(prev => {
      const copy = [...prev];
      copy[index] = channel;
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
