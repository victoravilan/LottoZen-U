// ============================================================
// LottoZen Ultra - Motor Numerologico
// ============================================================

// Tabla Pitagorica de letras a numeros
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

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
const MASTER_NUMBERS = new Set([11, 22, 33]);

// Acentos espanoles a letras base
const ACCENT_MAP: Record<string, string> = {
  '\u00E1': 'A', '\u00C1': 'A',
  '\u00E9': 'E', '\u00C9': 'E',
  '\u00ED': 'I', '\u00CD': 'I',
  '\u00F3': 'O', '\u00D3': 'O',
  '\u00FA': 'U', '\u00DA': 'U',
  '\u00FC': 'U', '\u00DC': 'U',
  '\u00F1': 'N', '\u00D1': 'N',
};

function normalizeText(text: string): string {
  let result = '';
  for (const ch of text.toUpperCase()) {
    result += ACCENT_MAP[ch] || ch;
  }
  return result;
}

// Reducir a un solo digito, respetando numeros maestros
export function reduceNumber(n: number): number {
  while (n > 9 && !MASTER_NUMBERS.has(n)) {
    n = String(n)
      .split('')
      .reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return n;
}

// Número de Vida (Life Path) - basado en fecha de nacimiento
export function calculateLifePath(year: number, month: number, day: number): number {
  const reducedDay = reduceNumber(day);
  const reducedMonth = reduceNumber(month);
  const reducedYear = reduceNumber(
    String(year)
      .split('')
      .reduce((sum, d) => sum + parseInt(d, 10), 0)
  );
  return reduceNumber(reducedDay + reducedMonth + reducedYear);
}

// Número de Expresion (Destiny) - basado en nombre completo
export function calculateExpression(fullName: string): number {
  const normalized = normalizeText(fullName);
  let sum = 0;
  for (const ch of normalized) {
    if (PYTHAGOREAN_TABLE[ch]) {
      sum += PYTHAGOREAN_TABLE[ch];
    }
  }
  return reduceNumber(sum);
}

// Número del Alma (Heart's Desire / Soul Urge) - solo vocales
export function calculateSoulUrge(fullName: string): number {
  const normalized = normalizeText(fullName);
  let sum = 0;
  for (const ch of normalized) {
    if (VOWELS.has(ch) && PYTHAGOREAN_TABLE[ch]) {
      sum += PYTHAGOREAN_TABLE[ch];
    }
  }
  return reduceNumber(sum);
}

// Número de Personalidad - solo consonantes
export function calculatePersonality(fullName: string): number {
  const normalized = normalizeText(fullName);
  let sum = 0;
  for (const ch of normalized) {
    if (!VOWELS.has(ch) && PYTHAGOREAN_TABLE[ch]) {
      sum += PYTHAGOREAN_TABLE[ch];
    }
  }
  return reduceNumber(sum);
}

// Número del dia de nacimiento (Birthday Number)
export function calculateBirthdayNumber(day: number): number {
  return reduceNumber(day);
}

// Número del Destino - basado en fecha de consulta
export function calculateDestinyNumber(year: number, month: number, day: number): number {
  return calculateLifePath(year, month, day);
}

// Número del Lugar - basado en ciudad/pais de nacimiento
export function calculatePlaceNumber(place: string): number {
  const normalized = normalizeText(place);
  let sum = 0;
  for (const ch of normalized) {
    if (PYTHAGOREAN_TABLE[ch]) {
      sum += PYTHAGOREAN_TABLE[ch];
    }
  }
  return reduceNumber(sum);
}

// Numero de la suerte personal (Personal Lucky Number)
// Combina Life Path + Birthday + Soul Urge
export function calculatePersonalLuckyNumber(
  lifePath: number,
  birthday: number,
  soulUrge: number
): number {
  return reduceNumber(lifePath + birthday + soulUrge);
}

// ============================================================
// Interpretaciones numerologicas
// ============================================================

const NUMBER_MEANINGS: Record<number, string> = {
  1: 'Liderazgo, independencia y nuevos comienzos. Eres pionero por naturaleza.',
  2: 'Cooperacion, diplomacia y sensibilidad. Tu fuerza esta en la union.',
  3: 'Creatividad, expresion y alegria. Comunicas con el corazon.',
  4: 'Estabilidad, trabajo y disciplina. Construyes sobre bases solidas.',
  5: 'Libertad, aventura y cambio. La vida te pide movimiento.',
  6: 'Amor, familia y responsabilidad. Eres el refugio de los tuyos.',
  7: 'Espiritualidad, analisis y sabiduria. Buscas la verdad profunda.',
  8: 'Poder, abundancia y logro material. Tu ambito es el exito.',
  9: 'Compasion, servicio y cierre de ciclos. Eres alma universal.',
  11: 'Maestro espiritual. Tu intuicion ilumina a otros. Numero maestro.',
  22: 'Maestro constructor. Transformas suenos en realidad. Numero maestro.',
  33: 'Maestro del amor incondicional. Sanas con tu presencia. Numero maestro.',
};

export function getNumberMeaning(n: number): string {
  return NUMBER_MEANINGS[n] || 'Numero especial con energia unica.';
}

// ============================================================
// Generacion de numeros de loteria desde datos numerologicos
// ============================================================

export interface NumerologyResult {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  birthdayNumber: number;
  destinyNumber: number;
  placeNumber: number;
  personalLucky: number;
  meanings: Record<string, string>;
}

export function calculateFullNumerology(
  fullName: string,
  birthDate: string, // YYYY-MM-DD
  birthPlace: string,
  consultationDate: string // YYYY-MM-DD
): NumerologyResult {
  const [year, month, day] = birthDate.split('-').map(Number);
  const [cYear, cMonth, cDay] = consultationDate.split('-').map(Number);

  const lifePath = calculateLifePath(year, month, day);
  const expression = calculateExpression(fullName);
  const soulUrge = calculateSoulUrge(fullName);
  const personality = calculatePersonality(fullName);
  const birthdayNumber = calculateBirthdayNumber(day);
  const destinyNumber = calculateDestinyNumber(cYear, cMonth, cDay);
  const placeNumber = calculatePlaceNumber(birthPlace);
  const personalLucky = calculatePersonalLuckyNumber(lifePath, birthdayNumber, soulUrge);

  return {
    lifePath,
    expression,
    soulUrge,
    personality,
    birthdayNumber,
    destinyNumber,
    placeNumber,
    personalLucky,
    meanings: {
      lifePath: getNumberMeaning(lifePath),
      expression: getNumberMeaning(expression),
      soulUrge: getNumberMeaning(soulUrge),
      personality: getNumberMeaning(personality),
      birthdayNumber: getNumberMeaning(birthdayNumber),
      destinyNumber: getNumberMeaning(destinyNumber),
      placeNumber: getNumberMeaning(placeNumber),
    },
  };
}

// Genera numeros derivados de los valores numerologicos
// Aplica operaciones matematicas para expandir al rango de la loteria
export function generateNumerologyNumbers(
  numerology: NumerologyResult,
  maxNumber: number,
  count: number
): number[] {
  const baseNumbers = [
    numerology.lifePath,
    numerology.expression,
    numerology.soulUrge,
    numerology.personality,
    numerology.birthdayNumber,
    numerology.destinyNumber,
    numerology.placeNumber,
    numerology.personalLucky,
  ];

  const candidates = new Set<number>();

  // Mapeo directo (si esta en rango)
  for (const n of baseNumbers) {
    if (n >= 1 && n <= maxNumber) {
      candidates.add(n);
    }
  }

  // Operaciones matematicas entre numeros base
  const operations = [
    (a: number, b: number) => a + b,
    (a: number, b: number) => Math.abs(a * b),
    (a: number, b: number) => a + b + numerology.personalLucky,
    (a: number, b: number) => Math.abs(a - b) + numerology.birthdayNumber,
    (a: number) => a * numerology.lifePath + numerology.destinyNumber,
    (a: number) => a * numerology.soulUrge + numerology.placeNumber,
    (a: number) => (a * numerology.expression) % maxNumber + 1,
    (a: number) => (a * numerology.personality + numerology.birthdayNumber) % maxNumber + 1,
  ];

  for (let i = 0; i < baseNumbers.length && candidates.size < count + 5; i++) {
    for (let j = i + 1; j < baseNumbers.length && candidates.size < count + 5; j++) {
      for (const op of operations) {
        if (op.length === 2) {
          const val = (op as (a: number, b: number) => number)(baseNumbers[i], baseNumbers[j]);
          const mapped = val <= maxNumber ? val : (val % maxNumber) + 1;
          if (mapped >= 1 && mapped <= maxNumber) candidates.add(mapped);
        }
      }
    }
  }

  // Operaciones unarias
  for (const n of baseNumbers) {
    for (const op of operations) {
      if (op.length === 1) {
        const val = (op as (a: number) => number)(n);
        const mapped = val <= maxNumber ? val : (val % maxNumber) + 1;
        if (mapped >= 1 && mapped <= maxNumber) candidates.add(mapped);
      }
    }
    if (candidates.size >= count + 10) break;
  }

  // Convertir a array, mezclar y tomar los necesarios
  const arr = Array.from(candidates);
  const result: number[] = [];

  // Priorizar los que aparecen primero (mas relevantes numericamente)
  for (const n of arr) {
    if (result.length >= count) break;
    result.push(n);
  }

  // Si no hay suficientes, expandir con derivados
  let offset = 1;
  while (result.length < count && offset < maxNumber) {
    for (const n of baseNumbers) {
      const val = ((n * offset + numerology.personalLucky) % maxNumber) + 1;
      if (!result.includes(val) && val >= 1 && val <= maxNumber) {
        result.push(val);
        if (result.length >= count) break;
      }
    }
    offset++;
  }

  return result.slice(0, count);
}
