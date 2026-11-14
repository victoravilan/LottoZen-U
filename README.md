# LottoZen Ultra v2.1.0

## App Predictiva de Numerologia Cuantica y Analisis de Loteria

### Descripcion
LottoZen Ultra combina 18 sistemas de analisis (13 cosmicos + 5 cuanticos) para generar
sugerencias de numeros personalizados segun el perfil astrologico y numerologico del usuario.

### Sistemas Integrados (18 total)
**Cosmicos (13):** Pitagorica, Caldea, Astrologia, Maya, Cabala, Lo Shu, Biorritmos,
Fibonacci, Numero Aureo, Ley de Benford, Poisson, Analisis Historico, Ano Personal.

**Cuanticos (5):** Superposicion, Entrelazamiento, Tiempo en Espiral (Penrose CCC + I Ching),
Realidades Alternativas (Everett), Resonancia Schumann.

### Loterias Soportadas (9)
Euromillones, Primitiva, Bonoloto, El Gordo, ONCE Cupon, ONCE Triplex,
Loteria Nacional, ONCE Super Once, Euromillon Dream.

### Compilar para Google Play Store

```bash
# 1. Build web assets
npm run build

# 2. Sync to Android assets
npm run android:sync

# 3. Generate AAB (App Bundle) for Play Store
cd android
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### Requisitos
- Android Studio Hedgehog (2023.1) o superior
- JDK 17
- Android SDK 35 (compileSdk)
- Gradle 8.7
- minSdk 24 (Android 7.0)

### Importante
Esta aplicacion es SOLO para entretenimiento. Las loterias son juegos de azar.
No existe metodo garantizado para ganar. Juega con responsabilidad.
Edad minima: 18+.

---
Creado y diseñado por: Victor M.F. Avilan
(c) Todos los derechos reservados
