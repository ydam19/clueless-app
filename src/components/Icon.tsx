import type { ReactNode } from 'react'
// 프로토타입 하단 탭과 같은 선 아이콘
export type IconName = 'calendar' | 'closet' | 'home' | 'community' | 'my'

const PATHS: Record<IconName, ReactNode> = {
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="1.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></>,
  closet: <><path d="M12 7.5a2 2 0 1 1 2-2c0 1-.8 1.4-1.4 1.8-.4.3-.6.6-.6 1.1v.6" /><path d="M12 9 3.3 15.2c-.8.6-.4 1.8.6 1.8h16.2c1 0 1.4-1.2.6-1.8z" /></>,
  home: <path d="M3.5 10.5 12 4l8.5 6.5V20a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z" />,
  community: <><circle cx="9" cy="8" r="3.2" /><path d="M3 19.5c.8-3.2 3.2-5 6-5s5.2 1.8 6 5" /><circle cx="16.5" cy="9" r="2.6" /><path d="M16.5 14c2.3 0 4 1.4 4.5 4" /></>,
  my: <><circle cx="12" cy="8.5" r="4" /><path d="M4.5 20.5c1.2-3.8 4.2-5.5 7.5-5.5s6.3 1.7 7.5 5.5" /></>,
}

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="var(--icon-stroke, 1.6)" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  )
}
