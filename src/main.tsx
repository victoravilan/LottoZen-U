import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Error boundary wrapper to catch any rendering errors
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: string}> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: '' }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message }
  }
  componentDidCatch(error: Error, info: any) {
    console.error('React Error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return React.createElement('div', { 
        style: { padding: '40px', textAlign: 'center', color: '#f5f0ff', background: '#0d0521', minHeight: '100vh' } 
      },
        React.createElement('h2', { style: { color: '#d4af37', fontFamily: 'Cinzel, serif', fontSize: '24px', marginBottom: '16px' } }, 'Error en la aplicacion'),
        React.createElement('p', { style: { color: '#b8a8d4', marginBottom: '16px' } }, this.state.error),
        React.createElement('a', { href: './landing.html', style: { color: '#a78bfa' } }, 'Ir a la pagina de inicio')
      )
    }
    return this.props.children
  }
}

const root = createRoot(document.getElementById('root')!)
root.render(
  React.createElement(ErrorBoundary, null,
    React.createElement(App)
  )
)

// Do NOT register service worker - it causes caching issues
