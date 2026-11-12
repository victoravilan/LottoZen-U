import { useState } from 'react'
import {
  LOTTERY_CONFIGS,
  calculateFrequencyAnalysis,
  getHotNumbers,
  getColdNumbers,
  getOverdueNumbers,
  getLatestResults,
  analyzePatterns,
  getUpcomingSpecialDraws,
  getHistoricalSpecialDraws,
} from '../lib/lotteryData'
import NumberBall from './NumberBall'

export default function LotteryAnalysis() {
  const [selectedLottery, setSelectedLottery] = useState('euromillones')
  const [view, setView] = useState<'frequency' | 'hotcold' | 'overdue' | 'patterns' | 'history' | 'special'>('frequency')

  const lottery = LOTTERY_CONFIGS.find(l => l.id === selectedLottery) || LOTTERY_CONFIGS[0]
  const frequency = calculateFrequencyAnalysis(selectedLottery)
  const hotNumbers = getHotNumbers(selectedLottery, 10)
  const coldNumbers = getColdNumbers(selectedLottery, 10)
  const overdueNumbers = getOverdueNumbers(selectedLottery, 10)
  const latestResults = getLatestResults(selectedLottery, 15)
  const patterns = analyzePatterns(selectedLottery)
  const upcomingSpecials = getUpcomingSpecialDraws()
  const historicalSpecials = getHistoricalSpecialDraws(selectedLottery)

  const maxFreq = frequency.length > 0 ? frequency[0].frequency : 1

  const views = [
    { id: 'frequency', label: 'Frecuencia', icon: '📊' },
    { id: 'hotcold', label: 'Calientes/Frios', icon: '🔥' },
    { id: 'overdue', label: 'Atrasados', icon: '⏰' },
    { id: 'patterns', label: 'Patrones', icon: '🔮' },
    { id: 'history', label: 'Historial', icon: '📅' },
    { id: 'special', label: 'Sorteos Especiales', icon: '🎄' },
  ] as const

  return (
    <div style={{ animation: 'fadeIn 0.6s ease' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="font-display" style={{ fontSize: '24px', color: 'var(--accent-gold)', marginBottom: '4px' }}>
          Analisis de Loteria
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Estadisticas de los ultimos 7 anos de loterias europeas
        </p>
      </div>

      {/* Lottery selector */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '8px',
        marginBottom: '20px',
      }}>
        {LOTTERY_CONFIGS.map(l => (
          <button
            key={l.id}
            onClick={() => setSelectedLottery(l.id)}
            style={{
              padding: '12px 16px',
              background: selectedLottery === l.id ? `${l.color}20` : 'var(--bg-card)',
              border: `2px solid ${selectedLottery === l.id ? l.color : 'var(--border)'}`,
              borderRadius: '10px',
              color: selectedLottery === l.id ? l.color : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'left',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{l.name}</div>
            <div style={{ fontSize: '11px', opacity: 0.7 }}>{l.country}</div>
          </button>
        ))}
      </div>

      {/* View tabs */}
      <div style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '20px',
        overflowX: 'auto',
        paddingBottom: '4px',
      }}>
        {views.map(v => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            style={{
              padding: '10px 16px',
              background: view === v.id ? 'var(--bg-card)' : 'transparent',
              border: `1px solid ${view === v.id ? 'var(--border-gold)' : 'var(--border)'}`,
              borderRadius: '10px',
              color: view === v.id ? 'var(--accent-gold)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
            }}
          >
            {v.icon} {v.label}
          </button>
        ))}
      </div>

      {/* Frequency view */}
      {view === 'frequency' && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '20px',
          animation: 'fadeIn 0.4s ease',
        }}>
          <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)', marginBottom: '16px' }}>
            Frecuencia de aparicion - {lottery.name}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {frequency.map((item, i) => (
              <div
                key={item.number}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  animation: `fadeIn 0.3s ease ${Math.min(i * 0.02, 0.5)}s both`,
                }}
              >
                <div style={{ width: '32px', textAlign: 'center', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.number}
                </div>
                <div style={{
                  flex: 1,
                  height: '20px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <div style={{
                    width: `${(item.frequency / maxFreq) * 100}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${lottery.color}, ${lottery.color}88)`,
                    borderRadius: '10px',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
                <div style={{ width: '40px', textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)' }}>
                  {item.frequency}x
                </div>
                <div style={{ width: '50px', textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {item.percentage.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hot/Cold view */}
      {view === 'hotcold' && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px',
          }}>
            <h3 style={{ fontSize: '16px', color: '#f87171', marginBottom: '12px' }}>
              🔥 Numeros Calientes
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Los mas frecuentes en los ultimos sorteos
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {hotNumbers.map((n, i) => (
                <div key={n} style={{ animation: `fadeIn 0.4s ease ${i * 0.08}s both` }}>
                  <NumberBall number={n} size="medium" color="#f87171" />
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '24px',
          }}>
            <h3 style={{ fontSize: '16px', color: '#60a5fa', marginBottom: '12px' }}>
              ❄️ Numeros Frios
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Los menos frecuentes en los ultimos sorteos
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {coldNumbers.map((n, i) => (
                <div key={n} style={{ animation: `fadeIn 0.4s ease ${i * 0.08}s both` }}>
                  <NumberBall number={n} size="medium" color="#60a5fa" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overdue view */}
      {view === 'overdue' && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '24px',
          animation: 'fadeIn 0.4s ease',
        }}>
          <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)', marginBottom: '12px' }}>
            ⏰ Numeros Atrasados
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Numeros que llevan mas tiempo sin aparecer. Algunos jugadores creen que estan "debidos".
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {overdueNumbers.map((n, i) => {
              const freqData = frequency.find(f => f.number === n)
              const days = freqData?.daysSinceLastSeen || 0
              return (
                <div
                  key={n}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    animation: `fadeIn 0.4s ease ${i * 0.08}s both`,
                  }}
                >
                  <NumberBall number={n} size="medium" color="var(--accent-gold)" animated={false} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                      {days} dias sin salir
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Ultima aparicion: {freqData?.lastSeen || 'N/A'}
                    </p>
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    background: days > 30 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: days > 30 ? '#f87171' : '#fbbf24',
                    fontWeight: 600,
                  }}>
                    {days > 30 ? 'Muy atrasado' : 'Atrasado'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Patterns view */}
      {view === 'patterns' && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginBottom: '16px',
          }}>
            {/* Even/Odd */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '20px',
            }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
                Par / Impar
              </h4>
              <div style={{ display: 'flex', gap: '4px', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ width: `${patterns.evenOddRatio.even}%`, background: 'var(--accent-purple)' }} />
                <div style={{ width: `${patterns.evenOddRatio.odd}%`, background: 'var(--accent-gold)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--accent-purple-light)' }}>Par {patterns.evenOddRatio.even}%</span>
                <span style={{ color: 'var(--accent-gold)' }}>Impar {patterns.evenOddRatio.odd}%</span>
              </div>
            </div>

            {/* Low/High */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '20px',
            }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
                Bajos / Altos
              </h4>
              <div style={{ display: 'flex', gap: '4px', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ width: `${patterns.lowHighRatio.low}%`, background: 'var(--accent-teal)' }} />
                <div style={{ width: `${patterns.lowHighRatio.high}%`, background: 'var(--accent-pink)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--accent-teal)' }}>Bajo {patterns.lowHighRatio.low}%</span>
                <span style={{ color: 'var(--accent-pink)' }}>Alto {patterns.lowHighRatio.high}%</span>
              </div>
            </div>

            {/* Sum */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
            }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Suma promedio
              </h4>
              <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent-gold)' }}>
                {patterns.averageSum}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                de los numeros ganadores
              </p>
            </div>

            {/* Primes */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
            }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Numeros primos
              </h4>
              <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent-purple-light)' }}>
                {patterns.primeCount}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                promedio por sorteo
              </p>
            </div>

            {/* Consecutive */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
            }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Pares consecutivos
              </h4>
              <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent-pink)' }}>
                {patterns.consecutivePairs}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                promedio por sorteo
              </p>
            </div>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.05)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Estos patrones reflejan tendencias historicas. Cada sorteo es independiente y los resultados pasados
              no influyen en futuros sorteos. La probabilidad de cada numero permanece constante.
            </p>
          </div>
        </div>
      )}

      {/* History view */}
      {view === 'history' && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '20px',
          animation: 'fadeIn 0.4s ease',
        }}>
          <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)', marginBottom: '16px' }}>
            Historial de resultados - {lottery.name}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {latestResults.map((result, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  flexWrap: 'wrap',
                  gap: '8px',
                  animation: `fadeIn 0.3s ease ${Math.min(i * 0.05, 0.5)}s both`,
                }}
              >
                <div>
                  <p style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {new Date(result.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  {result.special && result.specialName && (
                    <p style={{ fontSize: '11px', color: 'var(--accent-purple-light)', fontWeight: 600 }}>
                      {result.specialName}
                    </p>
                  )}
                  <p style={{ fontSize: '11px', color: 'var(--accent-gold)' }}>
                    Bote: {(result.jackpot / 1000000).toFixed(1)}M €
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {result.numbers.map((n, j) => (
                    <NumberBall key={j} number={n} size="small" color={lottery.color} animated={false} />
                  ))}
                  {result.stars && result.stars.length > 0 && (
                    <>
                      <span style={{ color: 'var(--text-muted)', margin: '0 2px' }}>+</span>
                      {result.stars.map((n, j) => (
                        <NumberBall key={`s${j}`} number={n} size="small" variant="star" color={lottery.color} animated={false} />
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special draws view */}
      {view === 'special' && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          {/* Upcoming special draws */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(139, 92, 246, 0.08))',
            border: '1px solid var(--border-gold)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px',
          }}>
            <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)', marginBottom: '16px' }}>
              Sorteos especiales proximos
            </h3>
            {upcomingSpecials.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {upcomingSpecials.map((special, i) => {
                  const specialLottery = LOTTERY_CONFIGS.find(l => l.id === special.lotteryId);
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 16px',
                        background: 'var(--bg-card)',
                        borderRadius: '12px',
                        border: `1px solid ${specialLottery?.color || 'var(--border)'}40`,
                        animation: `fadeIn 0.4s ease ${i * 0.08}s both`,
                      }}
                    >
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '10px',
                        background: `${specialLottery?.color || 'var(--accent-purple)'}20`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '22px', flexShrink: 0,
                      }}>
                        {special.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 600 }}>
                          {special.name}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {specialLottery?.name || 'Loteria'} | {special.description}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ fontSize: '12px', color: 'var(--accent-gold)', fontWeight: 600 }}>
                          {new Date(special.date + '-2026').toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                        </p>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          Bote: {(special.typicalJackpot / 1000000).toFixed(0)}M €
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
                No hay sorteos especiales proximos en este momento.
              </p>
            )}
          </div>

          {/* Historical special draws for this lottery */}
          {lottery.hasSpecialDraws && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '24px',
            }}>
              <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)', marginBottom: '16px' }}>
                Historial de sorteos especiales - {lottery.name}
              </h3>
              {historicalSpecials.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {historicalSpecials.slice(0, 10).map((draw, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        background: 'var(--bg-secondary)',
                        borderRadius: '12px',
                        flexWrap: 'wrap',
                        gap: '8px',
                        animation: `fadeIn 0.3s ease ${Math.min(i * 0.05, 0.5)}s both`,
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
                          {draw.specialName || 'Sorteo Especial'}
                        </p>
                        <p style={{ fontSize: '11px', color: 'var(--accent-gold)' }}>
                          {new Date(draw.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {draw.numbers.map((n, j) => (
                          <NumberBall key={j} number={n} size="small" color={lottery.color} animated={false} />
                        ))}
                        {draw.stars && draw.stars.length > 0 && (
                          <>
                            <span style={{ color: 'var(--text-muted)', margin: '0 2px' }}>+</span>
                            {draw.stars.map((n, j) => (
                              <NumberBall key={`s${j}`} number={n} size="small" variant="star" color={lottery.color} animated={false} />
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
                  No hay historial de sorteos especiales para {lottery.name}.
                </p>
              )}
            </div>
          )}

          {!lottery.hasSpecialDraws && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {lottery.name} no tiene sorteos especiales.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
