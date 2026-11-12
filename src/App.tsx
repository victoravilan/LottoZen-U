import { useState, useEffect } from 'react'
import StarField from './components/StarField'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import NumberGenerator from './components/NumberGenerator'
import LotteryAnalysis from './components/LotteryAnalysis'
import PlayOptimizer from './components/PlayOptimizer'
import UserProfile from './components/UserProfile'
import { getUserProfile } from './lib/storage'

export type Page = 'dashboard' | 'generator' | 'strategy' | 'analysis' | 'profile'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [profileLoaded, setProfileLoaded] = useState(false)

  useEffect(() => {
    const profile = getUserProfile()
    if (!profile) {
      // Si no hay perfil, ir directo al perfil para crearlo
      setCurrentPage('profile')
    }
    setProfileLoaded(true)
  }, [])

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: 'var(--bg-primary)' }}>
      <StarField />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 16px 80px' }}>
          {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} />}
          {currentPage === 'generator' && <NumberGenerator />}
          {currentPage === 'strategy' && <PlayOptimizer />}
          {currentPage === 'analysis' && <LotteryAnalysis />}
          {currentPage === 'profile' && <UserProfile onSave={() => setCurrentPage('dashboard')} />}
        </main>
        <footer style={{
          textAlign: 'center',
          padding: '24px 16px',
          color: 'var(--text-muted)',
          fontSize: '13px',
          borderTop: '1px solid var(--border)',
        }}>
          <p style={{ marginBottom: '8px' }}>
            <strong style={{ color: 'var(--accent-gold)' }}>LottoZen Ultra</strong> v2.0 - Numerologia Predictiva
          </p>
          <p style={{ maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, marginBottom: '16px' }}>
            Esta aplicacion genera numeros basados en analisis historico y numerologia como forma de entretenimiento.
            Las loterias son juegos de azar. Los resultados pasados no predicen resultados futuros.
            No existe ningun metodo garantizado para ganar. Juega con responsabilidad.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.8, marginBottom: '4px' }}>
            Creado por: <strong style={{ color: 'var(--accent-gold)' }}>Victor M.F. Avilan</strong> - Valor Agregado
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            &copy; Todos los derechos reservados
          </p>
        </footer>
      </div>
    </div>
  )
}
