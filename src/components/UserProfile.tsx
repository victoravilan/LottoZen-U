import { useState } from 'react'
import { saveProfile, getUserProfile, DEFAULT_WEIGHTS, type UserProfile } from '../lib/storage'
import { LOTTERY_CONFIGS } from '../lib/lotteryData'
import { calculateCompleteAnalysis } from '../lib/cosmicEngine'

interface Props {
  onSave: () => void
}

export default function UserProfileForm({ onSave }: Props) {
  const existing = getUserProfile()
  const [fullName, setFullName] = useState(existing?.fullName || '')
  const [birthDate, setBirthDate] = useState(existing?.birthDate || '')
  const [birthTime, setBirthTime] = useState(existing?.birthTime || '12:00')
  const [birthPlace, setBirthPlace] = useState(existing?.birthPlace || '')
  const [region, setRegion] = useState(existing?.region || '')
  const [preferredLottery, setPreferredLottery] = useState(existing?.preferredLottery || 'euromillones')
  const [weights, setWeights] = useState(existing?.weights || DEFAULT_WEIGHTS)
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState('')

  const handleSave = () => {
    if (!fullName.trim()) { setError('Por favor ingresa tu nombre completo'); return }
    if (!birthDate) { setError('Por favor ingresa tu fecha de nacimiento'); return }
    if (!birthPlace.trim()) { setError('Por favor ingresa tu lugar de nacimiento'); return }

    const profile: UserProfile = {
      fullName: fullName.trim(),
      birthDate,
      birthTime,
      birthPlace: birthPlace.trim(),
      region: region.trim(),
      preferredLottery,
      weights,
    }
    saveProfile(profile)
    onSave()
  }

  const analysis = fullName && birthDate && birthPlace
    ? calculateCompleteAnalysis(fullName, birthDate, birthPlace, new Date().toISOString().split('T')[0])
    : null

  const weightItems = [
    { key: 'numerology', label: 'Numerologia', color: 'var(--accent-purple)' },
    { key: 'astrology', label: 'Astrologia', color: 'var(--accent-gold)' },
    { key: 'maya', label: 'Calendario Maya', color: '#14b8a6' },
    { key: 'fibonacci', label: 'Fibonacci/Aureo', color: '#ec4899' },
    { key: 'benford', label: 'Ley de Benford', color: '#f59e0b' },
    { key: 'poisson', label: 'Poisson', color: '#60a5fa' },
    { key: 'hotNumbers', label: 'Numeros frecuentes', color: '#f87171' },
    { key: 'coldNumbers', label: 'Numeros infrecuentes', color: '#60a5fa' },
    { key: 'overdue', label: 'Numeros atrasados', color: '#fbbf24' },
    { key: 'biorhythm', label: 'Biorritmos', color: '#a78bfa' },
    { key: 'randomness', label: 'Aleatoriedad', color: 'var(--text-secondary)' },
  ] as const

  return (
    <div style={{ animation: 'fadeIn 0.6s ease' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="font-display" style={{ fontSize: '24px', color: 'var(--accent-gold)', marginBottom: '4px' }}>
          Tu Perfil Cosmico
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Datos completos para el analisis multidisciplinar de tus numeros
        </p>
      </div>

      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '16px', padding: '24px', marginBottom: '16px',
      }}>
        {/* Full name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Nombre completo *
          </label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
            placeholder="Ej: Maria Garcia Lopez"
            style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '15px', outline: 'none' }} />
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
            Usa tu nombre completo legal. Cada letra tiene valor pitagorico y caldeo.
          </p>
        </div>

        {/* Birth date */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Fecha de nacimiento *
          </label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '15px', outline: 'none' }} />
        </div>

        {/* Birth time */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Hora de nacimiento
          </label>
          <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)}
            style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '15px', outline: 'none' }} />
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
            La hora precisa permite calcular posiciones planetarias y ascendente. Si no la conoces, usa 12:00.
          </p>
        </div>

        {/* Birth place */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Lugar de nacimiento *
          </label>
          <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)}
            placeholder="Ej: Madrid, Espana"
            style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '15px', outline: 'none' }} />
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
            Ciudad y pais. El nombre del lugar tiene energia numerologica y determina coordenadas astrologicas.
          </p>
        </div>

        {/* Region */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Region / Zona horaria
          </label>
          <input type="text" value={region} onChange={(e) => setRegion(e.target.value)}
            placeholder="Ej: Europa/Centro (CET, UTC+1)"
            style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '15px', outline: 'none' }} />
        </div>

        {/* Preferred lottery */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Loteria preferida
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
            {LOTTERY_CONFIGS.map(l => (
              <button key={l.id} onClick={() => setPreferredLottery(l.id)}
                style={{
                  padding: '12px 16px',
                  background: preferredLottery === l.id ? `${l.color}20` : 'var(--bg-secondary)',
                  border: `2px solid ${preferredLottery === l.id ? l.color : 'var(--border)'}`,
                  borderRadius: '10px', color: preferredLottery === l.id ? l.color : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'left',
                }}>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{l.name}</div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>{l.country}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Weights */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            Configuracion del algoritmo (11 factores)
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {weightItems.map(item => (
              <div key={item.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', color: item.color, fontWeight: 600 }}>
                    {(weights as any)[item.key]}%
                  </span>
                </div>
                <input type="range" min="0" max="100"
                  value={(weights as any)[item.key]}
                  onChange={(e) => setWeights({ ...weights, [item.key]: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: item.color }} />
              </div>
            ))}
          </div>
        </div>

        {error && <p style={{ color: 'var(--danger)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        {/* Preview */}
        {analysis && (
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
            <button onClick={() => setPreview(!preview)}
              style={{ background: 'transparent', border: 'none', color: 'var(--accent-purple-light)', fontSize: '13px', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
              {preview ? '\u25BC' : '\u25B6'} Vista previa de tu analisis cosmico
            </button>
            {preview && (
              <div style={{ marginTop: '12px', animation: 'fadeIn 0.3s ease' }}>
                {/* Numerology */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '6px', marginBottom: '12px' }}>
                  {[
                    { l: 'Vida', v: analysis.lifePath },
                    { l: 'Expresion', v: analysis.expression },
                    { l: 'Alma', v: analysis.soulUrge },
                    { l: 'Pers.', v: analysis.personality },
                    { l: 'Cumpl.', v: analysis.birthdayNumber },
                    { l: 'Suerte', v: analysis.personalLucky },
                    { l: 'Caldeo', v: analysis.chaldeanName },
                    { l: 'Ano', v: analysis.personalYear },
                  ].map((item, i) => (
                    <div key={i} style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                      <p style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{item.l}</p>
                      <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-gold)' }}>{item.v}</p>
                    </div>
                  ))}
                </div>
                {/* Astrology */}
                <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '10px', marginBottom: '8px' }}>
                  <p style={{ fontSize: '12px', color: 'var(--accent-gold)' }}>
                    {analysis.zodiacSign.name} | {analysis.zodiacSign.element} | Regente: {analysis.zodiacSign.ruler}
                  </p>
                </div>
                {/* Maya */}
                <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '10px', marginBottom: '8px' }}>
                  <p style={{ fontSize: '12px', color: 'var(--accent-gold)' }}>
                    Maya Kin {analysis.mayanKin.kinNumber}: {analysis.mayanKin.tone.name} {analysis.mayanKin.seal.name}
                  </p>
                </div>
                {/* Cabala */}
                <div style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '10px' }}>
                  <p style={{ fontSize: '12px', color: 'var(--accent-gold)' }}>
                    Cabala: {analysis.sefirah.name} ({analysis.sefirah.hebrew})
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Save button */}
        <button onClick={handleSave}
          style={{
            width: '100%', padding: '16px',
            background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-purple))',
            color: '#0d0521', border: 'none', borderRadius: '12px',
            fontSize: '16px', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          {existing ? 'Actualizar perfil' : 'Guardar perfil'}
        </button>
      </div>

      {/* Privacy notice */}
      <div style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
        <h4 style={{ fontSize: '13px', color: 'var(--accent-purple-light)', marginBottom: '8px' }}>Privacidad</h4>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Todos tus datos se almacenan exclusivamente en tu dispositivo (localStorage).
          Los calculos se realizan localmente. No se envian datos a ningun servidor.
        </p>
      </div>
    </div>
  )
}
