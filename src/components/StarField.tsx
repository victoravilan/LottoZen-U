import { useEffect, useRef } from 'react'

// Animated cosmic starfield background
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let stars: { x: number; y: number; z: number; size: number; opacity: number; twinkle: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars = []
      const count = Math.floor((canvas.width * canvas.height) / 8000)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random(),
          size: Math.random() * 2 + 0.3,
          opacity: Math.random() * 0.6 + 0.2,
          twinkle: Math.random() * 0.02 + 0.005,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        star.opacity += star.twinkle
        if (star.opacity > 0.8 || star.opacity < 0.2) star.twinkle *= -1

        const r = star.size * (0.5 + star.z * 0.5)
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, r * 3)
        const color = star.z > 0.7 ? '212, 175, 55' : star.z > 0.4 ? '167, 139, 250' : '245, 240, 255'
        gradient.addColorStop(0, `rgba(${color}, ${star.opacity})`)
        gradient.addColorStop(1, `rgba(${color}, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, r * 3, 0, Math.PI * 2)
        ctx.fill()

        // Slow drift
        star.y += 0.02 * star.z
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
