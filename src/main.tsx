import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import '@fontsource/noto-sans-kr/400.css'
import '@fontsource/noto-sans-kr/500.css'
import '@fontsource/noto-sans-kr/700.css'
import '@fontsource/dm-serif-display/400.css'
import '@fontsource/dm-serif-display/400-italic.css'
import './styles/theme.css'
import App from './App'

// HashRouter: Capacitor로 앱에 넣었을 때도 화면 이동이 깨지지 않게 주소에 #을 쓴다
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
