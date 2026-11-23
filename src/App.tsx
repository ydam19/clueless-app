import { Route, Routes } from 'react-router'
import { AppLayout } from './components/AppLayout'
import Home from './pages/Home'
import Closet from './pages/Closet'
import Calendar from './pages/Calendar'
import Community from './pages/Community'
import My from './pages/My'

// 화면 주소. 새 화면은 여기에 Route를 하나 추가한다.
export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="closet" element={<Closet />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="community" element={<Community />} />
        <Route path="my" element={<My />} />
      </Route>
    </Routes>
  )
}
