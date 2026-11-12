import { useState, useMemo } from 'react'
import { getUserProfile } from '../lib/storage'
import { generateStrategyReport, getEnergyLevelLabel, energyToBarWidth, type DayEnergy } from '../lib/playOptimizer'
import { LOTTERY_CONFIGS } from '../lib/lotteryData'
import NumberBall from './NumberBall'

export default function PlayOptimizer() {
  const profile = getUserProfile()
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)

  const report = useMemo(() => {
    if (!profile) return null
    return generateStrategyReport(profile.birthDate, new Date().toISOString().split('T')[0])
  }, [profile])

  if (!profile) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', animation: 'fadeIn 0.6s ease' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Necesitas crear tu perfil primero para recibir recomendaciones personalizadas.
        </p>
      </div>
    )
  }

  if (!report) return null

  const today = report.allDays[0]
  const selectedDay = report.allDays[selectedDayIndex]
  const todayLabel = getEnergyLevelLabel(today.energyLevel)

  return (
    <div style={{ animation: 'fadeIn 0.6s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 className="font-display" style={{ fontSize: '24px', color: 'var(--accent-gold)', marginBottom: '4px' }}>
          Estrategia de Juego
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Optimizacion personalizada basada en tus biorritmos, astrologia y ciclos cosmicos
        </p>
      </div>

      {/* ESTADO ACTUAL */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(212, 175, 55, 0.08))',
        border: '1px solid var(--border-gold)',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '20px',
        animation: 'glow 4s ease-in-out infinite',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px' }}>
              Tu estado energetico hoy
            </p>
            <h3 style={{ fontSize: '20px', color: todayLabel.color, fontWeight: 700 }}>
              {todayLabel.icon} {todayLabel.label}
            </h3>
          </div>
          <div style={{
            padding: '8px 16px',
            background: today.recommendation.shouldPlay ? 'rgba(132, 204, 22, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            borderRadius: '12px',
            border: `1px solid ${today.recommendation.shouldPlay ? 'rgba(132, 204, 22, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: today.recommendation.shouldPlay ? '#84cc16' : '#f87171' }}>
              {today.recommendation.shouldPlay ? 'JUGAR HOY' : 'NO RECOMENDADO'}
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Confianza: {today.recommendation.confidence}%
            </p>
          </div>
        </div>

        {/* Barras de biorritmos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
          {[
            { label: 'Fisico', value: today.physical, color: '#ef4444', icon: 'muscle' },
            { label: 'Emocional', value: today.emotional, color: '#f59e0b', icon: 'heart' },
            { label: 'Intelectual', value: today.intellectual, color: '#3b82f6', icon: 'brain' },
            { label: 'Intuitivo', value: today.intuitive, color: '#a855f7', icon: 'eye' },
          ].map((cycle) => (
            <div key={cycle.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {cycle.label}
              </p>
              <div style={{
                position: 'relative',
                height: '60px',
                background: 'var(--bg-secondary)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--border)',
              }}>
                {/* Linea central */}
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border)' }} />
                {/* Barra */}
                {cycle.value >= 0 ? (
                  <div style={{
                    position: 'absolute',
                    bottom: '50%',
                    left: '20%',
                    right: '20%',
                    height: `${energyToBarWidth(cycle.value) / 2}%`,
                    background: `linear-gradient(0deg, ${cycle.color}, ${cycle.color}aa)`,
                    borderRadius: '4px 4px 0 0',
                  }} />
                ) : (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '20%',
                    right: '20%',
                    height: `${energyToBarWidth(Math.abs(cycle.value)) / 2}%`,
                    background: `linear-gradient(180deg, ${cycle.color}66, ${cycle.color}33)`,
                    borderRadius: '0 0 4px 4px',
                  }} />
                )}
              </div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: cycle.color, marginTop: '4px' }}>
                {cycle.value > 0 ? '+' : ''}{cycle.value}%
              </p>
            </div>
          ))}
        </div>

        {/* Razon del dia */}
        <div style={{
          padding: '12px 16px',
          background: 'rgba(13, 5, 33, 0.4)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {today.recommendation.reason}
          </p>
          {today.recommendation.bestLotteryName && (
            <p style={{ fontSize: '12px', color: 'var(--accent-gold)', marginTop: '8px' }}>
              Loteria recomendada: <strong>{today.recommendation.bestLotteryName}</strong>
            </p>
          )}
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.5 }}>
            {today.recommendation.approach}
          </p>
        </div>
      </div>

      {/* CALENDARIO DE 30 DIAS */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
      }}>
        <h3 style={{ fontSize: '15px', color: 'var(--accent-gold)', marginBottom: '16px' }}>
          Calendario energetico - Proximos 30 dias
        </h3>

        {/* Leyenda */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {[
            { level: 'pico', label: 'Pico' },
            { level: 'alto', label: 'Alto' },
            { level: 'medio', label: 'Medio' },
            { level: 'bajo', label: 'Bajo' },
            { level: 'valle', label: 'Valle' },
            { level: 'critico', label: 'Critico' },
          ].map(({ level, label }) => {
            const info = getEnergyLevelLabel(level as any)
            return (
              <span key={level} style={{
                fontSize: '10px', padding: '2px 8px', borderRadius: '6px',
                background: `${info.color}20`, color: info.color,
                border: `1px solid ${info.color}40`,
              }}>
                {info.icon} {label}
              </span>
            )
          })}
        </div>

        {/* Grid de dias */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '6px' }}>
          {report.allDays.map((day, i) => {
            const info = getEnergyLevelLabel(day.energyLevel)
            const isSelected = i === selectedDayIndex
            return (
              <button
                key={i}
                onClick={() => setSelectedDayIndex(i)}
                style={{
                  padding: '8px 4px',
                  background: isSelected ? `${info.color}30` : 'var(--bg-secondary)',
                  border: `2px solid ${isSelected ? info.color : 'var(--border)'}`,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {day.dayName.slice(0, 3)}
                </p>
                <p style={{ fontSize: '16px', fontWeight: 700, color: info.color }}>
                  {day.dayNumber}
                </p>
                <p style={{ fontSize: '10px', color: info.color }}>
                  {info.icon}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* DIA SELECCIONADO - DETALLE */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)' }}>
              {selectedDay.dayName} {selectedDay.dayNumber}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {new Date(selectedDay.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div style={{
            padding: '6px 12px',
            background: `${getEnergyLevelLabel(selectedDay.energyLevel).color}20`,
            borderRadius: '8px',
            border: `1px solid ${getEnergyLevelLabel(selectedDay.energyLevel).color}40`,
          }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: getEnergyLevelLabel(selectedDay.energyLevel).color }}>
              {getEnergyLevelLabel(selectedDay.energyLevel).icon} {getEnergyLevelLabel(selectedDay.energyLevel).label}
            </p>
          </div>
        </div>

        {/* Energia total */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
          padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: '12px',
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              Energia total
            </p>
            <div style={{ height: '8px', background: 'var(--bg-card)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                width: `${energyToBarWidth(selectedDay.totalEnergy)}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${getEnergyLevelLabel(selectedDay.energyLevel).color}, ${getEnergyLevelLabel(selectedDay.energyLevel).color}88)`,
                borderRadius: '4px',
              }} />
            </div>
          </div>
          <p style={{ fontSize: '18px', fontWeight: 700, color: getEnergyLevelLabel(selectedDay.energyLevel).color }}>
            {selectedDay.totalEnergy > 0 ? '+' : ''}{selectedDay.totalEnergy}%
          </p>
        </div>

        {/* Ciclos del dia */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
          {[
            { l: 'Fisico', v: selectedDay.physical, c: '#ef4444' },
            { l: 'Emocional', v: selectedDay.emotional, c: '#f59e0b' },
            { l: 'Intelectual', v: selectedDay.intellectual, c: '#3b82f6' },
            { l: 'Intuitivo', v: selectedDay.intuitive, c: '#a855f7' },
          ].map((cycle) => (
            <div key={cycle.l} style={{
              background: 'var(--bg-secondary)', borderRadius: '10px', padding: '10px', textAlign: 'center',
            }}>
              <p style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                {cycle.l}
              </p>
              <p style={{ fontSize: '16px', fontWeight: 700, color: cycle.c }}>
                {cycle.v > 0 ? '+' : ''}{cycle.v}%
              </p>
            </div>
          ))}
        </div>

        {/* Loterias disponibles ese dia */}
        {selectedDay.favorableLotteries.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Loterias con sorteo este dia
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {selectedDay.favorableLotteries.map(id => {
                const lot = LOTTERY_CONFIGS.find(l => l.id === id)
                if (!lot) return null
                const isBest = id === selectedDay.recommendation.bestLotteryId
                return (
                  <span key={id} style={{
                    fontSize: '11px', padding: '4px 10px', borderRadius: '6px',
                    background: isBest ? `${lot.color}30` : 'var(--bg-secondary)',
                    color: isBest ? lot.color : 'var(--text-secondary)',
                    border: `1px solid ${isBest ? lot.color : 'var(--border)'}`,
                    fontWeight: isBest ? 600 : 400,
                  }}>
                    {isBest ? '★ ' : ''}{lot.name}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Recomendacion */}
        <div style={{
          padding: '16px', background: selectedDay.recommendation.shouldPlay
            ? 'rgba(132, 204, 22, 0.06)' : 'rgba(239, 68, 68, 0.06)',
          borderRadius: '12px', border: `1px solid ${selectedDay.recommendation.shouldPlay ? 'rgba(132, 204, 22, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: selectedDay.recommendation.shouldPlay ? '#84cc16' : '#f87171' }}>
              {selectedDay.recommendation.shouldPlay ? 'RECOMENDADO JUGAR' : 'NO RECOMENDADO'}
            </p>
            <span style={{
              fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
              background: 'var(--bg-secondary)', color: 'var(--text-muted)',
            }}>
              {selectedDay.recommendation.confidence}% confianza
            </span>
            <span style={{
              fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
              background: 'var(--bg-secondary)', color: 'var(--text-secondary)',
              textTransform: 'capitalize',
            }}>
              Estrategia: {selectedDay.recommendation.strategy}
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '8px' }}>
            {selectedDay.recommendation.reason}
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {selectedDay.recommendation.approach}
          </p>
        </div>
      </div>

      {/* MEJORES DIAS */}
      {report.bestDays.length > 0 && (
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-gold)',
          borderRadius: '16px', padding: '20px', marginBottom: '20px',
        }}>
          <h3 style={{ fontSize: '15px', color: 'var(--accent-gold)', marginBottom: '16px' }}>
            Tus mejores dias para jugar
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {report.bestDays.slice(0, 5).map((day, i) => {
              const info = getEnergyLevelLabel(day.energyLevel)
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: '12px',
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: `${info.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', color: info.color, flexShrink: 0,
                  }}>
                    {info.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {day.dayName} {day.dayNumber} - {new Date(day.date).toLocaleDateString('es-ES', { month: 'long' })}
                    </p>
                    <p style={{ fontSize: '12px', color: info.color }}>
                      {info.label} | Energia: {day.totalEnergy > 0 ? '+' : ''}{day.totalEnergy}%
                    </p>
                  </div>
                  {day.recommendation.bestLotteryName && (
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Mejor opcion</p>
                      <p style={{ fontSize: '13px', color: 'var(--accent-gold)', fontWeight: 600 }}>
                        {day.recommendation.bestLotteryName}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* LOTERIA RECOMENDADA */}
      {report.primaryLottery && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(212, 175, 55, 0.06))',
          border: `1px solid ${report.primaryLottery.color}40`,
          borderRadius: '16px', padding: '20px', marginBottom: '20px',
        }}>
          <h3 style={{ fontSize: '15px', color: 'var(--accent-gold)', marginBottom: '16px' }}>
            Loteria mas favorable para ti
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              background: `${report.primaryLottery.color}20`,
              border: `2px solid ${report.primaryLottery.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', color: report.primaryLottery.color,
            }}>
              {report.primaryLottery.name.charAt(0)}
            </div>
            <div>
              <p style={{ fontSize: '18px', fontWeight: 700, color: report.primaryLottery.color }}>
                {report.primaryLottery.name}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {report.primaryLottery.country} | {report.primaryLottery.drawDays.join(', ')}
              </p>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {report.primaryLotteryReason}
          </p>

          {report.alternativeLotteries.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Alternativas
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {report.alternativeLotteries.map((alt, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: '8px',
                  }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: alt.config.color }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {alt.config.name}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', flex: 1 }}>
                      {alt.reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SORTEOS ESPECIALES PROXIMOS */}
      {report.upcomingSpecials.length > 0 && (
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-gold)',
          borderRadius: '16px', padding: '20px', marginBottom: '20px',
        }}>
          <h3 style={{ fontSize: '15px', color: 'var(--accent-gold)', marginBottom: '16px' }}>
            Sorteos especiales proximos
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {report.upcomingSpecials.slice(0, 5).map((special, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: '12px',
              }}>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {special.name}
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {special.lotteryName}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-gold)' }}>
                    {special.daysUntil}
                  </p>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    dias
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONSEJOS PERSONALIZADOS */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '16px', padding: '20px', marginBottom: '20px',
      }}>
        <h3 style={{ fontSize: '15px', color: 'var(--accent-purple-light)', marginBottom: '16px' }}>
          Consejos personalizados
        </h3>

        {/* Estrategia general */}
        <div style={{
          padding: '14px 16px', background: 'rgba(139, 92, 246, 0.05)',
          borderRadius: '12px', marginBottom: '12px',
        }}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Estrategia general (30 dias)
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {report.overallStrategy}
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '6px', background: 'rgba(132, 204, 22, 0.15)', color: '#84cc16' }}>
              {report.peakDaysCount} dias pico
            </span>
            <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '6px', background: 'rgba(96, 165, 250, 0.15)', color: '#60a5fa' }}>
              {report.totalFavorableDays} dias favorables
            </span>
            <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '6px', background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
              Promedio: {report.averageEnergy > 0 ? '+' : ''}{report.averageEnergy}%
            </span>
          </div>
        </div>

        {/* Consejo zodiacal */}
        <div style={{
          padding: '14px 16px', background: 'rgba(212, 175, 55, 0.05)',
          borderRadius: '12px', marginBottom: '12px',
        }}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Consejo segun tu signo zodiacal
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {report.zodiacAdvice}
          </p>
        </div>

        {/* Ano personal */}
        <div style={{
          padding: '14px 16px', background: 'rgba(168, 85, 247, 0.05)',
          borderRadius: '12px',
        }}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Tu ano personal
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {report.personalYearAdvice}
          </p>
        </div>
      </div>

      {/* AVISO RESPONSABLE */}
      <div style={{
        background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)',
        borderRadius: '12px', padding: '16px', textAlign: 'center',
      }}>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Los biorritmos son modelos teoricos basados en ciclos biologicos propuestos por Wilhelm Fliess.
          No garantizan resultados. La loteria es un juego de azar. Juega con responsabilidad y dentro de tus posibilidades.
        </p>
      </div>
    </div>
  )
}
