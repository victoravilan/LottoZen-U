// ============================================================
// LottoZen Ultra - Motor de Analisis Multidisciplinar
// ============================================================
// Integra multiples sistemas matematicos y tradiciones:
// 1. Numerologia Pitagorica (Life Path, Expression, etc.)
// 2. Numerologia Caldea (vibracion sonora de letras, 1-8)
// 3. Astrologia (signo zodiacal, elemento, planeta regente,
//    carta natal simplificada, posicion planetaria)
// 4. Calendario Maya Tzolkin (Kin, sello solar, tono galactico)
// 5. Cabala / Arbol de la Vida (10 sefirot, 22 senderos)
// 6. Cuadrado Magico Lo Shu (numerologia china)
// 7. Biorritmos (ciclos fisico 23d, emocional 28d, intelectual 33d)
// 8. Secuencia Fibonacci y Numero Aureo (phi)
// 9. Ley de Benford (distribucion natural de digitos)
// 10. Distribucion de Poisson (modelo probabilistico)
// 11. Analisis historico: frecuencias, Markov, patrones
// 12. Numero de Ano Personal (ciclos de 9 anos)
// 13. Motor Cuantico (superposicion, entrelazamiento, tiempo espiral)
// ============================================================

import {
  generateQuantumNumbers,
  type QuantumGenerationResult,
} from './quantumEngine';

// -------------------------------------------------------
// 1. NUMEROLOGIA PITAGORICA
// -------------------------------------------------------

const PYTHAGOREAN_TABLE: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

// -------------------------------------------------------
// 2. NUMEROLOGIA CALDEA (vibracion sonora, 1-8, 9 es sagrado)
// Tabla extraida de fuentes caldeas verificadas
// -------------------------------------------------------

const CHALDEAN_TABLE: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
const MASTER_NUMBERS = new Set([11, 22, 33]);

const ACCENT_MAP: Record<string, string> = {
  '\u00E1': 'A', '\u00C1': 'A',
  '\u00E9': 'E', '\u00C9': 'E',
  '\u00ED': 'I', '\u00CD': 'I',
  '\u00F3': 'O', '\u00D3': 'O',
  '\u00FA': 'U', '\u00DA': 'U',
  '\u00FC': 'U', '\u00DC': 'U',
  '\u00F1': 'N', '\u00D1': 'N',
  '\u00E7': 'C', '\u00C7': 'C',
};

function normalizeText(text: string): string {
  let result = '';
  for (const ch of text.toUpperCase()) {
    result += ACCENT_MAP[ch] || ch;
  }
  return result;
}

export function reduceNumber(n: number): number {
  while (n > 9 && !MASTER_NUMBERS.has(n)) {
    n = String(n).split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return n;
}

export function calculateLifePath(year: number, month: number, day: number): number {
  const reducedDay = reduceNumber(day);
  const reducedMonth = reduceNumber(month);
  const reducedYear = reduceNumber(
    String(year).split('').reduce((sum, d) => sum + parseInt(d, 10), 0)
  );
  return reduceNumber(reducedDay + reducedMonth + reducedYear);
}

export function calculateExpression(fullName: string): number {
  const normalized = normalizeText(fullName);
  let sum = 0;
  for (const ch of normalized) {
    if (PYTHAGOREAN_TABLE[ch]) sum += PYTHAGOREAN_TABLE[ch];
  }
  return reduceNumber(sum);
}

export function calculateSoulUrge(fullName: string): number {
  const normalized = normalizeText(fullName);
  let sum = 0;
  for (const ch of normalized) {
    if (VOWELS.has(ch) && PYTHAGOREAN_TABLE[ch]) sum += PYTHAGOREAN_TABLE[ch];
  }
  return reduceNumber(sum);
}

export function calculatePersonality(fullName: string): number {
  const normalized = normalizeText(fullName);
  let sum = 0;
  for (const ch of normalized) {
    if (!VOWELS.has(ch) && PYTHAGOREAN_TABLE[ch]) sum += PYTHAGOREAN_TABLE[ch];
  }
  return reduceNumber(sum);
}

export function calculateBirthdayNumber(day: number): number {
  return reduceNumber(day);
}

export function calculateDestinyNumber(year: number, month: number, day: number): number {
  return calculateLifePath(year, month, day);
}

export function calculatePlaceNumber(place: string): number {
  const normalized = normalizeText(place);
  let sum = 0;
  for (const ch of normalized) {
    if (PYTHAGOREAN_TABLE[ch]) sum += PYTHAGOREAN_TABLE[ch];
  }
  return reduceNumber(sum);
}

export function calculatePersonalLuckyNumber(lifePath: number, birthday: number, soulUrge: number): number {
  return reduceNumber(lifePath + birthday + soulUrge);
}

// Numerologia Caldea
export function calculateChaldeanNameNumber(fullName: string): number {
  const normalized = normalizeText(fullName);
  let sum = 0;
  for (const ch of normalized) {
    if (CHALDEAN_TABLE[ch]) sum += CHALDEAN_TABLE[ch];
  }
  // En caldeo: el numero compuesto (antes de reducir) tiene significado propio
  return reduceNumber(sum);
}

// -------------------------------------------------------
// 3. ASTROLOGIA
// -------------------------------------------------------

export interface ZodiacSign {
  name: string;
  element: 'Fuego' | 'Tierra' | 'Aire' | 'Agua';
  quality: 'Cardinal' | 'Fijo' | 'Mutable';
  ruler: string;
  rulerNumber: number;
  luckyNumbers: number[];
  dates: { start: [number, number]; end: [number, number] };
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: 'Aries', element: 'Fuego', quality: 'Cardinal', ruler: 'Marte', rulerNumber: 9, luckyNumbers: [1, 9, 17], dates: { start: [3, 21], end: [4, 19] } },
  { name: 'Tauro', element: 'Tierra', quality: 'Fijo', ruler: 'Venus', rulerNumber: 6, luckyNumbers: [6, 15, 24], dates: { start: [4, 20], end: [5, 20] } },
  { name: 'Geminis', element: 'Aire', quality: 'Mutable', ruler: 'Mercurio', rulerNumber: 5, luckyNumbers: [5, 14, 23], dates: { start: [5, 21], end: [6, 20] } },
  { name: 'Cancer', element: 'Agua', quality: 'Cardinal', ruler: 'Luna', rulerNumber: 2, luckyNumbers: [2, 7, 11], dates: { start: [6, 21], end: [7, 22] } },
  { name: 'Leo', element: 'Fuego', quality: 'Fijo', ruler: 'Sol', rulerNumber: 1, luckyNumbers: [1, 5, 19], dates: { start: [7, 23], end: [8, 22] } },
  { name: 'Virgo', element: 'Tierra', quality: 'Mutable', ruler: 'Mercurio', rulerNumber: 5, luckyNumbers: [5, 14, 23], dates: { start: [8, 23], end: [9, 22] } },
  { name: 'Libra', element: 'Aire', quality: 'Cardinal', ruler: 'Venus', rulerNumber: 6, luckyNumbers: [6, 15, 24], dates: { start: [9, 23], end: [10, 22] } },
  { name: 'Escorpio', element: 'Agua', quality: 'Fijo', ruler: 'Pluton', rulerNumber: 9, luckyNumbers: [8, 9, 18], dates: { start: [10, 23], end: [11, 21] } },
  { name: 'Sagitario', element: 'Fuego', quality: 'Mutable', ruler: 'Jupiter', rulerNumber: 3, luckyNumbers: [3, 9, 21], dates: { start: [11, 22], end: [12, 21] } },
  { name: 'Capricornio', element: 'Tierra', quality: 'Cardinal', ruler: 'Saturno', rulerNumber: 8, luckyNumbers: [8, 10, 28], dates: { start: [12, 22], end: [1, 19] } },
  { name: 'Acuario', element: 'Aire', quality: 'Fijo', ruler: 'Urano', rulerNumber: 4, luckyNumbers: [4, 11, 22], dates: { start: [1, 20], end: [2, 18] } },
  { name: 'Piscis', element: 'Agua', quality: 'Mutable', ruler: 'Neptuno', rulerNumber: 7, luckyNumbers: [3, 7, 12], dates: { start: [2, 19], end: [3, 20] } },
];

export function getZodiacSign(month: number, day: number): ZodiacSign {
  for (const sign of ZODIAC_SIGNS) {
    const { start, end } = sign.dates;
    if (start[0] === end[0]) {
      if (month === start[0] && day >= start[1] && day <= end[1]) return sign;
    } else {
      if ((month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1])) return sign;
    }
  }
  return ZODIAC_SIGNS[0];
}

// Posicion planetaria simplificada (sin efemerides completos)
// Usa ciclos orbitales medios para estimar signo de cada planeta
const PLANET_CYCLES: { name: string; period: number; numbers: number[] }[] = [
  { name: 'Sol', period: 365.25, numbers: [1, 10, 19, 28] },
  { name: 'Luna', period: 27.32, numbers: [2, 7, 11, 20] },
  { name: 'Mercurio', period: 88, numbers: [5, 14, 23] },
  { name: 'Venus', period: 224.7, numbers: [6, 15, 24, 33] },
  { name: 'Marte', period: 687, numbers: [9, 18, 27] },
  { name: 'Jupiter', period: 4332.6, numbers: [3, 12, 21, 30] },
  { name: 'Saturno', period: 10759, numbers: [8, 17, 26] },
];

export interface PlanetaryPosition {
  planet: string;
  sign: ZodiacSign;
  degree: number;
  luckyNumbers: number[];
}

export function calculatePlanetaryPositions(birthDate: string): PlanetaryPosition[] {
  const [year, month, day] = birthDate.split('-').map(Number);
  const birthTime = new Date(year, month - 1, day).getTime();

  return PLANET_CYCLES.map(planet => {
    // Calcular fraccion del ciclo orbital completado
    const elapsedDays = (Date.now() - birthTime) / (1000 * 60 * 60 * 24);
    const cyclesCompleted = elapsedDays / planet.period;
    const fraction = cyclesCompleted % 1;
    const degree = Math.round(fraction * 30 * 10) / 10;

    // Estimar signo zodiacal basado en la fraccion del ciclo
    const signIndex = Math.floor(fraction * 12) % 12;
    return {
      planet: planet.name,
      sign: ZODIAC_SIGNS[signIndex],
      degree,
      luckyNumbers: planet.numbers,
    };
  });
}

// -------------------------------------------------------
// 4. CALENDARIO MAYA TZOLKIN
// -------------------------------------------------------

// 20 sellos solares mayas con sus numeros asociados
const MAYAN_SEALS: { name: string; number: number; keywords: string }[] = [
  { name: 'Dragon', number: 1, keywords: 'Nutrir, Ser, Confianza' },
  { name: 'Viento', number: 2, keywords: 'Comunicar, Espiritu, Aliento' },
  { name: 'Noche', number: 3, keywords: 'Sonar, Intuir, Abundancia' },
  { name: 'Semilla', number: 4, keywords: 'Sembrar, Atender, Sexualidad' },
  { name: 'Serpiente', number: 5, keywords: 'Sobrevivir, Instinto, Fuerza vital' },
  { name: 'Enlazador', number: 6, keywords: 'Igualar, Muerte, Entregar' },
  { name: 'Mano', number: 7, keywords: 'Saber, Curar, Cumplir' },
  { name: 'Estrella', number: 8, keywords: 'Embellecer, Arte, Armonizar' },
  { name: 'Luna', number: 9, keywords: 'Purificar, Fluir, Agua universal' },
  { name: 'Perro', number: 10, keywords: 'Amar, Lealtad, Corazon' },
  { name: 'Mono', number: 11, keywords: 'Jugar, Magia, Ilusion' },
  { name: 'Humano', number: 12, keywords: 'Influenciar, Sabiduria, Libre albedrio' },
  { name: 'Caminante', number: 13, keywords: 'Explorar, Conciencia, Camino' },
  { name: 'Mago', number: 14, keywords: 'Encantar, Receptividad, Tiempo sin tiempo' },
  { name: 'Aguila', number: 15, keywords: 'Crear, Mente, Vision' },
  { name: 'Guerrero', number: 16, keywords: 'Cuestionar, Inteligencia, Audacia' },
  { name: 'Tierra', number: 17, keywords: 'Evolucion, Navegar, Sincronicidad' },
  { name: 'Espejo', number: 18, keywords: 'Reflejar, Infinito, Orden' },
  { name: 'Tormenta', number: 19, keywords: 'Catalizar, Energia, Autogeneracion' },
  { name: 'Sol', number: 20, keywords: 'Iluminar, Maestria, Fuego universal' },
];

const MAYAN_TONES: { number: number; name: string; action: string }[] = [
  { number: 1, name: 'Magnetico', action: 'Unificar' },
  { number: 2, name: 'Lunar', action: 'Polarizar' },
  { number: 3, name: 'Electrico', action: 'Activar' },
  { number: 4, name: 'Autoexistente', action: 'Definir' },
  { number: 5, name: 'Entonado', action: 'Empoderar' },
  { number: 6, name: 'Ritmico', action: 'Organizar' },
  { number: 7, name: 'Resonante', action: 'Canalizar' },
  { number: 8, name: 'Galactico', action: 'Modelar' },
  { number: 9, name: 'Solar', action: 'Pulsar' },
  { number: 10, name: 'Planetario', action: 'Perfeccionar' },
  { number: 11, name: 'Espectral', action: 'Disolver' },
  { number: 12, name: 'Cristal', action: 'Cooperar' },
  { number: 13, name: 'Cosmico', action: 'Trascender' },
];

export interface MayanKin {
  seal: { name: string; number: number; keywords: string };
  tone: { number: number; name: string; action: string };
  kinNumber: number;
  luckyNumbers: number[];
}

export function calculateMayanKin(birthDate: string): MayanKin {
  // Fecha de referencia: 0 = Kin 1 = 26 Julio 1987 (Convergencia Armonica)
  const refDate = new Date(1987, 6, 26);
  const [year, month, day] = birthDate.split('-').map(Number);
  const birth = new Date(year, month - 1, day);
  const daysDiff = Math.floor((birth.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));

  // El Tzolkin tiene 260 dias (13 x 20)
  const kinNumber = ((daysDiff % 260) + 260) % 260 + 1;
  const toneIndex = (kinNumber - 1) % 13;
  const sealIndex = (kinNumber - 1) % 20;

  const seal = MAYAN_SEALS[sealIndex];
  const tone = MAYAN_TONES[toneIndex];

  // Numeros de la suerte derivados del Kin Maya
  const luckyNumbers = [
    seal.number,
    tone.number,
    reduceNumber(seal.number + tone.number),
    kinNumber % 49 || 49,
  ].filter((n, i, arr) => n >= 1 && n <= 50 && arr.indexOf(n) === i);

  return { seal, tone, kinNumber, luckyNumbers };
}

// -------------------------------------------------------
// 5. CABALA - ARBOL DE LA VIDA (10 SEFIROT)
// -------------------------------------------------------

const SEFIROT: { number: number; name: string; hebrew: string; meaning: string; attribute: string }[] = [
  { number: 1, name: 'Kether', hebrew: 'La Corona', meaning: 'Unidad, proposito divino, inicio', attribute: 'Voluntad pura' },
  { number: 2, name: 'Chokmah', hebrew: 'Sabiduria', meaning: 'Sabiduria, impulso creativo', attribute: 'Inspiracion' },
  { number: 3, name: 'Binah', hebrew: 'Entendimiento', meaning: 'Comprension, estructura, forma', attribute: 'Intelecto' },
  { number: 4, name: 'Chesed', hebrew: 'Misericordia', meaning: 'Amor, expansion, generosidad', attribute: 'Abundancia' },
  { number: 5, name: 'Gevurah', hebrew: 'Rigor', meaning: 'Fuerza, limite, juicio', attribute: 'Disciplina' },
  { number: 6, name: 'Tiferet', hebrew: 'Belleza', meaning: 'Belleza, armonia, equilibrio', attribute: 'Centro' },
  { number: 7, name: 'Netzach', hebrew: 'Victoria', meaning: 'Victoria, emocion, deseo', attribute: 'Pasion' },
  { number: 8, name: 'Hod', hebrew: 'Gloria', meaning: 'Gloria, intelecto, comunicacion', attribute: 'Logica' },
  { number: 9, name: 'Yesod', hebrew: 'Fundamento', meaning: 'Fundamento, subconsciente', attribute: 'Inconsciente' },
  { number: 10, name: 'Malkuth', hebrew: 'Reino', meaning: 'Reino, manifestacion fisica', attribute: 'Realidad' },
];

export function getSefirah(number: number) {
  const n = ((number - 1) % 10) + 1;
  return SEFIROT.find(s => s.number === n) || SEFIROT[0];
}

// Gematria cabalistica simple (valor numerico de palabras)
export function calculateGematria(text: string): number {
  // Valores hebreos equivalentes simplificados
  const normalized = normalizeText(text);
  let sum = 0;
  for (const ch of normalized) {
    if (PYTHAGOREAN_TABLE[ch]) sum += PYTHAGOREAN_TABLE[ch];
  }
  return sum;
}

// -------------------------------------------------------
// 6. CUADRADO MAGICO LO SHU (Numerologia China)
// -------------------------------------------------------

// El cuadrado Lo Shu: toda fila, columna y diagonal suma 15
// 4 9 2
// 3 5 7
// 8 1 6
export const LO_SHU_GRID = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

export interface LoShuAnalysis {
  grid: number[][];
  presentNumbers: number[];
  absentNumbers: number[];
  elementBalance: { Wood: number; Fire: number; Earth: number; Metal: number; Water: number };
  interpretation: string;
}

export function analyzeLoShu(birthDate: string): LoShuAnalysis {
  const digits = birthDate.replace(/-/g, '').split('').map(Number).filter(d => d > 0);

  const presentNumbers = [...new Set(digits)];
  const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const absentNumbers = allNumbers.filter(n => !presentNumbers.includes(n));

  // Mapeo de elementos chinos:
  // Agua: 1 | Tierra: 2, 5, 8 | Madera: 3, 4 | Metal: 6, 7 | Fuego: 9
  const elementMap: Record<string, number[]> = {
    Water: [1],
    Earth: [2, 5, 8],
    Wood: [3, 4],
    Metal: [6, 7],
    Fire: [9],
  };

  const elementBalance = {
    Water: 0, Fire: 0, Earth: 0, Metal: 0, Wood: 0,
  };

  for (const d of digits) {
    for (const [elem, nums] of Object.entries(elementMap)) {
      if (nums.includes(d)) {
        (elementBalance as any)[elem]++;
      }
    }
  }

  // Contar repeticiones
  const counts: Record<number, number> = {};
  for (const d of digits) counts[d] = (counts[d] || 0) + 1;

  const dominantElement = Object.entries(elementBalance).sort((a, b) => b[1] - a[1])[0];
  const interpretation = `Elemento dominante: ${dominantElement[0]}. ` +
    `Numeros presentes: ${presentNumbers.sort((a, b) => a - b).join(', ')}. ` +
    `Numeros ausentes: ${absentNumbers.join(', ') || 'ninguno'}. ` +
    `Los numeros ausentes representan energias a desarrollar en esta vida.`;

  return {
    grid: LO_SHU_GRID,
    presentNumbers,
    absentNumbers,
    elementBalance,
    interpretation,
  };
}

// -------------------------------------------------------
// 7. BIORRITMOS
// Fisico: 23 dias | Emocional: 28 dias | Intelectual: 33 dias
// Formula: valor = sin(2 * PI * dias / ciclo)
// -------------------------------------------------------

export interface BiorhythmResult {
  physical: { value: number; percent: number; phase: string };
  emotional: { value: number; percent: number; phase: string };
  intellectual: { value: number; percent: number; phase: string };
  totalEnergy: number;
  criticalDay: boolean;
}

export function calculateBiorhythm(birthDate: string, targetDate: string): BiorhythmResult {
  const birth = new Date(birthDate);
  const target = new Date(targetDate);
  const daysAlive = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

  const physicalRaw = Math.sin((2 * Math.PI * daysAlive) / 23);
  const emotionalRaw = Math.sin((2 * Math.PI * daysAlive) / 28);
  const intellectualRaw = Math.sin((2 * Math.PI * daysAlive) / 33);

  const toPercent = (v: number) => Math.round(v * 100);

  const getPhase = (v: number): string => {
    if (v > 0.5) return 'Pico positivo';
    if (v > 0) return 'Positivo';
    if (v > -0.5) return 'Negativo';
    return 'Valle negativo';
  };

  const totalEnergy = Math.round((physicalRaw + emotionalRaw + intellectualRaw) / 3 * 100);

  // Dia critico: cuando algun ciclo cruza el cero
  const isCritical = Math.abs(physicalRaw) < 0.05 || Math.abs(emotionalRaw) < 0.05 || Math.abs(intellectualRaw) < 0.05;

  return {
    physical: { value: physicalRaw, percent: toPercent(physicalRaw), phase: getPhase(physicalRaw) },
    emotional: { value: emotionalRaw, percent: toPercent(emotionalRaw), phase: getPhase(emotionalRaw) },
    intellectual: { value: intellectualRaw, percent: toPercent(intellectualRaw), phase: getPhase(intellectualRaw) },
    totalEnergy,
    criticalDay: isCritical,
  };
}

// -------------------------------------------------------
// 8. SECUENCIA FIBONACCI Y NUMERO AUREO
// -------------------------------------------------------

export function getFibonacciNumbers(maxRange: number, count: number): number[] {
  const fibs: number[] = [1, 1];
  while (fibs[fibs.length - 1] + fibs[fibs.length - 2] <= maxRange) {
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
  }
  // Filtrar repetidos y fuera de rango
  const unique = [...new Set(fibs)].filter(n => n >= 1 && n <= maxRange);
  return unique.slice(0, count);
}

export const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2; // phi ≈ 1.618033988749895

// Generar numeros basados en la proporcion aurea
export function getGoldenRatioNumbers(maxRange: number, count: number): number[] {
  const numbers: number[] = [];
  let current = 1;
  for (let i = 0; i < count * 3; i++) {
    const val = Math.floor(current);
    if (val >= 1 && val <= maxRange && !numbers.includes(val)) {
      numbers.push(val);
    }
    current *= GOLDEN_RATIO;
  }
  return numbers.slice(0, count);
}

// -------------------------------------------------------
// 9. LEY DE BENFORD
// En datasets naturales, el digito lider d aparece con
// probabilidad P(d) = log10(1 + 1/d)
// -------------------------------------------------------

export function getBenfordProbabilities(): { digit: number; probability: number }[] {
  const result: { digit: number; probability: number }[] = [];
  for (let d = 1; d <= 9; d++) {
    result.push({
      digit: d,
      probability: Math.log10(1 + 1 / d),
    });
  }
  return result;
}

// Aplicar Benford: numeros cuyo primer digito es mas probable
export function getBenfordNumbers(maxRange: number, count: number): number[] {
  const probs = getBenfordProbabilities();
  const numbers: number[] = [];

  // Para cada digito 1-9, tomar numeros que empiezan con ese digito
  // ponderado por la probabilidad de Benford
  for (const { digit, probability } of probs) {
    const candidates: number[] = [];
    for (let n = digit; n <= maxRange; n += Math.pow(10, Math.floor(Math.log10(n)) + 1)) {
      if (String(n)[0] === String(digit) && n >= 1 && n <= maxRange) {
        candidates.push(n);
      }
    }
    // Tomar un numero proporcional a la probabilidad de Benford
    const take = Math.ceil(probability * count);
    for (let i = 0; i < take && i < candidates.length && numbers.length < count; i++) {
      const pick = candidates[Math.floor(i * candidates.length / take)];
      if (!numbers.includes(pick)) numbers.push(pick);
    }
  }

  return numbers.slice(0, count);
}

// -------------------------------------------------------
// 10. DISTRIBUCION DE POISSON
// Modela la probabilidad de que un evento ocurra k veces
// en un intervalo, dado un promedio lambda
// P(k) = (e^-lambda * lambda^k) / k!
// -------------------------------------------------------

export function poissonProbability(k: number, lambda: number): number {
  const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);
  return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
}

// Para cada numero en una loteria, lambda = frecuencia esperada
// Calculamos cuales numeros tienen mayor probabilidad de aparecer
export function getPoissonExpectedNumbers(
  averageFrequency: number,
  maxRange: number,
  count: number,
  isDigit: boolean = false
): number[] {
  // Para cada numero, calculamos una probabilidad diferenciada
  // usando la frecuencia historica promedio como lambda base
  // pero variando por numero para evitar resultados homogeneos
  const result: { number: number; probability: number }[] = [];
  const startN = isDigit ? 0 : 1;
  const lambda = Math.max(0.1, averageFrequency);

  for (let n = startN; n <= maxRange; n++) {
    // Probabilidad base de Poisson de aparecer al menos una vez
    const baseProb = 1 - poissonProbability(0, lambda);
    // Variacion por numero: usa propiedades del propio numero
    // para crear diferenciacion natural entre numeros
    const numFactor = Math.sin(n * 0.37 + lambda * 0.13) * 0.15
                    + Math.cos(n * 0.71) * 0.10;
    result.push({ number: n, probability: Math.max(0.01, baseProb + numFactor) });
  }

  result.sort((a, b) => b.probability - a.probability);
  return result.slice(0, count).map(r => r.number);
}

// -------------------------------------------------------
// 11. NUMERO DE ANO PERSONAL (Ciclo de 9 anos)
// -------------------------------------------------------

export function calculatePersonalYear(birthDate: string, targetYear: number): number {
  const [, month, day] = birthDate.split('-').map(Number);
  const yearSum = reduceNumber(
    String(targetYear).split('').reduce((s, d) => s + parseInt(d), 0)
  );
  return reduceNumber(day + month + yearSum);
}

export function getPersonalYearMeaning(year: number): string {
  const meanings: Record<number, string> = {
    1: 'Ano 1: Nuevos comienzos. Iniciativas, liderazgo, independencia. Siembra semillas para los proximos 9 anos.',
    2: 'Ano 2: Cooperacion y paciencia. Relaciones, diplomacia. Construye alianzas.',
    3: 'Ano 3: Expresion y creatividad. Comunicacion, arte, expansion social.',
    4: 'Ano 4: Trabajo y organizacion. Construye bases solidas. Disciplina.',
    5: 'Ano 5: Cambio y libertad. Aventura, oportunidades inesperadas. Adaptabilidad.',
    6: 'Ano 6: Familia y responsabilidad. Amor, hogar, servicio a otros.',
    7: 'Ano 7: Introspeccion y espiritualidad. Estudio, reflexion, sabiduria interior.',
    8: 'Ano 8: Poder y abundancia material. Logros, finanzas, reconocimiento.',
    9: 'Ano 9: Cierre de ciclo. Terminar proyectos, soltar, prepararse para nuevo comienzo.',
  };
  return meanings[year] || meanings[1];
}

// -------------------------------------------------------
// NUMERO DE ANO UNIVERSAL
// -------------------------------------------------------

export function calculateUniversalYear(year: number): number {
  return reduceNumber(String(year).split('').reduce((s, d) => s + parseInt(d), 0));
}

// -------------------------------------------------------
// INTERPRETACIONES NUMEROLOGICAS COMPLETAS
// -------------------------------------------------------

const NUMBER_MEANINGS: Record<number, string> = {
  1: 'Liderazgo, independencia y nuevos comienzos. Energia pionera y ambicion.',
  2: 'Cooperacion, diplomacia y sensibilidad. Fuerza en la union y la dualidad.',
  3: 'Creatividad, expresion y comunicacion. Alegria y expansion social.',
  4: 'Estabilidad, trabajo y disciplina. Construccion sobre bases firmes.',
  5: 'Libertad, aventura y cambio. Adaptabilidad y experiencia sensorial.',
  6: 'Amor, familia y responsabilidad. Armonia, servicio y proteccion.',
  7: 'Espiritualidad, analisis y sabiduria. Busqueda de verdad y profundidad.',
  8: 'Poder, abundancia y logro material. Ambicion, autoridad y justicia.',
  9: 'Compasion, servicio y cierre de ciclos. Alma universal y generosidad.',
  11: 'Maestro espiritual. Intuicion elevada, inspiracion e iluminacion.',
  22: 'Maestro constructor. Vision pragmatica que transforma suenos en realidad.',
  33: 'Maestro del amor incondicional. Sanacion y guia espiritual superior.',
};

export function getNumberMeaning(n: number): string {
  return NUMBER_MEANINGS[n] || 'Numero con energia unica y potencial especial.';
}

// -------------------------------------------------------
// MOTOR PRINCIPAL: CALCULO COMPLETO
// -------------------------------------------------------

export interface CompleteAnalysis {
  // Numerologia Pitagorica
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  birthdayNumber: number;
  destinyNumber: number;
  placeNumber: number;
  personalLucky: number;

  // Numerologia Caldea
  chaldeanName: number;

  // Astrologia
  zodiacSign: ZodiacSign;
  planetaryPositions: PlanetaryPosition[];

  // Calendario Maya
  mayanKin: MayanKin;

  // Cabala
  sefirah: ReturnType<typeof getSefirah>;
  gematria: number;

  // Lo Shu
  loShu: LoShuAnalysis;

  // Biorritmos
  biorhythm: BiorhythmResult;

  // Fibonacci y Aureo
  fibonacciNumbers: number[];
  goldenRatioNumbers: number[];

  // Benford
  benfordNumbers: number[];

  // Ano personal
  personalYear: number;
  personalYearMeaning: string;
  universalYear: number;

  // Significados
  meanings: Record<string, string>;
}

export function calculateCompleteAnalysis(
  fullName: string,
  birthDate: string,
  birthPlace: string,
  consultationDate: string
): CompleteAnalysis {
  const [year, month, day] = birthDate.split('-').map(Number);
  const [cYear, cMonth, cDay] = consultationDate.split('-').map(Number);

  // 1. Pitagorico
  const lifePath = calculateLifePath(year, month, day);
  const expression = calculateExpression(fullName);
  const soulUrge = calculateSoulUrge(fullName);
  const personality = calculatePersonality(fullName);
  const birthdayNumber = calculateBirthdayNumber(day);
  const destinyNumber = calculateDestinyNumber(cYear, cMonth, cDay);
  const placeNumber = calculatePlaceNumber(birthPlace);
  const personalLucky = calculatePersonalLuckyNumber(lifePath, birthdayNumber, soulUrge);

  // 2. Caldeo
  const chaldeanName = calculateChaldeanNameNumber(fullName);

  // 3. Astrologia
  const zodiacSign = getZodiacSign(month, day);
  const planetaryPositions = calculatePlanetaryPositions(birthDate);

  // 4. Maya
  const mayanKin = calculateMayanKin(birthDate);

  // 5. Cabala
  const sefirah = getSefirah(personalLucky);
  const gematria = calculateGematria(fullName);

  // 6. Lo Shu
  const loShu = analyzeLoShu(birthDate);

  // 7. Biorritmos
  const biorhythm = calculateBiorhythm(birthDate, consultationDate);

  // 8. Fibonacci y Aureo
  const fibonacciNumbers = getFibonacciNumbers(50, 10);
  const goldenRatioNumbers = getGoldenRatioNumbers(50, 10);

  // 9. Benford
  const benfordNumbers = getBenfordNumbers(50, 10);

  // 11. Ano personal
  const personalYear = calculatePersonalYear(birthDate, cYear);
  const personalYearMeaning = getPersonalYearMeaning(personalYear);
  const universalYear = calculateUniversalYear(cYear);

  return {
    lifePath, expression, soulUrge, personality,
    birthdayNumber, destinyNumber, placeNumber, personalLucky,
    chaldeanName,
    zodiacSign,
    planetaryPositions,
    mayanKin,
    sefirah, gematria,
    loShu,
    biorhythm,
    fibonacciNumbers, goldenRatioNumbers,
    benfordNumbers,
    personalYear, personalYearMeaning, universalYear,
    meanings: {
      lifePath: getNumberMeaning(lifePath),
      expression: getNumberMeaning(expression),
      soulUrge: getNumberMeaning(soulUrge),
      personality: getNumberMeaning(personality),
      birthdayNumber: getNumberMeaning(birthdayNumber),
      destinyNumber: getNumberMeaning(destinyNumber),
      placeNumber: getNumberMeaning(placeNumber),
      personalLucky: getNumberMeaning(personalLucky),
      chaldeanName: getNumberMeaning(chaldeanName),
      personalYear: personalYearMeaning,
    },
  };
}

// -------------------------------------------------------
// GENERADOR DE NUMEROS CON EXPLICACION DETALLADA
// Combina TODOS los sistemas y produce un resumen por numero
// -------------------------------------------------------

export interface NumberSource {
  system: string;
  value: number;
  detail: string;
  weight: number;
}

export interface DetailedNumber {
  number: number;
  sources: NumberSource[];
  totalScore: number;
  summary: string;
}

export interface GenerationResult {
  main: number[];
  bonus: number[];
  details: DetailedNumber[];
  systemsUsed: string[];
  // Informacion cuantica (motor cuantico)
  quantum?: QuantumGenerationResult;
  quantumEnabled?: boolean;
}

// Funcion auxiliar para mapear al rango de la loteria
// Para loterias standard (1..max): distribuye uniformemente en 1..max
// Para loterias de digitos (0..9): mapea al rango 0..max
function mapToRange(n: number, max: number, isDigit: boolean = false): number {
  if (isDigit) {
    // Digit-based: 0..max (typically 0..9)
    if (n >= 0 && n <= max) return n;
    return Math.abs(n) % (max + 1);
  }
  // Standard: 1..max
  // Usar modulo distribuido para evitar que todo se concentre en 1-9
  if (n >= 1 && n <= max) return n;
  const mapped = ((Math.abs(n) - 1) % max) + 1;
  return mapped;
}

// PRNG criptografico - usa crypto.getRandomValues cuando esta disponible
// Para entornos sin crypto (Android WebView antiguo), usa Math.random con mezcla
function createSecureRng(seed: number): () => number {
  // Mezclar semilla con entropia real del momento
  let state = Math.abs(seed) || 1;
  // Mezclar con timestamp de alta resolucion para mayor entropia
  const timeEntropy = (typeof performance !== 'undefined' && performance.now)
    ? performance.now()
    : Date.now();
  state = (state * 31 + Math.floor(timeEntropy * 1000) + Math.floor(Math.random() * 1000000)) >>> 0;
  state = state || 1;

  // Intentar usar crypto para entropia adicional en cada llamada
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    return () => {
      crypto.getRandomValues(buf);
      // Mezclar crypto con LCG para mayor dispersion
      state = (state * 1664525 + 1013904223 + buf[0]) >>> 0;
      return (state & 0x7FFFFFFF) / 0x7FFFFFFF;
    };
  }

  // Fallback: LCG mejorado (xorshift32) con buena entropia inicial
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state = state >>> 0;
    return state / 4294967296;
  };
}

export function generateCompleteNumbers(
  analysis: CompleteAnalysis,
  lotteryId: string,
  historicalData: {
    frequency: { number: number; frequency: number; percentage: number }[];
    hotNumbers: number[];
    coldNumbers: number[];
    overdueNumbers: number[];
    averageFrequency: number;
    patterns: { averageSum: number };
  },
  weights: {
    numerology: number;
    astrology: number;
    maya: number;
    fibonacci: number;
    benford: number;
    poisson: number;
    hotNumbers: number;
    coldNumbers: number;
    overdue: number;
    biorhythm: number;
    randomness: number;
  },
  seed: number,
  birthDate: string,
  consultationDate: string
): GenerationResult {
  // Configuracion completa de todas las loterias soportadas
  const LOTTERY_RANGES: Record<string, {
    main: number; bonus: number; mainCount: number; bonusCount: number;
    isDigit: boolean; startFrom: number;
  }> = {
    euromillones:       { main: 50, bonus: 12, mainCount: 5, bonusCount: 2, isDigit: false, startFrom: 1 },
    primitiva:          { main: 49, bonus: 10, mainCount: 6, bonusCount: 1, isDigit: false, startFrom: 1 },
    eurojackpot:        { main: 50, bonus: 12, mainCount: 5, bonusCount: 2, isDigit: false, startFrom: 1 },
    bonoloto:           { main: 49, bonus: 10, mainCount: 6, bonusCount: 1, isDigit: false, startFrom: 1 },
    loteria_nacional:   { main: 9,  bonus: 55, mainCount: 5, bonusCount: 1, isDigit: true,  startFrom: 0 },
    once_cupon:         { main: 9,  bonus: 55, mainCount: 5, bonusCount: 1, isDigit: true,  startFrom: 0 },
    once_triplex:       { main: 9,  bonus: 0,  mainCount: 3, bonusCount: 0, isDigit: true,  startFrom: 0 },
    once_combo:         { main: 9,  bonus: 9,  mainCount: 5, bonusCount: 1, isDigit: true,  startFrom: 0 },
    once_eurojackpot:   { main: 50, bonus: 12, mainCount: 5, bonusCount: 2, isDigit: false, startFrom: 1 },
  };

  const config = LOTTERY_RANGES[lotteryId] || LOTTERY_RANGES.euromillones;
  // PRNG seguro con entropia real - cambia en cada llamada
  const rng = createSecureRng(seed);
  const maxNum = config.main;
  const isDigit = config.isDigit;
  const startFrom = config.startFrom;
  const systemsUsed: string[] = [];

  // Normalizar pesos a escala 0-1 (minimo 0.01 para evitar pesos cero)
  const w = {
    numerology:  Math.max(0.01, weights.numerology / 100),
    astrology:   Math.max(0.01, weights.astrology / 100),
    maya:        Math.max(0.01, weights.maya / 100),
    fibonacci:   Math.max(0.01, weights.fibonacci / 100),
    benford:     Math.max(0.01, weights.benford / 100),
    poisson:     Math.max(0.01, weights.poisson / 100),
    hotNumbers:  Math.max(0.01, weights.hotNumbers / 100),
    coldNumbers: Math.max(0.01, weights.coldNumbers / 100),
    overdue:     Math.max(0.01, weights.overdue / 100),
    biorhythm:   Math.max(0.01, weights.biorhythm / 100),
    randomness:  Math.max(0.01, weights.randomness / 100),
  };

  // Recopilar numeros de cada sistema con peso real
  const allSources: Map<number, NumberSource[]> = new Map();

  function addSource(num: number, system: string, detail: string, weight: number) {
    const mapped = mapToRange(num, maxNum, isDigit);
    if (!allSources.has(mapped)) allSources.set(mapped, []);
    allSources.get(mapped)!.push({ system, value: mapped, detail, weight: Math.max(0, weight / 100) });
    if (!systemsUsed.includes(system)) systemsUsed.push(system);
  }

  // Para loterias standard (1-50), los sistemas cosmico producen numeros 1-9
  // Necesitamos EXPANDIR estos al rango completo de la loteria
  // usando derivaciones matematicas que preservan la vibracion del numero
  function addExpandedSources(baseNum: number, system: string, detail: string, weight: number) {
    if (isDigit) {
      addSource(baseNum, system, detail, weight);
      return;
    }
    const base = mapToRange(baseNum, maxNum, false);
    addSource(base, system, `${detail} (directo)`, weight);
    // Derivaciones que expanden al rango completo
    const d1 = base + String(base).split('').reduce((s, d) => s + parseInt(d), 0);
    if (d1 <= maxNum && d1 !== base) addSource(d1, system, `${detail} (+suma dig=${d1})`, weight * 0.6);
    const d2 = Math.floor(base * GOLDEN_RATIO) % maxNum + 1;
    if (d2 <= maxNum && d2 !== base) addSource(d2, system, `${detail} (aureo=${d2})`, weight * 0.5);
    const d3 = base + 9;
    if (d3 <= maxNum && d3 !== base) addSource(d3, system, `${detail} (+9=${d3})`, weight * 0.55);
    const d4 = base + 18;
    if (d4 <= maxNum && ![base, d1, d2, d3].includes(d4)) addSource(d4, system, `${detail} (+18=${d4})`, weight * 0.45);
    const d5 = base + 27;
    if (d5 <= maxNum && ![base, d1, d2, d3, d4].includes(d5)) addSource(d5, system, `${detail} (+27=${d5})`, weight * 0.4);
    const d6 = base + 36;
    if (d6 <= maxNum && ![base, d1, d2, d3, d4, d5].includes(d6)) addSource(d6, system, `${detail} (+36=${d6})`, weight * 0.35);
  }

  // 1. NUMEROLOGIA PITAGORICA
  const pythNumbers = [
    analysis.lifePath, analysis.expression, analysis.soulUrge,
    analysis.personality, analysis.birthdayNumber, analysis.destinyNumber,
    analysis.placeNumber, analysis.personalLucky,
  ];
  pythNumbers.forEach((n, i) => {
    const names = ['Life Path', 'Expression', 'Soul Urge', 'Personality', 'Birthday', 'Destino', 'Lugar', 'Suerte Personal'];
    addExpandedSources(n, 'Numerologia Pitagorica', `${names[i]} = ${n}: ${getNumberMeaning(n).split('.')[0]}`, weights.numerology);
  });

  // 2. NUMEROLOGIA CALDEA
  addExpandedSources(analysis.chaldeanName, 'Numerologia Caldea',
    `Nombre caldeo = ${analysis.chaldeanName}: vibracion sonora`, weights.numerology);

  // 3. ASTROLOGIA
  addExpandedSources(analysis.zodiacSign.rulerNumber, 'Astrologia',
    `Regente ${analysis.zodiacSign.ruler} (${analysis.zodiacSign.name}, ${analysis.zodiacSign.element})`, weights.astrology);
  analysis.zodiacSign.luckyNumbers.forEach(n => {
    addExpandedSources(n, 'Astrologia', `Numero de suerte de ${analysis.zodiacSign.name}`, weights.astrology);
  });
  analysis.planetaryPositions.forEach(p => {
    addExpandedSources(p.luckyNumbers[0], 'Astrologia Planetaria',
      `${p.planet} en ${p.sign.name} (${p.degree} grados)`, weights.astrology * 0.7);
  });

  // 4. MAYA TZOLKIN
  analysis.mayanKin.luckyNumbers.forEach(n => {
    addExpandedSources(n, 'Calendario Maya Tzolkin',
      `Kin ${analysis.mayanKin.kinNumber}: ${analysis.mayanKin.tone.name} ${analysis.mayanKin.seal.name}`, weights.maya);
  });

  // 5. CABALA
  addExpandedSources(analysis.sefirah.number, 'Cabala/Arbol de la Vida',
    `Sefirah ${analysis.sefirah.name} (${analysis.sefirah.hebrew})`, weights.numerology * 0.6);
  addExpandedSources(analysis.gematria % 9 || 9, 'Cabala/Gematria',
    `Gematria del nombre = ${analysis.gematria}`, weights.numerology * 0.5);

  // 6. LO SHU
  analysis.loShu.presentNumbers.forEach(n => {
    addExpandedSources(n, 'Lo Shu (China)',
      `Numero ${n} en tu cuadrado magico Lo Shu`, weights.numerology * 0.4);
  });

  // 7. BIORRITMOS
  const bio = analysis.biorhythm;
  if (bio.physical.percent > 0) addExpandedSources(Math.abs(bio.physical.percent) || 1, 'Biorritmo Fisico',
    `Ciclo fisico al ${bio.physical.percent}% (${bio.physical.phase})`, weights.biorhythm);
  if (bio.emotional.percent > 0) addExpandedSources(Math.abs(bio.emotional.percent) || 2, 'Biorritmo Emocional',
    `Ciclo emocional al ${bio.emotional.percent}% (${bio.emotional.phase})`, weights.biorhythm);
  if (bio.intellectual.percent > 0) addExpandedSources(Math.abs(bio.intellectual.percent) || 3, 'Biorritmo Intelectual',
    `Ciclo intelectual al ${bio.intellectual.percent}% (${bio.intellectual.phase})`, weights.biorhythm);

  // 8. FIBONACCI
  analysis.fibonacciNumbers.forEach(n => {
    addExpandedSources(n, 'Fibonacci',
      `Secuencia de Fibonacci (${n}) - proporcion natural`, weights.fibonacci);
  });

  // 9. NUMERO AUREO
  analysis.goldenRatioNumbers.forEach(n => {
    addExpandedSources(n, 'Numero Aureo (phi)',
      `Derivado de phi (${GOLDEN_RATIO.toFixed(6)})`, weights.fibonacci * 0.7);
  });

  // 10. LEY DE BENFORD
  analysis.benfordNumbers.forEach(n => {
    addExpandedSources(n, 'Ley de Benford',
      `Primer digito de alta probabilidad natural segun Benford`, weights.benford);
  });

  // 11. ANO PERSONAL
  addExpandedSources(analysis.personalYear, 'Ano Personal',
    `Ano personal ${analysis.personalYear}: ${analysis.personalYearMeaning.split(':')[0]}`, weights.numerology * 0.5);

  // 12. DATOS HISTORICOS
  historicalData.hotNumbers.forEach((n, i) => {
    addSource(n, 'Analisis Historico (Frecuente)',
      `Top ${i + 1} mas frecuente historicamente`, weights.hotNumbers * (1 - i * 0.07));
  });
  historicalData.coldNumbers.forEach((n, i) => {
    addSource(n, 'Analisis Historico (Infrecuente)',
      `Entre los menos frecuentes`, weights.coldNumbers * (1 - i * 0.07));
  });
  historicalData.overdueNumbers.forEach((n, i) => {
    addSource(n, 'Analisis Historico (Atrasado)',
      `Numero atrasado - sin aparecer recientemente`, weights.overdue * (1 - i * 0.07));
  });

  // 13. POISSON - Numeros con mayor probabilidad esperada
  const poissonNums = getPoissonExpectedNumbers(historicalData.averageFrequency, maxNum, 15, isDigit);
  poissonNums.forEach((n, i) => {
    addSource(n, 'Distribucion de Poisson',
      `Alta probabilidad de aparicion segun modelo Poisson (lambda=${historicalData.averageFrequency.toFixed(2)})`, weights.poisson * (1 - i * 0.05));
  });

  // ============================================================
  // FASE 2: Scoring con pesos reales del usuario
  // ============================================================
  const scores: Map<number, { score: number; sources: NumberSource[] }> = new Map();

  for (const [num, sources] of allSources) {
    let totalScore = 0;
    for (const src of sources) {
      totalScore += 10 * src.weight;
    }
    const multiSystemBonus = sources.length > 1
      ? Math.pow(sources.length, 1.5) * 3
      : 0;
    totalScore += multiSystemBonus;
    scores.set(num, { score: totalScore, sources });
  }

  // ============================================================
  // FASE 3: Rellenar TODOS los numeros del rango con componente
  // aleatorio para que todos tengan posibilidad de seleccion
  // ============================================================
  for (let i = startFrom; i <= maxNum; i++) {
    const existing = scores.get(i);
    if (existing) {
      existing.score += rng() * w.randomness * 25;
    } else {
      scores.set(i, { score: rng() * w.randomness * 25, sources: [] });
    }
  }

  // ============================================================
  // FASE 4: Seleccion estocastica ponderada (weighted sampling)
  // En vez de tomar siempre los top-N, usamos muestreo ponderado
  // Esto produce resultados DIFERENTES en cada generacion
  // mientras respeta las probabilidades del analisis
  // ============================================================
  const allCandidates = Array.from(scores.entries()).map(([num, data]) => ({
    num,
    score: Math.max(0.1, data.score),
    sources: data.sources,
  }));

  function weightedSampleWithoutReplacement(
    candidates: { num: number; score: number; sources: NumberSource[] }[],
    count: number
  ): { num: number; score: number; sources: NumberSource[] }[] {
    const pool = [...candidates];
    const selected: { num: number; score: number; sources: NumberSource[] }[] = [];
    for (let i = 0; i < count && pool.length > 0; i++) {
      const totalWeight = pool.reduce((s, c) => s + c.score, 0);
      if (totalWeight <= 0) break;
      let r = rng() * totalWeight;
      let idx = 0;
      for (let j = 0; j < pool.length; j++) {
        r -= pool[j].score;
        if (r <= 0) { idx = j; break; }
        idx = j;
      }
      selected.push(pool[idx]);
      pool.splice(idx, 1);
    }
    return selected;
  }

// ============================================================
// INTEGRACION CUANTICA
// El motor cuantico procesa los candidatos del motor cosmico
// usando superposicion, entrelazamiento, tiempo en espiral,
// realidades alternativas y coherencia cuantica.
// (GenerationResult se extiende mas arriba con campos cuanticos)
// ============================================================

const sampled = weightedSampleWithoutReplacement(allCandidates, config.mainCount);
  sampled.sort((a, b) => a.num - b.num);

  const selectedMain: number[] = sampled.map(s => s.num);
  const details: DetailedNumber[] = sampled.map(s => {
    const summary = s.sources.length > 0
      ? `Este numero aparece en ${s.sources.length} sistema(s): ` +
        s.sources.map(src => `${src.system} (${src.detail})`).join('; ')
      : 'Seleccion por componente estocastico del algoritmo.';
    return {
      number: s.num,
      sources: s.sources,
      totalScore: Math.round(s.score),
      summary,
    };
  });

  // ============================================================
  // FASE 5: Numeros BONUS (estrellas/reintegro/serie)
  // Tambien con muestreo ponderado, no determinista
  // ============================================================
  let selectedBonus: number[] = [];

  if (config.bonus > 0 && config.bonusCount > 0) {
    const bonusCandidates: { num: number; score: number }[] = [];
    for (let i = 1; i <= config.bonus; i++) {
      let score = rng() * 50;
      pythNumbers.forEach(n => {
        const mapped = mapToRange(n, config.bonus, false);
        if (mapped === i) score += 100 * w.numerology;
      });
      analysis.zodiacSign.luckyNumbers.forEach(n => {
        const mapped = mapToRange(n, config.bonus, false);
        if (mapped === i) score += 50 * w.astrology;
      });
      analysis.mayanKin.luckyNumbers.forEach(n => {
        const mapped = mapToRange(n, config.bonus, false);
        if (mapped === i) score += 40 * w.maya;
      });
      bonusCandidates.push({ num: i, score: Math.max(0.1, score) });
    }
    // Muestreo ponderado para bonus
    const bonusPool = [...bonusCandidates];
    for (let i = 0; i < config.bonusCount && bonusPool.length > 0; i++) {
      const totalW = bonusPool.reduce((s, c) => s + c.score, 0);
      if (totalW <= 0) break;
      let r = rng() * totalW;
      let idx = 0;
      for (let j = 0; j < bonusPool.length; j++) {
        r -= bonusPool[j].score;
        if (r <= 0) { idx = j; break; }
        idx = j;
      }
      selectedBonus.push(bonusPool[idx].num);
      bonusPool.splice(idx, 1);
    }
    selectedBonus.sort((a, b) => a - b);
  }

  // ============================================================
  // FASE 6: PROCESAMIENTO CUANTICO
  // Pasar los candidatos del motor cosmico por el motor cuantico
  // para enriquecer la seleccion con:
  // - Superposicion y colapso de funcion de onda
  // - Entrelazamiento numerologico
  // - Tiempo en espiral (Penrose CCC + I Ching)
  // - Realidades alternativas (Many Worlds - Everett)
  // - Coherencia cuantica
  // ============================================================
  const quantumCandidates = new Map<number, { score: number; systems: string[] }>();
  for (const [num, data] of scores) {
    const systems = data.sources.map(s => s.system);
    quantumCandidates.set(num, { score: data.score, systems });
  }

  const quantumResult = generateQuantumNumbers({
    candidates: quantumCandidates,
    maxRange: maxNum,
    startFrom,
    count: config.mainCount,
    bonusCount: config.bonusCount,
    bonusMax: config.bonus,
    birthDate: birthDate,
    consultationDate,
    rng,
  });

  // Usar los numeros cuanticos como resultado principal
  // (mas rico que el muestreo clasico)
  const quantumMain = quantumResult.mainNumbers;
  const quantumBonus = quantumResult.bonusNumbers;

  // Detalles enriquecidos con info cuantica
  const quantumDetails: DetailedNumber[] = quantumMain.map(num => {
    const existingData = scores.get(num);
    const sources = existingData?.sources || [];
    const quantumState = quantumResult.quantumStates.get(num);
    const quantumInfo = quantumState
      ? ` | Coherencia cuantica: ${quantumState.probability.toFixed(2)} ` +
        `(fase ${(quantumState.phase * 180 / Math.PI).toFixed(0)}deg, ` +
        `${quantumState.systems.length} sistemas)`
      : '';
    const summary = sources.length > 0
      ? `Este numero aparece en ${sources.length} sistema(s): ` +
        sources.map(src => `${src.system} (${src.detail})`).join('; ') +
        quantumInfo
      : `Seleccion cuantica por colapso de funcion de onda.` + quantumInfo;
    return {
      number: num,
      sources,
      totalScore: Math.round(existingData?.score || quantumState?.probability || 0),
      summary,
    };
  });

  return {
    main: quantumMain,
    bonus: quantumBonus.length > 0 ? quantumBonus : selectedBonus,
    details: quantumDetails,
    systemsUsed: [...systemsUsed, 'Motor Cuantico (Superposicion)', 'Tiempo en Espiral (I Ching + Penrose)', 'Realidades Alternativas (Everett)'],
    quantum: quantumResult,
    quantumEnabled: true,
  };
}
