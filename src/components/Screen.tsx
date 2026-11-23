import type { ReactNode } from 'react'
import './Screen.css'

// 화면 제목 + 내용. title 예: ['Today’s', 'Outfit'] → 두 번째 단어는 기울임 (프로토타입 제목 모양)
export function Screen({ title, children }: { title?: [string, string?]; children: ReactNode }) {
  return (
    <div className="screen">
      {title && (
        <h1 className="screen-title">
          {title[0]}
          {title[1] && <em> {title[1]}</em>}
        </h1>
      )}
      {children}
    </div>
  )
}
