import { NavLink } from 'react-router'
import { Icon, type IconName } from './Icon'
import './TabBar.css'

// 하단 탭 순서: [캘린더][옷장][홈(가운데)][커뮤니티][MY]
const TABS: { to: string; label: string; icon: IconName }[] = [
  { to: '/calendar', label: '캘린더', icon: 'calendar' },
  { to: '/closet', label: '옷장', icon: 'closet' },
  { to: '/', label: '홈', icon: 'home' },
  { to: '/community', label: '커뮤니티', icon: 'community' },
  { to: '/my', label: 'MY', icon: 'my' },
]

export function TabBar() {
  return (
    <nav className="tabbar">
      {TABS.map((t) => (
        <NavLink key={t.to} to={t.to} end={t.to === '/'} className={({ isActive }) => (isActive ? 'on' : '')}>
          <Icon name={t.icon} />
          {t.label}
        </NavLink>
      ))}
    </nav>
  )
}
