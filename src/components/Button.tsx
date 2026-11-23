import type { ButtonHTMLAttributes } from 'react'
import './Button.css'

// 프로토타입 버튼 세 종류: pink(가장 중요한 행동 하나), solid(진한 남색), outline(테두리만)
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'pink' | 'solid' | 'outline' }

export function Button({ variant = 'outline', className = '', ...rest }: Props) {
  return <button className={`btn btn-${variant} ${className}`} {...rest} />
}
