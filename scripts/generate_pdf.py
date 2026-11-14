"""
Generates a comprehensive PDF document summarizing the entire LottoZen Ultra
development conversation, including all features, systems, and concepts.
"""

from fpdf import FPDF
import os

class LottoZenPDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 8, "LottoZen Ultra - Documento de Desarrollo", border=False, align="R")
        self.ln(5)
        self.set_draw_color(200, 200, 200)
        self.line(10, 18, 200, 18)
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f"Pagina {self.page_no()}", border=False, align="C")


def create_pdf():
    pdf = LottoZenPDF()
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()

    # ===== COVER PAGE =====
    pdf.ln(40)
    pdf.set_font("Helvetica", "B", 28)
    pdf.set_text_color(139, 69, 19)  # Golden brown
    pdf.cell(0, 15, "LottoZen Ultra", align="C")
    pdf.ln(18)
    pdf.set_font("Helvetica", "", 14)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 8, "App Predictiva de Numerologia Cuantica", align="C")
    pdf.ln(10)
    pdf.cell(0, 8, "y Analisis de Loteria", align="C")
    pdf.ln(25)

    pdf.set_draw_color(139, 69, 19)
    pdf.set_line_width(0.5)
    pdf.line(60, pdf.get_y(), 150, pdf.get_y())
    pdf.ln(15)

    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 8, "Documento de Desarrollo Completo", align="C")
    pdf.ln(8)
    pdf.cell(0, 8, "Version 2.0.0", align="C")
    pdf.ln(20)

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(60, 60, 60)
    pdf.cell(0, 7, "Creado y diseñado por:", align="C")
    pdf.ln(8)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(139, 69, 19)
    pdf.cell(0, 8, "Victor M.F. Avilan", align="C")
    pdf.ln(6)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(128, 128, 128)
    pdf.cell(0, 6, "(c) Todos los derechos reservados", align="C")
    pdf.ln(15)

    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 6, "Fecha: 14 de Noviembre 2026", align="C")
    pdf.ln(6)
    pdf.cell(0, 6, "Repositorio: https://github.com/victoravilan/LottoZen-U.git", align="C")

    # ===== TABLE OF CONTENTS =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "Indice")
    pdf.ln(15)
    pdf.set_line_width(0.3)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(10)

    toc_items = [
        "1. Resumen del Proyecto",
        "2. Arquitectura y Estructura de la App",
        "3. Sistemas Cosmicos (13 sistemas originales)",
        "4. Motor Cuantico Predictivo (5 sistemas nuevos)",
        "5. Optimizador Estrategico de Juego",
        "6. Bug Critico: Generacion de Numeros",
        "7. Loterias Soportadas",
        "8. Conceptos Cuanticos Integrados",
        "9. Tecnologias Utilizadas",
        "10. Historias Educativas (Sabiduria)",
        "11. Pie de Pagina",
        "12. Conclusion y Vision",
    ]
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(60, 60, 60)
    for item in toc_items:
        pdf.cell(0, 9, f"  {item}")
        pdf.ln(9)

    # ===== 1. RESUMEN =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "1. Resumen del Proyecto")
    pdf.ln(12)
    pdf.set_line_width(0.3)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    resumen = [
        "LottoZen Ultra es una aplicacion web progresiva (PWA) y movil Android que combina",
        "mas de 18 sistemas de analisis numerologico, astrologico, matematico y cuantico para",
        "generar sugerencias de numeros de loteria personalizados segun el perfil de cada usuario.",
        "",
        "La app fue desarrollada a lo largo de multiples sesiones de trabajo, evolucionando desde",
        "una herramienta basica de numerologia hasta un sistema predictivo avanzado que integra:",
        "",
        "  - 13 sistemas cosmicos tradicionales (numerologia pitagorica, caldea, astrologia,",
        "    calendario maya, cabala, Lo Shu, biorritmos, Fibonacci, numero aureo, ley de Benford,",
        "    distribucion de Poisson, analisis historico y ano personal)",
        "",
        "  - 5 sistemas cuanticos avanzados (superposicion cuantica, entrelazamiento numerologico,",
        "    tiempo en espiral, realidades alternativas y resonancia Schumann)",
        "",
        "  - Optimizador estrategico de juego basado en biorritmos de 4 ciclos",
        "",
        "  - Soporte para 9 loterias diferentes con formatos distintos",
        "",
        "El proyecto esta desplegado en Netlify, sincronizado con GitHub, y configurado como",
        "aplicacion nativa Android via Capacitor.",
    ]
    for line in resumen:
        pdf.cell(0, 6, line)
        pdf.ln(6)

    # ===== 2. ARQUITECTURA =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "2. Arquitectura y Estructura")
    pdf.ln(12)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 8, "Estructura de Archivos")
    pdf.ln(10)

    pdf.set_font("Courier", "", 9)
    pdf.set_text_color(50, 50, 50)
    structure = [
        "LottoZen-Ultra/",
        "|-- index.html",
        "|-- package.json          (v2.0.0 - React 18 + Vite 5)",
        "|-- vite.config.ts",
        "|-- tsconfig.json",
        "|-- capacitor.config.json  (Android native wrapper)",
        "|-- netlify.toml           (Deploy config)",
        "|-- .gitignore",
        "|-- README.md",
        "|",
        "|-- public/",
        "|   |-- favicon.svg",
        "|   |-- icon-192.png",
        "|   |-- icon-512.png",
        "|   |-- landing.html",
        "|   |-- logo.svg",
        "|   |-- manifest.json      (PWA manifest)",
        "|   |-- sw.js               (Service Worker)",
        "|",
        "|-- src/",
        "    |-- main.tsx           (Entry point)",
        "    |-- App.tsx            (Main app + router + footer)",
        "    |",
        "    |-- components/",
        "    |   |-- Dashboard.tsx",
        "    |   |-- LotteryAnalysis.tsx",
        "    |   |-- Navigation.tsx",
        "    |   |-- NumberBall.tsx",
        "    |   |-- NumberGenerator.tsx",
        "    |   |-- PlayOptimizer.tsx",
        "    |   |-- StarField.tsx",
        "    |   |-- UserProfile.tsx",
        "    |",
        "    |-- lib/",
        "    |   |-- cosmicEngine.ts     (13 sistemas cosmicos)",
        "    |   |-- quantumEngine.ts    (5 sistemas cuanticos)",
        "    |   |-- playOptimizer.ts    (Biorritmos + estrategia)",
        "    |   |-- lotteryData.ts      (9 loterias + historias)",
        "    |   |-- numerology.ts       (Calculos numerologicos)",
        "    |   |-- storage.ts          (Persistencia local)",
        "    |",
        "    |-- hooks/",
        "        (Custom React hooks)",
    ]
    for line in structure:
        pdf.cell(0, 5, line)
        pdf.ln(5)

    # ===== 3. SISTEMAS COSMICOS =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "3. Sistemas Cosmicos (13 originales)")
    pdf.ln(12)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    sistemas = [
        ("1. Numerologia Pitagorica", "Reduccion de fecha de nacimiento a numero de vida (1-9)."),
        ("2. Numerologia Caldea", "Sistema caldeo para letras-numeros alternativo."),
        ("3. Astrologia", "Signo zodiacal, numeros de suerte planetarios y elementos."),
        ("4. Calendario Maya", "Kin maya, Tzolkin (260 dias), numeros galacticos."),
        ("5. Cabala (Kabbalah)", "Arbol sefiroditico, letras hebreas y caminos."),
        ("6. Lo Shu (Cuadrado Magico)", "Cuadrado magico chino 3x3, direccion bagua."),
        ("7. Biorritmos", "4 ciclos: fisico(23d), emocional(28d), intelectual(33d), intuitivo(38d)."),
        ("8. Secuencia Fibonacci", "Proporcion aurea aplicada a seleccion numerica."),
        ("9. Numero Aureo (Phi)", "Razon dorada 1.618 en mapeo de numeros."),
        ("10. Ley de Benford", "Distribucion logaritmica del primer digito significativo."),
        ("11. Distribucion de Poisson", "Eventos raros y frecuencia esperada de aparicion."),
        ("12. Analisis Historico", "Frecuencias pasadas, numeros calientes/frios/retrasados."),
        ("13. Ano Personal", "Ciclos de 9 anos segun numerologia del destino."),
    ]
    for title, desc in sistemas:
        pdf.set_font("Helvetica", "B", 11)
        pdf.set_text_color(80, 50, 20)
        pdf.cell(0, 7, title)
        pdf.ln(7)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(70, 70, 70)
        pdf.multi_cell(0, 5, f"     {desc}")
        pdf.ln(2)

    # ===== 4. MOTOR CUANTICO =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "4. Motor Cuantico Predictivo")
    pdf.ln(12)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 6,
        "El motor cuantico (quantumEngine.ts) es una capa avanzada que procesa los candidatos "
        "del motor cosmico usando principios de la fisica cuantica moderna. Se inspiran en las "
        "teorias de Jean-Paul Garnier sobre realidades alternativas, la Cosmologia Ciclica "
        "Conforme de Roger Penrose, y la interpretacion de Muchos Mundos de Hugh Everett.")
    pdf.ln(6)

    cuanticos = [
        ("Superposicion Cuantica",
         "Cada numero existe en superposicion con una amplitud de probabilidad que puede ser "
         "negativa (interferencia destructiva), algo imposible en probabilidad clasica. "
         "La generacion colapsa la funcion de onda como una observacion cuantica real."),
        ("Entrelazamiento Numerologico",
         "Numeros vinculados por afinidad vibratoria (misma reduccion numerologica, "
         "complementarios, espejos como 12 y 21, diferencias de Fibonacci) se entrelazan: "
         "cuando uno es seleccionado, los entrelazados cambian su probabilidad."),
        ("Tiempo en Espiral",
         "Combina la Cosmologia Ciclica Conforme de Penrose (Nobel 2020) con los 64 "
         "hexagramas del I Ching. Cada momento temporal tiene un hexagrama activo que "
         "influye en los numeros, y los patrones se repiten en espiral."),
        ("Realidades Alternativas",
         "Inspirado en la interpretacion de Muchos Mundos de Everett: cada generacion "
         "explora 5 realidades paralelas con fases diferentes. La realidad con mayor "
         "coherencia cosmica se manifiesta."),
        ("Resonancia Schumann",
         "El latido del planeta - la frecuencia de resonancia natural Tierra-ionosfera "
         "(7.83 Hz) - modula las amplitudes cuanticas. Las 5 frecuencias fundamentales "
         "crean ondas de modulacion sobre las probabilidades."),
        ("Coherencia Cuantica",
         "Cuando multiples sistemas cosmicos coinciden en un numero, se produce "
         "amplificacion coherente (efecto laser cuantico). La interfaz muestra un "
         "medidor de coherencia con codigo de color."),
    ]
    for title, desc in cuanticos:
        pdf.set_font("Helvetica", "B", 12)
        pdf.set_text_color(50, 30, 80)
        pdf.cell(0, 7, title)
        pdf.ln(7)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(70, 70, 70)
        pdf.multi_cell(0, 5, f"     {desc}")
        pdf.ln(3)

    # ===== 5. OPTIMIZADOR ESTRATEGICO =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "5. Optimizador Estrategico de Juego")
    pdf.ln(12)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    estrategia = [
        "El Optimizador Estrategico (playOptimizer.ts + PlayOptimizer.tsx) analiza los 4 ciclos",
        "de biorritmo del usuario durante 30 dias para recomendar:",
        "",
        "  - CUANDO jugar: dias especificos con mayor energia combinada",
        "  - COMO jugar: estrategia conservadora, equilibrada o agresiva",
        "  - CUAL loteria jugar: segun elemento zodiacal y ciclo personal",
        "  - DONDE concentrar esfuerzos: loteria recomendada principal",
        "",
        "Biorritmos analizados:",
        "  - Ciclo Fisico (23 dias): energia vital, resistencia",
        "  - Ciclo Emocional (28 dias): intuicion, sensibilidad",
        "  - Ciclo Intelectual (33 dias): claridad mental, logica",
        "  - Ciclo Intuitivo (38 dias): percepcion extrasensorial",
        "",
        "Mapeo zodiacal por elemento:",
        "  - Fuego (Aries, Leo, Sagitario) -> Euromillones",
        "  - Tierra (Tauro, Virgo, Capricornio) -> Primitiva",
        "  - Aire (Geminis, Libra, Acuario) -> ONCE",
        "  - Agua (Cancer, Escorpio, Piscis) -> Nacional",
        "",
        "Ciclos de ano personal:",
        "  - Anos 1, 8 -> Jackpots grandes (Euromillones, Primitiva)",
        "  - Anos 3, 5 -> ONCE",
        "  - Ano 7 -> Nacional",
        "  - Ano 9 -> Bonoloto",
        "",
        "La interfaz muestra un calendario interactivo de 30 dias con codigo de color,",
        "ranking de los 5 mejores dias, y cuenta regresiva de sorteos especiales.",
    ]
    for line in estrategia:
        pdf.cell(0, 5.5, line)
        pdf.ln(5.5)

    # ===== 6. BUG CRITICO =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "6. Bug Critico: Generacion de Numeros")
    pdf.ln(12)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 6,
        "Se detecto un bug critico: la app siempre generaba los mismos numeros (12356) "
        "independientemente de los datos del usuario. Se diagnosticaron 7 causas raiz:")
    pdf.ln(4)

    bugs = [
        "1. PRNG debil: LCG (Linear Congruential Generator) con semilla casi constante",
        "   - Solo usaba los ultimos 4 digitos del timestamp",
        "   - Solucion: crypto.getRandomValues() + xorshift32",
        "",
        "2. Numeros numerologicos (1-9) dominantes en rangos 1-50",
        "   - Los numeros base siempre ganaban por peso",
        "   - Solucion: addExpandedSources() expande 1-9 a rango completo",
        "",
        "3. Seleccion determinista top-N",
        "   - Siempre tomaba los N con mayor puntaje",
        "   - Solucion: weightedSampleWithoutReplacement() estocastico",
        "",
        "4. Entropia de semilla insuficiente",
        "   - Date.now().slice(-4) = solo 4 digitos",
        "   - Solucion: timestamp completo + random de 5 digitos mod 2^31",
        "",
        "5. Poisson daba misma probabilidad a todos los numeros",
        "   - Solucion: probabilidades diferenciadas por numero con factor isDigit",
        "",
        "6. Seleccion de bonus determinista",
        "   - Solucion: muestreo ponderado estocastico tambien para bonus",
        "",
        "7. Gematria no reducia a 1-9 antes de mapear",
        "   - Solucion: analysis.gematria % 9 || 9",
    ]
    pdf.set_font("Helvetica", "", 10)
    for line in bugs:
        if line.strip():
            pdf.cell(0, 5, line)
        pdf.ln(5)

    # ===== 7. LOTERIAS =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "7. Loterias Soportadas")
    pdf.ln(12)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    loterias = [
        ("Euromillones", "5 numeros (1-50) + 2 estrellas (1-12)", "Martes y Viernes"),
        ("La Primitiva", "6 numeros (1-49) + reintegro (0-9)", "Jueves y Sabado"),
        ("Bonoloto", "6 numeros (1-49) + reintegro (0-9)", "Lunes a Sabado"),
        ("El Gordo", "5 numeros (1-54) + numero clave (0-9)", "Domingo"),
        ("ONCE Cupon", "5 digitos (0-9) + serie", "Diario"),
        ("ONCE Triplex", "3 digitos (0-9), sin bonus", "Lunes a Sabado"),
        ("Loteria Nacional", "5 digitos (0-9) + serie", "Jueves y Sabado"),
        ("ONCE Super Once", "5 numeros (1-80)", "Multiple diario"),
        ("Euromillon Dream", "5 numeros (1-50) + 2 estrellas (1-12)", "Especial"),
    ]
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(50, 7, "Loteria")
    pdf.cell(80, 7, "Formato")
    pdf.cell(0, 7, "Frecuencia")
    pdf.ln(7)
    pdf.set_draw_color(200, 200, 200)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(3)
    pdf.set_font("Helvetica", "", 10)
    for name, fmt, freq in loterias:
        pdf.cell(50, 7, name)
        pdf.cell(80, 7, fmt)
        pdf.cell(0, 7, freq)
        pdf.ln(7)

    pdf.ln(5)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(80, 80, 80)
    pdf.multi_cell(0, 5,
        "Cada loteria tiene su propia configuracion con campos isDigit (para loterias "
        "basadas en digitos 0-9) y startFrom, garantizando que los numeros generados "
        "sean validos para cada formato especifico.")

    # ===== 8. CONCEPTOS CUANTICOS DETALLADOS =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "8. Conceptos Cuanticos Detallados")
    pdf.ln(12)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    conceptos = [
        ("Teoria Cuantica y Superposicion",
         "En mecanica cuantica, una particula puede existir en multiples estados "
         "simultaneamente hasta que es observada (colapso de la funcion de onda). "
         "En LottoZen Ultra, cada numero candidato existe en superposicion con una "
         "amplitud compleja. La interferencia entre numeros vecinos puede ser "
         "constructiva (amplifica probabilidad) o destructiva (la reduce), algo que "
         "la probabilidad clasica no puede modelar."),
        ("Tiempo en Espiral",
         "La teoria del tiempo en espiral combina dos tradiciones: la Cosmologia "
         "Ciclica Conforme (CCC) de Roger Penorse, que propone que el universo "
         "completa ciclos eternos donde cada big bang es la continuacion del ciclo "
         "anterior; y el I Ching, libro chino de 64 hexagramas que mapea patrones "
         "cyclicos del cambio. Cada momento tiene un hexagrama activo (determinado "
         "por la fecha) que influye en que numeros resuenan mas fuertemente."),
        ("Realidades Alternativas (Garnier/Everett)",
         "Inspirado en Jean-Paul Garnier y la interpretacion de Muchos Mundos de "
         "Hugh Everett: cada decision crea ramificaciones. En cada generacion, "
         "el motor explora 5 realidades paralelas con fases cuanticas diferentes. "
         "La realidad con mayor coherencia cosmica (alineacion de sistemas) se "
         "manifiesta como resultado final."),
        ("Entrelazamiento Cuantico",
         "Dos particulas entrelazadas comparten estado instantaneamente sin importar "
         "la distancia. En la app, numeros con afinidad vibratoria (misma reduccion "
         "numerologica, espejos, complementarios a 10, secuencia Fibonacci) se "
         "entrelazan: cuando uno es seleccionado, la probabilidad de sus "
         "entrelazados cambia inmediatamente."),
        ("Resonancia Schumann",
         "Las cavidades resonantes entre la superficie terrestre y la ionosfera "
         "producen ondas electromagneticas a frecuencias especificas (7.83, 14.3, "
         "20.8, 27.3, 33.8 Hz). Estas frecuencias modulan las amplitudes cuanticas "
         "de los numeros, creando patrones ondulatorios que afectan la seleccion."),
    ]
    for title, desc in conceptos:
        pdf.set_font("Helvetica", "B", 12)
        pdf.set_text_color(50, 30, 80)
        pdf.cell(0, 7, title)
        pdf.ln(7)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(70, 70, 70)
        pdf.multi_cell(0, 5, desc)
        pdf.ln(4)

    # ===== 9. TECNOLOGIAS =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "9. Tecnologias Utilizadas")
    pdf.ln(12)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    tech = [
        ("Frontend", "React 18.3 + TypeScript 5.6 + Vite 5.4"),
        ("PWA", "Service Worker + Manifest + iconos 192/512px"),
        ("Movil", "Capacitor (Android nativo)"),
        ("Deploy", "Netlify (continuous deployment desde GitHub)"),
        ("Repositorio", "GitHub - https://github.com/victoravilan/LottoZen-U.git"),
        ("PRNG", "crypto.getRandomValues() + xorshift32"),
        ("Muestreo", "weightedSampleWithoutReplacement() estocastico"),
        ("Storage", "localStorage con persistencia de perfil"),
        ("Estilos", "CSS-in-JS con variables CSS (dark/light theme)"),
        ("Sin dependencias", "0 librerias externas de UI - todo desde cero"),
    ]
    for tech_name, tech_desc in tech:
        pdf.set_font("Helvetica", "B", 11)
        pdf.set_text_color(80, 50, 20)
        pdf.cell(45, 7, tech_name)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(70, 70, 70)
        pdf.cell(0, 7, tech_desc)
        pdf.ln(7)

    # ===== 10. HISTORIAS EDUCATIVAS =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "10. Historias Educativas (Sabiduria)")
    pdf.ln(12)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 6,
        "La app incluye 14 historias educativas que aparecen aleatoriamente despues de "
        "cada generacion, disenadas para enseñar conceptos profundos mientras se "
        "entretiene al usuario:")
    pdf.ln(4)

    historias = [
        "1. El Gato de Schrodinger: superposicion hasta observacion",
        "2. Los Ciclos de Penrose: big bang como continuacion ciclica",
        "3. Los Muchos Mundos de Everett: ramificacion de realidades",
        "4. El Oraculo del I Ching: 64 hexagramas de sabiduria china",
        "5. La Resonancia Schumann: el latido electromagnetico del planeta",
        "6. Entrelazamiento Cuantico: conexion instantanea sin distancia",
        "7. El Cuadrado Magico de Lo Shu: matematicas sagradas chinas",
        "8. La Proporcion Aurea: Phi en la naturaleza y el arte",
        "9. La Secuencia de Fibonacci: espirales en conchas y galaxias",
        "10. Ley de Benford: el primer digito sigue una ley logaritmica",
        "11. El Calendario Maya Tzolkin: 260 dias sagrados",
        "12. La Cabala y el Arbol Sefirotico: 32 caminos de sabiduria",
        "13. Biorritmos: reloj biologico de 4 ciclos",
        "14. Distribucion de Poisson: eventos raros y frecuencia esperada",
    ]
    pdf.set_font("Helvetica", "", 10)
    for h in historias:
        pdf.cell(0, 6, h)
        pdf.ln(6)

    # ===== 11. PIE DE PAGINA =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "11. Pie de Pagina")
    pdf.ln(12)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 6,
        "Se agrego el pie de pagina solicitado por el usuario, mostrandose en todas "
        "las paginas de la app:")
    pdf.ln(5)

    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(139, 69, 19)
    pdf.cell(0, 8, "Creado y diseñado por: Victor M.F. Avilan")
    pdf.ln(8)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(128, 128, 128)
    pdf.cell(0, 6, "(c) Todos los derechos reservados")
    pdf.ln(10)

    # ===== 12. CONCLUSION =====
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, 12, "12. Conclusion y Vision")
    pdf.ln(12)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    conclusion = [
        "LottoZen Ultra representa una vision unica en el campo de las apps predictivas:",
        "combinar el conocimiento ancestral (numerologia, astrologia, I Ching, Cabala)",
        "con la fisica mas avanzada (mecanica cuantica, cosmologia ciclica, teoria de",
        "Muchos Mundos) para crear una experiencia que no solo genera numeros sino que",
        "educa y inspira a los usuarios.",
        "",
        "El proyecto evoluciono desde un concepto basico hasta un sistema de 18 capas",
        "analiticas, con generacion verdaderamente aleatoria usando PRNG criptografico,",
        "optimizacion estrategica basada en biorritmos personales, y un motor cuantico",
        "que aplica interferencia, entrelazamiento y exploracion de realidades paralelas.",
        "",
        "Vision futura potencial:",
        "  - Integracion con generadores cuanticos reales (QRNG hardware)",
        "  - Analisis de datos historicos en tiempo real via API",
        "  - Machine learning para ajustar pesos de sistemas dinamicamente",
        "  - Comunidad de usuarios con comparacion de resultados",
        "  - Expansion a mas loterias internacionales",
        "",
        "",
        "Este documento resume el recorrido completo de desarrollo de LottoZen Ultra,",
        "desde la creacion del repositorio hasta la integracion del motor cuantico,",
        "pasando por el fix del bug critico de generacion, el optimizador estrategico,",
        "y todos los sistemas intermedios.",
        "",
        "",
        "Creado y diseñado por: Victor M.F. Avilan",
        "(c) Todos los derechos reservados",
    ]
    for line in conclusion:
        pdf.cell(0, 5.5, line)
        pdf.ln(5.5)

    # Save
    output_path = "C:/Users/Victor M.F. Avilan/Downloads/LottoZen-Ultra-Documento-Desarrollo.pdf"
    pdf.output(output_path)
    size = os.path.getsize(output_path)
    print(f"PDF created: {output_path} - Size: {size/1024:.1f} KB")


if __name__ == "__main__":
    create_pdf()
