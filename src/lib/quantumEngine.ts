// ============================================================
// LottoZen Ultra - Motor Cuantico Predictivo
// ============================================================
// Integra conceptos avanzados de fisica cuantica y teorias del
// tiempo para enriquecer la generacion de numeros:
//
// 13. Superposicion Cuantica de Numeros
//     - Cada numero existe en superposicion de estados
//     - La observacion (generacion) colapsa la funcion de onda
//     - Probabilidad cuantica NO-kolmogoroviana (puede ser negativa
//       e interferir constructiva/destructivamente)
//
// 14. Entrelazamiento Numerologico
//     - Numeros vinculados por afinidad vibratoria se "entrelazan"
//     - Si un numero es seleccionado, sus entrelazados cambian
//       su probabilidad instantaneamente
//     - Inspirado en entrelazamiento cuantico (EPR, Bell)
//
// 15. Tiempo en Espiral (Penrose CCC + I Ching)
//     - El tiempo no es lineal sino espiral: ciclos que se repiten
//       pero en niveles superiores (como la CCC de Penrose)
//     - Cada "vuelta" de la espiral tiene patrones similares pero
//       con desplazamiento de fase
//     - El I Ching (Libro de las Mutaciones) captura estos ciclos
//       en 64 hexagramas que se repiten en espiral temporal
//
// 16. Realidades Alternativas (Many Worlds - Everett + Garnier)
//     - Cada generacion explora multiples lineas temporales
//     - Se generan N "realidades paralelas" con numeros diferentes
//     - Se colapsa a la realidad con mayor coherencia cosmica
//     - Inspirado en la interpretacion de Muchos Mundos de Everett
//       y los conceptos de realidades alternativas
//
// 17. Resonancia Schumann (7.83 Hz)
//     - Frecuencia base de resonancia Tierra-ionosfera
//     - Se usa como oscilador fundamental para modular probabilidades
//     - Los numeros se ajustan segun la fase Schumann del momento
//
// 18. Coherencia Cuantica
//     - Cuando multiples sistemas cosmicos coinciden en un numero,
//       hay "coherencia cuantica" que amplifica su probabilidad
//     - Similar al laser: fotones en fase producen luz coherente
//
// Referencias teoricas:
// - Penrose, R. (2010). "Cycles of Time: An Extraordinary New View
//   of the Universe" - CCC (Conformal Cyclic Cosmology)
// - Everett, H. (1957). "Relative State Formulation of Quantum Theory"
// - Nature (2021). "Quantum generators of random numbers"
// - Schumann resonances: 7.83, 14.3, 20.8, 27.3, 33.8 Hz
// - I Ching: 64 hexagramas como patrones temporales ciclicos
// ============================================================

import { GOLDEN_RATIO, reduceNumber } from './cosmicEngine';

// -------------------------------------------------------
// 13. SUPERPOSICION CUANTICA
// -------------------------------------------------------

/**
 * Representa un numero en superposicion cuantica.
 * Antes del "colapso" (medicion), el numero existe como una
 * superposicion de multiples estados (valores posibles) con
 * amplitudes de probabilidad que pueden ser complejas.
 *
 * La probabilidad cuantica es NO-kolmogoroviana:
 * - Puede ser negativa (interferencia destructiva)
 * - Dos eventos no son mutuamente excluyentes necesariamente
 * - Permite interferencia constructiva/destructiva entre sistemas
 */
export interface QuantumState {
  number: number;
  amplitude: number; // Amplitud compleja simplificada (parte real)
  phase: number; // Fase en radianes [0, 2*PI)
  probability: number; // |amplitud|^2 (siempre >= 0)
  systems: string[]; // Sistemas que contribuyen a este estado
}

/**
 * Crea una superposicion cuantica de todos los numeros posibles
 * en el rango de la loteria. Cada numero recibe una amplitud
 * inicial basada en los sistemas cosmicos que lo respaldan.
 *
 * La amplitud puede ser NEGATIVA - esto es clave de la cuantica:
 * dos sistemas pueden interferir destructivamente si estan
 * en contrafase, reduciendo la probabilidad de un numero.
 */
export function createQuantumSuperposition(
  candidates: Map<number, { score: number; systems: string[] }>,
  maxRange: number,
  startFrom: number
): Map<number, QuantumState> {
  const states = new Map<number, QuantumState>();

  for (let n = startFrom; n <= maxRange; n++) {
    const data = candidates.get(n);
    if (data && data.systems.length > 0) {
      // Amplitud base: raiz cuadrada del score (amplitud, no probabilidad)
      const baseAmplitude = Math.sqrt(Math.abs(data.score));

      // Fase: derivada del numero y los sistemas que lo respaldan
      // Cada sistema contribuye con una fase diferente
      let phase = 0;
      for (const system of data.systems) {
        // Fase unica por sistema (hash del nombre)
        const systemHash = system.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
        phase += (systemHash % 360) * Math.PI / 180;
      }
      // Normalizar fase a [0, 2*PI)
      phase = phase % (2 * Math.PI);

      // Amplitud con signo: si el score es negativo (interferencia),
      // la amplitud es negativa
      const sign = data.score >= 0 ? 1 : -1;
      const amplitude = sign * baseAmplitude;

      // Probabilidad = |amplitud|^2
      const probability = amplitude * amplitude;

      states.set(n, {
        number: n,
        amplitude,
        phase,
        probability,
        systems: data.systems,
      });
    } else {
      // Numeros sin respaldo cosmico: minima amplitud con fase aleatoria
      states.set(n, {
        number: n,
        amplitude: 0.1,
        phase: (n * 137.5 * Math.PI / 180) % (2 * Math.PI), // angulo dorado
        probability: 0.01,
        systems: [],
      });
    }
  }

  return states;
}

/**
 * Colapso de la funcion de onda: la "observacion" (generacion)
 * colapsa la superposicion a un unico estado.
 *
 * Implementa muestreo ponderado por probabilidad cuantica,
 pero con una diferencia clave del muestreo clasico:
 la interferencia entre estados cercanos modifica las probabilidades.
 */
export function collapseWaveFunction(
  states: Map<number, QuantumState>,
  count: number,
  rng: () => number
): number[] {
  const pool = Array.from(states.values());
  const selected: number[] = [];

  for (let i = 0; i < count && pool.length > 0; i++) {
    // Recalcular probabilidades con interferencia cuantica
    // entre estados vecinos (numeros cercanos en valor)
    const probs = pool.map(s => {
      let p = s.probability;

      // Interferencia con numeros cercanos en el pool
      for (const other of pool) {
        if (other.number === s.number) continue;
        const distance = Math.abs(s.number - other.number);
        if (distance <= 3) {
          // Interferencia: depende de la diferencia de fase
          const phaseDiff = s.phase - other.phase;
          // cos(phaseDiff) > 0: constructiva, < 0: destructiva
          const interference = Math.cos(phaseDiff) * other.probability * (1 / (distance + 1));
          p += interference;
        }
      }

      // La probabilidad cuantica puede ser negativa por interferencia
      // pero para muestreo necesitamos valores positivos
      return Math.max(0.001, p);
    });

    const totalProb = probs.reduce((s, p) => s + p, 0);
    if (totalProb <= 0) break;

    // Muestreo ponderado cuantico
    let r = rng() * totalProb;
    let idx = 0;
    for (let j = 0; j < pool.length; j++) {
      r -= probs[j];
      if (r <= 0) { idx = j; break; }
      idx = j;
    }

    selected.push(pool[idx].number);

    // Efecto de colapso: al medir un numero, las probabilidades
    // de los entrelazados cambian (ver entrelazamiento)
    pool.splice(idx, 1);

    // Actualizar amplitudes del resto (decoherencia parcial)
    for (const state of pool) {
      const entanglement = getEntanglementStrength(state.number, selected[selected.length - 1]);
      if (entanglement > 0) {
        // Reducir probabilidad del entrelazado (ya se selecciono uno cercano)
        state.probability *= (1 - entanglement * 0.3);
      }
    }
  }

  return selected.sort((a, b) => a - b);
}

// -------------------------------------------------------
// 14. ENTRELAZAMIENTO NUMEROLOGICO
// -------------------------------------------------------

/**
 * Tabla de entrelazamiento numerologico.
 * Numeros que estan vinculados por afinidad vibratoria:
 * - Mismo numero reducido (1-9)
 * - Suma complementaria (numero + complemento = 9 o 10)
 * - Multiplos del mismo numero base
 * - Numeros espejo (12 <-> 21, 13 <-> 31, etc.)
 */
export function getEntanglementStrength(a: number, b: number): number {
  if (a === b) return 1;

  // Mismo numero reducido (misma vibracion fundamental)
  const ra = reduceNumber(a);
  const rb = reduceNumber(b);
  if (ra === rb) return 0.7;

  // Complementarios (suman 9 o 10)
  const sum = a + b;
  if (sum === 9 || sum === 10) return 0.5;
  if (sum === 18 || sum === 20) return 0.3;

  // Numeros espejo (12<->21, 13<->31, etc.)
  const sa = String(a);
  const sb = String(b);
  if (sa.length === sb.length && sa.length === 2 && sa === sb.split('').reverse().join('')) {
    return 0.6;
  }

  // Diferencia de Fibonacci (delta = numero de Fibonacci)
  const fibs = [1, 2, 3, 5, 8, 13, 21, 34];
  const delta = Math.abs(a - b);
  if (fibs.includes(delta)) return 0.4;

  // Diferencia dorada (phi)
  const phiDiff = Math.abs(delta - Math.round(delta * GOLDEN_RATIO) + delta);
  if (phiDiff < 0.5 && delta > 0) return 0.2;

  return 0;
}

/**
 * Propaga el entrelazamiento: cuando un numero es seleccionado,
 * los numeros entrelazados con el reciben un boost o reduccion
 * en su amplitud cuantica.
 */
export function propagateEntanglement(
  states: Map<number, QuantumState>,
  selectedNumber: number,
  direction: 'boost' | 'reduce'
): void {
  for (const [num, state] of states) {
    if (num === selectedNumber) continue;
    const strength = getEntanglementStrength(num, selectedNumber);
    if (strength > 0) {
      if (direction === 'boost') {
        state.amplitude *= (1 + strength * 0.5);
      } else {
        state.amplitude *= (1 - strength * 0.3);
      }
      // Recalcular probabilidad
      state.probability = state.amplitude * state.amplitude;
    }
  }
}

// -------------------------------------------------------
// 15. TIEMPO EN ESPIRAL (Penrose CCC + I Ching)
// -------------------------------------------------------

/**
 * El tiempo en espiral combina dos conceptos:
 *
 * 1. CCC de Penrose: el universo pasa por ciclos (aeones).
 *    Cada ciclo es similar pero desplazado. Los patrones
 *    se repiten en escala superior.
 *
 * 2. I Ching: 64 hexagramas representan patrones temporales.
 *    Cada momento del tiempo corresponde a un hexagrama.
 *    Los hexagramas se repiten en ciclo (espiral temporal).
 *
 * En la practica: para una fecha dada, calculamos:
 * - La posicion en la espiral temporal (ciclo actual)
 * - El hexagrama I Ching asociado
 * - El desplazamiento de fase respecto al ciclo anterior
 * - Los numeros asociados al hexagrama
 */

// Los 64 hexagramas del I Ching con sus numeros asociados
// Cada hexagrama tiene lineas yang (1) y yin (0)
// Los numeros asociados se derivan del valor binario y posicion
const I_CHING_HEXAGRAMS: { name: string; number: number; lines: number[]; keywords: string; numbers: number[] }[] = [
  { name: 'Chien', number: 1, lines: [1,1,1,1,1,1], keywords: 'Fuerza creativa', numbers: [1, 6, 9] },
  { name: 'Kun', number: 2, lines: [0,0,0,0,0,0], keywords: 'Receptividad', numbers: [2, 8, 10] },
  { name: 'Chun', number: 3, lines: [1,0,0,0,1,0], keywords: 'Dificultad inicial', numbers: [3, 7, 13] },
  { name: 'Meng', number: 4, lines: [0,1,0,0,0,1], keywords: 'Locura juvenil', numbers: [4, 9, 14] },
  { name: 'Hsu', number: 5, lines: [1,1,1,0,1,0], keywords: 'Espera', numbers: [5, 11, 15] },
  { name: 'Sung', number: 6, lines: [0,1,0,1,1,1], keywords: 'Conflicto', numbers: [6, 12, 18] },
  { name: 'Shih', number: 7, lines: [0,1,0,0,0,0], keywords: 'Ejercito', numbers: [7, 14, 21] },
  { name: 'Pi', number: 8, lines: [0,0,0,0,1,0], keywords: 'Union', numbers: [8, 16, 24] },
  { name: 'Hsiao Chu', number: 9, lines: [1,1,0,1,1,1], keywords: 'Pequena fuerza', numbers: [9, 18, 27] },
  { name: 'Lu', number: 10, lines: [1,1,1,0,1,1], keywords: 'Pisar', numbers: [10, 20, 30] },
  { name: 'Tai', number: 11, lines: [1,1,1,0,0,0], keywords: 'Paz', numbers: [11, 22, 33] },
  { name: 'Pi', number: 12, lines: [0,0,0,1,1,1], keywords: 'Estancamiento', numbers: [12, 24, 36] },
  { name: 'Tung Jen', number: 13, lines: [1,0,1,1,1,1], keywords: 'Comunidad', numbers: [13, 26, 39] },
  { name: 'Ta Yu', number: 14, lines: [1,1,1,1,0,1], keywords: 'Gran posesion', numbers: [14, 28, 42] },
  { name: 'Chien', number: 15, lines: [0,0,0,1,0,0], keywords: 'Modestia', numbers: [15, 30, 45] },
  { name: 'Yu', number: 16, lines: [0,0,1,0,0,0], keywords: 'Entusiasmo', numbers: [16, 32, 48] },
  { name: 'Sui', number: 17, lines: [0,1,1,1,0,0], keywords: 'Seguir', numbers: [17, 34, 51] },
  { name: 'Ku', number: 18, lines: [0,0,1,1,1,0], keywords: 'Reparar', numbers: [18, 36, 54] },
  { name: 'Lin', number: 19, lines: [0,0,1,1,0,0], keywords: 'Acercamiento', numbers: [19, 38, 57] },
  { name: 'Kuan', number: 20, lines: [0,0,0,1,1,0], keywords: 'Contemplacion', numbers: [20, 40, 60] },
  { name: 'Shih Ho', number: 21, lines: [1,0,1,0,1,1], keywords: 'Morder', numbers: [21, 42, 50] },
  { name: 'Pi', number: 22, lines: [1,1,0,1,0,1], keywords: 'Adorno', numbers: [22, 44, 49] },
  { name: 'Po', number: 23, lines: [0,0,0,0,0,1], keywords: 'Desprendimiento', numbers: [23, 46, 43] },
  { name: 'Fu', number: 24, lines: [1,0,0,0,0,0], keywords: 'Retorno', numbers: [24, 48, 38] },
  { name: 'Wu Wang', number: 25, lines: [1,0,0,1,1,1], keywords: 'Inocencia', numbers: [25, 50, 47] },
  { name: 'Ta Chu', number: 26, lines: [1,1,1,0,0,1], keywords: 'Gran fuerza', numbers: [26, 52, 41] },
  { name: 'I', number: 27, lines: [1,0,0,0,0,1], keywords: 'Nutricion', numbers: [27, 54, 37] },
  { name: 'Ta Kuo', number: 28, lines: [0,1,1,1,1,0], keywords: 'Gran exceso', numbers: [28, 56, 35] },
  { name: 'Kan', number: 29, lines: [0,1,0,0,1,0], keywords: 'Abismo', numbers: [29, 58, 44] },
  { name: 'Li', number: 30, lines: [1,0,1,1,0,1], keywords: 'Fuego', numbers: [30, 60, 46] },
  { name: 'Hsien', number: 31, lines: [0,0,1,1,1,0], keywords: 'Influencia', numbers: [31, 62, 33] },
  { name: 'Heng', number: 32, lines: [0,1,1,0,1,1], keywords: 'Duracion', numbers: [32, 64, 34] },
  { name: 'Tun', number: 33, lines: [0,0,1,1,1,1], keywords: 'Retirada', numbers: [33, 49, 22] },
  { name: 'Ta Chuang', number: 34, lines: [1,1,1,1,0,0], keywords: 'Gran poder', numbers: [34, 47, 23] },
  { name: 'Chin', number: 35, lines: [0,0,0,1,0,1], keywords: 'Progreso', numbers: [35, 53, 28] },
  { name: 'Ming I', number: 36, lines: [1,0,1,0,0,0], keywords: 'Oscuridad', numbers: [36, 54, 29] },
  { name: 'Chia Jen', number: 37, lines: [1,0,1,0,1,1], keywords: 'Familia', numbers: [37, 55, 25] },
  { name: 'Kuei', number: 38, lines: [1,1,0,1,0,1], keywords: 'Oposicion', numbers: [38, 56, 26] },
  { name: 'Chien', number: 39, lines: [0,0,1,0,1,0], keywords: 'Obstaculo', numbers: [39, 57, 31] },
  { name: 'Hsieh', number: 40, lines: [0,1,0,1,0,0], keywords: 'Liberacion', numbers: [40, 58, 32] },
  { name: 'Sun', number: 41, lines: [1,1,0,0,0,0], keywords: 'Disminucion', numbers: [41, 59, 19] },
  { name: 'I', number: 42, lines: [0,0,0,0,1,1], keywords: 'Aumento', numbers: [42, 60, 20] },
  { name: 'Kuai', number: 43, lines: [1,1,1,1,1,0], keywords: 'Resolucion', numbers: [43, 50, 24] },
  { name: 'Kou', number: 44, lines: [0,1,1,1,1,1], keywords: 'Encuentro', numbers: [44, 51, 25] },
  { name: 'Tsui', number: 45, lines: [0,1,1,0,0,0], keywords: 'Reunion', numbers: [45, 54, 27] },
  { name: 'Sheng', number: 46, lines: [0,0,0,1,1,0], keywords: 'Ascension', numbers: [46, 55, 28] },
  { name: 'Kun', number: 47, lines: [0,1,0,1,1,1], keywords: 'Opresion', numbers: [47, 56, 29] },
  { name: 'Ching', number: 48, lines: [1,1,1,0,1,0], keywords: 'El pozo', numbers: [48, 57, 30] },
  { name: 'Ko', number: 49, lines: [1,1,1,0,1,1], keywords: 'Revolucion', numbers: [49, 58, 31] },
  { name: 'Ting', number: 50, lines: [1,1,0,1,1,1], keywords: 'Caldero', numbers: [50, 59, 32] },
  { name: 'Chen', number: 51, lines: [1,0,0,1,0,0], keywords: 'Trueno', numbers: [51, 50, 33] },
  { name: 'Ken', number: 52, lines: [0,0,1,0,0,1], keywords: 'Montana', numbers: [52, 49, 34] },
  { name: 'Chien', number: 53, lines: [0,0,1,0,1,1], keywords: 'Desarrollo', numbers: [53, 48, 35] },
  { name: 'Kuei Mei', number: 54, lines: [1,1,0,1,0,0], keywords: 'Matrimonio', numbers: [54, 47, 36] },
  { name: 'Feng', number: 55, lines: [1,0,1,1,0,0], keywords: 'Abundancia', numbers: [55, 46, 37] },
  { name: 'Lu', number: 56, lines: [0,0,1,1,0,1], keywords: 'Viajero', numbers: [56, 45, 38] },
  { name: 'Sun', number: 57, lines: [0,1,1,0,1,1], keywords: 'Viento', numbers: [57, 44, 39] },
  { name: 'Tui', number: 58, lines: [1,1,0,1,1,0], keywords: 'Lago', numbers: [58, 43, 40] },
  { name: 'Kan', number: 59, lines: [0,1,0,0,1,0], keywords: 'Disolucion', numbers: [59, 42, 41] },
  { name: 'Chieh', number: 60, lines: [0,1,0,0,1,1], keywords: 'Limitacion', numbers: [60, 41, 42] },
  { name: 'Chung Fu', number: 61, lines: [1,1,0,0,1,1], keywords: 'Verdad interior', numbers: [61, 40, 43] },
  { name: 'Hsiao Kuo', number: 62, lines: [0,0,1,1,0,0], keywords: 'Pequeno exceso', numbers: [62, 39, 44] },
  { name: 'Chi Chi', number: 63, lines: [1,0,1,0,1,0], keywords: 'Completacion', numbers: [63, 38, 45] },
  { name: 'Wei Chi', number: 64, lines: [0,1,0,1,0,1], keywords: 'Antes de completar', numbers: [64, 37, 46] },
];

export interface SpiralTimeState {
  hexagram: typeof I_CHING_HEXAGRAMS[0];
  spiralPosition: number; // posicion en la espiral (0-1)
  cycleNumber: number; // ciclo actual (ej: ciclo 7 de la espiral)
  phaseShift: number; // desplazamiento respecto al ciclo anterior
  aeonOffset: number; // offset dentro del aeon actual (Penrose CCC)
  schumannPhase: number; // fase Schumann [0, 2*PI)
  schumannFrequency: number; // frecuencia Schumann dominante
  spiralNumbers: number[]; // numeros derivados de la posicion en espiral
  resonanceFactor: number; // factor de resonancia [0.5 - 2.0]
}

/**
 * Calcula el estado del tiempo en espiral para una fecha dada.
 *
 * Combina:
 * - Hexagrama I Ching del momento (ciclo de 64)
 * - Posicion en la espiral temporal (basada en tiempo Unix)
 * - Ciclo de Penrose CCC (aeones)
 * - Fase de resonancia Schumann
 */
export function calculateSpiralTime(targetDate: string, consultationDate: string): SpiralTimeState {
  const target = new Date(targetDate);
  const consult = new Date(consultationDate);

  // Tiempo Unix en dias
  const unixDays = Math.floor(consult.getTime() / (1000 * 60 * 60 * 24));

  // Hexagrama I Ching: ciclo de 64 dias
  // Cada 64 dias se completa un ciclo del I Ching
  const hexagramIndex = unixDays % 64;
  const hexagram = I_CHING_HEXAGRAMS[hexagramIndex];

  // Posicion en la espiral (0-1): fraccion del dia
  const dayFraction = (consult.getTime() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24);
  const spiralPosition = dayFraction;

  // Ciclo actual: cuantas vueltas ha dado la espiral
  const cycleNumber = Math.floor(unixDays / 64) + 1;

  // Desplazamiento de fase: diferencia con el ciclo anterior
  const phaseShift = ((unixDays % 360) / 360) * 2 * Math.PI;

  // Aeon offset (Penrose CCC): cada aeon = 365 * 64 dias aprox
  // Usamos un valor simbolico - el punto es que los patrones
  // se repiten en escalas cada vez mayores
  const aeonLength = 365 * 64;
  const aeonOffset = (unixDays % aeonLength) / aeonLength;

  // Fase Schumann: la resonancia fundamental es 7.83 Hz
  // Calculamos la fase en el momento de la consulta
  const schumannFreq = 7.83;
  const secondsOfDay = dayFraction * 24 * 60 * 60;
  const schumannPhase = ((secondsOfDay * schumannFreq) % 1) * 2 * Math.PI;

  // Numeros de la espiral: derivados del hexagrama + posicion
  const spiralNumbers: number[] = [];
  for (const n of hexagram.numbers) {
    spiralNumbers.push(n);
    // Derivados espirales: numero + ciclo * offset
    const derived = Math.floor(n + cycleNumber * aeonOffset * 9) % 50 + 1;
    if (derived !== n && !spiralNumbers.includes(derived)) {
      spiralNumbers.push(derived);
    }
  }

  // Factor de resonancia: cuando la fase Schumann esta alineada
  // con la fase espiral, hay resonancia amplificada
  const resonance = 1 + 0.5 * Math.cos(schumannPhase - phaseShift);

  return {
    hexagram,
    spiralPosition,
    cycleNumber,
    phaseShift,
    aeonOffset,
    schumannPhase,
    schumannFrequency: schumannFreq,
    spiralNumbers,
    resonanceFactor: Math.max(0.5, Math.min(2.0, resonance)),
  };
}

/**
 * Aplica la modulacion del tiempo en espiral a los estados cuanticos.
 * Los numeros asociados al hexagrama actual reciben un boost,
 * y la resonancia Schumann modula todas las amplitudes.
 */
export function applySpiralTimeToStates(
  states: Map<number, QuantumState>,
  spiral: SpiralTimeState,
  maxRange: number
): void {
  for (const [num, state] of states) {
    // Boost por numeros del hexagrama I Ching
    if (spiral.hexagram.numbers.includes(num)) {
      state.amplitude *= (1 + 0.3 * spiral.resonanceFactor);
    }

    // Modulacion Schumann: la fase Schumann afecta la amplitud
    const schumannModulation = 1 + 0.15 * Math.sin(spiral.schumannPhase + num * 0.5);
    state.amplitude *= schumannModulation;

    // Numeros derivados de la espiral reciben boost menor
    if (spiral.spiralNumbers.includes(num)) {
      state.amplitude *= (1 + 0.1 * spiral.resonanceFactor);
    }

    // Recalcular probabilidad
    state.probability = state.amplitude * state.amplitude;
  }
}

// -------------------------------------------------------
// 16. REALIDADES ALTERNATIVAS (Many Worlds - Everett + Garnier)
// -------------------------------------------------------

export interface AlternateReality {
  id: number;
  numbers: number[];
  bonus: number[];
  coherenceScore: number; // coherencia cosmica de esta realidad
  dominantSystems: string[];
  description: string;
}

/**
 * Genera multiples realidades alternativas y selecciona la
 * con mayor coherencia cosmica.
 *
 * En la interpretacion de Muchos Mundos de Everett, cada medicion
 * cuantica ramifica el universo en multiples lineas temporales.
 * Aqui, cada "realidad" es un conjunto de numeros generados con
 * parametros ligeramente diferentes (fase inicial diferente).
 *
 * La realidad con mayor coherencia (mas sistemas cosmicos
 * alineados) es la que se "manifiesta" en nuestra linea temporal.
 */
export function generateAlternateRealities(
  states: Map<number, QuantumState>,
  count: number,
  bonusCount: number,
  bonusMax: number,
  rng: () => number,
  numRealities: number = 5
): AlternateReality[] {
  const realities: AlternateReality[] = [];

  for (let r = 0; r < numRealities; r++) {
    // Clonar estados para esta realidad
    const realityStates = new Map<number, QuantumState>();
    for (const [num, state] of states) {
      realityStates.set(num, {
        ...state,
        // Cada realidad tiene una fase inicial diferente
        phase: state.phase + r * (2 * Math.PI / numRealities),
      });
      // Recalcular probabilidad con la nueva fase
      const s = realityStates.get(num)!;
      s.probability = s.amplitude * s.amplitude;
    }

    // Aplicar interferencia con la nueva fase
    const numbers = collapseWaveFunction(realityStates, count, rng);

    // Bonus: seleccion simple para esta realidad
    const bonus: number[] = [];
    const bonusPool: number[] = [];
    for (let i = 1; i <= bonusMax; i++) bonusPool.push(i);
    for (let i = 0; i < bonusCount && bonusPool.length > 0; i++) {
      const idx = Math.floor(rng() * bonusPool.length);
      bonus.push(bonusPool[idx]);
      bonusPool.splice(idx, 1);
    }
    bonus.sort((a, b) => a - b);

    // Calcular coherencia: cuantos sistemas coinciden en los numeros seleccionados
    let coherenceScore = 0;
    const systemCounts: Record<string, number> = {};
    for (const num of numbers) {
      const state = states.get(num);
      if (state) {
        coherenceScore += state.probability;
        for (const sys of state.systems) {
          systemCounts[sys] = (systemCounts[sys] || 0) + 1;
        }
      }
    }

    // Normalizar coherencia a 0-100
    const maxCoherence = count * 10; // score maximo teorico
    coherenceScore = Math.round((coherenceScore / maxCoherence) * 100);

    // Sistemas dominantes
    const dominantSystems = Object.entries(systemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([sys]) => sys);

    // Descripcion narrativa de esta realidad
    const descriptions = [
      `Linea temporal ${r + 1}: Los numeros se alinean en una configuracion ${dominantSystems.length > 0 ? 'respaldada por ' + dominantSystems.join(', ') : 'neutra'}.`,
      `Rama cuantica ${r + 1}: ${coherenceScore > 60 ? 'Alta' : coherenceScore > 30 ? 'Media' : 'Baja'} coherencia cosmica detectada.`,
      `Realidad paralela ${r + 1}: ${numbers.length} numeros colapsados con ${dominantSystems.length} sistemas en resonancia.`,
    ];

    realities.push({
      id: r,
      numbers,
      bonus,
      coherenceScore: Math.min(100, Math.max(0, coherenceScore)),
      dominantSystems,
      description: descriptions[r % descriptions.length],
    });
  }

  // Ordenar por coherencia descendente
  realities.sort((a, b) => b.coherenceScore - a.coherenceScore);

  return realities;
}

// -------------------------------------------------------
// 17. RESONANCIA SCHUMANN (7.83 Hz)
// -------------------------------------------------------

const SCHUMANN_FREQUENCIES = [7.83, 14.3, 20.8, 27.3, 33.8];

/**
 * Calcula la resonancia Schumann para un momento dado.
 * Las 5 frecuencias fundamentales de Schumann modulan
 * la probabilidad de los numeros de forma ciclica.
 */
export function calculateSchumannResonance(timestamp: number): {
  dominantFrequency: number;
  phases: number[];
  combinedAmplitude: number;
} {
  const seconds = timestamp / 1000;

  const phases = SCHUMANN_FREQUENCIES.map(freq => {
    const cycles = (seconds * freq) % 1;
    return cycles * 2 * Math.PI;
  });

  // Amplitud combinada: suma de ondas Schumann
  const combinedAmplitude = phases.reduce((sum, phase) => {
    return sum + Math.sin(phase);
  }, 0) / SCHUMANN_FREQUENCIES.length;

  // Frecuencia dominante: la que tiene mayor amplitud
  const amplitudes = phases.map(p => Math.abs(Math.sin(p)));
  const maxAmpIdx = amplitudes.indexOf(Math.max(...amplitudes));

  return {
    dominantFrequency: SCHUMANN_FREQUENCIES[maxAmpIdx],
    phases,
    combinedAmplitude,
  };
}

// -------------------------------------------------------
// 18. COHERENCIA CUANTICA
// -------------------------------------------------------

/**
 * Calcula la coherencia cuantica de un conjunto de numeros.
 *
 * La coherencia cuantica ocurre cuando multiples sistemas
 * cosmicos coinciden en un numero. Esto amplifica la probabilidad
 * de forma no lineal (como un laser: fotones en fase = luz coherente).
 *
 * Formula: coherencia = sum(amplitud_i * cos(fase_i - fase_promedio))
 * Si todas las fases estan alineadas, coherencia maxima.
 * Si estan desalineadas, coherencia minima.
 */
export function calculateQuantumCoherence(
  states: QuantumState[]
): number {
  if (states.length === 0) return 0;

  // Fase promedio ponderada por amplitud
  let totalAmp = 0;
  let weightedPhaseX = 0;
  let weightedPhaseY = 0;

  for (const s of states) {
    totalAmp += Math.abs(s.amplitude);
    weightedPhaseX += s.amplitude * Math.cos(s.phase);
    weightedPhaseY += s.amplitude * Math.sin(s.phase);
  }

  if (totalAmp === 0) return 0;

  // Coherencia = magnitud del vector promedio de fase
  const coherenceMagnitude = Math.sqrt(
    weightedPhaseX * weightedPhaseX + weightedPhaseY * weightedPhaseY
  ) / totalAmp;

  return Math.round(coherenceMagnitude * 100);
}

/**
 * Boost de coherencia: cuando hay alta coherencia, amplifica
 * las probabilidades de los numeros coherentes (efecto laser).
 */
export function applyCoherenceBoost(
  states: Map<number, QuantumState>,
  coherenceThreshold: number = 60
): void {
  // Encontrar numeros con multiples sistemas (potencial coherencia)
  const multiSystemStates = Array.from(states.values()).filter(s => s.systems.length >= 2);

  if (multiSystemStates.length === 0) return;

  const coherence = calculateQuantumCoherence(multiSystemStates);

  if (coherence >= coherenceThreshold) {
    // Alta coherencia: boost a numeros con multiples sistemas
    const boostFactor = 1 + (coherence - coherenceThreshold) / 100;
    for (const state of multiSystemStates) {
      state.amplitude *= boostFactor;
      state.probability = state.amplitude * state.amplitude;
    }
  }
}

// -------------------------------------------------------
// MOTOR CUANTICO PRINCIPAL: INTEGRACION COMPLETA
// -------------------------------------------------------

export interface QuantumGenerationParams {
  candidates: Map<number, { score: number; systems: string[] }>;
  maxRange: number;
  startFrom: number;
  count: number;
  bonusCount: number;
  bonusMax: number;
  birthDate: string;
  consultationDate: string;
  rng: () => number;
}

export interface QuantumGenerationResult {
  mainNumbers: number[];
  bonusNumbers: number[];
  quantumStates: Map<number, QuantumState>;
  spiralTime: SpiralTimeState;
  schumannResonance: ReturnType<typeof calculateSchumannResonance>;
  coherenceScore: number;
  selectedReality: AlternateReality;
  allRealities: AlternateReality[];
  hexagramName: string;
  hexagramKeywords: string;
  quantumDescription: string;
}

/**
 * Genera numeros usando el motor cuantico completo.
 *
 * Flujo:
 * 1. Crear superposicion cuantica de todos los numeros
 * 2. Calcular tiempo en espiral (hexagrama + Schumann + Penrose)
 * 3. Aplicar modulacion espiral a los estados cuanticos
 * 4. Aplicar boost de coherencia (efecto laser)
 * 5. Generar realidades alternativas (Everett)
 * 6. Seleccionar realidad con mayor coherencia
 * 7. Retornar resultado con metadata cuantica completa
 */
export function generateQuantumNumbers(params: QuantumGenerationParams): QuantumGenerationResult {
  const {
    candidates, maxRange, startFrom, count, bonusCount, bonusMax,
    birthDate, consultationDate, rng,
  } = params;

  // 1. Crear superposicion cuantica
  const states = createQuantumSuperposition(candidates, maxRange, startFrom);

  // 2. Calcular tiempo en espiral
  const spiralTime = calculateSpiralTime(birthDate, consultationDate);

  // 3. Aplicar modulacion espiral
  applySpiralTimeToStates(states, spiralTime, maxRange);

  // 4. Boost de coherencia
  applyCoherenceBoost(states);

  // 5. Resonancia Schumann
  const schumannResonance = calculateSchumannResonance(new Date(consultationDate).getTime());

  // 6. Generar realidades alternativas
  const realities = generateAlternateRealities(
    states, count, bonusCount, bonusMax, rng, 5
  );

  // 7. Seleccionar realidad con mayor coherencia
  const selectedReality = realities[0];

  // Calcular coherencia global del resultado
  const selectedStates = selectedReality.numbers
    .map(n => states.get(n))
    .filter((s): s is QuantumState => s !== undefined);
  const coherenceScore = calculateQuantumCoherence(selectedStates);

  // Descripcion cuantica del resultado
  const quantumDescription = generateQuantumDescription(
    spiralTime, schumannResonance, coherenceScore, selectedReality
  );

  return {
    mainNumbers: selectedReality.numbers,
    bonusNumbers: selectedReality.bonus,
    quantumStates: states,
    spiralTime,
    schumannResonance,
    coherenceScore,
    selectedReality,
    allRealities: realities,
    hexagramName: spiralTime.hexagram.name,
    hexagramKeywords: spiralTime.hexagram.keywords,
    quantumDescription,
  };
}

/**
 * Genera una descripcion narrativa del proceso cuantico,
 * explicando que conceptos cuanticos influyeron en el resultado.
 * Esto es educativo para el usuario.
 */
function generateQuantumDescription(
  spiral: SpiralTimeState,
  schumann: ReturnType<typeof calculateSchumannResonance>,
  coherence: number,
  reality: AlternateReality
): string {
  const parts: string[] = [];

  // Hexagrama I Ching
  parts.push(
    `Tiempo en Espiral: Nos encontramos en el ciclo ${spiral.cycleNumber} de la espiral temporal. ` +
    `El hexagrama I Ching activo es "${spiral.hexagram.name}" (#${spiral.hexagram.number}), ` +
    `que representa "${spiral.hexagram.keywords}". ` +
    `Esta energia temporal influye en la seleccion de numeros.`
  );

  // Resonancia Schumann
  parts.push(
    `Resonancia Schumann: La frecuencia dominante es ${schumann.dominantFrequency.toFixed(2)} Hz, ` +
    `con amplitud combinada de ${(schumann.combinedAmplitude * 100).toFixed(1)}%. ` +
    `Esta resonancia natural de la Tierra modula las probabilidades cuanticas.`
  );

  // Coherencia
  if (coherence > 70) {
    parts.push(
      `Coherencia Cuantica: ${coherence}% - Muy alta. Multiples sistemas cosmicos ` +
      `estan alineados en los numeros seleccionados, creando un efecto de amplificacion ` +
      `coherente similar a un laser cuantico.`
    );
  } else if (coherence > 40) {
    parts.push(
      `Coherencia Cuantica: ${coherence}% - Moderada. Hay alineacion parcial entre ` +
      `sistemas cosmicos. Algunos numeros reciben boost por coincidencia multi-sistema.`
    );
  } else {
    parts.push(
      `Coherencia Cuantica: ${coherence}% - Baja. Los sistemas cosmicos no estan ` +
      `fuertemente alineados en esta generacion. El componente estocastico tiene mayor peso.`
    );
  }

  // Realidad seleccionada
  parts.push(
    `Realidad Manifiesta: De ${reality.id + 1 < 5 ? '5' : reality.id + 1} realidades alternativas ` +
    `generadas (interpretacion de Muchos Mundos), esta linea temporal tiene la mayor ` +
    `coherencia cosmica (${reality.coherenceScore}%). ` +
    `Sistemas dominantes: ${reality.dominantSystems.join(', ') || 'estocastico puro'}.`
  );

  return parts.join('\n\n');
}
