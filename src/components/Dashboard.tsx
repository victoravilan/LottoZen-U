import { useState, useEffect } from 'react'
import type { Page } from '../App'
import { getUserProfile } from '../lib/storage'
import { calculateCompleteAnalysis } from '../lib/cosmicEngine'
import { LOTTERY_CONFIGS, getLatestResults, getRandomWisdom } from '../lib/lotteryData'
import NumberBall from './NumberBall'

interface Props {
  onNavigate: (page: Page) => void
}

export default function Dashboard({ onNavigate }: Props) {
  const profile = getUserProfile()
  const [today] = useState(new Date().toISOString().split('T')[0])
  const [wisdom, setWisdom] = useState(getRandomWisdom())

  useEffect(() => {
    const interval = setInterval(() => { setWisdom(getRandomWisdom()) }, 15000)
    return () => clearInterval(interval)
  }, [])

  if (!profile) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', animation: 'fadeIn 0.6s ease' }}>
        <img src="./logo.svg" alt="LottoZen Ultra" style={{
          width: '120px', height: '120px', margin: '0 auto 20px', display: 'block',
          filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))',
          animation: 'float 4s ease-in-out infinite',
        }} />
        <h2 className="font-display" style={{ fontSize: '24px', color: 'var(--accent-gold)', marginBottom: '12px' }}>
          Bienvenido a LottoZen Ultra
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
          Crea tu perfil cosmico para comenzar. Integramos 13 sistemas: numerologia pitagorica y caldea,
          astrologia, calendario maya, cabala, Lo Shu, biorritmos, Fibonacci, numero aureo, ley de Benford,
          distribucion de Poisson y analisis historico.
        </p>
        <button onClick={() => onNavigate('profile')}
          style={{
            padding: '14px 32px',
            background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-light))',
            color: '#0d0521', border: 'none', borderRadius: '12px',
            fontSize: '16px', fontWeight: 600, cursor: 'pointer',
            animation: 'glow 3s ease-in-out infinite',
          }}>
          Crear mi perfil
        </button>
      </div>
    )
  }

  const analysis = calculateCompleteAnalysis(profile.fullName, profile.birthDate, profile.birthPlace, today)
  const lottery = LOTTERY_CONFIGS.find(l => l.id === profile.preferredLottery) || LOTTERY_CONFIGS[0]
  const latestResults = getLatestResults(lottery.id, 3)

  return (
    <div style={{ animation: 'fadeIn 0.6s ease' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', marginBottom: '32px', padding: '24px 0' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
        <h2 className="font-display" style={{
          fontSize: '32px', fontWeight: 700,
          background: 'linear-gradient(90deg, var(--accent-gold-light), var(--accent-purple-light))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px',
        }}>
          Hola, {profile.fullName.split(' ')[0]}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Tu energia de hoy: numero{' '}
          <strong style={{ color: 'var(--accent-gold)', fontSize: '20px' }}>{analysis.destinyNumber}</strong>
          {' '}| Signo {analysis.zodiacSign.name} | Kin Maya {analysis.mayanKin.kinNumber}
        </p>
      </section>

      {/* Core numbers */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '12px', marginBottom: '24px',
      }}>
        {[
          { label: 'Numero de Vida', value: analysis.lifePath, desc: analysis.meanings.lifePath },
          { label: 'Expresion', value: analysis.expression, desc: analysis.meanings.expression },
          { label: 'Alma', value: analysis.soulUrge, desc: analysis.meanings.soulUrge },
          { label: 'Suerte', value: analysis.personalLucky, desc: 'Tu numero de suerte personal' },
          { label: 'Caldeo', value: analysis.chaldeanName, desc: 'Vibracion sonora de tu nombre' },
          { label: 'Ano Personal', value: analysis.personalYear, desc: analysis.personalYearMeaning.split(':')[0] },
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '16px', padding: '16px 12px', textAlign: 'center',
            animation: `fadeIn 0.6s ease ${i * 0.1}s both`,
          }}>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              {stat.label}
            </p>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-gold))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 6px', fontSize: '18px', fontWeight: 700, color: '#0d0521',
            }}>
              {stat.value}
            </div>
            <p style={{ fontSize: '10px', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
              {stat.desc.length > 45 ? stat.desc.substring(0, 45) + '...' : stat.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Cosmic summary */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '16px', padding: '20px', marginBottom: '24px',
      }}>
        <h3 className="font-display" style={{ fontSize: '16px', color: 'var(--accent-purple-light)', marginBottom: '16px' }}>
          Resumen cosmico
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '12px' }}>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>ASTROLOGIA</p>
            <p style={{ fontSize: '14px', color: 'var(--accent-gold)' }}>{analysis.zodiacSign.name}</p>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              {analysis.zodiacSign.element} | {analysis.zodiacSign.ruler}
            </p>
          </div>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '12px' }}>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>MAYA TZOLKIN</p>
            <p style={{ fontSize: '14px', color: 'var(--accent-gold)' }}>Kin {analysis.mayanKin.kinNumber}</p>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              {analysis.mayanKin.tone.name} {analysis.mayanKin.seal.name}
            </p>
          </div>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '12px' }}>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>CABALA</p>
            <p style={{ fontSize: '14px', color: 'var(--accent-gold)' }}>{analysis.sefirah.name}</p>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{analysis.sefirah.hebrew}</p>
          </div>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '12px' }}>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>BIORRITMOS</p>
            <p style={{ fontSize: '14px', color: analysis.biorhythm.totalEnergy > 0 ? 'var(--success)' : 'var(--danger)' }}>
              {analysis.biorhythm.totalEnergy > 0 ? '+' : ''}{analysis.biorhythm.totalEnergy}% energia
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              F:{analysis.biorhythm.physical.percent}% E:{analysis.biorhythm.emotional.percent}% I:{analysis.biorhythm.intellectual.percent}%
            </p>
          </div>
        </div>
      </div>

      {/* Generate CTA */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(212, 175, 55, 0.1))',
        border: '1px solid var(--border-gold)', borderRadius: '20px',
        padding: '32px 24px', textAlign: 'center', marginBottom: '32px',
        animation: 'glow 4s ease-in-out infinite',
      }}>
        <h3 className="font-display" style={{ fontSize: '22px', color: 'var(--accent-gold)', marginBottom: '8px' }}>
          Genera tus numeros
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '14px' }}>
          13 sistemas integrados | Resumen detallado por numero | {lottery.name}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('generator')}
            style={{
              padding: '14px 36px',
              background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-light))',
              color: '#0d0521', border: 'none', borderRadius: '12px',
              fontSize: '16px', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            {'\u2726'} Generar Ahora
          </button>
          <button onClick={() => onNavigate('strategy')}
            style={{
              padding: '14px 36px',
              background: 'transparent',
              color: 'var(--accent-purple-light)', border: '2px solid var(--accent-purple)',
              borderRadius: '12px',
              fontSize: '16px', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            {'\u25C8'} Ver mi Estrategia
          </button>
        </div>
      </section>

      {/* Latest results */}
      <section style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 className="font-display" style={{ fontSize: '18px', color: 'var(--text-primary)' }}>
            Ultimos resultados - {lottery.name}
          </h3>
          <button onClick={() => onNavigate('analysis')}
            style={{ background: 'transparent', border: 'none', color: 'var(--accent-purple-light)', fontSize: '13px', cursor: 'pointer' }}>
            Ver mas \u2192
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {latestResults.map((result, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: '12px', padding: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
            }}>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {new Date(result.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--accent-gold)' }}>
                  Bote: {(result.jackpot / 1000000).toFixed(1)}M \u20AC
                </p>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                {result.numbers.map((n, j) => (
                  <NumberBall key={j} number={n} size="small" color={lottery.color} />
                ))}
                {result.stars && result.stars.length > 0 && (
                  <>
                    <span style={{ color: 'var(--text-muted)', margin: '0 4px' }}>+</span>
                    {result.stars.map((n, j) => (
                      <NumberBall key={`s${j}`} number={n} size="small" variant="star" color={lottery.color} />
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wisdom */}
      <section style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-gold)',
        borderRadius: '16px', padding: '24px', marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '18px' }}>\uD83D\uDD14</span>
          <h4 className="font-display" style={{ fontSize: '16px', color: 'var(--accent-gold)' }}>
            Sabiduria del momento
          </h4>
        </div>
        <h5 style={{ color: 'var(--accent-purple-light)', fontSize: '14px', marginBottom: '8px' }}>{wisdom.title}</h5>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, marginBottom: '12px' }}>{wisdom.story}</p>
        <div style={{ background: 'rgba(212, 175, 55, 0.08)', borderRadius: '10px', padding: '12px 16px', border: '1px solid var(--border-gold)' }}>
          <p style={{ color: 'var(--accent-gold-light)', fontSize: '13px', fontStyle: 'italic', lineHeight: 1.5 }}>{wisdom.lesson}</p>
        </div>
      </section>

      {/* Responsible gaming */}
      <div style={{
        textAlign: 'center', padding: '16px',
        background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px',
        border: '1px solid rgba(239, 68, 68, 0.15)',
      }}>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Juega con responsabilidad. Si sientes que no puedes parar, busca ayuda en{' '}
          <a href="https://www.jugarbien.es" target="_blank" rel="noopener" style={{ color: 'var(--accent-purple-light)' }}>jugarbien.es</a>
        </p>
      </div>
    </div>
  )
}
