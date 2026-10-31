interface Props {
  number: number
  size?: 'small' | 'medium' | 'large'
  variant?: 'main' | 'star' | 'bonus'
  color?: string
  animated?: boolean
}

export default function NumberBall({ number, size = 'medium', variant = 'main', color, animated = true }: Props) {
  const sizes = {
    small: { w: 28, h: 28, fs: 13 },
    medium: { w: 44, h: 44, fs: 18 },
    large: { w: 64, h: 64, fs: 26 },
  }
  const s = sizes[size]

  const bg = variant === 'star'
    ? 'linear-gradient(135deg, #f0d878, #d4af37)'
    : `linear-gradient(135deg, ${color || '#8b5cf6'}, ${color ? color + '99' : '#a78bfa'})`

  return (
    <div style={{
      width: s.w,
      height: s.h,
      borderRadius: '50%',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: s.fs,
      fontWeight: 700,
      color: variant === 'star' ? '#0d0521' : '#fff',
      boxShadow: variant === 'star'
        ? '0 2px 8px rgba(212, 175, 55, 0.4), inset 0 -2px 4px rgba(0,0,0,0.2)'
        : '0 2px 8px rgba(139, 92, 246, 0.3), inset 0 -2px 4px rgba(0,0,0,0.2)',
      flexShrink: 0,
      animation: animated ? 'fadeIn 0.4s ease' : undefined,
      position: 'relative',
    }}>
      {variant === 'star' && (
        <span style={{
          position: 'absolute',
          top: -2,
          right: -2,
          fontSize: '10px',
        }}>★</span>
      )}
      {number}
    </div>
  )
}
