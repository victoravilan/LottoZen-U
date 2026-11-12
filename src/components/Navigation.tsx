import type { Page } from '../App'

interface Props {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Inicio', icon: 'M3 12l9-9 9 9M5 10v10h14V10' },
  { id: 'generator', label: 'Generar', icon: 'M12 2v20M2 12h20' },
  { id: 'strategy', label: 'Estrategia', icon: 'M9 11l3 3L22 4M2 12l3 3 3-3' },
  { id: 'analysis', label: 'Analisis', icon: 'M3 3v18h18M7 14l4-4 4 4 4-4' },
  { id: 'profile', label: 'Perfil', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7' },
]

export default function Navigation({ currentPage, onNavigate }: Props) {
  return (
    <>
      {/* Top header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(13, 5, 33, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        padding: '12px 20px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="./logo.svg" alt="LottoZen Ultra Logo" style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))',
            }} />
            <div>
              <h1 className="font-display" style={{
                fontSize: '20px',
                fontWeight: 700,
                background: 'linear-gradient(90deg, var(--accent-gold-light), var(--accent-purple-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px',
              }}>LottoZen Ultra</h1>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px' }}>NUMEROLOGIA PREDICTIVA</p>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom navigation (mobile-friendly) */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(13, 5, 33, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'center',
        padding: '8px 0 env(safe-area-inset-bottom)',
      }}>
        <div style={{ display: 'flex', gap: '4px', maxWidth: '500px', width: '100%', padding: '0 12px' }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 4px',
                background: 'transparent',
                border: 'none',
                color: currentPage === item.id ? 'var(--accent-gold)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: '12px',
                position: 'relative',
              }}
            >
              {currentPage === item.id && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '20%',
                  right: '20%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
                  borderRadius: '2px',
                }} />
              )}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              <span style={{ fontSize: '11px', fontWeight: 500 }}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
