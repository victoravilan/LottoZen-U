# LottoZen Ultra v2.0

Aplicacion de numerologia predictiva y analisis de loterias europeas.

## Descripcion

LottoZen Ultra combina analisis estadistico de datos historicos de loterias europeas (ultimos 7 anos) con calculos numerologicos personalizados (fecha de nacimiento, nombre completo, lugar de nacimiento) para generar numeros de la suerte sugeridos.

**Importante**: Esta aplicacion es de entretenimiento. Las loterias son juegos de azar. No existe metodo garantizado para ganar. Juega con responsabilidad.

## Caracteristicas

### Motor Numerologico
- Numero de Vida (Life Path) basado en fecha de nacimiento
- Numero de Expresion basado en nombre completo (tabla Pitagorica)
- Numero del Alma (vocales)
- Numero de Personalidad (consonantes)
- Numero de Cumpleanos
- Numero del Destino (fecha de consulta)
- Numero del Lugar de nacimiento
- Numero de la Suerte personal
- Soporte para numeros maestros (11, 22, 33)

### Analisis de Loteria
- 4 loterias europeas: Euromillones, La Primitiva, Eurojackpot, Bonoloto
- Datos historicos de 7 anos (2019-2025)
- Analisis de frecuencia de cada numero
- Numeros calientes (mas frecuentes)
- Numeros frios (menos frecuentes)
- Numeros atrasados (mas dias sin salir)
- Analisis de patrones: par/impar, bajos/altos, primos, suma promedio, consecutivos
- Historial de resultados recientes

### Algoritmo de Generacion
- Sistema de puntuacion ponderado
- Configurable: numerologia, frecuentes, infrecuentes, atrasados, aleatoriedad
- Generacion con semilla determinista basada en datos del usuario
- Explicacion de cada numero generado (fuente y razon)

### Diseno
- Tema cosmico: purpura profundo + dorado
- Campo de estrellas animado
- Tipografia Cinzel (display) + Inter (texto)
- Animaciones suaves y efectos de brillo
- Totalmente responsive
- Navegacion inferior tipo app movil
- Bolas de numeros con gradientes

### Juego Responsable
- Mensajes de sabiduria rotativos
- Historias sobre ganadores de loteria
- Probabilidades reales mostradas
- Enlaces a organizaciones de ayuda
- Datos almacenados localmente (privacidad)

## Estructura del Proyecto

```
LottoZen-Ultra/
├── public/                  # Assets estaticos
│   ├── manifest.json        # PWA manifest
│   ├── sw.js                # Service worker
│   ├── favicon.svg          # Icono SVG
│   ├── icon-192.png         # Icono PWA 192px
│   └── icon-512.png         # Icono PWA 512px
├── src/
│   ├── components/
│   │   ├── StarField.tsx       # Fondo cosmico animado
│   │   ├── Navigation.tsx      # Navegacion inferior
│   │   ├── Dashboard.tsx       # Pantalla principal
│   │   ├── NumberGenerator.tsx # Generador de numeros
│   │   ├── LotteryAnalysis.tsx # Analisis estadistico
│   │   ├── UserProfile.tsx     # Perfil numerologico
│   │   └── NumberBall.tsx      # Componente de bola de numero
│   ├── lib/
│   │   ├── numerology.ts       # Motor numerologico
│   │   ├── lotteryData.ts      # Datos y analisis de loteria
│   │   └── storage.ts          # Almacenamiento local
│   ├── App.tsx                 # Componente principal
│   └── main.tsx                # Entry point
├── android/                    # Proyecto Android nativo
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/lottozen/ultra/
│   │   │   │   └── MainActivity.java
│   │   │   ├── res/            # Recursos Android
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle
│   ├── build.gradle
│   ├── settings.gradle
│   └── gradle.properties
├── capacitor.config.json      # Configuracion Capacitor
├── index.html                 # HTML entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Instalacion y Desarrollo

### Requisitos
- Node.js 18+
- npm o pnpm

### PWA (Web)
```bash
npm install
npm run dev      # Desarrollo en http://localhost:3000
npm run build    # Build de produccion a /dist
npm run preview  # Preview del build
```

### Android (Google Play Store)

#### Opcion 1: WebView Nativo (recomendado)

El proyecto Android ya esta configurado como una WebView app que carga la PWA:

1. Build la PWA:
```bash
npm run build
```

2. Copiar el contenido de `dist/` a `android/app/src/main/assets/`

3. Abrir el proyecto Android en Android Studio:
```bash
cd android
# Abrir Android Studio y seleccionar esta carpeta
```

4. Build y firmar el APK:
```bash
./gradlew assembleRelease
```

5. El APK estara en `android/app/build/outputs/apk/release/`

#### Opcion 2: Capacitor (alternativa)

```bash
npm install @capacitor/core @capacitor/android
npm run build
npx cap add android
npx cap copy
npx cap open android
```

## Publicacion en Google Play Store

1. Crear cuenta de Google Play Console ($25 USD)
2. Generar APK/AAB firmado:
```bash
keytool -genkey -v -keystore lottozen.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias lottozen
./gradlew bundleRelease
```
3. Subir el `.aab` a Google Play Console
4. Completar ficha de la tienda:
   - Categoria: Entretenimiento
   - Descripcion: Numerologia y analisis de loteria
   - Politica de privacidad requerida
   - Incluir disclaimer de juego responsable

### Notas para Google Play
- La app debe cumplir con las politicas de contenido
- NO prometer ganancias de loteria (violacion de politicas)
- Incluir disclaimer claro de entretenimiento
- Edad minima: 18+
- La ficha debe mencionar "entretenimiento" y "juego responsable"

## Tecnologias

- **Frontend**: React 18 + TypeScript
- **Build**: Vite 5
- **PWA**: Manifest + Service Worker + Offline support
- **Android**: WebView nativo (Java) + Gradle
- **Datos**: Dataset embebido (sin backend requerido)
- **Privacidad**: localStorage (datos en dispositivo)

## Licencia y Disclaimer

Esta aplicacion es para fines de entretenimiento unicamente. Las loterias son juegos de azar y no existe metodo alguno que garantice ganancias. Los numeros generados son personalizados pero no predicen resultados. Juega siempre con responsabilidad y solo con dinero que puedas permitirte perder.

Si sientes que puedes tener un problema con el juego, busca ayuda:
- Espana: jugarbien.es
- Internacional: begambleaware.org
