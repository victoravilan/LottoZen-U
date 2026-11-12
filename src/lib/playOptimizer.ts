// ============================================================
// LottoZen Ultra - Optimizador Estrategico de Juego
// ============================================================
// Analiza los biorritmos del jugador (fisico, emocional, intelectual,
// intuitivo), transitos astrologicos, ciclo de ano personal, y
// calendario de sorteos para recomendar:
//   - CUANDO jugar (dias de pico energetico)
//   - COMO jugar (estrategia conservadora vs agresiva)
//   - CUAL loteria conviene (segun perfil energetico)
//   - DONDE concentrar apuestas (formato que mejor alinea)
// ============================================================

import {
  calculateBiorhythm,
  calculatePersonalYear,
  getPersonalYearMeaning,
  calculateUniversalYear,
  getZodiacSign,
  ZODIAC_SIGNS,
  type ZodiacSign,
  reduceNumber,
} from './cosmicEngine';

import {
  LOTTERY_CONFIGS,
  getUpcomingSpecialDraws,
  type LotteryConfig,
} from './lotteryData';

// -------------------------------------------------------
// TIPOS
// -------------------------------------------------------

export type EnergyLevel = 'pico' | 'alto' | 'medio' | 'bajo' | 'valle' | 'critico';

export interface DayEnergy {
  date: string; // YYYY-MM-DD
  dayName: string; // Lunes, Martes, etc.
  dayNumber: number; // dia del mes
  physical: number; // -100 a 100
  emotional: number;
  intellectual: number;
  intuitive: number; // ciclo de 38 dias (intuitivo, descubierto por Fliess ampliado)
  totalEnergy: number; // promedio de los 4
  energyLevel: EnergyLevel;
  isCritical: boolean;
  favorableLotteries: string[]; // ids de loterias que tienen sorteo ese dia
  recommendation: DayRecommendation;
}

export interface DayRecommendation {
  shouldPlay: boolean;
  confidence: number; // 0-100
  reason: string;
  strategy: 'conservador' | 'equilibrado' | 'agresivo';
  bestLotteryId: string | null;
  bestLotteryName: string | null;
  approach: string; // descripcion de como abordar el juego
  riskLevel: number; // 1-10
}

export interface StrategyReport {
  // Analisis de los proximos 30 dias
  bestDays: DayEnergy[];
  avoidDays: DayEnergy[];
  allDays: DayEnergy[];

  // Recomendacion general
  overallStrategy: string;
  currentPhase: string;
  personalYearAdvice: string;
  zodiacAdvice: string;

  // Loteria recomendada
  primaryLottery: LotteryConfig | null;
  primaryLotteryReason: string;
  alternativeLotteries: { config: LotteryConfig; reason: string }[];

  // Sorteos especiales proximos
  upcomingSpecials: { name: string; date: string; lotteryName: string; daysUntil: number }[];

  // Estadisticas del periodo
  peakDaysCount: number;
  totalFavorableDays: number;
  averageEnergy: number;
}

// -------------------------------------------------------
// CICLO INTUITIVO (38 dias)
// El cuarto biorritmo, basado en investigaciones ampliadas de Fliess
// Se asocia a la intuicion y percepcion extrasensorial
// -------------------------------------------------------

function calculateIntuitive(daysAlive: number): number {
  return Math.sin((2 * Math.PI * daysAlive) / 38);
}

// -------------------------------------------------------
// MAPA DE DIAS DE SORTEO POR LOTERIA
// -------------------------------------------------------

const DAY_MAP: Record<string, string> = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miercoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sabado',
};

function getLotteriesForDay(dayName: string): LotteryConfig[] {
  return LOTTERY_CONFIGS.filter(l => l.drawDays.includes(dayName));
}

// -------------------------------------------------------
// NIVEL DE ENERGIA
// -------------------------------------------------------

function getEnergyLevel(total: number, isCritical: boolean): EnergyLevel {
  if (isCritical) return 'critico';
  if (total > 60) return 'pico';
  if (total > 30) return 'alto';
  if (total > -30) return 'medio';
  if (total > -60) return 'bajo';
  return 'valle';
}

// -------------------------------------------------------
// RECOMENDACION POR DIA
// -------------------------------------------------------

function buildRecommendation(
  energy: DayEnergy,
  lotteriesToday: LotteryConfig[],
  zodiac: ZodiacSign,
  personalYear: number
): DayRecommendation {
  const { totalEnergy, physical, emotional, intellectual, intuitive, energyLevel, isCritical } = energy;

  // Dia critico: no se recomienda jugar
  if (isCritical) {
    return {
      shouldPlay: false,
      confidence: 15,
      reason: 'Dia critico: uno o mas ciclos cruzan el cero. Energia inestable, mejor esperar.',
      strategy: 'conservador',
      bestLotteryId: null,
      bestLotteryName: null,
      approach: 'No jugar hoy. Los dias criticos tienen alta probabilidad de decisiones impulsivas. Usa este dia para analizar y planificar.',
      riskLevel: 8,
    };
  }

  // Valle o bajo: energia desfavorable
  if (energyLevel === 'valle' || energyLevel === 'bajo') {
    return {
      shouldPlay: false,
      confidence: 25,
      reason: `Energia ${energyLevel}: tus ciclos estan en fase negativa. Mejor esperar a un pico energetico.`,
      strategy: 'conservador',
      bestLotteryId: lotteriesToday[0]?.id || null,
      bestLotteryName: lotteriesToday[0]?.name || null,
      approach: 'Si decides jugar, hazlo con apuesta minima y sin expectativas. Tu intuicion esta baja.',
      riskLevel: 7,
    };
  }

  // Medio: energia neutra, se puede jugar con cautela
  if (energyLevel === 'medio') {
    const bestLottery = pickBestLottery(lotteriesToday, zodiac, personalYear, physical, emotional, intellectual, intuitive);
    return {
      shouldPlay: true,
      confidence: 50,
      reason: 'Energia media: ni pico ni valle. Puedes jugar pero sin arriesgar demasiado.',
      strategy: 'equilibrado',
      bestLotteryId: bestLottery?.id || null,
      bestLotteryName: bestLottery?.name || null,
      approach: 'Apuesta moderada. Combina numeros personales con analisis estadistico. Evita decisions impulsivas.',
      riskLevel: 5,
    };
  }

  // Alto: buena energia
  if (energyLevel === 'alto') {
    const bestLottery = pickBestLottery(lotteriesToday, zodiac, personalYear, physical, emotional, intellectual, intuitive);
    const dominantCycle = getDominantCycle(physical, emotional, intellectual, intuitive);
    return {
      shouldPlay: true,
      confidence: 75,
      reason: `Energia alta: tu ciclo ${dominantCycle} esta en fase positiva. Buen momento para confiar en tu intuicion.`,
      strategy: 'equilibrado',
      bestLotteryId: bestLottery?.id || null,
      bestLotteryName: bestLottery?.name || null,
      approach: `Tu ${dominantCycle} esta elevado. Usa numeros derivados de tu intuicion personal combinados con el analisis cosmico. Apuesta con confianza moderada.`,
      riskLevel: 4,
    };
  }

  // Pico: energia maxima, mejor momento
  // Pico: energia maxima
  const bestLottery = pickBestLottery(lotteriesToday, zodiac, personalYear, physical, emotional, intellectual, intuitive);
  const dominantCycle = getDominantCycle(physical, emotional, intellectual, intuitive);
  const allPositive = physical > 0 && emotional > 0 && intellectual > 0 && intuitive > 0;

  return {
    shouldPlay: true,
    confidence: 90,
    reason: allPositive
      ? `Pico energetico: todos los ciclos alineados positivamente. ${dominantCycle} dominante. Momento optimal para jugar.`
      : `Pico energetico: tu ciclo ${dominantCycle} esta en su maximo. Aprovecha esta ventana de energia.`,
    strategy: 'agresivo',
    bestLotteryId: bestLottery?.id || null,
    bestLotteryName: bestLottery?.name || null,
    approach: allPositive
      ? 'Convergencia cosmica: todos tus biorritmos estan en fase positiva. Es el mejor momento para jugar con confianza. Considera aumentar apuesta y usar multiples lineas.'
      : `Tu ${dominantCycle} esta en pico. Confia en tu intuicion. Genera numeros con el motor cosmico y considera apuestas multiples.`,
    riskLevel: 3,
  };
}

// -------------------------------------------------------
// SELECCIONAR MEJOR LOTERIA PARA EL DIA
// -------------------------------------------------------

function pickBestLottery(
  available: LotteryConfig[],
  zodiac: ZodiacSign,
  personalYear: number,
  physical: number,
  emotional: number,
  intellectual: number,
  intuitive: number
): LotteryConfig | null {
  if (available.length === 0) return null;
  if (available.length === 1) return available[0];

  // Scoring de cada loteria segun el perfil energetico del dia
  const scored = available.map(lot => {
    let score = 50; // base

    // Elemento zodiacal -> tipo de loteria
    // Fuego: loterias agresivas (Euromillones, Eurojackpot) -> mayor premio, menor probabilidad
    // Tierra: loterias estables (Primitiva, Bonoloto) -> mas sorteos, disciplina
    // Aire: loterias sociales (ONCE) -> cotidiano, ligero
    // Agua: loterias intuitivas (Nacional) -> numero cerrado, intuicion

    if (zodiac.element === 'Fuego') {
      if (lot.id === 'euromillones' || lot.id === 'eurojackpot' || lot.id === 'once_eurojackpot') score += 20;
      if (lot.format === 'standard') score += 10;
    }
    if (zodiac.element === 'Tierra') {
      if (lot.id === 'primitiva' || lot.id === 'bonoloto') score += 20;
      if (lot.format === 'standard' && lot.mainNumbers >= 6) score += 10;
    }
    if (zodiac.element === 'Aire') {
      if (lot.id === 'once_cupon' || lot.id === 'once_combo' || lot.id === 'once_triplex') score += 20;
    }
    if (zodiac.element === 'Agua') {
      if (lot.id === 'loteria_nacional' || lot.id === 'once_cupon') score += 20;
      if (lot.format === 'cupon' || lot.format === 'nacional') score += 15;
    }

    // Ciclo fisico alto -> loterias con mas numeros (mayor esfuerzo analitico)
    if (physical > 50) {
      if (lot.mainNumbers >= 6) score += 10;
    }

    // Ciclo emocional alto -> loterias con bote grande (emocion del premio)
    if (emotional > 50) {
      if (lot.id === 'euromillones' || lot.id === 'eurojackpot' || lot.id === 'once_eurojackpot') score += 15;
    }

    // Ciclo intelectual alto -> loterias de digitos (analisis de patrones 0-9)
    if (intellectual > 50) {
      if (lot.format === 'cupon' || lot.format === 'nacional') score += 15;
    }

    // Ciclo intuitivo alto -> Loteria Nacional (intuicion pura)
    if (intuitive > 50) {
      if (lot.id === 'loteria_nacional' || lot.id === 'once_cupon') score += 20;
    }

    // Ano personal influencia
    // Ano 1, 8: nuevos comienzos -> loterias grandes
    // Ano 3, 5: creatividad/cambio -> ONCE
    // Ano 7: intuicion -> Nacional
    // Ano 9: cierre -> Bonoloto (mas sorteos)
    if (personalYear === 1 || personalYear === 8) {
      if (lot.id === 'euromillones' || lot.id === 'eurojackpot') score += 10;
    }
    if (personalYear === 3 || personalYear === 5) {
      if (lot.id === 'once_cupon' || lot.id === 'once_combo') score += 10;
    }
    if (personalYear === 7) {
      if (lot.id === 'loteria_nacional') score += 15;
    }
    if (personalYear === 9) {
      if (lot.id === 'bonoloto') score += 10;
    }

    // Probabilidad: loterias con mejor probabilidad base
    // (Triplex 1:1000, Combo 1:59049, Nacional/Cupon 1:100000, Bonoloto 1:14M, Primitiva 1:140M, Euromillones 1:140M)
    if (lot.probability > 1 / 1000) score += 5; // Triplex
    if (lot.probability > 1 / 100000) score += 3; // Nacional, Cupon

    return { lot, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].lot;
}

// -------------------------------------------------------
// CICLO DOMINANTE
// -------------------------------------------------------

function getDominantCycle(
  physical: number,
  emotional: number,
  intellectual: number,
  intuitive: number
): string {
  const cycles = [
    { name: 'fisico', value: Math.abs(physical) },
    { name: 'emocional', value: Math.abs(emotional) },
    { name: 'intelectual', value: Math.abs(intellectual) },
    { name: 'intuitivo', value: Math.abs(intuitive) },
  ];
  cycles.sort((a, b) => b.value - a.value);
  return cycles[0].name;
}

// -------------------------------------------------------
// CONSEJO ZODIACAL
// -------------------------------------------------------

function getZodiacAdvice(zodiac: ZodiacSign): string {
  const advice: Record<string, string> = {
    Fuego: 'Como signo de Fuego, tu energia es expansiva y audaz. Tus mejores momentos son cuando la emocion y la intuicion convergen. Busca loterias con grandes botes y confia en tu impulso cuando tu ciclo emocional este en pico.',
    Tierra: 'Como signo de Tierra, eres metodico y paciente. Tu fortaleza esta en el analisis y la disciplina. Juega loterias con sorteos frecuentes y usa estadisticas. Tus mejores dias son cuando el ciclo intelectual esta alto.',
    Aire: 'Como signo de Aire, tu mente es rapida y social. Te convienen loterias cotidianas como las de ONCE. Tu intuicion se activa en ciclos cortos. Juega cuando tu ciclo intelectual este en pico.',
    Agua: 'Como signo de Agua, tu intuicion es tu mayor arma. La Loteria Nacional y los cupones de ONCE son tu territorio. Tus mejores dias son cuando el ciclo intuitivo esta en pico. Confia en corazonadas.',
  };
  return advice[zodiac.element] || advice.Fuego;
}

// -------------------------------------------------------
// MOTOR PRINCIPAL: GENERAR REPORTE ESTRATEGICO
// -------------------------------------------------------

export function generateStrategyReport(
  birthDate: string,
  consultationDate: string
): StrategyReport {
  const [year, month, day] = birthDate.split('-').map(Number);
  const zodiac = getZodiacSign(month, day);
  const consultDate = new Date(consultationDate);
  const currentYear = consultDate.getFullYear();
  const personalYear = calculatePersonalYear(birthDate, currentYear);
  const personalYearMeaning = getPersonalYearMeaning(personalYear);

  // Generar analisis de 30 dias
  const allDays: DayEnergy[] = [];
  const birth = new Date(birthDate);

  for (let offset = 0; offset < 30; offset++) {
    const date = new Date(consultDate);
    date.setDate(date.getDate() + offset);
    const dateStr = date.toISOString().split('T')[0];
    const daysAlive = Math.floor((date.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    const bio = calculateBiorhythm(birthDate, dateStr);
    const intuitiveRaw = calculateIntuitive(daysAlive);
    const intuitivePercent = Math.round(intuitiveRaw * 100);

    const totalEnergy = Math.round((bio.physical.value + bio.emotional.value + bio.intellectual.value + intuitiveRaw) / 4 * 100);
    const energyLevel = getEnergyLevel(totalEnergy, bio.criticalDay);

    const dayName = DAY_MAP[String(date.getDay())];
    const lotteriesToday = getLotteriesForDay(dayName);

    const dayEnergy: DayEnergy = {
      date: dateStr,
      dayName,
      dayNumber: date.getDate(),
      physical: bio.physical.percent,
      emotional: bio.emotional.percent,
      intellectual: bio.intellectual.percent,
      intuitive: intuitivePercent,
      totalEnergy,
      energyLevel,
      isCritical: bio.criticalDay,
      favorableLotteries: lotteriesToday.map(l => l.id),
      recommendation: {} as DayRecommendation,
    };

    dayEnergy.recommendation = buildRecommendation(dayEnergy, lotteriesToday, zodiac, personalYear);
    allDays.push(dayEnergy);
  }

  // Clasificar dias
  const bestDays = allDays
    .filter(d => d.recommendation.shouldPlay && d.recommendation.confidence >= 75)
    .sort((a, b) => b.recommendation.confidence - a.recommendation.confidence);

  const avoidDays = allDays
    .filter(d => !d.recommendation.shouldPlay)
    .sort((a, b) => a.recommendation.confidence - b.recommendation.confidence);

  // Estadisticas
  const peakDaysCount = allDays.filter(d => d.energyLevel === 'pico').length;
  const totalFavorableDays = allDays.filter(d => d.recommendation.shouldPlay).length;
  const averageEnergy = Math.round(allDays.reduce((s, d) => s + d.totalEnergy, 0) / allDays.length);

  // Loteria primaria recomendada (la que mas aparece como bestLottery en dias favorables)
  const lotteryCounts: Record<string, number> = {};
  for (const day of bestDays) {
    if (day.recommendation.bestLotteryId) {
      lotteryCounts[day.recommendation.bestLotteryId] = (lotteryCounts[day.recommendation.bestLotteryId] || 0) + 1;
    }
  }

  let primaryLotteryId: string | null = null;
  let maxCount = 0;
  for (const [id, count] of Object.entries(lotteryCounts)) {
    if (count > maxCount) {
      maxCount = count;
      primaryLotteryId = id;
    }
  }

  const primaryLottery = primaryLotteryId
    ? LOTTERY_CONFIGS.find(l => l.id === primaryLotteryId) || null
    : null;

  // Loterias alternativas
  const alternativeIds = Object.keys(lotteryCounts)
    .filter(id => id !== primaryLotteryId)
    .sort((a, b) => lotteryCounts[b] - lotteryCounts[a])
    .slice(0, 3);

  const alternativeLotteries = alternativeIds
    .map(id => {
      const config = LOTTERY_CONFIGS.find(l => l.id === id);
      if (!config) return null;
      const count = lotteryCounts[id];
      return {
        config,
        reason: `Recomendada en ${count} de tus dias favorables`,
      };
    })
    .filter((x): x is { config: LotteryConfig; reason: string } => x !== null);

  // Sorteos especiales proximos
  const upcomingSpecialsData = getUpcomingSpecialDraws();
  const upcomingSpecials = upcomingSpecialsData.map(s => {
    const lottery = LOTTERY_CONFIGS.find(l => l.id === s.lotteryId);
    // Calcular dias hasta el sorteo
    const [mm, dd] = s.date.split('-');
    const specialDate = new Date(currentYear, parseInt(mm) - 1, parseInt(dd));
    if (specialDate < consultDate) {
      specialDate.setFullYear(currentYear + 1);
    }
    const daysUntil = Math.ceil((specialDate.getTime() - consultDate.getTime()) / (1000 * 60 * 60 * 24));
    return {
      name: s.name,
      date: s.date,
      lotteryName: lottery?.name || 'Loteria',
      daysUntil,
    };
  });

  // Fase actual
  const todayEnergy = allDays[0];
  let currentPhase: string;
  if (todayEnergy.isCritical) {
    currentPhase = 'Dia critico - Energia en transicion';
  } else if (todayEnergy.totalEnergy > 60) {
    currentPhase = 'Pico energetico - Aprovecha esta ventana';
  } else if (todayEnergy.totalEnergy > 30) {
    currentPhase = 'Energia alta - Buen momento para actuar';
  } else if (todayEnergy.totalEnergy > -30) {
    currentPhase = 'Energia media - Estabilidad';
  } else {
    currentPhase = 'Energia baja - Fase de descanso';
  }

  // Estrategia general
  let overallStrategy: string;
  if (peakDaysCount >= 5) {
    overallStrategy = `Tienes ${peakDaysCount} dias de pico energetico en los proximos 30 dias. Aprovecha al maximo esos dias. Tu cuerpo y tu mente estan en sintonia cosmica. Concentra tus apuestas en esos momentos clave.`;
  } else if (peakDaysCount >= 2) {
    overallStrategy = `Tienes ${peakDaysCount} dias de pico energetico. Usa esos dias para tus apuestas mas importantes y los dias de energia alta para apuestas moderadas. Evita los ${avoidDays.length} dias desfavorables.`;
  } else if (totalFavorableDays > 10) {
    overallStrategy = `Aunque no hay muchos picos, tienes ${totalFavorableDays} dias favorables. Distribuye tus apuestas de forma constante en los dias de energia alta y media. La consistencia es tu aliada.`;
  } else {
    overallStrategy = `Periodo de energia baja. Solo ${totalFavorableDays} dias favorables en 30. Usa este tiempo para analizar, estudiar patrones y preparar tu estrategia para cuando la energia suba.`;
  }

  // Consejo de ano personal
  const personalYearAdvice = personalYearMeaning;

  // Consejo zodiacal
  const zodiacAdvice = getZodiacAdvice(zodiac);

  // Razon de loteria primaria
  let primaryLotteryReason = '';
  if (primaryLottery) {
    primaryLotteryReason = `${primaryLottery.name} es tu loteria mas favorable porque coincide con tu perfil ${zodiac.element.toLowerCase()}. Aparece como recomendada en ${maxCount} de tus dias de mayor energia. Su formato (${primaryLottery.format}) se alinea con tus ciclos biorritmicos dominantes.`;
  } else {
    primaryLotteryReason = 'No hay una loteria claramente dominante en este periodo. Revisa los dias individuales para recomendaciones especificas.';
  }

  return {
    bestDays,
    avoidDays,
    allDays,
    overallStrategy,
    currentPhase,
    personalYearAdvice,
    zodiacAdvice,
    primaryLottery,
    primaryLotteryReason,
    alternativeLotteries,
    upcomingSpecials,
    peakDaysCount,
    totalFavorableDays,
    averageEnergy,
  };
}

// -------------------------------------------------------
// ETIQUETAS DE NIVEL DE ENERGIA PARA UI
// -------------------------------------------------------

export function getEnergyLevelLabel(level: EnergyLevel): { label: string; color: string; icon: string } {
  const labels: Record<EnergyLevel, { label: string; color: string; icon: string }> = {
    pico: { label: 'Pico Maximo', color: '#fbbf24', icon: '★' },
    alto: { label: 'Energia Alta', color: '#84cc16', icon: '↑' },
    medio: { label: 'Energia Media', color: '#60a5fa', icon: '→' },
    bajo: { label: 'Energia Baja', color: '#f87171', icon: '↓' },
    valle: { label: 'Valle Energetico', color: '#a78bfa', icon: '▼' },
    critico: { label: 'Dia Critico', color: '#ef4444', icon: '⚠' },
  };
  return labels[level];
}

// -------------------------------------------------------
// BARRA DE ENERGIA PARA UI (0-100)
// -------------------------------------------------------

export function energyToBarWidth(percent: number): number {
  // Convertir de -100..100 a 0..100
  return Math.round((percent + 100) / 2);
}
