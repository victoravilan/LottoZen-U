// ============================================================
// LottoZen Ultra - Datos y Analisis de Loteria
// ============================================================
// Dataset embebido de resultados historicos de loterias espanolas y europeas
// Ultimos 7 anos (2019-2025). Datos representativos para analisis.
//
// Loterias incluidas:
// - Euromillones
// - La Primitiva
// - Eurojackpot
// - Bonoloto
// - Loteria Nacional (Espana)
// - La ONCE (Cupon Diario)
// - La ONCE Triplex
// - La ONCE Combo
// - La ONCE Eurojackpot
//
// Sorteos especiales:
// - Loteria de Navidad (22 de diciembre)
// - Loteria del Nino (6 de enero / Reyes)
// - Sorteo Extraordinario de la Primitiva
// - Dia del Padre
// - Dia de la Madre
// - Sorteo de Verano
// - Sorteo Extraordinario de Euromillones
// - Cupon Extraordinario de la ONCE
// ============================================================

export interface LotteryDraw {
  date: string;
  numbers: number[];
  stars?: number[];
  jackpot: number;
  special?: boolean;
  specialName?: string;
}

export interface SpecialDraw {
  id: string;
  name: string;
  lotteryId: string;
  date: string;
  description: string;
  typicalJackpot: number;
  type: 'navidad' | 'nino' | 'padre' | 'madre' | 'verano' | 'extraordinario' | 'once_especial';
  icon: string;
}

export interface LotteryConfig {
  id: string;
  name: string;
  country: string;
  mainNumbers: number;
  mainRange: number;
  bonusNumbers: number;
  bonusRange: number;
  bonusLabel: string;
  drawDays: string[];
  odds: string;
  probability: number;
  color: string;
  format: 'standard' | 'cupon' | 'nacional';
  hasSpecialDraws: boolean;
}

// ============================================================
// CONFIGURACION DE LOTERIAS
// ============================================================

export const LOTTERY_CONFIGS: LotteryConfig[] = [
  {
    id: 'euromillones',
    name: 'Euromillones',
    country: 'Europea',
    mainNumbers: 5,
    mainRange: 50,
    bonusNumbers: 2,
    bonusRange: 12,
    bonusLabel: 'Estrellas',
    drawDays: ['Martes', 'Viernes'],
    odds: '1 en 139,838,160',
    probability: 1 / 139838160,
    color: '#8b5cf6',
    format: 'standard',
    hasSpecialDraws: true,
  },
  {
    id: 'primitiva',
    name: 'La Primitiva',
    country: 'Espana',
    mainNumbers: 6,
    mainRange: 49,
    bonusNumbers: 1,
    bonusRange: 10,
    bonusLabel: 'Reintegro',
    drawDays: ['Jueves', 'Sabado'],
    odds: '1 en 139,838,160',
    probability: 1 / 139838160,
    color: '#d4af37',
    format: 'standard',
    hasSpecialDraws: true,
  },
  {
    id: 'eurojackpot',
    name: 'Eurojackpot',
    country: 'Europea',
    mainNumbers: 5,
    mainRange: 50,
    bonusNumbers: 2,
    bonusRange: 12,
    bonusLabel: 'Euro',
    drawDays: ['Martes', 'Viernes'],
    odds: '1 en 139,838,160',
    probability: 1 / 139838160,
    color: '#14b8a6',
    format: 'standard',
    hasSpecialDraws: true,
  },
  {
    id: 'bonoloto',
    name: 'Bonoloto',
    country: 'Espana',
    mainNumbers: 6,
    mainRange: 49,
    bonusNumbers: 1,
    bonusRange: 10,
    bonusLabel: 'Complementario',
    drawDays: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Sabado'],
    odds: '1 en 13,983,816',
    probability: 1 / 13983816,
    color: '#ec4899',
    format: 'standard',
    hasSpecialDraws: false,
  },
  {
    id: 'loteria_nacional',
    name: 'Loteria Nacional',
    country: 'Espana',
    mainNumbers: 5,
    mainRange: 9,
    bonusNumbers: 1,
    bonusRange: 55,
    bonusLabel: 'Serie',
    drawDays: ['Jueves', 'Sabado'],
    odds: '1 en 100,000',
    probability: 1 / 100000,
    color: '#ef4444',
    format: 'nacional',
    hasSpecialDraws: true,
  },
  {
    id: 'once_cupon',
    name: 'ONCE - Cupon Diario',
    country: 'Espana (ONCE)',
    mainNumbers: 5,
    mainRange: 9,
    bonusNumbers: 1,
    bonusRange: 55,
    bonusLabel: 'Serie',
    drawDays: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    odds: '1 en 100,000',
    probability: 1 / 100000,
    color: '#3b82f6',
    format: 'cupon',
    hasSpecialDraws: true,
  },
  {
    id: 'once_triplex',
    name: 'ONCE - Triplex',
    country: 'Espana (ONCE)',
    mainNumbers: 3,
    mainRange: 9,
    bonusNumbers: 0,
    bonusRange: 0,
    bonusLabel: '',
    drawDays: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
    odds: '1 en 1,000',
    probability: 1 / 1000,
    color: '#6366f1',
    format: 'cupon',
    hasSpecialDraws: false,
  },
  {
    id: 'once_combo',
    name: 'ONCE - Combo',
    country: 'Espana (ONCE)',
    mainNumbers: 5,
    mainRange: 9,
    bonusNumbers: 1,
    bonusRange: 9,
    bonusLabel: 'Numero clave',
    drawDays: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
    odds: '1 en 59,049',
    probability: 1 / 59049,
    color: '#8338ec',
    format: 'cupon',
    hasSpecialDraws: false,
  },
  {
    id: 'once_eurojackpot',
    name: 'ONCE - Eurojackpot',
    country: 'Espana (ONCE)',
    mainNumbers: 5,
    mainRange: 50,
    bonusNumbers: 2,
    bonusRange: 12,
    bonusLabel: 'Euro',
    drawDays: ['Martes', 'Viernes'],
    odds: '1 en 139,838,160',
    probability: 1 / 139838160,
    color: '#06b6d4',
    format: 'standard',
    hasSpecialDraws: true,
  },
];

// ============================================================
// SORTEOS ESPECIALES Y EXTRAORDINARIOS
// ============================================================

export const SPECIAL_DRAWS: SpecialDraw[] = [
  {
    id: 'navidad',
    name: 'Loteria de Navidad',
    lotteryId: 'loteria_nacional',
    date: '12-22',
    description: 'El sorteo mas importante del ano. Bote historico de 4.000.000.000 euros (4 billones). Celebrado el 22 de diciembre.',
    typicalJackpot: 4000000000,
    type: 'navidad',
    icon: '🎄',
  },
  {
    id: 'nino',
    name: 'Loteria del Nino',
    lotteryId: 'loteria_nacional',
    date: '01-06',
    description: 'Sorteo extraordinario de Reyes. Celebrado el 6 de enero. Bote tipico de 700.000.000 euros.',
    typicalJackpot: 700000000,
    type: 'nino',
    icon: '👑',
  },
  {
    id: 'padre',
    name: 'Sorteo Dia del Padre',
    lotteryId: 'once_cupon',
    date: '03-19',
    description: 'Cupon extraordinario de la ONCE con motivo del Dia del Padre. Premio especial.',
    typicalJackpot: 15000000,
    type: 'padre',
    icon: '👔',
  },
  {
    id: 'madre',
    name: 'Sorteo Dia de la Madre',
    lotteryId: 'once_cupon',
    date: '05-05',
    description: 'Cupon extraordinario de la ONCE con motivo del Dia de la Madre. Premio especial.',
    typicalJackpot: 15000000,
    type: 'madre',
    icon: '💝',
  },
  {
    id: 'verano',
    name: 'Sorteo de Verano',
    lotteryId: 'loteria_nacional',
    date: '07-04',
    description: 'Sorteo extraordinario de verano de la Loteria Nacional. Bote especial.',
    typicalJackpot: 300000000,
    type: 'verano',
    icon: '☀️',
  },
  {
    id: 'extraordinario_primitiva',
    name: 'Sorteo Extraordinario La Primitiva',
    lotteryId: 'primitiva',
    date: '10-12',
    description: 'Sorteo extraordinario de La Primitiva con bote especial de Fiesta Nacional.',
    typicalJackpot: 100000000,
    type: 'extraordinario',
    icon: '🎉',
  },
  {
    id: 'extraordinario_euromillones',
    name: 'Euromillones Especial',
    lotteryId: 'euromillones',
    date: '09-26',
    description: 'Sorteo extraordinario de Euromillones con bote aumentado.',
    typicalJackpot: 130000000,
    type: 'extraordinario',
    icon: '⭐',
  },
  {
    id: 'once_especial_verano',
    name: 'Cupon ONCE de Verano',
    lotteryId: 'once_cupon',
    date: '08-15',
    description: 'Cupon extraordinario de la ONCE de verano con premio aumentado.',
    typicalJackpot: 20000000,
    type: 'once_especial',
    icon: '🌊',
  },
  {
    id: 'once_especial_navidad',
    name: 'Cupon Extraordinario de Navidad ONCE',
    lotteryId: 'once_cupon',
    date: '12-23',
    description: 'Cupon extraordinario de Navidad de la ONCE. Uno de los sorteos mas esperados del ano.',
    typicalJackpot: 30000000,
    type: 'once_especial',
    icon: '🎁',
  },
  {
    id: 'once_especial_reyes',
    name: 'Cupon Extraordinario de Reyes ONCE',
    lotteryId: 'once_cupon',
    date: '01-05',
    description: 'Cupon extraordinario de Reyes Magos de la ONCE.',
    typicalJackpot: 25000000,
    type: 'once_especial',
    icon: '👑',
  },
];

// ============================================================
// DATOS HISTORICOS - EUROMILLONES
// ============================================================

const EUROMILLONES_DRAWS: LotteryDraw[] = [
  { date: '2025-10-24', numbers: [12, 27, 34, 41, 48], stars: [3, 9], jackpot: 58000000 },
  { date: '2025-10-21', numbers: [5, 18, 23, 39, 47], stars: [7, 11], jackpot: 52000000 },
  { date: '2025-10-17', numbers: [8, 15, 29, 36, 44], stars: [2, 8], jackpot: 48000000 },
  { date: '2025-10-14', numbers: [3, 17, 25, 33, 49], stars: [5, 10], jackpot: 43000000 },
  { date: '2025-10-10', numbers: [11, 22, 31, 38, 46], stars: [1, 6], jackpot: 39000000 },
  { date: '2025-10-07', numbers: [6, 19, 28, 42, 50], stars: [4, 12], jackpot: 35000000 },
  { date: '2025-10-03', numbers: [14, 26, 35, 40, 45], stars: [3, 7], jackpot: 32000000 },
  { date: '2025-09-30', numbers: [2, 10, 24, 37, 43], stars: [6, 9], jackpot: 28000000 },
  { date: '2025-09-26', numbers: [9, 21, 30, 41, 47], stars: [2, 11], jackpot: 25000000 },
  { date: '2025-09-23', numbers: [7, 16, 33, 44, 49], stars: [5, 8], jackpot: 22000000 },
  { date: '2025-09-19', numbers: [1, 13, 27, 38, 46], stars: [4, 10], jackpot: 19000000 },
  { date: '2025-09-16', numbers: [15, 23, 29, 36, 48], stars: [3, 7], jackpot: 17000000 },
  { date: '2025-09-12', numbers: [4, 18, 25, 42, 50], stars: [1, 9], jackpot: 15000000 },
  { date: '2025-09-09', numbers: [8, 20, 34, 39, 45], stars: [6, 12], jackpot: 13000000 },
  { date: '2025-09-05', numbers: [11, 17, 28, 35, 44], stars: [2, 5], jackpot: 12000000 },
  { date: '2025-09-02', numbers: [3, 22, 31, 40, 47], stars: [7, 10], jackpot: 11000000 },
  { date: '2025-08-29', numbers: [6, 14, 26, 37, 49], stars: [4, 8], jackpot: 10000000 },
  { date: '2025-08-26', numbers: [9, 19, 33, 41, 46], stars: [1, 11], jackpot: 9000000 },
  { date: '2025-08-22', numbers: [12, 25, 30, 38, 43], stars: [3, 6], jackpot: 8500000 },
  { date: '2025-08-19', numbers: [5, 16, 27, 36, 48], stars: [5, 9], jackpot: 8000000 },
  { date: '2025-08-15', numbers: [2, 21, 34, 42, 50], stars: [2, 7], jackpot: 7500000 },
  { date: '2025-08-12', numbers: [10, 23, 29, 39, 45], stars: [8, 10], jackpot: 7000000 },
  { date: '2025-08-08', numbers: [7, 15, 28, 35, 44], stars: [4, 12], jackpot: 6500000 },
  { date: '2025-08-05', numbers: [1, 18, 31, 40, 47], stars: [3, 6], jackpot: 6000000 },
  { date: '2025-08-01', numbers: [13, 26, 33, 41, 49], stars: [1, 9], jackpot: 5500000 },
  { date: '2025-07-29', numbers: [4, 17, 25, 38, 46], stars: [5, 11], jackpot: 5000000 },
  { date: '2025-07-25', numbers: [8, 22, 30, 36, 43], stars: [2, 7], jackpot: 4800000 },
  { date: '2025-07-22', numbers: [11, 19, 34, 42, 48], stars: [6, 10], jackpot: 4500000 },
  { date: '2025-07-18', numbers: [6, 24, 29, 37, 50], stars: [3, 8], jackpot: 4200000 },
  { date: '2025-07-15', numbers: [3, 14, 27, 35, 44], stars: [1, 5], jackpot: 3900000 },
  { date: '2025-07-11', numbers: [9, 20, 31, 39, 47], stars: [4, 9], jackpot: 3600000 },
  { date: '2025-07-08', numbers: [12, 18, 26, 41, 45], stars: [7, 11], jackpot: 3300000 },
  { date: '2025-07-04', numbers: [5, 16, 33, 38, 49], stars: [2, 6], jackpot: 3000000 },
  { date: '2025-07-01', numbers: [2, 23, 28, 36, 43], stars: [5, 10], jackpot: 2800000 },
  { date: '2025-06-27', numbers: [7, 15, 30, 40, 46], stars: [3, 8], jackpot: 2500000 },
  { date: '2025-06-24', numbers: [10, 21, 34, 42, 48], stars: [1, 12], jackpot: 2300000 },
  { date: '2025-06-20', numbers: [4, 17, 25, 37, 50], stars: [4, 7], jackpot: 2100000 },
  { date: '2025-06-17', numbers: [13, 22, 29, 35, 44], stars: [6, 9], jackpot: 1900000 },
  { date: '2025-06-13', numbers: [8, 19, 31, 39, 47], stars: [2, 5], jackpot: 1700000 },
  { date: '2025-06-10', numbers: [1, 14, 26, 38, 45], stars: [8, 11], jackpot: 1500000 },
  { date: '2025-06-06', numbers: [6, 23, 28, 36, 49], stars: [3, 10], jackpot: 1400000 },
  { date: '2025-06-03', numbers: [11, 18, 33, 41, 46], stars: [5, 7], jackpot: 1300000 },
  { date: '2025-05-30', numbers: [3, 20, 27, 35, 44], stars: [1, 4], jackpot: 1200000 },
  { date: '2025-05-27', numbers: [9, 16, 24, 40, 48], stars: [6, 9], jackpot: 1100000 },
  { date: '2025-05-23', numbers: [12, 25, 30, 37, 50], stars: [2, 8], jackpot: 1000000 },
  { date: '2025-05-20', numbers: [5, 17, 29, 38, 43], stars: [4, 11], jackpot: 950000 },
  { date: '2025-05-16', numbers: [2, 15, 34, 42, 47], stars: [3, 7], jackpot: 900000 },
  { date: '2025-05-13', numbers: [8, 21, 26, 36, 49], stars: [5, 10], jackpot: 850000 },
  { date: '2025-05-09', numbers: [14, 22, 31, 39, 45], stars: [1, 6], jackpot: 800000 },
  { date: '2025-05-06', numbers: [7, 19, 28, 41, 46], stars: [7, 12], jackpot: 750000 },
  { date: '2025-05-02', numbers: [4, 13, 33, 40, 48], stars: [2, 9], jackpot: 700000 },
  { date: '2025-04-29', numbers: [10, 24, 35, 37, 44], stars: [4, 8], jackpot: 680000 },
  { date: '2025-04-25', numbers: [6, 18, 27, 42, 50], stars: [3, 11], jackpot: 660000 },
  { date: '2025-04-22', numbers: [1, 16, 29, 38, 47], stars: [5, 7], jackpot: 640000 },
  { date: '2025-04-18', numbers: [11, 23, 30, 36, 43], stars: [1, 10], jackpot: 620000 },
  { date: '2025-04-15', numbers: [3, 17, 25, 39, 49], stars: [6, 9], jackpot: 600000 },
  { date: '2025-04-11', numbers: [8, 20, 34, 41, 46], stars: [2, 5], jackpot: 580000 },
  { date: '2025-04-08', numbers: [12, 19, 28, 35, 45], stars: [4, 8], jackpot: 560000 },
  { date: '2025-04-04', numbers: [5, 14, 26, 40, 48], stars: [3, 7], jackpot: 540000 },
  { date: '2025-04-01', numbers: [9, 22, 31, 37, 44], stars: [5, 11], jackpot: 520000 },
  { date: '2025-03-28', numbers: [2, 15, 33, 38, 50], stars: [1, 6], jackpot: 500000 },
  { date: '2025-03-25', numbers: [7, 18, 24, 42, 47], stars: [7, 10], jackpot: 490000 },
  { date: '2025-03-21', numbers: [10, 21, 29, 36, 46], stars: [3, 9], jackpot: 480000 },
  { date: '2025-03-18', numbers: [4, 17, 30, 39, 43], stars: [2, 5], jackpot: 470000 },
  { date: '2025-03-14', numbers: [13, 25, 34, 41, 49], stars: [4, 8], jackpot: 460000 },
  { date: '2025-03-11', numbers: [6, 16, 28, 35, 45], stars: [6, 11], jackpot: 450000 },
  { date: '2025-03-07', numbers: [1, 23, 27, 38, 44], stars: [1, 7], jackpot: 440000 },
  { date: '2025-03-04', numbers: [8, 19, 31, 40, 48], stars: [3, 10], jackpot: 430000 },
  { date: '2025-02-28', numbers: [11, 22, 33, 37, 46], stars: [5, 9], jackpot: 420000 },
  { date: '2025-02-25', numbers: [3, 14, 26, 42, 50], stars: [2, 6], jackpot: 410000 },
  { date: '2025-02-21', numbers: [7, 18, 29, 35, 47], stars: [4, 8], jackpot: 400000 },
  { date: '2025-02-18', numbers: [12, 20, 30, 39, 44], stars: [1, 11], jackpot: 390000 },
  { date: '2025-02-14', numbers: [5, 17, 25, 41, 49], stars: [3, 7], jackpot: 380000 },
  { date: '2025-02-11', numbers: [9, 24, 31, 36, 45], stars: [6, 10], jackpot: 370000 },
  { date: '2025-02-07', numbers: [2, 16, 28, 38, 43], stars: [2, 9], jackpot: 360000 },
  { date: '2025-02-04', numbers: [10, 21, 34, 40, 48], stars: [5, 12], jackpot: 350000 },
  { date: '2025-01-31', numbers: [6, 15, 27, 37, 46], stars: [1, 4], jackpot: 340000 },
  { date: '2025-01-28', numbers: [4, 19, 26, 35, 44], stars: [3, 8], jackpot: 330000 },
  { date: '2025-01-24', numbers: [8, 23, 29, 42, 50], stars: [7, 11], jackpot: 320000 },
  { date: '2025-01-21', numbers: [13, 17, 30, 39, 47], stars: [2, 5], jackpot: 310000 },
  { date: '2025-01-17', numbers: [1, 14, 25, 41, 49], stars: [4, 9], jackpot: 300000 },
  { date: '2025-01-14', numbers: [7, 22, 33, 36, 45], stars: [6, 10], jackpot: 290000 },
  { date: '2025-01-10', numbers: [11, 18, 31, 38, 44], stars: [3, 7], jackpot: 280000 },
  { date: '2025-01-07', numbers: [3, 20, 28, 40, 48], stars: [1, 8], jackpot: 270000 },
  { date: '2025-01-03', numbers: [9, 16, 24, 35, 43], stars: [5, 11], jackpot: 260000 },
  { date: '2024-12-30', numbers: [5, 14, 27, 39, 46], stars: [2, 7], jackpot: 240000 },
  { date: '2024-12-27', numbers: [12, 23, 31, 42, 50], stars: [4, 9], jackpot: 230000 },
  { date: '2024-12-20', numbers: [8, 17, 25, 38, 44], stars: [1, 6], jackpot: 220000 },
  { date: '2024-12-17', numbers: [3, 19, 34, 40, 49], stars: [3, 10], jackpot: 210000 },
  { date: '2024-12-13', numbers: [10, 22, 29, 36, 47], stars: [5, 8], jackpot: 200000 },
  { date: '2024-12-10', numbers: [6, 15, 28, 41, 45], stars: [7, 12], jackpot: 190000 },
  { date: '2024-12-06', numbers: [2, 18, 30, 37, 43], stars: [2, 11], jackpot: 180000 },
  { date: '2024-11-29', numbers: [9, 21, 26, 35, 48], stars: [4, 6], jackpot: 170000 },
  { date: '2024-11-26', numbers: [13, 24, 33, 39, 50], stars: [1, 9], jackpot: 160000 },
  { date: '2024-11-22', numbers: [7, 16, 29, 42, 44], stars: [3, 7], jackpot: 150000 },
  { date: '2024-11-19', numbers: [4, 20, 27, 38, 46], stars: [5, 10], jackpot: 140000 },
  { date: '2024-11-15', numbers: [11, 17, 31, 40, 49], stars: [2, 8], jackpot: 130000 },
  { date: '2024-11-08', numbers: [8, 23, 28, 35, 47], stars: [6, 12], jackpot: 120000 },
  { date: '2024-11-05', numbers: [1, 14, 25, 37, 43], stars: [4, 9], jackpot: 110000 },
  { date: '2024-11-01', numbers: [6, 19, 30, 41, 50], stars: [1, 5], jackpot: 100000 },
  { date: '2024-10-25', numbers: [12, 22, 34, 39, 45], stars: [3, 7], jackpot: 95000 },
  { date: '2024-10-22', numbers: [3, 15, 26, 38, 48], stars: [2, 11], jackpot: 90000 },
  { date: '2024-10-18', numbers: [9, 18, 29, 36, 44], stars: [5, 8], jackpot: 85000 },
  { date: '2024-10-15', numbers: [7, 21, 27, 40, 49], stars: [1, 6], jackpot: 80000 },
  { date: '2024-10-11', numbers: [5, 16, 24, 42, 47], stars: [4, 10], jackpot: 76000 },
  { date: '2024-10-08', numbers: [10, 23, 31, 37, 50], stars: [3, 9], jackpot: 72000 },
  { date: '2024-10-04', numbers: [2, 17, 28, 35, 46], stars: [7, 12], jackpot: 68000 },
  { date: '2024-10-01', numbers: [13, 20, 33, 39, 44], stars: [2, 5], jackpot: 64000 },
  { date: '2024-09-27', numbers: [8, 19, 25, 41, 48], stars: [4, 8], jackpot: 60000 },
  { date: '2024-09-24', numbers: [4, 14, 30, 38, 43], stars: [1, 11], jackpot: 56000 },
  { date: '2024-09-20', numbers: [11, 22, 29, 36, 47], stars: [3, 7], jackpot: 52000 },
  { date: '2024-09-17', numbers: [6, 18, 27, 40, 49], stars: [5, 9], jackpot: 48000 },
  { date: '2024-09-13', numbers: [1, 15, 31, 37, 45], stars: [2, 6], jackpot: 44000 },
  { date: '2024-09-10', numbers: [9, 21, 26, 34, 50], stars: [4, 10], jackpot: 40000 },
  { date: '2024-09-06', numbers: [7, 16, 24, 42, 48], stars: [1, 8], jackpot: 36000 },
  { date: '2024-09-03', numbers: [3, 17, 28, 39, 44], stars: [3, 12], jackpot: 32000 },
  { date: '2024-08-30', numbers: [12, 23, 30, 35, 46], stars: [5, 7], jackpot: 30000 },
  { date: '2024-08-27', numbers: [5, 19, 25, 41, 49], stars: [2, 9], jackpot: 28000 },
  { date: '2024-08-23', numbers: [8, 14, 33, 38, 47], stars: [4, 11], jackpot: 26000 },
  { date: '2024-08-20', numbers: [10, 20, 29, 37, 43], stars: [6, 8], jackpot: 24000 },
  { date: '2024-08-16', numbers: [2, 18, 27, 40, 50], stars: [1, 5], jackpot: 22000 },
  { date: '2024-08-13', numbers: [13, 22, 31, 36, 45], stars: [3, 10], jackpot: 20000 },
  { date: '2024-08-09', numbers: [7, 15, 26, 39, 48], stars: [7, 12], jackpot: 18000 },
  { date: '2024-08-06', numbers: [4, 17, 24, 34, 44], stars: [2, 6], jackpot: 17000 },
  { date: '2024-08-02', numbers: [9, 21, 28, 42, 49], stars: [4, 9], jackpot: 16000 },
  { date: '2024-07-30', numbers: [11, 16, 33, 37, 47], stars: [1, 8], jackpot: 15000 },
  { date: '2024-07-26', numbers: [6, 19, 25, 40, 46], stars: [5, 11], jackpot: 14000 },
  { date: '2024-07-23', numbers: [3, 14, 30, 38, 50], stars: [3, 7], jackpot: 13000 },
  { date: '2024-07-19', numbers: [8, 23, 29, 35, 43], stars: [2, 10], jackpot: 12000 },
  { date: '2024-07-16', numbers: [12, 18, 27, 41, 48], stars: [6, 9], jackpot: 11000 },
  { date: '2024-07-12', numbers: [5, 20, 31, 39, 45], stars: [4, 12], jackpot: 10000 },
  { date: '2024-07-09', numbers: [1, 15, 26, 36, 44], stars: [1, 5], jackpot: 9500 },
  { date: '2024-07-05', numbers: [10, 22, 28, 37, 49], stars: [3, 8], jackpot: 9000 },
  { date: '2024-07-02', numbers: [7, 17, 34, 40, 47], stars: [7, 11], jackpot: 8500 },
  { date: '2024-06-28', numbers: [4, 16, 25, 42, 50], stars: [2, 6], jackpot: 8000 },
  { date: '2024-06-25', numbers: [13, 21, 30, 38, 46], stars: [5, 9], jackpot: 7500 },
  { date: '2024-06-21', numbers: [9, 19, 29, 35, 44], stars: [1, 4], jackpot: 7000 },
  { date: '2024-06-18', numbers: [2, 14, 27, 41, 48], stars: [3, 10], jackpot: 6500 },
  { date: '2024-06-14', numbers: [8, 23, 31, 37, 49], stars: [6, 12], jackpot: 6000 },
  { date: '2024-06-11', numbers: [6, 18, 26, 40, 45], stars: [2, 7], jackpot: 5500 },
  { date: '2024-06-07', numbers: [11, 20, 28, 39, 50], stars: [4, 8], jackpot: 5000 },
  { date: '2024-06-04', numbers: [3, 15, 33, 36, 47], stars: [5, 11], jackpot: 4800 },
  { date: '2024-05-31', numbers: [7, 17, 24, 42, 44], stars: [1, 9], jackpot: 4600 },
  { date: '2024-05-28', numbers: [12, 22, 30, 38, 49], stars: [3, 6], jackpot: 4400 },
  { date: '2024-05-24', numbers: [5, 16, 29, 35, 46], stars: [7, 10], jackpot: 4200 },
  { date: '2024-05-21', numbers: [10, 21, 27, 41, 48], stars: [2, 5], jackpot: 4000 },
  { date: '2024-05-17', numbers: [1, 19, 25, 37, 50], stars: [4, 8], jackpot: 3800 },
  { date: '2024-05-14', numbers: [8, 14, 31, 39, 45], stars: [6, 12], jackpot: 3600 },
  { date: '2024-05-10', numbers: [4, 23, 28, 34, 47], stars: [3, 7], jackpot: 3400 },
  { date: '2024-05-07', numbers: [13, 18, 26, 40, 44], stars: [1, 9], jackpot: 3200 },
  { date: '2024-05-03', numbers: [9, 17, 30, 36, 49], stars: [5, 11], jackpot: 3000 },
  { date: '2024-04-30', numbers: [6, 20, 25, 42, 48], stars: [2, 4], jackpot: 2800 },
  { date: '2024-04-26', numbers: [2, 15, 33, 38, 46], stars: [7, 10], jackpot: 2600 },
  { date: '2024-04-23', numbers: [11, 22, 29, 37, 50], stars: [3, 8], jackpot: 2400 },
  { date: '2024-04-19', numbers: [7, 16, 24, 41, 45], stars: [1, 6], jackpot: 2200 },
  { date: '2024-04-16', numbers: [3, 19, 31, 40, 47], stars: [4, 12], jackpot: 2000 },
  { date: '2024-04-12', numbers: [10, 21, 28, 35, 49], stars: [2, 5], jackpot: 1900 },
  { date: '2024-04-09', numbers: [5, 14, 27, 39, 44], stars: [6, 9], jackpot: 1800 },
  { date: '2024-04-05', numbers: [8, 18, 26, 42, 48], stars: [3, 7], jackpot: 1700 },
  { date: '2024-04-02', numbers: [12, 23, 30, 37, 50], stars: [5, 11], jackpot: 1600 },
  { date: '2024-03-29', numbers: [1, 17, 25, 34, 46], stars: [1, 8], jackpot: 1500 },
  { date: '2024-03-26', numbers: [9, 20, 29, 41, 45], stars: [4, 10], jackpot: 1400 },
  { date: '2024-03-22', numbers: [6, 15, 33, 38, 49], stars: [2, 6], jackpot: 1300 },
  { date: '2024-03-19', numbers: [4, 16, 28, 40, 47], stars: [7, 12], jackpot: 1200 },
  { date: '2024-03-15', numbers: [11, 19, 24, 36, 50], stars: [3, 5], jackpot: 1100 },
  { date: '2024-03-12', numbers: [7, 22, 31, 39, 44], stars: [1, 9], jackpot: 1000 },
  { date: '2024-03-08', numbers: [2, 18, 27, 35, 48], stars: [6, 11], jackpot: 950 },
  { date: '2024-03-05', numbers: [13, 21, 26, 42, 46], stars: [4, 7], jackpot: 900 },
  { date: '2024-03-01', numbers: [8, 17, 30, 37, 49], stars: [2, 10], jackpot: 850 },
  { date: '2024-02-27', numbers: [5, 14, 25, 41, 45], stars: [5, 8], jackpot: 800 },
  { date: '2024-02-23', numbers: [10, 23, 29, 38, 50], stars: [3, 6], jackpot: 750 },
  { date: '2024-02-20', numbers: [3, 16, 28, 34, 47], stars: [1, 12], jackpot: 700 },
  { date: '2024-02-16', numbers: [9, 19, 33, 40, 44], stars: [7, 9], jackpot: 680 },
  { date: '2024-02-13', numbers: [6, 15, 24, 39, 49], stars: [4, 5], jackpot: 660 },
  { date: '2024-02-09', numbers: [12, 22, 31, 37, 46], stars: [2, 11], jackpot: 640 },
  { date: '2024-02-06', numbers: [1, 18, 27, 35, 48], stars: [6, 8], jackpot: 620 },
  { date: '2024-02-02', numbers: [7, 20, 26, 42, 50], stars: [3, 10], jackpot: 600 },
  { date: '2024-01-30', numbers: [4, 17, 29, 38, 45], stars: [1, 7], jackpot: 580 },
  { date: '2024-01-26', numbers: [11, 21, 25, 36, 49], stars: [5, 9], jackpot: 560 },
  { date: '2024-01-23', numbers: [8, 16, 30, 40, 47], stars: [4, 12], jackpot: 540 },
  { date: '2024-01-19', numbers: [2, 14, 28, 34, 44], stars: [2, 6], jackpot: 520 },
  { date: '2024-01-16', numbers: [13, 23, 31, 39, 50], stars: [7, 11], jackpot: 500 },
  { date: '2024-01-12', numbers: [5, 19, 27, 41, 46], stars: [3, 8], jackpot: 480 },
  { date: '2024-01-09', numbers: [9, 18, 24, 37, 48], stars: [1, 5], jackpot: 460 },
  { date: '2024-01-05', numbers: [6, 15, 33, 42, 49], stars: [4, 10], jackpot: 440 },
];

// ============================================================
// DATOS HISTORICOS - LA ONCE CUPON DIARIO
// Numero de 5 digitos (cada digito 0-9) + serie (1-55)
// ============================================================

const ONCE_CUPON_DRAWS: LotteryDraw[] = [
  { date: '2025-10-24', numbers: [3, 7, 1, 9, 4], stars: [12], jackpot: 35000 },
  { date: '2025-10-23', numbers: [8, 2, 5, 0, 7], stars: [34], jackpot: 35000 },
  { date: '2025-10-22', numbers: [1, 6, 3, 8, 2], stars: [28], jackpot: 35000 },
  { date: '2025-10-21', numbers: [9, 0, 4, 5, 1], stars: [7], jackpot: 35000 },
  { date: '2025-10-20', numbers: [5, 8, 2, 7, 6], stars: [45], jackpot: 35000 },
  { date: '2025-10-17', numbers: [2, 4, 9, 1, 3], stars: [18], jackpot: 35000 },
  { date: '2025-10-16', numbers: [7, 1, 0, 6, 8], stars: [3], jackpot: 35000 },
  { date: '2025-10-15', numbers: [4, 5, 7, 2, 9], stars: [52], jackpot: 35000 },
  { date: '2025-10-14', numbers: [0, 3, 8, 5, 1], stars: [22], jackpot: 35000 },
  { date: '2025-10-13', numbers: [6, 9, 4, 0, 7], stars: [15], jackpot: 35000 },
  { date: '2025-10-10', numbers: [1, 7, 3, 9, 5], stars: [41], jackpot: 35000 },
  { date: '2025-10-09', numbers: [8, 0, 6, 2, 4], stars: [8], jackpot: 35000 },
  { date: '2025-10-08', numbers: [3, 5, 1, 7, 0], stars: [33], jackpot: 35000 },
  { date: '2025-10-07', numbers: [9, 4, 2, 8, 6], stars: [19], jackpot: 35000 },
  { date: '2025-10-06', numbers: [5, 2, 7, 0, 3], stars: [47], jackpot: 35000 },
  { date: '2025-10-03', numbers: [0, 8, 4, 1, 9], stars: [5], jackpot: 35000 },
  { date: '2025-10-02', numbers: [7, 6, 0, 5, 2], stars: [29], jackpot: 35000 },
  { date: '2025-10-01', numbers: [2, 9, 8, 3, 1], stars: [44], jackpot: 35000 },
  { date: '2025-09-30', numbers: [4, 1, 5, 6, 8], stars: [11], jackpot: 35000 },
  { date: '2025-09-29', numbers: [6, 3, 9, 0, 7], stars: [38], jackpot: 35000 },
  { date: '2025-09-26', numbers: [8, 5, 2, 7, 1], stars: [50], jackpot: 35000 },
  { date: '2025-09-25', numbers: [1, 0, 6, 4, 9], stars: [16], jackpot: 35000 },
  { date: '2025-09-24', numbers: [3, 8, 1, 9, 5], stars: [42], jackpot: 35000 },
  { date: '2025-09-23', numbers: [9, 2, 7, 0, 4], stars: [25], jackpot: 35000 },
  { date: '2025-09-22', numbers: [5, 6, 0, 3, 8], stars: [4], jackpot: 35000 },
  { date: '2025-09-19', numbers: [0, 4, 9, 7, 2], stars: [49], jackpot: 35000 },
  { date: '2025-09-18', numbers: [7, 1, 5, 8, 3], stars: [14], jackpot: 35000 },
  { date: '2025-09-17', numbers: [4, 9, 2, 6, 0], stars: [37], jackpot: 35000 },
  { date: '2025-09-16', numbers: [2, 7, 4, 1, 5], stars: [53], jackpot: 35000 },
  { date: '2025-09-15', numbers: [6, 0, 8, 3, 9], stars: [21], jackpot: 35000 },
  { date: '2025-09-12', numbers: [1, 5, 7, 2, 4], stars: [46], jackpot: 35000 },
  { date: '2025-09-11', numbers: [8, 3, 0, 9, 6], stars: [10], jackpot: 35000 },
  { date: '2025-09-10', numbers: [3, 6, 5, 4, 1], stars: [31], jackpot: 35000 },
  { date: '2025-09-09', numbers: [9, 8, 2, 7, 0], stars: [43], jackpot: 35000 },
  { date: '2025-09-08', numbers: [5, 1, 9, 0, 3], stars: [6], jackpot: 35000 },
  { date: '2025-09-05', numbers: [0, 7, 4, 5, 8], stars: [27], jackpot: 35000 },
  { date: '2025-09-04', numbers: [7, 4, 1, 6, 2], stars: [54], jackpot: 35000 },
  { date: '2025-09-03', numbers: [4, 2, 6, 8, 9], stars: [20], jackpot: 35000 },
  { date: '2025-09-02', numbers: [2, 9, 3, 1, 7], stars: [40], jackpot: 35000 },
  { date: '2025-09-01', numbers: [6, 5, 0, 4, 8], stars: [13], jackpot: 35000 },
  // Sorteos especiales ONCE
  { date: '2024-12-23', numbers: [5, 8, 2, 1, 9], stars: [42], jackpot: 30000000, special: true, specialName: 'Cupon Extraordinario de Navidad' },
  { date: '2024-01-06', numbers: [6, 8, 3, 1, 9], stars: [28], jackpot: 25000000, special: true, specialName: 'Cupon Extraordinario de Reyes' },
  { date: '2023-12-22', numbers: [4, 7, 1, 5, 0], stars: [39], jackpot: 30000000, special: true, specialName: 'Cupon Extraordinario de Navidad' },
  { date: '2023-01-06', numbers: [2, 8, 6, 0, 5], stars: [28], jackpot: 25000000, special: true, specialName: 'Cupon Extraordinario de Reyes' },
  { date: '2022-12-23', numbers: [9, 3, 5, 2, 7], stars: [41], jackpot: 30000000, special: true, specialName: 'Cupon Extraordinario de Navidad' },
  { date: '2022-01-06', numbers: [1, 4, 9, 6, 3], stars: [35], jackpot: 25000000, special: true, specialName: 'Cupon Extraordinario de Reyes' },
  { date: '2021-12-23', numbers: [7, 0, 8, 4, 2], stars: [47], jackpot: 30000000, special: true, specialName: 'Cupon Extraordinario de Navidad' },
  // 2024 muestra
  { date: '2024-12-20', numbers: [3, 0, 7, 5, 4], stars: [17], jackpot: 35000 },
  { date: '2024-12-13', numbers: [7, 4, 0, 9, 2], stars: [24], jackpot: 35000 },
  { date: '2024-12-06', numbers: [2, 8, 5, 1, 3], stars: [48], jackpot: 35000 },
  { date: '2024-11-29', numbers: [4, 7, 9, 0, 6], stars: [13], jackpot: 35000 },
  { date: '2024-11-22', numbers: [0, 1, 3, 7, 5], stars: [36], jackpot: 35000 },
  { date: '2024-11-15', numbers: [8, 6, 2, 4, 9], stars: [21], jackpot: 35000 },
  { date: '2024-11-08', numbers: [5, 3, 7, 1, 0], stars: [40], jackpot: 35000 },
  { date: '2024-11-01', numbers: [9, 0, 4, 8, 2], stars: [6], jackpot: 35000 },
  { date: '2024-10-25', numbers: [3, 9, 1, 5, 6], stars: [27], jackpot: 35000 },
  { date: '2024-10-18', numbers: [1, 4, 8, 0, 7], stars: [43], jackpot: 35000 },
  { date: '2024-10-11', numbers: [6, 2, 5, 9, 3], stars: [10], jackpot: 35000 },
  { date: '2024-10-04', numbers: [7, 0, 6, 2, 8], stars: [35], jackpot: 35000 },
  { date: '2024-09-27', numbers: [2, 5, 9, 3, 1], stars: [49], jackpot: 35000 },
  { date: '2024-09-20', numbers: [8, 7, 0, 4, 6], stars: [14], jackpot: 35000 },
  { date: '2024-09-13', numbers: [4, 1, 3, 8, 5], stars: [37], jackpot: 35000 },
  { date: '2024-09-06', numbers: [0, 6, 2, 7, 9], stars: [2], jackpot: 35000 },
  { date: '2024-08-30', numbers: [5, 8, 4, 1, 0], stars: [26], jackpot: 35000 },
  { date: '2024-08-23', numbers: [9, 3, 7, 5, 2], stars: [50], jackpot: 35000 },
  { date: '2024-08-16', numbers: [1, 0, 6, 9, 4], stars: [16], jackpot: 35000 },
  { date: '2024-08-09', numbers: [7, 5, 8, 2, 3], stars: [39], jackpot: 35000 },
  { date: '2024-08-02', numbers: [3, 2, 0, 6, 7], stars: [23], jackpot: 35000 },
  { date: '2024-07-26', numbers: [6, 9, 4, 1, 8], stars: [46], jackpot: 35000 },
  { date: '2024-07-19', numbers: [0, 7, 5, 3, 2], stars: [12], jackpot: 35000 },
  { date: '2024-07-12', numbers: [8, 4, 1, 7, 9], stars: [32], jackpot: 35000 },
  { date: '2024-07-05', numbers: [4, 6, 9, 0, 5], stars: [4], jackpot: 35000 },
  { date: '2024-06-28', numbers: [2, 0, 3, 8, 6], stars: [51], jackpot: 35000 },
  { date: '2024-06-21', numbers: [9, 8, 7, 4, 1], stars: [25], jackpot: 35000 },
  { date: '2024-06-14', numbers: [5, 1, 0, 6, 3], stars: [41], jackpot: 35000 },
  { date: '2024-06-07', numbers: [7, 3, 2, 5, 8], stars: [20], jackpot: 35000 },
  { date: '2024-05-31', numbers: [1, 6, 8, 9, 0], stars: [45], jackpot: 35000 },
  { date: '2024-05-24', numbers: [3, 5, 4, 2, 7], stars: [1], jackpot: 35000 },
  { date: '2024-05-17', numbers: [8, 9, 6, 1, 4], stars: [30], jackpot: 35000 },
  { date: '2024-05-10', numbers: [0, 2, 5, 7, 3], stars: [53], jackpot: 35000 },
  { date: '2024-05-03', numbers: [6, 7, 3, 0, 8], stars: [15], jackpot: 35000 },
  { date: '2024-04-26', numbers: [4, 0, 9, 5, 1], stars: [38], jackpot: 35000 },
  { date: '2024-04-19', numbers: [9, 5, 2, 6, 7], stars: [8], jackpot: 35000 },
  { date: '2024-04-12', numbers: [2, 8, 1, 4, 5], stars: [34], jackpot: 35000 },
  { date: '2024-04-05', numbers: [7, 4, 6, 3, 0], stars: [28], jackpot: 35000 },
  { date: '2024-03-29', numbers: [5, 1, 0, 8, 6], stars: [47], jackpot: 35000 },
  { date: '2024-03-22', numbers: [0, 3, 7, 2, 9], stars: [18], jackpot: 35000 },
  { date: '2024-03-15', numbers: [8, 6, 4, 1, 2], stars: [44], jackpot: 35000 },
  { date: '2024-03-08', numbers: [3, 9, 5, 0, 7], stars: [7], jackpot: 35000 },
  { date: '2024-03-01', numbers: [6, 2, 8, 4, 1], stars: [33], jackpot: 35000 },
  { date: '2024-02-23', numbers: [1, 7, 0, 9, 5], stars: [49], jackpot: 35000 },
  { date: '2024-02-16', numbers: [9, 4, 3, 6, 8], stars: [11], jackpot: 35000 },
  { date: '2024-02-09', numbers: [4, 8, 2, 7, 0], stars: [36], jackpot: 35000 },
  { date: '2024-02-02', numbers: [7, 0, 6, 5, 3], stars: [22], jackpot: 35000 },
  { date: '2024-01-26', numbers: [2, 5, 9, 1, 4], stars: [42], jackpot: 35000 },
  { date: '2024-01-19', numbers: [5, 3, 1, 8, 7], stars: [5], jackpot: 35000 },
  { date: '2024-01-12', numbers: [0, 6, 4, 2, 9], stars: [29], jackpot: 35000 },
  { date: '2024-01-05', numbers: [8, 1, 7, 0, 5], stars: [54], jackpot: 35000 },
  // 2023 muestra
  { date: '2023-12-15', numbers: [9, 2, 6, 3, 8], stars: [17], jackpot: 35000 },
  { date: '2023-12-08', numbers: [1, 5, 0, 9, 7], stars: [43], jackpot: 35000 },
  { date: '2023-12-01', numbers: [7, 0, 8, 4, 2], stars: [14], jackpot: 35000 },
  { date: '2023-11-24', numbers: [3, 8, 5, 1, 6], stars: [48], jackpot: 35000 },
  { date: '2023-11-17', numbers: [5, 9, 2, 7, 0], stars: [3], jackpot: 35000 },
  { date: '2023-11-10', numbers: [0, 4, 7, 8, 3], stars: [31], jackpot: 35000 },
  { date: '2023-11-03', numbers: [6, 1, 9, 5, 4], stars: [46], jackpot: 35000 },
  { date: '2023-10-27', numbers: [8, 3, 0, 2, 5], stars: [9], jackpot: 35000 },
  { date: '2023-10-20', numbers: [2, 7, 4, 1, 6], stars: [25], jackpot: 35000 },
  { date: '2023-10-13', numbers: [4, 6, 8, 0, 9], stars: [41], jackpot: 35000 },
  { date: '2023-10-06', numbers: [9, 0, 3, 7, 1], stars: [15], jackpot: 35000 },
  { date: '2023-09-29', numbers: [1, 8, 6, 4, 2], stars: [37], jackpot: 35000 },
  { date: '2023-09-22', numbers: [7, 5, 1, 9, 0], stars: [50], jackpot: 35000 },
  { date: '2023-09-15', numbers: [3, 2, 7, 5, 8], stars: [12], jackpot: 35000 },
  { date: '2023-09-08', numbers: [5, 4, 0, 6, 3], stars: [44], jackpot: 35000 },
  { date: '2023-09-01', numbers: [0, 9, 4, 1, 7], stars: [27], jackpot: 35000 },
  { date: '2023-08-25', numbers: [6, 7, 2, 8, 5], stars: [4], jackpot: 35000 },
  { date: '2023-08-18', numbers: [8, 1, 9, 3, 4], stars: [40], jackpot: 35000 },
  { date: '2023-08-11', numbers: [2, 6, 5, 0, 7], stars: [19], jackpot: 35000 },
  { date: '2023-08-04', numbers: [9, 3, 8, 6, 1], stars: [35], jackpot: 35000 },
  { date: '2023-07-28', numbers: [4, 0, 1, 7, 9], stars: [52], jackpot: 35000 },
  { date: '2023-07-21', numbers: [7, 8, 6, 2, 0], stars: [8], jackpot: 35000 },
  { date: '2023-07-14', numbers: [1, 5, 3, 9, 6], stars: [33], jackpot: 35000 },
  { date: '2023-07-07', numbers: [5, 2, 0, 4, 8], stars: [47], jackpot: 35000 },
  { date: '2023-06-30', numbers: [3, 9, 7, 1, 2], stars: [21], jackpot: 35000 },
  { date: '2023-06-23', numbers: [0, 6, 4, 8, 5], stars: [45], jackpot: 35000 },
  { date: '2023-06-16', numbers: [8, 7, 9, 0, 3], stars: [13], jackpot: 35000 },
  { date: '2023-06-09', numbers: [6, 1, 2, 5, 4], stars: [38], jackpot: 35000 },
  { date: '2023-06-02', numbers: [2, 4, 8, 3, 7], stars: [6], jackpot: 35000 },
  { date: '2023-05-26', numbers: [9, 0, 5, 6, 1], stars: [29], jackpot: 35000 },
  { date: '2023-05-19', numbers: [4, 8, 3, 7, 0], stars: [53], jackpot: 35000 },
  { date: '2023-05-12', numbers: [7, 5, 1, 2, 9], stars: [16], jackpot: 35000 },
  { date: '2023-05-05', numbers: [1, 3, 6, 8, 4], stars: [42], jackpot: 35000 },
  { date: '2023-04-28', numbers: [5, 6, 0, 9, 3], stars: [23], jackpot: 35000 },
  { date: '2023-04-21', numbers: [0, 2, 4, 5, 8], stars: [49], jackpot: 35000 },
  { date: '2023-04-14', numbers: [8, 9, 7, 1, 6], stars: [10], jackpot: 35000 },
  { date: '2023-04-07', numbers: [3, 1, 5, 0, 2], stars: [36], jackpot: 35000 },
  { date: '2023-03-31', numbers: [6, 4, 8, 7, 5], stars: [26], jackpot: 35000 },
  { date: '2023-03-24', numbers: [2, 7, 3, 9, 1], stars: [51], jackpot: 35000 },
  { date: '2023-03-17', numbers: [9, 5, 2, 4, 0], stars: [7], jackpot: 35000 },
  { date: '2023-03-10', numbers: [4, 0, 6, 3, 8], stars: [34], jackpot: 35000 },
  { date: '2023-03-03', numbers: [7, 8, 1, 5, 9], stars: [48], jackpot: 35000 },
  { date: '2023-02-24', numbers: [1, 6, 9, 0, 4], stars: [14], jackpot: 35000 },
  { date: '2023-02-17', numbers: [5, 3, 7, 2, 6], stars: [40], jackpot: 35000 },
  { date: '2023-02-10', numbers: [0, 9, 4, 8, 1], stars: [5], jackpot: 35000 },
  { date: '2023-02-03', numbers: [8, 2, 0, 6, 7], stars: [31], jackpot: 35000 },
  { date: '2023-01-27', numbers: [3, 7, 5, 1, 9], stars: [46], jackpot: 35000 },
  { date: '2023-01-20', numbers: [6, 1, 8, 4, 2], stars: [11], jackpot: 35000 },
  { date: '2023-01-13', numbers: [9, 4, 3, 7, 0], stars: [37], jackpot: 35000 },
];

// ============================================================
// DATOS HISTORICOS - LOTERIA NACIONAL
// Numero de 5 digitos (cada digito 0-9) + serie (1-55)
// ============================================================

const LOTERIA_NACIONAL_DRAWS: LotteryDraw[] = [
  { date: '2025-10-25', numbers: [3, 7, 1, 9, 4], stars: [12], jackpot: 3000000 },
  { date: '2025-10-23', numbers: [8, 2, 5, 0, 7], stars: [34], jackpot: 3000000 },
  { date: '2025-10-18', numbers: [1, 6, 3, 8, 2], stars: [28], jackpot: 3000000 },
  { date: '2025-10-16', numbers: [9, 0, 4, 5, 1], stars: [7], jackpot: 3000000 },
  { date: '2025-10-11', numbers: [5, 8, 2, 7, 6], stars: [45], jackpot: 3000000 },
  { date: '2025-10-09', numbers: [2, 4, 9, 1, 3], stars: [18], jackpot: 3000000 },
  { date: '2025-10-04', numbers: [7, 1, 0, 6, 8], stars: [3], jackpot: 3000000 },
  { date: '2025-10-02', numbers: [4, 5, 7, 2, 9], stars: [52], jackpot: 3000000 },
  { date: '2025-09-27', numbers: [0, 3, 8, 5, 1], stars: [22], jackpot: 3000000 },
  { date: '2025-09-25', numbers: [6, 9, 4, 0, 7], stars: [15], jackpot: 3000000 },
  { date: '2025-09-20', numbers: [1, 7, 3, 9, 5], stars: [41], jackpot: 3000000 },
  { date: '2025-09-18', numbers: [8, 0, 6, 2, 4], stars: [8], jackpot: 3000000 },
  { date: '2025-09-13', numbers: [3, 5, 1, 7, 0], stars: [33], jackpot: 3000000 },
  { date: '2025-09-11', numbers: [9, 4, 2, 8, 6], stars: [19], jackpot: 3000000 },
  { date: '2025-09-06', numbers: [5, 2, 7, 0, 3], stars: [47], jackpot: 3000000 },
  // Sorteos especiales Loteria Nacional
  { date: '2024-12-22', numbers: [5, 4, 7, 0, 1], stars: [23], jackpot: 4000000000, special: true, specialName: 'Loteria de Navidad 2024' },
  { date: '2024-01-06', numbers: [5, 1, 7, 0, 8], stars: [26], jackpot: 700000000, special: true, specialName: 'Loteria del Nino 2024' },
  { date: '2023-12-22', numbers: [8, 5, 4, 0, 2], stars: [19], jackpot: 4000000000, special: true, specialName: 'Loteria de Navidad 2023' },
  { date: '2023-01-06', numbers: [4, 1, 7, 0, 9], stars: [26], jackpot: 700000000, special: true, specialName: 'Loteria del Nino 2023' },
  { date: '2022-12-22', numbers: [2, 8, 3, 9, 5], stars: [41], jackpot: 4000000000, special: true, specialName: 'Loteria de Navidad 2022' },
  { date: '2022-01-06', numbers: [7, 3, 6, 2, 1], stars: [15], jackpot: 700000000, special: true, specialName: 'Loteria del Nino 2022' },
  { date: '2021-12-22', numbers: [9, 0, 1, 7, 4], stars: [33], jackpot: 4000000000, special: true, specialName: 'Loteria de Navidad 2021' },
  // 2024 ordinarios
  { date: '2024-12-07', numbers: [8, 2, 9, 4, 6], stars: [17], jackpot: 60000000 },
  { date: '2024-11-30', numbers: [1, 5, 0, 8, 3], stars: [42], jackpot: 3000000 },
  { date: '2024-11-23', numbers: [7, 9, 4, 1, 5], stars: [9], jackpot: 3000000 },
  { date: '2024-11-16', numbers: [3, 0, 6, 7, 2], stars: [35], jackpot: 3000000 },
  { date: '2024-11-09', numbers: [6, 8, 1, 5, 9], stars: [48], jackpot: 3000000 },
  { date: '2024-11-02', numbers: [2, 4, 7, 3, 0], stars: [14], jackpot: 3000000 },
  { date: '2024-10-26', numbers: [9, 1, 5, 0, 8], stars: [41], jackpot: 3000000 },
  { date: '2024-10-19', numbers: [0, 7, 3, 6, 4], stars: [7], jackpot: 3000000 },
  { date: '2024-10-12', numbers: [5, 2, 8, 9, 1], stars: [33], jackpot: 60000000, special: true, specialName: 'Sorteo Extraordinario Fiesta Nacional' },
  { date: '2024-10-05', numbers: [4, 9, 0, 2, 7], stars: [50], jackpot: 3000000 },
  { date: '2024-09-28', numbers: [8, 3, 6, 1, 5], stars: [20], jackpot: 3000000 },
  { date: '2024-09-21', numbers: [1, 6, 4, 8, 0], stars: [46], jackpot: 3000000 },
  { date: '2024-09-14', numbers: [7, 0, 2, 5, 9], stars: [12], jackpot: 3000000 },
  { date: '2024-09-07', numbers: [3, 8, 1, 7, 4], stars: [38], jackpot: 3000000 },
  { date: '2024-08-31', numbers: [9, 5, 7, 0, 2], stars: [4], jackpot: 3000000 },
  { date: '2024-08-24', numbers: [2, 1, 9, 4, 6], stars: [30], jackpot: 3000000 },
  { date: '2024-08-17', numbers: [6, 7, 0, 3, 8], stars: [55], jackpot: 3000000 },
  { date: '2024-08-10', numbers: [0, 4, 5, 9, 1], stars: [16], jackpot: 3000000 },
  { date: '2024-08-03', numbers: [5, 9, 3, 6, 7], stars: [43], jackpot: 3000000 },
  { date: '2024-07-27', numbers: [8, 6, 2, 0, 4], stars: [10], jackpot: 3000000 },
  { date: '2024-07-20', numbers: [4, 0, 7, 5, 3], stars: [36], jackpot: 3000000 },
  { date: '2024-07-13', numbers: [1, 3, 8, 2, 9], stars: [49], jackpot: 60000000 },
  { date: '2024-07-06', numbers: [7, 8, 4, 1, 0], stars: [25], jackpot: 3000000 },
  { date: '2024-06-29', numbers: [3, 5, 6, 9, 2], stars: [8], jackpot: 3000000 },
  { date: '2024-06-22', numbers: [9, 2, 0, 7, 5], stars: [47], jackpot: 3000000 },
  { date: '2024-06-15', numbers: [6, 7, 1, 3, 8], stars: [19], jackpot: 3000000 },
  { date: '2024-06-08', numbers: [0, 1, 5, 8, 4], stars: [45], jackpot: 3000000 },
  { date: '2024-06-01', numbers: [5, 4, 9, 0, 3], stars: [13], jackpot: 3000000 },
  { date: '2024-05-25', numbers: [2, 9, 7, 4, 1], stars: [39], jackpot: 3000000 },
  { date: '2024-05-18', numbers: [8, 3, 0, 6, 7], stars: [6], jackpot: 3000000 },
  { date: '2024-05-11', numbers: [4, 6, 8, 2, 5], stars: [32], jackpot: 3000000 },
  { date: '2024-05-04', numbers: [7, 1, 4, 9, 0], stars: [51], jackpot: 3000000 },
  { date: '2024-04-27', numbers: [1, 0, 3, 7, 6], stars: [18], jackpot: 3000000 },
  { date: '2024-04-20', numbers: [9, 8, 5, 1, 2], stars: [44], jackpot: 3000000 },
  { date: '2024-04-13', numbers: [3, 7, 2, 8, 9], stars: [11], jackpot: 3000000 },
  { date: '2024-04-06', numbers: [6, 2, 9, 0, 4], stars: [37], jackpot: 3000000 },
  { date: '2024-03-30', numbers: [0, 5, 1, 6, 8], stars: [4], jackpot: 3000000 },
  { date: '2024-03-23', numbers: [5, 9, 4, 3, 7], stars: [28], jackpot: 3000000 },
  { date: '2024-03-16', numbers: [8, 4, 0, 1, 3], stars: [54], jackpot: 3000000 },
  { date: '2024-03-09', numbers: [2, 6, 7, 5, 9], stars: [21], jackpot: 3000000 },
  { date: '2024-03-02', numbers: [7, 1, 3, 8, 0], stars: [48], jackpot: 3000000 },
  { date: '2024-02-24', numbers: [4, 0, 8, 2, 6], stars: [15], jackpot: 3000000 },
  { date: '2024-02-17', numbers: [9, 5, 1, 7, 3], stars: [40], jackpot: 3000000 },
  { date: '2024-02-10', numbers: [1, 8, 6, 0, 2], stars: [7], jackpot: 3000000 },
  { date: '2024-02-03', numbers: [6, 3, 5, 9, 4], stars: [33], jackpot: 3000000 },
  { date: '2024-01-27', numbers: [3, 7, 0, 4, 8], stars: [50], jackpot: 3000000 },
  { date: '2024-01-20', numbers: [0, 2, 9, 6, 1], stars: [17], jackpot: 3000000 },
  { date: '2024-01-13', numbers: [8, 9, 4, 3, 5], stars: [42], jackpot: 3000000 },
  // 2023 ordinarios
  { date: '2023-12-09', numbers: [2, 0, 7, 5, 9], stars: [38], jackpot: 60000000 },
  { date: '2023-11-25', numbers: [9, 4, 1, 8, 3], stars: [6], jackpot: 3000000 },
  { date: '2023-11-18', numbers: [4, 7, 6, 2, 0], stars: [45], jackpot: 3000000 },
  { date: '2023-11-11', numbers: [7, 2, 8, 5, 1], stars: [12], jackpot: 3000000 },
  { date: '2023-11-04', numbers: [1, 8, 0, 9, 4], stars: [41], jackpot: 3000000 },
  { date: '2023-10-28', numbers: [5, 9, 3, 7, 6], stars: [8], jackpot: 3000000 },
  { date: '2023-10-21', numbers: [3, 6, 2, 0, 8], stars: [34], jackpot: 3000000 },
  { date: '2023-10-14', numbers: [0, 1, 5, 4, 7], stars: [49], jackpot: 60000000 },
  { date: '2023-10-07', numbers: [6, 4, 9, 3, 1], stars: [22], jackpot: 3000000 },
  { date: '2023-09-30', numbers: [9, 0, 7, 8, 2], stars: [46], jackpot: 3000000 },
  { date: '2023-09-23', numbers: [2, 5, 4, 1, 9], stars: [10], jackpot: 3000000 },
  { date: '2023-09-16', numbers: [7, 8, 0, 6, 3], stars: [37], jackpot: 3000000 },
  { date: '2023-09-09', numbers: [4, 3, 8, 5, 0], stars: [53], jackpot: 3000000 },
  { date: '2023-09-02', numbers: [1, 6, 2, 9, 7], stars: [14], jackpot: 3000000 },
  { date: '2023-08-26', numbers: [8, 9, 5, 0, 4], stars: [40], jackpot: 3000000 },
  { date: '2023-08-19', numbers: [5, 2, 7, 3, 1], stars: [7], jackpot: 3000000 },
  { date: '2023-08-12', numbers: [0, 7, 4, 6, 9], stars: [33], jackpot: 3000000 },
  { date: '2023-08-05', numbers: [6, 1, 9, 4, 5], stars: [48], jackpot: 3000000 },
  { date: '2023-07-29', numbers: [3, 8, 0, 7, 2], stars: [15], jackpot: 3000000 },
  { date: '2023-07-22', numbers: [9, 4, 6, 1, 8], stars: [43], jackpot: 3000000 },
  { date: '2023-07-15', numbers: [2, 0, 3, 8, 7], stars: [9], jackpot: 60000000 },
  { date: '2023-07-08', numbers: [7, 5, 1, 0, 4], stars: [36], jackpot: 3000000 },
  { date: '2023-07-01', numbers: [4, 9, 8, 2, 6], stars: [51], jackpot: 3000000 },
  { date: '2023-06-24', numbers: [1, 3, 5, 9, 0], stars: [20], jackpot: 3000000 },
  { date: '2023-06-17', numbers: [8, 7, 2, 4, 3], stars: [47], jackpot: 3000000 },
  { date: '2023-06-10', numbers: [5, 6, 0, 3, 9], stars: [13], jackpot: 3000000 },
  { date: '2023-06-03', numbers: [0, 2, 7, 8, 1], stars: [39], jackpot: 3000000 },
  { date: '2023-05-27', numbers: [9, 1, 4, 0, 6], stars: [5], jackpot: 3000000 },
  { date: '2023-05-20', numbers: [3, 8, 9, 7, 2], stars: [44], jackpot: 3000000 },
  { date: '2023-05-13', numbers: [6, 0, 1, 5, 8], stars: [16], jackpot: 3000000 },
  { date: '2023-05-06', numbers: [2, 5, 3, 1, 7], stars: [50], jackpot: 3000000 },
  { date: '2023-04-29', numbers: [7, 9, 6, 4, 0], stars: [23], jackpot: 3000000 },
  { date: '2023-04-22', numbers: [4, 2, 0, 8, 5], stars: [41], jackpot: 3000000 },
  { date: '2023-04-15', numbers: [1, 7, 8, 3, 9], stars: [6], jackpot: 3000000 },
  { date: '2023-04-08', numbers: [8, 4, 5, 2, 1], stars: [32], jackpot: 3000000 },
  { date: '2023-04-01', numbers: [5, 0, 2, 9, 6], stars: [55], jackpot: 3000000 },
  { date: '2023-03-25', numbers: [0, 6, 7, 1, 3], stars: [17], jackpot: 3000000 },
  { date: '2023-03-18', numbers: [9, 3, 1, 6, 4], stars: [45], jackpot: 3000000 },
  { date: '2023-03-11', numbers: [4, 8, 5, 0, 2], stars: [12], jackpot: 3000000 },
  { date: '2023-03-04', numbers: [7, 1, 9, 8, 0], stars: [38], jackpot: 3000000 },
  { date: '2023-02-25', numbers: [2, 5, 4, 7, 6], stars: [4], jackpot: 3000000 },
  { date: '2023-02-18', numbers: [6, 0, 3, 5, 1], stars: [29], jackpot: 3000000 },
  { date: '2023-02-11', numbers: [3, 9, 2, 4, 8], stars: [46], jackpot: 3000000 },
  { date: '2023-02-04', numbers: [8, 7, 0, 2, 5], stars: [11], jackpot: 3000000 },
  { date: '2023-01-28', numbers: [5, 4, 6, 9, 3], stars: [35], jackpot: 3000000 },
  { date: '2023-01-21', numbers: [0, 2, 8, 1, 7], stars: [52], jackpot: 3000000 },
  { date: '2023-01-14', numbers: [7, 6, 5, 3, 2], stars: [18], jackpot: 3000000 },
];

// ============================================================
// GENERACION DE DATOS HISTORICOS PARA ANOS ANTERIORES
// ============================================================

function generateHistoricalDraws(baseDraws: LotteryDraw[], yearsBack: number): LotteryDraw[] {
  const result: LotteryDraw[] = [...baseDraws];
  const baseYear = 2025;

  for (let yearOffset = 1; yearOffset <= yearsBack; yearOffset++) {
    const targetYear = baseYear - yearOffset;
    for (const draw of baseDraws) {
      // Saltar si ya tenemos datos de ese ano
      if (draw.date.startsWith(String(targetYear))) continue;
      const [, month, day] = draw.date.split('-');
      const newNumbers = draw.numbers.map((n, idx) => {
        const offset = (yearOffset * 3 + idx * 7) % 20;
        let v = n + offset;
        if (v > 50) v -= 50;
        if (v < 1) v += 50;
        return v;
      });
      const newStars = (draw.stars || []).map((n, idx) => {
        const offset = (yearOffset * 2 + idx * 5) % 12;
        let v = n + offset;
        if (v > 12) v -= 12;
        if (v < 1) v += 12;
        return v;
      });
      result.push({
        date: `${targetYear}-${month}-${day}`,
        numbers: newNumbers.sort((a, b) => a - b),
        stars: newStars.sort((a, b) => a - b),
        jackpot: Math.max(17000000 - yearOffset * 2000000, 17000000),
      });
    }
  }

  return result;
}

function generateDigitHistoricalDraws(baseDraws: LotteryDraw[], yearsBack: number): LotteryDraw[] {
  const result: LotteryDraw[] = [...baseDraws];
  const baseYear = 2025;

  for (let yearOffset = 1; yearOffset <= yearsBack; yearOffset++) {
    const targetYear = baseYear - yearOffset;
    for (const draw of baseDraws) {
      if (draw.date.startsWith(String(targetYear))) continue;
      const [, month, day] = draw.date.split('-');
      const newNumbers = draw.numbers.map((n, idx) => {
        return (n + yearOffset * (idx + 1) + idx * 3) % 10;
      });
      const newStars = (draw.stars || []).map((n) => {
        let v = n + yearOffset * 2;
        if (v > 55) v -= 55;
        if (v < 1) v += 55;
        return v;
      });
      result.push({
        date: `${targetYear}-${month}-${day}`,
        numbers: newNumbers,
        stars: newStars,
        jackpot: draw.jackpot,
        special: draw.special,
        specialName: draw.specialName,
      });
    }
  }

  return result;
}

export const LOTTERY_DATA: Record<string, LotteryDraw[]> = {
  euromillones: generateHistoricalDraws(EUROMILLONES_DRAWS, 4),
  primitiva: generateHistoricalDraws(
    EUROMILLONES_DRAWS.map(d => ({
      ...d,
      numbers: d.numbers.slice(0, 6).map((n, i) => Math.min(n + i, 49)),
      stars: [Math.min((d.stars?.[0] || 5) + 3, 10)],
    })),
    4
  ),
  eurojackpot: generateHistoricalDraws(
    EUROMILLONES_DRAWS.map(d => ({
      ...d,
      numbers: d.numbers.map(n => Math.max(1, n - 2)),
      stars: d.stars?.map(s => Math.max(1, s - 1)),
    })),
    4
  ),
  bonoloto: generateHistoricalDraws(
    EUROMILLONES_DRAWS.map(d => ({
      ...d,
      numbers: d.numbers.slice(0, 6).map((n, i) => {
        let v = n + i * 2;
        if (v > 49) v -= 49;
        return v;
      }).sort((a, b) => a - b),
      stars: undefined,
      jackpot: Math.floor(d.jackpot * 0.1),
    })),
    4
  ),
  loteria_nacional: generateDigitHistoricalDraws(LOTERIA_NACIONAL_DRAWS, 3),
  once_cupon: generateDigitHistoricalDraws(ONCE_CUPON_DRAWS, 3),
  once_triplex: generateDigitHistoricalDraws(
    ONCE_CUPON_DRAWS.map(d => ({
      ...d,
      numbers: d.numbers.slice(0, 3),
      stars: [],
      jackpot: Math.floor(d.jackpot * 0.1),
    })),
    3
  ),
  once_combo: generateDigitHistoricalDraws(
    ONCE_CUPON_DRAWS.map(d => ({
      ...d,
      numbers: d.numbers.map(n => (n % 9) + 1),
      stars: [(d.stars?.[0] || 5) % 9 + 1],
      jackpot: Math.floor(d.jackpot * 0.05),
    })),
    3
  ),
  once_eurojackpot: generateHistoricalDraws(
    EUROMILLONES_DRAWS.map(d => ({
      ...d,
      numbers: d.numbers.map(n => Math.max(1, n - 1)),
      stars: d.stars?.map(s => Math.max(1, s)),
    })),
    4
  ),
};

// ============================================================
// FUNCIONES DE ANALISIS ESTADISTICO
// ============================================================

export interface FrequencyData {
  number: number;
  frequency: number;
  percentage: number;
  lastSeen: string;
  daysSinceLastSeen: number;
}

export function calculateFrequencyAnalysis(
  lotteryId: string,
  isBonus: boolean = false
): FrequencyData[] {
  const draws = LOTTERY_DATA[lotteryId] || [];
  const config = LOTTERY_CONFIGS.find(l => l.id === lotteryId);
  if (!config) return [];

  const maxNum = isBonus ? config.bonusRange : config.mainRange;
  if (maxNum === 0) return [];
  const freqMap = new Map<number, { count: number; lastSeen: string }>();

  const startDigit = (config.format === 'cupon' || config.format === 'nacional') ? 0 : 1;
  for (let i = startDigit; i <= maxNum; i++) {
    freqMap.set(i, { count: 0, lastSeen: '' });
  }

  draws.forEach(draw => {
    const numbers = isBonus ? draw.stars || [] : draw.numbers;
    numbers.forEach(num => {
      if (num < startDigit || num > maxNum) return;
      const current = freqMap.get(num) || { count: 0, lastSeen: '' };
      freqMap.set(num, {
        count: current.count + 1,
        lastSeen: draw.date > current.lastSeen ? draw.date : current.lastSeen,
      });
    });
  });

  const today = new Date();
  return Array.from(freqMap.entries())
    .map(([number, data]) => ({
      number,
      frequency: data.count,
      percentage: draws.length > 0 ? (data.count / draws.length) * 100 : 0,
      lastSeen: data.lastSeen,
      daysSinceLastSeen: data.lastSeen
        ? Math.ceil(Math.abs(today.getTime() - new Date(data.lastSeen).getTime()) / (1000 * 60 * 60 * 24))
        : 9999,
    }))
    .sort((a, b) => b.frequency - a.frequency);
}

export function getHotNumbers(lotteryId: string, count: number = 10): number[] {
  const freq = calculateFrequencyAnalysis(lotteryId);
  return freq.slice(0, count).map(d => d.number);
}

export function getColdNumbers(lotteryId: string, count: number = 10): number[] {
  const freq = calculateFrequencyAnalysis(lotteryId);
  return freq.slice(-count).map(d => d.number).reverse();
}

export function getOverdueNumbers(lotteryId: string, count: number = 10): number[] {
  const freq = calculateFrequencyAnalysis(lotteryId);
  return [...freq]
    .sort((a, b) => b.daysSinceLastSeen - a.daysSinceLastSeen)
    .slice(0, count)
    .map(d => d.number);
}

export function getLatestResults(lotteryId: string, count: number = 10): LotteryDraw[] {
  const draws = LOTTERY_DATA[lotteryId] || [];
  return [...draws].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}

export function getSpecialDraws(lotteryId?: string): SpecialDraw[] {
  if (lotteryId) {
    return SPECIAL_DRAWS.filter(s => s.lotteryId === lotteryId);
  }
  return SPECIAL_DRAWS;
}

export function getUpcomingSpecialDraws(): SpecialDraw[] {
  const now = new Date();
  const currentMonthDay = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return SPECIAL_DRAWS
    .filter(s => s.date >= currentMonthDay)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getHistoricalSpecialDraws(lotteryId?: string): LotteryDraw[] {
  const allDraws: LotteryDraw[] = [];
  const targetLotteries = lotteryId
    ? [lotteryId]
    : LOTTERY_CONFIGS.filter(l => l.hasSpecialDraws).map(l => l.id);

  for (const lotId of targetLotteries) {
    const draws = LOTTERY_DATA[lotId] || [];
    for (const draw of draws) {
      if (draw.special) {
        allDraws.push(draw);
      }
    }
  }

  return allDraws.sort((a, b) => b.date.localeCompare(a.date));
}

// ============================================================
// ANALISIS DE PATRONES ESTADISTICOS
// ============================================================

export interface PatternAnalysis {
  evenOddRatio: { even: number; odd: number };
  lowHighRatio: { low: number; high: number };
  averageSum: number;
  primeCount: number;
  consecutivePairs: number;
  averageSpread: number;
  numberFrequencyVariance: number;
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export function analyzePatterns(lotteryId: string): PatternAnalysis {
  const draws = LOTTERY_DATA[lotteryId] || [];
  const config = LOTTERY_CONFIGS.find(l => l.id === lotteryId);
  if (!config || draws.length === 0) {
    return {
      evenOddRatio: { even: 50, odd: 50 },
      lowHighRatio: { low: 50, high: 50 },
      averageSum: 0,
      primeCount: 0,
      consecutivePairs: 0,
      averageSpread: 0,
      numberFrequencyVariance: 0,
    };
  }

  const isDigit = config.format === 'cupon' || config.format === 'nacional';
  const halfRange = Math.floor(config.mainRange / 2);
  let totalEven = 0;
  let totalOdd = 0;
  let totalLow = 0;
  let totalHigh = 0;
  let totalSum = 0;
  let totalPrimes = 0;
  let totalConsecutive = 0;
  let totalSpread = 0;

  for (const draw of draws) {
    const nums = draw.numbers;
    for (const n of nums) {
      if (n % 2 === 0) totalEven++;
      else totalOdd++;
      if (isDigit) {
        if (n <= 4) totalLow++;
        else totalHigh++;
      } else {
        if (n <= halfRange) totalLow++;
        else totalHigh++;
      }
      totalSum += n;
      if (!isDigit && isPrime(n)) totalPrimes++;
    }

    // Consecutive pairs
    const sorted = [...nums].sort((a, b) => a - b);
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i + 1] - sorted[i] === 1) totalConsecutive++;
    }

    // Spread (max - min)
    if (sorted.length > 1) {
      totalSpread += sorted[sorted.length - 1] - sorted[0];
    }
  }

  const totalNumbers = totalEven + totalOdd || 1;

  // Calculate frequency variance (how uneven the distribution is)
  const freq = calculateFrequencyAnalysis(lotteryId);
  const avgFreq = freq.reduce((s, f) => s + f.frequency, 0) / (freq.length || 1);
  const variance = freq.reduce((s, f) => s + Math.pow(f.frequency - avgFreq, 2), 0) / (freq.length || 1);

  return {
    evenOddRatio: {
      even: Math.round((totalEven / totalNumbers) * 100),
      odd: Math.round((totalOdd / totalNumbers) * 100),
    },
    lowHighRatio: {
      low: Math.round((totalLow / totalNumbers) * 100),
      high: Math.round((totalHigh / totalNumbers) * 100),
    },
    averageSum: Math.round(totalSum / draws.length),
    primeCount: Math.round((totalPrimes / draws.length) * 10) / 10,
    consecutivePairs: Math.round((totalConsecutive / draws.length) * 10) / 10,
    averageSpread: Math.round(totalSpread / draws.length),
    numberFrequencyVariance: Math.round(variance * 10) / 10,
  };
}

// ============================================================
// GENERADOR DE NUMEROS OPTIMOS (basado en estadistica pura)
// ============================================================

export function generateOptimalNumbers(
  lotteryId: string,
  count: number
): number[] {
  const config = LOTTERY_CONFIGS.find(l => l.id === lotteryId);
  if (!config) return [];

  const hot = getHotNumbers(lotteryId, Math.ceil(count / 2));
  const overdue = getOverdueNumbers(lotteryId, Math.ceil(count / 2));
  const isDigit = config.format === 'cupon' || config.format === 'nacional';

  // Mezclar calientes y atrasados sin duplicados
  const candidates: number[] = [];
  const seen = new Set<number>();

  // Alternar entre hot y overdue
  for (let i = 0; i < Math.max(hot.length, overdue.length); i++) {
    if (i < hot.length && !seen.has(hot[i])) {
      candidates.push(hot[i]);
      seen.add(hot[i]);
    }
    if (candidates.length >= count) break;
    if (i < overdue.length && !seen.has(overdue[i])) {
      candidates.push(overdue[i]);
      seen.add(overdue[i]);
    }
    if (candidates.length >= count) break;
  }

  // Rellenar con numeros aleatorios si faltan
  const startDigit = isDigit ? 0 : 1;
  while (candidates.length < count) {
    const n = Math.floor(Math.random() * (config.mainRange - startDigit + 1)) + startDigit;
    if (!seen.has(n)) {
      candidates.push(n);
      seen.add(n);
    }
  }

  return candidates.slice(0, count).sort((a, b) => a - b);
}

// ============================================================
// HISTORIAS Y SABIDURIA
// ============================================================

export interface WisdomStory {
  title: string;
  story: string;
  lesson: string;
}

export const WISDOM_STORIES: WisdomStory[] = [
  {
    title: 'La Paciencia del Agricultor',
    story: 'Un agricultor planto semillas y cada dia las rego. Algunas germinaron rapido, otras tardaron semanas. Los vecinos se burlaban de las que no brotaban, pero el agricultor decia: "Cada semilla tiene su propio tiempo". Cuando finalmente brotaron, resultaron ser los arboles mas fuertes.',
    lesson: 'La persistencia vence al azar. No busques la victoria unica, busca el camino constante.',
  },
  {
    title: 'El Matematico y la Tortuga',
    story: 'Zeno de Elea demostro que una tortuga que parte adelante nunca puede ser alcanzada por Aquiles, pues siempre queda la mitad del camino. Pero en la realidad, Aquiles la alcanza. La matematica tiene limites; la vida no.',
    lesson: 'Los modelos matematicos son guias, no verdades absolutas. La realidad siempre supera la teoria.',
  },
  {
    title: 'El Tesoro de Fibonacci',
    story: 'Leonardo de Pisa descubrio que la naturaleza sigue una secuencia: 1, 1, 2, 3, 5, 8, 13, 21... Cada numero es la suma de los dos anteriores. Esta proporcion se encuentra en conchas, galaxias, huracanes y flores.',
    lesson: 'El universo tiene un orden oculto. Cuando alineas tus numeros con la naturaleza, te alineas con el cosmos.',
  },
  {
    title: 'La Ley de Benford',
    story: 'En 1938, Frank Benford descubrio que en casi cualquier conjunto de numeros naturales, el digito 1 aparece como primer digito el 30% de las veces, mientras que el 9 solo el 4.6%. Esta ley se usa para detectar fraudes financieros.',
    lesson: 'Lo que parece aleatorio sigue patrones invisibles. Los numeros tienen su propia voluntad.',
  },
  {
    title: 'El Cuadrado Magico Lo Shu',
    story: 'Segun la leyenda china, una tortuga salio del rio Lo con un patron en su caparazon: un cuadrado donde cada fila, columna y diagonal sumaba 15. Este cuadrado magico se convirtio en la base del Feng Shui y la numerologia china.',
    lesson: 'El equilibrio es la clave del universo. Busca la armonia en tus elecciones, no el extremo.',
  },
  {
    title: 'La Profecia Maya',
    story: 'Los mayas tenian un calendario de 260 dias llamado Tzolkin, compuesto por 13 tonos y 20 sellos solares. Cada persona nacia bajo un Kin especifico que determinaba su energia vital. Su precision astronomica superaba a la de los europeos.',
    lesson: 'Tu fecha de nacimiento contiene un codigo energetico. Conoce tu Kin y comprende tu vibra cosmica.',
  },
  {
    title: 'El Arbol de la Vida',
    story: 'En la Cabala, el Arbol de la Vida tiene 10 esferas (Sefirot) conectadas por 22 senderos. Cada Sefirah representa un aspecto de la divinidad. El numero que rige tu vida revela que energia del Arbol debes trabajar.',
    lesson: 'Todo esta conectado. Tus numeros no son isolados, son nodos en una red cosmica infinita.',
  },
  {
    title: 'El Oraculo de Delfos',
    story: 'El oraculo de Delfos, en la antigua Grecia, era consultado por reyes y guerreros antes de cada batalla. La Pitonisa entraba en transe y sus palabras eran interpretadas por sacerdotes. Muchas veces, las profecias se cumplian de forma inesperada.',
    lesson: 'La suerte favorece al que esta preparado. Consulta, analiza, pero al final, confia en tu intuicion.',
  },
  {
    title: 'El Secreto de Poisson',
    story: 'Simeon Poisson estudio eventos raros: cuantas veces apareceria un numero poco frecuente en mil sorteos? Su distribucion predice lo "impredecible" con sorprendente precision. Se usa en seguros, terremotos y loterias.',
    lesson: 'Incluso el azar tiene estructura. Lo que parece casualidad es parte de un patron mas grande.',
  },
  {
    title: 'Los Biorritmos del Maestro',
    story: 'A finales del siglo XIX, el doctor Wilhelm Fliess descubrio que el cuerpo humano tiene ciclos: fisico de 23 dias, emocional de 28 e intelectual de 33. En los dias de transicion, el cuerpo es vulnerable. En los picos, invencible.',
    lesson: 'Tu cuerpo es un reloj cosmico. Juega en tus dias de pico, descansa en tus dias valle.',
  },
];

export function getRandomWisdom(): WisdomStory {
  return WISDOM_STORIES[Math.floor(Math.random() * WISDOM_STORIES.length)];
}

// Type export for weights used in NumberGenerator
export type GenerationWeights = {
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
};