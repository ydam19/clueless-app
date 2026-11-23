import { Outlet } from 'react-router'
import { TabBar } from './TabBar'
import './AppLayout.css'

// 모든 탭 화면의 틀: 위쪽 타탄 띠(로고) + 화면 내용 + 하단 탭
// 컴퓨터 브라우저에서는 가운데에 폰 너비로 보이게 한다
export function AppLayout() {
  return (
    <div className="app">
      <header className="app-top">
        <span className="logo">Clueless</span>
      </header>
      <main className="app-body">
        <Outlet />
      </main>
      <TabBar />
    </div>
  )
}
