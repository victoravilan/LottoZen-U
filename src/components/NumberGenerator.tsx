import { useState } from 'react'
import { getUserProfile } from '../lib/storage'
import { calculateCompleteAnalysis, generateCompleteNumbers, type GenerationResult, type CompleteAnalysis } from '../lib/cosmicEngine'
import {
  LOTTERY_CONFIGS,
  calculateFrequencyAnalysis,
  getHotNumbers,
  getColdNumbers,
  getOverdueNumbers,
  analyzePatterns,
  getRandomWisdom,
  type GenerationWeights,
} from '../lib/lotteryData'
import NumberBall from './NumberBall'

interface DetailedView {
  number: number;
  systems: string[];
  fullSummary: string;
}

export default function NumberGenerator() {
  const profile = getUserProfile()
  const [selectedLottery, setSelectedLottery] = useState(profile?.preferredLottery || 'euromillones')
  const [consultationDate, setConsultationDate] = useState(new Date().toISOString().split('T')[0])
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [analysis, setAnalysis] = useState<CompleteAnalysis | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [wisdom] = useState(getRandomWisdom())
  const [showDetails, setShowDetails] = useState(false)
  const [expandedNumber, setExpandedNumber] = useState<number | null>(null)

  if (!profile) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', animation: 'fadeIn 0.6s ease' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Necesitas crear tu perfil primero para generar numeros personalizados.
        </p>
      </div>
    )
  }

  const lottery = LOTTERY_CONFIGS.find(l => l.id === selectedLottery) || LOTTERY_CONFIGS[0]

  const handleGenerate = () => {
    setIsGenerating(true)
    setResult(null)
    setAnalysis(null)

    setTimeout(() => {
      // 1. Calcular analisis completo con todos los sistemas
      const fullAnalysis = calculateCompleteAnalysis(
        profile.fullName,
        profile.birthDate,
        profile.birthPlace,
        consultationDate
      )
      setAnalysis(fullAnalysis)

      // 2. Obtener datos historicos
      const frequency = calculateFrequencyAnalysis(selectedLottery)
      const hotNumbers = getHotNumbers(selectedLottery, 15)
      const coldNumbers = getColdNumbers(selectedLottery, 15)
      const overdueNumbers = getOverdueNumbers(selectedLottery, 15)
      const patterns = analyzePatterns(selectedLottery)
      const averageFrequency = frequency.length > 0
        ? frequency.reduce((sum, f) => sum + f.frequency, 0) / frequency.length
        : 1

      // 3. Generar numeros combinando todo
      const seed = parseInt(
        profile.birthDate.replace(/-/g, '') +
        consultationDate.replace(/-/g, '') +
        Date.now().toString().slice(-4)
      )

      const generated = generateCompleteNumbers(
        fullAnalysis,
        selectedLottery,
        {
          frequency,
          hotNumbers,
          coldNumbers,
          overdueNumbers,
          averageFrequency,
          patterns,
        },
        profile.weights,
        seed
      )

      setResult(generated)
      setIsGenerating(false)
    }, 2500)
  }

  return (
    <div style={{ animation: 'fadeIn 0.6s ease' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="font-display" style={{ fontSize: '24px', color: 'var(--accent-gold)', marginBottom: '4px' }}>
          Generador Cosmico
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Integra 13 sistemas: numerologia pitagorica y caldea, astrologia, calendario maya, cabala,
          Lo Shu, biorritmos, Fibonacci, numero aureo, ley de Benford, Poisson, analisis historico y mas.
        </p>
      </div>

      {/* Configuration */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
      }}>
        {/* Lottery selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block', fontSize: '12px', color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px',
          }}>
            Selecciona tu loteria
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
            {LOTTERY_CONFIGS.map(l => (
              <button
                key={l.id}
                onClick={() => setSelectedLottery(l.id)}
                style={{
                  padding: '12px 16px',
                  background: selectedLottery === l.id ? `${l.color}20` : 'var(--bg-secondary)',
                  border: `2px solid ${selectedLottery === l.id ? l.color : 'var(--border)'}`,
                  borderRadius: '10px',
                  color: selectedLottery === l.id ? l.color : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{l.name}</div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>{l.country}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Consultation date */}
        <div>
          <label style={{
            display: 'block', fontSize: '12px', color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px',
          }}>
            Fecha de consulta
          </label>
          <input
            type="date"
            value={consultationDate}
            onChange={(e) => setConsultationDate(e.target.value)}
            style={{
              width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)',
              border: '1px solid var(--border)', borderRadius: '10px',
              color: 'var(--text-primary)', fontSize: '15px',
            }}
          />
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        style={{
          width: '100%', padding: '18px',
          background: isGenerating ? 'var(--bg-card)' : 'linear-gradient(135deg, var(--accent-gold), var(--accent-purple))',
          color: isGenerating ? 'var(--text-muted)' : '#0d0521',
          border: 'none', borderRadius: '14px', fontSize: '18px', fontWeight: 700,
          cursor: isGenerating ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease',
          animation: isGenerating ? 'none' : 'glow 3s ease-in-out infinite', marginBottom: '24px',
        }}
      >
        {isGenerating ? '\u27F3 Analizando 13 sistemas cosmicos...' : '\u2726 Generar mis numeros'}
      </button>

      {/* Generating animation */}
      {isGenerating && (
        <div style={{ textAlign: 'center', padding: '48px 20px' }}>
          <div style={{
            width: '60px', height: '60px', border: '3px solid var(--border)',
            borderTopColor: 'var(--accent-gold)', borderRadius: '50%', margin: '0 auto 20px',
            animation: 'spin 1s linear infinite',
          }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
            Procesando tu analisis multidisciplinar...
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
            {['Pitagorica', 'Caldea', 'Astrologia', 'Maya', 'Cabala', 'Lo Shu', 'Biorritmos', 'Fibonacci', 'Benford', 'Poisson', 'Historico', 'Ano Personal', 'Aureo'].map((s, i) => (
              <span key={s} style={{
                fontSize: '10px', padding: '3px 8px', borderRadius: '6px',
                background: 'var(--bg-card)', color: 'var(--accent-purple-light)',
                border: '1px solid var(--border)', animation: `fadeIn 0.3s ease ${i * 0.1}s both`,
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {result && !isGenerating && (
        <div style={{ animation: 'fadeIn 0.6s ease' }}>
          {/* Main numbers */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(212, 175, 55, 0.08))',
            border: '1px solid var(--border-gold)', borderRadius: '20px',
            padding: '32px 24px', textAlign: 'center', marginBottom: '20px',
            animation: 'glow 4s ease-in-out infinite',
          }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>
              Tus numeros para {lottery.name}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              {result.main.map((n, i) => (
                <div key={i} style={{ animation: `fadeIn 0.5s ease ${i * 0.15}s both` }}>
                  <NumberBall number={n} size="large" color={lottery.color} />
                </div>
              ))}
            </div>
            {result.bonus.length > 0 && (
              <>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                  {lottery.bonusLabel}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  {result.bonus.map((n, i) => (
                    <div key={i} style={{ animation: `fadeIn 0.5s ease ${(result.main.length + i) * 0.15}s both` }}>
                      <NumberBall number={n} size="medium" variant="star" color={lottery.color} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Systems used */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '16px', padding: '16px 20px', marginBottom: '16px',
          }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
              Sistemas aplicados ({result.systemsUsed.length})
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {result.systemsUsed.map((s, i) => (
                <span key={i} style={{
                  fontSize: '11px', padding: '4px 10px', borderRadius: '6px',
                  background: 'var(--bg-secondary)', color: 'var(--accent-purple-light)',
                  border: '1px solid var(--border)',
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed explanation for each number */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '16px', padding: '20px', marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h4 className="font-display" style={{ fontSize: '15px', color: 'var(--accent-gold)' }}>
                Resumen por numero
              </h4>
              <button
                onClick={() => setShowDetails(!showDetails)}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-purple-light)', fontSize: '12px', cursor: 'pointer' }}
              >
                {showDetails ? 'Ocultar detalle' : 'Mostrar detalle'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {result.details.slice(0, result.main.length).map((detail, i) => (
                <div key={i}>
                  <div
                    onClick={() => setExpandedNumber(expandedNumber === detail.number ? null : detail.number)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                      background: 'var(--bg-secondary)', borderRadius: '12px', cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <NumberBall number={detail.number} size="small" color={lottery.color} animated={false} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {detail.sources.length} sistema(s) lo respaldan
                      </p>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Puntuacion: {detail.totalScore}
                      </p>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--accent-purple-light)' }}>
                      {expandedNumber === detail.number ? '\u25BC' : '\u25B6'}
                    </span>
                  </div>

                  {expandedNumber === detail.number && (
                    <div style={{
                      marginTop: '8px', padding: '12px 16px', background: 'rgba(139, 92, 246, 0.05)',
                      borderRadius: '10px', border: '1px solid var(--border)',
                      animation: 'fadeIn 0.3s ease',
                    }}>
                      {showDetails ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {detail.sources.map((src, j) => (
                            <div key={j} style={{
                              display: 'flex', gap: '8px', alignItems: 'flex-start',
                              padding: '8px', background: 'var(--bg-card)', borderRadius: '8px',
                            }}>
                              <span style={{
                                fontSize: '10px', padding: '2px 6px', borderRadius: '4px',
                                background: 'var(--accent-purple)', color: '#fff', whiteSpace: 'nowrap',
                              }}>
                                {src.system.split(' ')[0]}
                              </span>
                              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                {src.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                          {detail.summary}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Full analysis summary */}
          {analysis && (
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: '16px', padding: '20px', marginBottom: '16px',
            }}>
              <h4 className="font-display" style={{ fontSize: '15px', color: 'var(--accent-purple-light)', marginBottom: '16px' }}>
                Tu analisis cosmico completo
              </h4>

              {/* Numerology section */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Numerologia Pitagorica
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '6px' }}>
                  {[
                    { l: 'Vida', v: analysis.lifePath },
                    { l: 'Expresion', v: analysis.expression },
                    { l: 'Alma', v: analysis.soulUrge },
                    { l: 'Personalidad', v: analysis.personality },
                    { l: 'Cumpleanos', v: analysis.birthdayNumber },
                    { l: 'Destino', v: analysis.destinyNumber },
                    { l: 'Lugar', v: analysis.placeNumber },
                    { l: 'Suerte', v: analysis.personalLucky },
                  ].map((item, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                      <p style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{item.l}</p>
                      <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-gold)' }}>{item.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chaldean */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Numerologia Caldea
                </p>
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '10px', display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Nombre Caldeo</p>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-purple-light)' }}>{analysis.chaldeanName}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Gematria</p>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-purple-light)' }}>{analysis.gematria}</p>
                  </div>
                </div>
              </div>

              {/* Astrology */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Astrologia
                </p>
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '12px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--accent-gold)', marginBottom: '4px' }}>
                    {analysis.zodiacSign.name} ({analysis.zodiacSign.element}, {analysis.zodiacSign.quality})
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Regente: {analysis.zodiacSign.ruler} (numero {analysis.zodiacSign.rulerNumber}) | Suerte: {analysis.zodiacSign.luckyNumbers.join(', ')}
                  </p>
                </div>
              </div>

              {/* Maya */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Calendario Maya Tzolkin
                </p>
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '12px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--accent-gold)' }}>
                    Kin {analysis.mayanKin.kinNumber}: {analysis.mayanKin.tone.name} {analysis.mayanKin.seal.name}
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {analysis.mayanKin.seal.keywords}
                  </p>
                </div>
              </div>

              {/* Cabala */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Cabala - Arbol de la Vida
                </p>
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '12px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--accent-gold)' }}>
                    {analysis.sefirah.name} ({analysis.sefirah.hebrew})
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {analysis.sefirah.meaning} - {analysis.sefirah.attribute}
                  </p>
                </div>
              </div>

              {/* Biorhythms */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Biorritmos
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {[
                    { l: 'Fisico', v: analysis.biorhythm.physical },
                    { l: 'Emocional', v: analysis.biorhythm.emotional },
                    { l: 'Intelectual', v: analysis.biorhythm.intellectual },
                  ].map((item, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                      <p style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{item.l}</p>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: item.v.percent > 0 ? 'var(--success)' : 'var(--danger)' }}>
                        {item.v.percent > 0 ? '+' : ''}{item.v.percent}%
                      </p>
                      <p style={{ fontSize: '8px', color: 'var(--text-muted)' }}>{item.v.phase}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal year */}
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Ciclo temporal
                </p>
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '12px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--accent-gold)' }}>
                    Ano personal {analysis.personalYear} | Ano universal {analysis.universalYear}
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {analysis.personalYearMeaning}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Probability notice */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '12px', padding: '16px', textAlign: 'center', marginBottom: '16px',
          }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Probabilidad real de acertar el premio mayor de {lottery.name}:{' '}
              <strong style={{ color: 'var(--warning)' }}>{lottery.odds}</strong>
              <br />
              Estos numeros combinan 13 sistemas matematicos y tradicionales. La loteria sigue siendo azar.
              Juega con responsabilidad.
            </p>
          </div>

          {/* Wisdom */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-gold)',
            borderRadius: '16px', padding: '20px',
          }}>
            <h5 style={{ color: 'var(--accent-gold)', fontSize: '14px', marginBottom: '8px' }}>
              {wisdom.title}
            </h5>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, marginBottom: '10px' }}>
              {wisdom.story}
            </p>
            <p style={{ color: 'var(--accent-gold-light)', fontSize: '13px', fontStyle: 'italic' }}>
              {wisdom.lesson}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
