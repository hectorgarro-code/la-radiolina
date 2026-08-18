export interface AlumnoItem {
  id: string;
  nombre: string;
  instrumento: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  fecha: string;
  audioUrl?: string;
  imagenUrl: string;
  tags: string[];
}

export interface RecursoItem {
  id: string;
  titulo: string;
  categoria: 'Tip de Práctica' | 'Escalas & Armonía' | 'Técnica' | 'PDF Guiado';
  descripcion: string;
  nivel: 'Principiante' | 'Intermedio' | 'Todos los niveles';
  tipo: 'pdf' | 'video' | 'guia';
  tamanioPdf?: string;
  linkUrl?: string;
}

export interface RadioSetItem {
  id: string;
  titulo: string;
  genero: string;
  frecuencia: string;
  descripcion: string;
  duracion: string;
  artistas: string[];
  portadaUrl: string;
  freqsAudio: number[];
}

export interface EventoClub {
  id: string;
  titulo: string;
  descripcion: string;
  fechaHora: string;
  moderador: string;
  linkMeet: string;
  cuposLimitados: boolean;
}

export const MOCK_ALUMNOS: AlumnoItem[] = [
  {
    id: '1',
    nombre: 'Sofi M.',
    instrumento: 'Guitarra Eléctrica',
    titulo: 'Solo de Hotel California & Arpegios',
    descripcion: 'Sofi trabajando independencia de dedos y solos clásicos tras 3 meses de clases.',
    duracion: '2:15',
    fecha: 'Agosto 2026',
    imagenUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    tags: ['Solo', 'Rock Clásico', 'Electrica']
  },
  {
    id: '2',
    nombre: 'Mateo R.',
    instrumento: 'Batería & Percusión',
    titulo: 'Groove de Funk 16ths e Independencia',
    descripcion: 'Primera maqueta grabada en el estudio marcando tiempos de bombo e hi-hat continuo.',
    duracion: '1:45',
    fecha: 'Julio 2026',
    imagenUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=600&auto=format&fit=crop',
    tags: ['Batería', 'Funk', 'Groove']
  },
  {
    id: '3',
    nombre: 'Lucas & Profe',
    instrumento: 'Piano & Canto',
    titulo: 'Acompañamiento en Vivo: "Isn\'t She Lovely"',
    descripcion: 'Dúo de teclado rítmico y modulación vocal grabado directo del mixer.',
    duracion: '3:05',
    fecha: 'Agosto 2026',
    imagenUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop',
    tags: ['Piano', 'Soul', 'Ensamble']
  },
  {
    id: '4',
    nombre: 'Valentina P.',
    instrumento: 'Ukelele',
    titulo: 'Ronda Acústica: Chacarera & Reggae',
    descripcion: 'Integrando rasgueos con apagados y cambios rápidos de acordes en ukelele concert.',
    duracion: '1:50',
    fecha: 'Junio 2026',
    imagenUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop',
    tags: ['Ukelele', 'Acústico', 'Rasgueos']
  }
];

export const MOCK_RECURSOS: RecursoItem[] = [
  {
    id: 'rec-1',
    titulo: 'Guía Completa: La Escala Pentatónica Menor',
    categoria: 'PDF Guiado',
    descripcion: 'Los 5 patrones fundamentales explicados con diagramas de diapasón, digitación y ejemplos para improvisar sobre blues y rock.',
    nivel: 'Todos los niveles',
    tipo: 'pdf',
    tamanioPdf: '1.4 MB'
  },
  {
    id: 'rec-2',
    titulo: 'Tip de Práctica: Independencia de Mano Izquierda',
    categoria: 'Tip de Práctica',
    descripcion: '3 ejercicios diarios de 5 minutos para calentar agilidad sin tensionar la muñeca ni el cuello.',
    nivel: 'Principiante',
    tipo: 'guia'
  },
  {
    id: 'rec-3',
    titulo: 'Diagrama de Acordes Fundamentales para Teclado',
    categoria: 'Escalas & Armonía',
    descripcion: 'Mapa visual de triadas mayores, menores y séptimas dominantes para acompañar cualquier canción.',
    nivel: 'Principiante',
    tipo: 'pdf',
    tamanioPdf: '950 KB'
  },
  {
    id: 'rec-4',
    titulo: 'Técnica de Afinación y Cuidado del Instrumento en la Costa',
    categoria: 'Técnica',
    descripcion: 'Recomendaciones clave para cuidar guitarras y maderas frente al aire marino y cambios de humedad.',
    nivel: 'Todos los niveles',
    tipo: 'guia'
  }
];

export const MOCK_RADIO_SETS: RadioSetItem[] = [
  {
    id: 'set-1',
    titulo: 'Especial: Historia del Blues del Delta',
    genero: 'Blues & Slide Guitar',
    frecuencia: '91.3 FM',
    descripcion: 'Un recorrido sonoro por las grabaciones de Robert Johnson, Muddy Waters y B.B. King comentadas por el profe.',
    duracion: '45 min',
    artistas: ['Robert Johnson', 'Muddy Waters', 'B.B. King', 'Howlin\' Wolf'],
    portadaUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    freqsAudio: [220, 277, 330, 392]
  },
  {
    id: 'set-2',
    titulo: 'Grooves de Soul & Funk de los 70s',
    genero: 'Soul / Funk / Motown',
    frecuencia: '98.7 FM',
    descripcion: 'Líneas de bajo contagiosas y bases de batería míticas de Stevie Wonder, Aretha Franklin y Earth Wind & Fire.',
    duracion: '52 min',
    artistas: ['Stevie Wonder', 'Aretha Franklin', 'James Brown', 'Tower of Power'],
    portadaUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop',
    freqsAudio: [146, 220, 293, 370]
  },
  {
    id: 'set-3',
    titulo: 'Noche de Bossa Nova & Jazz Acústico',
    genero: 'Bossa Nova / Cool Jazz',
    frecuencia: '104.5 FM',
    descripcion: 'Selección relajante con armonías ricas en extensiones (7mas y 9nas) para tardes de pinar y mar.',
    duracion: '60 min',
    artistas: ['Tom Jobim', 'João Gilberto', 'Chet Baker', 'Stan Getz'],
    portadaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    freqsAudio: [261, 329, 392, 493]
  }
];

export const MOCK_EVENTO_CLUB: EventoClub = {
  id: 'ev-1',
  titulo: 'El Sonido Motown y la Revolución del Funk',
  descripcion: 'Nos reunimos vía Google Meet a escuchar pasajes históricos de canciones, analizar el uso del bajo de James Jamerson y debatir libremente.',
  fechaHora: 'Próximo Sábado 23 de Agosto - 19:00 hs (Arg)',
  moderador: 'Gastón (La Radiolina)',
  linkMeet: 'https://meet.google.com/abc-radiolina-demo',
  cuposLimitados: true
};
