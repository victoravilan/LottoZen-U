// Perfil de usuario ampliado con datos astrologicos completos

export interface UserProfile {
  fullName: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM (hora de nacimiento)
  birthPlace: string;
  region: string; // zona geografica/region
  preferredLottery: string;
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
  };
}

const STORAGE_KEY = 'lottozen_profile_v3';

export const DEFAULT_WEIGHTS: UserProfile['weights'] = {
  numerology: 25,
  astrology: 15,
  maya: 10,
  fibonacci: 8,
  benford: 7,
  poisson: 10,
  hotNumbers: 8,
  coldNumbers: 5,
  overdue: 5,
  biorhythm: 4,
  randomness: 3,
};

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function getUserProfile(): UserProfile | null {
  // Intentar clave nueva
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    // Migrar de clave anterior
    data = localStorage.getItem('lottozen_profile');
  }
  if (!data) return null;
  try {
    const parsed = JSON.parse(data);
    // Migrar pesos si faltan
    if (!parsed.weights) parsed.weights = DEFAULT_WEIGHTS;
    else {
      const w = { ...DEFAULT_WEIGHTS, ...parsed.weights };
      parsed.weights = w;
    }
    if (!parsed.birthTime) parsed.birthTime = '12:00';
    if (!parsed.region) parsed.region = '';
    return parsed as UserProfile;
  } catch {
    return null;
  }
}

export function clearProfile(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('lottozen_profile');
}
